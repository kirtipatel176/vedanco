"use client";

import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MobileNav } from "./mobile-nav";
import { useAuth } from "@/context/auth-context";

export function Header() {
    const { user } = useAuth();

    return (
        <header className="h-16 border-b border-dashboard-border bg-dashboard-bg/80 backdrop-blur-md sticky top-0 z-20 px-4 md:px-6 flex items-center justify-between gap-4">
            {/* Mobile Nav Trigger & Search */}
            <div className="flex items-center gap-4 flex-1">
                <MobileNav />

                {/* Search Bar */}
                <div className="relative w-full max-w-md hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dashboard-text-muted h-4 w-4" />
                    <Input
                        placeholder="Search projects, files..."
                        className="pl-10 bg-dashboard-surface border-none text-sm placeholder:text-dashboard-text-muted focus-visible:ring-1 focus-visible:ring-dashboard-border"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0">

                <div className="flex items-center gap-3 border-l border-dashboard-border pl-4">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-dashboard-text-primary">
                            {user?.name || "User"}
                        </p>
                        <p className="text-xs text-dashboard-text-muted">
                            {user?.email || "No email"}
                        </p>
                    </div>
                    <Avatar className="h-8 w-8 md:h-9 md:w-9 border border-dashboard-border">
                        <AvatarImage src={user?.avatar || undefined} alt={user?.name || "User Avatar"} />
                        <AvatarFallback className="bg-dashboard-accent text-white font-bold text-xs md:text-sm">
                            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
