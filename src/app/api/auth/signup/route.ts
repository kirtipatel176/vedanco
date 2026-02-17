import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    // Simulate user creation
    // In a real app, you would hash the password and save to MongoDB

    if (!email || !password) {
        return NextResponse.json(
            { success: false, message: "Missing required fields" },
            { status: 400 }
        );
    }

    return NextResponse.json({
        success: true,
        message: "Account created successfully",
        user: {
            id: Math.random().toString(36).substr(2, 9),
            name: `${firstName} ${lastName}`,
            email,
            role: "user"
        }
    });
}
