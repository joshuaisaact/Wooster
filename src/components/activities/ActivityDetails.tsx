interface ActivityDetailsProps {
  description: string;
  isSelected: boolean;
}

export function ActivityDetails({ description, isSelected }: ActivityDetailsProps) {
  return (
    <p className={`${isSelected ? 'text-gray-800' : 'text-muted-foreground'}`}>{description}</p>
  );
}
