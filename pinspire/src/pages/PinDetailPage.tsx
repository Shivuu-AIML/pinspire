import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Bookmark, Share2, Download, MessageCircle, Send, ArrowLeft, ExternalLink } from 'lucide-react';
import { api } from '../api';
import type { Pin } from '../types';
import { Avatar } from '../components/ui/Modal';
import { PinCard } from '../components/pins/PinCard';
import { formatNumber, timeAgo } from '../utils';

export function PinDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [pin, setPin] = useState<Pin | null>(null);
  const [similarPins, setSimilarPins] = useState<Pin[]>([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([api.getPinDetail(id), api.getSimilarPins(id)]).then(([p, s]) => {
      setPin(p);
      setSimilarPins(s);
      setLoading(false);
    });
  }, [id]);

  if (loading || !pin) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Back Button */}
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back to feed
        </Link>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center min-h-[400px]">
              <img
                src={pin.imageUrl}
                alt={pin.title}
                className="w-full h-full object-contain max-h-[700px]"
              />
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8 flex flex-col">
              {/* Actions */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ExternalLink size={20} className="text-slate-600 dark:text-slate-300" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Share2 size={20} className="text-slate-600 dark:text-slate-300" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Download size={20} className="text-slate-600 dark:text-slate-300" />
                  </motion.button>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className={`p-2.5 rounded-full transition-colors ${
                      pin.isLiked ? 'bg-red-500 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Heart size={20} fill={pin.isLiked ? 'currentColor' : 'none'} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                      pin.isSaved
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                        : 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25'
                    }`}
                  >
                    {pin.isSaved ? 'Saved' : 'Save'}
                  </motion.button>
                </div>
              </div>

              {/* Title & Description */}
              <h1 className="text-2xl sm:text-3xl font-bold font-[Sora] mb-3">{pin.title}</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">{pin.description}</p>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
                <span className="flex items-center gap-1"><Heart size={14} /> {formatNumber(pin.likes)} likes</span>
                <span className="flex items-center gap-1"><Bookmark size={14} /> {formatNumber(pin.saves)} saves</span>
                <span className="flex items-center gap-1"><MessageCircle size={14} /> {pin.comments.length} comments</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {pin.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Creator */}
              <Link
                to={`/profile/${pin.author.username}`}
                className="flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mb-6"
              >
                <Avatar src={pin.author.avatar} alt={pin.author.displayName} size="lg" />
                <div>
                  <p className="font-semibold">{pin.author.displayName}</p>
                  <p className="text-sm text-slate-500">{formatNumber(pin.author.followers)} followers</p>
                </div>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="ml-auto px-4 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Follow
                </button>
              </Link>

              {/* Comments */}
              <div className="flex-1">
                <h3 className="font-semibold mb-3">Comments ({pin.comments.length})</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                  {pin.comments.map((c) => (
                    <div key={c.id} className="flex gap-3">
                      <Avatar src={c.author.avatar} alt={c.author.displayName} size="sm" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{c.author.displayName}</span>
                          <span className="text-xs text-slate-400">{timeAgo(c.createdAt)}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Comment */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 h-10 px-4 rounded-full bg-slate-100 dark:bg-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Similar Pins */}
        {similarPins.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold font-[Sora] mb-6">More like this</h2>
            <div className="masonry-2 sm:masonry-3 md:masonry-4 lg:masonry-5 gap-4">
              {similarPins.map((p, i) => (
                <PinCard key={p.id} pin={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
