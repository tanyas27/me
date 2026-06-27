export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  link: string;
  imageUrl?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "js-polyfills",
    title: "Demystifying JavaScript Polyfills: Deep Dive into Array.prototype.flat",
    excerpt: "How JavaScript engines implement flattening algorithms under the hood, and a step-by-step guide to writing a production-grade polyfill with recursion depth support.",
    date: "May 12, 2026",
    readTime: "7 min read",
    tags: ["JavaScript", "Algorithms", "Polyfills"],
    link: "https://tanyas27.medium.com/"
  },
  {
    id: "a11y-react",
    title: "Pioneering WCAG 2.1 AA Compliance in Large-Scale React Applications",
    excerpt: "Remediating over 2,000 components taught me that accessibility isn't just about alt tags. Learn how we automated ARIA compliance checks in our CI/CD pipelines.",
    date: "Mar 28, 2026",
    readTime: "12 min read",
    tags: ["Accessibility", "React", "WCAG", "A11y"],
    link: "https://tanyas27.medium.com/"
  },
  {
    id: "mach-architecture",
    title: "The Rise of MACH Architecture: Headless E-Commerce at Scale",
    excerpt: "How we leveraged Next.js 15, BigCommerce, and Azure Service Bus to engineer a blazing fast storefront while reducing data latency by 65%.",
    date: "Jan 15, 2026",
    readTime: "9 min read",
    tags: ["MACH", "Next.js", "Azure", "E-Commerce"],
    link: "https://tanyas27.medium.com/"
  },
  {
    id: "tableau-react-embed",
    title: "Embedding Tableau Live-Data Widgets Safely in React Frontends",
    excerpt: "A comprehensive guide to handling JWT authentication, resize listeners, and state synchronization for Tableau embedded dashboards in dynamic client portals.",
    date: "Nov 04, 2025",
    readTime: "6 min read",
    tags: ["React", "Tableau", "Analytics", "Security"],
    link: "https://tanyas27.medium.com/"
  }
];
