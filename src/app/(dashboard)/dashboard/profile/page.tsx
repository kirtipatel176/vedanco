import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Upload, Shield } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="font-display font-bold text-3xl text-dashboard-text-primary tracking-tight">My Profile</h1>
                <p className="text-dashboard-text-secondary font-dm-sans mt-1">Manage your personal information and resume.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Avatar & Resume */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-dashboard-border/50 shadow-sm text-center">
                        <div className="w-24 h-24 bg-dashboard-surface rounded-full mx-auto mb-4 flex items-center justify-center text-dashboard-text-muted">
                            <User size={40} />
                        </div>
                        <h3 className="font-bold text-lg text-dashboard-text-primary">John Doe</h3>
                        <p className="text-dashboard-text-secondary text-sm mb-6">Senior Frontend Developer</p>
                        <Button variant="outline" className="w-full border-dashboard-border text-dashboard-text-secondary hover:bg-dashboard-surface hover:text-dashboard-text-primary">
                            Change Avatar
                        </Button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-dashboard-border/50 shadow-sm">
                        <h3 className="font-bold text-sm uppercase tracking-wider text-dashboard-text-primary mb-4 flex items-center gap-2">
                            <Upload size={16} /> Resume
                        </h3>
                        <div className="bg-dashboard-surface/50 border border-dashed border-dashboard-border rounded-xl p-6 text-center hover:bg-dashboard-surface transition-colors cursor-pointer group">
                            <div className="text-sm font-medium text-dashboard-text-primary group-hover:text-dashboard-accent transition-colors">Click to upload</div>
                            <div className="text-xs text-dashboard-text-muted mt-1">PDF, DOCX max 5MB</div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-dashboard-border/50 shadow-sm">
                        <h3 className="font-display font-bold text-xl mb-6 text-dashboard-text-primary">Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-sm font-bold text-dashboard-text-primary">First Name</Label>
                                <Input id="firstName" defaultValue="John" className="bg-dashboard-surface border-transparent focus:bg-white focus:border-dashboard-accent/50 h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-sm font-bold text-dashboard-text-primary">Last Name</Label>
                                <Input id="lastName" defaultValue="Doe" className="bg-dashboard-surface border-transparent focus:bg-white focus:border-dashboard-accent/50 h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-bold text-dashboard-text-primary">Email</Label>
                                <Input id="email" defaultValue="john@example.com" className="bg-dashboard-surface border-transparent focus:bg-white focus:border-dashboard-accent/50 h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-bold text-dashboard-text-primary">Phone</Label>
                                <Input id="phone" defaultValue="+1 (555) 000-0000" className="bg-dashboard-surface border-transparent focus:bg-white focus:border-dashboard-accent/50 h-11" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="headline" className="text-sm font-bold text-dashboard-text-primary">Professional Headline</Label>
                                <Input id="headline" defaultValue="Senior Frontend Developer with 5+ years of experience" className="bg-dashboard-surface border-transparent focus:bg-white focus:border-dashboard-accent/50 h-11" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="bio" className="text-sm font-bold text-dashboard-text-primary">Bio</Label>
                                <Textarea id="bio" className="bg-dashboard-surface border-transparent focus:bg-white focus:border-dashboard-accent/50 min-h-[120px]" placeholder="Tell us about yourself..." />
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <Button className="bg-dashboard-accent text-white hover:bg-dashboard-accent-hover px-8 font-bold">
                                Save Changes
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-dashboard-border/50 shadow-sm">
                        <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2 text-dashboard-text-primary">
                            <Shield size={20} /> Security
                        </h3>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-bold text-sm text-dashboard-text-primary">Password</div>
                                <div className="text-dashboard-text-muted text-sm">Last changed 3 months ago</div>
                            </div>
                            <Button variant="outline" className="border-dashboard-border hover:bg-dashboard-surface text-dashboard-text-primary font-bold">
                                Update Password
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
