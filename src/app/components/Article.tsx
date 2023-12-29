"use client"
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import "../../styles/markdown.css";
import { useAtom } from "jotai";
import { currentArticleAtom } from "../utils/atoms";

const Article = () => {

  // import atom
  const [currentArticle] = useAtom(currentArticleAtom);
  // text content
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (!currentArticle) return;
    // fetch the article
    fetch(currentArticle?.filePath)
      .then(res => res.text())
      .then(data => {
        setContent(data);
      })
  }, [currentArticle]);

  return (
    <div className="markdown-content">
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default Article;