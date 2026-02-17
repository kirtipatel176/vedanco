import { portfolioData } from "@/lib/portfolio-data";
import { notFound } from "next/navigation";
import ProjectView from "@/components/portfolio/project-view";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const project = portfolioData[slug];

    if (!project) {
        notFound();
    }

    return <ProjectView project={project} />;
}
