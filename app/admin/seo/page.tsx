"use client";

import { useEffect, useState } from 'react';
import { Save, Search, Globe, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import ImageUpload from '@/components/admin/ImageUpload';

interface SEOSettings {
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
  ogImage?: string;
  twitterHandle?: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
}

export default function SEOPage() {
  const [seo, setSeo] = useState<SEOSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    fetchSEO();
  }, []);

  const fetchSEO = async () => {
    try {
      const res = await fetch('/api/seo');
      const data = await res.json();
      setSeo(data);
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!seo) return;
    setSaving(true);
    try {
      await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seo),
      });
      alert('SEO settings saved successfully!');
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      alert('Error saving SEO settings');
    } finally {
      setSaving(false);
    }
  };

  const addKeyword = () => {
    if (newKeyword.trim() && seo) {
      setSeo({
        ...seo,
        keywords: [...seo.keywords, newKeyword.trim()],
      });
      setNewKeyword('');
    }
  };

  if (loading || !seo) {
    return <div className="text-center py-12 text-cyan-400 animate-pulse">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            SEO Settings
          </h1>
          <p className="text-gray-400 mt-1">Optimize your website for search engines</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-sky-500 text-white px-6 py-3 rounded-xl hover:shadow-lg shadow-cyan-500/30 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </motion.div>

      <div className="liquid-card p-6 space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-cyan-200/80 mb-2">
            <Globe className="w-4 h-4" />
            Site Title
          </label>
          <input
            type="text"
            value={seo.siteTitle}
            onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Excel Energy | Solar Solutions"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-cyan-200/80 mb-2">
            <Search className="w-4 h-4" />
            Meta Description
          </label>
          <textarea
            value={seo.siteDescription}
            onChange={(e) => setSeo({ ...seo, siteDescription: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Powering a greener future with sustainable solar energy systems."
          />
          <p className="text-xs text-cyan-300/60 mt-1">{seo.siteDescription.length}/160 characters</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-cyan-200/80 mb-2">Keywords</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              placeholder="Add keyword"
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              onClick={addKeyword}
              className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-xl hover:bg-cyan-500/30"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {seo.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm flex items-center gap-2"
              >
                {keyword}
                <button
                  onClick={() => {
                    setSeo({
                      ...seo,
                      keywords: seo.keywords.filter((_, i) => i !== idx),
                    });
                  }}
                  className="hover:text-red-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ImageUpload
              value={seo.ogImage}
              onChange={(url) => setSeo({ ...seo, ogImage: url })}
              label="OG Image (Open Graph)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cyan-200/80 mb-2">Twitter Handle</label>
            <input
              type="text"
              value={seo.twitterHandle || ''}
              onChange={(e) => setSeo({ ...seo, twitterHandle: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="@excelenergy"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cyan-200/80 mb-2">Google Analytics ID</label>
            <input
              type="text"
              value={seo.googleAnalyticsId || ''}
              onChange={(e) => setSeo({ ...seo, googleAnalyticsId: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="G-XXXXXXXXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cyan-200/80 mb-2">Facebook Pixel ID</label>
            <input
              type="text"
              value={seo.facebookPixelId || ''}
              onChange={(e) => setSeo({ ...seo, facebookPixelId: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="1234567890"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

