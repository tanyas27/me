"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

function BlogSkeleton() {
  return (
    <div className="divide-y divide-border-custom flex flex-col w-full">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="py-8 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-6 justify-between items-start w-full animate-pulse"
        >
          <div className="flex-1 flex flex-col justify-between h-full w-full">
            <div>
              {/* Title skeleton */}
              <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 mb-3" />
              {/* Excerpt lines skeleton */}
              <div className="space-y-2">
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3" />
              </div>
            </div>
            {/* Tags and read button skeleton */}
            <div className="mt-6 flex items-center justify-between gap-4 w-full">
              <div className="flex flex-wrap gap-1.5">
                <div className="h-5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
              <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </div>
          </div>
          {/* Image skeleton */}
          <div className="w-full sm:w-40 md:w-48 shrink-0 aspect-[16/10] sm:aspect-[4/3] rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        </div>
      ))}
    </div>
  );
}

export default function BlogFeed() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts(data.posts);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error("Failed to load dynamic blog feed:", err);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (isLoading) {
    return <BlogSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 px-4 border border-dashed border-border-custom rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30 max-w-4xl mx-auto">
        <p className="text-sm text-muted-text font-sans mb-4">
          Unable to load recent articles at this moment.
        </p>
        <a
          href="https://tanyas27.medium.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent-custom hover:text-accent-dark transition-colors duration-200"
        >
          <span>Read all articles directly on Medium</span>
          <ArrowRight size={14} />
        </a>
      </div>
    );
  }

  const slicedPosts = posts.slice(0, visibleCount);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="divide-y divide-border-custom flex flex-col">
        {slicedPosts.map((post, idx) => (
          <motion.article
            key={post.id || idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
            className="group py-8 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-6 justify-between items-start w-full transition-all duration-300"
          >
            {/* Content Area (split into text content and image) */}
            <div className="flex-1 flex flex-col justify-between h-full w-full">
              <div>
                {/* Title with hover underline transition */}
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group/title"
                >
                  <h3 className="text-lg md:text-xl font-serif text-foreground tracking-tight leading-snug relative inline-block group-hover/title:text-accent-custom transition-colors duration-300">
                    {post.title}
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-accent-custom transition-all duration-300 group-hover/title:w-full" />
                  </h3>
                </a>

                <p className="mt-3 text-xs text-muted-text leading-relaxed font-sans line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Tags and Action link */}
              <div className="mt-6 flex items-center justify-between gap-4 w-full">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border border-border-custom bg-zinc-50 dark:bg-zinc-900/50 text-muted-text"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono font-medium text-accent-custom hover:text-accent-dark transition-colors duration-200 shrink-0"
                  aria-label={`Read full article: ${post.title}`}
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Preview Image */}
            {post.imageUrl && (
              <div className="w-full sm:w-40 md:w-48 shrink-0 aspect-[16/10] sm:aspect-[4/3] rounded-lg overflow-hidden border border-border-custom bg-zinc-100 dark:bg-zinc-800/20 relative group-hover:border-accent-custom/50 transition-all duration-300">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </motion.article>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < posts.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="px-6 py-3 rounded-full border border-border-custom bg-zinc-50/50 dark:bg-zinc-900/30 text-foreground hover:bg-border-custom transition-all text-xs font-mono font-bold tracking-widest uppercase hover:text-accent-custom hover:border-accent-custom duration-300 cursor-pointer"
          >
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
}
