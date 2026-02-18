
import { Code, Cpu, Megaphone, User, Briefcase, Mic } from "lucide-react";

export type ServiceData = {
    id: string;
    title: string;
    headline: string;
    description: string;
    color: string;
    accent: string;
    icon: any;
    heroImage: string; // Placeholder
    offsetImage: boolean; // For alternating layout
    partner: string;
    stats: { label: string; value: string }[];
    offerings: { title: string; description: string }[];
    process: { step: string; title: string; description: string }[];
};

export type ProjectData = {
    id: string;
    title: string;
    client: string;
    description: string;
    category: string;
    image: string; // Placeholder or actual path
    challenge: string;
    solution: string;
    result: string;
    services: string[];
    year: string;
    website?: string;
};

export type JobBox = {
    id: string;
    title: string;
    department: string;
    type: string;
    location: string;
    postedDate: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    niceToHave: string[];
    salaryRange?: string;
};
