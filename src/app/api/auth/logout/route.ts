import { NextResponse } from "next/server";

export async function POST() {
    const isProduction = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({
        success: true,
        message: 'Logged out successfully'
    }, { status: 200 });

    response.cookies.set({
        name: 'token',
        value: '',
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'strict',
        expires: new Date(0),
        path: '/',
    });

    // Also clear jwt if it exists
    response.cookies.set({
        name: 'jwt',
        value: '',
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'strict',
        expires: new Date(0),
        path: '/',
    });

    return response;
}
