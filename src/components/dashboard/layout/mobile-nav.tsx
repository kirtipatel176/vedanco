"use client";

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LayoutDashboard, Briefcase, User, LogOut, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
    { label: "Active Jobs", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Applications", icon: Briefcase, href: "/dashboard/applications" },
    { label: "Profile", icon: User, href: "/dashboard/profile" },
];

export function MobileNav() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-dashboard-text-secondary">
                    <Menu size={24} />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[340px] p-0 bg-dashboard-surface border-r border-dashboard-border flex flex-col">
                {/* Header */}
                <SheetHeader className="p-5 border-b border-dashboard-border/50 text-left">
                    <SheetTitle className="font-display font-black text-2xl tracking-tight text-dashboard-text-primary flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="Vedanco Logo"
                            width={32}
                            height={32}
                            className="h-7 w-auto object-contain"
                            priority
                        />
                        <span className="mt-1">VEDANCO</span>
                    </SheetTitle>
                </SheetHeader>

                {/* Nav Links */}
                <nav className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors relative group",
                                    isActive
                                        ? "bg-white text-dashboard-accent shadow-sm"
                                        : "text-dashboard-text-secondary hover:bg-dashboard-surface-hover hover:text-dashboard-text-primary"
                                )}
                            >
                                <item.icon
                                    size={20}
                                    className={cn(
                                        "shrink-0 transition-colors",
                                        isActive ? "text-dashboard-accent" : "text-dashboard-text-muted group-hover:text-dashboard-text-primary"
                                    )}
                                />
                                <span>{item.label}</span>
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-dashboard-accent rounded-r-md" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-dashboard-border/50 space-y-2">
                    {/* User info */}
                    {user && (
                        <div className="flex items-center gap-3 px-3 py-2 mb-2">
                            <Avatar className="h-8 w-8 border border-dashboard-border shrink-0">
                                <AvatarImage src={user.avatar || undefined} alt="User Avatar" />
                                <AvatarFallback className="bg-dashboard-accent text-white text-xs font-bold">
                                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-dashboard-text-primary truncate">{user.name}</p>
                                <p className="text-xs text-dashboard-text-muted truncate">{user.email}</p>
                            </div>
                        </div>
                    )}

                    {/* Back to Website */}
                    <Link
                        href="/"
                        onClick={() => setOpen(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-dashboard-text-secondary hover:text-dashboard-text-primary hover:bg-dashboard-surface-hover transition-colors"
                    >
                        <ChevronLeft size={20} />
                        <span>Back to Website</span>
                    </Link>

                    {/* Sign Out */}
                    <button
                        onClick={() => {
                            logout();
                            setOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-dashboard-text-muted hover:text-dashboard-error hover:bg-dashboard-error-light transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
