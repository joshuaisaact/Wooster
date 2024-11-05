import { X } from 'lucide-react';
import { useDemo } from '@/context/useDemoContext';

export function DemoModal() {
  const { isDemo, isDemoModalOpen, closeDemoModal } = useDemo();

  if (!isDemo || !isDemoModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-green-900/95 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Welcome to Wooster Demo</h2>
          <button
            onClick={closeDemoModal}
            className="rounded-full p-1 text-green-100 hover:bg-green-800/50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 text-green-100">
          You're using Wooster in demo mode. You can explore the app but:
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>You can't create new trips</li>
            <li>You can't modify existing trips</li>
            <li>You can't delete anything</li>
          </ul>
          <p className="mt-4">
            This is a read-only demo to showcase the app's features. If you'd like to create trips,
            please make an account.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={closeDemoModal}
            className="rounded-lg bg-green-800/50 px-4 py-2 text-sm text-white hover:bg-green-800/70"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
