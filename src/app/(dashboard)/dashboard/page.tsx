import { getJobs } from "@/lib/actions/job.actions";

import DashboardClient from "./dashboard-client";

export default async function DashboardOverview() {
    const jobs = await getJobs();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="font-display font-bold text-3xl text-dashboard-text-primary tracking-tight">
                    Dashboard Overview
                </h1>
                <p className="text-dashboard-text-secondary mt-2">
                    Welcome back! Here's what's happening today.
                </p>
            </div>

            <DashboardClient
                initialJobs={jobs}
            />
        </div>
    );
}
