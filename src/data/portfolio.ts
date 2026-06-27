export interface Job {
  id: string;
  role: string;
  company: string;
  period: string;
  duration: string;
  description: string;
  tags: string[];
  bullets: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  metrics?: string;
  link?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  location: string;
  summary: string;
  skills: SkillCategory[];
  experience: Job[];
  education: Education[];
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
        "Stencil.js (Web Components)"
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
  experience: [
    {
      id: "epam-lead",
      role: "Lead Software Engineer",
      company: "EPAM Systems",
      period: "2024 - Present",
      duration: "1 year (Lead), 4 years total at EPAM",
      description: "Embedded as forward deployed architect and delivery manager for enterprise clients, driving high-velocity engineering, monorepo architectures, and AI-native development workflows.",
      tags: ["Next.js", "TypeScript", "Turborepo", "Storybook", "BigCommerce", "Azure Service Bus", "Claude Code"],
      bullets: [
        "Architected a greenfield Next.js 15 headless e-commerce storefront for Princess Auto utilizing MACH principles, managing 14-18 engineers.",
        "Standardized a shared Turborepo monorepo and UI design system (50+ Storybook components), reducing code duplication by 35% across 5 frontends.",
        "Engineered integrations with BigCommerce and Constructor.io, utilizing Azure Service Bus for critical pipelines and cutting data latency by 65%.",
        "Pioneered AI-native developer workflows using custom agents and Claude Code, increasing delivery velocity by 4x.",
        "Headed EPAM's promotion assessment committee, evaluating 50+ senior engineers annually and designing global competency frameworks."
      ]
    },
    {
      id: "epam-senior",
      role: "Accessibility & Frontend Engineering Lead",
      company: "EPAM Systems (Atlassian Project)",
      period: "2022 - 2024",
      duration: "2 years",
      description: "Accessibility SME embedded within the Atlassian Jira team (serving a 500+ engineer organization), spearheading accessibility remediation and testing standards.",
      tags: ["React", "Accessibility", "Axe DevTools", "ARIA", "CI/CD", "GitHub Copilot"],
      bullets: [
        "Spearheaded WCAG 2.1 AA compliance across Jira, remediating over 2,000 React components and resolving 70% of accessibility violations for millions of users.",
        "Pioneered LLM-assisted accessibility remediation with GitHub Copilot, reducing average ARIA fix times from 4 hours to 30 minutes.",
        "Integrated Axe testing into the CI/CD pipeline, catching 90% of regressions before production and increasing test coverage from 65% to 82%.",
        "Led a global frontend mentorship program for 15+ engineers, achieving an 80% promotion rate."
      ]
    },
    {
      id: "epam-fullstack",
      role: "Senior Full-Stack Engineer",
      company: "EPAM Systems (S&P Global & Medibank)",
      period: "June 2021 - 2022",
      duration: "1 year",
      description: "Built corporate systems, progressive web applications, and provider onboarding pipelines.",
      tags: ["React", "Node.js", "Firebase", "Tableau", "PWA", "Service Workers"],
      bullets: [
        "Developed 40+ production-grade React components for the S&P Global corporate design system with 95% test coverage.",
        "Built React-based Tableau live-data integrations and created a standalone offline-first Progressive Web App (PWA) for CapitalIQ Pro using service workers, increasing mobile engagement by 28%.",
        "Developed a healthcare provider onboarding portal for Medibank using React, Node.js, and Firebase, implementing FileReader CSV uploads and reducing registration errors by 60%."
      ]
    },
    {
      id: "tcs-system",
      role: "System Engineer",
      company: "Tata Consultancy Services",
      period: "April 2018 - June 2021",
      duration: "3 years",
      description: "Designed and optimized full-stack features for a high-traffic insurance policy portal serving 10,000+ daily active users.",
      tags: ["React", "JavaScript", "Webpack", "Redux", "Lazy Loading", "Performance"],
      bullets: [
        "Delivered 15+ full-stack features and optimized React frontend efficiency by 34%.",
        "Applied Webpack bundle splitting, React.memo, and lazy loading, reducing page load times from 4.2s to 2.8s.",
        "Improved Largest Contentful Paint (LCP) by 45% for the high-traffic insurance platform."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
      institution: "Dr. A.P.J. Abdul Kalam Technical University, India",
      period: "2014 - 2018"
    }
  ],
  projects: [
    {
      id: "mach-storefront",
      title: "MACH Headless Storefront",
      description: "A greenfield, next-generation headless e-commerce storefront architected on MACH principles. Built with Next.js 15, Turborepo, BigCommerce, Constructor.io, and Azure Service Bus.",
      technologies: ["Next.js 15", "Turborepo", "BigCommerce", "Azure Service Bus", "Storybook", "TypeScript"],
      metrics: "65% data-fetch latency reduction, 35% less code duplication",
      link: "#"
    },
    {
      id: "capital-iq-pwa",
      title: "CapitalIQ Pro Offline PWA",
      description: "An offline-first Progressive Web App (PWA) extension for S&P Global CapitalIQ Pro. Integrates service workers, offline sync, and real-time Tableau Embedded analytics widgets.",
      technologies: ["React", "Service Workers", "Tableau Analytics", "PWA", "Tailwind CSS"],
      metrics: "28% increase in mobile user engagement",
      link: "#"
    },
    {
      id: "cov-support",
      title: "Cov-Support Platform",
      description: "A real-time social impact web application connecting patients with local medical resources, featuring real-time geolocation searches and sync.",
      technologies: ["React", "Firebase Realtime DB", "Geolocation API", "Node.js"],
      metrics: "Real-time coordination for thousands of users",
      link: "#"
    },
    {
      id: "covid-tracker",
      title: "COVID-19 Analytics Dashboard",
      description: "Interactive real-time visual tracking platform analyzing spread vectors, utilizing HighCharts and deployed on AWS S3/CloudFront.",
      technologies: ["React", "HighCharts", "AWS S3", "CloudFront", "Node.js", "Firebase"],
      metrics: "Serverless delivery with zero maintenance overhead",
      link: "#"
    },
    {
      id: "spacex-tracker",
      title: "SpaceX Launch Timeline Tracker",
      description: "Highly interactive astronomical dashboard consuming SpaceX APIs to showcase timelines, launches, and custom data visualisations.",
      technologies: ["React", "SpaceX API", "CSS Grid", "Framer Motion"],
      metrics: "Fluid micro-interactions and historical timeline analytics",
      link: "#"
    }
  ]
};
