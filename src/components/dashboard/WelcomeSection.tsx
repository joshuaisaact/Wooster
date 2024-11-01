import { Destination } from '@/types/types';

interface WelcomeSectionProps {
  nextDestination: Destination | null;
}

function WelcomeSection({ nextDestination }: WelcomeSectionProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <section className="flex-1 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-green-900">
          {nextDestination
            ? `Next Stop: ${nextDestination.destinationName}!`
            : 'Ready for Your Next Adventure?'}
        </h2>
        <div className="space-y-3">
          <p className="font-medium text-green-800">
            {nextDestination ? 'Your journey is taking shape' : 'Where will Wooster take you?'}
          </p>
          <p className="text-muted-foreground text-sm text-gray-800">
            {nextDestination
              ? `Let's fine-tune your plans for ${nextDestination.destinationName}.
                 Wooster's here to help make every detail perfect.`
              : "Discover new destinations and create unforgettable memories with Wooster's travel planning tools."}
          </p>
        </div>
      </section>

      <div className="flex justify-center md:justify-end">
        <img
          src="./wooster-suitcase-no-bg.png"
          alt="Wooster mascot"
          className="h-28 w-auto transform-gpu object-contain transition-transform duration-300 hover:scale-105 md:h-40"
        />
      </div>
    </div>
  );
}
export default WelcomeSection;
