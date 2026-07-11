import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, UserPlus, Bookmark, AtSign, Check } from 'lucide-react';
import { useNotificationStore } from '../stores';
import { Avatar } from '../components/ui/Modal';
import { timeAgo, cn } from '../utils';

const iconMap = {
  like: { icon: Heart, color: 'text-red-500 bg-red-50 dark:bg-red-500/20' },
  comment: { icon: MessageCircle, color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/20' },
  follow: { icon: UserPlus, color: 'text-green-500 bg-green-50 dark:bg-green-500/20' },
  save: { icon: Bookmark, color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/20' },
  mention: { icon: AtSign, color: 'text-orange-500 bg-orange-50 dark:bg-orange-500/20' },
};

export function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, loadNotifications } = useNotificationStore();

  useEffect(() => { loadNotifications(); }, [loadNotifications]);

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-[Sora]">Notifications</h1>
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-dark transition-colors"
          >
            <Check size={16} /> Mark all as read
          </button>
        </div>

        <div className="space-y-2">
          {notifications.map((notif, i) => {
            const { icon: Icon, color } = iconMap[notif.type];
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => markAsRead(notif.id)}
                className={cn(
                  'flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all',
                  notif.read
                    ? 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    : 'bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/15'
                )}
              >
                <div className="relative">
                  <Avatar src={notif.from.avatar} alt={notif.from.displayName} size="md" />
                  <div className={cn('absolute -bottom-1 -right-1 p-1 rounded-full', color)}>
                    <Icon size={10} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold">{notif.from.displayName}</span>{' '}
                    <span className="text-slate-600 dark:text-slate-400">{notif.message}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{timeAgo(notif.createdAt)}</p>
                </div>
                {!notif.read && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-2" />
                )}
              </motion.div>
            );
          })}

          {notifications.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔔</div>
              <h3 className="text-xl font-bold mb-2">No notifications yet</h3>
              <p className="text-slate-500 text-sm">We'll let you know when something happens</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
