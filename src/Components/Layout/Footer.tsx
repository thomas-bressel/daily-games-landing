import React from 'react';
import { Badge } from '@/Components/UI/Badge';

/**
 * Footer props
 */
interface IFooterProps {
  stats?: {
    totalArticles: number;
    totalFeeds: number;
    lastUpdate?: Date;
  };
  className?: string;
}

/**
 * Footer component simplifié
 */
export const Footer: React.FC<IFooterProps> = ({
  stats,
  className = '',
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-white border-t border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* App Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Daily Games</h3>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">
              Your ultimate hub for retro gaming news, focusing on Amstrad CPC and vintage computing.
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="primary" size="sm">Open Source</Badge>
              <Badge variant="success" size="sm">RSS Aggregator</Badge>
              <Badge variant="info" size="sm">Retro Gaming</Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-600">
                  Daily Games aggregates the latest news from your favorite retro gaming sources.
                </span>
              </li>
              <li>
                <span className="text-gray-600">
                  Browse articles by source and stay updated with the retro gaming community.
                </span>
              </li>
              <li>
                <span className="text-gray-600">
                  All articles are automatically fetched and sorted by publication date.
                </span>
              </li>
            </ul>
          </div>

          {/* Stats & Status */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Current Stats</h4>
            
            {stats ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Articles:</span>
                  <span className="font-medium text-gray-900">{stats.totalArticles.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Feeds:</span>
                  <span className="font-medium text-gray-900">{stats.totalFeeds}</span>
                </div>
                
                {stats.lastUpdate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Update:</span>
                    <span className="font-medium text-gray-900">
                      {stats.lastUpdate.toLocaleTimeString()}
                    </span>
                  </div>
                )}
                
                <div className="pt-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600">All systems operational</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                Loading stats...
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Copyright */}
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © {currentYear} Daily Games. Built with Next.js, React, and TypeScript.
            </div>

            {/* Tech Stack */}
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
                </svg>
                RSS
              </span>
              
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0z"/>
                </svg>
                Next.js
              </span>
              
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                TypeScript
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};