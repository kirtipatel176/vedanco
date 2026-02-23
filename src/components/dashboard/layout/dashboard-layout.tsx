"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: Readonly<DashboardLayoutProps>) {
    return (
        <div className="flex h-screen bg-dashboard-bg text-dashboard-text-primary overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden w-full min-w-0 transition-all duration-300 ease-in-out">
                <Header />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 max-w-[1600px] w-full mx-auto animate-in fade-in duration-500">
                    {children}
                </main>
            </div>
        </div>
    );
}
