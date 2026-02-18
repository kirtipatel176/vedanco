/**
 * Base API fetch wrapper for the frontend.
 * All requests include credentials (cookies) for cross-origin auth.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = "ApiError";
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function apiFetch<T = any>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        credentials: "include", // Send cookies cross-origin
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Request failed" }));
        throw new ApiError(res.status, error.message || "Request failed");
    }

    return res.json() as Promise<T>;
}
