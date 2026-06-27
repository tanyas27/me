import { Mail, BookOpen } from "lucide-react";

const GithubIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Mail size={18} />, label: "Email", href: "mailto:tanya.singh@example.com" },
    { icon: <LinkedinIcon size={18} />, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: <GithubIcon size={18} />, label: "GitHub", href: "https://github.com" },
    { icon: <BookOpen size={18} />, label: "Medium", href: "https://tanyas27.medium.com/" },
  ];

  return (
    <footer className="w-full border-t border-border-custom bg-background transition-colors duration-300 py-8 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto mt-1 pt-1 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <p className="text-xs text-muted-text">
          &copy; {currentYear} Tanya Singh. All rights reserved.
        </p>
        <div className="flex space-x-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border-custom text-muted-text hover:text-accent-custom hover:border-accent-custom transition-all duration-300 hover:scale-105"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
