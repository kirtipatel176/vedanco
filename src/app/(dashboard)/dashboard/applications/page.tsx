"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    Building2,
    Clock,
    Filter,
    Download,
    Briefcase,
    ChevronRight,
    CheckCircle2,
    User,
    Calendar
} from "lucide-react";
import { ApplicationDetailsSheet } from "@/components/dashboard/ApplicationDetailsSheet";
import { getApplications, getApplicationStats } from "@/lib/actions/application.actions";
import { toast } from "sonner";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    status: "APPLIED" | "INTERVIEW" | "IN_REVIEW" | "REJECTED" | "OFFER";
    createdAt: string;
    // ... other fields
}

interface Stats {
    total: number;
    pending: number;
    interviewing: number;
    offers: number;
    rejectionRate: number;
}

export default function ApplicationsPage() {
    const { user } = useAuth();
    const [applications, setApplications] = useState<Application[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, interviewing: 0, offers: 0, rejectionRate: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");

    // Sheet State
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

    const fetchData = useCallback(async () => {
        if (!user?.email) return;
        try {
            setIsLoading(true);
            const [appsRes, statsRes] = await Promise.all([
                getApplications(undefined, user.email),
                getApplicationStats(user.email)
            ]);

            if (appsRes.success) setApplications(appsRes.data);
            if (statsRes.success && statsRes.stats) setStats(statsRes.stats);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            toast.error("Failed to load applications");
        } finally {
            setIsLoading(false);
        }
    }, [user?.email]);

    useEffect(() => {
        if (user?.email) {
            fetchData();
        }
    }, [user?.email, fetchData]);

    const handleViewDetails = (app: Application) => {
        setSelectedApplication(app);
        setIsSheetOpen(true);
    };



    const getStatusColor = (status: string) => {
        switch (status) {
            case "INTERVIEW": return "bg-purple-100 text-purple-700 border-purple-200";
            case "IN_REVIEW": return "bg-blue-100 text-blue-700 border-blue-200";
            case "REJECTED": return "bg-red-100 text-red-700 border-red-200";
            case "OFFER": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            default: return "bg-zinc-100 text-zinc-700 border-zinc-200";
        }
    };

    const filteredApplications = applications.filter(app => {
        const matchesSearch = (app.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (app.jobTitle?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (app.email?.toLowerCase() || "").includes(searchTerm.toLowerCase());

        const matchesfilter = statusFilter === "ALL" || app.status === statusFilter;

        return matchesSearch && matchesfilter;
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="font-display font-bold text-3xl text-zinc-900 tracking-tight">Applications</h1>
                    <p className="text-zinc-500 font-dm-sans mt-1">Manage and track your candidate pipeline.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 bg-white" onClick={() => fetchData()}>
                        Download CSV <Download size={14} className="text-zinc-400" />
                    </Button>
                    <Button className="gap-2 bg-zinc-900 text-white hover:bg-zinc-800">
                        Add Application <ChevronRight size={14} />
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-sm border-zinc-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-500">Total Applications</CardTitle>
                        <Briefcase className="h-4 w-4 text-zinc-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-zinc-900">{stats.total}</div>
                        <p className="text-xs text-zinc-500 mt-1">All time</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-zinc-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-500">Pending Review</CardTitle>
                        <Clock className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-zinc-900">{stats.pending}</div>
                        <p className="text-xs text-zinc-500 mt-1">Requires attention</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-zinc-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-500">Interviewing</CardTitle>
                        <User className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-zinc-900">{stats.interviewing}</div>
                        <p className="text-xs text-zinc-500 mt-1">Active candidates</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-zinc-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-500">Offer Rate</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-zinc-900">
                            {stats.total > 0 ? Math.round((stats.offers / stats.total) * 100) : 0}%
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">{stats.offers} offers sent</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                <div className="relative flex-1 w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                    <Input
                        placeholder="Search candidates, roles, or emails..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-10 bg-zinc-50 border-zinc-200 focus:bg-white transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button
                        variant="outline"
                        size="sm"
                        className={`gap-2 ${statusFilter === 'ALL' ? 'bg-zinc-100' : 'bg-white'}`}
                        onClick={() => setStatusFilter("ALL")}
                    >
                        All
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className={`gap-2 ${statusFilter === 'APPLIED' ? 'bg-zinc-100' : 'bg-white'}`}
                        onClick={() => setStatusFilter("APPLIED")}
                    >
                        Pending
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-white">
                        <Filter size={14} className="text-zinc-500" /> Filter
                    </Button>
                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Candidate</th>
                                <th className="px-6 py-4">Applied For</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Applied Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {(() => {
                                if (isLoading) {
                                    return Array.from({ length: 5 }, (_, i) => (
                                        <tr key={`skeleton-row-${i + 1}-of-5`} className="animate-pulse">
                                            <td className="px-6 py-4"><div className="h-10 w-10 bg-zinc-100 rounded-full inline-block mr-3 align-middle" /><div className="h-4 w-32 bg-zinc-100 rounded inline-block align-middle" /></td>
                                            <td className="px-6 py-4"><div className="h-4 w-24 bg-zinc-100 rounded" /></td>
                                            <td className="px-6 py-4"><div className="h-6 w-16 bg-zinc-100 rounded-full" /></td>
                                            <td className="px-6 py-4"><div className="h-4 w-20 bg-zinc-100 rounded" /></td>
                                            <td className="px-6 py-4 text-right"><div className="h-8 w-8 bg-zinc-100 rounded inline-block" /></td>
                                        </tr>
                                    ));
                                }
                                if (filteredApplications.length === 0) {
                                    return (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="h-12 w-12 bg-zinc-50 rounded-full flex items-center justify-center mb-3">
                                                        <Search className="h-6 w-6 text-zinc-300" />
                                                    </div>
                                                    <p className="font-medium text-zinc-900">No applications found</p>
                                                    <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }
                                return filteredApplications.map((app) => (
                                    <tr
                                        key={app._id}
                                        className="hover:bg-zinc-50/50 transition-colors group cursor-pointer"
                                        onClick={() => handleViewDetails(app)}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border border-zinc-100">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${app.fullName}`} />
                                                    <AvatarFallback>{(app.fullName || "??").substring(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-semibold text-zinc-900">{app.fullName}</div>
                                                    <div className="text-xs text-zinc-500">{app.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-zinc-900">{app.jobTitle || "Unknown Role"}</div>
                                            <div className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                                                <Building2 size={10} /> {app.currentCompany || "N/A"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className={`${getStatusColor(app.status)} px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold`}>
                                                {app.status.replace("_", " ")}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                                <Calendar size={14} className="text-zinc-400" />
                                                {new Date(app.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleViewDetails(app); }}>
                                                View Details
                                            </Button>
                                        </td>
                                    </tr>
                                ));
                            })()}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
                    <p className="text-xs text-zinc-500">Showing {filteredApplications.length} results</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled className="h-8 text-xs">Previous</Button>
                        <Button variant="outline" size="sm" disabled className="h-8 text-xs">Next</Button>
                    </div>
                </div>
            </div>

            <ApplicationDetailsSheet
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                application={selectedApplication}
            />
        </div>
    );
}
