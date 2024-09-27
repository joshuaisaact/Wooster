// Global backend URL for fetching data
const BASE_URL: string = 'http://localhost:4000';

// Fetch trips data
export const fetchTrips = async () => {
  const res = await fetch(`${BASE_URL}/tripsdb`);
  if (!res.ok) throw new Error('Failed to fetch trips');
  return res.json();
};

// Fetch destinations data
export const fetchDestinations = async () => {
  const res = await fetch(`${BASE_URL}/destinations`);
  if (!res.ok) throw new Error('Failed to fetch destinations');
  return res.json();
};

// Create a new destination
export const createDestination = async (destinationName: string) => {
  const response = await fetch(`${BASE_URL}/newdestination`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ destination: destinationName }),
  });

  if (!response.ok) {
    throw new Error('Failed to create destination');
  }

  const result = await response.json();
  return result.destination; // Return the newly created destination
};

// Delete a trip
export const deleteTrip = async (tripId: string) => {
  const response = await fetch(`${BASE_URL}/trips/${tripId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to delete trip: ${response.statusText}`);
  }
};

// Delete a destination
export const deleteDestination = async (destinationId: number) => {
  const response = await fetch(`${BASE_URL}/destinations/${destinationId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to delete destination: ${response.statusText}`);
  }
};
