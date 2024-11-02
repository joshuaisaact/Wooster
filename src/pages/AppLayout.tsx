// src/components/layout/app-layout.tsx
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
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-white/50 to-green-50/50 antialiased dark:from-green-900/20 dark:via-gray-950 dark:to-green-900/10">
      {/* Desktop Sidebar (md and up) */}
      <div className="fixed left-0 top-0 z-50 hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Bottom Navigation (below md) */}
      <div className="fixed inset-x-0 bottom-0 z-50 block md:hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex min-h-screen flex-col">
        <div className="flex-1 px-4 pb-20 pt-4 md:ml-48 md:pb-4 lg:ml-64">
          <div className="mx-auto max-w-7xl space-y-8">
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
      </main>
    </div>
  );
}

export default AppLayout;
