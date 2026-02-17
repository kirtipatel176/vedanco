"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Briefcase,
    User,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
    { label: "Active Jobs", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Applications", icon: Briefcase, href: "/dashboard/applications" },
    { label: "Profile", icon: User, href: "/dashboard/profile" },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "bg-dashboard-surface border-r border-dashboard-border h-full flex flex-col transition-all duration-300 z-10 hidden md:flex",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-dashboard-border/50">
                {!isCollapsed && (
                    <span className="font-display font-bold text-xl tracking-tight text-dashboard-text-primary">
                        VEDANCO
                    </span>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="ml-auto text-dashboard-text-secondary hover:bg-dashboard-surface-hover"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative group",
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
                            {!isCollapsed && <span>{item.label}</span>}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-dashboard-accent rounded-r-md" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-dashboard-border/50">
                <Link
                    href="/logout"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-dashboard-text-muted hover:text-dashboard-error hover:bg-dashboard-error-light transition-colors",
                        isCollapsed && "justify-center"
                    )}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span>Sign Out</span>}
                </Link>
            </div>
        </aside>
    );
}
