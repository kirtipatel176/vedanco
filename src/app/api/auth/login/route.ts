import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // Mock authentication logic
    const body = await request.json();
    const { email, password } = body;

    // Simulate database look up
    if (email === "demo@vedanco.com" && password === "demo123") {
        return NextResponse.json({
            success: true,
            user: {
                id: "1",
                name: "Demo User",
                email: "demo@vedanco.com",
                role: "user"
            }
        });
    }

    return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
    );
}
