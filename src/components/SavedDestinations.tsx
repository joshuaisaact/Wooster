import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Destination } from '@/types/types';
import { useAppContext } from '@/hooks/useAppContext';

interface SavedDestinationsProps {
  handleButtonClick: (destination: Destination) => void;
  focusedDestinationId?: number | null;
}

function SavedDestinations({ handleButtonClick, focusedDestinationId }: SavedDestinationsProps) {
  const { state } = useAppContext();
  const { destinations } = state;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">My Saved Destinations</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full">
          <div className="flex flex-wrap gap-2 p-1">
            {destinations.map((destination: Destination) => (
              <Button
                key={destination.destination_id}
                onClick={() => handleButtonClick(destination)}
                variant="outline"
                size="sm"
                className={`text-s ${
                  focusedDestinationId === destination.destination_id
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-black'
                }`}
              >
                {destination.destination_name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default SavedDestinations;
