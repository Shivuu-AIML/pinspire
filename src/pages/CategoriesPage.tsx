import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api';
import type { Category } from '../types';
import { formatNumber } from '../utils';

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.getCategories().then(setCategories);
  }, []);

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold font-[Sora] mb-3">Explore Categories</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Discover ideas organized by the topics you love
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="group block relative rounded-3xl overflow-hidden aspect-[2/1] bg-slate-200 dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <div>
                      <h3 className="font-bold text-white text-xl">{cat.name}</h3>
                      <p className="text-white/70 text-sm">{formatNumber(cat.pinCount)} pins</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div
                    className="px-3 py-1 rounded-full text-white text-xs font-medium backdrop-blur-sm"
                    style={{ backgroundColor: `${cat.color}cc` }}
                  >
                    Popular
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
