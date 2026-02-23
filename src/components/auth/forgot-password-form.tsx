"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/services/api";

export default function ForgotPasswordForm() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const data = await apiFetch<{ success: boolean; message?: string }>("/api/auth/forgot-password", {
                method: "POST",
                body: { email }, // No JSON.stringify, apiFetch does it
            });

            if (data.success) {
                setSuccessMessage(data.message || "OTP sent to your email.");
                setStep(2);
            } else {
                setError(data.message || "Failed to send OTP.");
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const data = await apiFetch<{ success: boolean; message?: string }>("/api/auth/reset-password-otp", {
                method: "POST",
                body: { email, otp },
            });

            if (data.success) {
                setSuccessMessage("");
                setStep(3);
            } else {
                setError(data.message || "Invalid OTP.");
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const data = await apiFetch<{ success: boolean; message?: string }>("/api/auth/reset-password", {
                method: "POST",
                body: { email, otp, password },
            });

            if (data.success) {
                setSuccessMessage("Password reset successfully. Redirecting to login...");
                setTimeout(() => {
                    router.push("/signin");
                }, 2000);
            } else {
                setError(data.message || "Failed to reset password.");
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="mb-8">
                <h1 className="font-display font-black text-3xl md:text-4xl text-black mb-2 tracking-tight">
                    {step === 1 && "Forgot Password"}
                    {step === 2 && "Enter OTP"}
                    {step === 3 && "New Password"}
                </h1>
                <p className="text-zinc-500 font-dm-sans">
                    {step === 1 && "Enter your email to receive a password reset OTP."}
                    {step === 2 && "Enter the 6-digit OTP sent to your email."}
                    {step === 3 && "Create a new strong password for your account."}
                </p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                    {error}
                </div>
            )}
            {successMessage && (
                <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-4">
                    {successMessage}
                </div>
            )}

            {step === 1 && (
                <form onSubmit={handleSendOTP} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-bold text-black uppercase tracking-wide">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            className="bg-zinc-50 border-zinc-200 focus:bg-white focus:border-black transition-all h-12 rounded-lg text-black placeholder:text-zinc-400"
                            required
                        />
                    </div>
                    <Button disabled={isLoading} className="w-full bg-black hover:bg-zinc-800 text-white font-bold h-12 rounded-lg uppercase tracking-widest mt-6">
                        {isLoading ? "Sending..." : "Send OTP"}
                    </Button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="otp" className="text-sm font-bold text-black uppercase tracking-wide">OTP (6 Digits)</Label>
                        <Input
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="123456"
                            className="bg-zinc-50 border-zinc-200 focus:bg-white focus:border-black transition-all h-12 rounded-lg text-black placeholder:text-zinc-400 text-center tracking-widest text-lg"
                            required
                            maxLength={6}
                        />
                    </div>
                    <Button disabled={isLoading} className="w-full bg-black hover:bg-zinc-800 text-white font-bold h-12 rounded-lg uppercase tracking-widest mt-6">
                        {isLoading ? "Verifying..." : "Verify OTP"}
                    </Button>
                </form>
            )}

            {step === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-bold text-black uppercase tracking-wide">New Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="bg-zinc-50 border-zinc-200 focus:bg-white focus:border-black transition-all h-12 rounded-lg text-black placeholder:text-zinc-400"
                            required
                            minLength={6}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-bold text-black uppercase tracking-wide">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="bg-zinc-50 border-zinc-200 focus:bg-white focus:border-black transition-all h-12 rounded-lg text-black placeholder:text-zinc-400"
                            required
                            minLength={6}
                        />
                    </div>
                    <Button disabled={isLoading} className="w-full bg-black hover:bg-zinc-800 text-white font-bold h-12 rounded-lg uppercase tracking-widest mt-6">
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </Button>
                </form>
            )}

            <div className="mt-8 text-center text-sm text-zinc-500 font-dm-sans">
                Remember your password?{" "}
                <Link href="/signin" className="font-bold text-black hover:underline underline-offset-4">
                    Sign In
                </Link>
            </div>
        </>
    );
}
