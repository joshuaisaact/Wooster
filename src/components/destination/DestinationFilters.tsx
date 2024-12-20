import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Destination } from '@/types';

interface DestinationFiltersProps {
  destinations: Destination[];
  selectedCostLevel: string;
  selectedSafetyRating: string;
  selectedCountry: string;
  onCostLevelChange: (value: string) => void;
  onSafetyRatingChange: (value: string) => void;
  onCountryChange: (value: string) => void;
}

export function DestinationFilters({
  destinations,
  selectedCostLevel,
  selectedSafetyRating,
  selectedCountry,
  onCostLevelChange,
  onSafetyRatingChange,
  onCountryChange,
}: DestinationFiltersProps) {
  const uniqueCostLevels = Array.from(new Set(destinations.map((d) => d.costLevel)));
  const uniqueSafetyRatings = Array.from(new Set(destinations.map((d) => d.safetyRating)));
  const uniqueCountries = Array.from(new Set(destinations.map((d) => d.country))).sort((a, b) =>
    a.localeCompare(b),
  );

  return (
    <div className="grid gap-6 text-gray-800 dark:text-green-100 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <Select value={selectedCountry || 'all'} onValueChange={onCountryChange}>
          <SelectTrigger className="w-[180px] bg-white/50 dark:border-white/10 dark:bg-green-800/30">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent className="dark:border-white/10 dark:bg-green-900">
            <SelectItem value="all">All Countries</SelectItem>
            {uniqueCountries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select value={selectedCostLevel || 'all'} onValueChange={onCostLevelChange}>
          <SelectTrigger className="w-[180px] bg-white/50 dark:border-white/10 dark:bg-green-800/30">
            <SelectValue placeholder="Cost Level" />
          </SelectTrigger>
          <SelectContent className="dark:border-white/10 dark:bg-green-900">
            <SelectItem value="all">All Cost Levels</SelectItem>
            {uniqueCostLevels.map((cost) => (
              <SelectItem key={cost} value={cost}>
                {cost}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select value={selectedSafetyRating || 'all'} onValueChange={onSafetyRatingChange}>
          <SelectTrigger className="w-[180px] bg-white/50 dark:border-white/10 dark:bg-green-800/30">
            <SelectValue placeholder="Safety Rating" />
          </SelectTrigger>
          <SelectContent className="dark:border-white/10 dark:bg-green-900">
            <SelectItem value="all">All Safety Ratings</SelectItem>
            {uniqueSafetyRatings.map((safety) => (
              <SelectItem key={safety} value={safety}>
                {safety}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
