"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import RecentPosts from "~/components/RecentPosts";
import { articles } from "~/lib/articles";

export default function HomePage() {
  // Sort articles by date (newest first)
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-3xl font-bold tracking-tight"
            >
              Hello, I'm Lorem 👋
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg space-y-6"
            >
              <p className="text-foreground leading-relaxed">
                I am a full stack developer and designer with a specialization
                in crypto and DeFi. I've been in crypto for 6 years and have
                worked with several protocols across a variety of networks.
                Outside of crypto I do freelance fullstack development. In my
                free time I build fun and interactive web-based experiences.
              </p>

              <p className="text-foreground leading-relaxed">
                This site serves as a place where I dump my thoughts on various
                topics as well as try out various experiments and ideas. It also
                serves as a place where I document different money making
                strategies in and outside of crypto.
              </p>

              <p className="text-foreground leading-relaxed">
                If you want to checkout what I'm working on and what I've worked
                on in the past{" "}
                <Link
                  href="/articles/portfolio"
                  className="text-foreground underline hover:no-underline"
                >
                  visit my portfolio
                </Link>
                .
              </p>

              <div className="pt-8">
                <h2 className="mb-4 text-lg font-semibold tracking-tight">
                  CONNECT
                </h2>
                <div className="flex gap-4">
                  <a
                    href="https://twitter.com/lorem___"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Twitter / X
                  </a>
                  <a
                    href="https://github.com/lorem-ipsumm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="mailto:lorem.ipsum.crypto@gmail.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>
            </motion.div>
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
