import React from 'react';

/**
 * Badge component props
 */
interface IBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
}

/**
 * Badge component for tags, categories, and status indicators
 */
export const Badge: React.FC<IBadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = true,
  removable = false,
  onRemove,
  className = '',
  onClick,
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center font-medium transition-colors';

  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    success: 'bg-green-100 text-green-800 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    error: 'bg-red-100 text-red-800 hover:bg-red-200',
    info: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200',
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-base',
  };

  // Rounded classes
  const roundedClasses = rounded ? 'rounded-full' : 'rounded';

  // Cursor classes
  const cursorClasses = onClick ? 'cursor-pointer' : '';

  // Combine all classes
  const badgeClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    roundedClasses,
    cursorClasses,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses} onClick={(e) => onClick?.(e)}>
      {children}
      {removable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-black hover:bg-opacity-10 focus:outline-none focus:bg-black focus:bg-opacity-10"
          aria-label="Remove"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

/**
 * Category Badge with predefined colors
 */
interface ICategoryBadgeProps {
  category: string;
  className?: string;
  onClick?: () => void;
}

export const CategoryBadge: React.FC<ICategoryBadgeProps> = ({
  category,
  className = '',
  onClick,
}) => {
  // Category color mapping
  const categoryColors: { [key: string]: IBadgeProps['variant'] } = {
    'amstrad-cpc': 'primary',
    'retro-gaming': 'success',
    'homebrew': 'info',
    'hardware': 'warning',
    'emulation': 'secondary',
  };

  const variant = categoryColors[category] || 'secondary';

  return (
    <Badge
      variant={variant}
      size="sm"
      className={className}
      onClick={onClick}
    >
      {category.replace('-', ' ').toUpperCase()}
    </Badge>
  );
};

/**
 * Tag Badge specifically for article tags
 */
interface ITagBadgeProps {
  tag: string;
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
}

export const TagBadge: React.FC<ITagBadgeProps> = ({
  tag,
  removable = false,
  onRemove,
  onClick,
  className = '',
}) => {
  return (
    <Badge
      variant="secondary"
      size="sm"
      removable={removable}
      onRemove={onRemove}
      onClick={onClick}
      className={className}
    >
      #{tag}
    </Badge>
  );
};

/**
 * Status Badge for feed health and other status indicators
 */
interface IStatusBadgeProps {
  status: 'active' | 'inactive' | 'error' | 'warning' | 'success';
  showDot?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<IStatusBadgeProps> = ({
  status,
  showDot = true,
  className = '',
}) => {
  const statusConfig = {
    active: { variant: 'success' as const, label: 'Active', dotColor: 'bg-green-400' },
    inactive: { variant: 'secondary' as const, label: 'Inactive', dotColor: 'bg-gray-400' },
    error: { variant: 'error' as const, label: 'Error', dotColor: 'bg-red-400' },
    warning: { variant: 'warning' as const, label: 'Warning', dotColor: 'bg-yellow-400' },
    success: { variant: 'success' as const, label: 'Healthy', dotColor: 'bg-green-400' },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} size="sm" className={className}>
      {showDot && (
        <span className={`w-2 h-2 rounded-full ${config.dotColor} mr-1.5`} />
      )}
      {config.label}
    </Badge>
  );
};