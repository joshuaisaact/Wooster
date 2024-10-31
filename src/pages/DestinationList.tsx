import { DestinationListView } from '@/components/destination/DestinationListView';
import { useAppContext } from '@/hooks/useAppContext';

export default function DestinationListPage() {
  const { state } = useAppContext();
  const { isLoading, destinations } = state;

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-green-50/50 to-white/50">
        <div className="text-muted-foreground animate-pulse text-lg">Loading destinations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-gradient-to-b from-green-50/50 via-white/50 to-green-50/50">
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <DestinationListView destinations={destinations} isLoading={isLoading} />
      </div>
    </div>
  );
}
