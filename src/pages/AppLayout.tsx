import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Trip from './Trip';
import Trips from './Trips';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Explore from './Explore';
import Friends from './Friends';
import Header from '@/components/Header';
import CreateTrip from '@/components/CreateTrip';
import DestinationList from '@/components/DestinationList';
import DestinationSummary from './DestinationSummary';
import GlobeComponent from './GlobeComponent';
import CreateDestination from '@/components/CreateDestnation';
import type { Destination, Trip as Triptype } from '@/types/types';

function AppLayout() {
  const BASE_URL = 'http://localhost:4000';
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  async function fetchTrips() {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/trips`);
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

  return (
    <div className="relative flex h-full justify-center overscroll-y-none">
      <Sidebar />
      <div className="flex-grow flex-col items-center p-4">
        <Routes>
          <Route
            path="home"
            element={
              <Dashboard>
                <CreateTrip
                  addNewTrip={addNewTrip}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </Dashboard>
            }
          />
          <Route
            path="trips"
            element={
              <Trips
                trips={trips}
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
                <Header>Explore</Header>
                <DestinationList
                  destinations={destinations}
                  handleAddNewDestination={handleAddNewDestination}
                />
              </Explore>
            }
          />
          <Route
            path="destinations/:destinationId"
            element={<DestinationSummary destinations={destinations} />}
          />
          <Route path="globe" element={<GlobeComponent />} />
          <Route path="friends" element={<Friends />} />
          <Route path="settings" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppLayout;
