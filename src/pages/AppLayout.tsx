import { Route, Routes } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import { initialState, reducer } from '@/store/reducer';
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

function AppLayout() {
  const BASE_URL = 'http://localhost:4000';
  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchTrips() {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await fetch(`${BASE_URL}/tripsdb`);
      const data = await res.json();
      dispatch({ type: 'SET_TRIPS', payload: data });
    } catch (error) {
      console.error('There was an error loading trips:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  async function fetchDestinations() {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await fetch(`${BASE_URL}/destinations`);
      const data = await res.json();
      dispatch({ type: 'SET_DESTINATIONS', payload: data });
    } catch (error) {
      console.error('There was an error loading destinations:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  console.log('Fetched trips and destinations');

  useEffect(() => {
    fetchTrips();
    fetchDestinations();
  }, [dispatch]);

  return (
    <div className="flex min-h-screen">
      <div className="fixed left-0 top-0 h-full w-64 bg-green-700">
        <Sidebar />
      </div>
      <div className="ml-64 flex-1 flex-grow flex-col items-center p-4">
        <Routes>
          <Route path="home" element={<Dashboard />} />
          <Route path="trips" element={<Trips />} />
          <Route path="trips/:tripId" element={<Trip />}>
            <Route path="summary/:destinationId" element={<DestinationSummary />} />
          </Route>
          <Route
            path="explore"
            element={
              <Explore>
                <DestinationList />
              </Explore>
            }
          />
          <Route path="destinations/:destinationId" element={<DestinationSummary />} />
          <Route path="globe" element={<GlobeComponent />} />
          <Route path="destination-list" element={<DestinationFullList />} />
          <Route path="settings" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppLayout;
