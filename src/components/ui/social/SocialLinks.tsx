import SocialLink from './SocialLink';
import { SOCIAL_LINKS } from '@/lib/constants/social';

function SocialLinks() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-6">
      {SOCIAL_LINKS.map((link) => (
        <SocialLink
          key={link.label}
          icon={<link.icon className="h-4 w-4" />}
          href={link.href}
          label={link.label}
        />
      ))}
    </div>
  );
}

export default SocialLinks;
