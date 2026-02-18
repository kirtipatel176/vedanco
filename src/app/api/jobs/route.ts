import { NextResponse } from "next/server";
import { jobsData } from "@/data/jobs-data";

export async function GET() {
    // In a real app, fetching from MongoDB
    return NextResponse.json({ success: true, data: jobsData });
}

export async function POST(request: Request) {
    const body = await request.json();
    // Simulate creating a new job post
    return NextResponse.json({ success: true, message: "Job posted successfully", id: Math.random().toString(36).substr(2, 9) });
}
