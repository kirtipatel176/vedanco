import { Code, Cpu, Megaphone, User, Briefcase, Mic } from "lucide-react";

export type ServiceData = {
    id: string;
    title: string;
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

export const servicesData: Record<string, ServiceData> = {
    "it-services": {
        id: "it-services",
        title: "IT Services",
        description: "Custom software development and cloud infrastructure solutions built for scale.",
        color: "accent-blue",
        accent: "#4F8EF7", // Hex for inline styles
        icon: Code,
        heroImage: "/images/it-hero.jpg",
        offsetImage: false,
        partner: "Demaze Technologies",
        stats: [
            { label: "Projects Delivered", value: "350+" },
            { label: "Team Strength", value: "120+" },
            { label: "Client Retention", value: "98%" },
        ],
        offerings: [
            { title: "Custom Web Development", description: "Scalable web applications built on Next.js and React." },
            { title: "Cloud Infrastructure", description: "AWS/Azure architecture design and management." },
            { title: "Mobile App Development", description: "Native iOS and Android applications." },
            { title: "Enterprise SaaS", description: "End-to-end SaaS product engineering." },
            { title: "DevOps & CI/CD", description: "Automated deployment pipelines and monitoring." },
            { title: "Legacy Modernization", description: "Upgrading outdated systems to modern tech stacks." },
        ],
        process: [
            { step: "01", title: "Discovery", description: "We analyze your technical requirements and business goals." },
            { step: "02", title: "Architecture", description: "Designing a scalable and secure system blueprint." },
            { step: "03", title: "Development", description: "Agile sprints with regular updates and feedback loops." },
            { step: "04", title: "Launch & Scale", description: "Deployment, monitoring, and continuous improvement." },
        ],
    },
    "ai-automation": {
        id: "ai-automation",
        title: "AI & Automation",
        description: "Intelligent workflows and process automation to drive operational efficiency.",
        color: "accent-teal",
        accent: "#00D4AA",
        icon: Cpu,
        heroImage: "/images/ai-hero.jpg",
        offsetImage: true,
        partner: "Neno Technology",
        stats: [
            { label: "Hours Saved/Mo", value: "5000+" },
            { label: "Process Efficiency", value: "3x" },
            { label: "AI Models Deployed", value: "85+" },
        ],
        offerings: [
            { title: "Workflow Automation", description: "Automate repetitive tasks with custom scripts." },
            { title: "Chatbot Development", description: "AI-powered customer support agents." },
            { title: "Predictive Analytics", description: "Data-driven insights for business growth." },
            { title: "Machine Learning Solutions", description: "Custom ML models for specific business needs." },
            { title: "RPA Implementation", description: "Robotic Process Automation for legacy systems." },
            { title: "Generative AI Integration", description: "Integrating LLMs into your existing workflows." },
        ],
        process: [
            { step: "01", title: "Audit", description: "Identifying bottlenecks and automation opportunities." },
            { step: "02", title: "Prototype", description: "Building a proof of concept to validate the solution." },
            { step: "03", title: "Integration", description: "Seamlessly integrating AI into your stack." },
            { step: "04", title: "Optimization", description: "Continuous learning and model refinement." },
        ],
    },
    "digital-marketing": {
        id: "digital-marketing",
        title: "Digital Marketing",
        description: "Data-driven strategies to amplify your brand reach and drive conversions.",
        color: "accent-amber",
        accent: "#F5A623",
        icon: Megaphone,
        heroImage: "/images/marketing-hero.jpg",
        offsetImage: false,
        partner: "Soarbeam",
        stats: [
            { label: "Ad Spend Managed", value: "$5M+" },
            { label: "Leads Generated", value: "50k+" },
            { label: "ROI Average", value: "450%" },
        ],
        offerings: [
            { title: "SEO Strategy", description: "Dominate search rankings and drive organic traffic." },
            { title: "PPC Campaigns", description: "High-conversion Google and Social Media ads." },
            { title: "Content Marketing", description: "Engaging content that tells your brand story." },
            { title: "Social Media Management", description: "Building communities across all platforms." },
            { title: "Email Marketing", description: "Automated sequences that nurture leads." },
            { title: "Analytics & Reporting", description: "Deep insights into campaign performance." },
        ],
        process: [
            { step: "01", title: "Research", description: "Competitor analysis and audience segmentation." },
            { step: "02", title: "Strategy", description: "Crafting a multi-channel marketing plan." },
            { step: "03", title: "Execution", description: "Launching campaigns and content distribution." },
            { step: "04", title: "Growth", description: "Analyzing data to optimize and scale results." },
        ],
    },
    "personal-branding": {
        id: "personal-branding",
        title: "Personal Branding",
        description: "Crafting authoritative personal brands for founders and executives.",
        color: "accent-rose",
        accent: "#F75D7E",
        icon: User,
        heroImage: "/images/branding-hero.jpg",
        offsetImage: true,
        partner: "SAI Branding",
        stats: [
            { label: "Execs Branded", value: "150+" },
            { label: "LinkedIn Views", value: "25M+" },
            { label: "Press Features", value: "500+" },
        ],
        offerings: [
            { title: "Brand Identity Design", description: "Logos, color palettes, and visual guidelines." },
            { title: "LinkedIn Growth", description: "Profile optimization and content strategy." },
            { title: "Thought Leadership", description: "Ghostwriting and article publication." },
            { title: "Website Development", description: "Personal portfolio websites." },
            { title: "Speaker Coaching", description: "Preparing you for keynote presentations." },
            { title: "Video Production", description: "High-quality video content for socials." },
        ],
        process: [
            { step: "01", title: "Discovery", description: "Uncovering your unique story and values." },
            { step: "02", title: "Identity", description: "Designing your visual and verbal brand." },
            { step: "03", title: "Content", description: "Creating a content engine for consistency." },
            { step: "04", title: "Authority", description: "Positioning you as a leader in your industry." },
        ],
    },
    "us-recruitment": {
        id: "us-recruitment",
        title: "US Recruitment",
        description: "Connecting top-tier US companies with exceptional global talent.",
        color: "accent-violet",
        accent: "#9B6DFF",
        icon: Briefcase,
        heroImage: "/images/recruitment-hero.jpg",
        offsetImage: false,
        partner: "MSpire Ventures",
        stats: [
            { label: "Placements", value: "500+" },
            { label: "Time to Fill", value: "14 Days" },
            { label: "Client Satisfaction", value: "4.9/5" },
        ],
        offerings: [
            { title: "Executive Search", description: "Finding C-level leaders for your organization." },
            { title: "Tech Recruitment", description: "Sourcing developers, engineers, and architects." },
            { title: "RPO Services", description: "End-to-end recruitment process outsourcing." },
            { title: "Contract Staffing", description: "Flexible staffing solutions for projects." },
            { title: "Talent Mapping", description: "Market intelligence on talent availability." },
            { title: "Onboarding Support", description: "Ensuring a smooth transition for new hires." },
        ],
        process: [
            { step: "01", title: "Brief", description: "Understanding your culture and role requirements." },
            { step: "02", title: "Source", description: "Leveraging our network to find hidden gems." },
            { step: "03", title: "Screen", description: "Rigorous technical and behavioral interviews." },
            { step: "04", title: "Place", description: "Negotiation support and successful placement." },
        ],
    },
    "podcast-production": {
        id: "podcast-production",
        title: "Podcast Production",
        description: "Launch and scale your podcast with professional audio and video production.",
        color: "accent-orange",
        accent: "#FF6B35",
        icon: Mic,
        heroImage: "/images/podcast-hero.jpg",
        offsetImage: true,
        partner: "The Founder's Dream",
        stats: [
            { label: "Episodes Produced", value: "1000+" },
            { label: "Downloads", value: "2M+" },
            { label: "Shows Launched", value: "50+" },
        ],
        offerings: [
            { title: "Show Concept & Strategy", description: "Developing your show's format and niche." },
            { title: "Audio & Video Editing", description: "Professional post-production services." },
            { title: "Guest Booking", description: "Securing high-profile guests for your show." },
            { title: "Clip Creation", description: "Short-form clips for social media promotion." },
            { title: "Distribution", description: "Publishing to Spotify, Apple, and YouTube." },
            { title: "Cover Art Design", description: "Eye-catching visuals for your podcast." },
        ],
        process: [
            { step: "01", title: "Plan", description: "Defining your audience and content strategy." },
            { step: "02", title: "Record", description: "Remote or studio recording coordination." },
            { step: "03", title: "Edit", description: "Polishing your content to industry standards." },
            { step: "04", title: "Launch", description: "Detailed launch strategy for maximum impact." },
        ],
    },
};
