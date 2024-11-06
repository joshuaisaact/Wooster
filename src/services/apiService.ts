import { SupabaseClient } from '@supabase/supabase-js';

// Global backend URL for fetching data
export const BASE_URL: string = import.meta.env.VITE_BASE_URL || 'http://localhost:4000';

// Helper function to get auth token
const getAuthHeader = async (supabase: SupabaseClient) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    Authorization: `Bearer ${session?.access_token}`,
    'Content-Type': 'application/json',
  };
};

// Fetch destinations data
export const fetchDestinations = async (supabase: SupabaseClient) => {
  const headers = await getAuthHeader(supabase);
  const res = await fetch(`${BASE_URL}/saved-destinations`, {
    method: 'GET',
    headers,
  });
  if (!res.ok) throw new Error('Failed to fetch destinations');
  return res.json();
};

export const fetchDestinationActivities = async (
  supabase: SupabaseClient,
  destinationName: string,
) => {
  console.log('Fetching activities for:', destinationName);
  console.log('Using BASE_URL:', BASE_URL);

  const headers = await getAuthHeader(supabase);
  console.log('Auth headers:', headers);

  const url = `${BASE_URL}/destination/${encodeURIComponent(destinationName)}/activities`;
  console.log('Making request to:', url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      throw new Error(`Failed to fetch destination activities: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Received activities data:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchDestinationActivities:', error);
    throw error;
  }
};

// Create a new destination (protected route)
export const createDestination = async (supabase: SupabaseClient, destinationName: string) => {
  const headers = await getAuthHeader(supabase);
  const response = await fetch(`${BASE_URL}/destinations`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ destination: destinationName }),
  });

  if (!response.ok) {
    throw new Error('Failed to create destination');
  }

  const result = await response.json();
  return result.destination;
};

// Delete a destination (protected route)
export const deleteDestination = async (supabase: SupabaseClient, destinationId: number) => {
  const headers = await getAuthHeader(supabase);
  const response = await fetch(`${BASE_URL}/destinations/${destinationId}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) {
    throw new Error(`Failed to delete destination: ${response.statusText}`);
  }
};

// Fetch trips data (protected route)
export const fetchTrips = async (supabase: SupabaseClient) => {
  const headers = await getAuthHeader(supabase);
  const res = await fetch(`${BASE_URL}/trips`, {
    headers,
  });
  if (!res.ok) throw new Error('Failed to fetch trips');
  return res.json();
};

// Create a trip (protected route)
export const createTrip = async (
  supabase: SupabaseClient,
  tripData: {
    days: number;
    location: string;
    startDate: string | null;
    selectedCategories?: string[];
  },
) => {
  const headers = await getAuthHeader(supabase);
  console.log('Sending trip data:', tripData);

  const response = await fetch(`${BASE_URL}/trips`, {
    method: 'POST',
    headers,
    body: JSON.stringify(tripData),
  });

  if (!response.ok) {
    throw new Error('Failed to create trip');
  }

  const result = await response.json();
  console.log('API Response:', result); // Log the API response
  return result;
};

// Delete a trip (protected route)
export const deleteTrip = async (supabase: SupabaseClient, tripId: string) => {
  const headers = await getAuthHeader(supabase);
  const response = await fetch(`${BASE_URL}/trips/${tripId}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) {
    throw new Error(`Failed to delete trip: ${response.statusText}`);
  }
};

export const fetchTrip = async (supabase: SupabaseClient, tripId: string) => {
  const headers = await getAuthHeader(supabase);
  const response = await fetch(`${BASE_URL}/trips/${tripId}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch trip details');
  }

  const result = await response.json();
  return result.trip;
};
