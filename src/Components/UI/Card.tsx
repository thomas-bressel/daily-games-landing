import React from 'react';

/**
 * Card component props
 */
interface ICardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

/**
 * Reusable Card component for content containers
 */
export const Card: React.FC<ICardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  border = true,
  hover = false,
  onClick,
}) => {
  // Base classes
  const baseClasses = 'bg-white rounded-lg transition-all duration-200';

  // Padding classes
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  // Shadow classes
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  // Border classes
  const borderClasses = border ? 'border border-gray-200' : '';

  // Hover classes
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';

  // Cursor classes
  const cursorClasses = onClick ? 'cursor-pointer' : '';

  // Combine all classes
  const cardClasses = [
    baseClasses,
    paddingClasses[padding],
    shadowClasses[shadow],
    borderClasses,
    hoverClasses,
    cursorClasses,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

/**
 * Card Header component
 */
interface ICardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<ICardHeaderProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`border-b border-gray-200 pb-3 mb-3 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Card Body component
 */
interface ICardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<ICardBodyProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`flex-1 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Card Footer component
 */
interface ICardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<ICardFooterProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`border-t border-gray-200 pt-3 mt-3 ${className}`}>
      {children}
    </div>
  );
};