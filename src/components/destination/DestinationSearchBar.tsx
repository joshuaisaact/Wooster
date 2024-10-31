// components/destination/DestinationSearchBar.tsx
import { FilterIcon, SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { SortOption } from '@/types/types';

interface DestinationSearchBarProps {
  searchQuery: string;
  sortBy: SortOption;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
  onToggleFilters: () => void;
}

export function DestinationSearchBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onToggleFilters,
}: DestinationSearchBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          type="text"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-white/50 pl-9"
        />
      </div>
      <div className="flex items-center gap-2">
        <Select value={sortBy} onValueChange={onSortChange}>
          {/* ... */}
        </Select>
        <Button
          variant="outline"
          className="border-gray-200 bg-white/50 text-gray-900 hover:bg-white/80 hover:text-green-700"
          onClick={onToggleFilters}
        >
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>
    </div>
  );
}
