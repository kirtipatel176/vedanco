
import { cn } from "@/lib/utils";

const timelineEvents = [
    {
        title: "Discovery Phase",
        date: "Jan 15, 2026",
        status: "completed",
        description: "Initial consultation and requirements gathering.",
    },
    {
        title: "Design Concept",
        date: "Feb 01, 2026",
        status: "completed",
        description: "Proposed 3 design directions for review.",
    },
    {
        title: "Development Sprint 1",
        date: "Feb 15, 2026",
        status: "current",
        description: "Core features implementation.",
    },
    {
        title: "User Acceptance Testing",
        date: "Feb 25, 2026",
        status: "upcoming",
        description: "Client review and feedback period.",
    },
    {
        title: "Final Launch",
        date: "Feb 28, 2026",
        status: "upcoming",
        description: "Deployment to production server.",
    },
];

export function Timeline() {
    return (
        <div className="relative border-l-2 border-dashboard-border/50 ml-3 space-y-8 py-2">
            {timelineEvents.map((event, index) => (
                <div key={index} className="relative pl-8 group">
                    <div className={cn(
                        "absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 transition-colors duration-300",
                        event.status === "completed" ? "bg-dashboard-success border-dashboard-success" :
                            event.status === "current" ? "bg-dashboard-accent border-dashboard-accent animate-pulse" :
                                "bg-dashboard-surface border-dashboard-text-muted"
                    )} />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                        <h4 className={cn(
                            "font-bold text-lg",
                            event.status === "current" ? "text-dashboard-accent" : "text-dashboard-text-primary"
                        )}>
                            {event.title}
                        </h4>
                        <span className="text-xs font-medium text-dashboard-text-muted bg-dashboard-surface px-2 py-1 rounded-md">
                            {event.date}
                        </span>
                    </div>

                    <p className="text-sm text-dashboard-text-secondary max-w-md">
                        {event.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
