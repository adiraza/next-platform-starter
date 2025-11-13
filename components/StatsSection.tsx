"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Zap, Users, Award, TrendingUp, Sun, CheckCircle } from "lucide-react";

interface Stat {
    id: string;
    icon: string;
    value: string;
    suffix?: string;
    label: string;
    order: number;
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    Zap,
    Users,
    Award,
    TrendingUp,
    Sun,
    CheckCircle,
};

export default function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [stats, setStats] = useState<Stat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/content/stats', { cache: 'no-store' });
            if (!res.ok) {
                throw new Error('Failed to fetch stats');
            }
            const data = await res.json();
            console.log('StatsSection: Fetched', data.length, 'stats');
            setStats(data.sort((a: Stat, b: Stat) => a.order - b.order));
        } catch (error) {
            console.error('Error fetching stats:', error);
            setStats([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="liquid-section relative overflow-hidden py-20">
                <div className="text-center">
                    <div className="text-cyan-400 animate-pulse">Loading stats...</div>
                </div>
            </section>
        );
    }

    // Always show the section, even if empty

    return (
        <section ref={ref} className="liquid-section relative overflow-hidden py-20" style={{ position: 'relative', zIndex: 1 }}>
            <div className="absolute inset-0 opacity-40" style={{ position: 'absolute', zIndex: 0 }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute left-10 top-10 h-72 w-72 rounded-full border border-white/10"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-10 right-10 h-96 w-96 rounded-full border border-white/10"
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 md:px-8" style={{ position: 'relative', zIndex: 50 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center space-y-4"
                    style={{ position: 'relative', zIndex: 51 }}
                >
                    <span className="liquid-badge">Our Achievements</span>
                    <h2 className="liquid-heading text-4xl md:text-5xl font-bold">
                        Our Achievements
                    </h2>
                    <p className="liquid-subheading mx-auto max-w-2xl text-base md:text-lg">
                        Tangible outcomes that prove how fluid solar engineering delivers luminous results.
                    </p>
                </motion.div>

                {stats.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" style={{ position: 'relative', zIndex: 51 }}>
                        {stats.map((stat, idx) => {
                            const Icon = iconMap[stat.icon] || Zap;
                            return (
                                <motion.div
                                    key={stat.id}
                                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                                    whileHover={{ scale: 1.05, y: -8 }}
                                    className="liquid-card cursor-pointer p-6 text-center"
                                    style={{ position: 'relative', zIndex: 100 }}
                                >
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 via-emerald-400 to-sky-500 shadow-lg">
                                        <Icon className="h-8 w-8 text-slate-900" />
                                    </div>
                                    <div className="text-center text-cyan-100/85">
                                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                            {stat.value}
                                            {stat.suffix && <span className="text-xl text-yellow-200/90">{stat.suffix}</span>}
                                        </div>
                                        <div className="text-sm md:text-base text-cyan-100/75">
                                            {stat.label}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12" style={{ position: 'relative', zIndex: 50 }}>
                        <p className="text-cyan-200/70 text-lg">No achievements available yet.</p>
                        <p className="text-cyan-200/50 text-sm mt-2">Add achievements from the admin panel.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
