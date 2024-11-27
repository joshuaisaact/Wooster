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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-medium text-gray-900 dark:text-white/90">Trip Name</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter trip name"
              className="bg-white/50 text-base text-gray-900 transition-shadow duration-200 focus:ring-2 focus:ring-green-500/20 dark:border-white/10 dark:bg-green-800/30 dark:text-green-100 dark:placeholder-green-100/50 dark:focus:ring-green-400/20"
            />
            <p className="text-xs text-gray-600 dark:text-green-100/70">
              Give your trip a memorable name
            </p>
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-900 dark:text-white/90">Trip Date</label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start bg-white/50 text-gray-900 transition-shadow duration-200',
                    'focus:ring-2 focus:ring-green-500/20',
                    'dark:bg-green-800/30 dark:text-green-100 dark:focus:ring-green-400/20',
                    'border-gray-200/50 dark:border-white/10',
                    !startDate && 'text-gray-500 dark:text-green-100/70',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    setStartDate(date);
                    setCalendarOpen(false);
                  }}
                  initialFocus={true}
                  className="rounded-md border border-gray-200/50 bg-white p-3 text-base dark:border-white/10 dark:bg-green-800/30"
                  classNames={{
                    day_selected:
                      'bg-green-800 text-white hover:bg-green-700 dark:bg-green-600 dark:text-white/90 dark:hover:bg-green-700 text-base',
                    day: 'text-gray-900 dark:text-green-100/90',
                  }}
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-gray-600 dark:text-green-100/70">
              Change the start date of your adventure
            </p>
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-900 dark:text-white/90">Description</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add trip details..."
              className="bg-white/50 text-base text-gray-900 transition-shadow duration-200 focus:ring-2 focus:ring-green-500/20 dark:border-white/10 dark:bg-green-800/30 dark:text-green-100 dark:placeholder-green-100/50 dark:focus:ring-green-400/20"
            />
            <p className="text-xs text-gray-600 dark:text-green-100/70">
              Add any important details about your trip
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              className="border-gray-200/50 dark:border-white/10 dark:text-green-100"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-green-800 font-medium tracking-tight transition-all duration-200 hover:bg-green-700 active:scale-[0.98] dark:bg-green-600 dark:text-white/90 dark:hover:bg-green-700"
            >
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
