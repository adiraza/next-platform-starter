"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import dynamic from "next/dynamic";

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
    const [selected, setSelected] = useState<string | null>(null);
    const locations = [
        { name: "Delhi", x: "60%", y: "40%" },
        { name: "Mumbai", x: "45%", y: "70%" },
        { name: "Jaipur", x: "50%", y: "45%" },
        { name: "Bengaluru", x: "55%", y: "80%" },
    ];

    return (
        <section className="bg-white text-gray-800 py-20 px-6 md:px-16" id="about">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center mb-12 text-green-600"
                >
                    About Our Company
                </motion.h2>

                {/* Mission & Goal */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="grid md:grid-cols-2 gap-10 mb-20"
                >
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 text-green-700">Our Mission</h3>
                        <p className="text-gray-700 leading-relaxed">
                            To revolutionize the solar industry by delivering high-efficiency, sustainable energy systems that
                            empower communities and reduce carbon footprint. We aim to make renewable energy accessible to every
                            household and industry in India.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 text-green-700">Our Goal</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Our goal is to achieve 100 MW solar installations by 2030 while maintaining top-notch customer
                            satisfaction, innovation, and environmental responsibility.
                        </p>
                    </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-green-50 rounded-2xl p-10 mb-20 shadow-md"
                >
                    <h3 className="text-2xl font-semibold mb-6 text-green-700">Our Achievements</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Successfully completed 200+ solar projects across India.</li>
                        <li>Recognized as Top 10 Green Energy Innovators (2023).</li>
                        <li>ISO Certified company with strong client satisfaction ratings.</li>
                        <li>Partnerships with major industrial and government bodies.</li>
                    </ul>
                </motion.div>

                {/* Growth Graph + Map side by side */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="grid md:grid-cols-2 gap-10 mb-20 items-center"
                >
                    {/* Left side = Map */}
                    <MapSection />

                    {/* Right side = Graph */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-2xl font-semibold mb-6 text-green-700 text-center">
                            Company Growth (Yearly)
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="growth" stroke="#16a34a" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Contact Details */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid md:grid-cols-3 gap-10 text-center"
                >
                    <div className="flex flex-col items-center">
                        <MapPin className="text-green-600 w-6 h-6 mb-2" />
                        <h4 className="font-semibold text-lg">Head Office</h4>
                        <p>Solar Heights, Sector 62, Noida, UP, India</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Phone className="text-green-600 w-6 h-6 mb-2" />
                        <h4 className="font-semibold text-lg">Call Us</h4>
                        <p>+91 9876543210</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Mail className="text-green-600 w-6 h-6 mb-2" />
                        <h4 className="font-semibold text-lg">Email</h4>
                        <p>info@greensolarenergy.in</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
