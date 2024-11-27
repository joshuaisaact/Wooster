import { useEffect } from 'react';

export function useSharedTheme() {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');

    // Cleanup when component unmounts
    return () => {
      // Remove dark mode when leaving shared view
      document.documentElement.classList.remove('dark');

      // Restore user's preference if they were logged in
      const stored = localStorage.getItem('theme');
      if (stored) {
        document.documentElement.classList.toggle('dark', stored === 'dark');
      }
    };
  }, []);
}
