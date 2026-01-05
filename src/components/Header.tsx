"use client";

import Link from "next/link";
import ThemeToggle from "~/components/theme-toggle";

export default function Header() {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="mx-auto max-w-4xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex flex-col">
              <h1 className="text-lg font-bold tracking-tight">Lorem Labs</h1>
              <p className="text-muted-foreground text-light hidden text-sm md:flex">
                My Thoughts and Explorations
              </p>
            </Link>
          </div>

          <nav className="flex items-center space-x-6">
            <Link
              href="/articles"
              className="hover:text-foreground text-xs font-light transition-colors"
            >
              ARTICLES
            </Link>
            <Link
              href="/articles/portfolio"
              className="hover:text-foreground text-xs font-light transition-colors"
            >
              PORTFOLIO
            </Link>
            {/* <Link
              href="/contact"
              className="hover:text-foreground text-xs font-light transition-colors"
            >
              CONTACT
            </Link> */}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
