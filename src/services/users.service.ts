import { apiFetch } from "./api";

export const usersService = {
    /**
     * Get the current user's profile (requires auth).
     */
    getProfile: () =>
        apiFetch("/api/users/me"),

    /**
     * Update the current user's profile (requires auth).
     * Email and password cannot be updated via this endpoint.
     */
    updateProfile: (data: {
        name?: string;
        phone?: string;
        company?: string;
        designation?: string;
        experience?: string;
        skills?: string;
        bio?: string;
    }) =>
        apiFetch("/api/users/me", {
            method: "PUT",
            body: JSON.stringify(data),
        }),
};
