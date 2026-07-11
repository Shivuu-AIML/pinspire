import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, Grid3X3, Bookmark, LayoutGrid } from 'lucide-react';
import { api } from '../api';
import type { User, Pin, Board } from '../types';
import { PinCard } from '../components/pins/PinCard';
import { Avatar } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { formatNumber } from '../utils';

export function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [pins, setPins] = useState<Pin[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [activeTab, setActiveTab] = useState<'created' | 'saved' | 'boards'>('created');
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    Promise.all([api.getUserProfile(username), api.getFeedPins(1, 20), api.getUserBoards()]).then(([u, p, b]) => {
      setUser(u);
      setPins(p);
      setBoards(b);
      setLoading(false);
    });
  }, [username]);

  if (loading || !user) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Banner */}
      <div className="h-48 sm:h-64 bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 relative">
        {user.banner && (
          <img src={user.banner} alt="" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Avatar src={user.avatar} alt={user.displayName} size="xl" className="mx-auto mb-4 ring-4 ring-white dark:ring-slate-950" />
          <h1 className="text-2xl font-bold font-[Sora] flex items-center justify-center gap-2">
            {user.displayName}
            {user.isVerified && (
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            )}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">@{user.username}</p>
          {user.bio && <p className="text-slate-600 dark:text-slate-300 mt-3 max-w-md mx-auto">{user.bio}</p>}
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <span><strong>{formatNumber(user.followers)}</strong> <span className="text-slate-500">followers</span></span>
            <span><strong>{formatNumber(user.following)}</strong> <span className="text-slate-500">following</span></span>
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <Button
              onClick={() => setIsFollowing(!isFollowing)}
              variant={isFollowing ? 'secondary' : 'primary'}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
            <Button variant="ghost"><Share2 size={18} /></Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-1 border-b border-slate-200 dark:border-slate-800 mb-8">
          {[
            { key: 'created' as const, label: 'Created', icon: Grid3X3 },
            { key: 'saved' as const, label: 'Saved', icon: Bookmark },
            { key: 'boards' as const, label: 'Boards', icon: LayoutGrid },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === key
                  ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'boards' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-12">
            {boards.map((board) => (
              <motion.div
                key={board.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Link
                  to={`/boards`}
                  className="group block rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[4/3] relative"
                >
                  {board.coverImage && (
                    <img src={board.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-semibold text-white text-sm">{board.name}</h3>
                    <p className="text-white/60 text-xs">{board.pins.length} pins</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="masonry-2 sm:masonry-3 md:masonry-4 gap-4 pb-12">
            {pins.map((pin, i) => (
              <PinCard key={pin.id} pin={pin} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
