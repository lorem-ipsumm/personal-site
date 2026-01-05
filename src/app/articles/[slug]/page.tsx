"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import RelatedArticles from "~/components/RelatedArticles";
import { articles } from "~/lib/articles";
import type { ArticleData } from "~/lib/interfaces";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useThemeStore } from "~/hooks/state/useThemeStore";
import { ArrowLeft, Copy, Check, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div>
      <ScaleLoader color="var(--color-accent)" height={20} />
    </div>
  );
};

// Custom Image Component with loading and fullscreen functionality
const ArticleImage = ({
  src,
  alt,
  width,
  height,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreenLoading, setIsFullscreenLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const openFullscreen = () => {
    setIsFullscreenLoading(true);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleFullscreenImageLoad = () => {
    setIsFullscreenLoading(false);
  };

  return (
    <>
      <div
        className="relative my-6 w-full cursor-pointer"
        onClick={openFullscreen}
      >
        {isLoading && (
          <div className="bg-muted absolute inset-0 flex items-center justify-center rounded-lg">
            <Loader />
          </div>
        )}
        <Image
          src={src ?? ""}
          alt={alt ?? ""}
          width={typeof width === "number" ? width : 800}
          height={typeof height === "number" ? height : 450}
          className={`max-h-[800px] w-full rounded-lg object-contain transition-opacity duration-300 hover:opacity-90 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={handleImageLoad}
          {...props}
        />
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={closeFullscreen}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={closeFullscreen}
            >
              <X className="h-6 w-6" />
            </Button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              {isFullscreenLoading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                  <Loader />
                </div>
              )}
              <Image
                src={src ?? ""}
                alt={alt ?? ""}
                width={typeof width === "number" ? width : 1200}
                height={typeof height === "number" ? height : 675}
                className={`rounded-lg object-contain transition-opacity duration-300 ${
                  isFullscreenLoading ? "opacity-0" : "opacity-100"
                }`}
                style={{ maxHeight: "90vh", maxWidth: "90vw" }}
                onLoad={handleFullscreenImageLoad}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Header Image Component with loading and fullscreen functionality
const HeaderImage = ({
  src,
  alt,
  width,
  height,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      <div
        className="relative w-full cursor-pointer overflow-hidden rounded-lg"
        onClick={openFullscreen}
      >
        {isLoading && (
          <div className="bg-muted absolute inset-0 flex items-center justify-center rounded-lg">
            <Loader />
          </div>
        )}
        <Image
          src={src ?? ""}
          alt={alt ?? ""}
          width={typeof width === "number" ? width : 800}
          height={typeof height === "number" ? height : 450}
          className={`w-full transition-opacity duration-300 hover:opacity-90 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={handleImageLoad}
          {...props}
        />
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={closeFullscreen}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={closeFullscreen}
            >
              <X className="h-6 w-6" />
            </Button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src ?? ""}
                alt={alt ?? ""}
                width={typeof width === "number" ? width : 1200}
                height={typeof height === "number" ? height : 675}
                className="rounded-lg object-contain"
                style={{ maxHeight: "90vh", maxWidth: "90vw" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { theme } = useThemeStore();
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top when component mounts or slug changes
    window.scrollTo(0, 0);

    // Find article by slug
    const foundArticle = articles.find((article) =>
      article.filePath.includes(params.slug),
    );

    if (foundArticle) {
      setArticle(foundArticle);
      // Fetch article content
      fetch(foundArticle.filePath)
        .then((res) => res.text())
        .then((data) => {
          setContent(data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [params.slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCodeId(id);
      setTimeout(() => setCopiedCodeId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const components = {
    // Custom code block component
    code({
      inline,
      className,
      children,
      ...props
    }: React.HTMLAttributes<HTMLElement> & {
      inline?: boolean;
      className?: string;
      children?: React.ReactNode;
    }) {
      const match = /language-(\w+)/.exec(className ?? "");
      const codeString = String(children).replace(/\n$/, "");
      const codeId = `code-${Math.random().toString(36).substring(2, 9)}`;

      if (!inline && match) {
        return (
          <div className="relative my-6">
            <div className="absolute top-3 right-3 z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(codeString, codeId)}
                className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
              >
                {copiedCodeId === codeId ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <SyntaxHighlighter
              style={theme === "dark" ? oneDark : oneLight}
              language={match[1]}
              PreTag="div"
              customStyle={{
                margin: 0,
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                lineHeight: "1.5",
              }}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        );
      }

      return (
        <code
          className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm"
          {...props}
        >
          {children}
        </code>
      );
    },

    // Custom heading components
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1
        className="mt-8 mb-6 text-3xl font-bold tracking-tight first:mt-0"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className="mt-8 mb-4 text-2xl font-semibold tracking-tight"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3 className="mt-6 mb-3 text-xl font-semibold tracking-tight" {...props}>
        {children}
      </h3>
    ),

    hr: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <hr className="mb-6" {...props}>
        {children}
      </hr>
    ),

    // Custom paragraph component
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className="text-foreground mb-10 leading-8" {...props}>
        {children}
      </p>
    ),

    // Custom link component
    a: ({
      href,
      children,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground hover:text-muted-foreground font-medium underline underline-offset-4"
        {...props}
      >
        {children}
      </a>
    ),

    // Custom list components
    ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className="mb-10 ml-6 list-disc space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className="mb-10 ml-6 list-decimal space-y-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
      <li className="text-foreground/80" {...props}>
        {children}
      </li>
    ),

    // Custom blockquote component
    blockquote: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        className="border-border !text-muted-foreground mb-4 border-l-4 pl-4 text-[18px] italic"
        {...props}
      >
        {children}
      </blockquote>
    ),

    // Custom image component
    img: ({
      src,
      alt,
      width,
      height,
      ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <ArticleImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        {...props}
      />
    ),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <main className="mx-auto max-w-4xl px-6 py-12">
          {/* Back button skeleton */}
          <div className="bg-muted mb-8 h-9 w-16 animate-pulse rounded"></div>

          <article className="w-full">
            {/* Header skeleton */}
            <header className="border-border/40 mb-8 border-b pb-8">
              <div className="mb-4 flex animate-pulse items-center space-x-4">
                <div className="bg-muted h-4 w-20 rounded"></div>
                <div className="bg-muted h-4 w-2 rounded"></div>
                <div className="bg-muted h-4 w-24 rounded"></div>
              </div>

              <div className="bg-muted mb-4 h-12 w-4/5 animate-pulse rounded"></div>

              <div className="space-y-2">
                <div className="bg-muted h-4 w-full animate-pulse rounded"></div>
                <div className="bg-muted h-4 w-3/4 animate-pulse rounded"></div>
              </div>

              <div className="mt-6 flex animate-pulse gap-2">
                <div className="bg-muted h-6 w-16 rounded"></div>
                <div className="bg-muted h-6 w-20 rounded"></div>
                <div className="bg-muted h-6 w-14 rounded"></div>
              </div>
            </header>

            {/* Content skeleton */}
            <div className="animate-pulse space-y-4">
              <div className="bg-muted h-4 w-full rounded"></div>
              <div className="bg-muted h-4 w-full rounded"></div>
              <div className="bg-muted h-4 w-2/3 rounded"></div>
              <div className="bg-muted my-6 h-32 w-full rounded"></div>
              <div className="bg-muted h-4 w-full rounded"></div>
              <div className="bg-muted h-4 w-4/5 rounded"></div>
              <div className="bg-muted h-4 w-3/4 rounded"></div>
            </div>
          </article>
        </main>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen">
        <main className="mx-auto max-w-4xl px-6 py-12">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist.
            </p>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-4xl px-6 py-8 md:py-12">
        <article className="w-full">
          {/* Article header */}
          <header className="border-border/40 mb-8 border-b pb-8">
            <motion.div
              className="relative mb-4 flex h-[200px] w-full items-center justify-center overflow-hidden md:h-[400px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <HeaderImage
                src={article.imgPath}
                alt={article.title}
                width={800}
                height={450}
              />
            </motion.div>
            <motion.h1
              className="mb-4 text-4xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              {article.title}
            </motion.h1>

            {article.description && (
              <motion.p
                className="text-muted-foreground text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              >
                {article.description}
              </motion.p>
            )}
            <motion.p
              className="text-muted-foreground mt-3 text-sm font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            >
              {formatDate(article.date)}
            </motion.p>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-muted text-muted-foreground rounded-md px-2.5 py-1 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article content */}
          <motion.div
            className="prose prose-lg max-w-none text-lg md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <ReactMarkdown components={components}>{content}</ReactMarkdown>
          </motion.div>
        </article>

        {/* Related Articles */}
        <RelatedArticles currentArticle={article} allArticles={articles} />

        {/* Navigation footer */}
        <footer className="border-border/40 mt-16 border-t pt-8">
          <div className="flex justify-between">
            <Button
              onClick={() => router.push("/articles")}
              variant="outline"
              className="inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              All Articles
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
}
