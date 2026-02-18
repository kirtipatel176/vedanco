import { getJobs } from "@/lib/actions/job.actions";
import CareersClient from "./careers-client";

export default async function CareersPage() {
    const jobs = await getJobs({ status: "active" });

    return <CareersClient initialJobs={jobs} />;
}
