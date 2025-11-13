"use client";

import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, RefreshCw, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutContent {
  mission: string;
  vision: string;
  goal: string;
  milestones: string[];
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  locations: Array<{
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  }>;
}

export default function AboutPageEditor() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [geocoding, setGeocoding] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content/about');
      const data = await res.json();
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
    try {
      // Using Nominatim (OpenStreetMap) geocoding service
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
        {
          headers: {
            'User-Agent': 'ExcelEnergy-Admin/1.0'
          }
        }
      );
      const data = await response.json();
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  const handleGeocodeLocation = async (locationId: string) => {
    if (!content) return;
    const location = content.locations.find(loc => loc.id === locationId);
    if (!location || !location.address) {
      alert('Please enter an address first');
      return;
    }

    setGeocoding({ ...geocoding, [locationId]: true });
    const coords = await geocodeAddress(location.address);
    
    if (coords) {
      const newLocations = content.locations.map(loc =>
        loc.id === locationId
          ? { ...loc, latitude: coords.lat, longitude: coords.lng }
          : loc
      );
      setContent({ ...content, locations: newLocations });
      alert(`Coordinates found: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
    } else {
      alert('Could not find coordinates for this address. Please check the address and try again.');
    }
    setGeocoding({ ...geocoding, [locationId]: false });
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    try {
      const response = await fetch('/api/content/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      
      if (response.ok) {
        alert('All About Us content saved successfully!');
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

  const handleUpdateSection = async (sectionName: string) => {
    if (!content) return;
    try {
      const response = await fetch('/api/content/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      
      if (response.ok) {
        alert(`${sectionName} updated successfully!`);
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Error updating section:', error);
      alert('Error updating section');
    }
  };

  const handleUpdateMilestone = async (milestoneIndex: number) => {
    if (!content) return;
    try {
      const response = await fetch('/api/content/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      
      if (response.ok) {
        alert(`Milestone updated successfully!`);
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Error updating milestone:', error);
      alert('Error updating milestone');
    }
  };

  const handleUpdateLocation = async (locationId: string) => {
    if (!content) return;
    const location = content.locations.find(loc => loc.id === locationId);
    if (!location) return;

    // Auto-geocode if coordinates are missing
    if ((!location.latitude || !location.longitude) && location.address) {
      await handleGeocodeLocation(locationId);
    }

    try {
      const response = await fetch('/api/content/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      
      if (response.ok) {
        alert(`Location "${location.name}" updated successfully!`);
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Error updating location:', error);
      alert('Error updating location');
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
            Edit About Us Page
          </h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Update about us content</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-sm disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save All Changes'}
        </motion.button>
      </motion.div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        {/* Mission Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Mission</h2>
            <button
              onClick={() => handleUpdateSection('Mission')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Update
            </button>
          </div>
          <textarea
            value={content.mission}
            onChange={(e) => setContent({ ...content, mission: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Vision Section */}
        <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Vision</h2>
            <button
              onClick={() => handleUpdateSection('Vision')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Update
            </button>
          </div>
          <textarea
            value={content.vision}
            onChange={(e) => setContent({ ...content, vision: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Goal Section */}
        <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Goal</h2>
            <button
              onClick={() => handleUpdateSection('Goal')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Update
            </button>
          </div>
          <textarea
            value={content.goal}
            onChange={(e) => setContent({ ...content, goal: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Milestones Section */}
        <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Milestones</h2>
            <button
              onClick={() => {
                setContent({
                  ...content,
                  milestones: [...content.milestones, ''],
                });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Milestone
            </button>
          </div>

          {content.milestones.map((milestone, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={milestone}
                onChange={(e) => {
                  const newMilestones = [...content.milestones];
                  newMilestones[idx] = e.target.value;
                  setContent({ ...content, milestones: newMilestones });
                }}
                className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter milestone"
              />
              <button
                onClick={() => handleUpdateMilestone(idx)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                title="Update this milestone"
              >
                <RefreshCw className="w-4 h-4" />
                Update
              </button>
              <button
                onClick={() => {
                  const newMilestones = content.milestones.filter((_, i) => i !== idx);
                  setContent({ ...content, milestones: newMilestones });
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                title="Delete this milestone"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Contact Info Section */}
        <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Contact Information</h2>
            <button
              onClick={() => handleUpdateSection('Contact Information')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Update
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Address</label>
              <input
                type="text"
                value={content.contactInfo.address}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contactInfo: { ...content.contactInfo, address: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Phone</label>
              <input
                type="text"
                value={content.contactInfo.phone}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contactInfo: { ...content.contactInfo, phone: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={content.contactInfo.email}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contactInfo: { ...content.contactInfo, email: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Solar Presence Across India Section */}
        <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Solar Presence Across India</h2>
            <button
              onClick={() => {
                setContent({
                  ...content,
                  locations: [
                    ...content.locations,
                    { id: Date.now().toString(), name: '', address: '', latitude: 0, longitude: 0 },
                  ],
                });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Location
            </button>
          </div>

          {content.locations.map((location, idx) => (
            <div key={location.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Location Name</label>
                  <input
                    type="text"
                    value={location.name}
                    onChange={(e) => {
                      const newLocations = [...content.locations];
                      newLocations[idx] = { ...newLocations[idx], name: e.target.value };
                      setContent({ ...content, locations: newLocations });
                    }}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Delhi, Mumbai"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Address</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={location.address}
                      onChange={(e) => {
                        const newLocations = [...content.locations];
                        newLocations[idx] = { ...newLocations[idx], address: e.target.value };
                        setContent({ ...content, locations: newLocations });
                      }}
                      className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Delhi, India"
                    />
                    <button
                      onClick={() => handleGeocodeLocation(location.id)}
                      disabled={geocoding[location.id] || !location.address}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
                      title="Get coordinates from address"
                    >
                      <MapPin className="w-4 h-4" />
                      {geocoding[location.id] ? '...' : 'Find'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={location.latitude || ''}
                    onChange={(e) => {
                      const newLocations = [...content.locations];
                      newLocations[idx] = { ...newLocations[idx], latitude: parseFloat(e.target.value) || 0 };
                      setContent({ ...content, locations: newLocations });
                    }}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="28.6139"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={location.longitude || ''}
                    onChange={(e) => {
                      const newLocations = [...content.locations];
                      newLocations[idx] = { ...newLocations[idx], longitude: parseFloat(e.target.value) || 0 };
                      setContent({ ...content, locations: newLocations });
                    }}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="77.2090"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <button
                    onClick={() => handleUpdateLocation(location.id)}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                    title="Update this location"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Update
                  </button>
                  <button
                    onClick={() => {
                      const newLocations = content.locations.filter((_, i) => i !== idx);
                      setContent({ ...content, locations: newLocations });
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    title="Delete this location"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {location.latitude && location.longitude && (
                <div className="text-xs text-slate-500 dark:text-gray-400">
                  ✓ Coordinates set: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
