// RSS parser library Import
import Parser from 'rss-parser';

// Uuid generator import
import { v4 as uuidv4 } from 'uuid';

// Type and interface import
import { IArticle, IRawArticle } from '@/Types/Article';
import { IRSSFeed, IFeedParseResult } from '@/Types/Feed';

// utils class imports
import { DateUtils } from '@/Lib/Utils/DateUtils';
import { StringUtils } from '@/Lib/Utils/StringUtils';

const LIMIT = 50; // Max articles to fetch per feed



/**
 * RSS Parser service for fetching and parsing RSS feeds
 */
export class RSSParser {

  // Attributes
  private parser: Parser;
  private maxFetchedArticles: number = 0; // Max articles to fetch per feed


  // Constructor
  constructor() {
    this.maxFetchedArticles = LIMIT;
    this.parser = new Parser({
      timeout: 10000,
      headers: {
        'User-Agent': 'daily-games/1.0.0',
      },
    });
  }




  /**
   * Parse a single RSS feed and return articles
   * @param feed 
   * @returns IFeedParseResult
   */
  public async parseFeed(feed: IRSSFeed): Promise<IFeedParseResult> {
    const startTime = new Date();

    try {
      console.log(`Fetching RSS feed: ${feed.name} (${feed.url})`);

      // Fetch and parsing result from URL
      const parsedFeed = await this.parser.parseURL(feed.url);

      // Check if feed has items
      if (!parsedFeed.items || parsedFeed.items.length === 0) {
        return {
          success: false,
          feed,
          articles: [],
          error: 'No articles found in feed',
          fetchedAt: startTime,
        };
      }


      // Limit to recent items
      const limitedItems = this.limitRecentItems(parsedFeed.items);

      // Transform and filter valid articles
      const transformedArticles = this.transformItems(limitedItems, feed);

      // Filter out null articles
      const articles = this.filterValidArticles(transformedArticles);

      console.log(`Successfully parsed ${articles.length} articles from ${feed.name}`);

      return {
        success: true, feed: {
          ...feed,
          lastFetched: startTime,
        },
        articles, fetchedAt: startTime,
      };

    } catch (error) {
      console.error(`Error parsing feed ${feed.name}:`, error);
      return { success: false, feed, articles: [], error: error instanceof Error ? error.message : 'Unknown error occurred', fetchedAt: startTime};
    }
  }




  /**
   * Limit to recent items
   * 
   * @param items 
   * @returns 
   */
  private limitRecentItems(items: IRawArticle[]): IRawArticle[] {
    return items.slice(0, this.maxFetchedArticles);
  }





  /**
   * Transform raw items to articles
   * 
   * @param items 
   * @param feed 
   * @returns 
   */
  private transformItems(items: IRawArticle[], feed: IRSSFeed): (IArticle | null)[] {
    return items.map(item => this.transformRawArticle(item, feed));
  }




