import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const { name, email, password, phone, ...otherData } = body;

        const emailStr = String(email);
        const userExists = await User.findOne({ email: emailStr });

        if (userExists) {
            return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(String(password), salt);

        const user = await User.create({
            name: String(name),
            email: emailStr,
            password: hashedPassword,
            phone: String(phone),
            ...otherData
        });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "default_secret", {
                expiresIn: '30d',
            });

            const response = NextResponse.json({
                success: true,
                message: 'Account created successfully! Please login.',
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                },
                token
            }, { status: 201 });

            const isProduction = process.env.NODE_ENV === 'production';
            response.cookies.set({
                name: 'token',
                value: token,
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? 'none' : 'strict',
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });

            return response;
        } else {
            return NextResponse.json({ success: false, message: 'Invalid user data' }, { status: 400 });
        }
    } catch (error) {
        console.error("Register Error:", error);
        return NextResponse.json({ success: false, message: 'Server Error. Please try again.' }, { status: 500 });
    }
}
