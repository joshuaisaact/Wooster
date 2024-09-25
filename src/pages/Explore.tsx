import { ReactNode } from 'react';

interface ExploreProps {
  children: ReactNode;
}

function Explore({ children }: ExploreProps) {
  return (
    <div className="container mx-auto px-4 text-text">
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

export default Explore;
