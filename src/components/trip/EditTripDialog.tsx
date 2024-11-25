import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Trip } from '@/types';
import { useUpdateTrip } from '@/hooks/trip/useUpdateTrip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface EditTripDialogProps {
  trip: Trip;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTripDialog({ trip, open, onOpenChange }: EditTripDialogProps) {
  const [title, setTitle] = useState(trip.title);
  const [startDate, setStartDate] = useState<Date | undefined>(
    trip.startDate ? new Date(trip.startDate) : undefined,
  );
  const [description, setDescription] = useState(trip.description || '');
  const [calendarOpen, setCalendarOpen] = useState(false);

  const { mutate, isPending } = useUpdateTrip(trip.tripId, () => onOpenChange(false));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      title,
      startDate: startDate?.toISOString(),
      description,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <DialogTitle>Edit Trip</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter trip name"
              className="bg-white/50 text-base text-gray-900 dark:bg-green-800/30 dark:text-green-100"
            />
          </div>

          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start bg-white/50 font-normal',
                  !startDate && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="z-[60] w-auto p-0 text-gray-900 dark:text-green-100/90"
              align="start"
            >
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date);
                  setCalendarOpen(false);
                }}
                initialFocus
                className="rounded-md border bg-white p-3 text-gray-900 dark:border-white/10 dark:bg-green-800/30 dark:text-green-100/90"
              />
            </PopoverContent>
          </Popover>

          <div className="space-y-2">
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add trip details..."
              className="bg-white/50 text-base text-gray-900 dark:bg-green-800/30 dark:text-green-100"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
