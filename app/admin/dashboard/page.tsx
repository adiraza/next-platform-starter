"use client";

import { useEffect, useState } from 'react';
import { Briefcase, CheckCircle, Users, TrendingUp, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    totalMembers: 0,
    productivity: 0,
  });
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetchData();
    fetchAnalytics();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, teamRes, messagesRes] = await Promise.all([
        fetch('/api/content/projects'),
        fetch('/api/content/team'),
        fetch('/api/messages'),
      ]);

      const projectsData = await projectsRes.json();
      const teamData = await teamRes.json();
      const messagesData = await messagesRes.json();

      const completed = projectsData.filter((p: any) => p.status === 'completed').length;
      const working = projectsData.filter((p: any) => p.status === 'working').length;
      const totalTasks = 132;
      const completedTasks = 28;

      setStats({
        totalProjects: projectsData.length,
        completedProjects: completed,
        totalTasks,
        completedTasks,
        totalMembers: teamData.length,
        productivity: Math.round((completedTasks / totalTasks) * 100),
      });

      setProjects(projectsData.slice(0, 5));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics');
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  // Generate chart data from real analytics
  const getChartData = () => {
    if (!analytics || !analytics.dailyVisitors || analytics.dailyVisitors.length === 0) {
      // Return last 7 days with zero data if no analytics
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

    // Get last 7 days of data
    const last7Days = analytics.dailyVisitors.slice(-7);
    return last7Days.map((day: any) => ({
      name: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      visitors: day.count,
    }));
  };

  const chartData = getChartData();

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-gradient-to-r from-cyan-400 to-sky-500';
    if (progress >= 50) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    return 'bg-gradient-to-r from-red-400 to-pink-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500 dark:text-gray-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-slate-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-gray-400">Total Projects</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats.totalProjects}</p>
              <p className="text-sm text-slate-600 dark:text-gray-300 mt-1">{stats.completedProjects} Completed</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-gray-400">Task</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats.totalTasks}</p>
              <p className="text-sm text-slate-600 dark:text-gray-300 mt-1">{stats.completedTasks} Completed</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-gray-400">Members</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats.totalMembers}</p>
              <p className="text-sm text-slate-600 dark:text-gray-300 mt-1">Active Team</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <Users className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-gray-400">Productivity</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats.productivity}%</p>
              <p className="text-sm text-slate-600 dark:text-gray-300 mt-1">Task Completion</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects Table */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Active Projects</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-slate-500 dark:text-gray-400 border-b border-slate-200 dark:border-slate-700">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Progress</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, idx) => (
                    <motion.tr
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{project.title}</p>
                          <p className="text-sm text-slate-500 dark:text-gray-400">{project.startDate}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress || 0}%` }}
                              transition={{ duration: 1, delay: 0.7 + idx * 0.1 }}
                              className={`h-full ${getProgressColor(project.progress || 0)}`}
                            />
                          </div>
                          <span className="text-sm text-slate-600 dark:text-gray-300">{project.progress || 0}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium text-white ${project.status === 'completed'
                              ? 'bg-green-500/30 border border-green-400/50'
                              : 'bg-blue-500/30 border border-blue-400/50'
                            }`}
                        >
                          {project.status === 'completed' ? 'Completed' : 'On Track'}
                        </span>
                      </td>
                      <td className="py-4">
                        <Link
                          href="/admin/projects"
                          className="text-cyan-400 hover:text-cyan-300 text-sm"
                        >
                          Edit
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/admin/projects"
                className="text-sm text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 transition-colors"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Task Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Task Progress</h3>
          <div className="text-center mb-4">
            <p className="text-4xl font-bold text-slate-900 dark:text-white">64%</p>
          </div>
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-gray-400">Completed</span>
              <span className="font-medium text-slate-900 dark:text-white">8 tasks</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-gray-400">In-Progress</span>
              <span className="font-medium text-slate-900 dark:text-white">12 tasks</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-gray-400">Up Coming</span>
              <span className="font-medium text-slate-900 dark:text-white">14 tasks</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Analytics Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
      >
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Website Traffic (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
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
        <div className="mt-4 text-center text-sm text-slate-600 dark:text-gray-300">
          Total Visitors: {analytics?.totalVisitors || 0}
        </div>
      </motion.div>
    </div>
  );
}
