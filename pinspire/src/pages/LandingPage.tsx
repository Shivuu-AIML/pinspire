import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Sparkles, TrendingUp, Zap, Globe } from 'lucide-react';
import { api } from '../api';
import { PinCard } from '../components/pins/PinCard';
import type { Pin, Category } from '../types';
import { formatNumber } from '../utils';

export function LandingPage() {
  const [featuredPins, setFeaturedPins] = useState<Pin[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.getTrendingPins().then(setFeaturedPins);
    api.getCategories().then(setCategories);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const trendingTopics = [
    { name: 'AI Art', color: 'from-purple-500 to-pink-500' },
    { name: 'Minimal Home', color: 'from-amber-500 to-orange-500' },
    { name: 'Street Photography', color: 'from-blue-500 to-cyan-500' },
    { name: 'UI Design Systems', color: 'from-green-500 to-emerald-500' },
    { name: 'Plant Based', color: 'from-lime-500 to-green-500' },
    { name: 'Abstract Art', color: 'from-rose-500 to-red-500' },
    { name: 'Mountain Travel', color: 'from-sky-500 to-blue-500' },
    { name: 'Modern Architecture', color: 'from-slate-500 to-gray-500' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 pt-20 pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles size={16} />
              Discover what inspires you
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-[Sora] leading-tight mb-6">
              Find ideas that
              <span className="text-gradient block">inspire you</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">
              Explore billions of ideas for every part of your life. From home decor to fashion, food to travel.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for anything..."
                  className="w-full h-14 pl-14 pr-32 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-base placeholder-slate-400 transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-xl shadow-slate-200/50 dark:shadow-black/20"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Stats */}
            <div className="flex justify-center gap-8 sm:gap-12">
              {[
                { label: 'Pins', value: '250K+' },
                { label: 'Users', value: '15K+' },
                { label: 'Boards', value: '50K+' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold font-[Sora]">{stat.value}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={20} className="text-primary" />
            <h2 className="text-xl font-bold font-[Sora]">Trending Now</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {trendingTopics.map((topic, i) => (
              <motion.div
                key={topic.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/search?q=${encodeURIComponent(topic.name)}`}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${topic.color} text-white text-sm font-medium whitespace-nowrap hover:shadow-lg transition-all hover:scale-105`}
                >
                  {topic.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pins */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold font-[Sora]">Trending Pins</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Discover what the community is loving right now</p>
            </div>
            <Link
              to="/signup"
              className="hidden sm:flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
            >
              See more <ArrowRight size={16} />
            </Link>
          </div>
          <div className="masonry-2 sm:masonry-3 md:masonry-4 lg:masonry-5 gap-4">
            {featuredPins.slice(0, 12).map((pin, i) => (
              <PinCard key={pin.id} pin={pin} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-500 text-sm font-medium mb-4">
              <Globe size={16} />
              Browse Categories
            </div>
            <h2 className="text-3xl font-bold font-[Sora] mb-3">Explore by Category</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Find inspiration in the areas that matter most to you
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="group block relative rounded-2xl overflow-hidden aspect-[3/2] bg-slate-200 dark:bg-slate-800"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cat.icon}</span>
                      <div>
                        <h3 className="font-semibold text-white text-sm">{cat.name}</h3>
                        <p className="text-white/60 text-[10px]">{formatNumber(cat.pinCount)} pins</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap size={16} />
              Join the community
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-[Sora] mb-4">
              Start building your creative world
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto">
              Create boards, save ideas, and share your vision with millions of people on Pinspire.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-colors shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 active:scale-100"
              >
                Get Started — It's Free
              </Link>
              <Link
                to="/home"
                className="px-8 py-3.5 rounded-full border-2 border-slate-200 dark:border-slate-700 font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                Explore as Guest
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
