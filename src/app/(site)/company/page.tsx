import type { Metadata } from "next";
import { CompanyPage } from "@/components/company/company-page";

export const metadata: Metadata = {
    title: "Company",
    description: "Learn about Vedanco's mission, leadership, and global milestones.",
    keywords: ["Vedanco company", "about Vedanco", "leadership", "global consultancy"],
    openGraph: {
        title: "Company | Vedanco",
        description: "Learn about Vedanco's mission, leadership, and global milestones.",
        url: "https://vedanco.com/company",
    },
};

export default function Page() {
    return <CompanyPage />;
}
