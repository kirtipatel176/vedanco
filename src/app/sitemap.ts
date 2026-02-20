import type { MetadataRoute } from "next";
import { servicesData } from "@/data/services-data";
import { portfolioData } from "@/data/portfolio-data";
import { jobsData } from "@/data/jobs-data";

const siteUrl = "https://vedanco.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/company",
    "/services",
    "/portfolio",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceRoutes = Object.keys(servicesData).map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const portfolioRoutes = Object.keys(portfolioData).map((slug) => ({
    url: `${siteUrl}/portfolio/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const careerRoutes = jobsData.map((job) => ({
    url: `${siteUrl}/careers/${job.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes, ...careerRoutes];
}
