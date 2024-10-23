// Global backend URL for fetching data
export const BASE_URL: string = 'http://localhost:4000';

// Fetch destinations data
export const fetchDestinations = async () => {
  const res = await fetch(`${BASE_URL}/destinations`);
  if (!res.ok) throw new Error('Failed to fetch destinations');
  return res.json();
};

// Create a new destination
export const createDestination = async (destinationName: string) => {
  const response = await fetch(`${BASE_URL}/destination`, {
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

// Fetch trips data
export const fetchTrips = async () => {
  const res = await fetch(`${BASE_URL}/trips`);
  if (!res.ok) throw new Error('Failed to fetch trips');
  return res.json();
};

// Create a trip
export const createTrip = async (tripData: {
  userId: string;
  days: number;
  location: string;
  start_date: string | null;
}) => {
  const response = await fetch(`${BASE_URL}/trip`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tripData),
  });

  if (!response.ok) {
    throw new Error('Failed to create trip');
  }

  const result = await response.json();
  return result;
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
