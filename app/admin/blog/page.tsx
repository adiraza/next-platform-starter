"use client";

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image?: string;
  author: string;
  publishedAt: string;
  published: boolean;
  tags: string[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await fetch('/api/blog', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editing, ...formData }),
        });
      } else {
        await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: Date.now().toString() }),
        });
      }
      fetchPosts();
      setEditing(null);
      setShowForm(false);
      setFormData({});
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your blog posts</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setFormData({ published: false, tags: [], author: 'Admin' });
          }}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus className="w-5 h-5" />
          Add Post
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {editing ? 'Edit Post' : 'Add New Post'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
                setFormData({});
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt || ''}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Content
              </label>
              <textarea
                value={formData.content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>

            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              label="Blog Post Image"
            />

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.published || false}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Published</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
                setFormData({});
              }}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden"
          >
            {post.image && (
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                {post.published ? (
                  <Eye className="w-5 h-5 text-green-500" />
                ) : (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(post.id);
                    setFormData(post);
                    setShowForm(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex-1"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No blog posts yet. Add your first post!</p>
        </div>
      )}
    </div>
  );
}

