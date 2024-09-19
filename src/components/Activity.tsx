import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPinIcon, DollarSignIcon } from 'lucide-react';

interface ActivityProps {
  activity: {
    name: string;
    description: string;
    location: string;
    price: string;
    image?: string;
  };
}

function Activity({ activity }: ActivityProps) {
  const { name, description, location, price, image } = activity;

  return (
    <Card className="flex h-[28rem] w-80 max-w-sm flex-col overflow-hidden border-[#646cff] bg-[#1a1a1a] text-[rgba(255,255,255,0.87)]">
      <div className="relative h-48 w-full flex-shrink-0">
        {image ? (
          <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="bg-secondary flex h-full w-full items-center justify-center">
            <span className="text-4xl">🏞️</span>
          </div>
        )}
      </div>
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-xl text-[#646cff]">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 overflow-y-auto">
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="flex max-w-[45%] items-center gap-1 bg-green-800 text-[rgba(255,255,255,0.87)]"
          >
            <MapPinIcon className="h-3 w-3" />
            <span className="truncate">{location}</span>
          </Badge>
          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-green-800 text-[rgba(255,255,255,0.87)]"
          >
            <DollarSignIcon className="h-3 w-3" />
            {price}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default Activity;
