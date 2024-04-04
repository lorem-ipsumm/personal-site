"use client";
import { useAtom } from "jotai";
import { useEffect } from "react";
import ArticleSection from "~/app/components/ArticleSection";
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
    <ArticleSection />
  );
};

export default Article;
