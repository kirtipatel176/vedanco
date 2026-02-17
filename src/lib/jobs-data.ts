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

export const jobsData: JobBox[] = [
    {
        id: "full-stack-developer",
        title: "Full Stack Developer",
        department: "IT Services",
        type: "Full-Time",
        location: "Remote / Ahmedabad",
        postedDate: "2024-02-15",
        description: "We are looking for a skilled Full Stack Developer to build scalable web applications using Next.js, Node.js, and MongoDB.",
        responsibilities: [
            "Develop and maintain web applications using Next.js and React.",
            "Design and implement RESTful APIs using Node.js and Express.",
            "Collaborate with cross-functional teams to define, design, and ship new features.",
            "Ensure the performance, quality, and responsiveness of applications.",
        ],
        requirements: [
            "3+ years of experience with React and Node.js.",
            "Strong understanding of JavaScript/TypeScript, HTML, and CSS.",
            "Experience with database technologies like MongoDB or PostgreSQL.",
            "Familiarity with cloud platforms like AWS or Vercel.",
        ],
        niceToHave: [
            "Experience with GraphQL.",
            "Knowledge of Docker and Kubernetes.",
            "Open source contributions.",
        ],
        salaryRange: "$60k - $90k",
    },
    {
        id: "ai-ml-engineer",
        title: "AI / ML Engineer",
        department: "AI & Automation",
        type: "Full-Time",
        location: "Remote",
        postedDate: "2024-02-18",
        description: "Join our AI team to build cutting-edge machine learning models and automation solutions for our clients.",
        responsibilities: [
            "Design and build machine learning models for predictive analytics.",
            "Develop NLP algorithms for chatbot applications.",
            "Deploy models to production and monitor performance.",
            "Research and implement new AI technologies.",
        ],
        requirements: [
            "Master's degree in Computer Science, AI, or related field.",
            "Proficiency in Python and libraries like TensorFlow or PyTorch.",
            "Experience with data preprocessing and feature engineering.",
            "Strong problem-solving skills.",
        ],
        niceToHave: [
            "Experience with LLMs (GPT, Llama).",
            "Knowledge of MLOps best practices.",
        ],
        salaryRange: "$80k - $120k",
    },
    {
        id: "social-media-manager",
        title: "Social Media Manager",
        department: "Digital Marketing",
        type: "Full-Time",
        location: "Ahmedabad",
        postedDate: "2024-02-20",
        description: "Lead our social media strategy and manage campaigns for high-profile clients across various platforms.",
        responsibilities: [
            "Develop and execute social media strategies.",
            "Create engaging content for Instagram, LinkedIn, and Twitter.",
            "Monitor trends and analyze campaign performance.",
            "Manage community engagement and respond to comments.",
        ],
        requirements: [
            "3+ years of experience in social media marketing.",
            "Strong copywriting and visual storytelling skills.",
            "Proficiency with social media analytics tools.",
            "Ability to manage multiple client accounts.",
        ],
        niceToHave: [
            "Experience with video editing tools.",
            "Knowledge of paid social advertising.",
        ],
        salaryRange: "$40k - $60k",
    },
    {
        id: "personal-branding-consultant",
        title: "Personal Branding Consultant",
        department: "Personal Branding",
        type: "Full-Time",
        location: "Ahmedabad",
        postedDate: "2024-02-22",
        description: "Work with C-suite executives and founders to build and manage their personal brands online.",
        responsibilities: [
            "Conduct personal brand audits and strategy sessions.",
            "Develop content calendars for LinkedIn and Twitter.",
            "Coordinate with design and copy teams for assets.",
            "Track and report on personal brand growth metrics.",
        ],
        requirements: [
            "Experience in PR, communications, or branding.",
            "Excellent understanding of LinkedIn algorithms.",
            "Strong interpersonal and interviewing skills.",
            "Ability to capture a client's unique voice.",
        ],
        niceToHave: [
            "Ghostwriting experience.",
            "Network of media contacts.",
        ],
        salaryRange: "$50k - $75k",
    },
    {
        id: "us-it-recruiter",
        title: "US IT Recruiter",
        department: "US Recruitment",
        type: "Full-Time",
        location: "Remote",
        postedDate: "2024-02-25",
        description: "Source and recruit top technical talent for US-based clients in a fast-paced environment.",
        responsibilities: [
            "Source candidates through job boards, LinkedIn, and referrals.",
            "Screen resumes and conduct initial phone interviews.",
            "Coordinate interviews with hiring managers.",
            "Negotiate offers and manage the onboarding process.",
        ],
        requirements: [
            "2+ years of experience in US IT staffing.",
            "Familiarity with visa types (H1B, OPT, etc.) and tax terms (W2, C2C).",
            "Strong communication and negotiation skills.",
            "Ability to work in US time zones.",
        ],
        niceToHave: [
            "Experience with ATS software.",
            "Technical background.",
        ],
        salaryRange: "$30k - $50k + Commission",
    },
];
