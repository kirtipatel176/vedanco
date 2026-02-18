import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Application from "@/models/Application";

export async function GET() {
    try {
        await connectToDatabase();
        const applications = await Application.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: applications });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch applications" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const body = await request.json();

        // Validate required fields (basic check)
        const requiredFields = [
            "jobId", "fullName", "email", "phone", "city", "country",
            "experienceYears", "resumeUrl"
        ];

        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { success: false, error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Check for duplicate application (email + jobId)
        const existingApplication = await Application.findOne({
            jobId: body.jobId,
            email: body.email
        });

        if (existingApplication) {
            return NextResponse.json(
                { success: false, error: "You have already applied for this position." },
                { status: 400 }
            );
        }

        const application = await Application.create(body);

        return NextResponse.json(
            { success: true, message: "Application submitted successfully", data: application },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Application error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to create application" },
            { status: 500 }
        );
    }
}
