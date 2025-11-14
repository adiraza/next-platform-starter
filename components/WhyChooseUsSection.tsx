"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Shield, Clock, Award, Headphones, Zap, Leaf } from "lucide-react";

interface WhyChooseUs {
    id: string;
    icon: string;
    title: string;
    description: string;
    color: string;
    order: number;
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    Award,
    Shield,
    Clock,
    Headphones,
    Zap,
    Leaf,
};

export default function WhyChooseUsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [reasons, setReasons] = useState<WhyChooseUs[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReasons();
    }, []);

    const fetchReasons = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/content/why-choose-us', { cache: 'no-store' });
            if (!res.ok) {
                throw new Error('Failed to fetch reasons');
            }
            const data = await res.json();
            console.log('WhyChooseUsSection: Fetched', data.length, 'items');
            setReasons(data.sort((a: WhyChooseUs, b: WhyChooseUs) => a.order - b.order));
        } catch (error) {
            console.error('Error fetching reasons:', error);
            setReasons([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="liquid-section relative overflow-hidden py-24">
                <div className="text-center">
                    <div className="text-cyan-400 animate-pulse">Loading...</div>
                </div>
            </section>
        );
    }

    // Always show the section, even if empty

    return (
        <section ref={ref} className="liquid-section relative overflow-hidden py-24" style={{ position: 'relative', zIndex: 1 }}>
            <div className="relative mx-auto max-w-7xl px-4 md:px-8" style={{ position: 'relative', zIndex: 50 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center space-y-4"
                    style={{ position: 'relative', zIndex: 51 }}
                >
                    <span className="liquid-badge">Why Axel Energy</span>
                    <h2 className="liquid-heading text-4xl md:text-5xl font-bold">
                        Crafted for Flow, Built for Brilliance
                    </h2>
                    <p className="liquid-subheading mx-auto max-w-2xl text-base md:text-lg">
                        Precision engineering, resilient infrastructure, and immersive service keep your solar currents steady.
                    </p>
                </motion.div>

                {reasons.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" style={{ position: 'relative', zIndex: 50 }}>
                        {reasons.map((reason, idx) => {
                            const Icon = iconMap[reason.icon] || Award;
                            return (
                                <motion.div
                                    key={reason.id}
                                    initial={{ opacity: 0, y: 50, rotateX: -15 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                                    whileHover={{ y: -10, scale: 1.05 }}
                                    className="liquid-card p-8"
                                    style={{ position: 'relative', zIndex: 100 }}
                                >
                                    <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${reason.color} shadow-xl`}>
                                        <Icon className="h-8 w-8 text-slate-900" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                                    <p className="text-sm leading-relaxed text-cyan-100/80">{reason.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12" style={{ position: 'relative', zIndex: 50 }}>
                        <p className="text-cyan-200/70 text-lg">No items available yet.</p>
                        <p className="text-cyan-200/50 text-sm mt-2">Add items from the admin panel.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
