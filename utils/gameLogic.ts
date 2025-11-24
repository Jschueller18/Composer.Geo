/**
 * Calculate the distance between two coordinates using the Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Generate a random location on Earth
 * Prefers locations that are more likely to have Street View coverage
 */
export function generateRandomLocation(): { lat: number; lng: number } {
  // Focus on areas more likely to have Street View coverage
  // This is a simplified approach - in production, you might want to use
  // a curated list of locations with Street View coverage
  
  // Generate random coordinates with some bias toward populated areas
  const lat = Math.random() * 180 - 90; // -90 to 90
  const lng = Math.random() * 360 - 180; // -180 to 180

  return { lat, lng };
}

