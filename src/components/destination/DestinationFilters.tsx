import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Destination } from '@/types/types';

interface DestinationFiltersProps {
  destinations: Destination[];
  selectedCostLevel: string;
  selectedSafetyRating: string;
  onCostLevelChange: (value: string) => void;
  onSafetyRatingChange: (value: string) => void;
}

export function DestinationFilters({
  destinations,
  selectedCostLevel,
  selectedSafetyRating,
  onCostLevelChange,
  onSafetyRatingChange,
}: DestinationFiltersProps) {
  const uniqueCostLevels = Array.from(new Set(destinations.map((d) => d.costLevel)));
  const uniqueSafetyRatings = Array.from(new Set(destinations.map((d) => d.safetyRating)));

  return (
    <div className="mb-6 flex flex-wrap gap-4 rounded-lg bg-gray-50 p-4">
      <Select value={selectedCostLevel || 'all'} onValueChange={onCostLevelChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Cost Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cost Levels</SelectItem>
          {uniqueCostLevels.map((cost) => (
            <SelectItem key={cost} value={cost}>
              {cost}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedSafetyRating || 'all'} onValueChange={onSafetyRatingChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Safety Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Safety Ratings</SelectItem>
          {uniqueSafetyRatings.map((safety) => (
            <SelectItem key={safety} value={safety}>
              {safety}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
