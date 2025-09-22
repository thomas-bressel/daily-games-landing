import React from 'react';
import { Button } from '@/Components/UI/Button';
import { Badge } from '@/Components/UI/Badge';

/**
 * Header props simplifié
 */
interface IHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
  stats?: {
    totalArticles: number;
    articlesLast24h: number;
    activeFeeds: number;
  };
  className?: string;
}

/**
 * Header component simplifié avec branding, stats et refresh
 */
export const Header: React.FC<IHeaderProps> = ({
  onRefresh,
  isRefreshing = false,
  stats,
  className = '',
}) => {
  return (
    <header className={`bg-white border-b border-gray-200 sticky top-0 z-40 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Branding */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo Icon */}
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              {/* App Name */}
              <div>
                <h1 className="text-xl font-bold text-gray-900">Daily Games</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Your retro gaming news hub</p>
              </div>
            </div>
          </div>

          {/* Stats Badges */}
          {stats && (
            <div className="flex items-center space-x-3">
              <Badge variant="primary" size="sm">
                {stats.totalArticles.toLocaleString()} articles
              </Badge>
              <Badge variant="success" size="sm">
                {stats.articlesLast24h} today
              </Badge>
              <Badge variant="info" size="sm">
                {stats.activeFeeds} feeds
              </Badge>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Refresh Button */}
            {onRefresh && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRefresh}
                isLoading={isRefreshing}
                title="Refresh feeds"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="ml-1 hidden lg:inline">Refresh</span>
              </Button>
            )}

            {/* Settings Button */}
            <Button
              variant="ghost"
              size="sm"
              title="Settings"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};