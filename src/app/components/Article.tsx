"use client";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "../../styles/markdown.css";
import { useAtom } from "jotai";
import { currentArticleAtom } from "../utils/atoms";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "react-feather";
import { ArticleData } from "../utils/interface";

const Article = () => {
  // import atom
  const [currentArticle] = useAtom(currentArticleAtom);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // text content
  const [content, setContent] = useState<string>("");
  const [showCheck, setShowCheck] = useState<number>(-1);
  const prevArticleRef = useRef<ArticleData | null>(null);

  useEffect(() => {
    if (
      !currentArticle ||
      currentArticle.filePath === prevArticleRef.current?.filePath
    )
      return;
    prevArticleRef.current = currentArticle;
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

  const renderFullScreenImage = () => {
    if (!selectedImage) return null;
    return (
      <div
        className="fadeIn fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-90"
        onClick={() => setSelectedImage(null)}
      >
        <img
          src={selectedImage}
          alt="full screen"
          className="max-h-full max-w-full"
        />
      </div>
    );
  };

  // custom image component to open images in full screen
  const Image = ({ node, ...props }: any) => (
    <img
      {...props}
      onClick={() => setSelectedImage(props.src)}
      // style={{ cursor: "pointer" }}
      className="cursor-pointer hover:opacity-80 transition-all"
    />
  );

  // custom anchor component to open links in new tab
  const Anchor = ({ node, ...props }: any) => (
    <a {...props} target="_blank" rel="noreferrer noopener">
      {props.children}
    </a>
  );

  // syntax highlighting, code block styling, and line numbers
  const components = {
    a: Anchor,
    img: Image,
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
      {renderFullScreenImage()}
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
};

export default Article;
