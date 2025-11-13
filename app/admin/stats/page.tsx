"use client";

import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Stat {
  id: string;
  icon: string;
  value: string;
  suffix?: string;
  label: string;
  order: number;
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/content/stats');
      const data = await res.json();
      setStats(data.sort((a: Stat, b: Stat) => a.order - b.order));
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/content/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stats),
      });
      
      if (response.ok) {
        alert('All stats saved successfully! Changes will reflect on the website.');
        await fetchStats();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving stats:', error);
      alert('Error saving stats');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStat = async (statId: string) => {
    try {
      const response = await fetch('/api/content/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stats),
      });
      
      if (response.ok) {
        const stat = stats.find(s => s.id === statId);
        alert(`Stat "${stat?.label}" updated successfully!`);
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Error updating stat:', error);
      alert('Error updating stat');
    }
  };

  const addStat = () => {
    const newStat: Stat = {
      id: Date.now().toString(),
      icon: 'Zap',
      value: '',
      suffix: '',
      label: '',
      order: stats.length + 1,
    };
    setStats([...stats, newStat]);
  };

  const deleteStat = (id: string) => {
    setStats(stats.filter(s => s.id !== id).map((s, idx) => ({ ...s, order: idx + 1 })));
  };

  if (loading) {
    return <div className="text-center py-12 text-slate-500 dark:text-gray-400 animate-pulse">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Stats Section
          </h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Manage statistics displayed on homepage</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addStat}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Stat
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-sm disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-slate-500 dark:text-gray-400">#{stat.order}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateStat(stat.id)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  title="Update this stat"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteStat(stat.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  title="Delete this stat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Icon Name</label>
                <input
                  type="text"
                  value={stat.icon}
                  onChange={(e) => {
                    const newStats = [...stats];
                    newStats[idx] = { ...newStats[idx], icon: e.target.value };
                    setStats(newStats);
                  }}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Zap, Users, Award, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Value</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => {
                    const newStats = [...stats];
                    newStats[idx] = { ...newStats[idx], value: e.target.value };
                    setStats(newStats);
                  }}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="30+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Suffix (Optional)</label>
                <input
                  type="text"
                  value={stat.suffix || ''}
                  onChange={(e) => {
                    const newStats = [...stats];
                    newStats[idx] = { ...newStats[idx], suffix: e.target.value };
                    setStats(newStats);
                  }}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MW, Years, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const newStats = [...stats];
                    newStats[idx] = { ...newStats[idx], label: e.target.value };
                    setStats(newStats);
                  }}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Total Capacity Installed"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {stats.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-gray-400">No stats yet. Add your first stat!</p>
        </div>
      )}
    </div>
  );
}
