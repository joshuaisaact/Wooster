import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

interface DatePickerProps {
  startDate?: Date;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  id?: string;
  'aria-label'?: string;
}

export function DatePicker({
  startDate,
  onDateChange,
  placeholder = 'Select date',
  id,
  'aria-label': ariaLabel,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          aria-label={ariaLabel}
          variant="outline"
          className={cn(
            'w-full justify-start bg-white/50 font-normal text-gray-600 hover:bg-white/80 dark:bg-green-800/30 dark:text-green-100/90 dark:hover:bg-green-800/40',
            !startDate && 'text-muted-foreground dark:text-green-100/70',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-900 dark:text-green-100" />
          {startDate ? (
            format(startDate, 'PPP')
          ) : (
            <span className="text-gray-900 dark:text-green-100/90">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="rounded-md border bg-white p-3 dark:border-white/10 dark:bg-green-800/30"
        align="start"
      >
        <Calendar
          mode="single"
          selected={startDate}
          onSelect={(date) => {
            onDateChange(date);
            setOpen(false);
          }}
          initialFocus
          className="rounded-md border bg-white p-3 dark:border-white/10 dark:bg-green-800/30"
        />
      </PopoverContent>
    </Popover>
  );
}
