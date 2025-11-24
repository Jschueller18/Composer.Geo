"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
} from "@react-google-maps/api";

interface GuessMapProps {
  onGuess: (lat: number, lng: number) => void;
  disabled: boolean;
  showResult: boolean;
  actualLocation?: { lat: number; lng: number } | null;
  guessLocation?: { lat: number; lng: number };
  apiKey: string;
}

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 20,
  lng: 0,
};

export default function GuessMap({
  onGuess,
  disabled,
  showResult,
  actualLocation,
  guessLocation,
  apiKey,
}: GuessMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps is loaded
    if (typeof window !== "undefined" && window.google?.maps) {
      setIsLoaded(true);
    } else {
      // Poll for Google Maps to be available (since LoadScript is loading it)
      const checkInterval = setInterval(() => {
        if (typeof window !== "undefined" && window.google?.maps) {
          setIsLoaded(true);
          clearInterval(checkInterval);
        }
      }, 100);

      return () => clearInterval(checkInterval);
    }
  }, []);

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (disabled || showResult) return;
      if (e.latLng) {
        onGuess(e.latLng.lat(), e.latLng.lng());
      }
    },
    [disabled, showResult, onGuess]
  );

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (showResult && actualLocation && guessLocation && mapRef.current) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(actualLocation);
      bounds.extend(guessLocation);
      mapRef.current.fitBounds(bounds);
    }
  }, [showResult, actualLocation, guessLocation]);

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 dark:bg-gray-700">
        <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={2}
        onClick={onMapClick}
        onLoad={onMapLoad}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: true,
          clickableIcons: false,
          cursor: disabled ? "default" : "crosshair",
        }}
      >
        {showResult && actualLocation && (
          <Marker
            position={actualLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#10b981",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            }}
            title="Actual Location"
          />
        )}
        {showResult && guessLocation && (
          <Marker
            position={guessLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#3b82f6",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            }}
            title="Your Guess"
          />
        )}
        {showResult &&
          actualLocation &&
          guessLocation &&
          window.google?.maps?.geometry && (
            <Marker
              position={{
                lat: (actualLocation.lat + guessLocation.lat) / 2,
                lng: (actualLocation.lng + guessLocation.lng) / 2,
              }}
              icon={{
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 4,
                fillColor: "#ef4444",
                fillOpacity: 0.8,
                strokeColor: "#ffffff",
                strokeWeight: 1,
                rotation:
                  google.maps.geometry.spherical.computeHeading(
                    new google.maps.LatLng(
                      guessLocation.lat,
                      guessLocation.lng
                    ),
                    new google.maps.LatLng(
                      actualLocation.lat,
                      actualLocation.lng
                    )
                  ) || 0,
              }}
            />
          )}
      </GoogleMap>
      {!disabled && !showResult && (
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded shadow-lg text-sm font-semibold">
          Click on the map to make your guess
        </div>
      )}
    </div>
  );
}

