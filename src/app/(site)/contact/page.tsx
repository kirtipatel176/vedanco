import ContactPage from "@/components/contact/contact-page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Vedanco",
    description: "Get in touch with Vedanco. We're here to help you build the extraordinary.",
};

export default function Page() {
    return <ContactPage />;
}
