import { Destination } from '@/types';
import { cn } from '@/lib/utils';

interface WelcomeSectionProps {
  nextDestination: Destination | null;
  shouldAnimate?: boolean;
  className?: string;
}

function WelcomeSection({
  nextDestination,
  shouldAnimate = false,
  className,
}: WelcomeSectionProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-white/70 p-6 dark:bg-green-800/30',
        'flex flex-col gap-6 md:flex-row md:items-center md:justify-between',
        className,
      )}
    >
      <section className="flex-1 space-y-4">
        <h2
          className={cn(
            'text-xl font-semibold tracking-tight text-gray-900 dark:text-white/95 sm:text-2xl',
            shouldAnimate && 'animate-fade-in-up opacity-0 [animation-delay:200ms]',
          )}
        >
          {nextDestination ? (
            <>
              Next Stop:{' '}
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent dark:from-green-400 dark:to-green-600">
                {nextDestination.destinationName}
              </span>
              !
            </>
          ) : (
            'Ready for Your Next Adventure?'
          )}
        </h2>
        <div
          className={cn(
            'space-y-3',
            shouldAnimate && 'animate-fade-in-up opacity-0 [animation-delay:400ms]',
          )}
        >
          <p className="text-sm text-gray-600 dark:text-green-100/80 sm:text-base">
            {nextDestination
              ? "Your journey is taking shape – let's make it unforgettable!"
              : 'Where will your next journey take you?'}
          </p>
          <p className="text-sm text-gray-600 dark:text-green-100/80 sm:text-base">
            {nextDestination
              ? `Time to perfect your ${nextDestination.destinationName} adventure.
               From must-see spots to hidden gems, we'll help you plan it all.`
              : 'Start exploring destinations and create your perfect itinerary. Your next great adventure is just a few clicks away.'}
          </p>
        </div>
      </section>

      <div
        className={cn(
          'flex justify-center md:justify-end',
          shouldAnimate && 'animate-fade-in-up opacity-0 [animation-delay:600ms]',
        )}
      >
        <img
          src="/wooster-suitcase-no-bg.png"
          alt="Wooster mascot with suitcase"
          className={cn(
            'h-28 w-auto object-contain md:h-40',
            'transform-gpu transition-all duration-300',
            'hover:scale-105 hover:brightness-110',
            'dark:brightness-110',
          )}
        />
      </div>
    </div>
  );
}

export default WelcomeSection;
