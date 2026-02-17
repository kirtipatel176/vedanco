import { DashboardLayout as Layout } from "@/components/dashboard/layout/dashboard-layout";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <Layout>{children}</Layout>;
}
