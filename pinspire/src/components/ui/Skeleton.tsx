import { cn } from '../../utils';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn('skeleton rounded-xl', className)} />
      ))}
    </div>
  );
}

export function PinSkeleton() {
  return (
    <div className="masonry-item">
      <div className="skeleton rounded-2xl" style={{ height: Math.floor(Math.random() * 200) + 200 }} />
      <div className="mt-2 space-y-2">
        <div className="skeleton h-4 w-3/4 rounded-lg" />
        <div className="flex items-center gap-2">
          <div className="skeleton h-6 w-6 rounded-full" />
          <div className="skeleton h-3 w-1/3 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-4 p-8">
      <div className="skeleton h-32 w-32 rounded-full mx-auto" />
      <div className="skeleton h-6 w-48 rounded-lg mx-auto" />
      <div className="skeleton h-4 w-32 rounded-lg mx-auto" />
    </div>
  );
}
