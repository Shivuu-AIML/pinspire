import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Globe, Bell, Palette } from 'lucide-react';
import { useAuthStore, useUIStore } from '../stores';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Avatar } from '../components/ui/Modal';

export function SettingsPage() {
  const { user, updateProfile } = useAuthStore();
  const { theme, toggleTheme } = useUIStore();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [website, setWebsite] = useState(user?.website || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({ displayName, bio, website });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-bold font-[Sora] mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Profile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm"
          >
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <User size={18} className="text-primary" /> Profile
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <Avatar src={user?.avatar || ''} alt={user?.displayName || ''} size="xl" />
              <div>
                <Button variant="secondary" size="sm">Change photo</Button>
                <p className="text-xs text-slate-400 mt-1">JPG, PNG. Max 5MB</p>
              </div>
            </div>
            <div className="space-y-4">
              <Input
                label="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Tell us about yourself"
                />
              </div>
              <Input
                label="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yoursite.com"
                icon={<Globe size={18} />}
              />
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm"
          >
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Palette size={18} className="text-primary" /> Appearance
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Dark Mode</p>
                <p className="text-xs text-slate-500">Toggle between light and dark themes</p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-primary' : 'bg-slate-300'
                }`}
              >
                <motion.div
                  animate={{ x: theme === 'dark' ? 24 : 2 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                />
              </button>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm"
          >
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Bell size={18} className="text-primary" /> Notifications
            </h2>
            <div className="space-y-4">
              {['Likes on your pins', 'New followers', 'Comments', 'Mentions'].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <span className="text-sm">{item}</span>
                  <button className="relative w-12 h-6 rounded-full bg-primary">
                    <motion.div animate={{ x: 24 }} className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button onClick={handleSave}>
              {saved ? '✓ Saved!' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
