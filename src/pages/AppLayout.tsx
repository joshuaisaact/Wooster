import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Trip from './Trip';
import Trips from './TripsList';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Explore from './Explore';
import DestinationFullList from '@/components/DestinationFullList';
import DestinationSummary from './DestinationSummary';

function AppLayout() {
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
          <Route path="explore" element={<Explore />} />
          <Route path="destinations/:destinationId" element={<DestinationSummary />} />
          <Route path="destination-list" element={<DestinationFullList />} />
          <Route path="settings" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppLayout;
