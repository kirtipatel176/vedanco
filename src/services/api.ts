/**
 * Advanced Client API Fetch Utility. 
 * Formats JSON strictly, wraps try-catch intelligently, and parses server error responses natively.
 */

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = "ApiError";
    }
}

interface FetchOptions extends Omit<RequestInit, 'body'> {
    body?: unknown; // Automatically handles stringification if object
}

export async function apiFetch<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const headers = new Headers(options.headers || {});

    // Automatically apply JSON headers if not FormData
    if (!(options.body instanceof FormData)) {
        if (!headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json');
        }

        if (options.body && typeof options.body === 'object') {
            options.body = JSON.stringify(options.body);
        }
    }

    try {
        const response = await fetch(url, { ...options, body: options.body as BodyInit | null | undefined, headers });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            // Favor the "message" key specifically formatted by our back-end API routes
            throw new ApiError(response.status, data.message || data.error || `HTTP Error ${response.status}`);
        }

        return data as T;
    } catch (error: unknown) {
        if (error instanceof ApiError) {
            throw error; // Rethrow custom ApiErrors
        }
        const msg = error instanceof Error ? error.message : "Unknown Error";
        console.error(`[API Fetch] Error caught during requests to ${url}:`, msg);
        throw error;
    }
}
