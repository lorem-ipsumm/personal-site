"use client";
import { useAtom } from "jotai";
import { useEffect } from "react";
import ArticleSection from "~/app/components/ArticleSection";
import { currentArticleAtom } from "~/app/utils/atoms";
import { articles } from "~/app/utils/utils";

const Article = ({ params }: { params: { slug: string } }) => {

  const [currentArticle, setCurrentArticle] = useAtom(currentArticleAtom);
  
  useEffect(() => {
    // find the article with the matching slug
    const article = articles.find((article) => article.filePath.indexOf(params.slug) > -1);
    // if an article is found set it as the current article
    if (article && article.filePath !== currentArticle?.filePath) {
      setCurrentArticle(article);
    }
  }, [params.slug]);

  return (
    <ArticleSection
      key={params.slug}
    />
  );
};

export default Article;
