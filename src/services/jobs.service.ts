import { apiFetch } from "./api";

export const jobsService = {
    /**
     * Get all jobs. Optionally filter by status.
     */
    getAll: (filter?: { status?: "active" | "closed" | "draft" }) => {
        const params = filter?.status ? `?status=${filter.status}` : "";
        return apiFetch(`/api/jobs${params}`);
    },

    /**
     * Get a single job by its slug.
     */
    getBySlug: (slug: string) =>
        apiFetch(`/api/jobs/${slug}`),

    /**
     * Create a new job (requires auth).
     */
    create: (data: {
        title: string;
        department: string;
        location: string;
        type: string;
        description: string;
        requirements?: string[];
        salaryRange?: string;
        experienceRequired?: string;
        status?: string;
        slug?: string;
    }) =>
        apiFetch("/api/jobs", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    /**
     * Update a job by ID (requires auth).
     */
    update: (id: string, data: Record<string, unknown>) =>
        apiFetch(`/api/jobs/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }),

    /**
     * Delete a job by ID (requires auth).
     */
    delete: (id: string) =>
        apiFetch(`/api/jobs/${id}`, { method: "DELETE" }),
};
