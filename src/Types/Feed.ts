import { IArticle } from "./Article";

/**
 * RSS Feed configuration interface
 */
export interface IRSSFeed {
  id: string;
  name: string;
  url: string;
  category: string;
  description?: string;
  isActive: boolean;
  lastFetched?: Date;
  fetchInterval?: number; // in minutes
  tags: string[];
}

/**
 * Feed parsing result
 */
export interface IFeedParseResult {
  success: boolean;
  feed: IRSSFeed;
  articles: IArticle[];
  error?: string;
  fetchedAt: Date;
}

/**
 * Feed status for monitoring
 */
export interface IFeedStatus {
  feedId: string;
  isOnline: boolean;
  lastSuccessfulFetch?: Date;
  lastError?: string;
  totalArticles: number;
}