"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default marker icons
if (typeof window !== "undefined") {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
}

interface Location {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}

export default function MapSection() {
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const res = await fetch('/api/content/about');
            const data = await res.json();
            if (data.locations && Array.isArray(data.locations)) {
                // Filter out locations without valid coordinates
                const validLocations = data.locations.filter(
                    (loc: Location) => loc.latitude && loc.longitude && loc.latitude !== 0 && loc.longitude !== 0
                );
                setLocations(validLocations);
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
            // Fallback to default locations
            setLocations([
                { id: '1', name: 'Delhi', address: 'Delhi, India', latitude: 28.6139, longitude: 77.2090 },
                { id: '2', name: 'Mumbai', address: 'Mumbai, Maharashtra, India', latitude: 19.0760, longitude: 72.8777 },
                { id: '3', name: 'Jaipur', address: 'Jaipur, Rajasthan, India', latitude: 26.9124, longitude: 75.7873 },
                { id: '4', name: 'Bengaluru', address: 'Bengaluru, Karnataka, India', latitude: 12.9716, longitude: 77.5946 }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setTimeout(() => window.dispatchEvent(new Event("resize")), 300);
    }, []);

    // Calculate center point from all locations
    const getMapCenter = (): LatLngExpression => {
        if (locations.length === 0) {
            return [22.9734, 78.6569] as [number, number]; // Default center of India
        }
        const avgLat = locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length;
        const avgLng = locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length;
        return [avgLat, avgLng] as [number, number];
    };

    if (loading) {
        return (
            <div className="liquid-card p-6">
                <div className="text-center py-12">
                    <div className="text-cyan-400 animate-pulse">Loading map...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="liquid-card p-6">
            <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-semibold text-white text-center">Solar Presence Across India</h3>
                <div
                    className="relative w-full h-[350px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl transition-transform duration-500 hover:scale-[1.01]"
                    onClick={() => setScrollEnabled(!scrollEnabled)}
                    title="Click to toggle map scroll"
                >
                    <MapContainer
                        center={getMapCenter()}
                        zoom={locations.length > 0 ? 5 : 4}
                        scrollWheelZoom={scrollEnabled}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {locations.map((loc) => (
                            <Marker key={loc.id} position={[loc.latitude, loc.longitude] as [number, number]}>
                                <Popup>
                                    <strong>{loc.name}</strong>
                                    <br />
                                    {loc.address}
                                    <br />
                                    <span className="text-green-500">⚡ Active Solar Projects</span>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>

                    {!scrollEnabled && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900/20 via-slate-900/0 to-slate-900/40">
                            <div className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-200">
                                Enable Scroll
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
