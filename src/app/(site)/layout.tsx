import Script from "next/script";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Vedanco",
        url: "https://vedanco.com",
        logo: "https://vedanco.com/logo.png",
        sameAs: [
            "https://www.linkedin.com/company/vedanco",
            "https://twitter.com/vedanco",
        ],
        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: "+1-000-000-0000",
                contactType: "sales",
                areaServed: "Global",
                availableLanguage: ["English"],
            },
        ],
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Vedanco",
        url: "https://vedanco.com",
        potentialAction: {
            "@type": "SearchAction",
            target: "https://vedanco.com/services?query={search_term_string}",
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <>
            <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify(organizationSchema)}
            </Script>
            <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify(websiteSchema)}
            </Script>
            <Navbar />
            <main className="flex-grow pt-20 md:pt-0">
                {children}
            </main>
            <Footer />
        </>
    );
}
