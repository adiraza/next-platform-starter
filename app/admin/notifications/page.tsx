"use client";

import { useEffect, useState } from 'react';
import { Bell, Mail, MessageSquare, CheckCircle, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'quote' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    // Fetch from messages and quotes to create notifications
    try {
      const [messagesRes, quotesRes] = await Promise.all([
        fetch('/api/messages'),
        fetch('/api/quotes'),
      ]);

      const messages = await messagesRes.json();
      const quotes = await quotesRes.json();

      const notifs: Notification[] = [
        ...messages.slice(0, 5).map((msg: any) => ({
          id: `msg-${msg.id}`,
          type: 'message' as const,
          title: 'New Message',
          message: `${msg.name} sent a message: ${msg.subject}`,
          timestamp: msg.timestamp,
          read: msg.read,
          link: '/admin/messages',
        })),
        ...quotes.slice(0, 5).map((quote: any) => ({
          id: `quote-${quote.id}`,
          type: 'quote' as const,
          title: 'New Quote Request',
          message: `${quote.name} requested a quote`,
          timestamp: quote.timestamp,
          read: false,
          link: '/admin/quotes',
        })),
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      setNotifications(notifs);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading notifications...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Mark All as Read
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
        <div className="divide-y divide-gray-200 dark:divide-slate-700">
          {notifications.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map((notif) => {
              const Icon =
                notif.type === 'message'
                  ? MessageSquare
                  : notif.type === 'quote'
                  ? Mail
                  : Bell;

              return (
                <div
                  key={notif.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors ${
                    !notif.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        notif.type === 'message'
                          ? 'bg-blue-100 dark:bg-blue-900/30'
                          : notif.type === 'quote'
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : 'bg-purple-100 dark:bg-purple-900/30'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          notif.type === 'message'
                            ? 'text-blue-600 dark:text-blue-400'
                            : notif.type === 'quote'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-purple-600 dark:text-purple-400'
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              !notif.read
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {notif.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {new Date(notif.timestamp).toLocaleString()}
                          </p>
                        </div>
                        {!notif.read && (
                          <button
                            onClick={() => markAsRead(notif.id)}
                            className="ml-4 p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600"
                            title="Mark as read"
                          >
                            <CheckCircle className="w-5 h-5 text-gray-400" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

