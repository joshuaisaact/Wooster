import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description: string;
  badge?: {
    text: string;
    count?: number;
  };
  shouldAnimate?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  description,
  badge,
  shouldAnimate = false,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('mb-4 sm:mb-6 md:mb-8 lg:mb-12', className)}>
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2 sm:gap-3">
            <h1
              className={cn(
                'text-xl font-bold tracking-tight text-gray-900 dark:text-white/95 sm:text-2xl md:text-3xl lg:text-4xl',
                shouldAnimate && 'animate-fade-in-up opacity-0 [animation-delay:200ms]',
              )}
            >
              {title}
            </h1>
            {badge && (
              <span
                className={cn(
                  'rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/50 dark:text-green-100 sm:px-3 sm:py-1 sm:text-sm',
                  shouldAnimate && 'animate-fade-in-up opacity-0 [animation-delay:200ms]',
                )}
              >
                {badge.count !== undefined
                  ? `${badge.count} ${badge.text}${badge.count === 1 ? '' : 's'}`
                  : badge.text}
              </span>
            )}
          </div>
          <p
            className={cn(
              'mt-1 text-sm text-gray-600 dark:text-green-100/80 sm:mt-2 sm:text-base md:text-lg',
              shouldAnimate && 'animate-fade-in-up opacity-0 [animation-delay:400ms]',
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
