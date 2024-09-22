import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPinIcon, DollarSignIcon } from 'lucide-react';

interface ActivityProps {
  activity: {
    activity_name: string;
    description: string;
    location: string;
    price: string;
    image?: string;
  };
}

function Activity({ activity }: ActivityProps) {
  const { activity_name, description, location, price } = activity;

  return (
    <Card className="flex w-full max-w-sm flex-col overflow-hidden border border-gray-300 bg-white text-gray-900 shadow-md">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-2xl">{activity_name}</CardTitle>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPinIcon className="h-3 w-3" />
            <span>{location}</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <DollarSignIcon className="h-3 w-3" />
            {price}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default Activity;
