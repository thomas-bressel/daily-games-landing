import React, { useState } from 'react';
import { IArticleCardProps } from '@/Types/Article';
import { Badge } from '@/Components/UI/Badge';
import { ArticleModel } from '@/Models/ArticleModel';

// Category Badge component local to this file since it's not exported from UI/Badge
const CategoryBadge: React.FC<{ category: string; className?: string; onClick?: () => void }> = ({ category, className = '', onClick,
}) => {
  const categoryColors: { [key: string]: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' } = {
    'amstrad-cpc': 'primary',
    'retro-gaming': 'success',
    'homebrew': 'info',
    'hardware': 'warning',
    'emulation': 'secondary',
  };

  const variant = categoryColors[category] || 'secondary';

  return (
    <Badge variant={variant} size="sm" className={className} onClick={onClick}>
      {category.replace('-', ' ').toUpperCase()}
    </Badge>
  );
};




/**
 * Get fallback image for category
 */
const getFallbackImage = (category: string): string => {
  const fallbackImages: Record<string, string> = {
    'amstrad-cpc': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhbXN0cmFkR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMzQjgyRjYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM2MzY2RjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNhbXN0cmFkR3JhZGllbnQpIi8+PHJlY3QgeD0iNTAiIHk9IjUwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzJEMzc0OCIgcng9IjgiLz48cmVjdCB4PSI2MCIgeT0iNjAiIHdpZHRoPSIyODAiIGhlaWdodD0iNDAiIGZpbGw9IiMxQTIwMkMiIHJ4PSI0Ii8+PHRleHQgeD0iMjAwIiB5PSI4NSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzAwRkY0MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFNU1RSQUQgQ1BDPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMTMwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UkVUUk8gQ09NUFVUSU5HPC90ZXh0PjxyZWN0IHg9IjMwMCIgeT0iMTIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNGRjAwMDAiIHJ4PSIyIi8+PHJlY3QgeD0iMzMwIiB5PSIxMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwRkY0MSIgcng9IjIiLz48L3N2Zz4=',
    'retro-gaming': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJyZXRyb0dyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMTBCOTgxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDZCNkQ0Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjcmV0cm9HcmFkaWVudCkiLz48cGF0aCBkPSJNMTUwIDUwSDI1MEMyNzAuOTg3IDUwIDI5MCA2Ni4zNzEgMjkwIDg1VjExNUMyOTAgMTMzLjYyOSAyNzAuOTg3IDE1MCAyNTAgMTUwSDE1MEMxMjkuMDEzIDE1MCAxMTAgMTMzLjYyOSAxMTAgMTE1Vjg1QzExMCA2Ni4zNzEgMTI5LjAxMyA1MCAxNTAgNTBaIiBmaWxsPSIjMUYyOTM3Ii8+PGNpcmNsZSBjeD0iMTYwIiBjeT0iODAiIHI9IjgiIGZpbGw9IiNGRjAwNDAiLz48Y2lyY2xlIGN4PSIxNjAiIGN5PSIxMjAiIHI9IjgiIGZpbGw9IiNGRjAwNDAiLz48Y2lyY2xlIGN4PSIxNDAiIGN5PSIxMDAiIHI9IjgiIGZpbGw9IiNGRjAwNDAiLz48Y2lyY2xlIGN4PSIxODAiIGN5PSIxMDAiIHI9IjgiIGZpbGw9IiNGRjAwNDAiLz48Y2lyY2xlIGN4PSIyNDAiIGN5PSI4NSIgcj0iMTIiIGZpbGw9IiMwMEZGNDEiLz48Y2lyY2xlIGN4PSIyNDAiIGN5PSIxMTUiIHI9IjEyIiBmaWxsPSIjMDBBNkZCIi8+PHRleHQgeD0iMjAwIiB5PSIzNSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlJFVFJPIEdBTUlORzwvdGV4dD48dGV4dCB4PSIyMDAiIHk9IjE4MCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNMQVNTSUMgR0FNSU5HPC90ZXh0Pjwvc3ZnPg==',
    'hardware': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJoYXJkd2FyZUdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRjU5RTBCIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRUY0NDQ0Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjaGFyZHdhcmVHcmFkaWVudCkiLz48cmVjdCB4PSI1MCIgeT0iNzAiIHdpZHRoPSIzMDAiIGhlaWdodD0iNjAiIGZpbGw9IiMyRDM3NDgiIHJ4PSI4Ii8+PHJlY3QgeD0iNzAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIxMDAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIxMzAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIxNjAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIxOTAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIyMjAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIyNTAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIyODAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48cmVjdCB4PSIzMTAiIHk9Ijg1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mzk5RkYiLz48dGV4dCB4PSIyMDAiIHk9IjQ1IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SEFSRFNXQVJFPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMTYwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q09NUFVURVIgQ09NUE9ORU5UUzwvdGV4dD48L3N2Zz4=',
    'homebrew': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJob21lYnJld0dyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjOEI1Q0Y2Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQTc4QkZBIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjaG9tZWJyZXdHcmFkaWVudCkiLz48cmVjdCB4PSI2MCIgeT0iNDAiIHdpZHRoPSIyODAiIGhlaWdodD0iMTIwIiBmaWxsPSIjMUYyOTM3IiByeD0iOCIvPjxyZWN0IHg9IjgwIiB5PSI2MCIgd2lkdGg9IjI0MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzBGMTcyQSIgcng9IjQiLz48dGV4dCB4PSIxMDAiIHk9Ijg1IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjMDBGRjQxIj4mZ3Q7IGNhdCBoZWxsby5hc208L3RleHQ+PHRleHQgeD0iMTAwIiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiMwMEZGNDEiPm9yZyAzMGgKbGQgaGwsJGZmMDA8L3RleHQ+PHRleHQgeD0iMTAwIiB5PSIxMTUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiMwMEZGNDEiPmpwIGxvb3A8L3RleHQ+PHRleHQgeD0iMjAwIiB5PSIyNSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxOCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkhPTUVCUkVXPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMTgyIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RE9NIFBST0dSQU1NSU5HPC90ZXh0Pjwvc3ZnPg==',
    'emulation': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJlbXVsYXRpb25HcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzZCNzQ4MSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzM3NDE1MSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2VtdWxhdGlvbkdyYWRpZW50KSIvPjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMyRDM3NDgiIHJ4PSI4Ii8+PHJlY3QgeD0iNjAiIHk9IjYwIiB3aWR0aD0iODAiIGhlaWdodD0iNjAiIGZpbGw9IiMxQTIwMkMiIHJ4PSI0Ii8+PHJlY3QgeD0iMTAwIiB5PSIxMzAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAiIGZpbGw9IiM0Mzk5RkYiIHJ4PSI1Ii8+PHJlY3QgeD0iMTgwIiB5PSI1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMyRDM3NDgiIHJ4PSI4Ii8+PHJlY3QgeD0iMTkwIiB5PSI2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMUEyMDJDIiByeD0iNCIvPjxyZWN0IHg9IjMxMCIgeT0iNTAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM2Mzc1OEQiIHJ4PSI0Ii8+PHRleHQgeD0iMjAwIiB5PSIzMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxOCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVNVUxBVElPTjwvdGV4dD48dGV4dCB4PSIyMDAiIHk9IjE4MCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlZJUlRVQUwgU1lTVEVNUzwvdGV4dD48L3N2Zz4='
  };
  
  return fallbackImages[category] || fallbackImages['retro-gaming'];
};

