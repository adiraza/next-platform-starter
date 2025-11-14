"use client";

import { useEffect, useState } from 'react';
import { Save, Facebook, Twitter, Linkedin, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SocialMedia {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  whatsapp?: string;
}

export default function SocialMediaPage() {
  const [social, setSocial] = useState<SocialMedia>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSocial();
  }, []);

  const fetchSocial = async () => {
    try {
      const res = await fetch('/api/social');
      const data = await res.json();
      setSocial(data);
    } catch (error) {
      console.error('Error fetching social media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/social', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(social),
      });
      alert('Social media links saved successfully!');
    } catch (error) {
      console.error('Error saving social media:', error);
      alert('Error saving social media');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-cyan-400 animate-pulse">Loading...</div>;
  }

  const socialLinks = [
    { key: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/axelenergy' },
    { key: 'twitter', label: 'Twitter', icon: Twitter, placeholder: 'https://twitter.com/axelenergy' },
    { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/company/axelenergy' },
    { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/axelenergy' },
    { key: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/@axelenergy' },
    { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, placeholder: '+91 9876543210' },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            Social Media Links
          </h1>
          <p className="text-gray-400 mt-1">Manage your social media profiles</p>
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

      <div className="liquid-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <div key={link.key}>
                <label className="flex items-center gap-2 text-sm font-medium text-cyan-200/80 mb-2">
                  <Icon className="w-5 h-5" />
                  {link.label}
                </label>
                <input
                  type="text"
                  value={social[link.key as keyof SocialMedia] || ''}
                  onChange={(e) =>
                    setSocial({
                      ...social,
                      [link.key]: e.target.value,
                    })
                  }
                  placeholder={link.placeholder}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

