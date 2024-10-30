import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Destination } from '@/types/types';
import CreateTrip from '@/components/shared/CreateTrip';

interface PlanTripButtonProps {
  destination: Destination;
  onCreateTripOpen: (isOpen: boolean) => void;
}

export function PlanTripButton({ destination, onCreateTripOpen }: PlanTripButtonProps) {
  const [isCreatingTrip, setIsCreatingTrip] = useState(false);

  const handleToggle = (open: boolean) => {
    setIsCreatingTrip(open);
    onCreateTripOpen(open);
  };

  return (
    <>
      <Button
        onClick={() => handleToggle(!isCreatingTrip)}
        className="bg-green-500 text-white hover:bg-green-600"
      >
        {isCreatingTrip ? 'Cancel' : 'Plan Trip'}
      </Button>

      {isCreatingTrip && (
        <div className="fixed inset-y-0 right-0 z-50 w-96 bg-white p-6 shadow-lg">
          <div className="flex h-full flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Plan Your Trip</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleToggle(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-auto">
              <CreateTrip location={destination} onClose={() => handleToggle(false)} />
            </div>

            <div className="mt-4">
              <img src="/Wooster-map-planning.png" className="h-auto w-full" alt="Map Planning" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
