import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Sun, Sunrise, Sunset } from 'lucide-react';

interface ActivitySlotSelectorProps {
  currentSlot: number;
  maxSlots: number;
  onSlotChange: (newSlot: number | null) => Promise<void>;
  disabled?: boolean;
}

interface TimeSlot {
  label: string;
  icon: React.ReactNode;
}

const getTimeSlot = (slot: number): TimeSlot => {
  switch (slot) {
    case 1:
      return {
        label: 'Morning',
        icon: <Sunrise className="h-4 w-4 text-amber-500 dark:text-amber-400" />,
      };
    case 2:
      return {
        label: 'Afternoon',
        icon: <Sun className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />,
      };
    case 3:
      return {
        label: 'Evening',
        icon: <Sunset className="h-4 w-4 text-orange-500 dark:text-orange-400" />,
      };
    default:
      return {
        label: `Slot ${slot}`,
        icon: <Sun className="h-4 w-4" />,
      };
  }
};

export default function ActivitySlotSelector({
  currentSlot,
  maxSlots,
  onSlotChange,
  disabled,
}: ActivitySlotSelectorProps) {
  const currentTimeSlot = getTimeSlot(currentSlot);

  return (
    <Select
      value={currentSlot.toString()}
      onValueChange={(value) => {
        if (value === 'remove') {
          onSlotChange(null);
        } else {
          onSlotChange(parseInt(value));
        }
      }}
      disabled={disabled}
    >
      <SelectTrigger className="h-9 min-w-[160px] border-gray-200 bg-white/80 text-sm dark:border-green-100/20 dark:bg-green-900/60 dark:text-green-100">
        <div className="flex items-center gap-2">
          {currentTimeSlot.icon}
          <span>{currentTimeSlot.label}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: maxSlots }, (_, i) => i + 1).map((slotNum) => {
          const timeSlot = getTimeSlot(slotNum);
          return (
            <SelectItem
              key={slotNum}
              value={slotNum.toString()}
              disabled={slotNum === currentSlot}
              className="text-sm"
            >
              <div className="flex items-center gap-2">
                {timeSlot.icon}
                <span>Move to {timeSlot.label}</span>
              </div>
            </SelectItem>
          );
        })}
        <SelectItem value="remove" className="text-sm">
          Remove from day
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
