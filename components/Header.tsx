"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [bgIndex, setBgIndex] = useState(0);
    const images = [
        "/image/Image1.jpg",
        "/image/Image2.jpg",
        "/image/Image3.jpg",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Services", href: "#services" },
        { name: "Projects", href: "#projects" },
        { name: "Blog", href: "#blog" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <header
            className="relative h-[80vh] flex flex-col justify-between overflow-hidden text-white"
            style={{
                backgroundImage: `url(${images[bgIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "background-image 1s ease-in-out",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            {/* Navigation Bar */}
            <div className="relative z-10 bg-white/20 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
                    <div className="text-2xl font-bold text-yellow-400">
                        Excel<span className="text-white">Energy</span>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8 text-white font-medium">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="hover:text-yellow-400 transition-opacity duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex gap-4">
                        <button className="text-yellow-400 border border-yellow-400 px-4 py-1.5 rounded-full hover:bg-yellow-400 hover:text-black transition">
                            Log In
                        </button>
                        <button className="bg-yellow-400 text-black px-4 py-1.5 rounded-full hover:bg-yellow-500 transition">
                            Sign Up
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-yellow-400"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {menuOpen && (
                    <div className="md:hidden flex flex-col items-center gap-4 bg-yellow-50/95 py-6 text-gray-800 font-medium shadow-inner">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="hover:text-yellow-600 transition"
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="flex gap-4 pt-3">
                            <button className="text-yellow-600 border border-yellow-600 px-4 py-1.5 rounded-full hover:bg-yellow-600 hover:text-white transition">
                                Log In
                            </button>
                            <button className="bg-yellow-600 text-white px-4 py-1.5 rounded-full hover:bg-yellow-700 transition">
                                Sign Up
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Hero Section (Animated Text) */}
            <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 md:px-12 h-full fade-in">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">
                    Powering a <span className="text-yellow-400">Sustainable</span> Future
                </h1>
                <p className="text-lg md:text-2xl text-gray-100 max-w-2xl animate-fadeIn delay-200">
                    Harness the power of the sun with Excel Energy – Your trusted partner
                    for clean, efficient solar solutions.
                </p>
                <div className="mt-6 flex gap-4 animate-fadeIn delay-400">
                    <button className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-500 transition">
                        Learn More
                    </button>
                    <button className="border border-yellow-400 text-yellow-400 px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition">
                        Contact Us
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
