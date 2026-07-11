import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Bookmark, Share2, ExternalLink, MoreHorizontal } from 'lucide-react';
import type { Pin } from '../../types';
import { usePinStore } from '../../stores';
import { Avatar } from '../ui/Modal';
import { formatNumber, cn } from '../../utils';

interface PinCardProps {
  pin: Pin;
  index?: number;
}

export function PinCard({ pin, index = 0 }: PinCardProps) {
  const { toggleLike, toggleSave } = usePinStore();
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const aspectRatio = pin.height && pin.width ? pin.height / pin.width : 1.3;

  return (
    <motion.div
      className="masonry-item group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <Link to={`/pin/${pin.id}`}>
          <div
            className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800"
            style={{ aspectRatio: `1/${aspectRatio}` }}
          >
            {!imgLoaded && !imgError && (
              <div className="absolute inset-0 skeleton" />
            )}
            {imgError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                <span className="text-slate-400 text-sm">Image unavailable</span>
              </div>
            ) : (
              <img
                src={pin.imageUrl}
                alt={pin.title}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={cn(
                  'w-full h-full object-cover transition-transform duration-500',
                  isHovered && 'scale-105',
                  !imgLoaded && 'opacity-0'
                )}
              />
            )}

            {/* Hover Overlay */}
            <div className={cn(
              'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}>
              {/* Top Actions */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-black/70 text-xs font-medium backdrop-blur-sm">
                  {pin.category}
                </span>
                <div className="flex gap-1.5">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.preventDefault(); toggleSave(pin.id); }}
                    className={cn(
                      'p-2 rounded-full backdrop-blur-sm transition-colors',
                      pin.isSaved
                        ? 'bg-primary text-white'
                        : 'bg-white/90 dark:bg-black/70 text-slate-700 dark:text-white hover:bg-white'
                    )}
                  >
                    <Bookmark size={14} fill={pin.isSaved ? 'currentColor' : 'none'} />
                  </motion.button>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                <div className="flex gap-1.5">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.preventDefault(); toggleLike(pin.id); }}
                    className={cn(
                      'p-2 rounded-full backdrop-blur-sm transition-colors flex items-center gap-1',
                      pin.isLiked
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 dark:bg-black/70 text-slate-700 dark:text-white hover:bg-white'
                    )}
                  >
                    <Heart size={14} fill={pin.isLiked ? 'currentColor' : 'none'} />
                    <span className="text-[10px] font-medium">{formatNumber(pin.likes)}</span>
                  </motion.button>
                  <button className="p-2 rounded-full bg-white/90 dark:bg-black/70 text-slate-700 dark:text-white backdrop-blur-sm hover:bg-white transition-colors">
                    <Share2 size={14} />
                  </button>
                </div>
                {pin.link && (
                  <a
                    href={pin.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-white/90 dark:bg-black/70 text-slate-700 dark:text-white backdrop-blur-sm hover:bg-white transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </Link>

        {/* Info Below Image */}
        <div className="mt-2 px-1">
          <Link to={`/pin/${pin.id}`}>
            <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100 line-clamp-2 hover:text-primary transition-colors">
              {pin.title}
            </h3>
          </Link>
          <div className="flex items-center justify-between mt-1.5">
            <Link to={`/profile/${pin.author.username}`} className="flex items-center gap-2 group/author">
              <Avatar src={pin.author.avatar} alt={pin.author.displayName} size="sm" />
              <span className="text-xs text-slate-500 dark:text-slate-400 group-hover/author:text-primary transition-colors">
                {pin.author.displayName}
              </span>
            </Link>
            <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors opacity-0 group-hover:opacity-100">
              <MoreHorizontal size={14} className="text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
