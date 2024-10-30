import { DestinationListView } from '@/components/destination/DestinationListView';
import { useAppContext } from '@/hooks/useAppContext';

export default function DestinationListPage() {
  const { state } = useAppContext();
  const { isLoading, destinations } = state;

  return (
    <div className="container mx-auto px-4 py-8">
      <DestinationListView destinations={destinations} isLoading={isLoading} />
    </div>
  );
}
