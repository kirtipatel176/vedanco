import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { registerSchema } from "@/lib/validation";
import { OtpService } from "@/services/otp.service";
import { EmailService } from "@/services/email.service";
import { RateLimiter } from "@/middleware/rateLimit";
import { hashData } from "@/utils/security";

export async function POST(req: Request) {
    try {
        // Enforce basic IP rate limiting (5 req / min)
        const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
        const rateLimitResult = RateLimiter.checkLimit(ip, 5, 60000);
        if (!rateLimitResult.success) {
            return NextResponse.json({ success: false, message: "Too many requests. Please try again later." }, { status: 429 });
        }

        await connectToDatabase();
        const body = await req.json();

        // 1. Input Validation
        const parsedData = registerSchema.safeParse(body);
        if (!parsedData.success) {
            const firstError = parsedData.error.issues[0]?.message || "Invalid input";
            return NextResponse.json({ success: false, message: firstError }, { status: 400 });
        }

        const { name, email, password, phone, ...otherData } = parsedData.data;

        // 2. Business Rules - Check if already verified
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ success: false, message: 'Email already exists. Please log in.' }, { status: 400 });
        }

        // 3. Hash Password upfront
        const hashedPassword = await hashData(String(password));

        const rawUserData = {
            name: String(name),
            email,
            password: hashedPassword,
            phone: String(phone),
            ...otherData
        };

        // 4. Delegate to OTP Service (Atomic & Race-Condition Safe)
        // Wraps rate-limiting on OTP requests inherently
        let otp: string;
        try {
            otp = await OtpService.generateAndStoreOtp(email, rawUserData, 10);
        } catch (otpError: unknown) {
            // E.g. "Too many OTP requests..."
            const message = otpError instanceof Error ? otpError.message : "Error requesting OTP";
            return NextResponse.json({ success: false, message }, { status: 429 });
        }

        // 5. Delegate to Email Service (Brevo Integration)
        try {
            await EmailService.sendOtpEmail(email, String(name), otp);
            return NextResponse.json({
                success: true,
                message: 'OTP sent to your email.'
            }, { status: 200 });
        } catch {
            return NextResponse.json({ success: false, message: 'Failed to send OTP email. Please try again later.' }, { status: 500 });
        }

    } catch (error) {
        console.error("Register Error:", error);
        return NextResponse.json({ success: false, message: 'Server Error. Please try again.' }, { status: 500 });
    }
}
