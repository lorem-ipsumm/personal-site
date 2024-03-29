import { BarChart2, Bookmark, Cloud, Smile } from "react-feather";
import ArticleList from "./ArticleList";
import FunBox from "./FunBox";
import GridItem from "./GridItem";
import Orb from "../../assets/orb.png";

const LeftSection = () => {
  return (
    <div className="h-100 flex w-full flex-col gap-5 p-5 lg:w-1/4 lg:pr-0">
      <GridItem
        title="Lorem Labs"
        icon={<img src={Orb.src} className="h-[24px] w-[24px]" />}
      >
        <span>
          Welcome to my lab! Here you can find some of my projects, articles,
          and other fun stuff.
        </span>
      </GridItem>
      <GridItem title="Articles" icon={<Bookmark />}>
        <ArticleList />
      </GridItem>
      <div className="hidden lg:block">
        <GridItem title="Ball Pit" icon={<Smile />}>
          <FunBox />
        </GridItem>
      </div>
    </div>
  );
};

export default LeftSection;
