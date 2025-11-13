"use client";

import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface WhyChooseUs {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  order: number;
}

export default function WhyChooseUsPage() {
  const [items, setItems] = useState<WhyChooseUs[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/content/why-choose-us');
      const data = await res.json();
      setItems(data.sort((a: WhyChooseUs, b: WhyChooseUs) => a.order - b.order));
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/content/why-choose-us', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });
      
      if (response.ok) {
        alert('All Why Choose Us content saved successfully! Changes will reflect on the website.');
        await fetchItems();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateItem = async (itemId: string) => {
    try {
      const response = await fetch('/api/content/why-choose-us', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });
      
      if (response.ok) {
        const item = items.find(i => i.id === itemId);
        alert(`Item "${item?.title}" updated successfully!`);
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Error updating item');
    }
  };

  const addItem = () => {
    const newItem: WhyChooseUs = {
      id: Date.now().toString(),
      icon: 'Award',
      title: '',
      description: '',
      color: 'from-yellow-400 to-yellow-600',
      order: items.length + 1,
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id).map((i, idx) => ({ ...i, order: idx + 1 })));
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
            Why Choose Us
          </h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Manage why choose us section</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addItem}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
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
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-slate-500 dark:text-gray-400">#{item.order}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateItem(item.id)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  title="Update this item"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  title="Delete this item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Icon</label>
                <input
                  type="text"
                  value={item.icon}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[idx] = { ...newItems[idx], icon: e.target.value };
                    setItems(newItems);
                  }}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Award, Shield, Clock, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[idx] = { ...newItems[idx], title: e.target.value };
                    setItems(newItems);
                  }}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Award Winning"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[idx] = { ...newItems[idx], description: e.target.value };
                    setItems(newItems);
                  }}
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Recognized for excellence in renewable energy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Color Gradient</label>
                <input
                  type="text"
                  value={item.color}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[idx] = { ...newItems[idx], color: e.target.value };
                    setItems(newItems);
                  }}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="from-yellow-400 to-yellow-600"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-gray-400">No items yet. Add your first item!</p>
        </div>
      )}
    </div>
  );
}
