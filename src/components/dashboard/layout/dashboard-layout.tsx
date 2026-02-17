"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen bg-dashboard-bg overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden w-full transition-all duration-300 ease-in-out">
                <Header />
                <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 max-w-[1600px] w-full mx-auto animate-in fade-in duration-500">
                    {children}
                </main>
            </div>
        </div>
    );
}
