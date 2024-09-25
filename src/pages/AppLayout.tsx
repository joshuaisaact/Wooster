import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Trip from './Trip';
import Trips from './TripsList';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Explore from './Explore';
import DestinationFullList from '@/components/DestinationFullList';
import DestinationList from '@/components/DestinationList';
import DestinationSummary from './DestinationSummary';
import GlobeComponent from './GlobeComponent';
import type { Destination, Trip as Triptype } from '@/types/types';

function AppLayout() {
  const BASE_URL = 'http://localhost:4000';
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [trips, setTrips] = useState<Triptype[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  async function fetchTrips() {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/tripsdb`);
      const data = await res.json();
      setTrips(data);
    } catch (error) {
      console.error(`There was an error loading data:`, error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTrips();
  }, [fetchTrigger]);

  async function fetchDestinations() {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:4000/destinations`);
      const data = await res.json();
      setDestinations(data);
    } catch (error) {
      console.error(`There was an error loading destinations:`, error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDestinations();
  }, []);

  function addNewTrip(newTrip: Triptype) {
    setTrips((prevTrips) => [...prevTrips, newTrip]);
    setFetchTrigger((prev) => prev + 1); // Trigger a new fetch
  }

  function handleAddNewDestination(newDestination: Destination) {
    setDestinations((prevDestinations) => [...prevDestinations, newDestination]);
  }

  function handleRemoveDestination(deletedDestinationId: number) {
    setDestinations((prevDestinations) =>
      prevDestinations.filter((dest) => dest.destination_id !== deletedDestinationId),
    );
  }

  function handleDeleteTrip(deletedTripId: string) {
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.trip_id !== deletedTripId));
    setFetchTrigger((prev) => prev + 1); // Trigger a new fetch
  }

  return (
    <div className="flex min-h-screen">
      <div className="fixed left-0 top-0 h-full w-64 bg-green-700">
        <Sidebar />
      </div>
      <div className="ml-64 flex-1 flex-grow flex-col items-center p-4">
        <Routes>
          <Route
            path="home"
            element={
              <Dashboard
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                handleAddNewDestination={handleAddNewDestination}
                trips={trips}
                destinations={destinations}
                addNewTrip={addNewTrip}
              ></Dashboard>
            }
          />
          <Route
            path="trips"
            element={
              <Trips
                trips={trips}
                destinations={destinations}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                addNewTrip={addNewTrip}
              />
            }
          />
          <Route path="trips/:tripId" element={<Trip trips={trips} destinations={destinations} />}>
            <Route path="summary/:destinationId" element={<DestinationSummary />} />
          </Route>
          <Route
            path="explore"
            element={
              <Explore>
                <DestinationList
                  destinations={destinations}
                  handleAddNewDestination={handleAddNewDestination}
                />
              </Explore>
            }
          />
          <Route
            path="destinations/:destinationId"
            element={
              <DestinationSummary
                destinations={destinations}
                onDeleteDestination={handleRemoveDestination}
                onDeleteTrip={handleDeleteTrip}
                addNewTrip={addNewTrip}
              />
            }
          />
          <Route path="globe" element={<GlobeComponent />} />
          <Route
            path="destination-list"
            element={<DestinationFullList destinations={destinations} isLoading={isLoading} />}
          />
          <Route path="settings" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppLayout;
