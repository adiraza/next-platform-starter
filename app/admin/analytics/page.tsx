"use client";

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Eye, MousePointerClick } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    // Refresh analytics every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics');
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate real chart data from analytics
  const getDailyData = () => {
    if (!analytics || !analytics.dailyVisitors || analytics.dailyVisitors.length === 0) {
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push({
          name: date.toLocaleDateString('en-US', { weekday: 'short' }),
          visitors: 0,
        });
      }
      return days;
    }

    const last7Days = analytics.dailyVisitors.slice(-7);
    return last7Days.map((day: any) => ({
      name: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      visitors: day.count,
    }));
  };

  const getPageViewsData = () => {
    if (!analytics || !analytics.pageViews || analytics.pageViews.length === 0) {
      return [
        { name: 'Home', views: 0 },
        { name: 'Services', views: 0 },
        { name: 'Projects', views: 0 },
        { name: 'About', views: 0 },
        { name: 'Contact', views: 0 },
      ];
    }
    return analytics.pageViews;
  };

  const dailyData = getDailyData();
  const pageViewsData = getPageViewsData();
  const totalVisitors = analytics?.totalVisitors || 0;
  const dailyAverage = dailyData.length > 0
    ? Math.round(dailyData.reduce((sum: number, day: any) => sum + day.visitors, 0) / dailyData.length)
    : 0;
  const totalPageViews = pageViewsData.reduce((sum: number, page: any) => sum + (page.views || 0), 0);

  if (loading) {
    return <div className="text-center py-12 text-cyan-400 animate-pulse">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
          Analytics
        </h1>
        <p className="text-gray-400 mt-1">Real-time website performance and statistics</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="liquid-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-cyan-200/70">Total Visitors</p>
              <p className="text-3xl font-bold text-white mt-2">{totalVisitors}</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Users className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="liquid-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-cyan-200/70">Daily Average</p>
              <p className="text-3xl font-bold text-white mt-2">{dailyAverage}</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="liquid-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-cyan-200/70">Page Views</p>
              <p className="text-3xl font-bold text-white mt-2">{totalPageViews}</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Eye className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="liquid-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-cyan-200/70">Bounce Rate</p>
              <p className="text-3xl font-bold text-white mt-2">
                {totalVisitors > 0 ? Math.round((totalVisitors - totalPageViews) / totalVisitors * 100) : 0}%
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <MousePointerClick className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="liquid-card p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Daily Visitors (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={{ r: 5, fill: '#22d3ee' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="liquid-card p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Page Views</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pageViewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="views" fill="#22d3ee" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
