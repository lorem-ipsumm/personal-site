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
            className="text-xs px-2 py-1 rounded-md border-[1px] border-[#303030]"
          >
            {tag}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-3 mt-5">
      <span>Tags:</span>
      {renderTags()}
    </div>
  )

}

export default TagsSection;