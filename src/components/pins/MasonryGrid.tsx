import { useEffect } from 'react';
import { usePinStore } from '../../stores';
import { PinCard } from './PinCard';
import { PinSkeleton } from '../ui/Skeleton';
import { useInfiniteScroll } from '../../hooks';

export function MasonryGrid() {
  const { pins, isLoading, hasMore, loadPins, loadMore } = usePinStore();
  const lastElementRef = useInfiniteScroll(loadMore, hasMore);

  useEffect(() => {
    loadPins(true);
  }, [loadPins]);

  return (
    <div>
      <div className="masonry-2 sm:masonry-3 md:masonry-4 lg:masonry-5 xl:masonry-6 gap-4">
        {pins.map((pin, index) => (
          <PinCard key={pin.id} pin={pin} index={index} />
        ))}
        {isLoading && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <PinSkeleton key={`skeleton-${i}`} />
            ))}
          </>
        )}
      </div>
      {hasMore && !isLoading && (
        <div ref={lastElementRef} className="h-10" />
      )}
      {!hasMore && pins.length > 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-sm">You've reached the end of your feed</p>
        </div>
      )}
    </div>
  );
}
