"use client";
import { useState } from "react";
import { currentArticleAtom } from "../utils/atoms"
import { ArticleData } from "../utils/interface"
import { articles } from "../utils/utils"
import { useAtom } from "jotai"
import { ChevronLeft, ChevronRight, Search } from "react-feather";

const ArticleList = () => {

  // import atom
  const [currentArticle, setCurrentArticle] = useAtom(currentArticleAtom);
  const [searchInput, setSearchInput] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlesPerPage = 4;

  // render list item
  const listItem = (
    articleData: ArticleData,
    index: number
  ) => {

    // format the date to be more readable
    const formattedDate = new Date(articleData.date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })

    // styling for the current article list item
    const currentArticleStyle = articleData.title === currentArticle?.title
      ? "text-blue-500"
      : "text-white";

    return (
      <li 
        className={`${currentArticleStyle} hover:text-blue-500 cursor-pointer transition-all ease duration-500 flex flex-col`}
        onClick={() => setCurrentArticle(articleData)}
        key={index}
      >
        <span>{articleData.title}</span>
        <span
          className="text-xs"
        >
          {formattedDate}
        </span>
      </li>
    )
  }

  // render list of articles
  const renderArticles = () => {

    // calculate start and end indices for the current page
    let startIndex = (currentPage - 1) * articlesPerPage;
    let endIndex = startIndex + articlesPerPage;

    // filter and paginate the articles
    const filteredArticles = articles
      .filter(articleData => articleData.title.toLowerCase().includes(searchInput.toLowerCase()))
      .slice(startIndex, endIndex);

    if (filteredArticles.length === 0) 
      return (
        <div className="flex items-center justify-center pt-20">
          <span className="text-white">No articles found</span>
        </div>
      )
    else 
      return (
        <div 
          className="flex flex-col gap-3">
          {filteredArticles.map((articleData, index) => listItem(articleData, index))}
        </div>
      )
  }

  const renderSearch = () => {
    return (
      <div className="flex flex-col gap-3 relative mb-3 translate-x-[-3px]">
        <Search
          className="absolute left-3 top-1/2 text-blue-500 translate-y-[-50%]"
          size={20}
        />
        <input
          className="border-[1px] border-[#303030] rounded-md p-2 pl-10 bg-[#1d1c1d99]"
          placeholder="Search articles or tags"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
    )
  }

  const renderPagination = () => {

    // styling for the pagination buttons
    const buttonStyle = "cursor-pointer text-white transition-all duration-500 hover:text-blue-500";

    // calculate the number of pages needed
    const numArticles = articles.length;
    const numPages = Math.ceil(numArticles / articlesPerPage);

    return (
      <div className="flex justify-center items-center gap-8 w-full h-10 border-[1px] border-[#303030] rounded-md mt-4">
        <div className={buttonStyle}>
          <ChevronLeft
            size={20}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          />
        </div>
        <div className="w-1">{currentPage}</div>
        <div className={buttonStyle}>
          <ChevronRight
            size={20}
            onClick={() => currentPage < numPages && setCurrentPage(currentPage + 1)}
          />
        </div>
      </div>
    )

  }

  return (
    <div>
      {renderArticles()}
      {renderPagination()}
    </div>
  )
}

export default ArticleList;