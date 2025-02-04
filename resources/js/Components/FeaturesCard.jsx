'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';

export default memo(function FeaturesCard({
  icon,
  title,
  description,
  className,
}) {
  return (
    <div className={cn(
      "flex flex-col items-left text-left rounded-lg border bg-card p-6 shadow-xs transition-all hover:shadow-md",
      className
    )}>
      <div className="h-12 w-12 text-primary text-3xl">
        {icon}
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
});

