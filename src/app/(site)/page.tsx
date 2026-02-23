export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Script from "next/script";
import { Hero } from "@/components/home/hero";
import { PartnerMarquee } from "@/components/home/partner-marquee";
import { CompanyOverview } from "@/components/home/company-overview";
import { ServicesGrid } from "@/components/home/services-grid";
import { Highlights } from "@/components/home/highlights";
import { StatsStrip } from "@/components/home/stats-strip";
import { FeaturedJobs } from "@/components/home/featured-jobs";
import { Testimonials } from "@/components/home/testimonials";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { CtaSection } from "@/components/home/cta-section";

import { getJobs } from "@/lib/actions/job.actions";

export const metadata: Metadata = {
  title: "Home",
  description: "Vedanco delivers AI automation, engineering, growth, and talent services for global enterprises.",
  keywords: ["Vedanco", "AI automation", "enterprise services", "digital growth", "global talent"],
  openGraph: {
    title: "Vedanco | One Platform. Six Expert Agencies.",
    description: "Vedanco delivers AI automation, engineering, growth, and talent services for global enterprises.",
    url: "https://vedanco.com",
  },
};

export default async function Home() {
  const featuredJobs = await getJobs({ status: "active" }, 6);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Vedanco",
    url: "https://vedanco.com",
    description: "Vedanco delivers AI automation, engineering, growth, and talent services for global enterprises.",
  };

  return (
    <main>
      <Script id="ld-home" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
      <Hero />
      <PartnerMarquee />
      <CompanyOverview />
      <ServicesGrid />
      <Highlights />
      <PortfolioSection />
      <StatsStrip />
      <FeaturedJobs jobs={featuredJobs} />
      <Testimonials />
      <CtaSection />
    </main>
  );
}
