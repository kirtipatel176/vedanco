import ContactPage from "@/components/contact/contact-page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Vedanco",
    description: "Get in touch with Vedanco. We're here to help you build the extraordinary.",
    keywords: ["contact Vedanco", "Vedanco email", "Vedanco office"],
    openGraph: {
        title: "Contact Us | Vedanco",
        description: "Get in touch with Vedanco. We're here to help you build the extraordinary.",
        url: "https://vedanco.com/contact",
    },
};

export default function Page() {
    return <ContactPage />;
}
