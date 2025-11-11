"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const locations = [
    { name: "Delhi", position: [28.6139, 77.2090] },
    { name: "Mumbai", position: [19.0760, 72.8777] },
    { name: "Jaipur", position: [26.9124, 75.7873] },
    { name: "Bengaluru", position: [12.9716, 77.5946] },
];

export default function MapSection() {
    const [scrollEnabled, setScrollEnabled] = useState(true);

    useEffect(() => {
        // Fix hydration resize issue
        setTimeout(() => window.dispatchEvent(new Event("resize")), 500);
    }, []);

    return (
        <div
            className="relative w-full md:w-[45%] h-[400px] rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
            onClick={() => setScrollEnabled(!scrollEnabled)}
            title="Click to enable zoom / scroll"
        >
            <MapContainer
                center={[22.9734, 78.6569]}
                zoom={5}
                scrollWheelZoom={scrollEnabled}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((loc, i) => (
                    <Marker key={i} position={loc.position}>
                        <Popup>
                            <strong>{loc.name}</strong> <br />
                            Active Solar Projects ⚡
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {!scrollEnabled && (
                <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
                    <div className="bg-black/30 text-white px-4 py-2 rounded-lg text-sm">
                        Click to Enable Zoom
                    </div>
                </div>
            )}
        </div>
    );
}
