
import { HeartPulse } from 'lucide-react';
import Link from 'next/link';

interface AppLogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
  colorClassName?: string;
}

export function AppLogo({ className, iconSize = 24, textSize = "text-2xl", colorClassName = "text-primary" }: AppLogoProps) {
  return (
    <Link href="/home" className={`flex items-center gap-2 font-bold ${colorClassName} ${className}`}> {/* Changed from /dashboard/home */}
      <HeartPulse size={iconSize} />
      <span className={textSize}>HealthLink</span>
    </Link>
  );
}
