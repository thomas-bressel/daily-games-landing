import { IArticle } from '@/Types/Article';
import { DateUtils } from '@/Lib/Utils/DateUtils';
import { StringUtils } from '@/Lib/Utils/StringUtils';

/**
 * Article Model for data validation and transformation
 */
export class ArticleModel {
  /**
   * Validate article data structure
   */
  static validate(articleData: Partial<IArticle>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Required fields validation
    if (!articleData.title || articleData.title.trim().length === 0) {
      errors.push('Title is required');
    }

    if (!articleData.link || !StringUtils.isValidUrl(articleData.link)) {
      errors.push('Valid link URL is required');
    }

    if (!articleData.source || articleData.source.trim().length === 0) {
      errors.push('Source is required');
    }

    if (!articleData.category || articleData.category.trim().length === 0) {
      errors.push('Category is required');
    }

    if (!articleData.publishedAt || !DateUtils.parseRSSDate(articleData.publishedAt.toString())) {
      errors.push('Valid publication date is required');
    }

    // Optional fields validation
    if (articleData.description && articleData.description.length > 1000) {
      errors.push('Description must be less than 1000 characters');
    }

    if (articleData.title && articleData.title.length > 200) {
      errors.push('Title must be less than 200 characters');
    }

    if (articleData.imageUrl && !StringUtils.isValidUrl(articleData.imageUrl)) {
      errors.push('Image URL must be a valid URL');
    }

    if (articleData.tags && !Array.isArray(articleData.tags)) {
      errors.push('Tags must be an array');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Create a clean article object with validated data
   */
  static create(articleData: Partial<IArticle>): IArticle | null {
    const validation = this.validate(articleData);

    if (!validation.isValid) {
      console.error('Article validation failed:', validation.errors);
      return null;
    }

    return {
      id: articleData.id || '',
      title: StringUtils.sanitizeText(articleData.title || ''),
      description: StringUtils.cleanDescription(articleData.description || ''),
      link: articleData.link || '',
      publishedAt: articleData.publishedAt || new Date(),
      source: articleData.source || '',
      category: articleData.category || '',
      tags: articleData.tags || [],
      author: articleData.author,
      imageUrl: articleData.imageUrl,
    };
  }

  /**
   * Transform article for API response
   */
  static toApiFormat(article: IArticle): {
    id: string;
    title: string;
    description: string;
    link: string;
    publishedAt: string;
    source: string;
    category: string;
    tags: string[];
    author?: string;
    imageUrl?: string;
    relativeTime: string;
    domain: string;
  } {
    return {
      id: article.id,
      title: article.title,
      description: article.description,
      link: article.link,
      publishedAt: DateUtils.formatForStorage(article.publishedAt),
      source: article.source,
      category: article.category,
      tags: article.tags,
      author: article.author,
      imageUrl: article.imageUrl,
      relativeTime: DateUtils.formatRelativeTime(article.publishedAt),
      domain: StringUtils.extractDomain(article.link),
    };
  }

  /**
   * Transform article for display in components
   */
  static toDisplayFormat(article: IArticle): {
    id: string;
    title: string;
    description: string;
    link: string;
    publishedAt: Date;
    source: string;
    category: string;
    tags: string[];
    author?: string;
    imageUrl?: string;
    relativeTime: string;
    readableDate: string;
    domain: string;
    slug: string;
  } {
    return {
      ...article,
      relativeTime: DateUtils.formatRelativeTime(article.publishedAt),
      readableDate: DateUtils.formatReadableDate(article.publishedAt),
      domain: StringUtils.extractDomain(article.link),
      slug: StringUtils.generateSlug(article.title),
    };
  }

  /**
   * Compare two articles for equality
   */
  static isEqual(article1: IArticle, article2: IArticle): boolean {
    return (
      article1.id === article2.id ||
      (article1.link === article2.link && article1.title === article2.title)
    );
  }

  /**
   * Check if article is recent (within last 24 hours)
   */
  static isRecent(article: IArticle): boolean {
    return DateUtils.isRecent(article.publishedAt, 24 * 60); // 24 hours in minutes
  }

  /**
   * Get article excerpt with specified length
   */
  static getExcerpt(article: IArticle, length: number = 150): string {
    return StringUtils.cleanDescription(article.description, length);
  }

  /**
   * Check if article matches search query
   */
  static matchesSearch(article: IArticle, query: string): boolean {
    if (!query.trim()) return true;

    const searchText = `${article.title} ${article.description} ${article.tags.join(' ')} ${article.source}`.toLowerCase();
    return searchText.includes(query.toLowerCase());
  }

  /**
   * Get article reading time estimation (based on description length)
   */
  static getReadingTime(article: IArticle): string {
    const wordsPerMinute = 200;
    const wordCount = article.description.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    
    if (minutes === 1) return '1 min read';
    return `${minutes} min read`;
  }

  /**
   * Serialize article for storage/caching
   */
  static serialize(article: IArticle): string {
    try {
      return JSON.stringify({
        ...article,
        publishedAt: DateUtils.formatForStorage(article.publishedAt),
      });
    } catch (error) {
      console.error('Error serializing article:', error);
      return '';
    }
  }

  /**
   * Deserialize article from storage/cache
   */
  static deserialize(serializedArticle: string): IArticle | null {
    try {
      const data = JSON.parse(serializedArticle);
      return {
        ...data,
        publishedAt: new Date(data.publishedAt),
      };
    } catch (error) {
      console.error('Error deserializing article:', error);
      return null;
    }
  }

  /**
   * Batch process articles (validate, clean, deduplicate)
   */
  static batchProcess(articles: Partial<IArticle>[]): {
    validArticles: IArticle[];
    invalidCount: number;
    duplicatesRemoved: number;
  } {
    const validArticles: IArticle[] = [];
    const seenIds = new Set<string>();
    const seenLinks = new Set<string>();
    let invalidCount = 0;
    let duplicatesRemoved = 0;

    for (const articleData of articles) {
      const article = this.create(articleData);

      if (!article) {
        invalidCount++;
        continue;
      }

      // Check for duplicates by ID or link
      if (seenIds.has(article.id) || seenLinks.has(article.link)) {
        duplicatesRemoved++;
        continue;
      }

      seenIds.add(article.id);
      seenLinks.add(article.link);
      validArticles.push(article);
    }

    return {
      validArticles,
      invalidCount,
      duplicatesRemoved,
    };
  }
}