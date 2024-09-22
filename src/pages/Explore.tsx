import { ReactNode } from 'react';

interface ExploreProps {
  children: ReactNode;
}

function Explore({ children }: ExploreProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">{children}</div>
    </div>
  );
}

export default Explore;
