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
import DestinationDetail from '@/components/DestinationDetail';

function AppLayout() {
  const BASE_URL = 'http://localhost:4000';

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

  function addNewTrip(newTrip) {
    setTrips((prevTrips) => [...prevTrips, newTrip]);
    setFetchTrigger((prev) => prev + 1); // Trigger a new fetch
  }

  return (
    <div className="relative flex h-full justify-center overscroll-y-none">
      <Sidebar />
      <div className="flex-grow p-4">
        <Routes>
          <Route
            path="home"
            element={
              <Dashboard>
                <Header>Dashboard</Header>
                <CreateTrip
                  baseURL={BASE_URL}
                  addNewTrip={addNewTrip}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </Dashboard>
            }
          />
          <Route path="trips" element={<Trips trips={trips} />} />
          <Route path="trips/:tripId" element={<Trip trips={trips} />}>
            <Route path="summary/:destinationId" element={<DestinationDetail />} />
          </Route>
          <Route
            path="explore"
            element={
              <Explore baseURL={BASE_URL}>
                <Header>Explore</Header>
                <DestinationList />
              </Explore>
            }
          />
          <Route path="destinations/:destinationId" element={<DestinationDetail />} />
          <Route path="friends" element={<Friends />} />
          <Route path="settings" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppLayout;
