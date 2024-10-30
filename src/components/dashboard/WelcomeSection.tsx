import { Destination } from '@/types/types';

interface WelcomeSectionProps {
  nextDestination: Destination | null;
}

function WelcomeSection({ nextDestination }: WelcomeSectionProps) {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <section>
        <h2 className="mb-5 mt-4 text-2xl font-bold">Welcome back, Josh!</h2>
        <span>
          <strong>Your next adventure is just around the corner.</strong>
        </span>
        <p className="mt-5">
          {nextDestination
            ? `Ready to continue planning your trip to ${nextDestination.destinationName}?
             Wooster has all the tools you need to make it unforgettable.`
            : 'Ready to plan your next adventure? Wooster has all the tools you need to make it unforgettable.'}
        </p>
      </section>
      <img src="./wooster-suitcase-no-bg.png" alt="Wooster mascot" className="h-40" />
    </div>
  );
}

export default WelcomeSection;
