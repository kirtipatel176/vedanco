"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { apiFetch } from "@/services/api";

export default function SignInForm() {
    const [email, setEmail] = useState("demo@vedanco.com");
    const [password, setPassword] = useState("demo123");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    const redirectUrl = searchParams.get("redirect") || "/dashboard";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const data = await apiFetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            if (data.success) {
                login(data.user);
                router.push(redirectUrl);
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="mb-8">
                <h1 className="font-display font-black text-3xl md:text-4xl text-black mb-2 tracking-tight">Welcome back</h1>
                <p className="text-zinc-500 font-dm-sans">Enter your credentials to access your dashboard.</p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="password" className="text-sm font-bold text-black uppercase tracking-wide">Password</Label>
                        <Link href="/auth/forgot-password" className="text-xs font-semibold text-zinc-500 hover:text-black transition-colors">
                            Forgot Password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-zinc-50 border-zinc-200 focus:bg-white focus:border-black transition-all h-12 rounded-lg text-black placeholder:text-zinc-400"
                        required
                    />
                </div>

                <Button disabled={isLoading} className="w-full bg-black hover:bg-zinc-800 text-white font-bold h-12 rounded-lg uppercase tracking-widest mt-6">
                    {isLoading ? "Signing In..." : "Sign In"}
                </Button>
            </form>

            <div className="mt-8 text-center text-sm text-zinc-500 font-dm-sans">
                Don&apos;t have an account?{" "}
                <Link href={`/signup?redirect=${encodeURIComponent(redirectUrl)}`} className="font-bold text-black hover:underline underline-offset-4">
                    Create Account
                </Link>
            </div>
        </>
    );
}
