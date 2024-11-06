import { DestinationListView } from './DestinationList';

export default function DestinationListPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full">
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <DestinationListView />
      </div>
    </div>
  );
}
