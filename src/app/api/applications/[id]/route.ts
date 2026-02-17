import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Application from "@/models/Application";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const body = await request.json();
        const application = await Application.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        if (!application) {
            return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: application });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update application" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const deletedApplication = await Application.findByIdAndDelete(id);

        if (!deletedApplication) {
            return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Application deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to delete application" }, { status: 500 });
    }
}
