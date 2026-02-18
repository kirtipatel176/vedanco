"use client";

import { useAuth } from "@/context/auth-context";

import { useState, useTransition } from "react";
import { IJob } from "@/models/Job";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Calendar, Plus, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { ApplicationDialog } from "@/components/dashboard/ApplicationDialog";
import { JobDialog } from "@/components/dashboard/JobDialog";
import { createJob, updateJob, deleteJob } from "@/lib/actions/job.actions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface DashboardClientProps {
    initialJobs: any[];
}

export default function DashboardClient({ initialJobs }: DashboardClientProps) {
    const { user } = useAuth();
    const [jobs, setJobs] = useState(initialJobs);

    // Application State
    const [selectedJobForApp, setSelectedJobForApp] = useState<any | null>(null);
    const [isAppDialogOpen, setIsAppDialogOpen] = useState(false);

    // Job Management State
    const [selectedJobForEdit, setSelectedJobForEdit] = useState<any | null>(null);
    const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
    const [jobDialogMode, setJobDialogMode] = useState<"add" | "edit">("add");

    const [isPending, startTransition] = useTransition();

    const handleApply = (job: any) => {
        setSelectedJobForApp(job);
        setIsAppDialogOpen(true);
    };

    const handleCreateJob = () => {
        setSelectedJobForEdit(null);
        setJobDialogMode("add");
        setIsJobDialogOpen(true);
    };

    const handleEditJob = (job: any) => {
        setSelectedJobForEdit(job);
        setJobDialogMode("edit");
        setIsJobDialogOpen(true);
    };

    const handleDeleteJob = async (id: string) => {
        if (confirm("Are you sure you want to delete this job?")) {
            try {
                // Optimistic update
                setJobs(prev => prev.filter(j => j._id !== id));
                await deleteJob(id);
            } catch (error) {
                console.error("Failed to delete job", error);
                alert("Failed to delete job");
                // Revert if needed or fetch jobs again?
            }
        }
    };

    const handleJobSubmit = async (values: any) => {
        try {
            // Process requirements string to array
            const jobData = {
                ...values,
                requirements: values.requirements
                    ? values.requirements.split('\n').filter((req: string) => req.trim() !== '')
                    : []
            };

            if (jobDialogMode === "add") {
                const newJob = await createJob(jobData);
                setJobs([newJob, ...jobs]);
                alert("Job created successfully!");
            } else {
                const updated = await updateJob(selectedJobForEdit._id, jobData);
                setJobs(jobs.map(j => j._id === updated._id ? updated : j));
                alert("Job updated successfully!");
            }
            setIsJobDialogOpen(false);
        } catch (error) {
            console.error("Error saving job:", error);
            alert("Failed to save job details.");
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div></div> {/* Spacer if needed */}
                <div></div> {/* Spacer if needed */}
                <div></div> {/* Spacer if needed */}
                {/* Job creation disabled for standard users */}
                {/* <Button onClick={handleCreateJob} className="bg-black text-white hover:bg-zinc-800">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Job
                </Button> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <Card key={job._id || job.id} className="flex flex-col border-dashboard-border/50 shadow-sm hover:shadow-md transition-all relative group">
                        {/* <div className="absolute top-3 right-3 z-10">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-white">
                                    <DropdownMenuItem onClick={() => handleEditJob(job)}>
                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteJob(job._id || job.id)} className="text-red-600 focus:text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div> */}

                        <CardHeader>
                            <div className="flex justify-between items-start pr-8">
                                <div>
                                    <CardTitle className="text-xl mb-1 text-dashboard-text-primary">{job.title}</CardTitle>
                                    <CardDescription className="text-dashboard-text-secondary">{job.department}</CardDescription>
                                </div>
                            </div>
                            <div className="mt-2 flex gap-2">
                                <Badge variant="outline" className="text-dashboard-text-secondary border-dashboard-border bg-dashboard-surface">{job.type}</Badge>
                                <Badge variant={job.status === 'active' ? 'default' : job.status === 'draft' ? 'secondary' : 'destructive'}
                                    className={job.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : ''}>
                                    {job.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <div className="flex flex-col space-y-2 text-sm text-dashboard-text-muted">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" />
                                    <span>{job.salaryRange || "Competitive"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span suppressHydrationWarning>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <p className="text-sm line-clamp-3 text-dashboard-text-secondary">
                                {job.description}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full" onClick={() => handleApply(job)}>
                                Preview Application
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Application Dialog (Preview/Test) */}
            <ApplicationDialog
                open={isAppDialogOpen}
                onOpenChange={setIsAppDialogOpen}
                mode="add"
                initialValues={selectedJobForApp ? {
                    role: selectedJobForApp.title,
                    company: "Vedanco - " + selectedJobForApp.department,
                    location: selectedJobForApp.location,
                    salary: selectedJobForApp.salaryRange || "",
                    status: "APPLIED",
                    dateApplied: new Date().toISOString().split("T")[0],
                    jobUrl: "",
                    notes: ""
                } : undefined}
                onSubmit={async (data) => {
                    alert("This is a preview of the application form.");
                    setIsAppDialogOpen(false);
                }}
            />

            {/* Job Management Dialog */}
            <JobDialog
                open={isJobDialogOpen}
                onOpenChange={setIsJobDialogOpen}
                mode={jobDialogMode}
                initialValues={selectedJobForEdit}
                onSubmit={handleJobSubmit}
            />
        </>
    );
}
