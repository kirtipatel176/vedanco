"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "@/services/api";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifySession = async () => {
            try {
                const data = await apiFetch<{ success: boolean; user: User }>("/api/auth/me");
                if (data.success && data.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
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

    const logout = async () => {
        try {
            await apiFetch("/api/auth/logout", {
                method: "POST",
            });
        } catch (error) {
            console.error("Logout failed", error);
        }
        setUser(null);
        localStorage.removeItem("vedanco_user");
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
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
