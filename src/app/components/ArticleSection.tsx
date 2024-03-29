"use client";
import { useEffect, useRef, useState } from "react";
import Img from "../../assets/img.png";
import Article from "./Article";
import { useAtom } from "jotai";
import { currentArticleAtom } from "../utils/atoms";
import TagsSection from "./TagsSection";

const ArticleSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [headerStyle, setHeaderStyle] = useState<string>("");
  const [currentArticle] = useAtom(currentArticleAtom);

  useEffect(() => {
    // modify the header style based on scroll position
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scroll = sectionRef.current.scrollTop;
      let style =
        scroll && scroll > 600
          ? "p-5 rounded-md shadow-lg border-[1px] border-[#303030] bg-[#1d1c1d99]"
          : "bg-[#121313] border-[#121313] rounded-md";
      setHeaderStyle(style);
    };

    // Add event listener when the component is mounted
    sectionRef.current?.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      sectionRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // scroll to the top of the page whenever the article changes
    if (!sectionRef.current) return;
    sectionRef.current.scrollTop = 0;
  }, [currentArticle]);

  // render the article header
  const renderArticleHeader = () => {
    // format the date to be more readable
    const formattedDate = new Date(
      currentArticle?.date as string,
    ).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <div
        className={`ease sticky top-0 z-10 py-3 backdrop-blur-lg transition-all duration-500 ${headerStyle}`}
      >
        <h1 className="mb-1 text-3xl font-bold">{currentArticle?.title}</h1>
        <span className="text-xl text-blue-500">{formattedDate}</span>
      </div>
    );
  };

  return (
    <div className="max-h-screen w-3/4 overflow-y-auto p-5" ref={sectionRef}>
      <div className="mb-4 flex h-[500px] w-full items-center justify-center overflow-hidden rounded-md shadow-lg">
        <img
          alt="Blog post"
          className="mb-4 w-full rounded-md shadow-lg"
          src={currentArticle?.imgPath || Img.src}
        />
      </div>
      {renderArticleHeader()}
      <div>
        <Article />
      </div>
      <TagsSection />
    </div>
  );
};

export default ArticleSection;
