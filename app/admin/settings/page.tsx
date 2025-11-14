"use client";

import { useEffect, useState } from 'react';
import { Save, Globe, Mail, Phone, MapPin, Clock, Key, User, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SiteSettings {
  siteName: string;
  logo?: string;
  favicon?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  workingHours: string;
  footerText: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
  seo: {
    siteTitle: string;
    siteDescription: string;
    keywords: string[];
    ogImage?: string;
    twitterHandle?: string;
    googleAnalyticsId?: string;
    facebookPixelId?: string;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'seo' | 'password' | 'account'>('general');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/site-settings');
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await fetch('/api/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
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
            Site Settings
          </h1>
          <p className="text-gray-400 mt-1">Manage your website settings</p>
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

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {[
          { id: 'general', label: 'General', icon: Globe },
          { id: 'contact', label: 'Contact', icon: Mail },
          { id: 'seo', label: 'SEO', icon: Key },
          { id: 'account', label: 'Account', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="liquid-card p-6">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Logo URL</label>
              <input
                type="text"
                value={settings.logo || ''}
                onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Favicon URL</label>
              <input
                type="text"
                value={settings.favicon || ''}
                onChange={(e) => setSettings({ ...settings, favicon: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Footer Text</label>
              <input
                type="text"
                value={settings.footerText}
                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-cyan-200/80 mb-2">
                <Mail className="w-4 h-4" />
                Contact Email
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-cyan-200/80 mb-2">
                <Phone className="w-4 h-4" />
                Contact Phone
              </label>
              <input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-cyan-200/80 mb-2">
                <MapPin className="w-4 h-4" />
                Address
              </label>
              <textarea
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-cyan-200/80 mb-2">
                <Clock className="w-4 h-4" />
                Working Hours
              </label>
              <input
                type="text"
                value={settings.workingHours}
                onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Monday - Friday: 9:00 AM - 6:00 PM"
              />
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Site Title</label>
              <input
                type="text"
                value={settings.seo.siteTitle}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, siteTitle: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Meta Description</label>
              <textarea
                value={settings.seo.siteDescription}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, siteDescription: e.target.value },
                  })
                }
                rows={3}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Google Analytics ID</label>
              <input
                type="text"
                value={settings.seo.googleAnalyticsId || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, googleAnalyticsId: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Facebook Pixel ID</label>
              <input
                type="text"
                value={settings.seo.facebookPixelId || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, facebookPixelId: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Username</label>
              <input
                type="text"
                defaultValue="admin"
                disabled
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Email</label>
              <input
                type="email"
                defaultValue="admin@axelenergy.in"
                disabled
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/50 cursor-not-allowed"
              />
            </div>
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cyan-200/80 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cyan-200/80 mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cyan-200/80 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={async () => {
                    if (newPassword !== confirmPassword) {
                      alert('Passwords do not match');
                      return;
                    }
                    // Password change logic would go here
                    alert('Password change functionality will be implemented');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-sky-500 text-white rounded-xl hover:shadow-lg shadow-cyan-500/30"
                >
                  Update Password
                </motion.button>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-lg font-semibold text-white mb-4">Logout</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                  await fetch('/api/auth/logout', { method: 'POST' });
                  window.location.href = '/admin/login';
                }}
                className="w-full px-6 py-3 bg-red-500/20 text-red-300 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-colors"
              >
                Logout
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
