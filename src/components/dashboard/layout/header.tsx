"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MobileNav } from "./mobile-nav";

export function Header() {
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
                <Button variant="ghost" size="icon" className="text-dashboard-text-secondary hover:bg-dashboard-surface hover:text-dashboard-text-primary relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-dashboard-error rounded-full border-2 border-white" />
                </Button>
                <div className="flex items-center gap-3 border-l border-dashboard-border pl-4">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-dashboard-text-primary">John Doe</p>
                        <p className="text-xs text-dashboard-text-muted">Acme Corp</p>
                    </div>
                    <Avatar className="h-8 w-8 md:h-9 md:w-9 border border-dashboard-border">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-dashboard-accent text-white font-bold text-xs md:text-sm">JD</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
