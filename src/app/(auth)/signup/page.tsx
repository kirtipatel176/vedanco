"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, User } from "@/context/auth-context";
import { apiFetch } from "@/services/api";

export default function SignUpPage() {
    const router = useRouter();
    const { login } = useAuth();

    // --- UI State ---
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Step 1: Registration Form, Step 2: OTP Verification
    const [step, setStep] = useState<1 | 2>(1);

    // --- Form Data ---
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        designation: "",
        experience: "",
        skills: "",
        password: "",
        confirmPassword: ""
    });
    const [otp, setOtp] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccessMsg("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const data = await apiFetch<{ success: boolean; message?: string; }>("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(formData),
            });

            if (data.success) {
                setSuccessMsg("OTP sent to your email!");
                setStep(2); // Move to OTP verification
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccessMsg("");

        if (otp.length !== 6) {
            setError("OTP must be exactly 6 digits.");
            setIsLoading(false);
            return;
        }

        try {
            const data = await apiFetch<{ success: boolean; message?: string; user?: User }>("/api/auth/verify-otp", {
                method: "POST",
                body: JSON.stringify({ email: formData.email, otp }),
            });

            if (data.success) {
                setSuccessMsg("Email verified! Logging you in...");
                if (data.user) {
                    login(data.user);
                }
                // Delay slightly to let user read success message
                setTimeout(() => router.push("/dashboard"), 1000);
            } else {
                setError(data.message || "OTP verification failed");
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="mb-8">
                <h1 className="font-display font-black text-3xl md:text-4xl text-black mb-2 tracking-tight">
                    {step === 1 ? "Create Account" : "Verify Email"}
                </h1>
                <p className="text-zinc-500 font-dm-sans">
                    {step === 1 ? "Join VEDANCO Group today." : `We've sent a 6-digit code to ${formData.email}`}
                </p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                    {error}
                </div>
            )}
            {successMsg && (
                <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-4">
                    {successMsg}
                </div>
            )}

            {step === 1 ? (
                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                    {/* Personal Info Section */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-bold text-black">Full Name</Label>
                                <Input id="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-bold text-black">Email Address</Label>
                                <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" required />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="phone" className="text-sm font-bold text-black">Phone Number</Label>
                                <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" required />
                            </div>
                        </div>
                    </div>

                    {/* Professional Info Section */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2">Professional Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-sm font-bold text-black">Company <span className="text-zinc-400 font-normal">(Optional)</span></Label>
                                <Input id="company" value={formData.company} onChange={handleChange} placeholder="Acme Corp" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="designation" className="text-sm font-bold text-black">Designation <span className="text-zinc-400 font-normal">(Optional)</span></Label>
                                <Input id="designation" value={formData.designation} onChange={handleChange} placeholder="Product Manager" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="experience" className="text-sm font-bold text-black">Total Experience <span className="text-zinc-400 font-normal">(Optional)</span></Label>
                                <Input id="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 5 years" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="skills" className="text-sm font-bold text-black">Skills <span className="text-zinc-400 font-normal">(Optional)</span></Label>
                                <Input id="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, etc." className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" />
                            </div>
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2">Security</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-bold text-black">Password</Label>
                                <Input id="password" type="password" value={formData.password} onChange={handleChange} placeholder="8+ chars, 1 letter, 1 number" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-bold text-black">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" required />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button disabled={isLoading} className="w-full bg-black hover:bg-zinc-800 text-white font-bold h-12 rounded-lg uppercase tracking-widest">
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>
                        <p className="text-xs text-zinc-400 text-center mt-4 leading-relaxed">
                            By creating an account, you agree to our <Link href="/terms" className="underline hover:text-black">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-black">Privacy Policy</Link>.
                        </p>
                    </div>
                </form>
            ) : (
                <div className="space-y-6">
                    <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex items-center text-sm font-bold text-zinc-500 hover:text-black transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Back
                    </button>
                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp" className="text-sm font-bold text-black">Verification Code</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="000000"
                                    className="bg-zinc-50 border-zinc-200 h-14 text-center text-2xl tracking-widest font-black text-black placeholder:text-zinc-300"
                                    required
                                />
                            </div>
                            <Button disabled={isLoading || otp.length !== 6} className="w-full bg-black hover:bg-zinc-800 text-white font-bold h-12 rounded-lg uppercase tracking-widest">
                                {isLoading ? "Verifying..." : "Verify & Login"}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="mt-8 text-center text-sm text-zinc-500 font-dm-sans">
                Already have an account?{" "}
                <Link href="/signin" className="font-bold text-black hover:underline underline-offset-4">
                    Sign In
                </Link>
            </div>
        </>
    );
}
