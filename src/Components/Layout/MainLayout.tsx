import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Button } from '@/Components/UI/Button';

/**
 * Main Layout props simplifié
 */
interface IMainLayoutProps {
  children: React.ReactNode;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  showSidebar?: boolean;
  sidebarProps?: React.ComponentProps<typeof Sidebar>;
  headerStats?: {
    totalArticles: number;
    articlesLast24h: number;
    activeFeeds: number;
  };
  className?: string;
}

/**
 * Main Layout component simplifié
 */
export const MainLayout: React.FC<IMainLayoutProps> = ({
  children,
  onRefresh,
  isRefreshing = false,
  showSidebar = true,
  sidebarProps,
  headerStats,
  className = '',
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header */}
      <Header
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
        stats={headerStats}
      />

      {/* Main Container */}
      <div className="flex">
        {/* Sidebar */}
        {showSidebar && (
          <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <Sidebar {...sidebarProps} className="h-[calc(100vh-4rem)]" />
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-50 flex">
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50" 
                  onClick={() => setSidebarOpen(false)}
                />
                
                {/* Sidebar */}
                <div className="relative flex flex-col w-80 bg-white">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Sources</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                  <Sidebar {...sidebarProps} className="flex-1 overflow-y-auto" />
                </div>
              </div>
            )}

            {/* Mobile Sidebar Toggle Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden fixed bottom-4 left-4 z-40 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="sr-only">Open sources</span>
            </Button>
          </>
        )}

        {/* Main Content */}
        <main className={`flex-1 min-w-0 ${showSidebar ? 'lg:ml-0' : ''}`}>
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};