import { ReactNode } from 'react';
import Header from '@/components/Header';

interface DashboardProps {
  children: ReactNode;
}

function Dashboard({ children }: DashboardProps) {
  return (
    <div className="flex h-full flex-col items-center pt-10">
      <Header>Dashboard</Header>
      <h2>Welcome back, Josh!</h2>
      <div className="flex h-full flex-row gap-10 pt-10">{children}</div>
    </div>
  );
}
export default Dashboard;
