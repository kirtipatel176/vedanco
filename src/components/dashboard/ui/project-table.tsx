"use client";

import { cn } from "@/lib/utils";
import { MoreHorizontal, ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const projects = [
    {
        id: "VED-001",
        name: "Brand Identity Revamp",
        service: "Branding",
        status: "In Progress",
        progress: 75,
        manager: { name: "Michael Scott", initial: "MS" },
        startDate: "Jan 15, 2026",
        dueDate: "Feb 28, 2026",
    },
    {
        id: "VED-002",
        name: "Marketing Campaign Q1",
        service: "Marketing",
        status: "Planning",
        progress: 30,
        manager: { name: "Pam Beesly", initial: "PB" },
        startDate: "Feb 01, 2026",
        dueDate: "Mar 15, 2026",
    },
    {
        id: "VED-003",
        name: "E-commerce Platform",
        service: "Development",
        status: "Review",
        progress: 90,
        manager: { name: "Jim Halpert", initial: "JH" },
        startDate: "Jan 05, 2026",
        dueDate: "Feb 20, 2026",
    },
    {
        id: "VED-004",
        name: "Talent Acquisition",
        service: "Recruitment",
        status: "Completed",
        progress: 100,
        manager: { name: "Dwight Schrute", initial: "DS" },
        startDate: "Dec 10, 2025",
        dueDate: "Jan 30, 2026",
    },
];

export function ProjectTable() {
    return (
        <div className="bg-white rounded-2xl border border-dashboard-border/50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-dashboard-surface text-dashboard-text-secondary border-b border-dashboard-border">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Project Name</th>
                            <th className="px-6 py-4 font-semibold">Service</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Progress</th>
                            <th className="px-6 py-4 font-semibold">Manager</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dashboard-border/50">
                        {projects.map((project) => (
                            <tr
                                key={project.id}
                                className="hover:bg-dashboard-surface transition-colors group cursor-pointer"
                                onClick={() => window.location.href = `/dashboard/projects/${project.id}`}
                            >
                                <td className="px-6 py-4">
                                    <div className="font-bold text-dashboard-text-primary group-hover:text-dashboard-accent transition-colors">{project.name}</div>
                                    <div className="text-xs text-dashboard-text-muted mt-0.5">ID: {project.id}</div>
                                </td>
                                <td className="px-6 py-4 text-dashboard-text-secondary">
                                    {project.service}
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant="outline" className={cn(
                                        "border-none font-medium px-2.5 py-1",
                                        project.status === 'In Progress' && "bg-blue-50 text-blue-700",
                                        project.status === 'Planning' && "bg-gray-100 text-gray-700",
                                        project.status === 'Review' && "bg-amber-50 text-amber-700",
                                        project.status === 'Completed' && "bg-emerald-50 text-emerald-700",
                                    )}>
                                        {project.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-2 bg-dashboard-surface rounded-full w-24 overflow-hidden">
                                            <div
                                                className="h-full bg-dashboard-accent rounded-full"
                                                style={{ width: `${project.progress}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-medium text-dashboard-text-secondary">{project.progress}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback className="text-xs bg-dashboard-accent-light text-dashboard-accent">{project.manager.initial}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-dashboard-text-secondary">{project.manager.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Button variant="ghost" size="icon" className="hover:bg-dashboard-surface-hover text-dashboard-text-secondary hover:text-dashboard-accent">
                                        <Eye size={18} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
