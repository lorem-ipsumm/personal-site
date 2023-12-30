"use client";
import { Fragment, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "../../styles/markdown.css";
import { useAtom } from "jotai";
import { currentArticleAtom } from "../utils/atoms";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy } from "react-feather";

const Article = () => {
  // import atom
  const [currentArticle] = useAtom(currentArticleAtom);
  // text content
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (!currentArticle) return;
    // fetch the article
    fetch(currentArticle?.filePath)
      .then((res) => res.text())
      .then((data) => {
        setContent(data);
      });
  }, [currentArticle]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  }

  // syntax highlighting, code block styling, and line numbers
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const text = String(children).replace(/\n$/, "");
      return !inline && match ? (
        <Fragment>
          <Copy
            className="absolute top-4 right-4 cursor-pointer hover:text-blue-500 transition-all ease duration-500 hover:scale-90"
            size={20}
            onClick={() => copyToClipboard(text)}
          />
          <SyntaxHighlighter
            style={solarizedlight}
            language={match[1]}
            PreTag="code"
            children={text}
            showLineNumbers={true}
            {...props}
          />
        </Fragment>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="markdown-content">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
};

export default Article;
