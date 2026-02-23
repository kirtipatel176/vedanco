import { NextResponse } from 'next/server';
import { z } from 'zod';

// Brevo Webhook Payload Schema
// We use .passthrough() because Brevo sends many metadata fields we might not strictly define.
const brevoWebhookSchema = z.object({
    event: z.string({ message: "Event type is required" }).min(1, "Event type is required"),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    id: z.number().optional(),
    date: z.string().optional(),
    'message-id': z.string().optional(),
    ts: z.number().optional(),
    tags: z.array(z.string()).optional(),
    tag: z.string().optional()
});

export async function POST(req: Request) {
    try {
        // [Optional Security] Validate a secret token passed via query parameter from Brevo
        // e.g. https://abcd-1234.ngrok.io/api/webhooks/brevo-otp?token=SECRET_VALUE
        // const { searchParams } = new URL(req.url);
        // const token = searchParams.get('token');
        // if (process.env.BREVO_WEBHOOK_SECRET && token !== process.env.BREVO_WEBHOOK_SECRET) {
        //     console.warn("[Brevo Webhook] Unauthorized attempt - Invalid Token");
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        // Ensure proper Content-Type handling
        const contentType = req.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            return NextResponse.json({ error: 'Invalid Content-Type, expected application/json' }, { status: 400 });
        }

        // Parse JSON Body
        const body = await req.json();

        // Validate payload structure
        const parsed = brevoWebhookSchema.safeParse(body);
        if (!parsed.success) {
            console.error("[Brevo Webhook] Error: Invalid Payload Structure", parsed.error.issues);
            return NextResponse.json({ success: false, error: 'Bad Request: Invalid schema' }, { status: 400 });
        }

        const data = parsed.data;

        // Check if this webhook corresponds to our OTP emails explicitly
        const hasOtpTag = data.tags?.includes("otp_registration") || data.tag === "otp_registration";

        if (hasOtpTag) {
            console.log(`\n✅ [Brevo Webhook] OTP Event Logged:`);
            console.log(`   - Event:      ${data.event.toUpperCase()}`);
            console.log(`   - Recipient:  ${data.email}`);
            console.log(`   - Message ID: ${data['message-id']}`);

            // Advanced Warning Logs for failures
            if (["bounce", "hard_bounce", "soft_bounce", "blocked", "spam", "invalid_email"].includes(data.event)) {
                console.warn(`\n⚠️ [Brevo Webhook] WARNING: Email delivery failed!`);
                console.warn(`   - User: ${data.email}`);
                console.warn(`   - Reason: ${data.event.toUpperCase()}`);
                // In a true SaaS app, you might flag the PendingUser or User database here internally.
            }
        } else {
            console.log(`[Brevo Webhook] Non-OTP Event: ${data.event} for ${data.email}`);
        }

        // Brevo requires a strict 200 OK response, otherwise it will repeatedly retry the webhook
        return NextResponse.json({ success: true, message: 'Webhook securely received and verified' }, { status: 200 });

    } catch (error) {
        console.error("[Brevo Webhook] Critical Exception:", error);
        // Important: Return a strict 500 error preventing silent failures during infrastructure logging.
        return NextResponse.json({ success: false, error: 'Internal Server Error processing webhook' }, { status: 500 });
    }
}
