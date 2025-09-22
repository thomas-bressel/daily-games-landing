import React from 'react';
import { Badge } from '@/Components/UI/Badge';

/**
 * Sidebar props simplifiée
 */
interface ISidebarProps {
  sources?: Array<{ source: string; count: number }>;
  selectedSource?: string;
  onSourceSelect?: (source: string | undefined) => void;
  className?: string;
}

/**
 * Sidebar component simplifiée - Sources uniquement
 */
export const Sidebar: React.FC<ISidebarProps> = ({
  sources = [],
  selectedSource,
  onSourceSelect,
  className = '',
}) => {
  return (
    <aside className={`w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto ${className}`}>
      <div className="p-4 space-y-6">
        {/* Sources Filter */}
        {sources.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Sources</h3>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              <button
                onClick={() => onSourceSelect?.(undefined)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  !selectedSource 
                    ? 'bg-blue-100 text-blue-800 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>All Sources</span>
                  <Badge variant="secondary" size="sm">
                    {sources.reduce((sum, src) => sum + src.count, 0)}
                  </Badge>
                </div>
              </button>

              {sources.map(({ source, count }) => (
                <button
                  key={source}
                  onClick={() => onSourceSelect?.(source)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedSource === source 
                      ? 'bg-blue-100 text-blue-800 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{source}</span>
                    <Badge variant="secondary" size="sm">
                      {count}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};