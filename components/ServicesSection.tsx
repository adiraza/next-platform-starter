"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    Building2,
    Home,
    Monitor,
    CheckCircle,
    ArrowRight,
    Sun,
    Zap,
    Shield,
    TrendingUp,
    Users,
    Clock,
    Award,
    Wrench,
    BarChart3,
    Phone,
    Mail
} from "lucide-react";

interface Service {
    id: string;
    title: string;
    shortDesc: string;
    description: string;
    image?: string;
    features: string[];
    benefits: string[];
    stats: Array<{ label: string; value: string }>;
    process: Array<{ step: number; title: string; description: string }>;
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    Building2,
    Home,
    Monitor,
    Sun,
    Zap,
    Shield,
    TrendingUp,
    Users,
    Clock,
    Award,
    Wrench,
    BarChart3,
};

export default function ServicesSection() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/content/services');
            const data = await res.json();
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
            // Fallback to empty array if API fails
            setServices([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="liquid-section relative py-24 px-4 md:px-8 text-white">
                <div className="text-center">
                    <div className="text-cyan-400 animate-pulse">Loading services...</div>
                </div>
            </section>
        );
    }

    if (services.length === 0) {
        return (
            <section className="liquid-section relative py-24 px-4 md:px-8 text-white">
                <div className="text-center">
                    <p className="text-cyan-200/70">No services available yet.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="liquid-section relative py-24 px-4 md:px-8 text-white">
            <div className="relative z-10 mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center space-y-4"
                >
                    <span className="liquid-badge">Immersive Solutions</span>
                    <h1 className="liquid-heading text-4xl md:text-5xl font-bold">
                        Our Liquid Solar Service Spectrum
                    </h1>
                    <p className="liquid-subheading mx-auto max-w-3xl text-base md:text-lg">
                        Custom-designed solar ecosystems that ripple with efficiency, adapt to every environment, and stay luminous for decades.
                    </p>
                </motion.div>
                {/* Services Grid */}
                <div className="space-y-24 mb-20">
                    {services.map((service, serviceIndex) => {
                        const ServiceIcon = iconMap[service.id === 'commercial' ? 'Building2' : service.id === 'residential' ? 'Home' : 'Monitor'] || Building2;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: serviceIndex * 0.2 }}
                                className="liquid-card overflow-hidden"
                            >
                                {/* Service Header */}
                                <div className="bg-gradient-to-r from-yellow-400/90 via-emerald-500/85 to-sky-500/90 text-white p-8 md:p-12">
                                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                                        {service.image ? (
                                            <div className="relative w-full md:w-64 h-48 md:h-64 rounded-xl overflow-hidden shadow-2xl border-4 border-white/30">
                                                <img
                                                    src={service.image}
                                                    alt={service.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="rounded-xl bg-white/30 p-4 text-slate-900 shadow-lg">
                                                <ServiceIcon className="w-12 h-12" />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <h2 className="text-3xl md:text-4xl font-bold drop-shadow-lg mb-3">
                                                {service.title}
                                            </h2>
                                            <p className="text-lg text-white/85">
                                                {service.shortDesc}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-12 text-white/90">
                                    {/* Description */}
                                    <div className="mb-10">
                                        <p className="text-base md:text-lg leading-relaxed text-cyan-100/85">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Stats Grid */}
                                    {service.stats && service.stats.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
                                            {service.stats.map((stat, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="rounded-xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md"
                                                >
                                                    <div className="text-2xl md:text-3xl font-bold text-yellow-300 mb-1">
                                                        {stat.value}
                                                    </div>
                                                    <div className="text-sm md:text-base text-cyan-100/75">
                                                        {stat.label}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Features & Benefits Grid */}
                                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                                        {/* Key Features */}
                                        {service.features && service.features.length > 0 && (
                                            <div className="space-y-4">
                                                <h3 className="flex items-center gap-2 text-2xl font-semibold text-white">
                                                    <Zap className="w-6 h-6 text-yellow-300" />
                                                    Key Features
                                                </h3>
                                                <ul className="space-y-3">
                                                    {service.features.map((feature, idx) => (
                                                        <motion.li
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: idx * 0.05 }}
                                                            className="flex items-start gap-3 text-cyan-100/85"
                                                        >
                                                            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-300" />
                                                            <span>{feature}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Benefits */}
                                        {service.benefits && service.benefits.length > 0 && (
                                            <div className="space-y-4">
                                                <h3 className="flex items-center gap-2 text-2xl font-semibold text-white">
                                                    <TrendingUp className="w-6 h-6 text-sky-300" />
                                                    Benefits
                                                </h3>
                                                <ul className="space-y-3">
                                                    {service.benefits.map((benefit, idx) => (
                                                        <motion.li
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: idx * 0.05 }}
                                                            className="flex items-start gap-3 text-cyan-100/85"
                                                        >
                                                            <Award className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-400" />
                                                            <span>{benefit}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Process Steps */}
                                    {service.process && service.process.length > 0 && (
                                        <div className="mb-10">
                                            <h3 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-white">
                                                <Clock className="w-6 h-6 text-indigo-300" />
                                                How We Work
                                            </h3>
                                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {service.process.map((step, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: idx * 0.1 }}
                                                        className="relative rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-md transition-shadow hover:shadow-2xl"
                                                    >
                                                        <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 via-emerald-400 to-sky-500 text-slate-900 font-bold text-lg flex items-center justify-center shadow-lg">
                                                            {step.step}
                                                        </div>
                                                        <h4 className="mt-2 text-lg font-semibold text-white">
                                                            {step.title}
                                                        </h4>
                                                        <p className="text-sm leading-relaxed text-cyan-100/85">
                                                            {step.description}
                                                        </p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* CTA Button */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        className="text-center"
                                    >
                                        <a
                                            href="/contact"
                                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 via-green-400 to-sky-500 px-8 py-4 font-semibold text-slate-900 shadow-xl transition hover:shadow-2xl"
                                        >
                                            Get Started with {service.title}
                                            <ArrowRight className="w-5 h-5" />
                                        </a>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Contact CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="liquid-card p-8 md:p-12 text-center"
                >
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Ready to Flow with Solar?
                        </h2>
                        <p className="mx-auto max-w-2xl text-base md:text-lg text-cyan-100/85">
                            Dive into a conversation with our solar architects and discover how fluid energy systems can elevate your operations.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <a
                                href="tel:+919123255388"
                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 via-emerald-400 to-sky-500 px-6 py-3 font-semibold text-slate-900 shadow-xl transition hover:shadow-2xl"
                            >
                                <Phone className="h-5 w-5" />
                                Call Us: +91 9123255388
                            </a>
                            <a
                                href="mailto:contact@excelenergy.in"
                                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
                            >
                                <Mail className="h-5 w-5" />
                                Email Us
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
