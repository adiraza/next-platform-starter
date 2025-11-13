"use client";

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import ImageUpload from '@/components/admin/ImageUpload';

interface Testimonial {
  id: string;
  name: string;
  company: string;
  designation?: string;
  photo?: string;
  rating: number;
  testimonial: string;
  project?: string;
  timestamp: string;
  featured: boolean;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Testimonial>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await fetch('/api/testimonials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editing, ...formData }),
        });
      } else {
        await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, featured: false }),
        });
      }
      fetchTestimonials();
      setEditing(null);
      setShowForm(false);
      setFormData({});
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Error saving testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  if (loading) {
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
            Testimonials
          </h1>
          <p className="text-gray-400 mt-1">Manage client testimonials</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setFormData({ rating: 5, featured: false });
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-sky-500 text-white px-6 py-3 rounded-xl hover:shadow-lg shadow-cyan-500/30"
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </motion.button>
      </motion.div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              {editing ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
                setFormData({});
              }}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Company</label>
              <input
                type="text"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Designation</label>
              <input
                type="text"
                value={formData.designation || ''}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.rating || 5}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div className="md:col-span-2">
              <ImageUpload
                value={formData.photo}
                onChange={(url) => setFormData({ ...formData, photo: url })}
                label="Client Photo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Project</label>
              <input
                type="text"
                value={formData.project || ''}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-cyan-200/80 mb-2">Testimonial</label>
              <textarea
                value={formData.testimonial || ''}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured || false}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded"
              />
              <label className="text-sm text-cyan-200/80">Featured</label>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-sky-500 text-white px-6 py-3 rounded-xl hover:shadow-lg shadow-cyan-500/30"
            >
              <Save className="w-4 h-4" />
              Save
            </motion.button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
                setFormData({});
              }}
              className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 text-white"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="liquid-card p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                <p className="text-sm text-cyan-300/70">{testimonial.company}</p>
                {testimonial.designation && (
                  <p className="text-xs text-cyan-400/60">{testimonial.designation}</p>
                )}
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-cyan-100/80 mb-4 line-clamp-4">{testimonial.testimonial}</p>
            {testimonial.featured && (
              <span className="inline-block px-2 py-1 bg-yellow-400/20 text-yellow-300 text-xs rounded mb-4">
                Featured
              </span>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditing(testimonial.id);
                  setFormData(testimonial);
                  setShowForm(true);
                }}
                className="flex-1 px-3 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="px-3 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 text-sm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No testimonials yet. Add your first testimonial!</p>
        </div>
      )}
    </div>
  );
}

