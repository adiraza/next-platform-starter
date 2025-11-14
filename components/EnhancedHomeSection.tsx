"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Sun, TrendingUp, Award, Users, CheckCircle, Waves, Droplets } from "lucide-react";
import Link from "next/link";
import GetQuoteButton from "./GetQuoteButton";
import { useEffect, useState } from "react";

function WaterBackground() {
    return (
        <>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 opacity-95" />
            <div className="absolute inset-0">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] bg-gradient-to-br from-sky-500/20 via-blue-400/30 to-cyan-400/10 blur-3xl opacity-70 animate-pulse" />
                <div className="absolute -bottom-32 -left-40 w-[45rem] h-[45rem] bg-gradient-to-br from-cyan-400/25 via-sky-300/20 to-blue-500/20 blur-3xl opacity-60 animate-[pulse_6s_ease-in-out_infinite]" />
                <div className="absolute -bottom-10 right-[-10%] w-[55rem] h-[55rem] bg-gradient-to-br from-blue-500/25 via-teal-300/20 to-sky-400/10 blur-[140px] opacity-50 animate-[pulse_7s_ease-in-out_infinite]" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-40 overflow-hidden text-sky-300/40">
                <svg className="relative h-full w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                        fill="currentColor"
                        d="M0,160L80,165.3C160,171,320,181,480,170.7C640,160,800,128,960,138.7C1120,149,1280,203,1360,229.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                    />
                </svg>
            </div>
        </>
    );
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    Zap,
    Users,
    Award,
    TrendingUp,
    Sun,
    CheckCircle,
};

export default function EnhancedHomeSection() {
    const [homeContent, setHomeContent] = useState<{
        hero: {
            badge: string;
            title: string;
            description: string;
            ctaPrimary: { text: string; link: string };
            ctaSecondary: { text: string; link: string };
        };
        stats: Array<{ icon: string; value: string; label: string }>;
        features: Array<{ icon: string; title: string; desc: string }>;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHomeContent();
    }, []);

    const fetchHomeContent = async () => {
        try {
            const res = await fetch('/api/content/home');
            const data = await res.json();
            setHomeContent(data);
        } catch (error) {
            console.error('Error fetching home content:', error);
            // Fallback to default values
            setHomeContent({
                hero: {
                    badge: "Aqua Solar",
                    title: "Dive into the Future of Clean Solar Energy",
                    description: "Fluid design. Powerful technology. Axel Energy delivers seamless solar ecosystems that ripple out cleaner, smarter power for communities across India.",
                    ctaPrimary: { text: "Explore Liquid Services", link: "/services" },
                    ctaSecondary: { text: "Start a Flow Consultation", link: "/contact" }
                },
                stats: [
                    { icon: "Zap", value: "30+ MW", label: "Total Capacity Installed" },
                    { icon: "Users", value: "200+", label: "Happy Clients" },
                    { icon: "Award", value: "10+", label: "Years Experience" },
                    { icon: "TrendingUp", value: "95%", label: "Customer Satisfaction" }
                ],
                features: [
                    { icon: "Sun", title: "Solar Expertise", desc: "Years of experience in solar energy solutions" },
                    { icon: "CheckCircle", title: "Quality Assured", desc: "ISO certified installations and maintenance" },
                    { icon: "Award", title: "Award Winning", desc: "Recognized for excellence in renewable energy" },
                    { icon: "TrendingUp", title: "Growing Fast", desc: "Expanding across India with innovative solutions" }
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading || !homeContent) {
        return (
            <section className="relative min-h-screen flex items-center justify-center">
                <div className="text-cyan-400 animate-pulse">Loading...</div>
            </section>
        );
    }

    const stats = homeContent.stats;
    const features = homeContent.features;

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6 overflow-hidden bg-slate-950 text-white">
            <WaterBackground />
            <motion.div
                className="pointer-events-none absolute inset-0 mix-blend-screen"
                animate={{ opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="absolute left-1/2 top-16 -translate-x-1/2 w-80 h-80 rounded-full bg-cyan-300/20 blur-[100px]" />
                <div className="absolute left-[15%] top-[55%] w-60 h-60 rounded-full bg-sky-400/10 blur-[80px]" />
                <div className="absolute right-[10%] top-[30%] w-72 h-72 rounded-full bg-blue-500/15 blur-[90px]" />
            </motion.div>

            <div className="relative z-10 max-w-6xl mx-auto py-20 md:py-32">
                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.45em] text-cyan-200">
                        <Droplets className="h-4 w-4" />
                        {homeContent.hero.badge}
                    </div>
                    <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6 text-white drop-shadow-[0_8px_30px_rgba(15,118,230,0.45)]">
                        {homeContent.hero.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mx-auto mb-10 max-w-3xl text-base sm:text-lg text-cyan-100/90 leading-relaxed"
                    >
                        {homeContent.hero.description}
                    </motion.p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                >
                    <Link
                        href={homeContent.hero.ctaPrimary.link}
                        className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 px-8 py-3 text-slate-900 font-semibold shadow-lg hover:shadow-2xl transition-all hover:translate-y-[-2px]"
                    >
                        <span>{homeContent.hero.ctaPrimary.text}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href={homeContent.hero.ctaSecondary.link}
                        className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-3 text-white transition-all hover:bg-white/15 hover:border-white/40"
                    >
                        <Waves className="h-5 w-5 text-cyan-200 group-hover:animate-pulse" />
                        {homeContent.hero.ctaSecondary.text}
                    </Link>
                    <GetQuoteButton variant="secondary" />
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {stats.map((stat, idx) => {
                        const Icon = iconMap[stat.icon] || Zap;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 + idx * 0.1, type: "spring" }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="hover-lift rounded-2xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur-md transition-all"
                            >
                                <Icon className="mx-auto mb-3 h-10 w-10 text-cyan-200 drop-shadow-[0_0_15px_rgba(34,211,238,0.35)]" />
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm md:text-base text-cyan-100/80">
                                    {stat.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
                >
                    {features.map((feature, idx) => {
                        const Icon = iconMap[feature.icon] || Sun;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 + idx * 0.1 }}
                                whileHover={{ y: -10, scale: 1.05 }}
                                className="hover-lift rounded-xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur-md transition-all"
                            >
                                <Icon className="mx-auto mb-4 h-12 w-12 text-cyan-200 drop-shadow-[0_0_20px_rgba(14,165,233,0.4)]" />
                                <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                                <p className="text-sm text-cyan-100/80">{feature.desc}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

