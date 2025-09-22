'use client';

// React imports
import React from 'react';

// Components imports
import { MainLayout } from '@/Components/Layout/MainLayout';
import { ArticleGrid } from '@/Components/Features/ArticleGrid';
import { LoadingSpinner } from '@/Components/UI/Loading';

// Hook imports
import { useArticles } from '@/Hooks/UseArticles';
import { useStats } from '@/Hooks/UseStats';


/**
 * Home Page components
 * @returns 
 */
export default function HomePage() {
  
  // Hooks
  const { articles, pagination, metadata, error, filters, fetchArticles, refreshArticles, applyFilters, isLoading, isError, isEmpty } = useArticles();
  const { totalArticles, activeFeeds, articlesLast24h } = useStats();



  /**
   * Handle source filter from sidebar
   * @param source 
   */
  const handleSourceFilter = (source: string | undefined) => {
    applyFilters({ source });
  };



  /**
   * Handle refresh button
   */
  const handleRefresh = async () => {
    await refreshArticles();
  };


  
  /**
   * Sidebar props
   */
  const sidebarProps = {
    sources: metadata?.sources.map(src => ({ source: src, count: 5 })) || [],
    selectedSource: filters.source,
    onSourceSelect: handleSourceFilter,
  };



  
  /**
   * Header stats
   */
  const headerStats = {
    totalArticles,
    articlesLast24h,
    activeFeeds,
  };


///////////////////////////////////////////////////
//////////////////   VIEWS    /////////////////////
///////////////////////////////////////////////////

  return (
    <MainLayout onRefresh={handleRefresh} isRefreshing={isLoading} sidebarProps={sidebarProps} headerStats={headerStats}>
      
      {/* Main Content */}
      <div className="space-y-6">
        
        {/* Simple info bar */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            
            {isLoading ? (
              <div className="flex items-center">
                <LoadingSpinner size="sm" className="mr-2" />Loading articles...</div>
            ) : (
              <span>{pagination.total.toLocaleString()} articles{filters.source && (
                  <span className="ml-1 text-gray-500">from {filters.source}</span>)}
              </span>
            )}
          </div>

          {/* Clear source filter if active */}
          {filters.source && (
            <button onClick={() => handleSourceFilter(undefined)} className="text-sm text-blue-600 hover:text-blue-700">Show all sources</button>
          )}
        </div>



        {/* Error State */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">Error loading articles</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
              <button onClick={() => fetchArticles()} className="ml-auto bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm">Retry</button>
            </div>
          </div>
        )}



        {/* Articles Grid */}
        <ArticleGrid articles={articles} isLoading={isLoading} loadingCount={12} emptyState={ filters.source ? (
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No articles from {filters.source}</h3>
                <p className="text-gray-500 mb-4">Try selecting a different source or view all articles.</p>
                <button onClick={() => handleSourceFilter(undefined)} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Show all sources
                </button>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No articles available</h3>
                <p className="text-gray-500 mb-4">Refresh the feeds to load new articles.</p>
                <button onClick={handleRefresh} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Refresh Feeds
                </button>
              </div>
            )
          }
        />



        {/* Simple Pagination */}
        {!isLoading && !isEmpty && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button onClick={() => fetchArticles(pagination.page - 1)} disabled={pagination.page <= 1} 
            className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Previous
            </button>
            
            <span className="px-3 py-2 text-sm text-gray-700">Page {pagination.page} of {pagination.totalPages}</span>
            
            <button
              onClick={() => fetchArticles(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Next
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}