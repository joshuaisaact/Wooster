import { ReactNode } from 'react';

interface DashboardProps {
  children: ReactNode;
}

function Dashboard({ children }: DashboardProps) {
  return <div className="flex h-full flex-col items-center pt-10">{children}</div>;
}
export default Dashboard;
