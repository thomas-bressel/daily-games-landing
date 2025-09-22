import React from 'react';

/**
 * Loading spinner props
 */
interface ILoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

/**
 * Loading Spinner component
 */
export const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  // Color classes
  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white',
  };

  return (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

/**
 * Loading skeleton props
 */
interface ILoadingSkeletonProps {
  lines?: number;
  className?: string;
  height?: string;
}

/**
 * Loading Skeleton component for content placeholders
 */
export const LoadingSkeleton: React.FC<ILoadingSkeletonProps> = ({
  lines = 3,
  className = '',
  height = 'h-4',
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-300 rounded ${height} ${
            index < lines - 1 ? 'mb-2' : ''
          } ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

/**
 * Loading card props
 */
interface ILoadingCardProps {
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  showMeta?: boolean;
  className?: string;
}

/**
 * Loading Card component - skeleton for article cards
 */
export const LoadingCard: React.FC<ILoadingCardProps> = ({
  showImage = true,
  showTitle = true,
  showDescription = true,
  showMeta = true,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 animate-pulse ${className}`}>
      {showImage && (
        <div className="w-full h-48 bg-gray-300 rounded-lg mb-4" />
      )}
      
      {showTitle && (
        <div className="mb-3">
          <div className="h-6 bg-gray-300 rounded w-full mb-2" />
          <div className="h-6 bg-gray-300 rounded w-3/4" />
        </div>
      )}

      {showDescription && (
        <div className="mb-4">
          <div className="h-4 bg-gray-300 rounded w-full mb-2" />
          <div className="h-4 bg-gray-300 rounded w-full mb-2" />
          <div className="h-4 bg-gray-300 rounded w-2/3" />
        </div>
      )}

      {showMeta && (
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-300 rounded w-24" />
          <div className="h-4 bg-gray-300 rounded w-16" />
        </div>
      )}
    </div>
  );
};

/**
 * Full page loading props
 */
interface IFullPageLoadingProps {
  message?: string;
  showSpinner?: boolean;
}

/**
 * Full Page Loading component
 */
export const FullPageLoading: React.FC<IFullPageLoadingProps> = ({
  message = 'Loading...',
  showSpinner = true,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {showSpinner && (
          <LoadingSpinner size="xl" className="mx-auto mb-4" />
        )}
        <p className="text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );
};

/**
 * Loading overlay props
 */
interface ILoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  backdrop?: boolean;
}

/**
 * Loading Overlay component
 */
export const LoadingOverlay: React.FC<ILoadingOverlayProps> = ({
  isVisible,
  message = 'Loading...',
  backdrop = true,
}) => {
  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${
      backdrop ? 'bg-black bg-opacity-50' : ''
    }`}>
      <div className="bg-white rounded-lg p-6 shadow-xl">
        <div className="flex items-center space-x-3">
          <LoadingSpinner size="lg" />
          <span className="text-gray-700 text-lg">{message}</span>
        </div>
      </div>
    </div>
  );
};