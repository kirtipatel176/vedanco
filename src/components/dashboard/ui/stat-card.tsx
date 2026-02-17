import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    className?: string;
}

export function StatCard({ label, value, icon: Icon, trend, trendUp, className }: StatCardProps) {
    return (
        <div className={cn("bg-dashboard-surface p-6 rounded-2xl flex flex-col justify-between h-full group hover:bg-dashboard-surface-hover transition-colors", className)}>
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white rounded-xl text-dashboard-accent shadow-sm group-hover:shadow-md transition-all group-hover:scale-110 duration-300">
                    <Icon size={24} />
                </div>
                {trend && (
                    <span className={cn("text-xs font-medium px-2 py-1 rounded-full", trendUp ? "bg-dashboard-success-light text-green-700" : "bg-dashboard-error-light text-red-700")}>
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <h3 className="text-3xl font-bold text-dashboard-text-primary tracking-tight">{value}</h3>
                <p className="text-sm font-medium text-dashboard-text-secondary mt-1">{label}</p>
            </div>
        </div>
    );
}
