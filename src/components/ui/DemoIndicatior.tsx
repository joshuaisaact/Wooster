import { useDemo } from '@/context/useDemoContext';

export function DemoIndicator() {
  const { isDemo } = useDemo();

  if (!isDemo) return null;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 bg-green-800/30 p-2 text-center text-sm text-green-100 backdrop-blur-sm">
      You're viewing Wooster in demo mode. Some features are disabled.
    </div>
  );
}
