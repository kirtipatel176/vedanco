import { apiFetch } from "./api";

export const authService = {
    /**
     * Register a new user. Sets auth cookie on success.
     */
    register: (data: {
        name: string;
        email: string;
        phone: string;
        password: string;
        company?: string;
        designation?: string;
        experience?: string;
        skills?: string;
    }) =>
        apiFetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    /**
     * Login with email and password. Sets auth cookie on success.
     */
    login: (email: string, password: string) =>
        apiFetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        }),

    /**
     * Logout the current user. Clears auth cookie.
     */
    logout: () =>
        apiFetch("/api/auth/logout", { method: "POST" }),
};
