import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TripPage from './Trip';
import Trips from './TripsList';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Explore from './Explore';
import DestinationListPage from './DestinationList';
import DestinationSummary from './DestinationSummary';

function AppLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar for Desktop (large and above) */}
      <div className="fixed left-0 top-0 hidden h-full md:block md:w-48 lg:w-64">
        <Sidebar />
      </div>

      {/* Sidebar for Mobile (small and medium screens) */}
      <div className="fixed inset-x-0 bottom-0 z-10 block md:hidden">
        <Sidebar />
      </div>

      {/* Main content area with responsive padding */}
      <div className="flex-1 flex-grow flex-col items-center p-4 pb-16 md:ml-48 md:pb-0 lg:ml-64 lg:pb-0">
        <Routes>
          <Route path="home" element={<Dashboard />} />
          <Route path="trips" element={<Trips />} />
          <Route path="trips/:tripId" element={<TripPage />}>
            <Route path="summary/:destinationId" element={<DestinationSummary />} />
          </Route>
          <Route path="explore" element={<Explore />} />
          <Route path="destinations/:destinationId" element={<DestinationSummary />} />
          <Route path="destination-list" element={<DestinationListPage />} />
          <Route path="settings" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppLayout;
