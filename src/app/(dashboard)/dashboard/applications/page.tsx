"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2, Building2, MapPin, Calendar, Clock, ChevronRight, ArrowUpRight } from "lucide-react";
import { ApplicationDetailsSheet } from "@/components/dashboard/ApplicationDetailsSheet";

// Define interface locally to avoid importing server-side models in client component
interface Application {
    _id: string;
    role: string;
    company: string;
    location: string;
    dateApplied: string;
    status: "APPLIED" | "INTERVIEW" | "IN_REVIEW" | "REJECTED" | "OFFER";
    salary?: string;
    jobUrl?: string;
    notes?: string;
}

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Sheet State
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await fetch("/api/applications");
            const data = await response.json();
            if (data.success) {
                setApplications(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch applications:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewDetails = (app: Application) => {
        setSelectedApplication(app);
        setIsSheetOpen(true);
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // Prevent opening details when clicking delete
        if (!confirm("Are you sure you want to delete this application?")) return;

        try {
            const response = await fetch(`/api/applications/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (data.success) {
                setApplications(prev => prev.filter(app => app._id !== id));
            } else {
                alert("Failed to delete application");
            }
        } catch (error) {
            console.error("Error deleting application:", error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "INTERVIEW": return "bg-emerald-100 text-emerald-800 border-emerald-200";
            case "IN_REVIEW": return "bg-amber-100 text-amber-800 border-amber-200";
            case "REJECTED": return "bg-zinc-100 text-zinc-500 border-zinc-200";
            case "OFFER": return "bg-purple-100 text-purple-800 border-purple-200";
            default: return "bg-blue-100 text-blue-800 border-blue-200";
        }
    };

    const filteredApplications = applications.filter(app =>
        (app.role?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (app.company?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="font-display font-black text-3xl text-black tracking-tight">My Applications</h1>
                    <p className="text-zinc-500 font-dm-sans mt-1">Track and manage your submitted applications.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                    <Input
                        placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-10 bg-white border-zinc-200 focus:border-black focus:ring-black/5 rounded-lg transition-all"
                    />
                </div>
            </div>

            {/* Applications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-48 bg-zinc-50 animate-pulse rounded-2xl" />
                    ))
                ) : filteredApplications.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-zinc-200">
                        <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                            <Search className="text-zinc-400 w-6 h-6" />
                        </div>
                        <div className="text-zinc-900 font-bold text-lg mb-1">No applications found</div>
                        <p className="text-sm text-zinc-500">Go to the Dashboard to find and apply for active jobs.</p>
                    </div>
                ) : (
                    filteredApplications.map((app) => (
                        <div
                            key={app._id}
                            onClick={() => handleViewDetails(app)}
                            className="group bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => handleDelete(e, app._id)}
                                    className="h-8 w-8 bg-white/80 backdrop-blur-sm border border-zinc-100 text-zinc-400 hover:text-red-600 hover:border-red-100 hover:bg-red-50 shadow-sm"
                                >
                                    <Trash2 size={14} />
                                </Button>
                            </div>

                            <div>
                                <div className="space-y-1 mb-4">
                                    <h3 className="font-display font-bold text-xl text-black group-hover:text-dashboard-accent transition-colors line-clamp-1 tracking-tight">
                                        {app.role}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                                        <Building2 size={14} className="text-zinc-400" />
                                        <span>{app.company}</span>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                        <MapPin size={14} className="text-zinc-300" />
                                        <span>{app.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                                        <Clock size={14} className="text-zinc-300" />
                                        <span>Applied {new Date(app.dateApplied).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                                <Badge variant="outline" className={`${getStatusColor(app.status)} font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 border`}>
                                    {app.status.replace("_", " ")}
                                </Badge>

                                <div className="flex items-center gap-1 text-xs font-bold text-zinc-300 group-hover:text-black transition-colors">
                                    <span>Details</span>
                                    <ArrowUpRight size={14} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <ApplicationDetailsSheet
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                application={selectedApplication}
            />
        </div>
    );
}