/**
 * Modern Article Card component - daily.dev inspired design
 */
export const ArticleCard: React.FC<IArticleCardProps> = ({ article, onClick, showImage = true, showDescription = true, showTags = true, showSource = true, compact = false, className = ''}) => {
  const displayArticle = ArticleModel.toDisplayFormat(article);
  const readingTime = ArticleModel.getReadingTime(article);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!imageError) {
      // Première tentative d'erreur, essayez l'image de fallback
      setImageError(true);
      img.src = getFallbackImage(displayArticle.category);
    } else {
      // Si même l'image de fallback échoue, masquez le conteneur d'image
      const container = img.parentElement;
      if (container) {
        container.style.display = 'none';
      }
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(article);
    } else {
      // Open article in new tab by default
      window.open(article.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`group bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer 
        transition-all duration-300 ease-out hover:shadow-xl hover:shadow-gray-100/50 
        hover:-translate-y-1 hover:border-gray-300 ${className}`}
      onClick={handleCardClick}
    >
      {/* Image Section */}
      {showImage && (
        <div className="relative overflow-hidden">
          {!imageLoaded && (
            <div className="w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          <img
            src={displayArticle.imageUrl || getFallbackImage(displayArticle.category)}
            alt={displayArticle.title}
            className={`w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
            }`}
            loading="lazy"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Category badge overlay */}
          <div className="absolute top-3 left-3">
            <CategoryBadge 
              category={displayArticle.category} 
              className="bg-white/90 backdrop-blur-sm text-gray-800 font-medium shadow-sm"
            />
          </div>

          {/* Reading time badge */}
          <div className="absolute top-3 right-3">
            <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium">
              {readingTime}
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className={`p-4 ${compact ? 'p-3' : 'p-5'}`}>
        {/* Source and Time */}
        {showSource && (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-sm">
              {/* Source favicon placeholder */}
              <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-sm flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span className="font-medium text-gray-700 truncate">{displayArticle.source}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{displayArticle.domain}</span>
            </div>
            <time
              dateTime={displayArticle.publishedAt.toISOString()}
              title={displayArticle.readableDate}
              className="text-sm text-gray-500 flex-shrink-0"
            >
              {displayArticle.relativeTime}
            </time>
          </div>
        )}

        {/* Title */}
        <h3 className={`font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 
          transition-colors duration-200 leading-tight ${
          compact ? 'text-base' : 'text-lg'
        }`}>
          {displayArticle.title}
        </h3>

        {/* Description */}
        {showDescription && displayArticle.description && (
          <p className={`text-gray-600 mb-4 line-clamp-3 leading-relaxed ${
            compact ? 'text-sm' : 'text-base'
          }`}>
            {displayArticle.description}
          </p>
        )}

        {/* Tags */}
        {showTags && displayArticle.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {displayArticle.tags.slice(0, compact ? 2 : 4).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium 
                  bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-150"
                onClick={(e) => {
                  e?.stopPropagation();
                  // Handle tag click if needed
                }}
              >
                #{tag}
              </span>
            ))}
            {displayArticle.tags.length > (compact ? 2 : 4) && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium 
                bg-gray-100 text-gray-500">
                +{displayArticle.tags.length - (compact ? 2 : 4)}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {/* Category (if no image to show it as overlay) */}
          {(!showImage || !displayArticle.imageUrl) && (
            <CategoryBadge category={displayArticle.category} />
          )}
          
          {/* Engagement Section */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {/* Views placeholder */}
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{Math.floor(Math.random() * 100) + 10}</span>
            </div>

            {/* Bookmarks */}
            <button 
              className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-150"
              onClick={(e) => {
                e.stopPropagation();
                // Handle bookmark action
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>

            {/* Share */}
            <button 
              className="flex items-center space-x-1 hover:text-green-600 transition-colors duration-150"
              onClick={(e) => {
                e.stopPropagation();
                // Handle share action
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>

            {/* Reading time (if no image) */}
            {(!showImage || !displayArticle.imageUrl) && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-md font-medium">
                {readingTime}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Compact Article Card for list views
 */
export const CompactArticleCard: React.FC<IArticleCardProps> = (props) => {
  return (
    <ArticleCard
      {...props}
      compact={true}
      showImage={false}
      showDescription={false}
      className={`border-l-4 border-blue-500 ${props.className || ''}`}
    />
  );
};

/**
 * Featured Article Card with larger layout
 */
export const FeaturedArticleCard: React.FC<IArticleCardProps> = (props) => {
  return (
    <div className="md:col-span-2">
      <ArticleCard
        {...props}
        className={`bg-gradient-to-br from-white to-gray-50/30 ring-1 ring-blue-500/10 ${props.className || ''}`}
        showImage={true}
        showDescription={true}
        showTags={true}
      />
    </div>
  );
};

/**
 * Horizontal Article Card for mobile/list view
 */
interface IHorizontalArticleCardProps extends IArticleCardProps {
  imageSize?: 'sm' | 'md' | 'lg';
}

export const HorizontalArticleCard: React.FC<IHorizontalArticleCardProps> = ({
  article,
  onClick,
  imageSize = 'md',
  className = '',
  ...props
}) => {
  const displayArticle = ArticleModel.toDisplayFormat(article);
  const readingTime = ArticleModel.getReadingTime(article);
  const [imageError, setImageError] = useState(false);

  const imageSizes = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!imageError) {
      setImageError(true);
      img.src = getFallbackImage(displayArticle.category);
    } else {
      const container = img.parentElement;
      if (container) {
        container.style.display = 'none';
      }
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(article);
    } else {
      window.open(article.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`group bg-white border border-gray-200 rounded-lg p-4 cursor-pointer 
        hover:shadow-md hover:border-gray-300 transition-all duration-200 ${className}`}
      onClick={handleCardClick}
    >
      <div className="flex space-x-4">
        {/* Image */}
        <div className={`flex-shrink-0 ${imageSizes[imageSize]} rounded-lg overflow-hidden`}>
          <img
            src={displayArticle.imageUrl || getFallbackImage(displayArticle.category)}
            alt={displayArticle.title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
            onError={handleImageError}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Source and Time */}
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <span className="font-medium text-gray-700">{displayArticle.source}</span>
            <span className="mx-2">•</span>
            <time dateTime={displayArticle.publishedAt.toISOString()}>
              {displayArticle.relativeTime}
            </time>
          </div>

          {/* Title */}
          <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
            {displayArticle.title}
          </h4>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <CategoryBadge category={displayArticle.category} />
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              {readingTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};