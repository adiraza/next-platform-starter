"use client";

import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, X, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeContent {
  hero: {
    badge: string;
    title: string;
    description: string;
    ctaPrimary: { text: string; link: string };
    ctaSecondary: { text: string; link: string };
  };
  stats: Array<{ icon: string; value: string; label: string }>;
  features: Array<{ icon: string; title: string; desc: string }>;
}

export default function HomePageEditor() {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content/home');
      const data = await res.json();
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    try {
      const response = await fetch('/api/content/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      
      if (response.ok) {
        alert('All homepage content saved successfully!');
        // Refresh the page content to ensure sync
        await fetchContent();
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

  const handleUpdateStat = async (statIndex: number) => {
    if (!content) return;
    try {
      const response = await fetch('/api/content/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      
      if (response.ok) {
        alert(`Stat "${content.stats[statIndex].label}" updated successfully!`);
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Error updating stat:', error);
      alert('Error updating stat');
    }
  };

  const handleUpdateFeature = async (featureIndex: number) => {
    if (!content) return;
    try {
      const response = await fetch('/api/content/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      
      if (response.ok) {
        alert(`Feature "${content.features[featureIndex].title}" updated successfully!`);
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Error updating feature:', error);
      alert('Error updating feature');
    }
  };

  if (loading || !content) {
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
            Edit Homepage
          </h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Update homepage content</p>
        </div>
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
      </motion.div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        {/* Hero Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Hero Section</h2>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Badge Text</label>
            <input
              type="text"
              value={content.hero.badge}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, badge: e.target.value },
                })
              }
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={content.hero.title}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, title: e.target.value },
                })
              }
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              value={content.hero.description}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, description: e.target.value },
                })
              }
              rows={3}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Primary CTA Text</label>
              <input
                type="text"
                value={content.hero.ctaPrimary.text}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: {
                      ...content.hero,
                      ctaPrimary: { ...content.hero.ctaPrimary, text: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Primary CTA Link</label>
              <input
                type="text"
                value={content.hero.ctaPrimary.link}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: {
                      ...content.hero,
                      ctaPrimary: { ...content.hero.ctaPrimary, link: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Secondary CTA Text</label>
              <input
                type="text"
                value={content.hero.ctaSecondary.text}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: {
                      ...content.hero,
                      ctaSecondary: { ...content.hero.ctaSecondary, text: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Secondary CTA Link</label>
              <input
                type="text"
                value={content.hero.ctaSecondary.link}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: {
                      ...content.hero,
                      ctaSecondary: { ...content.hero.ctaSecondary, link: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Stats Section</h2>
            <button
              onClick={() => {
                setContent({
                  ...content,
                  stats: [...content.stats, { icon: 'Zap', value: '', label: '' }],
                });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Stat
            </button>
          </div>

          {content.stats.map((stat, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Icon</label>
                <input
                  type="text"
                  value={stat.icon}
                  onChange={(e) => {
                    const newStats = [...content.stats];
                    newStats[idx] = { ...newStats[idx], icon: e.target.value };
                    setContent({ ...content, stats: newStats });
                  }}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Zap, Users, Award, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Value</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => {
                    const newStats = [...content.stats];
                    newStats[idx] = { ...newStats[idx], value: e.target.value };
                    setContent({ ...content, stats: newStats });
                  }}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="30+ MW"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const newStats = [...content.stats];
                    newStats[idx] = { ...newStats[idx], label: e.target.value };
                    setContent({ ...content, stats: newStats });
                  }}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Total Capacity Installed"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => handleUpdateStat(idx)}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  title="Update this stat"
                >
                  <RefreshCw className="w-4 h-4" />
                  Update
                </button>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    const newStats = content.stats.filter((_, i) => i !== idx);
                    setContent({ ...content, stats: newStats });
                  }}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  title="Delete this stat"
                >
                  <Trash2 className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Features Section</h2>
            <button
              onClick={() => {
                setContent({
                  ...content,
                  features: [...content.features, { icon: 'Sun', title: '', desc: '' }],
                });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </button>
          </div>

          {content.features.map((feature, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Icon</label>
                <input
                  type="text"
                  value={feature.icon}
                  onChange={(e) => {
                    const newFeatures = [...content.features];
                    newFeatures[idx] = { ...newFeatures[idx], icon: e.target.value };
                    setContent({ ...content, features: newFeatures });
                  }}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sun, CheckCircle, Award, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => {
                    const newFeatures = [...content.features];
                    newFeatures[idx] = { ...newFeatures[idx], title: e.target.value };
                    setContent({ ...content, features: newFeatures });
                  }}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Solar Expertise"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Description</label>
                <input
                  type="text"
                  value={feature.desc}
                  onChange={(e) => {
                    const newFeatures = [...content.features];
                    newFeatures[idx] = { ...newFeatures[idx], desc: e.target.value };
                    setContent({ ...content, features: newFeatures });
                  }}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Years of experience in solar energy solutions"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => handleUpdateFeature(idx)}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  title="Update this feature"
                >
                  <RefreshCw className="w-4 h-4" />
                  Update
                </button>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    const newFeatures = content.features.filter((_, i) => i !== idx);
                    setContent({ ...content, features: newFeatures });
                  }}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  title="Delete this feature"
                >
                  <Trash2 className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
