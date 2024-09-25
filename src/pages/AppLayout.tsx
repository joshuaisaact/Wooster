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
import type { Destination, Trip as Triptype } from '@/types/types';

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

  function addNewTrip(newTrip: Triptype) {
    dispatch({ type: 'ADD_TRIP', payload: newTrip });
  }

  function handleAddNewDestination(newDestination: Destination) {
    dispatch({ type: 'ADD_DESTINATION', payload: newDestination });
  }

  function handleRemoveDestination(deletedDestinationId: number) {
    dispatch({ type: 'REMOVE_DESTINATION', payload: deletedDestinationId });
  }

  function handleDeleteTrip(deletedTripId: string) {
    dispatch({ type: 'REMOVE_TRIP', payload: deletedTripId });
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
                isLoading={state.isLoading}
                dispatch={dispatch}
                handleAddNewDestination={handleAddNewDestination}
                trips={state.trips}
                destinations={state.destinations}
                addNewTrip={addNewTrip}
              ></Dashboard>
            }
          />
          <Route
            path="trips"
            element={
              <Trips
                trips={state.trips}
                destinations={state.destinations}
                isLoading={state.isLoading}
                addNewTrip={addNewTrip}
              />
            }
          />
          <Route
            path="trips/:tripId"
            element={<Trip trips={state.trips} destinations={state.destinations} />}
          >
            <Route path="summary/:destinationId" element={<DestinationSummary />} />
          </Route>
          <Route
            path="explore"
            element={
              <Explore>
                <DestinationList
                  destinations={state.destinations}
                  handleAddNewDestination={handleAddNewDestination}
                />
              </Explore>
            }
          />
          <Route
            path="destinations/:destinationId"
            element={
              <DestinationSummary
                state={state}
                onDeleteDestination={handleRemoveDestination}
                onDeleteTrip={handleDeleteTrip}
                addNewTrip={addNewTrip}
                dispatch={dispatch}
              />
            }
          />
          <Route path="globe" element={<GlobeComponent />} />
          <Route
            path="destination-list"
            element={
              <DestinationFullList destinations={state.destinations} isLoading={state.isLoading} />
            }
          />
          <Route path="settings" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppLayout;
