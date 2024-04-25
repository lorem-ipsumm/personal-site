import { BarChart2, Bookmark, Cloud, Smile } from "react-feather";
import ArticleList from "./ArticleList";
import FunBox from "./FunBox";
import GridItem from "./GridItem";
import Orb from "../../assets/orb.png";
import Link from "next/link";

const LeftSection = () => {
  const portfolioLink = () => {
    return (
      <Link
        href="/articles/portfolio"
        className="underline hover:text-blue-700 transition-all"
      >
        my projects
      </Link>
    );
  };

  return (
    <div className="h-100 flex w-full flex-col gap-5 p-5 lg:w-1/4 lg:pr-0">
      <GridItem
        title={<Link href="/articles/welcome">Lorem Labs</Link>}
        icon={<img src={Orb.src} className="h-[24px] w-[24px]" />}
      >
        <span>
          Welcome to my lab! Here you can find some of {portfolioLink()},
          articles, and other fun stuff.
        </span>
      </GridItem>
      <GridItem title="Articles" icon={<Bookmark />}>
        <ArticleList />
      </GridItem>
      <div className="hidden md:block">
        <FunBox />
      </div>
    </div>
  );
};

export default LeftSection;
