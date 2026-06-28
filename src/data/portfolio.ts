export interface Milestone {
  id: string;
  type: "experience" | "education" | "accreditation" | "recognition";
  role: string;
  company: string;
  period: string;
  description: string;
  tags?: string[];
  duration?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  metrics?: string;
  link?: string;
  highlights?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  location: string;
  summary: string;
  skills: SkillCategory[];
  milestones: Milestone[];
  projects: Project[];
}

export const portfolioData: PortfolioData = {
  name: "Tanya Singh",
  title: "AI-Native Forward Deployed Engineer & Frontend Architect",
  location: "India",
  summary: "Highly accomplished Lead Software Engineer with over 8 years of experience building scalable, full-stack enterprise applications. Expert in modern JavaScript ecosystems, MACH architectures, and WCAG 2.1 AA accessibility remediation. Specialized in AI-augmented development workflows to drive developer velocity and code efficiency.",
  skills: [
    {
      category: "Frontend Architecture & UI",
      skills: [
        "React.js",
        "Next.js 15",
        "TypeScript",
        "JavaScript (ES6+)",
        "HTML5 / CSS3",
        "Angular",
        "Vue.js",
        "Redux",
        "Zustand",
        "Storybook",
        "Style Dictionary",
        "Micro-Frontends",
        "Server-Side Rendering (SSR)",
        "Single Page Applications (SPA)",
      ]
    },
    {
      category: "Backend Systems & APIs",
      skills: [
        "Node.js",
        "NestJS",
        "GraphQL Server",
        "GraphQL Federation",
        "RESTful APIs",
        "BFF (Backend-for-Frontend)",
        "API Gateways",
        "Microservices",
        "Event-Driven Architecture",
        "Domain-Driven Design (DDD)",
        "Repository Pattern",
        "Adapter Pattern",
        "Query Batching",
        "Field-Level Caching"
      ]
    },
    {
      category: "Cloud & DevOps Infrastructure",
      skills: [
        "AWS (Lambda, CloudFront)",
        "Azure (Functions, Service Bus)",
        "GCP",
        "Docker",
        "Kubernetes (k8s)",
        "Terraform (IaC)",
        "CI/CD Pipelines",
        "GitLab CI / GitHub Actions",
        "Jenkins",
        "Docker-based Monorepos",
        "GitFlow",
        "Serverless Architecture"
      ]
    },
    {
      category: "Databases, Data Flow & Caching",
      skills: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Azure Cosmos DB",
        "Redis",
        "TailorJS (Fragment Caching)",
        "BigCommerce",
        "OrderDynamics",
        "ShipperHQ",
        "Narvar",
        "Databricks",
        "Apache Kafka"
      ]
    },
    {
      category: "QA, Compliance & Security",
      skills: [
        "Test-Driven Development (TDD)",
        "Jest",
        "Cypress",
        "Custom ESLint Governance",
        "Automated Quality Gates",
        "WCAG AA Remediation",
        "OAuth 2.0 & OWASP",
        "GDPR & PII Management",
        "Banking Compliance"
      ]
    },
    {
      category: "Observability & Experimentation",
      skills: [
        "Datadog",
        "Grafana",
        "Prometheus",
        "Statsig (A/B Testing)",
        "Constructor.io Search",
        "Google Analytics (GA4)",
        "Google Tag Manager (GTM)"
      ]
    },
    {
      category: "AI & Developer Tooling",
      skills: [
        "LLM Agents",
        "Model Context Protocol (MCP)",
        "Prompt Engineering",
        "LangChain",
        "Vector Databases",
        "VS Code AI Integration",
        "Claude Code / Cursor",
        "Python",
        "Bash Scripting"
      ]
    }
  ],
  milestones: [
    {
      id: "cca",
      type: "accreditation",
      role: "Claude Certified Architect – Foundations (CCAF) - Early Adopter",
      company: "ANTHROPIC",
      period: "2026",
      description: "Formally accredited for engineering and designing agentic systems using LLM workflows, Claude Code integrations, and custom Model Context Protocol (MCP) servers."
    },
    {
      id: "epam-lead",
      type: "experience",
      role: "Lead Software Engineer & Solutions Architect",
      company: "EPAM SYSTEMS",
      period: "Dec 2020 - Present",
      description: "Architecting event-driven MACH platforms for global clients from greenfield Next.js storefronts to serverless edge delivery across 170+ countries — while leading cross-functional teams and pioneering AI developer tooling.",
      tags: ["Next.js 15", "TypeScript", "Turborepo", "Storybook", "BigCommerce", "Azure Service Bus", "Claude Code"]
    },
    {
      id: "tcs-system",
      type: "experience",
      role: "System Engineer",
      company: "TATA CONSULTANCY SERVICES",
      period: "April 2018 - June 2021",
      description: "Designed and optimized full-stack features for a high-traffic insurance policy portal serving 10,000+ daily active users, improving loading performance by 34% and LCP by 45%.",
      tags: ["React", "Redux", "Webpack", "Performance Optimization"]
    },
    {
      id: "education-btech",
      type: "education",
      role: "B.Tech in Computer Science & Engineering",
      company: "DR. A.P.J. ABDUL KALAM TECHNICAL UNIVERSITY",
      period: "2013 - 2017",
      description: "Completed undergraduate studies specializing in algorithms, software engineering principles, and distributed systems."
    }
  ],
  projects: [
    {
      id: "mach-storefront",
      title: "MACH Headless Storefront",
      description: "A greenfield, next-generation headless e-commerce storefront architected on MACH principles. Built with Next.js 15, Turborepo, BigCommerce, Constructor.io, and Azure Service Bus.",
      technologies: ["Next.js 15", "Turborepo", "BigCommerce", "Azure Service Bus", "Storybook", "TypeScript"],
      metrics: "65% data-fetch latency reduction, 35% less code duplication",
      link: "#",
      highlights: [
        "Architected Next.js 15 storefront for Princess Auto utilizing MACH principles, managing a team of 14-18 engineers.",
        "Standardized a shared Turborepo monorepo and UI design system (50+ Storybook components).",
        "Engineered integrations with BigCommerce and Constructor.io, utilizing Azure Service Bus for critical pipelines."
      ]
    },
    {
      id: "jira-accessibility",
      title: "Jira Accessibility Compliance",
      description: "Accessibility SME remediation for the Atlassian Jira team, driving WCAG 2.1 AA compliance across millions of daily active users.",
      technologies: ["React", "Accessibility", "Axe DevTools", "ARIA", "CI/CD", "GitHub Copilot"],
      metrics: "70% accessibility violations resolved, Axe automated coverage up to 82%",
      link: "#",
      highlights: [
        "Remediated over 2,000 React components and resolved 70% of accessibility violations for Jira.",
        "Pioneered LLM-assisted accessibility remediation with GitHub Copilot, reducing average ARIA fix times from 4 hours to 30 minutes.",
        "Integrated Axe testing into the CI/CD pipeline, catching 90% of regressions before production."
      ]
    },
    {
      id: "capital-iq-pwa",
      title: "CapitalIQ Pro Offline PWA",
      description: "An offline-first Progressive Web App (PWA) extension for S&P Global CapitalIQ Pro. Integrates service workers, offline sync, and real-time Tableau Embedded analytics widgets.",
      technologies: ["React", "Service Workers", "Tableau Analytics", "PWA", "Tailwind CSS"],
      metrics: "28% increase in mobile user engagement, 95% test coverage",
      link: "#",
      highlights: [
        "Developed 40+ production-grade React components for the S&P Global corporate design system.",
        "Built React-based Tableau live-data integrations and created a standalone offline-first PWA using service workers."
      ]
    },
    {
      id: "medibank-portal",
      title: "Medibank Onboarding Portal",
      description: "A secure, streamlined healthcare provider onboarding portal featuring dynamic validation and bulk CSV uploading.",
      technologies: ["React", "Node.js", "Firebase", "CSV Processing"],
      metrics: "60% registration error reduction",
      link: "#",
      highlights: [
        "Developed a healthcare provider onboarding portal for Medibank using React, Node.js, and Firebase.",
        "Implemented FileReader CSV uploads and dynamic validation rules."
      ]
    },
    {
      id: "cov-support",
      title: "Cov-Support Platform",
      description: "A real-time social impact web application connecting patients with local medical resources, featuring real-time geolocation searches and sync.",
      technologies: ["React", "Firebase Realtime DB", "Geolocation API", "Node.js"],
      metrics: "Real-time coordination for thousands of users",
      link: "#"
    }
  ]
};
