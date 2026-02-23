import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { hashData, verifyData } from "@/utils/security";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { email, otp, password } = await req.json();

        if (!email || !otp || !password) {
            return NextResponse.json({ success: false, message: "Email, OTP and new password are required" }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user || !user.resetPasswordOtp || !user.resetPasswordOtpExpiry) {
            return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
        }

        if (new Date() > user.resetPasswordOtpExpiry) {
            return NextResponse.json({ success: false, message: "OTP has expired" }, { status: 400 });
        }

        const isMatch = await verifyData(otp, user.resetPasswordOtp);
        if (!isMatch) {
            return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
        }

        const hashedPassword = await hashData(password);
        user.password = hashedPassword;
        user.resetPasswordOtp = undefined;
        user.resetPasswordOtpExpiry = undefined;
        await user.save();

        return NextResponse.json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
