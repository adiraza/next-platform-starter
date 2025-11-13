"use client";

import React, { useState } from "react";
import { Menu, X, Droplet, Waves } from "lucide-react";
import Link from "next/link";

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Projects", href: "/projects" },
        { name: "Team", href: "/team" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="liquid-section relative min-h-screen text-white">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.2),transparent_45%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.18),transparent_50%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,47,73,0.9),rgba(15,23,42,0.65))]" />
            </div>

            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 via-green-400 to-blue-500 flex items-center justify-center shadow-lg">
                            <Droplet className="h-6 w-6 text-slate-900" />
                        </div>
                        <span className="text-2xl font-bold tracking-wide">
                            Excel<span className="text-yellow-300">Energy</span>
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.3em] text-cyan-100/80">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group relative transition duration-300 hover:text-yellow-200"
                            >
                                <span className="relative z-10">{item.name}</span>
                                <span className="pointer-events-none absolute inset-x-0 -bottom-2 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-cyan-100/90 transition hover:bg-white/20"
                        >
                            <Waves className="h-4 w-4" />
                            Consultation
                        </Link>
                        <button className="rounded-full bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500 px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg hover:shadow-xl transition">
                            Get Quote
                        </button>
                    </div>

                    <button
                        className="md:hidden rounded-full border border-white/30 p-2 text-yellow-200"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {menuOpen && (
                    <div className="md:hidden mx-6 rounded-3xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-lg">
                        <div className="flex flex-col gap-4 text-cyan-100/90">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="rounded-full border border-white/10 bg-white/5 py-3 font-semibold tracking-[0.25em] uppercase hover:bg-white/15 transition"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-6 flex flex-col gap-3">
                            <Link
                                href="/contact"
                                className="rounded-full border border-white/20 bg-white/10 py-2 text-sm text-cyan-100/90 hover:bg-white/20 transition"
                            >
                                Contact
                            </Link>
                            <button className="rounded-full bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500 py-2 text-sm font-semibold text-slate-900 shadow-lg hover:shadow-xl transition">
                                Get Quote
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="relative z-10 mt-12 flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
                <span className="liquid-badge mb-6">Solar Ripple Effect</span>
                <h1 className="liquid-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 max-w-3xl">
                    Capturing Sunlight, Crafting Liquid Energy Experiences
                </h1>
                <p className="liquid-subheading max-w-2xl text-base sm:text-lg mb-10">
                    Transform your spaces with dynamic solar arrays and fluid design systems that flow as effortlessly as water yet radiate the warmth of the sun.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500 px-8 py-3 text-slate-900 font-semibold shadow-xl hover:shadow-2xl transition"
                    >
                        View Impact
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-white transition hover:bg-white/15"
                    >
                        Explore Services
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
