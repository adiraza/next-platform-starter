"use client";

import { useEffect, useState } from "react";

interface Client {
    id: string;
    name: string;
    company?: string;
    rating?: number;
}

const ClientsSection: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/clients', { cache: 'no-store' });
            if (!res.ok) {
                throw new Error('Failed to fetch clients');
            }
            const data = await res.json();
            console.log('ClientsSection: Fetched', data.length, 'clients');
            // Show only clients with ratings
            setClients(data.filter((c: Client) => c.rating && c.rating > 0).slice(0, 3));
        } catch (error) {
            console.error('Error fetching clients:', error);
            setClients([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="liquid-section relative py-20 text-center text-white">
                <div className="text-cyan-400 animate-pulse">Loading clients...</div>
            </section>
        );
    }

    // Always show the section, even if empty

    return (
        <section id="clients" className="liquid-section relative py-20 text-center text-white">
            <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 px-6">
                <span className="liquid-badge">Top Clients</span>
                <div className="space-y-4">
                    <h2 className="liquid-heading text-4xl sm:text-5xl font-bold">Top Clients</h2>
                    <p className="liquid-subheading max-w-2xl text-base sm:text-lg mx-auto">
                        Visionary companies who believe in fluid, sustainable power. Together we're lighting up the future with radiant efficiency.
                    </p>
                </div>
                <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {clients.map((client) => (
                        <div key={client.id} className="liquid-card px-6 py-8 text-left">
                            <div className="relative z-10 space-y-4">
                                <h3 className="text-2xl font-semibold text-white">{client.company || client.name}</h3>
                                <div className="flex items-center gap-2 text-yellow-200 text-lg font-semibold">
                                    {"★".repeat(Math.floor(client.rating || 0))}
                                    <span className="text-yellow-100/80 text-base">{(client.rating || 0).toFixed(1)}</span>
                                </div>
                                <div className="liquid-divider" />
                                <p className="text-sm text-cyan-100/80">
                                    Partnered to deploy expansive solar ecosystems with exceptional performance and long-term reliability.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientsSection;
