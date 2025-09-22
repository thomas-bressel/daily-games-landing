import { IArticle } from '@/Types/Article';
import { IRSSFeed, IFeedParseResult } from '@/Types/Feed';
import { RSSParser } from './Parser';
import { DateUtils } from '@/Lib/Utils/DateUtils';
import { APP_CONFIG } from '@/Lib/Constants/FeedUrls';

/**
 * Cache entry for RSS feeds
 */
interface ICacheEntry {
  articles: IArticle[];
  lastFetched: Date;
  feedResult: IFeedParseResult;
}

/**
 * RSS Fetcher with caching capabilities
 */
export class RSSFetcher {
  private parser: RSSParser;
  private cache: Map<string, ICacheEntry> = new Map();

  constructor() {
    this.parser = new RSSParser();
  }

  /**
   * Fetch articles from multiple feeds with caching
   */
  async fetchArticles(feeds: IRSSFeed[], forceRefresh: boolean = false): Promise<{
    articles: IArticle[];
    results: IFeedParseResult[];
    fromCache: boolean;
  }> {
    const feedsToFetch: IRSSFeed[] = [];
    const cachedArticles: IArticle[] = [];
    const allResults: IFeedParseResult[] = [];

    // Check cache for each feed
    for (const feed of feeds) {
      if (!feed.isActive) continue;

      const cacheKey = this.getCacheKey(feed);
      const cached = this.cache.get(cacheKey);

      const shouldFetch = forceRefresh || 
        !cached || 
        !DateUtils.isRecent(cached.lastFetched, APP_CONFIG.CACHE_DURATION);

      if (shouldFetch) {
        feedsToFetch.push(feed);
      } else {
        cachedArticles.push(...cached.articles);
        allResults.push(cached.feedResult);
      }
    }

    // Fetch fresh data for feeds not in cache or expired
    const freshArticles: IArticle[] = [];
    if (feedsToFetch.length > 0) {
      console.log(`Fetching ${feedsToFetch.length} feeds (${feeds.length - feedsToFetch.length} from cache)`);
      
      const freshResults = await this.parser.parseMultipleFeeds(feedsToFetch);
      allResults.push(...freshResults);

      // Update cache and collect articles
      for (const result of freshResults) {
        if (result.success) {
          const cacheKey = this.getCacheKey(result.feed);
          this.cache.set(cacheKey, {
            articles: result.articles,
            lastFetched: result.fetchedAt,
            feedResult: result,
          });
          freshArticles.push(...result.articles);
        }
      }
    }

    // Combine all articles
    const allArticles = [...cachedArticles, ...freshArticles];

    // Sort by publication date (newest first)
    const sortedArticles = this.sortArticlesByDate(allArticles);

    return {
      articles: sortedArticles,
      results: allResults,
      fromCache: feedsToFetch.length === 0,
    };
  }

  /**
   * Fetch articles from a single feed
   */
  async fetchSingleFeed(feed: IRSSFeed, forceRefresh: boolean = false): Promise<{
    articles: IArticle[];
    result: IFeedParseResult;
    fromCache: boolean;
  }> {
    const cacheKey = this.getCacheKey(feed);
    const cached = this.cache.get(cacheKey);

    const shouldFetch = forceRefresh || 
      !cached || 
      !DateUtils.isRecent(cached.lastFetched, APP_CONFIG.CACHE_DURATION);

    if (!shouldFetch && cached) {
      return {
        articles: cached.articles,
        result: cached.feedResult,
        fromCache: true,
      };
    }

    // Fetch fresh data
    const result = await this.parser.parseFeed(feed);

    if (result.success) {
      this.cache.set(cacheKey, {
        articles: result.articles,
        lastFetched: result.fetchedAt,
        feedResult: result,
      });
    }

    return {
      articles: result.articles,
      result,
      fromCache: false,
    };
  }

  /**
   * Clear cache for specific feed or all feeds
   */
  clearCache(feedId?: string): void {
    if (feedId) {
      const keysToDelete = Array.from(this.cache.keys()).filter(key => 
        key.includes(feedId)
      );
      keysToDelete.forEach(key => this.cache.delete(key));
    } else {
      this.cache.clear();
    }
    
    console.log(`Cache cleared${feedId ? ` for feed: ${feedId}` : ' (all feeds)'}`);
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    totalFeeds: number;
    totalArticles: number;
    oldestEntry?: Date;
    newestEntry?: Date;
  } {
    const entries = Array.from(this.cache.values());
    
    return {
      totalFeeds: entries.length,
      totalArticles: entries.reduce((sum, entry) => sum + entry.articles.length, 0),
      oldestEntry: entries.length > 0 ? 
        new Date(Math.min(...entries.map(e => e.lastFetched.getTime()))) : undefined,
      newestEntry: entries.length > 0 ? 
        new Date(Math.max(...entries.map(e => e.lastFetched.getTime()))) : undefined,
    };
  }

  /**
   * Sort articles by publication date (newest first)
   */
  private sortArticlesByDate(articles: IArticle[]): IArticle[] {
    return articles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  /**
   * Generate cache key for feed
   */
  private getCacheKey(feed: IRSSFeed): string {
    return `feed_${feed.id}_${feed.url}`;
  }

  /**
   * Validate feed before adding to fetcher
   */
  async validateFeed(url: string): Promise<{ isValid: boolean; error?: string }> {
    return this.parser.validateFeedUrl(url);
  }
}