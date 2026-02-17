import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
    return (
        <>
            <div className="mb-8">
                <h1 className="font-display font-black text-3xl md:text-4xl text-black mb-2 tracking-tight">Create Account</h1>
                <p className="text-zinc-500 font-dm-sans">Join VEDANCO Group today.</p>
            </div>

            <form className="space-y-6">

                {/* Personal Info Section */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-sm font-bold text-black">Full Name</Label>
                            <Input id="fullName" placeholder="John Doe" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-bold text-black">Email Address</Label>
                            <Input id="email" type="email" placeholder="john@example.com" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" required />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="phone" className="text-sm font-bold text-black">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" required />
                        </div>
                    </div>
                </div>

                {/* Professional Info Section */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2">Professional Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="company" className="text-sm font-bold text-black">Company <span className="text-zinc-400 font-normal">(Optional)</span></Label>
                            <Input id="company" placeholder="Acme Corp" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="designation" className="text-sm font-bold text-black">Designation <span className="text-zinc-400 font-normal">(Optional)</span></Label>
                            <Input id="designation" placeholder="Product Manager" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="experience" className="text-sm font-bold text-black">Total Experience <span className="text-zinc-400 font-normal">(Optional)</span></Label>
                            <Input id="experience" placeholder="e.g. 5 years" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="skills" className="text-sm font-bold text-black">Skills <span className="text-zinc-400 font-normal">(Optional)</span></Label>
                            <Input id="skills" placeholder="React, Node.js, etc." className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" />
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2">Security</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-bold text-black">Password</Label>
                            <Input id="password" type="password" placeholder="8+ chars, 1 letter, 1 number" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-bold text-black">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" placeholder="••••••••" className="bg-zinc-50 border-zinc-200 h-11 text-black placeholder:text-zinc-400" required />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <Button className="w-full bg-black hover:bg-zinc-800 text-white font-bold h-12 rounded-lg uppercase tracking-widest">
                        Create Account
                    </Button>
                    <p className="text-xs text-zinc-400 text-center mt-4 leading-relaxed">
                        By creating an account, you agree to our <Link href="/terms" className="underline hover:text-black">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-black">Privacy Policy</Link>.
                    </p>
                </div>
            </form>

            <div className="mt-8 text-center text-sm text-zinc-500 font-dm-sans">
                Already have an account?{" "}
                <Link href="/signin" className="font-bold text-black hover:underline underline-offset-4">
                    Sign In
                </Link>
            </div>
        </>
    );
}
