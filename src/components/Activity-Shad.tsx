import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPinIcon, DollarSignIcon } from 'lucide-react';

export default function Component() {
  // Dummy data for preview
  const activity = {
    name: 'High Line',
    description:
      'Walk along the High Line, a unique elevated park built on a former New York Central Railroad spur, offering a mix of nature, art, and urban views.',
    location: "Manhattan's West Side",
    price: 'Free',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/High_Line_20th_Street_looking_downtown.jpg/1200px-High_Line_20th_Street_looking_downtown.jpg',
  };

  const { name, description, location, price, image } = activity;

  return (
    <Card className="max-w-sm overflow-hidden">
      <div className="relative h-48 w-full">
        {image ? (
          <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="bg-secondary flex h-full w-full items-center justify-center">
            <span className="text-4xl">🏞️</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPinIcon className="h-3 w-3" />
            {location}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <DollarSignIcon className="h-3 w-3" />
            {price}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
