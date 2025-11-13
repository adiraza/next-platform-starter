"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// ✅ dynamically import map (Leaflet doesn't work on SSR)
const MapSection = dynamic(() => import("@/components/MapSection"), { ssr: false });

const data = [
    { year: 2018, growth: 10 },
    { year: 2019, growth: 25 },
    { year: 2020, growth: 40 },
    { year: 2021, growth: 65 },
    { year: 2022, growth: 85 },
    { year: 2023, growth: 95 },
    { year: 2024, growth: 100 },
];

export default function AboutUsSection() {
    const [aboutContent, setAboutContent] = useState<{
        mission: string;
        vision: string;
        goal: string;
        milestones: string[];
        contactInfo: {
            address: string;
            phone: string;
            email: string;
        };
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAboutContent();
    }, []);

    const fetchAboutContent = async () => {
        try {
            const res = await fetch('/api/content/about');
            const data = await res.json();
            setAboutContent(data);
        } catch (error) {
            console.error('Error fetching about content:', error);
            // Fallback to default values
            setAboutContent({
                mission: "Flowing toward a decarbonized future by deploying hyper-efficient solar systems that empower communities, elevate businesses, and preserve the planet's delicate balance.",
                vision: "To be India's leading solar energy solutions provider, transforming how businesses and communities harness clean energy.",
                goal: "Deliver 100 MW+ of liquid solar capacity by 2030 while delivering premium experiences, sustainable outcomes, and constant innovation for every client we serve.",
                milestones: [
                    "200+ solar orchestrations completed nationwide",
                    "Ranked Top 10 Green Energy Innovators (2023)",
                    "ISO-certified excellence & audit-ready operations",
                    "Strategic alliances with major industrial & government leaders"
                ],
                contactInfo: {
                    address: "Solar Heights, Sector 62, Noida, UP, India",
                    phone: "+91 9876543210",
                    email: "info@excelenergy.in"
                }
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading || !aboutContent) {
        return (
            <section className="liquid-section relative py-24 px-6 md:px-16 text-white">
                <div className="text-center">
                    <div className="text-cyan-400 animate-pulse">Loading...</div>
                </div>
            </section>
        );
    }

    return (
        <section id="about" className="liquid-section relative py-24 px-6 md:px-16 text-white">
            <div className="relative z-10 mx-auto max-w-7xl space-y-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-5"
                >
                    <span className="liquid-badge">About Excel Energy</span>
                    <h2 className="liquid-heading text-4xl sm:text-5xl font-bold">
                        Liquid-Smooth Solar Transformation
                    </h2>
                    <p className="liquid-subheading mx-auto max-w-3xl text-base sm:text-lg">
                        We craft fluid energy ecosystems that blend cutting-edge solar technology with sustainable artistry—moving effortlessly from concept to impact.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="grid gap-6 md:grid-cols-2"
                >
                    <div className="liquid-card p-8">
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-2xl font-semibold text-white">Our Mission</h3>
                            <p className="text-sm leading-relaxed text-cyan-100/85">
                                {aboutContent.mission}
                            </p>
                        </div>
                    </div>
                    <div className="liquid-card p-8">
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-2xl font-semibold text-white">Our Vision</h3>
                            <p className="text-sm leading-relaxed text-cyan-100/85">
                                {aboutContent.vision}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="liquid-card p-8"
                >
                    <div className="relative z-10 space-y-4">
                        <h3 className="text-2xl font-semibold text-white">Our Goal</h3>
                        <p className="text-sm leading-relaxed text-cyan-100/85">
                            {aboutContent.goal}
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="liquid-card p-10 space-y-4"
                >
                    <div className="relative z-10 space-y-6">
                        <h3 className="text-2xl font-semibold text-white">Our Milestones</h3>
                        <ul className="grid gap-3 text-sm text-cyan-100/80 md:grid-cols-2">
                            {aboutContent.milestones.map((milestone, idx) => (
                                <li key={idx}>• {milestone}</li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="grid gap-8 md:grid-cols-2 items-center"
                >
                    <MapSection />
                    <div className="liquid-card p-8">
                        <div className="relative z-10 space-y-4 text-center">
                            <h3 className="text-2xl font-semibold text-white">Growth Wave (Yearly)</h3>
                            <ResponsiveContainer width="100%" height={320}>
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(226,232,240,0.15)" />
                                    <XAxis dataKey="year" stroke="rgba(226,232,240,0.4)" />
                                    <YAxis stroke="rgba(226,232,240,0.4)" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "rgba(15,23,42,0.85)", border: "none", borderRadius: "1rem", color: "#fff" }}
                                    />
                                    <Line type="monotone" dataKey="growth" stroke="#facc15" strokeWidth={3} dot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid gap-6 md:grid-cols-3"
                >
                    <div className="liquid-card p-6 text-center">
                        <div className="relative z-10 space-y-3">
                            <MapPin className="mx-auto h-6 w-6 text-yellow-300" />
                            <h4 className="text-lg font-semibold text-white">Head Office</h4>
                            <p className="text-sm text-cyan-100/80">{aboutContent.contactInfo.address}</p>
                        </div>
                    </div>
                    <div className="liquid-card p-6 text-center">
                        <div className="relative z-10 space-y-3">
                            <Phone className="mx-auto h-6 w-6 text-yellow-300" />
                            <h4 className="text-lg font-semibold text-white">Call Us</h4>
                            <p className="text-sm text-cyan-100/80">{aboutContent.contactInfo.phone}</p>
                        </div>
                    </div>
                    <div className="liquid-card p-6 text-center">
                        <div className="relative z-10 space-y-3">
                            <Mail className="mx-auto h-6 w-6 text-yellow-300" />
                            <h4 className="text-lg font-semibold text-white">Email</h4>
                            <p className="text-sm text-cyan-100/80">{aboutContent.contactInfo.email}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
