"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    Building2,
    Calendar,
    Briefcase,
    CheckCircle2,
    Clock,
    XCircle,
    Star,
    Eye,
    Layers,
} from "lucide-react";
import { ApplicationDetailsSheet } from "@/components/dashboard/ApplicationDetailsSheet";
import { getApplications, getApplicationStats } from "@/lib/actions/application.actions";
import { getJobs } from "@/lib/actions/job.actions";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Application {
    _id: string;
    jobTitle?: string;
    jobId: string;
    fullName: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    currentCompany?: string;
    profileImageUrl?: string;
    status: "APPLIED" | "INTERVIEW" | "IN_REVIEW" | "REJECTED" | "OFFER";
    createdAt: string;
}

interface Stats {
    total: number;
    pending: number;
    interviewing: number;
    offers: number;
    rejectionRate: number;
}

const STATUS_FILTERS = [
    { label: "All", value: "ALL", icon: Layers, activeClass: "bg-zinc-900 text-white border-zinc-900" },
    { label: "Applied", value: "APPLIED", icon: Clock, activeClass: "bg-amber-500 text-white border-amber-500" },
    { label: "In Review", value: "IN_REVIEW", icon: Eye, activeClass: "bg-blue-600 text-white border-blue-600" },
    { label: "Interview", value: "INTERVIEW", icon: Star, activeClass: "bg-purple-600 text-white border-purple-600" },
    { label: "Offer", value: "OFFER", icon: CheckCircle2, activeClass: "bg-emerald-600 text-white border-emerald-600" },
    { label: "Rejected", value: "REJECTED", icon: XCircle, activeClass: "bg-red-500 text-white border-red-500" },
];

