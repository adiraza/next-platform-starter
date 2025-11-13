"use client";

import { useEffect, useState } from 'react';
import { Mail, Phone, Clock, Trash2, Eye, EyeOff } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'message' | 'consultation';
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch('/api/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: true }),
      });
      setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, read: true });
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading messages...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
          <div className="p-4 border-b border-gray-200 dark:border-slate-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">All Messages</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-slate-700 max-h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No messages yet</div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (!message.read) markAsRead(message.id);
                  }}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedMessage?.id === message.id
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                  } ${!message.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${!message.read ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
                        {message.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                        {message.subject}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {new Date(message.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    {!message.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 ml-2 flex-shrink-0"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
          {selectedMessage ? (
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedMessage.subject}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(selectedMessage.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => markAsRead(selectedMessage.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-400"
                    title={selectedMessage.read ? 'Mark as unread' : 'Mark as read'}
                  >
                    {selectedMessage.read ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                    title="Delete message"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">From</label>
                  <p className="text-gray-900 dark:text-white mt-1">{selectedMessage.name}</p>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Email</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>
                  {selectedMessage.phone && (
                    <div className="flex-1">
                      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Phone</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a
                          href={`tel:${selectedMessage.phone}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {selectedMessage.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Type</label>
                  <p className="mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedMessage.type === 'consultation'
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    }`}>
                      {selectedMessage.type === 'consultation' ? 'Consultation Request' : 'Message'}
                    </span>
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Message</label>
                  <div className="mt-2 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-400">
              <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

