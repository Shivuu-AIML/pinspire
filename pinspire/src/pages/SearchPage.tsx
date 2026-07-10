import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock, Filter } from 'lucide-react';
import { api } from '../api';
import type { Pin } from '../types';
import { PinCard } from '../components/pins/PinCard';
import { useDebounce } from '../hooks';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Pin[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [recentSearches, setRecentSearches] = useState<string[]>(
    JSON.parse(localStorage.getItem('recentSearches') || '[]')
  );
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  const trendingSearches = [
    'Minimalist design', 'Mountain landscape', 'AI generated art', 'Modern architecture',
    'Street photography', 'Healthy recipes', 'Interior design', 'Programming setup'
  ];

  const filters = ['All', 'Images', 'Users', 'Boards', 'Categories'];

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return; }
    setIsSearching(true);
    const pins = await api.searchPins(q);
    setResults(pins);
    setIsSearching(false);
  }, []);

  useEffect(() => {
    if (debouncedQuery) doSearch(debouncedQuery);
  }, [debouncedQuery, doSearch]);

  useEffect(() => {
    if (initialQuery) doSearch(initialQuery);
  }, [initialQuery, doSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchParams({ q: query.trim() });
    const updated = [query.trim(), ...recentSearches.filter(s => s !== query.trim())].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    setShowSuggestions(false);
    doSearch(query.trim());
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search for inspiration..."
              className="w-full h-14 pl-12 pr-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-lg border-2 border-transparent transition-all focus:outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-700 focus:shadow-lg focus:shadow-primary/10"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); setResults([]); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            )}
          </form>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && !query && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 mb-6"
              >
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Recent</span>
                      <button onClick={clearRecentSearches} className="text-xs text-primary hover:text-primary-dark">Clear all</button>
                    </div>
                    {recentSearches.slice(0, 5).map((s) => (
                      <button
                        key={s}
                        onClick={() => { setQuery(s); setShowSuggestions(false); setSearchParams({ q: s }); }}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-sm text-left transition-colors"
                      >
                        <Clock size={14} className="text-slate-400 shrink-0" />
                        {s}
                      </button>
                    ))}
                  </div>
                )}
                <div>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-2">Trending</span>
                  {trendingSearches.slice(0, 5).map((s) => (
                    <button
                      key={s}
                      onClick={() => { setQuery(s); setShowSuggestions(false); setSearchParams({ q: s }); }}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-sm text-left transition-colors"
                    >
                      <TrendingUp size={14} className="text-primary shrink-0" />
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filters */}
          <div className="flex items-center justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f.toLowerCase())}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === f.toLowerCase()
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {isSearching ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="skeleton rounded-2xl h-48" />
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="masonry-2 sm:masonry-3 md:masonry-4 lg:masonry-5 gap-4">
            {results.map((pin, i) => (
              <PinCard key={pin.id} pin={pin} index={i} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">No results found</h3>
            <p className="text-slate-500 text-sm">Try different keywords or browse categories</p>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-2">Start searching</h3>
            <p className="text-slate-500 text-sm">Find inspiration for anything you can imagine</p>
          </div>
        )}
      </div>
    </div>
  );
}
