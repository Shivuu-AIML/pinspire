import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import type { Category } from '../types';
import { MasonryGrid } from '../components/pins/MasonryGrid';

export function HomeFeedPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-6">
        <CategoryPills />
        <MasonryGrid />
      </div>
    </div>
  );
}

function CategoryPills() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.getCategories().then(setCategories);
  }, []);

  return (
    <div className="mb-6 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 pb-2">
        <Link
          to="/home"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium whitespace-nowrap"
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.slug}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium whitespace-nowrap hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <span>{cat.icon}</span>
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
