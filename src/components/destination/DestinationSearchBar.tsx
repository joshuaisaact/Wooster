// components/destination/DestinationSearchBar.tsx
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type SortOption = 'name' | 'cost' | 'safety';

interface DestinationSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
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
    <div className="mb-6 flex flex-wrap items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <Input
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button variant="outline" onClick={onToggleFilters} className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </Button>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Sort by Name</SelectItem>
          <SelectItem value="cost">Sort by Cost</SelectItem>
          <SelectItem value="safety">Sort by Safety</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
