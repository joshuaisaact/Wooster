import { DestinationListView } from '@/components/destination/DestinationListView';
import { useAppContext } from '@/hooks/useAppContext';

export default function DestinationListPage() {
  const { state } = useAppContext();
  const { isLoading, destinations } = state;

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600 dark:text-green-100/70">
          Loading destinations...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full">
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <DestinationListView destinations={destinations} isLoading={isLoading} />
      </div>
    </div>
  );
}
