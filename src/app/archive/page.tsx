"use client";

import BlogPostCard from "~/components/BlogPostCard";
import { articles } from "~/lib/articles";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ArchivePage() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sort articles by date (newest first)
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // Get unique years from articles
  const years = Array.from(
    new Set(
      sortedArticles.map((article) => new Date(article.date).getFullYear()),
    ),
  ).sort((a, b) => b - a);

  // Get unique categories from all articles
  const categories = Array.from(
    new Set(articles.flatMap((article) => article.tags)),
  ).sort();

  // Filter articles by year and category
  const filteredArticles = sortedArticles.filter((article) => {
    const matchesYear = selectedYear
      ? new Date(article.date).getFullYear() === parseInt(selectedYear)
      : true;

    const matchesCategory = selectedCategory
      ? article.tags.includes(selectedCategory)
      : true;

    return matchesYear && matchesCategory;
  });

  const labelStyle = "text-muted-foreground text-xs mb-1 block";

  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto max-w-4xl px-6 py-12">
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 text-3xl font-bold tracking-tight">ARCHIVE</h1>
          <p className="text-muted-foreground leading-relaxed">
            A complete collection of thoughts, essays, and explorations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className={labelStyle}>Tags</span>
          {/* Category filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              ALL
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className={labelStyle}>Year</span>
          {/* Year filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedYear(null)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                selectedYear === null
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              ALL YEARS
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(String(year))}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  selectedYear === String(year)
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Articles count */}
        <motion.div
          className="text-muted-foreground mb-6 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredArticles.length}{" "}
          {filteredArticles.length === 1 ? "post" : "posts"}
          {selectedYear && ` from ${selectedYear}`}
          {selectedCategory && ` in ${selectedCategory}`}
        </motion.div>

        {/* Articles list */}
        <motion.div
          className="space-y-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredArticles.map((article, index) => (
            <BlogPostCard
              key={article.title}
              post={article}
              index={String(index + 1)}
            />
          ))}
        </motion.div>
      </main>
    </div>
  );
}
