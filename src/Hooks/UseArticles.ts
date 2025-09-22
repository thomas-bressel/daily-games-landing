import { useState, useEffect, useCallback } from 'react';
import { IArticle, ISimpleFilters } from '@/Types/Article';
import { LoadingState } from '@/Types/Common';

interface IApiArticle {
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
}

/**
 * Hook for managing articles - version ultra-simplifiée
 */
export function useArticles() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });
  const [metadata, setMetadata] = useState<{ sources: string[] }>({ sources: [] });
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ISimpleFilters>({});

  /**
   * Fetch articles from API
   */
  const fetchArticles = useCallback(async (
    page: number = 1,
    customFilters?: ISimpleFilters,
    forceRefresh: boolean = false
  ) => {
    setLoadingState('loading');
    setError(null);

    try {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
      });

      // Add source filter if present
      const activeFilters = customFilters || filters;
      if (activeFilters.source) {
        searchParams.set('source', activeFilters.source);
      }

      // Add refresh flag
      if (forceRefresh) {
        searchParams.set('refresh', 'true');
      }

      const response = await fetch(`/api/articles?${searchParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch articles');
      }

      // Transform API articles back to IArticle format
      const transformedArticles: IArticle[] = data.data.articles.map((article: IApiArticle) => ({
        ...article,
        publishedAt: new Date(article.publishedAt),
      }));

      setArticles(transformedArticles);
      setPagination(data.data.pagination);
      setMetadata(data.data.metadata);
      setLoadingState('success');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      setLoadingState('error');
      console.error('Error fetching articles:', err);
    }
  }, [filters, pagination.limit]);

  /**
   * Refresh articles (force fetch from RSS)
   */
  const refreshArticles = useCallback(async () => {
    setLoadingState('loading');
    setError(null);

    try {
      const response = await fetch('/api/articles/refresh', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to refresh articles');
      }

      // Fetch fresh articles after refresh
      await fetchArticles(1, filters, false);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      setLoadingState('error');
      console.error('Error refreshing articles:', err);
    }
  }, [fetchArticles, filters]);

  /**
   * Apply source filter
   */
  const applyFilters = useCallback((newFilters: ISimpleFilters) => {
    setFilters(newFilters);
    // Reset to first page when filters change
    fetchArticles(1, newFilters);
  }, [fetchArticles]);

  // Initial load
  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array for initial load only

  return {
    // State
    articles,
    pagination,
    metadata,
    loadingState,
    error,
    filters,

    // Actions
    fetchArticles,
    refreshArticles,
    applyFilters,

    // Computed properties
    isLoading: loadingState === 'loading',
    isError: loadingState === 'error',
    isSuccess: loadingState === 'success',
    isEmpty: articles.length === 0 && loadingState === 'success',
  };
}