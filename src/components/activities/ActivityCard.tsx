import { Activity as ActivityType } from '@/types';
import { Badge } from '../ui/badge';
import {
  MapPinIcon,
  DollarSignIcon,
  CheckCircle,
  ExternalLink,
  Clock,
  Sun,
  Gauge,
  Tag,
  MoreVertical,
  Sunrise,
  Sunset,
  Loader2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

interface ActivityCardProps {
  activity: ActivityType;
  isSelected: boolean;
  onSelect: () => void;
  onSlotChange?: (newSlot: number | null) => Promise<void>;
  disabled?: boolean;
}

export function ActivityCard({
  activity,
  isSelected,
  onSelect,
  onSlotChange,
  disabled,
}: ActivityCardProps) {
  const timeSlots = [
    { number: 1, label: 'Morning', icon: <Sunrise className="h-4 w-4" /> },
    { number: 2, label: 'Afternoon', icon: <Sun className="h-4 w-4" /> },
    { number: 3, label: 'Evening', icon: <Sunset className="h-4 w-4" /> },
  ];

  return (
    <Card
      onClick={onSelect}
      className="relative max-w-full cursor-pointer transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-green-800/30 dark:hover:shadow-green-900/20"
    >
      {isSelected && (
        <div className="absolute -right-2 -top-2 z-10">
          <CheckCircle className="h-5 w-5 fill-white text-green-500 dark:text-green-400 sm:h-6 sm:w-6" />
        </div>
      )}

      <CardHeader className="p-3 sm:p-4 md:p-6">
        <CardTitle className="flex flex-col space-y-1 sm:space-y-0">
          <div className="flex items-start justify-between gap-2">
            <span className="text-base text-green-900 dark:text-white/95 sm:text-lg md:text-xl">
              {activity.activityName}
            </span>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="shrink-0 text-xs dark:border-green-100/20 dark:bg-green-900/60 dark:text-green-100"
              >
                <Tag className="mr-1 h-3 w-3" /> {activity.category}
              </Badge>
              {onSlotChange && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-green-700/50"
                      disabled={disabled}
                    >
                      {disabled ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MoreVertical className="h-4 w-4" />
                      )}
                      <span className="sr-only">Move activity</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {timeSlots.map((slot) => (
                      <DropdownMenuItem
                        key={slot.number}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (slot.number !== activity.slotNumber) {
                            onSlotChange(slot.number);
                          }
                        }}
                        disabled={slot.number === activity.slotNumber || disabled}
                        className="flex items-center gap-2"
                      >
                        {slot.icon}
                        Move to {slot.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 px-3 sm:px-4 md:px-6">
        <p className="line-clamp-2 text-sm text-gray-600 dark:text-green-100/70 sm:line-clamp-3">
          {activity.description}
        </p>

        <div className="grid grid-cols-4 gap-2 text-xs sm:text-sm md:grid-cols-2">
          <div className="flex items-center text-gray-600 dark:text-green-100/70">
            <DollarSignIcon className="mr-1.5 h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-green-100/50 sm:h-4 sm:w-4" />
            <span className="truncate">{activity.price}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-green-100/70">
            <Clock className="mr-1.5 h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-green-100/50 sm:h-4 sm:w-4" />
            <span className="truncate">{activity.duration}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-green-100/70">
            <Gauge className="mr-1.5 h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-green-100/50 sm:h-4 sm:w-4" />
            <span className="truncate">{activity.difficulty}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-green-100/70">
            <Sun className="mr-1.5 h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-green-100/50 sm:h-4 sm:w-4" />
            <span className="truncate">{activity.bestTime}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-gray-100 p-3 dark:border-white/10 sm:p-4 md:p-6">
        <div className="flex w-full items-center justify-between text-xs text-gray-600 dark:text-green-100/70 sm:text-sm">
          <div className="flex items-center">
            <MapPinIcon className="mr-1.5 h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-green-100/50 sm:h-4 sm:w-4" />
            <span className="max-w-[150px] truncate sm:max-w-[200px]">{activity.location}</span>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="ml-2 flex items-center text-gray-500 hover:text-green-700 dark:text-green-100/70 dark:hover:text-green-100"
          >
            <span className="mr-1 hidden sm:inline">View on Maps</span>
            <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
