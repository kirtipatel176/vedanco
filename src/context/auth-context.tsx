"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch, ApiError } from "@/services/api";

interface User {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (userData: User) => void;
    logout: () => void;
    updateUser: (partial: Partial<User>) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Clear the frontend token cookie reliably
function clearTokenCookie() {
    const expires = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
    const clearStr = `token=; path=/; max-age=0; ${expires}; SameSite=Lax`;
    document.cookie = clearStr;
    document.cookie = clearStr + "; Secure";
}

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    // Start with null — MUST match the server render to avoid hydration errors.
    // We restore from localStorage inside useEffect (runs after hydration).
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 1. Immediately restore from localStorage so the avatar shows correctly
        //    without waiting for the network call to complete.
        try {
            const stored = localStorage.getItem("vedanco_user");
            if (stored) {
                setUser(JSON.parse(stored) as User);
            }
        } catch { /* localStorage unavailable (private browsing etc.) */ }

        // 2. Verify with the server in the background to confirm / update the session.
        const verifySession = async () => {
            try {
                const data = await apiFetch<{ success: boolean; user: User }>("/api/auth/me");
                if (data.success && data.user) {
                    setUser(data.user);
                    localStorage.setItem("vedanco_user", JSON.stringify(data.user));
                } else {
                    setUser(null);
                    localStorage.removeItem("vedanco_user");
                    clearTokenCookie();
                }
            } catch (err: unknown) {
                if (err instanceof ApiError && err.status === 401) {
                    setUser(null);
                    localStorage.removeItem("vedanco_user");
                    clearTokenCookie();
                }
                // Non-401 errors (network issues): keep the localStorage user shown above
            } finally {
                setIsLoading(false);
            }
        };

        verifySession();
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("vedanco_user", JSON.stringify(userData));
    };

    const updateUser = (partial: Partial<User>) => {
        setUser((prev) => {
            if (!prev) return prev;
            const updated = { ...prev, ...partial };
            localStorage.setItem("vedanco_user", JSON.stringify(updated));
            return updated;
        });
    };

    const logout = () => {
        apiFetch("/api/auth/logout", {
            method: "POST",
        }).catch(error => {
            console.error("Logout failed", error);
        });
        setUser(null);
        localStorage.removeItem("vedanco_user");
        globalThis.location.href = "/";
    };

    const contextValue = React.useMemo(() => ({
        user,
        isLoading,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [user, isLoading]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
