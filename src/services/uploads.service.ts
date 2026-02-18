import { apiFetch } from "./api";

export const uploadsService = {
    /**
     * Get ImageKit authentication parameters for client-side uploads (requires auth).
     */
    getImageKitAuth: () =>
        apiFetch("/api/uploads/auth"),

    /**
     * Track a newly uploaded file in the backend (requires auth).
     * Call this immediately after a successful ImageKit upload.
     */
    trackUpload: (data: {
        fileId: string;
        url: string;
        filePath: string;
        fileType?: "resume" | "cover_letter" | "other";
    }) =>
        apiFetch("/api/uploads/track", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    /**
     * Trigger cleanup of expired temporary uploads.
     * Typically called by a cron job.
     */
    cleanup: () =>
        apiFetch("/api/uploads/cleanup", { method: "POST" }),
};
