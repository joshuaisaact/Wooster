import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutSection() {
  const handleLogout = () => {
    // TODO: Implement logout functionality
    alert('Logging out...');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <LogOut className="h-5 w-5 text-gray-500" />
        <div>
          <h2 className="font-semibold tracking-tight text-gray-900">Sign Out</h2>
          <p className="text-sm text-gray-500">Sign out of your account</p>
        </div>
      </div>

      <Button
        onClick={handleLogout}
        variant="destructive"
        className="w-full transition-colors sm:w-auto"
      >
        Sign Out
      </Button>
    </div>
  );
}
