import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { otpVerifySchema } from "@/lib/validation";
import { OtpService } from "@/services/otp.service";
import { RateLimiter } from "@/middleware/rateLimit";
import { generateToken } from "@/utils/security";

export async function POST(req: Request) {
    try {
        // High security rate limiting on OTP verification attempts (10 req / min)
        const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
        const rateLimitResult = RateLimiter.checkLimit(ip, 10, 60000);
        if (!rateLimitResult.success) {
            return NextResponse.json({ success: false, message: "Too many attempts. Please try again later." }, { status: 429 });
        }

        await connectToDatabase();
        const body = await req.json();

        // 1. Input Validation
        const parsedData = otpVerifySchema.safeParse(body);
        if (!parsedData.success) {
            const firstError = parsedData.error.issues[0]?.message || "Invalid input";
            return NextResponse.json({ success: false, message: firstError }, { status: 400 });
        }

        const { email, otp } = parsedData.data;

        // 2. Prevent re-verification
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, message: 'User is already registered and verified.' }, { status: 400 });
        }

        // 3. Delegate to secure OTP verification service
        let pendingUser;
        try {
            pendingUser = await OtpService.validateOtp(email, otp);
        } catch (otpError: unknown) {
            const message = otpError instanceof Error ? otpError.message : "Validation error";
            return NextResponse.json({ success: false, message }, { status: 400 });
        }

        // 4. Create the verified User
        const { ...userData } = pendingUser.userData;
        const user = await User.create({
            ...userData,
            isVerified: true
        });

        // 5. Atomic DB Cleanup (Consume OTP)
        await OtpService.consumeOtp(String(pendingUser._id));

        // 6. Generate SaaS JWT Authentication Token
        const token = generateToken({ id: user._id }, '30d');

        const response = NextResponse.json({
            success: true,
            message: 'Email verified successfully! Logging you in.',
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
            token
        }, { status: 200 });

        // Set secure Cookie payload
        const isProduction = process.env.NODE_ENV === 'production';
        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'strict',
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: '/',
        });

        return response;
    } catch (error) {
        console.error("Verify OTP Error:", error);
        return NextResponse.json({ success: false, message: 'Server Error. Please try again.' }, { status: 500 });
    }
}
