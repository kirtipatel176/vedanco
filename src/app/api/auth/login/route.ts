import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { loginSchema } from "@/lib/validation";
import { verifyData, generateToken } from "@/utils/security";
import { RateLimiter } from "@/middleware/rateLimit";

export async function POST(req: Request) {
    try {
        // Enforce basic IP rate limiting for login attempts
        const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
        const rateLimitResult = RateLimiter.checkLimit(ip, 5, 60000);
        if (!rateLimitResult.success) {
            return NextResponse.json({ success: false, message: "Too many login attempts. Please try again later." }, { status: 429 });
        }

        await connectToDatabase();
        const body = await req.json();

        // 1. Input Validation
        const parsedData = loginSchema.safeParse(body);
        if (!parsedData.success) {
            const firstError = parsedData.error.issues[0]?.message || "Invalid input";
            return NextResponse.json({ success: false, message: firstError }, { status: 400 });
        }

        const { email, password } = parsedData.data;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
        }

        // 2. Lockout Check
        if (user.lockoutUntil && user.lockoutUntil > new Date()) {
            const minutesLeft = Math.ceil((user.lockoutUntil.getTime() - Date.now()) / 60000);
            return NextResponse.json({
                success: false,
                message: `Account is temporarily locked. Try again in ${minutesLeft} minute(s).`
            }, { status: 429 });
        }

        // 3. Password Verification abstraction
        const isMatch = await verifyData(password, user.password || "");

        if (!isMatch) {
            // Increment failed login tracking
            user.failedLoginAttempts += 1;
            if (user.failedLoginAttempts >= 5) {
                user.lockoutUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 mins lockout
            }
            await user.save();

            return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
        }

        // 4. Successful Login: Reset attempts
        if (user.failedLoginAttempts > 0 || user.lockoutUntil) {
            user.failedLoginAttempts = 0;
            user.lockoutUntil = undefined;
            await User.updateOne({ _id: user._id }, { $set: { failedLoginAttempts: 0 }, $unset: { lockoutUntil: 1 } });
        }

        // 5. Generate secure SaaS JWT Token
        const token = generateToken({ id: user._id }, '30d');

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

    } catch (error: unknown) {
        console.error("Login Error:", error);
        if (error instanceof Error && (error.name === 'MongoNetworkError' || error.name === 'MongoServerSelectionError' || error.message?.includes('connect'))) {
            return NextResponse.json({ success: false, message: 'Database connection failed. Please try again shortly.' }, { status: 503 });
        }
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

