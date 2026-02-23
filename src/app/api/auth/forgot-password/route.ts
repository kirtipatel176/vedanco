import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { EmailService } from "@/services/email.service";
import { hashData } from "@/utils/security";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save hashed OTP to user (expires in 15 mins)
        user.resetPasswordOtp = await hashData(otp);
        user.resetPasswordOtpExpiry = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();

        // Send email
        await EmailService.sendPasswordResetOtpEmail(user.email, user.name, otp);

        return NextResponse.json({ success: true, message: "OTP sent successfully. Please check your email." });

    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
