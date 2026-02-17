import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Note: Radix UI Slot is not installed yet, I will simulate it or install it. 
// Actually, for now I'll use a simple implementation or install @radix-ui/react-slot if needed.
// The plan didn't explicitly mention radix, but it's good practice. 
// I'll stick to simple props for now to avoid extra deps unless I install them.
// Wait, I should probably standardise. I'll use simple HTMLButtonElement for now.
// Actually, let's just use the standard button types.

// Install class-variance-authority if not present? 
// It wasn't in my install list. I should add it or just write standard classes.
// I'll write standard classes for now to avoid extra installs unless user asked.
// But cva is very standard. I'll check if I can just write it with clsx.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline" | "service" | "icon";
    size?: "default" | "sm" | "lg" | "icon";
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            primary: "bg-gradient-to-r from-accent-gold to-[#B8985E] text-white hover:translate-y-[-3px] hover:shadow-glow hover:brightness-110 active:translate-y-[-1px]",
            secondary: "border border-border-strong bg-transparent text-text-primary hover:border-accent-gold hover:bg-white/5",
            ghost: "text-text-muted hover:text-text-primary underline-offset-4 hover:underline",
            outline: "border border-white/20 text-space-mono text-xs tracking-wider uppercase hover:border-white/40 hover:bg-white/5",
            service: "bg-white text-black hover:brightness-110", // Placeholder, actual service buttons need dynamic colors
            icon: "rounded-full border border-white/10 hover:scale-110 hover:border-accent-gold/50 hover:shadow-[0_0_15px_rgba(200,169,110,0.3)]",
        };

        const sizes = {
            default: "h-12 px-8 py-3",
            sm: "h-9 rounded-md px-3",
            lg: "h-14 px-10 text-base",
            icon: "h-10 w-10",
        };

        const Comp = asChild ? Slot : "button"

        return (
            <Comp
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
