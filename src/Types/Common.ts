/**
 * Common API response structure
 */
export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Pagination interface
 */
export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Filter options simplifiés - source uniquement
 */
export interface IArticleFilters {
  source?: string;
}

/**
 * Loading states
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Category constants
 */
export const CATEGORIES = {
  AMSTRAD_CPC: 'amstrad-cpc',
  ATARI_ST: 'atari-st',
  RETRO_GAMING: 'retro-gaming',
  HOMEBREW: 'homebrew',
  HARDWARE: 'hardware',
  NEXTGEN: 'next-gen',
  EMULATION: 'emulation',
} as const;

export type CategoryType = typeof CATEGORIES[keyof typeof CATEGORIES];