// React imports
import React from 'react';

// Type and interface imports
import { IArticleGridProps } from '@/Types/Article';

// Component imports
import { ArticleCard } from './ArticleCard';
import { LoadingCard } from '@/Components/UI/Loading';


/**
 * Article Grid component
 * @param param0 
 * @returns 
 */
export const ArticleGrid: React.FC<IArticleGridProps> = ({ articles, isLoading = false, loadingCount = 12, onArticleClick, emptyState, className = '' }) => {


  // Loading state
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {Array.from({ length: loadingCount }).map((_, index) => (
          <LoadingCard key={index} showImage={true}/>
        ))}
      </div>
    );
  }



  // Empty state
  if (articles.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        {emptyState || (
          <>
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500 text-center max-w-md">
              Try refreshing the feeds or selecting a different source to see new articles.
            </p>
          </>
        )}
      </div>
    );
  }



  // Articles Grid
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} onClick={onArticleClick} showImage={true} showDescription={true} showTags={true}/>
      ))}
    </div>
  );
};