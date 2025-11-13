"use client";

import { FileText, Home, Users, BarChart3, Award, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const pages = [
  { id: 'home', name: 'Homepage', icon: Home, href: '/admin/pages/home', description: 'Edit hero section, stats, and features' },
  { id: 'about', name: 'About Us', icon: Users, href: '/admin/pages/about', description: 'Edit mission, vision, and milestones' },
  { id: 'stats', name: 'Stats Section', icon: BarChart3, href: '/admin/stats', description: 'Manage statistics displayed on homepage' },
  { id: 'why-choose-us', name: 'Why Choose Us', icon: Award, href: '/admin/why-choose-us', description: 'Manage why choose us section' },
  { id: 'solutions', name: 'Solutions', icon: Briefcase, href: '/admin/solutions', description: 'Manage solutions section' },
];

export default function PagesPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
          Pages Management
        </h1>
        <p className="text-gray-400 mt-1">Edit and manage all website pages</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page, idx) => {
          const Icon = page.icon;
          return (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link
                href={page.href}
                className="liquid-card p-6 block hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{page.name}</h3>
                    <p className="text-xs text-cyan-300/60">{page.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-cyan-400 text-sm">
                  <span>Edit Page</span>
                  <span>→</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
