import { ReactNode } from 'react';
import Header from '@/components/Header';
import CreateDestination from '@/components/CreateDestnation';

interface DashboardProps {
  children: ReactNode;
}

function Dashboard({ children }: DashboardProps) {
  return (
    <div className="text-text flex h-full flex-col items-center pt-10">
      <Header>Dashboard</Header>
      <h2 className="text-2xl font-bold">Welcome back, Josh!</h2>
      <div className="grid w-full max-w-7xl grid-cols-1 gap-8 pt-10 lg:grid-cols-3">
        {/* Main content area - two-thirds width */}
        <div className="space-y-7 lg:col-span-2">
          <div className="bg-background min-h-[600px] rounded-lg p-6 shadow-md">
            {/* Placeholder for main dashboard content */}
            <p>No content to display.</p>
          </div>
        </div>

        {/* Sidebar - one-third width */}
        <div className="space-y-10 lg:col-span-1">
          <div className="max-w-max rounded-lg bg-white p-6 shadow-md">
            {/* Placeholder for additional widgets or controls */}
            {children}
          </div>
          <div className="max-w-max rounded-lg bg-white p-6 shadow-md">
            {/* Another section for widgets */}
            <CreateDestination />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
