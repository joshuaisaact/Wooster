import { Destination } from '@/types/types';
import CreateTrip from '@/components/shared/CreateTrip';
import CreateDestination from '../CreateDestination';

interface SidebarProps {
  selectedDestination: Destination | null;
}

function Sidebar({ selectedDestination }: SidebarProps) {
  return (
    <div className="space-y-10 lg:col-span-1">
      <div className="max-w-max rounded-lg bg-white p-6 shadow-md">
        <CreateTrip location={selectedDestination} />
      </div>
      <div className="max-w-max rounded-lg bg-white p-6 shadow-md">
        <CreateDestination />
      </div>
    </div>
  );
}

export default Sidebar;
