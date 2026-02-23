import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { verifyData } from "@/utils/security";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ success: false, message: "Email and OTP are required" }, { status: 400 });
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

        return NextResponse.json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        console.error("Verify OTP error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
