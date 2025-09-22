import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

/**
 * Utility functions for date handling and formatting
 */
export class DateUtils {
  /**
   * Parse RSS date string to Date object
   * Handles various RSS date formats
   */
  static parseRSSDate(dateString?: string): Date {
    if (!dateString) {
      return new Date();
    }

    // Try parsing ISO date first
    const isoDate = parseISO(dateString);
    if (isValid(isoDate)) {
      return isoDate;
    }

    // Try parsing as standard Date
    const standardDate = new Date(dateString);
    if (isValid(standardDate)) {
      return standardDate;
    }

    // Fallback to current date
    console.warn(`Unable to parse date: ${dateString}`);
    return new Date();
  }

  /**
   * Format date for display (e.g., "2 hours ago")
   */
  static formatRelativeTime(date: Date): string {
    if (!isValid(date)) {
      return 'Unknown time';
    }

    return formatDistanceToNow(date, { addSuffix: true });
  }

  /**
   * Format date as readable string (e.g., "Jan 15, 2024")
   */
  static formatReadableDate(date: Date): string {
    if (!isValid(date)) {
      return 'Invalid date';
    }

    return format(date, 'MMM dd, yyyy');
  }

  /**
   * Format date for API/storage (ISO string)
   */
  static formatForStorage(date: Date): string {
    if (!isValid(date)) {
      return new Date().toISOString();
    }

    return date.toISOString();
  }

  /**
   * Check if date is within last N minutes
   */
  static isRecent(date: Date, minutes: number = 60): boolean {
    if (!isValid(date)) {
      return false;
    }

    const now = new Date();
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);
    return diffInMinutes <= minutes;
  }

  /**
   * Get start of day for date filtering
   */
  static getStartOfDay(date: Date): Date {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay;
  }

  /**
   * Get end of day for date filtering
   */
  static getEndOfDay(date: Date): Date {
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay;
  }
}