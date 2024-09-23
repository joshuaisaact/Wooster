import { ReactNode } from 'react';

interface ExploreProps {
  children: ReactNode;
}

function Explore({ children }: ExploreProps) {
  return (
    <div className="text-text container mx-auto px-4">
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

export default Explore;
