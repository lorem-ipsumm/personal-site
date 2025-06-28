"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="max-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-3xl font-bold tracking-tight"
          >
            ABOUT
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              I am a full stack developer and designer with a specialization in
              crypto and DeFi. I've been in crypto for 4 years and have worked
              with several protocols across a variety of networks. Outside of
              crypto I do freelance fullstack development. In my free time I
              build fun and interactive web-based experiences.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              This site serves as a place where I dump my thoughts on various
              topics as well as try out various experiments and ideas. It also
              serves as a place where I document various money making strategies
              in and outside of DeFi. I have a large interest in searching for
              arbitrage opportunities across markets, and prefer these
              strategies over yield farming and/or directional trading, as those
              methods come with some additional risk. I prefer the opportunities
              that I can get in and out of within an hour.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Aside from profitable opportunities in crypto I have started to
              branch out into the broader sass/micro-sass field. I have a few
              products that I'm building out at the moment, and will start
              documenting them here. Like all hobby developers I have a massive
              backlog of projects that will never see the light of day, but I
              want to fix that by actually releasing my projects to the public.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              That being said, I plan on documenting and experimenting with a
              wide variety of different strategies and techniques. If you want
              to collaborate on any project or you'd like me to build something
              for you, feel free to reach out to me.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              If you want to checkout what I'm working on and what I've worked
              on in the past, click{" "}
              <Link
                href="/articles/portfolio"
                className="text-foreground underline hover:no-underline"
              >
                here
              </Link>
              .
            </p>

            <div className="border-border/40 mt-12 border-t pt-8">
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
                  Twitter
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
      </main>
    </div>
  );
}
