import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "destructive" | "outline" | "it" | "ai" | "marketing" | "branding" | "recruitment" | "podcast" | "success" | "warning" | "error" | "info" | "glass";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const baseStyles = "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all hover:translate-y-[-2px] hover:shadow-lg cursor-default font-space-grotesk";

    const variants = {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Custom variants
        it: "border-accent-blue/30 bg-accent-blue/10 text-accent-blue",
        ai: "border-accent-teal/30 bg-accent-teal/10 text-accent-teal",
        marketing: "border-accent-amber/30 bg-accent-amber/10 text-accent-amber",
        branding: "border-accent-rose/30 bg-accent-rose/10 text-accent-rose",
        recruitment: "border-accent-violet/30 bg-accent-violet/10 text-accent-violet",
        podcast: "border-accent-orange/30 bg-accent-orange/10 text-accent-orange",

        // Status & Utility variants
        success: "border-green-500/30 bg-green-500/10 text-green-500 hover:bg-green-500/20",
        warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
        error: "border-red-500/30 bg-red-500/10 text-red-500 hover:bg-red-500/20",
        info: "border-blue-500/30 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
        glass: "border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10",
    };

    return (
        <div className={cn(baseStyles, variants[variant], className)} {...props} />
    );
}

export { Badge };
