"use client";
import { useEffect } from "react";
import ArticleSection from "./components/ArticleSection";
import { useAtom } from "jotai";
import { currentArticleAtom } from "./utils/atoms";
import { articles } from "./utils/utils";
import { ArticleData } from "./utils/interface";

export default function HomePage() {

  const [, setCurrentArticle] = useAtom(currentArticleAtom);

  // set the current article to the first article in the list
  // when the page loads
  useEffect(() => {
    const welcomeArticle = articles.find(article => article.title === "Welcome to my Lab");
    if (welcomeArticle) {
      setCurrentArticle(welcomeArticle as ArticleData);
    } else {
      setCurrentArticle(articles[0] as ArticleData);
    }
  }, []);

  return (
    <ArticleSection />
  );
}
