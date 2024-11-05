import { useDemo } from '@/context/useDemoContext';
import { ButtonProps } from 'react-day-picker';

export function DemoButton({ onClick, children, ...props }: ButtonProps) {
  const { isDemo } = useDemo();

  if (isDemo) {
    return (
      <button
        className="flex cursor-not-allowed items-center gap-2 rounded-lg bg-green-800/30 px-4 py-2 text-sm opacity-50"
        disabled
        {...props}
      >
        {children}
        <span className="text-xs">(Demo)</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg bg-green-800/30 px-4 py-2 text-sm hover:bg-green-800/40"
      {...props}
    >
      {children}
    </button>
  );
}
