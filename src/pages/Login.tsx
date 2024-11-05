import { Logo } from '@/components/layout/Logo';
import { LoginForm } from '@/components/auth/LoginForm';
import SocialLinks from '@/components/ui/social/SocialLinks';
import { IoLogoGithub } from 'react-icons/io5';

export default function Login() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-900 via-green-900/95 to-green-950">
      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center justify-between px-4 py-8 sm:py-12">
        {/* Main Content Section */}
        <div className="animate-fade-in flex w-full flex-1 flex-col items-center justify-center opacity-0">
          <div className="animate-fade-in-up opacity-0 [animation-delay:200ms]">
            <Logo height="h-32" image="/wooster-face-front-no-bg-alt.png" />
          </div>

          <h1 className="animate-fade-in-up mt-6 border-b border-green-500/20 pb-2 text-3xl font-light tracking-wide text-white/95 opacity-0 [animation-delay:400ms] md:text-4xl lg:text-5xl">
            Wooster
          </h1>

          <p className="animate-fade-in-up mt-2 text-base text-green-100 opacity-0 [animation-delay:500ms] md:text-lg">
            Your trip companion
          </p>

          <div className="animate-fade-in-up mb-4 w-full max-w-md py-5 opacity-0 [animation-delay:600ms]">
            <LoginForm />
          </div>

          <p className="animate-fade-in-up mt-10 max-w-sm text-center text-sm text-green-100/80 opacity-0 [animation-delay:700ms]">
            A full-stack portfolio project showcasing modern web development
          </p>

          {/* Job Search Banner */}
          <div className="animate-fade-in-up my-8 flex flex-col items-center gap-4 opacity-0 [animation-delay:800ms] sm:my-10">
            <div className="max-w-[320px] rounded-lg bg-green-800/30 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-green-800/40 sm:max-w-[640px]">
              <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[auto,1fr]">
                <img
                  src="./me.jpg"
                  className="mx-auto h-16 w-16 rounded-full border-2 border-green-200/20 shadow-lg sm:mx-0 sm:h-20 sm:w-20"
                  alt="Profile"
                />
                <div className="text-center sm:text-left">
                  <p className="font-medium text-white">
                    🚀 Software Developer Open to Opportunities
                  </p>
                  <p className="mt-2 text-sm text-green-100">
                    Seeking my next challenge in software development.
                    <span className="hidden sm:inline"> Let's build something exceptional.</span>
                    <span className="sm:hidden"> Ready to build something exceptional.</span>
                  </p>
                </div>
              </div>
            </div>

            <SocialLinks />
          </div>
        </div>

        {/* GitHub Section */}
        <div className="animate-fade-in-up w-full pt-8 opacity-0 [animation-delay:900ms] sm:pt-12">
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-green-100/90">Explore this open-source project</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <a
                href="https://github.com/joshuaisaact/wooster"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-green-800/30 px-4 py-2 text-sm text-green-100 backdrop-blur-sm transition-all duration-300 hover:bg-green-800/40 hover:text-white"
              >
                <IoLogoGithub size={16} />
                Frontend Repository
              </a>
              <a
                href="https://github.com/joshuaisaact/wooster-server"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-green-800/30 px-4 py-2 text-sm text-green-100 backdrop-blur-sm transition-all duration-300 hover:bg-green-800/40 hover:text-white"
              >
                <IoLogoGithub size={16} />
                Backend Repository
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
