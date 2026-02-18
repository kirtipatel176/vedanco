import { apiFetch } from "./api";

export const applicationsService = {
    /**
     * Get the current user's applications (requires auth).
     */
    getAll: (params?: { limit?: number }) => {
        const query = params?.limit ? `?limit=${params.limit}` : "";
        return apiFetch(`/api/applications${query}`);
    },

    /**
     * Get application statistics for the current user (requires auth).
     */
    getStats: () =>
        apiFetch("/api/applications/stats"),

    /**
     * Submit a new job application (public).
     */
    create: (data: {
        jobId: string;
        jobTitle?: string;
        fullName: string;
        email: string;
        phone: string;
        city: string;
        country: string;
        experienceYears: string;
        currentTitle?: string;
        currentCompany?: string;
        expectedSalary?: string;
        startDate?: string;
        resumeUrl: string;
        coverLetterUrl?: string;
        portfolioUrl?: string;
        reasonForApplying?: string;
        skillExperience?: string;
    }) =>
        apiFetch("/api/applications", {
            method: "POST",
            body: JSON.stringify(data),
        }),
};
