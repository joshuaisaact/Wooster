import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative rounded-md bg-white/80 p-2 transition-colors hover:bg-white/90 dark:bg-green-800/30 dark:hover:bg-green-800/40"
      aria-label="Toggle theme"
    >
      <div className="relative grid h-5 w-5 place-items-center">
        <Sun className="absolute rotate-0 scale-100 text-green-900 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute rotate-90 scale-0 text-green-100 transition-all dark:rotate-0 dark:scale-100" />
      </div>
    </button>
  );
}
