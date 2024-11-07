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

// Fetch ALL destinations data
export const fetchAllDestinations = async (supabase: SupabaseClient) => {
  const headers = await getAuthHeader(supabase);
  const res = await fetch(`${BASE_URL}/destinations`, {
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
  const headers = await getAuthHeader(supabase);

  const url = `${BASE_URL}/destination/${encodeURIComponent(destinationName)}/activities`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      throw new Error(`Failed to fetch destination activities: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error in fetchDestinationActivities:', error);
    throw error;
  }
};

export const saveDestination = async (supabase: SupabaseClient, destinationId: number) => {
  const headers = await getAuthHeader(supabase);
  const res = await fetch(`${BASE_URL}/saved-destinations/${destinationId}`, {
    method: 'POST',
    headers,
  });
  if (!res.ok) throw new Error('Failed to save destination');
  return res.json();
};

export const unsaveDestination = async (supabase: SupabaseClient, destinationId: number) => {
  const headers = await getAuthHeader(supabase);
  const res = await fetch(`${BASE_URL}/saved-destinations/${destinationId}`, {
    method: 'DELETE',
    headers,
  });
  if (!res.ok) throw new Error('Failed to unsave destination');
  return res.json();
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
