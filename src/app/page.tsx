"use client";

import BlogPostCard from "~/components/BlogPostCard";
import RecentPosts from "~/components/RecentPosts";
import { articles } from "~/lib/articles";

export default function HomePage() {
  // Sort articles by date (newest first)
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Articles list */}
            <div className="space-y-0">
              {sortedArticles.map((article, index) => (
                <BlogPostCard
                  key={article.title}
                  post={article}
                  index={String(index + 1)}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <RecentPosts posts={sortedArticles} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
