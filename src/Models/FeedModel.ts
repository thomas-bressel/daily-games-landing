import { IRSSFeed, IFeedParseResult } from '@/Types/Feed';
import { StringUtils } from '@/Lib/Utils/StringUtils';
import { DateUtils } from '@/Lib/Utils/DateUtils';
import { CATEGORIES, CategoryType } from '@/Types/Common';

/**
 * Feed Model for RSS feed data validation and transformation
 */
export class FeedModel {
  /**
   * Validate feed data structure
   */
  static validate(feedData: Partial<IRSSFeed>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Required fields validation
    if (!feedData.name || feedData.name.trim().length === 0) {
      errors.push('Feed name is required');
    }

    if (!feedData.url || !StringUtils.isValidUrl(feedData.url)) {
      errors.push('Valid RSS URL is required');
    }

    if (!feedData.category || feedData.category.trim().length === 0) {
      errors.push('Category is required');
    }

    // Validate category exists
    const validCategories = Object.values(CATEGORIES);
    if (feedData.category && !validCategories.includes(feedData.category as CategoryType)) {
      errors.push(`Category must be one of: ${validCategories.join(', ')}`);
    }

    // Optional fields validation
    if (feedData.name && feedData.name.length > 100) {
      errors.push('Feed name must be less than 100 characters');
    }

    if (feedData.description && feedData.description.length > 500) {
      errors.push('Description must be less than 500 characters');
    }

    if (feedData.fetchInterval && (feedData.fetchInterval < 5 || feedData.fetchInterval > 1440)) {
      errors.push('Fetch interval must be between 5 and 1440 minutes');
    }

    if (feedData.tags && !Array.isArray(feedData.tags)) {
      errors.push('Tags must be an array');
    }

    if (feedData.tags && feedData.tags.length > 20) {
      errors.push('Maximum 20 tags allowed');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Create a clean feed object with validated data
   */
  static create(feedData: Partial<IRSSFeed>): IRSSFeed | null {
    const validation = this.validate(feedData);

    if (!validation.isValid) {
      console.error('Feed validation failed:', validation.errors);
      return null;
    }

    return {
      id: feedData.id || '',
      name: StringUtils.sanitizeText(feedData.name || ''),
      url: feedData.url || '',
      category: feedData.category || CATEGORIES.RETRO_GAMING,
      description: feedData.description ? StringUtils.sanitizeText(feedData.description) : undefined,
      isActive: feedData.isActive !== undefined ? feedData.isActive : true,
      lastFetched: feedData.lastFetched,
      fetchInterval: feedData.fetchInterval || 60,
      tags: feedData.tags || [],
    };
  }

  /**
   * Transform feed for API response
   */
  static toApiFormat(feed: IRSSFeed): {
    id: string;
    name: string;
    url: string;
    category: string;
    description?: string;
    isActive: boolean;
    lastFetched?: string;
    fetchInterval: number;
    tags: string[];
    domain: string;
    status: 'active' | 'inactive' | 'error';
  } {
    return {
      id: feed.id,
      name: feed.name,
      url: feed.url,
      category: feed.category,
      description: feed.description,
      isActive: feed.isActive,
      lastFetched: feed.lastFetched ? DateUtils.formatForStorage(feed.lastFetched) : undefined,
      fetchInterval: feed.fetchInterval || 60, // Ensure fetchInterval is always a number
      tags: feed.tags,
      domain: StringUtils.extractDomain(feed.url),
      status: this.getFeedStatus(feed),
    };
  }

  /**
   * Transform feed for display in components
   */
  static toDisplayFormat(feed: IRSSFeed): {
    id: string;
    name: string;
    url: string;
    category: string;
    description?: string;
    isActive: boolean;
    lastFetched?: Date;
    fetchInterval: number;
    tags: string[];
    domain: string;
    status: 'active' | 'inactive' | 'error';
    lastFetchedRelative?: string;
    nextFetchEstimate?: string;
  } {
    const nextFetch = this.estimateNextFetch(feed);
    
    return {
      ...feed,
      fetchInterval: feed.fetchInterval || 60, // Ensure fetchInterval is always a number
      domain: StringUtils.extractDomain(feed.url),
      status: this.getFeedStatus(feed),
      lastFetchedRelative: feed.lastFetched ? DateUtils.formatRelativeTime(feed.lastFetched) : undefined,
      nextFetchEstimate: nextFetch ? DateUtils.formatRelativeTime(nextFetch) : undefined,
    };
  }

  /**
   * Get feed status based on last fetch and activity
   */
  static getFeedStatus(feed: IRSSFeed): 'active' | 'inactive' | 'error' {
    if (!feed.isActive) {
      return 'inactive';
    }

    // If never fetched, assume active
    if (!feed.lastFetched) {
      return 'active';
    }

    // If last fetch was more than 2x the fetch interval ago, consider it an error
    const now = new Date();
    const timeSinceLastFetch = (now.getTime() - feed.lastFetched.getTime()) / (1000 * 60);
    const maxExpectedInterval = (feed.fetchInterval || 60) * 2;

    if (timeSinceLastFetch > maxExpectedInterval) {
      return 'error';
    }

    return 'active';
  }

  /**
   * Estimate next fetch time based on interval
   */
  static estimateNextFetch(feed: IRSSFeed): Date | null {
    if (!feed.isActive || !feed.lastFetched) {
      return null;
    }

    const nextFetch = new Date(feed.lastFetched);
    nextFetch.setMinutes(nextFetch.getMinutes() + (feed.fetchInterval || 60));

    return nextFetch;
  }

  /**
   * Check if feed needs updating
   */
  static needsUpdate(feed: IRSSFeed): boolean {
    if (!feed.isActive) {
      return false;
    }

    if (!feed.lastFetched) {
      return true; // Never fetched
    }

    const now = new Date();
    const timeSinceLastFetch = (now.getTime() - feed.lastFetched.getTime()) / (1000 * 60);

    return timeSinceLastFetch >= (feed.fetchInterval || 60);
  }

  /**
   * Update feed last fetched time
   */
  static updateLastFetched(feed: IRSSFeed): IRSSFeed {
    return {
      ...feed,
      lastFetched: new Date(),
    };
  }

  /**
   * Compare two feeds for equality
   */
  static isEqual(feed1: IRSSFeed, feed2: IRSSFeed): boolean {
    return feed1.id === feed2.id || feed1.url === feed2.url;
  }

  /**
   * Serialize feed for storage
   */
  static serialize(feed: IRSSFeed): string {
    try {
      return JSON.stringify({
        ...feed,
        lastFetched: feed.lastFetched ? DateUtils.formatForStorage(feed.lastFetched) : undefined,
      });
    } catch (error) {
      console.error('Error serializing feed:', error);
      return '';
    }
  }

  /**
   * Deserialize feed from storage
   */
  static deserialize(serializedFeed: string): IRSSFeed | null {
    try {
      const data = JSON.parse(serializedFeed);
      return {
        ...data,
        lastFetched: data.lastFetched ? new Date(data.lastFetched) : undefined,
      };
    } catch (error) {
      console.error('Error deserializing feed:', error);
      return null;
    }
  }

  /**
   * Validate feed parse result
   */
  static validateParseResult(result: IFeedParseResult): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!result.feed) {
      errors.push('Feed information is required');
    }

    if (!result.fetchedAt || !(result.fetchedAt instanceof Date)) {
      errors.push('Valid fetch date is required');
    }

    if (result.success && (!result.articles || !Array.isArray(result.articles))) {
      errors.push('Articles array is required for successful results');
    }

    if (!result.success && !result.error) {
      errors.push('Error message is required for failed results');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Create feed health report
   */
  static createHealthReport(feed: IRSSFeed, recentResults: IFeedParseResult[] = []): {
    feedId: string;
    name: string;
    status: 'healthy' | 'warning' | 'error';
    uptime: number; // Percentage
    lastSuccessfulFetch?: Date;
    consecutiveFailures: number;
    averageArticlesPerFetch: number;
    issues: string[];
  } {
    const issues: string[] = [];
    let consecutiveFailures = 0;
    let successfulFetches = 0;
    let totalArticles = 0;

    // Analyze recent results
    for (let i = recentResults.length - 1; i >= 0; i--) {
      const result = recentResults[i];
      
      if (result.success) {
        successfulFetches++;
        totalArticles += result.articles.length;
        if (consecutiveFailures === 0) {
          // Only count consecutive failures from the most recent
          break;
        }
      } else {
        if (i === recentResults.length - 1) {
          consecutiveFailures++;
        }
      }
    }

    // Calculate uptime percentage
    const uptime = recentResults.length > 0 ? (successfulFetches / recentResults.length) * 100 : 100;

    // Determine status
    let status: 'healthy' | 'warning' | 'error' = 'healthy';
    
    if (!feed.isActive) {
      status = 'error';
      issues.push('Feed is disabled');
    } else if (consecutiveFailures >= 3) {
      status = 'error';
      issues.push(`${consecutiveFailures} consecutive failures`);
    } else if (uptime < 80) {
      status = 'warning';
      issues.push(`Low uptime: ${uptime.toFixed(1)}%`);
    } else if (consecutiveFailures > 0) {
      status = 'warning';
      issues.push(`${consecutiveFailures} recent failure(s)`);
    }

    // Check for other issues
    if (this.needsUpdate(feed)) {
      issues.push('Feed is overdue for update');
    }

    return {
      feedId: feed.id,
      name: feed.name,
      status,
      uptime: Math.round(uptime),
      lastSuccessfulFetch: feed.lastFetched,
      consecutiveFailures,
      averageArticlesPerFetch: successfulFetches > 0 ? Math.round(totalArticles / successfulFetches) : 0,
      issues,
    };
  }
}