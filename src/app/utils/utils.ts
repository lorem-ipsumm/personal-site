import { ArticleData } from "./interface";

export const articles: ArticleData[] = [
  {
    title: "Welcome to my Lab",
    description: "A brief introduction to my lab",
    filePath: "/articles/welcome.md",
    imgPath: "/article-images/welcome.png",
    tags: ["welcome"],
    date: "2023-01-01",
  },
  {
    title: "Atomic NFT Arbitrages",
    description: "A story on how I profited from performing atomic arbitrages on Sudoswap",
    filePath: "/articles/nft-arbitrages.md",
    imgPath: "/article-images/nft-arbitrages.png",
    tags: ["ethereum", "flashloan", "mev", "solidity"],
    date: "2022-03-01",
  },
  {
    title: "Creating Crypto Price Alerts",
    description: "A tutorial on how to create crypto price alerts with Typescript",
    filePath: "/articles/price-alerts-bot.md",
    imgPath: "/article-images/price-alerts-bot.png",
    tags: ["typescript", "crypto", "price alerts"],
    date: "2023-03-15",
  },
  {
    title: "ETH Web Dev Basics",
    description: "A tutorial on how to create a simple web app with ETH",
    filePath: "/articles/eth-web-dev-basics.md",
    imgPath: "/article-images/eth-web-dev-basics.png",
    tags: ["ethereum", "web dev", "solidity"],
    date: "2023-05-05",
  }
]