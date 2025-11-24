"use client";

import { useEffect, useRef } from "react";

interface StreetViewProps {
  lat: number;
  lng: number;
  apiKey: string;
}

export default function StreetView({ lat, lng, apiKey }: StreetViewProps) {
  const panoramaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panoramaRef.current) return;

    const panorama = new google.maps.StreetViewPanorama(panoramaRef.current, {
      position: { lat, lng },
      pov: { heading: 0, pitch: 0 },
      zoom: 1,
      visible: true,
    });

    // Try to find the nearest Street View location
    const service = new google.maps.StreetViewService();
    service.getPanorama(
      { location: { lat, lng }, radius: 50 },
      (data, status) => {
        if (status === "OK" && data?.location?.latLng) {
          panorama.setPosition(data.location.latLng);
        }
      }
    );

    return () => {
      // Cleanup if needed
    };
  }, [lat, lng]);

  return (
    <div
      ref={panoramaRef}
      className="w-full h-[400px] lg:h-[500px]"
      style={{ minHeight: "400px" }}
    />
  );
}

