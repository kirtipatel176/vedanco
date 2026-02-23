import { getJobs } from "./src/lib/actions/job.actions";

async function main() {
    try {
        console.log("Fetching jobs...");
        const jobs = await getJobs();
        console.log("Jobs found:", jobs.length);
        console.log("Latest job:", JSON.stringify(jobs[0], null, 2));
    } catch (error) {
        console.error("Error:", error);
    }
    process.exit(0);
}

main();
