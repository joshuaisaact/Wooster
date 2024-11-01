import { Logo } from '@/components/layout/Logo';
import { LoginForm } from '@/components/auth/LoginForm';
import { Globe, Mail } from 'lucide-react';
import { IoLogoGithub } from 'react-icons/io5';

export default function Login() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-green-800 to-green-900 px-4 py-10">
      <div className="animate-fade-in flex flex-col items-center opacity-0">
        <div className="animate-fade-in-up opacity-0 [animation-delay:200ms]">
          <Logo height="h-32" image="/wooster-homepage-no-bg.png" />
        </div>
        <h1 className="animate-fade-in-up mt-6 text-3xl font-black text-white opacity-0 [animation-delay:400ms]">
          Wooster
        </h1>
        <p className="animate-fade-in-up mt-2 text-lg text-green-100 opacity-0 [animation-delay:500ms]">
          Your trip companion
        </p>

        {/* Job Search Banner */}
        <div className="animate-fade-in-up my-6 flex flex-col items-center gap-4 opacity-0 [animation-delay:600ms]">
          <div className="transform rounded-lg bg-white/10 px-6 py-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/15">
            <p className="text-center font-medium text-white">
              🚀 Software Developer Open to Opportunities
            </p>
            <p className="mt-2 text-center text-sm text-green-100">
              I'm currently looking for my next role in software development.
              <br />
              Let's create something impactful together!
            </p>
          </div>

          {/* Contact Links */}
          <div className="flex gap-6">
            <a
              href="https://joshtuddenham.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="animate-fade-in-up flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm text-white opacity-0 transition-all duration-300 [animation-delay:700ms] hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-lg"
            >
              <Globe className="h-4 w-4" />
              Portfolio
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="animate-fade-in-up flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm text-white opacity-0 transition-all duration-300 [animation-delay:800ms] hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg"
            >
              <IoLogoGithub className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="mailto:joshuaisaact@gmail.com"
              className="animate-fade-in-up flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm text-white opacity-0 transition-all duration-300 [animation-delay:900ms] hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </div>
        </div>

        <div className="animate-fade-in-up mt-4 w-full max-w-md opacity-0 [animation-delay:1100ms]">
          <LoginForm />
        </div>

        {/* Project Context */}
        <p className="animate-fade-in-up mt-6 text-sm text-green-100/80 opacity-0 [animation-delay:1000ms]">
          A full-stack portfolio project showcasing modern web development
        </p>
      </div>
    </div>
  );
}
