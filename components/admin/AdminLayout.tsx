"use client";

import { useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  FolderKanban,
  BarChart3,
  Bell,
  Settings,
  Users,
  BookOpen,
  Briefcase,
  Menu,
  X,
  UserCircle,
  Download,
  Droplet,
  Globe,
  Image as ImageIcon,
  Search,
  Share2,
  Award
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Check authentication
    fetch('/api/auth/verify')
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          setIsAuthenticated(false);
          router.push('/admin/login');
        } else {
          setIsAuthenticated(true);
          setUser(data.user);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        router.push('/admin/login');
      });
  }, [router]);

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-slate-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: MessageSquare, label: 'Messages', href: '/admin/messages', badge: true },
    { icon: Download, label: 'Quotes', href: '/admin/quotes' },
    { icon: FileText, label: 'Homepage', href: '/admin/pages/home' },
    { icon: FileText, label: 'About Us', href: '/admin/pages/about' },
    { icon: BarChart3, label: 'Stats', href: '/admin/stats' },
    { icon: Award, label: 'Why Choose Us', href: '/admin/why-choose-us' },
    { icon: Briefcase, label: 'Solutions', href: '/admin/solutions' },
    { icon: Briefcase, label: 'Services', href: '/admin/services' },
    { icon: FolderKanban, label: 'Projects', href: '/admin/projects' },
    { icon: Users, label: 'Team', href: '/admin/team' },
    { icon: Users, label: 'Clients', href: '/admin/clients' },
    { icon: ImageIcon, label: 'Testimonials', href: '/admin/testimonials' },
    { icon: BookOpen, label: 'Blog', href: '/admin/blog' },
    { icon: Share2, label: 'Social Media', href: '/admin/social' },
    { icon: Search, label: 'SEO Settings', href: '/admin/seo' },
    { icon: Globe, label: 'Site Settings', href: '/admin/settings' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: Bell, label: 'Notifications', href: '/admin/notifications', badge: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950" suppressHydrationWarning>
      {/* Subtle Background - Clean Dashboard Look */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 -z-10" />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-lg ${sidebarOpen
          ? 'translate-x-0'
          : '-translate-x-full lg:translate-x-0'
          } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 via-green-400 to-blue-500 flex items-center justify-center shadow-lg">
                <Droplet className="w-6 h-6 text-slate-900" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-slate-900 dark:text-white">
                  Excel<span className="text-yellow-400">Energy</span>
                </span>
                <span className="text-xs text-slate-500 dark:text-cyan-400">Admin Panel</span>
              </div>
            </motion.div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                      ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-cyan-200 border-l-4 border-blue-500 dark:border-cyan-500'
                      : 'text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-blue-600 dark:hover:text-cyan-200'
                      }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-500 dark:text-cyan-300' : ''}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* User Profile with Settings */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                <UserCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-slate-900 dark:text-white">
                  {user?.username || 'Admin'}
                </p>
                <p className="text-xs text-slate-500 dark:text-cyan-400">Account Settings</p>
              </div>
              <Settings className="w-5 h-5 text-slate-500 dark:text-cyan-300" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Mobile Menu Button - Only visible on mobile */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Page Content */}
        <main className="relative w-full p-4 lg:p-6 min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
          <div className="w-full max-w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/30 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
