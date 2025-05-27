import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  description?: string;
  value?: string;
  icon?: LucideIcon;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function DashboardCard({ title, description, value, icon: Icon, href, className, children }: DashboardCardProps) {
  const content = (
    <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-primary">{title}</CardTitle>
        {Icon && <Icon className="h-6 w-6 text-accent" />}
      </CardHeader>
      <CardContent>
        {value && <div className="text-3xl font-bold text-foreground">{value}</div>}
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
        {children}
        {href && (
          <div className="mt-4 flex items-center text-sm text-primary hover:underline">
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
