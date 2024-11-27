import { useSharedTheme } from '@/hooks/useSharedTheme';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  useSharedTheme();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50/80 antialiased dark:from-green-900/20 dark:via-gray-950 dark:to-green-900/10">
      <main className="flex min-h-screen flex-col">
        <div className="flex-1 px-4 pb-4 pt-4">
          <div className="mx-auto max-w-7xl space-y-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
