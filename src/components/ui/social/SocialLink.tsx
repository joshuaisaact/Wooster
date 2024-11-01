import { SocialLink as SocialLinkType } from '@/lib/constants/social';

function SocialLink({ icon, href, label }: SocialLinkType) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-fade-in-up flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm text-white opacity-0 transition-all duration-300 [animation-delay:700ms] hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-lg"
    >
      {icon}
      {label}
    </a>
  );
}

export default SocialLink;