  /**
  * Filter out null articles
  * 
  * @param articles 
  * @returns 
  */
  private filterValidArticles(articles: (IArticle | null)[]): IArticle[] {
    return articles.filter((article): article is IArticle => article !== null);
  }




  
  /**
   * Parse multiple RSS feeds concurrently
   * 
   * @param feeds 
   * @returns 
   */
  public async parseMultipleFeeds(feeds: IRSSFeed[]): Promise<IFeedParseResult[]> {
    console.log(`Parsing ${feeds.length} RSS feeds...`);

    // Create an array of promises for each feed
    const promises = feeds.filter(feed => feed.isActive).map(feed => this.parseFeed(feed));

    // Wait for all promises to settle
    const results = await Promise.allSettled(promises);


    // Map results to IFeedParseResult, handling both fulfilled and rejected cases
    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error(`Failed to parse feed ${feeds[index].name}:`, result.reason);
        return { success: false, feed: feeds[index], articles: [], error: result.reason?.message || 'Promise rejected', fetchedAt: new Date()};
      }
    });
  }




  
  /**
   * Transform raw RSS article to our Article interface
   * 
   * @param rawArticle 
   * @param feed 
   * @returns 
   */
  private transformRawArticle(rawArticle: IRawArticle, feed: IRSSFeed): IArticle | null {
    try {
      // Validate required fields
      if (!rawArticle.title && !rawArticle.link) {
        console.warn('Skipping article with missing title and link');
        return null;
      }

      const title = rawArticle.title || 'Untitled';
      const link = rawArticle.link || '';
      const description = StringUtils.cleanDescription(
        rawArticle.description || rawArticle.contentSnippet || rawArticle.content
      );

      // Parse publication date
      const publishedAt = DateUtils.parseRSSDate(
        rawArticle.isoDate || rawArticle.pubDate
      );

      // Generate unique ID
      const id = rawArticle.guid || uuidv4();

      // Extract tags from content
      const contentTags = StringUtils.extractTags(title, description);
      const allTags = Array.from(new Set([...feed.tags, ...contentTags]));

      // Extract potential image URL from multiple sources
      let imageUrl = this.extractImageUrl(rawArticle.content || rawArticle.description);

      // If no image found in content, try other RSS fields
      if (!imageUrl) {
        // Check for media fields that might exist in the raw article
        const rawAny = rawArticle as Record<string, unknown>;

        // RSS media namespace
        if (rawAny['media:thumbnail']) {
          const thumbnail = rawAny['media:thumbnail'];
          if (thumbnail && typeof thumbnail === 'object' && thumbnail !== null && '$' in thumbnail) {
            const thumbnailObj = thumbnail as { $: { url: string } };
            if (thumbnailObj.$ && thumbnailObj.$.url) {
              imageUrl = thumbnailObj.$.url;
            }
          }
        }

        // Enclosure images
        if (!imageUrl && rawAny.enclosure) {
          const enclosure = Array.isArray(rawAny.enclosure) ? rawAny.enclosure[0] : rawAny.enclosure;
          if (enclosure && typeof enclosure === 'object' && enclosure !== null && 'type' in enclosure && 'url' in enclosure) {
            const enclosureObj = enclosure as { type: string; url: string };
            if (enclosureObj.type && enclosureObj.type.startsWith('image/') && enclosureObj.url) {
              imageUrl = enclosureObj.url;
            }
          }
        }

        // iTunes/podcast image
        if (!imageUrl && rawAny['itunes:image']) {
          const itunesImage = rawAny['itunes:image'];
          if (itunesImage && typeof itunesImage === 'object' && itunesImage !== null && '$' in itunesImage) {
            const itunesImageObj = itunesImage as { $: { href: string } };
            if (itunesImageObj.$ && itunesImageObj.$.href) {
              imageUrl = itunesImageObj.$.href;
            }
          }
        }

        // Default fallback image based on category
        if (!imageUrl) {
          imageUrl = this.getDefaultImageForCategory(feed.category);
        }
      }

      const article: IArticle = {
        id,
        title: StringUtils.sanitizeText(title),
        description,
        link,
        publishedAt,
        source: feed.name,
        category: feed.category,
        tags: allTags,
        author: rawArticle.author,
        imageUrl,
      };

      return article;

    } catch (error) {
      console.error('Error transforming raw article:', error);
      return null;
    }
  }



  
  /**
   * Get default placeholder image based on category - VERSION CORRIGÉE
   */
  private getDefaultImageForCategory(category: string): string {
    // Images SVG encodées en base64 - garanties de fonctionner
    const defaultImages: Record<string, string> = {
      'amstrad-cpc': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhbXN0cmFkR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMzQjgyRjYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM2MzY2RjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNhbXN0cmFkR3JhZGllbnQpIi8+PHJlY3QgeD0iNTAiIHk9IjUwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzJEMzc0OCIgcng9IjgiLz48cmVjdCB4PSI2MCIgeT0iNjAiIHdpZHRoPSIyODAiIGhlaWdodD0iNDAiIGZpbGw9IiMxQTIwMkMiIHJ4PSI0Ii8+PHRleHQgeD0iMjAwIiB5PSI4NSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzAwRkY0MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFNU1RSQUQgQ1BDPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMTMwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UkVUUk8gQ09NUFVUSU5HPC90ZXh0PjxyZWN0IHg9IjMwMCIgeT0iMTIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNGRjAwMDAiIHJ4PSIyIi8+PHJlY3QgeD0iMzMwIiB5PSIxMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwRkY0MSIgcng9IjIiLz48L3N2Zz4=',
      'retro-gaming': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJyZXRyb0dyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMTBCOTgxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDZCNkQ0Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjcmV0cm9HcmFkaWVudCkiLz48cGF0aCBkPSJNMTUwIDUwSDI1MEMyNzAuOTg3IDUwIDI5MCA2Ni4zNzEgMjkwIDg1VjExNUMyOTAgMTMzLjYyOSAyNzAuOTg3IDE1MCAyNTAgMTUwSDE1MEMxMjkuMDEzIDE1MCAxMTAgMTMzLjYyOSAxMTAgMTE1Vjg1QzExMCA2Ni4zNzEgMTI5LjAxMyA1MCAxNTAgNTBaIiBmaWxsPSIjMUYyOTM3Ii8+PGNpcmNsZSBjeD0iMTYwIiBjeT0iODAiIHI9IjgiIGZpbGw9IiNGRjAwNDAiLz48Y2lyY2xlIGN4PSIxNjAiIGN5PSIxMjAiIHI9IjgiIGZpbGw9IiNGRjAwNDAiLz48Y2lyY2xlIGN4PSIxNDAiIGN5PSIxMDAiIHI9IjgiIGZpbGw9IiNGRjAwNDAiLz48Y2lyY2xlIGN4PSIxODAiIGN5PSIxMDAiIHI9IjgiIGZpbGw9IiNGRjAwNDAiLz48Y2lyY2xlIGN4PSIyNDAiIGN5PSI4NSIgcj0iMTIiIGZpbGw9IiMwMEZGNDEiLz48Y2lyY2xlIGN4PSIyNDAiIGN5PSIxMTUiIHI9IjEyIiBmaWxsPSIjMDBBNkZCIi8+PHRleHQgeD0iMjAwIiB5PSIzNSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlJFVFJPIEdBTUlORzwvdGV4dD48dGV4dCB4PSIyMDAiIHk9IjE4MCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNMQVNTSUMgR0FNSU5HPC90ZXh0Pjwvc3ZnPg==',
      'hardware': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJoYXJkd2FyZUdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRjU5RTBCIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRUY0NDQ0Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjaGFyZHdhcmVHcmFkaWVudCkiLz48cmVjdCB4PSI1MCIgeT0iNzAiIHdpZHRoPSIzMDAiIGhlaWdodD0iNjAiIGZpbGw9IiMyRDM3NDgiIHJ4PSI4Ii8+PHJlY3QgeD0iNzAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIxMDAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIxMzAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIxNjAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIxOTAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIyMjAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIyNTAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIyODAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIzMTAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48dGV4dCB4PSIyMDAiIHk9IjQ1IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SEFSRFNXQVJFPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMTYwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q09NUFVURVIgQ09NUE9ORU5UUzwvdGV4dD48L3N2Zz4=',
      'homebrew': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJob21lYnJld0dyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjOEI1Q0Y2Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQTc4QkZBIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjaG9tZWJyZXdHcmFkaWVudCkiLz48cmVjdCB4PSI2MCIgeT0iNDAiIHdpZHRoPSIyODAiIGhlaWdodD0iMTIwIiBmaWxsPSIjMUYyOTM3IiByeD0iOCIvPjxyZWN0IHg9IjgwIiB5PSI2MCIgd2lkdGg9IjI0MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzBGMTcyQSIgcng9IjQiLz48dGV4dCB4PSIxMDAiIHk9Ijg1IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjMDBGRjQxIj4mZ3Q7IGNhdCBoZWxsby5hc208L3RleHQ+PHRleHQgeD0iMTAwIiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiMwMEZGNDEiPm9yZyAzMGgKbGQgaGwsJGZmMDA8L3RleHQ+PHRleHQgeD0iMTAwIiB5PSIxMTUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiMwMEZGNDEiPmpwIGxvb3A8L3RleHQ+PHRleHQgeD0iMjAwIiB5PSIyNSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxOCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkhPTUVCUkVXPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMTgyIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RE9NIFBST0dSQU1NSU5HPC90ZXh0Pjwvc3ZnPg==',
      'emulation': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJlbXVsYXRpb25HcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzZCNzQ4MSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzM3NDE1MSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2VtdWxhdGlvbkdyYWRpZW50KSIvPjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMyRDM3NDgiIHJ4PSI4Ii8+PHJlY3QgeD0iNjAiIHk9IjYwIiB3aWR0aD0iODAiIGhlaWdodD0iNjAiIGZpbGw9IiMxQTIwMkMiIHJ4PSI0Ii8+PHJlY3QgeD0iMTAwIiB5PSIxMzAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAiIGZpbGw9IiM0Mzk5RkYiIHJ4PSI1Ii8+PHJlY3QgeD0iMTgwIiB5PSI1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMyRDM3NDgiIHJ4PSI4Ii8+PHJlY3QgeD0iMTkwIiB5PSI2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMUEyMDJDIiByeD0iNCIvPjxyZWN0IHg9IjMxMCIgeT0iNTAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM2Mzc1OEQiIHJ4PSI0Ii8+PHRleHQgeD0iMjAwIiB5PSIzMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxOCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVNVUxBVElPTjwvdGV4dD48dGV4dCB4PSIyMDAiIHk9IjE4MCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlZJUlRVQUwgU1lTVEVNUzwvdGV4dD48L3N2Zz4='
    };

    return defaultImages[category] || defaultImages['retro-gaming'];
  }

  /**
   * Extract image URL from HTML content
   */
  private extractImageUrl(content?: string): string | undefined {
    if (!content) return undefined;

    // Method 1: Look for img tags in content
    const imgRegex = /<img[^>]+src=["']([^"'>]+)["'][^>]*>/i;
    const imgMatch = content.match(imgRegex);

    if (imgMatch && imgMatch[1]) {
      const url = imgMatch[1];
      if (StringUtils.isValidUrl(url) && this.isValidImageUrl(url)) {
        return url;
      }
    }

    // Method 2: Look for media:thumbnail or media:content
    const mediaThumbnailRegex = /<media:thumbnail[^>]+url=["']([^"'>]+)["'][^>]*>/i;
    const mediaMatch = content.match(mediaThumbnailRegex);

    if (mediaMatch && mediaMatch[1]) {
      const url = mediaMatch[1];
      if (StringUtils.isValidUrl(url) && this.isValidImageUrl(url)) {
        return url;
      }
    }

    // Method 3: Look for enclosure with image type
    const enclosureRegex = /<enclosure[^>]+url=["']([^"'>]+)["'][^>]+type=["']image\/[^"'>]+["'][^>]*>/i;
    const enclosureMatch = content.match(enclosureRegex);

    if (enclosureMatch && enclosureMatch[1]) {
      const url = enclosureMatch[1];
      if (StringUtils.isValidUrl(url)) {
        return url;
      }
    }

    // Method 4: Look for WordPress featured image pattern
    const wpFeaturedRegex = /featured-image[^>]*src=["']([^"'>]+)["']/i;
    const wpMatch = content.match(wpFeaturedRegex);

    if (wpMatch && wpMatch[1]) {
      const url = wpMatch[1];
      if (StringUtils.isValidUrl(url) && this.isValidImageUrl(url)) {
        return url;
      }
    }

    // Method 5: Look for any reasonable sized image (avoid icons)
    const allImagesRegex = /<img[^>]+src=["']([^"'>]+)["'][^>]*>/gi;
    const allMatches = content.matchAll(allImagesRegex);

    for (const match of allMatches) {
      const url = match[1];
      if (StringUtils.isValidUrl(url) && this.isValidImageUrl(url)) {
        // Try to avoid small icons by checking URL patterns
        if (!this.isLikelyIcon(url)) {
          return url;
        }
      }
    }

    return undefined;
  }

  /**
   * Check if URL is a valid image
   */
  private isValidImageUrl(url: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
    const lowerUrl = url.toLowerCase();

    // Check file extension
    const hasImageExtension = imageExtensions.some(ext => lowerUrl.includes(ext));

    // Check URL patterns that typically contain images
    const hasImagePattern = /\/(images?|img|photos?|pics?|media|uploads|assets|content)\//i.test(url);

    // Check common image hosting domains
    const imageHosts = ['imgur.com', 'cloudinary.com', 'amazonaws.com', 'googleusercontent.com'];
    const hasImageHost = imageHosts.some(host => lowerUrl.includes(host));

    return hasImageExtension || hasImagePattern || hasImageHost;
  }

  /**
   * Check if URL is likely a small icon
   */
  private isLikelyIcon(url: string): boolean {
    const lowerUrl = url.toLowerCase();

    // Common icon patterns to avoid
    const iconPatterns = [
      'icon', 'favicon', 'logo', 'avatar', 'thumb_', 'thumbnail_',
      '_16x16', '_32x32', '_48x48', '_64x64', '_small', '_mini'
    ];

    return iconPatterns.some(pattern => lowerUrl.includes(pattern));
  }

  /**
   * Validate RSS feed URL
   */
  async validateFeedUrl(url: string): Promise<{ isValid: boolean; error?: string }> {
    try {
      const result = await this.parser.parseURL(url);

      if (!result.items || result.items.length === 0) {
        return {
          isValid: false,
          error: 'Feed contains no items',
        };
      }

      return { isValid: true };

    } catch (error) {
      return {
        isValid: false,
        error: error instanceof Error ? error.message : 'Invalid RSS feed',
      };
    }
  }
}