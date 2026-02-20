import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { email, password } = await req.json();
        const emailStr = String(email);

        const user = await User.findOne({ email: emailStr }).select('+password');

        if (user && (await bcrypt.compare(String(password), user.password || ""))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "default_secret", {
                expiresIn: '30d',
            });

            const response = NextResponse.json({
                success: true,
                message: 'Login successful!',
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                },
                token
            }, { status: 200 });

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
            return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
        }
    } catch (error: unknown) {
        console.error("Login Error:", error);
        if (error instanceof Error && (error.name === 'MongoNetworkError' || error.name === 'MongoServerSelectionError' || error.message?.includes('connect'))) {
            return NextResponse.json({ success: false, message: 'Database connection failed. Please try again shortly.' }, { status: 503 });
        }
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
