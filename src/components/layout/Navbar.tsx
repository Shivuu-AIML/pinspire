import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Plus, ChevronDown, Sun, Moon, Menu, X, User, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuthStore, useUIStore, useNotificationStore } from '../../stores';
import { Avatar } from '../ui/Modal';
import { cn } from '../../utils';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useUIStore();
  const { unreadCount } = useNotificationStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? '/home' : '/'} className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-rose-400 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.966 1.172-4.966s-.299-.598-.299-1.482c0-1.388.806-2.425 1.808-2.425.853 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.48 1.806 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.282a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.527-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
              </svg>
            </div>
            <span className="text-xl font-bold hidden sm:block font-[Sora]">Pinspire</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for inspiration..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-transparent text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 transition-all focus:outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-700 focus:shadow-lg focus:shadow-primary/10"
              />
            </div>
          </form>

          {/* Right Section */}
          {isAuthenticated ? (
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Mobile Search */}
              <Link to="/search" className="md:hidden p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Search size={20} className="text-slate-600 dark:text-slate-300" />
              </Link>

              <Link
                to="/upload"
                className="hidden sm:flex items-center gap-1.5 px-4 h-9 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
              >
                <Plus size={16} />
                <span className="hidden lg:inline">Create</span>
              </Link>
              <Link to="/upload" className="sm:hidden p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Plus size={20} className="text-slate-600 dark:text-slate-300" />
              </Link>

              {/* Notifications */}
              <Link to="/notifications" className="relative p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Bell size={20} className="text-slate-600 dark:text-slate-300" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {theme === 'light' ? (
                  <Moon size={20} className="text-slate-600" />
                ) : (
                  <Sun size={20} className="text-yellow-400" />
                )}
              </button>

              {/* User Menu */}
              <div ref={menuRef} className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-1 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Avatar src={user?.avatar || ''} alt={user?.displayName || 'User'} size="sm" />
                  <ChevronDown size={14} className={cn('text-slate-400 transition-transform hidden sm:block', showUserMenu && 'rotate-180')} />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                        <p className="font-semibold text-sm">{user?.displayName}</p>
                        <p className="text-xs text-slate-500">@{user?.username}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          to={`/profile/${user?.username}`}
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <User size={16} className="text-slate-400" />
                          My Profile
                        </Link>
                        <Link
                          to="/boards"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <LayoutDashboard size={16} className="text-slate-400" />
                          My Boards
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Settings size={16} className="text-slate-400" />
                          Settings
                        </Link>
                        {user?.role === 'admin' && (
                          <Link
                            to="/admin"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            <LayoutDashboard size={16} className="text-slate-400" />
                            Admin Dashboard
                          </Link>
                        )}
                      </div>
                      <div className="border-t border-slate-100 dark:border-slate-800 py-2">
                        <button
                          onClick={() => { logout(); setShowUserMenu(false); navigate('/'); }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="px-5 py-2 rounded-full text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                Log in
              </Link>
              <Link to="/signup" className="px-5 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25">
                Sign up
              </Link>
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-yellow-400" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
