import { useState, useEffect, useCallback } from 'react';
import { LoadingState } from '@/Types/Common';

/**
 * Stats API response type simplifié
 */
interface IStatsApiResponse {
  overview: {
    totalArticles: number;
    activeFeeds: number;
    articlesLast24h: number;
  };
}

/**
 * Hook for managing application statistics - version simplifiée
 */
export function useStats() {
  const [stats, setStats] = useState<IStatsApiResponse | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch statistics from API
   */
  const fetchStats = useCallback(async () => {
    setLoadingState('loading');
    setError(null);

    try {
      const response = await fetch('/api/stats');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch statistics');
      }

      setStats(data.data);
      setLoadingState('success');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      setLoadingState('error');
      console.error('Error fetching stats:', err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Auto-refresh stats every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStats();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [fetchStats]);

  return {
    // State
    stats,
    loadingState,
    error,

    // Actions
    fetchStats,
    refresh: fetchStats,

    // Status checks
    isLoading: loadingState === 'loading',
    isError: loadingState === 'error',
    isSuccess: loadingState === 'success',

    // Quick access to key metrics
    totalArticles: stats?.overview.totalArticles || 0,
    activeFeeds: stats?.overview.activeFeeds || 0,
    articlesLast24h: stats?.overview.articlesLast24h || 0,
  };
}