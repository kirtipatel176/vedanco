import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Application from "@/models/Application";

export async function GET() {
    try {
        await connectToDatabase();
        const applications = await Application.find().sort({ dateApplied: -1 });
        return NextResponse.json({ success: true, data: applications });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch applications" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const body = await request.json();

        // Check if application already exists for this job
        const existingApplication = await Application.findOne({ jobId: body.jobId });
        if (existingApplication) {
            return NextResponse.json(
                { success: false, error: "You have already applied for this position." },
                { status: 400 }
            );
        }

        const application = await Application.create(body);
        return NextResponse.json({ success: true, data: application });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to create application" }, { status: 500 });
    }
}
