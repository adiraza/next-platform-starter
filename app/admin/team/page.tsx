"use client";

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  level: 'ceo' | 'director' | 'manager' | 'employee';
  photo: string;
  email: string;
  phone?: string;
  linkedin?: string;
  bio: string;
  experience: string;
  achievements?: string[];
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<TeamMember>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/content/team', { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`Failed to fetch team members: ${res.status}`);
      }
      const data = await res.json();
      // Ensure data is an array
      if (Array.isArray(data)) {
        console.log('Admin: Fetched team members:', data.length, data);
        setMembers(data);
      } else {
        console.error('Admin: Invalid data format, expected array:', data);
        setMembers([]);
      }
    } catch (error) {
      console.error('Admin: Error fetching team members:', error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.name || !formData.designation || !formData.department || !formData.email || !formData.bio || !formData.experience) {
      alert('Please fill in all required fields: Name, Designation, Department, Email, Bio, and Experience.');
      return;
    }

    try {
      // Ensure all required fields are present with proper types
      const memberData: TeamMember = {
        id: editing || Date.now().toString(),
        name: formData.name || '',
        designation: formData.designation || '',
        department: formData.department || '',
        level: (formData.level || 'employee') as 'ceo' | 'director' | 'manager' | 'employee',
        photo: formData.photo || '',
        email: formData.email || '',
        phone: formData.phone || '',
        linkedin: formData.linkedin || '',
        bio: formData.bio || '',
        experience: formData.experience || '',
        achievements: formData.achievements || [],
      };

      console.log('Saving team member data:', memberData);

      const response = editing 
        ? await fetch('/api/content/team', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...memberData, id: editing }),
          })
        : await fetch('/api/content/team', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(memberData),
          });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Team member saved successfully:', result);
        alert('Team member saved successfully! Changes will appear on the website.');
        // Force refresh the members list
        setShowForm(false);
        setEditing(null);
        setFormData({});
        // Small delay to ensure server has processed
        setTimeout(async () => {
          await fetchMembers();
        }, 100);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Save failed:', errorData, 'Status:', response.status);
        throw new Error(errorData.error || `Failed to save (Status: ${response.status})`);
      }
    } catch (error) {
      console.error('Error saving team member:', error);
      alert(`Error saving team member: ${error instanceof Error ? error.message : 'Please try again.'}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      const response = await fetch(`/api/content/team?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Team member deleted successfully!');
        await fetchMembers();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      alert(`Error deleting team member: ${error instanceof Error ? error.message : 'Please try again.'}`);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your team members</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setFormData({ level: 'employee' });
          }}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {editing ? 'Edit Team Member' : 'Add New Team Member'}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Designation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.designation || ''}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.department || ''}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Level
              </label>
              <select
                value={formData.level || 'employee'}
                onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="ceo">CEO</option>
                <option value="director">Director</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone (Optional)
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <ImageUpload
                value={formData.photo}
                onChange={(url) => setFormData({ ...formData, photo: url })}
                label="Team Member Photo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Experience <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.experience || ''}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="10+ Years"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                LinkedIn (Optional)
              </label>
              <input
                type="text"
                value={formData.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="linkedin.com/in/username"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.bio || ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                required
              />
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

      {members.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden"
            >
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name || 'Team member'}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {member.name ? member.name.split(' ').map(n => n[0]).join('').toUpperCase() : '?'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name || 'Unnamed Member'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  {member.designation || 'No designation'}
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-xs mb-2">
                  {member.department || 'No department'}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mb-3 font-medium">
                  Level: {member.level ? member.level.charAt(0).toUpperCase() + member.level.slice(1) : 'Employee'}
                </p>
                {member.bio && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                )}
                {member.experience && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Experience: {member.experience}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(member.id);
                      setFormData(member);
                      setShowForm(true);
                    }}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
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
      ) : (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No team members yet. Add your first member!</p>
          <button
            onClick={() => {
              setShowForm(true);
              setEditing(null);
              setFormData({ level: 'employee' });
            }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add First Team Member
          </button>
        </div>
      )}
    </div>
  );
}

