import { useInitialData } from '@/hooks/queries/useInitialData';

interface LoadingBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LoadingBoundary({ children, fallback }: LoadingBoundaryProps) {
  const { isLoading } = useInitialData();

  if (isLoading) {
    return (
      fallback || (
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <div className="animate-pulse text-lg text-gray-600 dark:text-green-100/70">
            Loading your adventures...
          </div>
        </div>
      )
    );
  }

  return children;
}
