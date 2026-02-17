"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { usePathname } from "next/navigation";

export default function ApplicationForm() {
    const { isAuthenticated, isLoading } = useAuth();
    const pathname = usePathname();

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading application form...</div>;
    }

    if (!isAuthenticated) {
        return (
            <section className="bg-white rounded-2xl p-12 border border-gray-200 mt-12 scroll-mt-32 text-center" id="apply">
                <h3 className="font-display font-bold text-2xl mb-4 text-bg-primary">Sign in to Apply</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    You must be signed in to submit an application for this position. Please sign in or create an account to continue.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-bg-primary hover:bg-bg-primary/90 text-white font-bold h-12 rounded-lg px-8">
                        <Link href={`/signin?redirect=${encodeURIComponent(pathname)}`}>
                            Sign In
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-bg-primary text-bg-primary hover:bg-bg-primary/5 font-bold h-12 rounded-lg px-8">
                        <Link href={`/signup?redirect=${encodeURIComponent(pathname)}`}>
                            Create Account
                        </Link>
                    </Button>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white rounded-2xl p-8 border border-gray-200 mt-12 scroll-mt-32" id="apply">
            <h3 className="font-display font-bold text-2xl mb-2 text-bg-primary">Apply for this Position</h3>
            <p className="text-gray-500 mb-8">Please fill out the form below to submit your application.</p>

            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Full Name *</label>
                        <Input placeholder="John Doe" className="bg-gray-50 border-gray-200" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Email Address *</label>
                        <Input type="email" placeholder="john@example.com" className="bg-gray-50 border-gray-200" required />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Phone Number *</label>
                        <Input type="tel" placeholder="+1 (555) 000-0000" className="bg-gray-50 border-gray-200" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">LinkedIn Profile</label>
                        <Input placeholder="linkedin.com/in/johndoe" className="bg-gray-50 border-gray-200" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Resume / CV *</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                            <Upload className="w-5 h-5 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-text-muted mt-1">PDF, DOCX up to 5MB</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Cover Letter (Optional)</label>
                    <Textarea placeholder="Tell us why you're a great fit..." className="bg-gray-50 border-gray-200 min-h-[120px]" />
                </div>

                <Button size="lg" className="w-full bg-bg-primary hover:bg-bg-primary/90 text-white font-bold h-12 rounded-lg">
                    Submit Application
                </Button>
            </form>
        </section>
    );
}
