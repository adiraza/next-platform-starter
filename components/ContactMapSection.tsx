"use client";

import { useEffect, useRef } from "react";
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

export default function ContactMapSection() {
    const mapRef = useRef<L.Map | null>(null);

    // Noida, Sector 62 coordinates
    const center: LatLngExpression = [28.6274, 77.3736];

    useEffect(() => {
        // Fix map resize issue
        const timer = setTimeout(() => {
            if (mapRef.current) {
                mapRef.current.invalidateSize();
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={center}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%", zIndex: 0 }}
                ref={mapRef}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={center}>
                    <Popup>
                        <div className="text-center">
                            <strong className="text-green-600 font-bold">Excel Energy</strong>
                            <br />
                            Solar Heights, Sector 62
                            <br />
                            Noida, Uttar Pradesh, India
                            <br />
                            <a
                                href="https://maps.google.com/?q=28.6274,77.3736"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Open in Google Maps
                            </a>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

