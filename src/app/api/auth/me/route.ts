import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        let token;
        const authHeader = req.headers.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }
        if (!token) {
            token = req.cookies.get("token")?.value;
        }

        if (!token) {
            return NextResponse.json({ success: false, message: 'Not authorized, no token' }, { status: 401 });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret") as { id: string };
            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
            }

            return NextResponse.json({
                success: true,
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    company: user.company,
                    designation: user.designation,
                    experience: user.experience,
                    skills: user.skills,
                    bio: user.bio,
                    profileImage: user.profileImage,
                }
            }, { status: 200 });
        } catch {
            return NextResponse.json({ success: false, message: 'Not authorized, token failed' }, { status: 401 });
        }
    } catch (error) {
        console.error("Profile Error:", error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
