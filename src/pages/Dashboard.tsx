import { useState } from 'react';
import { Destination } from '@/types/types';
import { useAppContext } from '@/hooks/useAppContext';
import { getSoonestTrip } from '@/utils/trips';
import MainContent from '@/components/dashboard/MainContent';
import Sidebar from '@/components/dashboard/Sidebar';
import { usePageAnimation } from '@/hooks/usePageAnimation';
import CreateTrip from '@/components/shared/CreateTrip';
import CreateDestination from '@/components/shared/CreateDestination';

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
          Loading your adventures...
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] w-full ${shouldAnimate ? 'animate-fade-in opacity-0' : ''}`}
    >
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Welcome section */}
        <div className="mb-6 md:mb-8 lg:mb-12">
          <h1
            className={`text-2xl font-bold tracking-tight text-gray-900 dark:text-white/95 md:text-3xl lg:text-4xl ${
              shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:200ms]' : ''
            }`}
          >
            Welcome Back!
          </h1>
          <p
            className={`mt-2 text-base text-gray-600 dark:text-green-100/80 md:text-lg ${
              shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:400ms]' : ''
            }`}
          >
            Let's plan your next adventure
          </p>
        </div>

        {/* Mobile Tabs */}
        <div className="mb-6 flex lg:hidden">
          <div className="flex w-full justify-between rounded-lg bg-white/70 p-1 dark:bg-green-800/30">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-green-800 text-white dark:bg-green-700'
                  : 'text-green-900 hover:bg-white/50 dark:text-green-100 dark:hover:bg-green-800/40'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeTab === 'create'
                  ? 'bg-green-800 text-white dark:bg-green-700'
                  : 'text-green-900 hover:bg-white/50 dark:text-green-100 dark:hover:bg-green-800/40'
              }`}
            >
              New Trip
            </button>
            <button
              onClick={() => setActiveTab('destination')}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeTab === 'destination'
                  ? 'bg-green-800 text-white dark:bg-green-700'
                  : 'text-green-900 hover:bg-white/50 dark:text-green-100 dark:hover:bg-green-800/40'
              }`}
            >
              Add Place
            </button>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="lg:hidden">
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
                location={null} // Add this
                onClose={() => setActiveTab('dashboard')}
                className="p-0" // Add some styling to fit mobile
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
