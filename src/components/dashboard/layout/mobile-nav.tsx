"use client";

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LayoutDashboard, Briefcase, User, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Active Jobs", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Applications", icon: Briefcase, href: "/dashboard/applications" },
    { label: "Profile", icon: User, href: "/dashboard/profile" },
];

export function MobileNav() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-dashboard-text-secondary">
                    <Menu size={24} />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 bg-dashboard-surface border-r border-dashboard-border">
                <SheetHeader className="p-6 border-b border-dashboard-border/50 text-left">
                    <SheetTitle className="font-display font-bold text-xl tracking-tight text-dashboard-text-primary">
                        VEDANCO
                    </SheetTitle>
                </SheetHeader>
                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
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
                <div className="p-4 border-t border-dashboard-border/50 bg-dashboard-surface/50 mt-auto">
                    <Link
                        href="/logout"
                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-dashboard-text-muted hover:text-dashboard-error hover:bg-dashboard-error-light transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
}
