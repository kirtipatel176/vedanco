import { Hero } from "@/components/home/hero";
import { PartnerMarquee } from "@/components/home/partner-marquee";
import { ServicesGrid } from "@/components/home/services-grid";
import { StatsStrip } from "@/components/home/stats-strip";
import { FeaturedJobs } from "@/components/home/featured-jobs";
import { Testimonials } from "@/components/home/testimonials";
import { PortfolioSection } from "@/components/home/portfolio-section";

import { getJobs } from "@/lib/actions/job.actions";

export default async function Home() {
  const featuredJobs = await getJobs({ status: "active" }, 6);

  return (
    <main>
      <Hero />
      <PartnerMarquee />
      <ServicesGrid />
      <PortfolioSection />
      <StatsStrip />
      <FeaturedJobs jobs={featuredJobs} />
      <Testimonials />
    </main>
  );
}
