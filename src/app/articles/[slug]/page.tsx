"use client";
import { useAtom } from "jotai";
import { useEffect } from "react";
import ArticleSection from "~/app/components/ArticleSection";
import LeftSection from "~/app/components/LeftSection";
import { currentArticleAtom } from "~/app/utils/atoms";
import { articles } from "~/app/utils/utils";

const Article = ({ params }: { params: { slug: string } }) => {

  const [, setCurrentArticle] = useAtom(currentArticleAtom);
  
  useEffect(() => {
    // find the article with the matching slug
    const article = articles.find((article) => article.filePath.indexOf(params.slug) > -1);
    // if an article is found set it as the current article
    if (article) {
      setCurrentArticle(article);
    }
  }, [params.slug]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#121313] text-white">
      <div className="flex h-full w-full flex-col lg:w-4/5 lg:flex-row">
        <LeftSection />
        <ArticleSection />
      </div>
    </main>
  );
};

export default Article;
