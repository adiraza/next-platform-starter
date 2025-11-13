"use client";

import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Solution {
  id: string;
  title: string;
  desc: string;
  order: number;
}

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    try {
      const res = await fetch('/api/content/solutions');
      const data = await res.json();
      setSolutions(data.sort((a: Solution, b: Solution) => a.order - b.order));
    } catch (error) {
      console.error('Error fetching solutions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/content/solutions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(solutions),
      });
      
      if (response.ok) {
        alert('All solutions saved successfully! Changes will reflect on the website.');
        await fetchSolutions();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving solutions:', error);
      alert('Error saving solutions');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateSolution = async (solutionId: string) => {
    try {
      const response = await fetch('/api/content/solutions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(solutions),
      });
      
      if (response.ok) {
        const solution = solutions.find(s => s.id === solutionId);
        alert(`Solution "${solution?.title}" updated successfully!`);
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Error updating solution:', error);
      alert('Error updating solution');
    }
  };

  const addSolution = () => {
    const newSolution: Solution = {
      id: Date.now().toString(),
      title: '',
      desc: '',
      order: solutions.length + 1,
    };
    setSolutions([...solutions, newSolution]);
  };

  const deleteSolution = (id: string) => {
    setSolutions(solutions.filter(s => s.id !== id).map((s, idx) => ({ ...s, order: idx + 1 })));
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
            Solutions Section
          </h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Manage solutions displayed on homepage</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addSolution}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Solution
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
        {solutions.map((solution, idx) => (
          <motion.div
            key={solution.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-slate-500 dark:text-gray-400">#{solution.order}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateSolution(solution.id)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  title="Update this solution"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteSolution(solution.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  title="Delete this solution"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={solution.title}
                  onChange={(e) => {
                    const newSolutions = [...solutions];
                    newSolutions[idx] = { ...newSolutions[idx], title: e.target.value };
                    setSolutions(newSolutions);
                  }}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Commercial Solar"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={solution.desc}
                  onChange={(e) => {
                    const newSolutions = [...solutions];
                    newSolutions[idx] = { ...newSolutions[idx], desc: e.target.value };
                    setSolutions(newSolutions);
                  }}
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enterprise-grade solar solutions for large-scale installations"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {solutions.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-gray-400">No solutions yet. Add your first solution!</p>
        </div>
      )}
    </div>
  );
}
