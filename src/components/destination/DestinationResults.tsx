import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DestinationCard from './DestinationCard';
import { Destination } from '@/types/types';
import { useCreateDestination } from '@/hooks/destination/useCreateDestination';
import { toast } from 'sonner';

interface DestinationResultsProps {
  isLoading: boolean;
  filteredDestinations: Destination[];
  searchQuery: string; // Add searchQuery to props
  onResetFilters?: () => void;
}

export function DestinationResults({
  isLoading,
  filteredDestinations,
  searchQuery,
  onResetFilters,
}: DestinationResultsProps) {
  const navigate = useNavigate();
  const { handleCreateDestination } = useCreateDestination();

  const handleDestinationClick = (destinationName: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/destinations/${encodeURIComponent(destinationName)}`);
  };

  const handleQuickCreateDestination = async () => {
    if (!searchQuery) return; // Guard clause in case searchQuery is empty

    try {
      const newDestination: Destination = await toast.promise(
        handleCreateDestination({ destinationName: searchQuery }),
        {
          loading: 'Creating your destination...',
          success: '🎉 Destination created successfully!',
          error: 'Failed to create destination. Please try again.',
        },
      );
      // Navigate to the newly created destination’s detail page
      navigate(`/destinations/${encodeURIComponent(newDestination.destinationName)}`);
    } catch (error) {
      console.error('Error creating destination:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg">Loading amazing destinations...</p>
      </div>
    );
  }

  if (filteredDestinations.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-4">
        <p className="text-lg text-gray-600 dark:text-green-100/70">
          No destinations found matching your criteria
        </p>
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
          className="bg-green-700 font-medium tracking-tight transition-all duration-200 hover:bg-green-800 active:scale-[0.98] dark:bg-green-600 dark:hover:bg-green-700"
        >
          Create New Destination
        </Button>
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
