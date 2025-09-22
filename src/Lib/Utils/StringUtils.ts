/**
 * Utility functions for string manipulation and text processing
 */
export class StringUtils {
  /**
   * Clean and truncate description text from RSS
   */
  static cleanDescription(description?: string, maxLength: number = 200): string {
    if (!description) {
      return '';
    }

    // Remove HTML tags
    const cleanText = description.replace(/<[^>]*>/g, '');
    
    // Decode HTML entities
    const decodedText = StringUtils.decodeHtmlEntities(cleanText);
    
    // Normalize whitespace
    const normalizedText = decodedText.replace(/\s+/g, ' ').trim();

    // Truncate if too long
    if (normalizedText.length <= maxLength) {
      return normalizedText;
    }

    return normalizedText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
  }

  /**
   * Decode common HTML entities
   */
  static decodeHtmlEntities(text: string): string {
    const entities: { [key: string]: string } = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&apos;': "'",
      '&nbsp;': ' ',
    };

    return text.replace(/&[^;]+;/g, (entity) => entities[entity] || entity);
  }

  /**
   * Generate slug from title
   */
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  }

  /**
   * Extract tags from title and description
   */
  static extractTags(title: string, description: string): string[] {
    const commonRetroTerms = [
      'amstrad', 'cpc', 'homebrew', 'demo', 'game', 'review',
      'hardware', 'emulator', 'port', 'remake', 'remaster',
      'c64', 'spectrum', 'atari', 'nintendo', 'sega',
    ];

    const text = `${title} ${description}`.toLowerCase();
    const foundTags: string[] = [];

    commonRetroTerms.forEach(term => {
      if (text.includes(term)) {
        foundTags.push(term);
      }
    });

    return [...new Set(foundTags)]; // Remove duplicates
  }

  /**
   * Highlight search terms in text
   */
  static highlightSearchTerms(text: string, searchQuery: string): string {
    if (!searchQuery.trim()) {
      return text;
    }

    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  /**
   * Validate URL format
   */
  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Extract domain from URL
   */
  static extractDomain(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return 'Unknown source';
    }
  }

  /**
   * Sanitize text for safe display
   */
  static sanitizeText(text: string): string {
    return text
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}