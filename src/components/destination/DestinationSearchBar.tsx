import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DestinationSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function DestinationSearchBar({ searchQuery, onSearchChange }: DestinationSearchBarProps) {
  return (
    <div className="relative flex-1">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-green-100/50" />
      <Input
        type="text"
        placeholder="Search destinations..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-white/50 pl-9 dark:bg-green-800/30 dark:text-green-100 dark:placeholder:text-green-100/50"
      />
    </div>
  );
}
