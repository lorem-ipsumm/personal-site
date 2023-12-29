import { atom } from 'jotai'
import { ArticleData } from './interface'
import { articles } from './utils';

// current article being displayed
export const currentArticleAtom = atom<ArticleData | null>(articles[0] as ArticleData);