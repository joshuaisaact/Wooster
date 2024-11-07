import { useState } from 'react';
import CreateTrip from '@/components/shared/CreateTrip';
import { TripCard } from '@/components/trip/trip-card';
import { useAppContext } from '@/hooks/useAppContext';
import { Search } from 'lucide-react';
import { sortTripsByDate, filterTripsByStatus, searchTrips } from '@/utils/trips';
import ScrollLink from '@/components/shared/ScrollLink';
import { usePageAnimation } from '@/hooks/usePageAnimation';
import { PageHeader } from '@/components/shared/PageHeader';

function Trips() {
  const { state } = useAppContext();
  const { trips } = state;
  const [searchQuery, setSearchQuery] = useState('');
  const [showPastTrips, setShowPastTrips] = useState(false);
  const shouldAnimate = usePageAnimation('trips');

  // // Create a map of destination countries for search
  // const destinationCountries = destinations.reduce(
  //   (acc, dest) => ({
  //     ...acc,
  //     [dest.destinationName]: dest.country,
  //   }),
  //   {} as Record<string, string>,
  // );

  if (!trips || trips.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="max-w-md rounded-xl bg-white/70 p-8 text-center shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-green-900 dark:text-white/95">
              You have no planned trips!
            </h3>
            <p className="text-sm text-gray-600 dark:text-green-100/70">
              View your upcoming trips here, once you've planned one
            </p>
            <div className="pt-4">
              <CreateTrip location={null} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { upcomingTrips, pastTrips } = filterTripsByStatus(trips);
  const sortedTrips = sortTripsByDate(showPastTrips ? pastTrips : upcomingTrips);

  const filteredTrips = searchTrips(sortedTrips, searchQuery);

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] w-full ${
        shouldAnimate ? 'animate-fade-in opacity-0' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-6 sm:px-4 sm:py-6 md:py-8 lg:py-12">
        {/* Header Section - Reduced spacing */}
        <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-12">
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <PageHeader
                title="Your Trips"
                description="Manage and explore your planned adventures"
                badge={{
                  text: 'trip',
                  count: filteredTrips.length,
                }}
                shouldAnimate={shouldAnimate}
              />

              {/* Trip type toggle - Reduced text size */}
              <div className="mt-3 flex gap-3 sm:mt-4 sm:gap-4">
                <button
                  onClick={() => setShowPastTrips(false)}
                  className={`text-xs font-medium sm:text-sm ${
                    !showPastTrips
                      ? 'text-green-800 underline decoration-2 underline-offset-4 dark:text-green-100'
                      : 'text-gray-600 hover:text-gray-900 dark:text-green-100/70 dark:hover:text-white'
                  } ${shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:600ms]' : ''}`}
                >
                  Upcoming ({upcomingTrips.length})
                </button>
                <button
                  onClick={() => setShowPastTrips(true)}
                  className={`text-xs font-medium sm:text-sm ${
                    showPastTrips
                      ? 'text-green-800 underline decoration-2 underline-offset-4 dark:text-green-100'
                      : 'text-gray-600 hover:text-gray-900 dark:text-green-100/70 dark:hover:text-white'
                  } ${shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:600ms]' : ''}`}
                >
                  Past ({pastTrips.length})
                </button>
              </div>
            </div>

            <div
              className={`relative max-w-md flex-1 md:max-w-xs ${
                shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:600ms]' : ''
              }`}
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3">
                <Search className="h-4 w-4 text-gray-400 dark:text-green-100/50 sm:h-5 sm:w-5" />
              </div>
              <input
                type="text"
                placeholder="Search trips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white/90 py-1.5 pl-8 pr-4 text-xs text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-white/10 dark:bg-green-800/30 dark:text-green-100 dark:placeholder:text-green-100/50 dark:focus:border-green-400 dark:focus:ring-green-400/20 sm:py-2 sm:pl-10 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Main Content - Adjusted gap */}
        <div
          className={`grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 ${
            shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:600ms]' : ''
          }`}
        >
          {/* Trip List - Reduced padding and rounded corners */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20 sm:rounded-xl">
              {filteredTrips.length > 0 ? (
                <ul className="divide-y divide-gray-100/30 dark:divide-white/10">
                  {filteredTrips.map((trip) => (
                    <li
                      key={trip.tripId}
                      className="p-3 transition-colors hover:bg-white/50 dark:hover:bg-green-800/40 sm:p-4"
                    >
                      <ScrollLink to={`/trips/${trip.tripId}`}>
                        <TripCard trip={trip} destination={trip.destination} />
                      </ScrollLink>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center sm:p-8">
                  <p className="text-sm text-gray-600 dark:text-green-100/70 sm:text-base">
                    No {showPastTrips ? 'past' : 'upcoming'} trips match your search
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Adjusted padding */}
          <div className="w-full lg:col-span-1">
            <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-8">
              <div className="rounded-lg bg-white/70 p-4 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20 sm:rounded-xl sm:p-6">
                <CreateTrip location={null} />
              </div>
              <div className="hidden text-center lg:block">
                <img
                  src="wooster-on-maps-no-bg.png"
                  alt="Wooster"
                  className="mx-auto w-48 opacity-80 transition-opacity duration-200 hover:opacity-100 dark:opacity-60 dark:hover:opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trips;
