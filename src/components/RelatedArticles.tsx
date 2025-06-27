"use client";

import type { ArticleData } from "~/lib/interfaces";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";

interface RelatedArticlesProps {
  currentArticle: ArticleData;
  allArticles: ArticleData[];
}

const RelatedArticles = ({
  currentArticle,
  allArticles,
}: RelatedArticlesProps) => {
  const router = useRouter();

  const getRelatedArticles = () => {
    // Find articles with matching tags, excluding the current article
    const related = allArticles
      .filter(
        (article) =>
          article.filePath !== currentArticle.filePath && // Exclude current article
          article.tags.some((tag) => currentArticle.tags.includes(tag)), // Has matching tags
      )
      .map((article) => ({
        ...article,
        // Calculate relevance score based on number of matching tags
        relevanceScore: article.tags.filter((tag) =>
          currentArticle.tags.includes(tag),
        ).length,
      }))
      .sort((a, b) => {
        // Sort by relevance score first, then by date (newest first)
        if (b.relevanceScore !== a.relevanceScore) {
          return b.relevanceScore - a.relevanceScore;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .slice(0, 3); // Show maximum 3 related articles

    return related;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getSlugFromFilePath = (filePath: string) => {
    return filePath.split("/").pop()?.replace(".md", "") ?? "";
  };

  const handleArticleClick = (article: ArticleData) => {
    const slug = getSlugFromFilePath(article.filePath);
    router.push(`/articles/${slug}`);
  };

  const relatedArticles = getRelatedArticles();

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="border-border/40 mt-16 border-t pt-12">
      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">
          Related Articles
        </h2>
        <p className="text-muted-foreground">
          Discover more articles on similar topics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedArticles.map((article) => (
          <article
            key={article.filePath}
            className="bg-card border-border hover:border-border/60 group cursor-pointer rounded-lg border p-6 transition-all hover:shadow-md"
            onClick={() => handleArticleClick(article)}
          >
            {/* Article Image */}
            {/* {article.imgPath && (
              <div className="mb-4 overflow-hidden rounded-md">
                <img
                  src={article.imgPath}
                  alt={article.title}
                  className="h-32 w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )} */}

            {/* Article Content */}
            <div className="space-y-3">
              {/* Date */}
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Calendar className="h-3 w-3" />
                <time>{formatDate(article.date)}</time>
              </div>

              {/* Title */}
              <h3 className="group-hover:text-primary text-lg leading-tight font-semibold transition-colors">
                {article.title}
              </h3>

              {/* Description */}
              {article.description && (
                <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                  {article.description}
                </p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                      currentArticle.tags.includes(tag)
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                {article.tags.length > 3 && (
                  <span className="text-muted-foreground text-xs">
                    +{article.tags.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
