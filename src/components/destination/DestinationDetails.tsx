import { Destination } from '@/types';
import { Card, CardContent } from '../ui/card';
import { InfoItem } from '../InfoItem';

interface DestinationSummaryProps {
  destination: Destination;
}

function DestinationDetails({ destination }: DestinationSummaryProps) {
  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardContent className="space-y-6">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.entries({
            'Best Time to Visit': destination.bestTimeToVisit,
            'Temperature Range': `${destination.averageTemperatureLow}°F - ${destination.averageTemperatureHigh}°F`,
            Language: destination.officialLanguage,
            Currency: destination.currency,
          }).map(([label, value]) => (
            <InfoItem key={label} label={label} value={value} />
          ))}
        </section>

        {Object.entries({
          'Popular Activities': destination.popularActivities,
          'Travel Tips': destination.travelTips,
          'Local Cuisine': destination.localCuisine,
          'Cultural Significance': destination.culturalSignificance,
        }).map(([title, content]) => (
          <section key={title}>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white/95">{title}</h3>
            <p className="text-sm text-muted-foreground dark:text-green-100/70">{content}</p>
          </section>
        ))}
      </CardContent>
    </Card>
  );
}

export default DestinationDetails;
