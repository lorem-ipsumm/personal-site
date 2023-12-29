import { BarChart2, Bookmark, Cloud, Smile } from "react-feather";
import ArticleList from "./ArticleList";
import FunBox from "./FunBox";
import GridItem from "./GridItem";

const LeftSection = () => {
  return (
    <div 
      className="flex flex-col h-100 w-1/4 gap-5 p-5 pr-0"
    >
      <GridItem
        title="Lorem's Lab"
        icon={<BarChart2/>}
      >
        <span>
          Welcome to my lab! Here you can find some of my projects, articles, and other fun stuff.
        </span>
      </GridItem>
      <GridItem
        title="Articles" 
        icon={<Bookmark/>}
      >
        <ArticleList/>
      </GridItem>
      <GridItem
        title="Ball Pit"
        icon={<Smile/>}
      >
        <FunBox/> 
      </GridItem>
    </div>
  )
}

export default LeftSection;