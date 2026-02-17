import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "it" | "ai" | "marketing" | "branding" | "recruitment" | "podcast" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const baseStyles = "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all hover:translate-y-[-2px] hover:shadow-lg cursor-default font-space-grotesk";

    const variants = {
        default: "border-transparent bg-accent-gold text-black hover:bg-accent-gold/80",
        it: "border-accent-blue/30 bg-accent-blue/10 text-accent-blue",
        ai: "border-accent-teal/30 bg-accent-teal/10 text-accent-teal",
        marketing: "border-accent-amber/30 bg-accent-amber/10 text-accent-amber",
        branding: "border-accent-rose/30 bg-accent-rose/10 text-accent-rose",
        recruitment: "border-accent-violet/30 bg-accent-violet/10 text-accent-violet",
        podcast: "border-accent-orange/30 bg-accent-orange/10 text-accent-orange",
        outline: "text-text-primary border-white/20",
    };

    return (
        <div className={cn(baseStyles, variants[variant], className)} {...props} />
    );
}

export { Badge };
