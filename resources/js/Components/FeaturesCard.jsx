'use client';

import { memo } from 'react';
import { cn } from '@/Components/lib/utils';
import { Icon } from '@iconify/react';
import { Card } from '@/Components/shadcn/ui/card';

export default memo(function FeaturesCard({
  icon,
  title,
  description,
  href,
  className,
}) {
  return (
    <Card asChild>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex flex-col gap-4 p-6 hover:bg-accent/50 transition-colors",
          className
        )}
      >
        <Icon icon={icon} className="h-12 w-12 text-primary" />
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </a>
    </Card>
  );
});

