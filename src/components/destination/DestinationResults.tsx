import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DestinationCard from './DestinationCard';
import { Destination } from '@/types';
import { useCreateDestination } from '@/hooks/destination/useCreateDestination';
import { toast } from 'sonner';

interface DestinationResultsProps {
  isLoading: boolean;
  filteredDestinations: Destination[];
  searchQuery: string;
  onResetFilters?: () => void;
}

export function DestinationResults({
  isLoading,
  filteredDestinations,
  searchQuery,
  onResetFilters,
}: DestinationResultsProps) {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateDestination();

  const handleDestinationClick = (destinationName: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/destinations/${encodeURIComponent(destinationName)}`);
  };

  const handleQuickCreateDestination = () => {
    if (!searchQuery) return;

    toast.promise(
      new Promise((resolve, reject) => {
        mutate(
          { destinationName: searchQuery },
          {
            onSuccess: (data) => {
              setTimeout(() => {
                navigate(`/destinations/${encodeURIComponent(data.destination.destinationName)}`);
              }, 1000);
              resolve(data.destination);
            },
            onError: reject,
          },
        );
      }),
      {
        loading: `Creating new destination: ${searchQuery}...`,
        success: '🎉 Destination created successfully!',
        error: (err) =>
          `Failed to create destination: ${err instanceof Error ? err.message : 'Please try again'}`,
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg">Loading amazing destinations...</p>
      </div>
    );
  }

  if (filteredDestinations.length === 0) {
    const trimmedQuery = searchQuery.trim();
    const canCreate = trimmedQuery.length >= 3;

    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-4">
        <p className="px-5 text-center text-gray-600 dark:text-green-100/70 md:text-lg">
          No destinations found matching "{searchQuery}"
        </p>
        <div className="flex flex-col gap-5 md:flex-row">
          <Button
            variant="outline"
            onClick={onResetFilters}
            className="bg-green-700 font-medium tracking-tight transition-all duration-200 hover:bg-green-800 active:scale-[0.98] dark:bg-green-600 dark:hover:bg-green-700"
          >
            Clear Filters
          </Button>
          <Button
            variant="outline"
            onClick={handleQuickCreateDestination}
            disabled={!canCreate || isPending}
            className="bg-green-700 font-medium tracking-tight transition-all duration-200 hover:bg-green-800 active:scale-[0.98] dark:bg-green-600 dark:hover:bg-green-700"
          >
            {isPending
              ? 'Creating...'
              : canCreate
                ? `Create "${trimmedQuery}" as New Destination`
                : 'Enter at least 3 characters'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredDestinations.map((destination) => (
        <li
          key={destination.destinationId}
          className="transition-transform duration-200 hover:scale-[1.02]"
        >
          <div
            onClick={() => handleDestinationClick(destination.destinationName)}
            className="block h-full cursor-pointer"
          >
            <DestinationCard destination={destination} />
          </div>
        </li>
      ))}
    </ul>
  );
}
