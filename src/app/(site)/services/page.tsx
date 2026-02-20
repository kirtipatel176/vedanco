import type { Metadata } from "next";
import { ServicesPage } from "@/components/services/services-page";

export const metadata: Metadata = {
    title: "Services",
    description: "Explore Vedanco's integrated services across AI, engineering, growth, and talent.",
    keywords: ["Vedanco services", "AI automation", "IT services", "digital marketing", "recruitment"],
    openGraph: {
        title: "Services | Vedanco",
        description: "Explore Vedanco's integrated services across AI, engineering, growth, and talent.",
        url: "https://vedanco.com/services",
    },
};

export default function Page() {
    return <ServicesPage />;
}
