"use client";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-16 overflow-hidden bg-slate-950 text-white">
            <div className="absolute inset-0 opacity-90">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(251,191,36,0.18),transparent_60%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,47,73,0.9),rgba(15,23,42,0.95))]" />
            </div>

            <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-4">
                <div className="liquid-card p-6">
                    <div className="relative z-10 space-y-4">
                        <h2 className="text-2xl font-bold text-white">Excel Energy</h2>
                        <p className="text-sm leading-relaxed text-cyan-100/80">
                            Sculpting immersive solar ecosystems that flow like water and radiate like sunlight. We engineer luminous energy journeys for industries, homes, and communities.
                        </p>
                    </div>
                </div>
                <div className="liquid-card p-6">
                    <div className="relative z-10 space-y-4">
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-cyan-100/80">
                            <li>
                                <a href="/about" className="transition hover:text-yellow-300">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/services" className="transition hover:text-yellow-300">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="/projects" className="transition hover:text-yellow-300">
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a href="/team" className="transition hover:text-yellow-300">
                                    Team
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="transition hover:text-yellow-300">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="liquid-card p-6">
                    <div className="relative z-10 space-y-4">
                        <h3 className="text-lg font-semibold text-white">Contact</h3>
                        <ul className="space-y-2 text-sm text-cyan-100/80">
                            <li>Solar Heights, Sector 62, Noida, India</li>
                            <li>+91 9123255388</li>
                            <li>contact@excelenergy.in</li>
                        </ul>
                    </div>
                </div>
                <div className="liquid-card p-6">
                    <div className="relative z-10 space-y-4">
                        <h3 className="text-lg font-semibold text-white">Stay Connected</h3>
                        <p className="text-sm text-cyan-100/80">
                            Follow the solar current. Discover behind-the-scenes innovation and live project journeys.
                        </p>
                        <div className="flex gap-3 text-cyan-100/80">
                            <a href="#" className="rounded-full border border-white/20 p-3 transition hover:bg-white/10">
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a href="#" className="rounded-full border border-white/20 p-3 transition hover:bg-white/10">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href="#" className="rounded-full border border-white/20 p-3 transition hover:bg-white/10">
                                <Linkedin className="h-4 w-4" />
                            </a>
                            <a href="#" className="rounded-full border border-white/20 p-3 transition hover:bg-white/10">
                                <Instagram className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 border-t border-white/10 py-6 text-center text-xs uppercase tracking-[0.35em] text-cyan-100/60">
                © {year} Excel Energy · Liquid Solar Experience · Designed with ☀️ by Adil
            </div>
        </footer>
    );
}
