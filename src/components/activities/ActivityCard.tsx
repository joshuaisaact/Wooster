import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityDetails } from './ActivityDetails';
import { ActivityLocationPrice } from './ActivityLocationPrice';
import { Activity as ActivityType } from '@/types/types';
import { SelectionIndicator } from '../ui/SelectionIndicator';

interface ActivityCardProps {
  activity: ActivityType;
  isSelected: boolean;
  onSelect: () => void;
}

export function ActivityCard({ activity, isSelected, onSelect }: ActivityCardProps) {
  const { activityName, description, location, price } = activity;

  return (
    <Card
      className={`flex w-full max-w-sm flex-col overflow-hidden border ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
      } relative cursor-pointer text-gray-900 shadow-md transition-colors duration-200 ease-in-out`}
      onClick={onSelect}
    >
      <CardHeader className="flex flex-shrink-0 flex-row justify-between">
        <CardTitle className="text-2xl">{activityName}</CardTitle>
        {isSelected && <SelectionIndicator />}
      </CardHeader>
      <CardContent className="space-y-4">
        <ActivityDetails description={description} isSelected={isSelected} />
      </CardContent>
      <ActivityLocationPrice location={location} price={price} />
    </Card>
  );
}
