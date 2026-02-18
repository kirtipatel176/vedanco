
import { NextResponse } from "next/server";
import { cleanupExpiredUploads } from "@/lib/actions/upload.actions";

export const dynamic = 'force-dynamic'; // Ensure this route is not cached

export async function GET(request: Request) {
    // Basic security: Check for a secret key in headers or query params if needed.
    // For now, we'll leave it open but dependent on the environment.
    // In production, you'd typically verify a CRON_SECRET header from Vercel/GitHub Actions.

    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await cleanupExpiredUploads();
        return NextResponse.json(result);
    } catch (error) {
        console.error("Cron cleanup failed:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
