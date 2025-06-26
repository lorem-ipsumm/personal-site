import { atom } from "jotai";
import { ArticleData } from "./interface";
import { articles } from "./utils";

// current article being displayed
export const currentArticleAtom = atom<ArticleData | null>(null);

// theme atom for dark/light mode toggle
export const themeAtom = atom<"light" | "dark">("light");
