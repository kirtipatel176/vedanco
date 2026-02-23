import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").trim(),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address").toLowerCase().trim(),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[a-zA-Z]/, "Password must contain at least 1 letter")
        .regex(/\d/, "Password must contain at least 1 number"),
    phone: z.string().min(7, "Invalid phone number"),
});

export const loginSchema = z.object({
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format").toLowerCase().trim(),
    password: z.string().min(1, "Password is required"),
});

export const otpVerifySchema = z.object({
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format").toLowerCase().trim(),
    otp: z.string().length(6, "OTP must be exactly 6 digits").regex(/^\d+$/, "OTP must be numeric")
});
