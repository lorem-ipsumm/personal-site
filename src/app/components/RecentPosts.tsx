"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ArticleData } from "../utils/interface";

interface RecentPostsProps {
  posts: ArticleData[];
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getCategory = (tags: string[]) => {
    return tags[0]
      ? tags[0].charAt(0).toUpperCase() + tags[0].slice(1)
      : "General";
  };

  return (
    <aside className="space-y-8">
      <div>
        <h3 className="text-muted-foreground mb-6 text-sm font-semibold tracking-wider">
          RECENT POSTS
        </h3>

        <div className="space-y-6">
          {posts.slice(0, 4).map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <Link
                href={`/articles/${post.filePath
                  .split("/")
                  .pop()
                  ?.replace(".md", "")}`}
                className="group block"
              >
                <article className="space-y-2">
                  <div className="text-muted-foreground flex items-center space-x-2 text-xs">
                    <span>{getCategory(post.tags)}</span>
                    <span>•</span>
                    <span>{formatDate(post.date)}</span>
                  </div>

                  <h4 className="group-hover:text-foreground/80 text-sm font-medium leading-tight transition-colors">
                    {post.title}
                  </h4>

                  {post.description && (
                    <p className="text-muted-foreground line-clamp-2 text-xs">
                      {post.description}
                    </p>
                  )}
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </aside>
  );
}
