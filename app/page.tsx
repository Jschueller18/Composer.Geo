"use client";

import { useState, useEffect } from "react";
import GameBoard from "@/components/GameBoard";
import ApiKeyInput from "@/components/ApiKeyInput";

export default function Home() {
  const [apiKey, setApiKey] = useState<string>("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if API key is stored in localStorage
    const storedKey = localStorage.getItem("google_maps_api_key");
    if (storedKey) {
      setApiKey(storedKey);
      setIsReady(true);
    } else {
      // Check environment variable as fallback
      const envKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (envKey) {
        setApiKey(envKey);
        setIsReady(true);
      }
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem("google_maps_api_key", key);
    setApiKey(key);
    setIsReady(true);
  };

  const handleResetApiKey = () => {
    localStorage.removeItem("google_maps_api_key");
    setApiKey("");
    setIsReady(false);
  };

  return (
    <main className="min-h-screen flex flex-col">
      {!isReady ? (
        <ApiKeyInput onSubmit={handleApiKeySubmit} />
      ) : (
        <GameBoard apiKey={apiKey} onResetApiKey={handleResetApiKey} />
      )}
    </main>
  );
}

