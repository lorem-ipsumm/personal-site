"use client";
import { useEffect } from "react";
import ArticleSection from "./components/ArticleSection";
import { useAtom } from "jotai";
import { currentArticleAtom } from "./utils/atoms";
import { articles } from "./utils/utils";
import { ArticleData } from "./utils/interface";

export default function HomePage() {

  const [, setCurrentArticle] = useAtom(currentArticleAtom);

  useEffect(() => {
    setCurrentArticle(articles[0] as ArticleData);
  }, []);

  return (
    <ArticleSection />
  );
}
