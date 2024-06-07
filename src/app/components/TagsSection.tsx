import { useAtom } from "jotai";
import { currentArticleAtom } from "../utils/atoms";

const TagsSection = () => {
  const [currentArticle] = useAtom(currentArticleAtom);

  // render tags for the current article
  const renderTags = () => {
    return (
      <div className="flex flex-wrap gap-2">
        {currentArticle?.tags.map((tag) => (
          <span
            className="rounded-md border-[1px] border-[#303030] px-2 py-1 text-xs"
            key={`${tag}-${currentArticle?.title}`}
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-5 flex gap-3">
      <span>Tags:</span>
      {renderTags()}
    </div>
  );
};

export default TagsSection;
