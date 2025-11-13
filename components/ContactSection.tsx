"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import map to avoid SSR issues
const MapSection = dynamic(() => import("@/components/ContactMapSection"), { ssr: false });

export default function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    type: 'message'
                }),
            });
            
            if (response.ok) {
                alert("Thank you for your message! We'll get back to you soon.");
                setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
            } else {
                alert("Error sending message. Please try again.");
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert("Error sending message. Please try again.");
        }
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: "Head Office",
            details: ["Solar Heights, Sector 62", "Noida, Uttar Pradesh, India", "PIN: 201301"],
            color: "from-green-400 to-green-600"
        },
        {
            icon: Phone,
            title: "Phone",
            details: ["+91 9123255388", "+91 9876543210", "Mon-Sat: 9AM-6PM"],
            color: "from-blue-400 to-blue-600"
        },
        {
            icon: Mail,
            title: "Email",
            details: ["info@excelenergy.in", "contact@excelenergy.in", "support@excelenergy.in"],
            color: "from-yellow-400 to-yellow-600"
        },
        {
            icon: Clock,
            title: "Business Hours",
            details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"],
            color: "from-purple-400 to-purple-600"
        }
    ];

    return (
        <section ref={ref} className="liquid-section relative py-24 px-4 md:px-8 text-white">
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 space-y-4"
                >
                    <span className="liquid-badge">Connect With Us</span>
                    <h1 className="liquid-heading text-4xl md:text-5xl lg:text-6xl font-bold">
                        Let’s Flow Toward Clean Energy
                    </h1>
                    <p className="liquid-subheading text-lg md:text-xl max-w-3xl mx-auto">
                        Share your vision and we’ll orchestrate a solar experience that glides seamlessly from concept to reality.
                    </p>
                </motion.div>

                {/* Contact Info Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {contactInfo.map((info, idx) => {
                        const Icon = info.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.3 + idx * 0.1, type: "spring" }}
                                whileHover={{ y: -10, scale: 1.05 }}
                                className="liquid-card p-6 text-center"
                            >
                                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${info.color} shadow-lg`}>
                                    <Icon className="h-8 w-8 text-slate-900" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{info.title}</h3>
                                <ul className="space-y-2">
                                    {info.details.map((detail, i) => (
                                        <li key={i} className="text-sm md:text-base text-cyan-100/80">
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Map and Form Section */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="liquid-card p-8"
                    >
                        <div className="mb-6 flex items-center gap-3">
                            <MessageSquare className="h-8 w-8 text-yellow-300" />
                            <h2 className="text-3xl font-bold text-white">Send Us a Message</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-cyan-100/80">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200/40"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-cyan-100/80">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200/40"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-cyan-100/80">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200/40"
                                    placeholder="+91 9876543210"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-cyan-100/80">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200/40"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-cyan-100/80">
                                    Message *
                                </label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={6}
                                    className="w-full resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200/40"
                                    placeholder="Tell us about your project or inquiry..."
                                />
                            </div>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-400 via-emerald-400 to-sky-500 px-6 py-4 text-lg font-bold text-slate-900 shadow-xl transition hover:shadow-2xl"
                            >
                                <Send className="h-5 w-5" />
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Map Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="liquid-card overflow-hidden"
                    >
                        <div className="border-b border-white/10 p-6">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-8 w-8 text-yellow-300" />
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Our Location</h2>
                                    <p className="text-sm text-cyan-100/80">Solar Heights, Sector 62, Noida, UP</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[320px] sm:h-[380px] md:h-[450px] lg:h-[500px]">
                            <MapSection />
                        </div>
                    </motion.div>
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="liquid-card text-center p-8 md:p-12"
                >
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Go Solar?</h2>
                        <p className="mx-auto max-w-2xl text-base md:text-lg text-cyan-100/85">
                            Let's discuss how we can help you achieve energy independence and significant cost savings.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <a
                                href="tel:+919123255388"
                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 via-emerald-400 to-sky-500 px-8 py-4 font-bold text-slate-900 shadow-xl transition hover:shadow-2xl"
                            >
                                <Phone className="h-5 w-5" />
                                Call Us Now
                            </a>
                            <a
                                href="mailto:info@excelenergy.in"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold text-white transition hover:bg-white/20"
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

