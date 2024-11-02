import { useState } from 'react';
import CreateTrip from '@/components/shared/CreateTrip';
import { TripCard } from '@/components/trip/trip-card';
import { useAppContext } from '@/hooks/useAppContext';
import { Search } from 'lucide-react';
import { sortTripsByDate, filterTripsByStatus, searchTrips } from '@/utils/trips';
import ScrollLink from '@/components/shared/ScrollLink';

function Trips() {
  const { state } = useAppContext();
  const { trips, destinations } = state;
  const [searchQuery, setSearchQuery] = useState('');
  const [showPastTrips, setShowPastTrips] = useState(false);

  // Create a map of destination countries for search
  const destinationCountries = destinations.reduce(
    (acc, dest) => ({
      ...acc,
      [dest.destinationName]: dest.country,
    }),
    {} as Record<string, string>,
  );

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
  const filteredTrips = searchTrips(sortedTrips, searchQuery, destinationCountries);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-6 md:mb-8 lg:mb-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-green-900 dark:text-white/95 md:text-3xl lg:text-4xl">
                  Your Trips
                </h1>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/50 dark:text-green-100">
                  {filteredTrips.length} {filteredTrips.length === 1 ? 'trip' : 'trips'}
                </span>
              </div>
              <p className="mt-2 text-base text-gray-600 dark:text-green-100/70 md:text-lg">
                Manage and explore your planned adventures
              </p>

              {/* Trip type toggle */}
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => setShowPastTrips(false)}
                  className={`text-sm font-medium ${
                    !showPastTrips
                      ? 'text-green-800 underline decoration-2 underline-offset-4 dark:text-green-100'
                      : 'text-gray-600 hover:text-gray-900 dark:text-green-100/70 dark:hover:text-white'
                  }`}
                >
                  Upcoming ({upcomingTrips.length})
                </button>
                <button
                  onClick={() => setShowPastTrips(true)}
                  className={`text-sm font-medium ${
                    showPastTrips
                      ? 'text-green-800 underline decoration-2 underline-offset-4 dark:text-green-100'
                      : 'text-gray-600 hover:text-gray-900 dark:text-green-100/70 dark:hover:text-white'
                  }`}
                >
                  Past ({pastTrips.length})
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md flex-1 md:max-w-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400 dark:text-green-100/50" />
              </div>
              <input
                type="text"
                placeholder="Search trips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white/90 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-white/10 dark:bg-green-800/30 dark:text-green-100 dark:placeholder:text-green-100/50 dark:focus:border-green-400 dark:focus:ring-green-400/20"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Trip List */}
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20">
              {filteredTrips.length > 0 ? (
                <ul className="divide-y divide-gray-100/30 dark:divide-white/10">
                  {filteredTrips.map((trip) => {
                    const destination = destinations.find(
                      (dest) => dest.destinationName === trip.destinationName,
                    );

                    return (
                      <li
                        key={trip.tripId}
                        className="p-4 transition-colors hover:bg-white/50 dark:hover:bg-green-800/40"
                      >
                        <ScrollLink to={`/trips/${trip.tripId}`}>
                          <TripCard trip={trip} destination={destination} />
                        </ScrollLink>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-600 dark:text-green-100/70">
                    No {showPastTrips ? 'past' : 'upcoming'} trips match your search
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-8">
              <div className="rounded-xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20">
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
