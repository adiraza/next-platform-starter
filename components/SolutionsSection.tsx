"use client";

import { useEffect, useState } from "react";

interface Solution {
    id: string;
    title: string;
    desc: string;
    order: number;
}

const SolutionsSection: React.FC = () => {
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSolutions();
    }, []);

    const fetchSolutions = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/content/solutions', { cache: 'no-store' });
            if (!res.ok) {
                throw new Error('Failed to fetch solutions');
            }
            const data = await res.json();
            console.log('SolutionsSection: Fetched', data.length, 'solutions');
            setSolutions(data.sort((a: Solution, b: Solution) => a.order - b.order));
        } catch (error) {
            console.error('Error fetching solutions:', error);
            setSolutions([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="liquid-section relative py-24 text-center text-white">
                <div className="text-cyan-400 animate-pulse">Loading solutions...</div>
            </section>
        );
    }

    // Always show the section, even if empty

    return (
        <section id="solutions" className="liquid-section relative py-24 text-center text-white">
            <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 px-6">
                <span className="liquid-badge">Our Solutions</span>
                <h2 className="liquid-heading text-4xl sm:text-5xl font-bold">Our Solutions</h2>
                <p className="liquid-subheading max-w-2xl text-base sm:text-lg">
                    Modular solar experiences crafted for every scale—from expansive industrial parks to intimate home rooftops—all flowing with clean energy.
                </p>
                <div className="grid w-full gap-6 md:grid-cols-3">
                    {solutions.map((item, i) => (
                        <div key={item.id} className="liquid-card px-8 py-10 text-left">
                            <div className="relative z-10 space-y-3">
                                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                                <p className="text-sm text-cyan-100/85">{item.desc}</p>
                                <div className="liquid-divider" />
                                <p className="text-xs uppercase tracking-[0.35em] text-yellow-200/80">
                                    Solar Concept #{(i + 1).toString().padStart(2, "0")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolutionsSection;
