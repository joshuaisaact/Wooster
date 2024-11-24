import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityCard } from '@/components/activities';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Activity as ActivityType } from '@/types';

import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ItineraryListProps {
  day: number;
  activities: ActivityType[];
  selectedActivityId: number | null;
  onActivitySelect: (id: number) => void;
}

export function ItineraryList({
  day,
  activities,
  selectedActivityId,
  onActivitySelect,
}: ItineraryListProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());
    onSelect();

    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api, onSelect]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
    },
    [api],
  );

  return (
    <Card className="group flex w-full flex-col border-none bg-white/70 shadow-lg transition-all duration-200 hover:bg-white/80 hover:shadow-xl dark:bg-green-800/30 dark:shadow-green-900/20 dark:hover:bg-green-800/40">
      <CardHeader className="border-b border-gray-100 bg-white/50 px-4 py-3 dark:border-white/10 dark:bg-green-800/20 sm:px-6 sm:py-4">
        <CardTitle className="text-lg font-bold text-green-900 group-hover:text-green-800 dark:text-white/95 dark:group-hover:text-white sm:text-xl">
          Day {day}
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-green-100/70">
          {activities.length} {activities.length === 1 ? 'activity' : 'activities'} planned
        </p>
      </CardHeader>

      {/* Mobile Carousel */}
      <div className="flex-1 sm:hidden">
        {activities.length > 0 ? (
          <div className="px-4 py-4">
            <Carousel
              opts={{
                align: 'start',
                loop: false,
              }}
              setApi={setApi}
              className="w-full"
            >
              <CarouselContent>
                {activities.map((activity) => (
                  <CarouselItem key={activity.activityId}>
                    <ActivityCard
                      activity={activity}
                      isSelected={selectedActivityId === activity.activityId}
                      onSelect={() => onActivitySelect(activity.activityId)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Dot indicators */}
            <div className="mt-4 flex justify-center gap-1.5">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    index === selectedIndex
                      ? 'w-4 bg-green-600 dark:bg-green-400'
                      : 'w-1.5 bg-gray-300 dark:bg-green-100/30',
                  )}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center text-gray-500">
            No activities planned for this day yet
          </div>
        )}
      </div>

      {/* Desktop ScrollArea List */}
      <div className="hidden flex-1 sm:block">
        <ScrollArea className="flex-1">
          <div className="px-6 py-6">
            {activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <ActivityCard
                    key={activity.activityId}
                    activity={activity}
                    isSelected={selectedActivityId === activity.activityId}
                    onSelect={() => onActivitySelect(activity.activityId)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-32 items-center justify-center text-gray-500">
                No activities planned for this day yet
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}
