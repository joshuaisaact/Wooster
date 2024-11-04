// import { EmailUpdateForm } from '@/components/profile/EmailUpdateForm';
// import { PasswordUpdateForm } from '@/components/profile/PasswordUpdateForm';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { LogoutSection } from '@/components/profile/LogoutSection';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/hooks/useTheme';

function Profile() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full">
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-6 md:mb-8 lg:mb-12">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white/95 sm:text-2xl md:text-3xl lg:text-4xl">
            Account Settings
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-green-100/80 sm:mt-2 sm:text-base md:text-lg">
            Manage your account preferences and security settings
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6 md:space-y-8 lg:col-span-2">
            <div className="rounded-xl shadow-lg backdrop-blur-sm">
              <div className="p-6 md:p-8">
                <div className="space-y-8">
                  {/* <EmailUpdateForm />
                  <Separator />
                  <PasswordUpdateForm /> */}
                  <h2 className="font-semibold tracking-tight text-gray-900 dark:text-white/90">
                    Select theme
                  </h2>
                  <div className={`flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <ThemeToggle />
                    <span className="ml-2 text-sm font-semibold">
                      {isDark ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </div>

                  <Separator />
                  <LogoutSection />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="w-full lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="hidden rounded-xl p-6 text-center shadow-lg backdrop-blur-sm lg:block">
                <img
                  src="/wooster-settings-no-bg-no-table.png"
                  alt="Settings Illustration"
                  className="mx-auto h-auto w-48 opacity-80 transition-opacity duration-200 hover:opacity-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
