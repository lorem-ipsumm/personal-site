"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ArticleData } from "~/lib/interfaces";

interface BlogPostCardProps {
  post: ArticleData;
  index: string;
}

export default function BlogPostCard({ post, index }: BlogPostCardProps) {
  // Extract category from tags (first tag) or use a default
  const category = post.tags[0]?.toUpperCase() ?? "GENERAL";

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: parseInt(index) * 0.1,
        ease: "easeOut",
      }}
    >
      <Link
        href={`/articles/${post.filePath.split("/").pop()?.replace(".md", "")}`}
        className="post-card block"
      >
        <article className="border-border/40 hover:bg-muted/50 group cursor-pointer border-b px-3 py-6 transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center space-x-4 text-xs">
                <span className="text-muted-foreground font-light tracking-wider">
                  {category}
                </span>
                <span className="text-muted-foreground">—</span>
                <span className="text-muted-foreground font-light">
                  {formatDate(post.date)}
                </span>
              </div>

              <h2 className="group-hover:text-foreground/80 mb-3 text-xl font-semibold tracking-tight transition-colors">
                {post.title}
              </h2>

              <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                {post.description}
              </p>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
