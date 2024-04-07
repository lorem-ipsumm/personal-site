"use client";
import { useEffect, useRef, useState } from "react";
import Img from "../../assets/img.png";
import Article from "./Article";
import { useAtom } from "jotai";
import { currentArticleAtom } from "../utils/atoms";
import TagsSection from "./TagsSection";
import { Skeleton } from "~/components/ui/skeleton";

const ArticleSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [headerStyle, setHeaderStyle] = useState<string>("");
  const [currentArticle] = useAtom(currentArticleAtom);
  const [showSkeletons, setShowSkeletons] = useState<boolean>(true);

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
    toggleSkeletons();
  }, [currentArticle]);

  const toggleSkeletons = () => {
    setShowSkeletons(true);
    setTimeout(() => {
      setShowSkeletons(false);
    }, 500);
  };

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

    const title = !showSkeletons ? (
      currentArticle?.title
    ) : (
      <Skeleton className="fadeIn h-10 w-1/2 bg-zinc-800" />
    );

    const date = !showSkeletons ? (
      formattedDate
    ) : (
      <Skeleton className="fadeIn mt-3 h-6 w-1/4 bg-zinc-800" />
    );

    return (
      <div
        className={`ease sticky top-0 z-10 py-3 backdrop-blur-lg transition-all duration-500 ${headerStyle}`}
      >
        <h1 className="mb-1 text-3xl font-bold">{title}</h1>
        <span className="text-xl text-blue-500">{date}</span>
      </div>
    );
  };

  const renderArticleSkeleton = () => {
    return (
      <div>
        <Skeleton className="fadeIn mt-3 h-60 w-full bg-zinc-800" />
      </div>
    );
  };

  const renderArticleImage = () => {
    if (!currentArticle)
      return <div className="article-image-skeleton h-full w-full" />;
    else
      return (
        <img
          alt="Blog post"
          className="mb-4 w-full rounded-md shadow-lg"
          src={currentArticle?.imgPath || Img.src}
        />
      );
  };

  return (
    <div
      className="w-full overflow-y-scroll p-5 lg:max-h-screen lg:w-3/4"
      ref={sectionRef}
    >
      <div className="mb-4 flex w-full items-center justify-center overflow-hidden rounded-md shadow-lg lg:h-[500px]">
        {renderArticleImage()}
      </div>
      {renderArticleHeader()}
      <div className="min-h-10">
        {!showSkeletons ? <Article /> : renderArticleSkeleton()}
      </div>
      <TagsSection />
    </div>
  );
};

export default ArticleSection;