export default function ApplicationsPage() {
    const { user } = useAuth();
    const [applications, setApplications] = useState<Application[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, interviewing: 0, offers: 0, rejectionRate: 0 });
    const [totalActiveJobs, setTotalActiveJobs] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

    const fetchData = useCallback(async () => {
        if (!user?.email) return;
        try {
            setIsLoading(true);
            const [appsRes, statsRes, jobsRes] = await Promise.all([
                getApplications(undefined, user.email),
                getApplicationStats(user.email),
                getJobs({ status: "active" }),
            ]);
            if (appsRes.success) setApplications(appsRes.data);
            if (statsRes.success && statsRes.stats) setStats(statsRes.stats);
            if (Array.isArray(jobsRes)) setTotalActiveJobs(jobsRes.length);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            toast.error("Failed to load data");
        } finally {
            setIsLoading(false);
        }
    }, [user?.email]);

    useEffect(() => {
        if (user?.email) fetchData();
    }, [user?.email, fetchData]);

    const handleViewDetails = (app: Application) => {
        setSelectedApplication(app);
        setIsSheetOpen(true);
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case "INTERVIEW": return "bg-purple-100 text-purple-700 border-purple-200";
            case "IN_REVIEW": return "bg-blue-100 text-blue-700 border-blue-200";
            case "REJECTED": return "bg-red-100 text-red-700 border-red-200";
            case "OFFER": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            default: return "bg-amber-50 text-amber-700 border-amber-200";
        }
    };

    const filteredApplications = applications.filter((app) => {
        const q = searchTerm.toLowerCase();
        const matchesSearch =
            (app.fullName?.toLowerCase() || "").includes(q) ||
            (app.jobTitle?.toLowerCase() || "").includes(q) ||
            (app.email?.toLowerCase() || "").includes(q);
        const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // ── TABLE BODY ───────────────────────────────────────────
    function renderTableBody() {
        if (isLoading) {
            return Array.from({ length: 5 }, (_, i) => (
                <tr key={`skel-${i}`} className="animate-pulse">
                    <td className="px-6 py-4">
                        <div className="h-8 w-8 bg-zinc-100 rounded-full inline-block mr-3 align-middle" />
                        <div className="h-4 w-32 bg-zinc-100 rounded inline-block align-middle" />
                    </td>
                    <td className="px-6 py-4"><div className="h-4 w-28 bg-zinc-100 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-6 w-20 bg-zinc-100 rounded-full" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-20 bg-zinc-100 rounded" /></td>
                    <td className="px-6 py-4 text-right"><div className="h-8 w-20 bg-zinc-100 rounded inline-block" /></td>
                </tr>
            ));
        }

        if (filteredApplications.length === 0) {
            const emptyHint = statusFilter === "ALL"
                ? "Try adjusting your search."
                : `No applications with status "${statusFilter.replace("_", " ")}".`;
            return (
                <tr>
                    <td colSpan={5} className="px-6 py-14 text-center text-zinc-500">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="h-12 w-12 bg-zinc-50 rounded-full flex items-center justify-center">
                                <Search className="h-5 w-5 text-zinc-300" />
                            </div>
                            <p className="font-medium text-zinc-900">No applications found</p>
                            <p className="text-sm text-zinc-400">{emptyHint}</p>
                        </div>
                    </td>
                </tr>
            );
        }

        return filteredApplications.map((app) => (
            <tr
                key={String(app._id)}
                className="hover:bg-zinc-50/60 transition-colors cursor-pointer"
                onClick={() => handleViewDetails(app)}
            >
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-zinc-100 shrink-0">
                            <AvatarImage
                                src={
                                    app.profileImageUrl ||
                                    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(app.fullName)}`
                                }
                            />
                            <AvatarFallback>{(app.fullName || "??").substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold text-zinc-900 leading-tight">{app.fullName}</div>
                            <div className="text-xs text-zinc-500 mt-0.5">{app.email}</div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="font-medium text-zinc-900">{app.jobTitle || "Unknown Role"}</div>
                    <div className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                        <Building2 size={10} /> {app.currentCompany || "N/A"}
                    </div>
                </td>
                <td className="px-6 py-4">
                    <Badge
                        variant="outline"
                        className={`${getStatusBadgeClass(app.status)} px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold`}
                    >
                        {app.status.replace("_", " ")}
                    </Badge>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                        <Calendar size={12} className="text-zinc-400" />
                        {new Date(app.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </div>
                </td>
                <td className="px-6 py-4 text-right">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-8"
                        onClick={(e) => { e.stopPropagation(); handleViewDetails(app); }}
                    >
                        View Details
                    </Button>
                </td>
            </tr>
        ));
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">

            {/* PAGE HEADER */}
            <div>
                <h1 className="font-display font-bold text-3xl text-zinc-900 tracking-tight">Applications</h1>
                <p className="text-zinc-500 mt-1 text-sm">Track candidate pipeline for all open positions.</p>
            </div>

            {/* ═══════════════════════════════════════
                SECTION 1 — OVERVIEW
            ═══════════════════════════════════════ */}
            <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Total Active Job Positions */}
                    <Card className="border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="flex items-center gap-5 p-6">
                            <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                                <Briefcase className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm text-zinc-500 font-medium">Total Active Positions</p>
                                {isLoading ? (
                                    <div className="h-8 w-16 bg-zinc-100 rounded animate-pulse mt-1" />
                                ) : (
                                    <p className="text-3xl font-bold text-zinc-900">{totalActiveJobs}</p>
                                )}
                                <p className="text-xs text-zinc-400 mt-0.5">Currently open job postings</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Total Applications */}
                    <Card className="border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="flex items-center gap-5 p-6">
                            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm text-zinc-500 font-medium">Total Applications</p>
                                {isLoading ? (
                                    <div className="h-8 w-16 bg-zinc-100 rounded animate-pulse mt-1" />
                                ) : (
                                    <p className="text-3xl font-bold text-zinc-900">{stats.total}</p>
                                )}
                                <p className="text-xs text-zinc-400 mt-0.5">Submitted by candidates</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                SECTION 2 — APPLIED JOBS TABLE
            ═══════════════════════════════════════ */}
            <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Applied Jobs</h2>

                {/* Search + Status Filters */}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-white p-4 rounded-xl border border-zinc-200 shadow-sm mb-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                        <Input
                            placeholder="Search by name, role or email…"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-9 bg-zinc-50 border-zinc-200 focus:bg-white transition-all"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                        {STATUS_FILTERS.map(({ label, value, icon: Icon, activeClass }) => (
                            <button
                                key={value}
                                onClick={() => setStatusFilter(value)}
                                className={cn(
                                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all",
                                    statusFilter === value
                                        ? activeClass
                                        : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-700"
                                )}
                            >
                                <Icon size={12} />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-500 font-medium text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3">Candidate</th>
                                    <th className="px-6 py-3">Applied For</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {renderTableBody()}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-3 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
                        <p className="text-xs text-zinc-500">
                            Showing{" "}
                            <span className="font-semibold text-zinc-900">{filteredApplications.length}</span>
                            {" "}of{" "}
                            <span className="font-semibold text-zinc-900">{applications.length}</span>
                            {" "}applications
                        </p>
                    </div>
                </div>
            </section>

            <ApplicationDetailsSheet
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                application={selectedApplication}
            />
        </div>
    );
}
