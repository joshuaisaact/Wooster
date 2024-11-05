import { useState } from 'react';
import { Destination } from '@/types/types';
import { useAppContext } from '@/hooks/useAppContext';
import { getSoonestTrip } from '@/utils/trips';
import MainContent from '@/components/dashboard/MainContent';
import Sidebar from '@/components/dashboard/Sidebar';
import { usePageAnimation } from '@/hooks/usePageAnimation';
import CreateTrip from '@/components/shared/CreateTrip';
import CreateDestination from '@/components/shared/CreateDestination';
import { PageHeader } from '@/components/shared/PageHeader';

function Dashboard() {
  const { state } = useAppContext();
  const { isLoading, trips } = state;
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'create' | 'destination'>('dashboard');
  const shouldAnimate = usePageAnimation('dashboard');

  const soonestTrip = !isLoading ? getSoonestTrip(trips) : null;
  const soonestTripDestination = soonestTrip ? soonestTrip.destination : null;

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-muted-foreground animate-pulse text-lg">
          <span className="dark:text-muted-foreground bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Loading your adventures...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] w-full ${shouldAnimate ? 'animate-fade-in opacity-0' : ''}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(20_184_166_/_0.05)_1px,transparent_0)] [background-size:24px_24px] dark:bg-none" />

      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <PageHeader
          title="Welcome to your Travel Hub"
          description="Your gateway to memorable journeys. Explore destinations, plan trips, and keep track of your upcoming adventures all in one place."
          shouldAnimate={shouldAnimate}
        />

        {/* Mobile Tabs & Content */}
        <div className="lg:hidden">
          {/* Tabs */}
          <div className="relative z-10 mb-6">
            <div className="flex w-full justify-between rounded-lg bg-white/70 p-1 dark:bg-green-800/30">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className={`relative z-20 flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-green-800 text-white dark:bg-green-700'
                    : 'text-green-900 hover:bg-white/50 dark:text-green-100 dark:hover:bg-green-800/40'
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('create')}
                className={`relative z-20 flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === 'create'
                    ? 'bg-green-800 text-white dark:bg-green-700'
                    : 'text-green-900 hover:bg-white/50 dark:text-green-100 dark:hover:bg-green-800/40'
                }`}
              >
                New Trip
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('destination')}
                className={`relative z-20 flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === 'destination'
                    ? 'bg-green-800 text-white dark:bg-green-700'
                    : 'text-green-900 hover:bg-white/50 dark:text-green-100 dark:hover:bg-green-800/40'
                }`}
              >
                Add Place
              </button>
            </div>
          </div>

          {/* Content with container */}
          <div className="relative rounded-lg bg-white/70 p-4 dark:bg-transparent">
            {activeTab === 'dashboard' && (
              <MainContent
                soonestTrip={soonestTrip}
                soonestTripDestination={soonestTripDestination}
                onDestinationClick={setSelectedDestination}
                className={
                  shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:600ms]' : ''
                }
              />
            )}
            {activeTab === 'create' && (
              <div
                className={
                  shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:600ms]' : ''
                }
              >
                <CreateTrip
                  location={null}
                  onClose={() => setActiveTab('dashboard')}
                  className="p-0"
                />
              </div>
            )}
            {activeTab === 'destination' && (
              <div
                className={
                  shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:600ms]' : ''
                }
              >
                <CreateDestination onClose={() => setActiveTab('dashboard')} />
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout - Unchanged */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
          <MainContent
            soonestTrip={soonestTrip}
            soonestTripDestination={soonestTripDestination}
            onDestinationClick={setSelectedDestination}
            className={`lg:col-span-2 ${
              shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:600ms]' : ''
            }`}
          />
          <Sidebar
            selectedDestination={selectedDestination}
            className={`space-y-6 lg:sticky lg:top-8 ${
              shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:800ms]' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
