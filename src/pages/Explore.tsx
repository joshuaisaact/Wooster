import { ReactNode } from 'react';

interface ExploreProps {
  children: ReactNode;
}

function Explore({ children }: ExploreProps) {
  return <div className="flex h-full flex-col items-center pt-10">{children}</div>;
}

export default Explore;
