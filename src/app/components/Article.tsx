"use client";
import { Fragment, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "../../styles/markdown.css";
import { useAtom } from "jotai";
import { currentArticleAtom } from "../utils/atoms";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "react-feather";

const Article = () => {
  // import atom
  const [currentArticle] = useAtom(currentArticleAtom);
  // text content
  const [content, setContent] = useState<string>("");
  const [showCheck, setShowCheck] = useState<number>(-1);

  useEffect(() => {
    if (!currentArticle) return;
    // fetch the article
    fetch(currentArticle?.filePath)
      .then((res) => res.text())
      .then((data) => {
        setContent(data);
      });
  }, [currentArticle]);

  const copyToClipboard = (text: string, id: number) => {
    // copy to clipboard
    navigator.clipboard.writeText(text);
    // update state
    setShowCheck(id);
    // reset state after 1 second
    setTimeout(() => setShowCheck(-1), 1000);
  };

  // syntax highlighting, code block styling, and line numbers
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const text = String(children).replace(/\n$/, "");
      const id = node.position.end.line;
      return !inline && match ? (
        <Fragment>
          {showCheck !== id ? (
            <Copy
              className="ease absolute right-4 top-4 cursor-pointer transition-all duration-500 hover:scale-90 hover:text-blue-500"
              size={20}
              onClick={() => copyToClipboard(text, id)}
            />
          ) : (
            <Check
              className="ease animation-pulse absolute right-4 top-4 cursor-pointer stroke-green-500 transition-all duration-500"
              size={20}
            />
          )}
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
