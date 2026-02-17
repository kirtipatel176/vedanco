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

export const portfolioData: Record<string, ProjectData> = {
    "fintech-revolution": {
        id: "fintech-revolution",
        title: "Fintech Revolution",
        client: "NeoBank Corp",
        description: "Reimagining digital banking for the next generation of investors.",
        category: "IT Services",
        image: "/images/portfolio/fintech.png",
        challenge: "The client needed to migrate a legacy banking system to a cloud-native microservices architecture while maintaining 99.99% uptime and strict regulatory compliance.",
        solution: "We designed a scalable AWS infrastructure using Kubernetes and Lambda functions. The frontend was rebuilt with Next.js for sub-second page loads, and we implemented biometric authentication for enhanced security.",
        result: "60% reduction in server costs, 3x faster transaction processing, and a 4.8/5 app store rating within 3 months of launch.",
        services: ["Cloud Architecture", "Mobile App Dev", "UI/UX Design"],
        year: "2024",
        website: "https://example.com"
    },
    "ai-customer-support": {
        id: "ai-customer-support",
        title: "AI Customer Support",
        client: "Global Retailer",
        description: "Automating customer interactions with a custom LLM agent.",
        category: "AI & Automation",
        image: "/images/portfolio/ai-agent.png",
        challenge: "Support costs were skyrocketing due to manual ticket handling, with response times averaging 24 hours.",
        solution: "We fine-tuned a Llama-3 model on their support history and integrated it via a RAG pipeline. The agent now handles 80% of Level 1 queries autonomously.",
        result: "Reduced support costs by 70%, improved CSAT scores by 35%, and achieved instant 24/7 response times.",
        services: ["LLM Integration", "Chatbot Dev", "Data Engineering"],
        year: "2023",
        website: "https://example.com"
    },
    "luxury-brand-identity": {
        id: "luxury-brand-identity",
        title: "Luxury Brand Identity",
        client: "Aura Fashion",
        description: "A digital-first rebranding for a heritage fashion house.",
        category: "Personal Branding",
        image: "/images/portfolio/fashion.png",
        challenge: "The brand's identiy felt outdated and wasn't resonating with Gen Z consumers.",
        solution: "We crafted a comprehensive visual identity including a new logo, typography system, and a motion-rich e-commerce experience.",
        result: "200% increase in online sales, featured in Vogue Digital, and 50k new Instagram followers in launch week.",
        services: ["Brand Strategy", "Web Design", "Content Production"],
        year: "2024",
        website: "https://example.com"
    },
    "global-talent-acquisition": {
        id: "global-talent-acquisition",
        title: "Global Talent Scale",
        client: "TechGiant Inc",
        description: "Staffing a new R&D center with 50+ engineers in 60 days.",
        category: "US Recruitment",
        image: "/images/portfolio/recruitment.png",
        challenge: "The client needed to rapidly scale a new AI division but struggled to find specialized talent in a competitive market.",
        solution: "We deployed our RPO team, utilizing AI-driven sourcing and automated screening to qualify candidates at speed.",
        result: "All 50 positions filled within timeline, with a 95% offer acceptance rate and 100% retention after 6 months.",
        services: ["RPO", "Executive Search", "Technical Screening"],
        year: "2023",
        website: "https://example.com"
    },
    "podcast-launch": {
        id: "podcast-launch",
        title: "The Future of Tech",
        client: "Innovate Media",
        description: "Producing a chart-topping tech podcast from scratch.",
        category: "Podcast Production",
        image: "/images/portfolio/podcast.png",
        challenge: "The client wanted to establish thought leadership but lacked the technical expertise for high-quality audio/video production.",
        solution: "We handled everything from studio setup and recording to editing and distribution. We also created short-form clips for TikTok and Reels.",
        result: "Top 10 Technology Podcast on Spotify, 100k+ downloads per episode, and sponsorship deals with major tech brands.",
        services: ["Audio Engineering", "Video Editing", "Social Media"],
        year: "2024",
        website: "https://example.com"
    },
    "marketing-growth-engine": {
        id: "marketing-growth-engine",
        title: "SaaS Growth Engine",
        client: "CloudFlow",
        description: "Scaling ARR from $1M to $5M through paid acquisition.",
        category: "Digital Marketing",
        image: "/images/portfolio/marketing.png",
        challenge: "Customer acquisition cost (CAC) was too high, and organic growth had plateaued.",
        solution: "We implemented a multi-channel strategy (LinkedIn, Google Ads) with hyper-targeted landing pages and automated email nurture sequences.",
        result: "5x ROI on ad spend, 300% increase in qualified leads, and successfully hit the $5M ARR target.",
        services: ["PPC", "SEO", "Email Marketing"],
        year: "2023",
        website: "https://example.com"
    }
};
