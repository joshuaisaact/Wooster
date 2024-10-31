interface SelectionIndicatorProps {
  className?: string;
}

export function SelectionIndicator({ className = '' }: SelectionIndicatorProps) {
  return (
    <img
      src="/wooster-look-left-no-bg.png"
      alt="Selection indicator"
      className={`absolute right-2 top-2 h-16 w-16 ${className}`}
    />
  );
}
