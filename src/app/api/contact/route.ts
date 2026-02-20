import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

interface ContactDocument extends mongoose.Document {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Simple schema to store contact submissions
const contactSchema = new mongoose.Schema<ContactDocument>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
    },
    { timestamps: true }
);

const Contact =
    (mongoose.models.Contact as mongoose.Model<ContactDocument>) ||
    mongoose.model<ContactDocument>("Contact", contactSchema);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { success: false, message: "All fields are required." },
                { status: 400 }
            );
        }

        await connectToDatabase();
        await Contact.create({ name, email, subject, message });

        return NextResponse.json(
            { success: true, message: "Message received! We'll be in touch soon." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
