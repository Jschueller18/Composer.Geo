# GeoGuessr Clone

A web-based GeoGuessr clone built with Next.js, React, and Google Maps API. Guess locations around the world using Street View imagery!

## Features

- 🗺️ Interactive map for making guesses
- 📍 Street View imagery for each location
- 🎯 Scoring system based on distance accuracy
- 📊 Round-by-round statistics
- 🌍 Random locations from around the world
- 💾 Local storage for API key

## Setup

### Prerequisites

- Node.js 18+ installed
- A Google Maps API key with the following APIs enabled:
  - Maps JavaScript API
  - Street View Static API

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Set up your Google Maps API key:

   **Option 1: Environment Variable (Recommended for Vercel)**
   
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

   **Option 2: Enter in Browser**
   
   The app will prompt you to enter your API key when you first load it. The key will be stored locally in your browser.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your project in [Vercel](https://vercel.com)

3. Add your environment variable:
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` with your API key value
   - Make sure it's available for Production, Preview, and Development

4. Deploy!

## How to Play

1. Enter your Google Maps API key (if not set via environment variable)
2. You'll see a Street View image of a random location
3. Click anywhere on the world map to make your guess
4. After guessing, you'll see:
   - The actual location (green marker)
   - Your guess (blue marker)
   - Distance between them
   - Your score for that round
5. Complete 5 rounds to finish the game
6. Your total score is the sum of all round scores

## Scoring

- Maximum score per round: 5,000 points
- Score decreases linearly with distance
- Perfect guess (0 km): 5,000 points
- 1,000+ km away: 0 points

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Google Maps JavaScript API** - Map and Street View
- **React Google Maps API** - React bindings for Google Maps

## License

MIT

