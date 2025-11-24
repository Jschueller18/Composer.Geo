"use client";

interface GameStatsProps {
  round: number;
  totalScore: number;
  currentRoundScore: number;
}

export default function GameStats({
  round,
  totalScore,
  currentRoundScore,
}: GameStatsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Round</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {round} / 5
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Round Score
          </p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {currentRoundScore.toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Score
          </p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {totalScore.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

