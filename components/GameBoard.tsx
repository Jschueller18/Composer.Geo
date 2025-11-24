"use client";

import { useState, useEffect, useCallback } from "react";
import { LoadScript } from "@react-google-maps/api";
import StreetView from "./StreetView";
import GuessMap from "./GuessMap";
import GameStats from "./GameStats";
import { calculateDistance, generateRandomLocation } from "@/utils/gameLogic";

interface GameBoardProps {
  apiKey: string;
  onResetApiKey: () => void;
}

interface Round {
  location: { lat: number; lng: number };
  guess?: { lat: number; lng: number };
  distance?: number;
  score?: number;
}

export default function GameBoard({ apiKey, onResetApiKey }: GameBoardProps) {
  const [round, setRound] = useState<number>(1);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isGuessing, setIsGuessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const startNewRound = useCallback(() => {
    const location = generateRandomLocation();
    setCurrentLocation(location);
    setIsGuessing(true);
    setShowResults(false);
  }, []);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  const handleGuess = (guessLat: number, guessLng: number) => {
    if (!currentLocation || !isGuessing) return;

    const distance = calculateDistance(
      currentLocation.lat,
      currentLocation.lng,
      guessLat,
      guessLng
    );

    // Scoring: 5000 points max, decreases with distance
    // Perfect guess (0km) = 5000 points
    // 1000km+ = 0 points
    const score = Math.max(0, Math.round(5000 * (1 - distance / 1000)));

    const newRound: Round = {
      location: currentLocation,
      guess: { lat: guessLat, lng: guessLng },
      distance,
      score,
    };

    setRounds((prev) => [...prev, newRound]);
    setTotalScore((prev) => prev + score);
    setIsGuessing(false);
    setShowResults(true);
  };

  const handleNextRound = () => {
    if (round < 5) {
      setRound((prev) => prev + 1);
      startNewRound();
    }
  };

  const handleNewGame = () => {
    setRound(1);
    setRounds([]);
    setTotalScore(0);
    startNewRound();
  };

  const isGameComplete = round === 5 && showResults;

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={["geometry"]}
    >
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              GeoGuessr Clone
            </h1>
            <div className="flex gap-2">
              <button
                onClick={onResetApiKey}
                className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Change API Key
              </button>
            </div>
          </div>

          <GameStats
            round={round}
            totalScore={totalScore}
            currentRoundScore={rounds[round - 1]?.score || 0}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-2 bg-gray-200 dark:bg-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Street View
                </h2>
              </div>
              {currentLocation && (
                <StreetView
                  lat={currentLocation.lat}
                  lng={currentLocation.lng}
                  apiKey={apiKey}
                />
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-2 bg-gray-200 dark:bg-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Make Your Guess
                </h2>
              </div>
              <GuessMap
                onGuess={handleGuess}
                disabled={!isGuessing}
                showResult={showResults}
                actualLocation={currentLocation}
                guessLocation={rounds[round - 1]?.guess}
                apiKey={apiKey}
              />
            </div>
          </div>

          {showResults && rounds[round - 1] && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-4">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Round {round} Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Distance
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {rounds[round - 1].distance?.toFixed(2)} km
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Score
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {rounds[round - 1].score?.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Score
                  </p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {totalScore.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center gap-4">
            {showResults && !isGameComplete && (
              <button
                onClick={handleNextRound}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Next Round
              </button>
            )}
            {isGameComplete && (
              <button
                onClick={handleNewGame}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                New Game
              </button>
            )}
          </div>
        </div>
      </div>
    </LoadScript>
  );
}

