import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Trip from './Trip';
import Trips from './Trips';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Explore from './Explore';
import Friends from './Friends';

function AppLayout() {
  const BASE_URL = 'http://localhost:4000';

  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchTrips() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/trips`);
        const data = await res.json();
        setTrips(data);
      } catch (error) {
        alert(`There was an error loading data ${error}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTrips();
  }, []);

  return (
    <div className="relative flex h-full justify-center overscroll-y-none">
      <Sidebar />
      <div className="flex-grow p-4">
        <Routes>
          <Route path="home" element={<Dashboard />} />
          <Route path="trips" element={<Trips trips={trips} />} />
          <Route path="trips/:tripId" element={<Trip trips={trips} />} />
          <Route path="explore" element={<Explore />} />
          <Route path="friends" element={<Friends />} />
          <Route path="settings" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppLayout;
