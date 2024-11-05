import { useDemo } from '@/context/useDemoContext';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from './alert-dialog';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';

const withDemoDisabled = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const DemoDisabledComponent: React.FC<P> = (props) => {
    const { isDemo } = useDemo();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setIsDialogOpen(true);
    };

    if (isDemo) {
      return (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <WrappedComponent
              {...(props as P)}
              onClick={handleClick}
              title="This action is disabled in demo mode"
            />
          </AlertDialogTrigger>
          <AlertDialogContent
            className={cn(
              'w-auto max-w-md rounded-lg',
              'bg-white dark:bg-green-800/30',
              'p-6',
              'shadow-lg',
            )}
          >
            <AlertDialogTitle className="text-2xl font-bold text-green-900 dark:text-white">
              Demo Mode Disabled
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-2 text-gray-600 dark:text-green-100/80">
              This action is disabled in demo mode.
            </AlertDialogDescription>

            <Button
              onClick={() => setIsDialogOpen(false)}
              className={cn(
                'rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus-visible:ring focus-visible:ring-green-500/50',
                'dark:bg-green-600 dark:hover:bg-green-700',
              )}
            >
              OK
            </Button>
          </AlertDialogContent>
        </AlertDialog>
      );
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return DemoDisabledComponent;
};

export default withDemoDisabled;
