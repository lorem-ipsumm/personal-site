"use client";
import { currentArticleAtom } from "../utils/atoms"
import { ArticleData } from "../utils/interface"
import { articles } from "../utils/utils"
import { useAtom } from "jotai"

const ArticleList = () => {

  // import atom
  const [, setCurrentArticle] = useAtom(currentArticleAtom);

  // render list item
  const listItem = (articleData: ArticleData) => {

    // format the date to be more readable
    const formattedDate = new Date(articleData.date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })

    return (
      <li 
        className="text-white hover:text-blue-500 cursor-pointer transition-all ease duration-500 flex flex-col"
        onClick={() => setCurrentArticle(articleData)}
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
    return (
      <div className="flex flex-col gap-3">
        {articles.map((articleData) => listItem(articleData))}
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {renderArticles()}
    </div>
  )
}

export default ArticleList;