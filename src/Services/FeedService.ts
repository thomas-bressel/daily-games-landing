import { IRSSFeed, IFeedParseResult, IFeedStatus } from '@/Types/Feed';
import { IArticle } from '@/Types/Article';
import { RSSFetcher } from '@/Lib/RSS/Fetcher';
import { DEFAULT_RSS_FEEDS } from '@/Lib/Constants/FeedUrls';

/**
 * Service for RSS feed management and orchestration
 */
export class FeedService {
  private fetcher: RSSFetcher;
  private feeds: IRSSFeed[];

  constructor() {
    this.fetcher = new RSSFetcher();
    this.feeds = [...DEFAULT_RSS_FEEDS];
  }

  /**
   * Get all configured feeds
   */
  getFeeds(): IRSSFeed[] {
    return [...this.feeds];
  }

  /**
   * Get only active feeds
   */
  getActiveFeeds(): IRSSFeed[] {
    return this.feeds.filter(feed => feed.isActive);
  }

  /**
   * Get feed by ID
   */
  getFeedById(feedId: string): IRSSFeed | undefined {
    return this.feeds.find(feed => feed.id === feedId);
  }

  /**
   * Add new RSS feed
   */
  async addFeed(feedData: Omit<IRSSFeed, 'id' | 'lastFetched'>): Promise<{
    success: boolean;
    feed?: IRSSFeed;
    error?: string;
  }> {
    try {
      // Validate feed URL
      const validation = await this.fetcher.validateFeed(feedData.url);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.error || 'Invalid RSS feed URL',
        };
      }

      // Check for duplicate URLs
      const existingFeed = this.feeds.find(feed => feed.url === feedData.url);
      if (existingFeed) {
        return {
          success: false,
          error: 'Feed with this URL already exists',
        };
      }

      // Generate unique ID
      const id = `feed_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const newFeed: IRSSFeed = {
        ...feedData,
        id,
        lastFetched: undefined,
      };

      this.feeds.push(newFeed);

      return {
        success: true,
        feed: newFeed,
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Update existing feed
   */
  updateFeed(feedId: string, updates: Partial<IRSSFeed>): {
    success: boolean;
    feed?: IRSSFeed;
    error?: string;
  } {
    const feedIndex = this.feeds.findIndex(feed => feed.id === feedId);

    if (feedIndex === -1) {
      return {
        success: false,
        error: 'Feed not found',
      };
    }

    // Validate URL if it's being updated
    if (updates.url) {
      const existingFeed = this.feeds.find(
        (feed, index) => feed.url === updates.url && index !== feedIndex
      );
      if (existingFeed) {
        return {
          success: false,
          error: 'Feed with this URL already exists',
        };
      }
    }

    this.feeds[feedIndex] = {
      ...this.feeds[feedIndex],
      ...updates,
      id: feedId, // Prevent ID changes
    };

    return {
      success: true,
      feed: this.feeds[feedIndex],
    };
  }

  /**
   * Remove feed
   */
  removeFeed(feedId: string): {
    success: boolean;
    error?: string;
  } {
    const feedIndex = this.feeds.findIndex(feed => feed.id === feedId);

    if (feedIndex === -1) {
      return {
        success: false,
        error: 'Feed not found',
      };
    }

    this.feeds.splice(feedIndex, 1);
    this.fetcher.clearCache(feedId);

    return { success: true };
  }

  /**
   * Toggle feed active status
   */
  toggleFeedStatus(feedId: string): {
    success: boolean;
    feed?: IRSSFeed;
    error?: string;
  } {
    const feed = this.feeds.find(f => f.id === feedId);

    if (!feed) {
      return {
        success: false,
        error: 'Feed not found',
      };
    }

    feed.isActive = !feed.isActive;

    return {
      success: true,
      feed,
    };
  }

  /**
   * Fetch all articles from active feeds
   */
  async fetchAllArticles(forceRefresh: boolean = false): Promise<{
    articles: IArticle[];
    results: IFeedParseResult[];
    stats: {
      totalFeeds: number;
      successfulFeeds: number;
      totalArticles: number;
      fromCache: boolean;
    };
  }> {
    const activeFeeds = this.getActiveFeeds();

    if (activeFeeds.length === 0) {
      return {
        articles: [],
        results: [],
        stats: {
          totalFeeds: 0,
          successfulFeeds: 0,
          totalArticles: 0,
          fromCache: false,
        },
      };
    }

    const { articles, results, fromCache } = await this.fetcher.fetchArticles(
      activeFeeds,
      forceRefresh
    );

    const successfulFeeds = results.filter(result => result.success).length;

    return {
      articles,
      results,
      stats: {
        totalFeeds: activeFeeds.length,
        successfulFeeds,
        totalArticles: articles.length,
        fromCache,
      },
    };
  }

  /**
   * Fetch articles from specific feed
   */
  async fetchFeedArticles(feedId: string, forceRefresh: boolean = false): Promise<{
    articles: IArticle[];
    result: IFeedParseResult;
    fromCache: boolean;
  } | null> {
    const feed = this.getFeedById(feedId);

    if (!feed) {
      return null;
    }

    return await this.fetcher.fetchSingleFeed(feed, forceRefresh);
  }

  /**
   * Get feed status information
   */
  getFeedStatuses(): IFeedStatus[] {
    return this.feeds.map(feed => ({
      feedId: feed.id,
      isOnline: feed.isActive,
      lastSuccessfulFetch: feed.lastFetched,
      lastError: undefined, // Would be populated from actual fetch results
      totalArticles: 0, // Would be populated from cache/database
    }));
  }



  /**
  * Get feeds that need updating based on their fetch interval
  * @returns 
  */
  public getFeedsNeedingUpdate(): IRSSFeed[] {
    const now = new Date();

    return this.getActiveFeeds().filter(feed => {
      if (!feed.lastFetched) {
        return true; // Never fetched
      }

      const intervalMinutes = feed.fetchInterval || 60;
      const timeSinceLastFetch = (now.getTime() - feed.lastFetched.getTime()) / (1000 * 60);

      return timeSinceLastFetch >= intervalMinutes;
    });
  }

  /**
   * Clear cache for all feeds or specific feed
   */
  clearCache(feedId?: string): void {
    this.fetcher.clearCache(feedId);
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
    return this.fetcher.getCacheStats();
  }

  /**
   * Export feeds configuration
   */
  exportFeeds(): IRSSFeed[] {
    return this.getFeeds();
  }

  /**
   * Import feeds configuration
   */
  async importFeeds(
    feedsData: IRSSFeed[],
    replaceExisting: boolean = false
  ): Promise<{
    success: boolean;
    imported: number;
    errors: string[];
  }> {
    const errors: string[] = [];
    let imported = 0;

    if (replaceExisting) {
      this.feeds = [];
    }

    for (const feedData of feedsData) {
      try {
        // Validate feed
        const validation = await this.fetcher.validateFeed(feedData.url);
        if (!validation.isValid) {
          errors.push(`Invalid feed ${feedData.name}: ${validation.error}`);
          continue;
        }

        // Check for duplicates
        const exists = this.feeds.some(existing => existing.url === feedData.url);
        if (exists && !replaceExisting) {
          errors.push(`Feed ${feedData.name} already exists`);
          continue;
        }

        this.feeds.push(feedData);
        imported++;

      } catch (error) {
        errors.push(`Error importing ${feedData.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return {
      success: errors.length === 0,
      imported,
      errors,
    };
  }
}