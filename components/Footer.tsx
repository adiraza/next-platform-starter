"use client";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* COMPANY INFO */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-3">SolarEdge India</h2>
                    <p className="text-sm leading-relaxed">
                        Building a brighter, cleaner future with sustainable solar energy
                        solutions for industries, homes, and businesses.
                    </p>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#about" className="hover:text-yellow-400">About Us</a></li>
                        <li><a href="#services" className="hover:text-yellow-400">Services</a></li>
                        <li><a href="#projects" className="hover:text-yellow-400">Projects</a></li>
                        <li><a href="#contact" className="hover:text-yellow-400">Contact</a></li>
                    </ul>
                </div>

                {/* CONTACT INFO */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                    <ul className="space-y-2 text-sm">
                        <li>📍 New Delhi, India</li>
                        <li>📞 +91 9123255388</li>
                        <li>📧 contact@solarexampleindia.com</li>
                    </ul>
                </div>

                {/* SOCIAL LINKS */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-yellow-400"><Facebook /></a>
                        <a href="#" className="hover:text-yellow-400"><Twitter /></a>
                        <a href="#" className="hover:text-yellow-400"><Linkedin /></a>
                        <a href="#" className="hover:text-yellow-400"><Instagram /></a>
                    </div>
                </div>
            </div>

            {/* COPYRIGHT LINE */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
                © {year} SolarEdge India. All rights reserved. | Designed with ☀️ by Adil
            </div>
        </footer>
    );
}
