import { Destination } from '@/types/types';
import CreateTrip from '@/components/shared/CreateTrip';
import CreateDestination from '../shared/CreateDestination';
import { cn } from '@/lib/utils';

interface SidebarProps {
  selectedDestination: Destination | null;
  className?: string;
}

function Sidebar({ selectedDestination, className }: SidebarProps) {
  return (
    <div className={cn('w-full lg:col-span-1', className)}>
      <div className="space-y-6">
        <CreateTrip location={selectedDestination} />
        <CreateDestination />
        <div className="hidden lg:block">
          <img
            src="/wooster-on-maps-no-bg.png"
            alt="Wooster"
            className="mx-auto w-48 opacity-80 transition-opacity duration-200 hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
