/**
 * Article interface representing a single RSS article/news item
 */
export interface IArticle {
  id: string;
  title: string;
  description: string;
  link: string;
  publishedAt: Date;
  source: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  author?: string;
}

/**
 * Raw article data from RSS parser before processing
 */
export interface IRawArticle {
  title?: string;
  description?: string;
  link?: string;
  pubDate?: string;
  content?: string;
  contentSnippet?: string;
  guid?: string;
  isoDate?: string;
  author?: string;
}

/**
 * Article display props for components
 */
export interface IArticleCardProps {
  article: IArticle;
  onClick?: (article: IArticle) => void;
  showDescription?: boolean;
  className?: string;
}



/**
 * Article Grid props simplifiés
 */
export interface IArticleGridProps {
  articles: IArticle[];
  isLoading?: boolean;
  loadingCount?: number;
  onArticleClick?: (article: IArticle) => void;
  emptyState?: React.ReactNode;
  className?: string;
}


/**
 * Article Card props
 */
export interface IArticleCardProps {
  article: IArticle;
  onClick?: (article: IArticle) => void;
  showImage?: boolean;
  showDescription?: boolean;
  showTags?: boolean;
  showSource?: boolean;
  compact?: boolean;
  className?: string;
}



/**
 * Article API response type simplifié
 */
export interface IArticleApiResponse {
  articles: Array<{
    id: string;
    title: string;
    description: string;
    link: string;
    publishedAt: string;
    source: string;
    category: string;
    tags: string[];
    imageUrl?: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  metadata: {
    sources: string[];
  };
}

/**
 * Filters ultra-simple - source uniquement
 */
export interface ISimpleFilters {
  source?: string;
}
