import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Image, MessageCircle, Activity, AlertTriangle, TrendingUp } from 'lucide-react';
import { api } from '../api';
import type { AdminStats } from '../types';
import { formatNumber } from '../utils';
import { Button } from '../components/ui/Button';

export function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'reports'>('overview');

  useEffect(() => {
    api.getAdminStats().then(setStats);
  }, []);

  if (!stats) return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  );

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { label: 'Total Pins', value: stats.totalPins, icon: Image, color: 'from-purple-500 to-purple-600', change: '+8%' },
    { label: 'Comments', value: stats.totalComments, icon: MessageCircle, color: 'from-green-500 to-green-600', change: '+15%' },
    { label: 'Active Users', value: stats.activeUsers, icon: Activity, color: 'from-amber-500 to-amber-600', change: '+5%' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-[Sora]">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your platform</p>
          </div>
          <div className="flex gap-2">
            {['overview', 'users', 'content', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={20} className="text-white" />
                </div>
                <span className="text-xs font-medium text-green-500 bg-green-50 dark:bg-green-500/20 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{formatNumber(stat.value)}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-primary" />
                Activity Overview
              </h3>
              <div className="space-y-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-8">{day}</span>
                    <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${30 + Math.random() * 70}%` }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary to-rose-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-500" />
                Reported Content ({stats.reportedContent})
              </h3>
              <div className="space-y-3">
                {[
                  { title: 'Spam content detected', severity: 'high' },
                  { title: 'Inappropriate image flagged', severity: 'medium' },
                  { title: 'Copyright complaint', severity: 'high' },
                  { title: 'Misleading content report', severity: 'low' },
                ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        report.severity === 'high' ? 'bg-red-500' : report.severity === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                      }`} />
                      <span className="text-sm">{report.title}</span>
                    </div>
                    <Button variant="ghost" size="sm">Review</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">User Management</h3>
            <p className="text-sm text-slate-500">Manage user accounts, roles, and permissions.</p>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Content Moderation</h3>
            <p className="text-sm text-slate-500">Review and moderate uploaded content.</p>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Reports & Analytics</h3>
            <p className="text-sm text-slate-500">View detailed platform analytics and reports.</p>
          </div>
        )}
      </div>
    </div>
  );
}
