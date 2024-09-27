// Global backend URL for fetching data
const BASE_URL: string = 'http://localhost:4000';

export const fetchTrips = async () => {
  const res = await fetch(`${BASE_URL}/tripsdb`);
  if (!res.ok) throw new Error('Failed to fetch trips');
  return res.json();
};

export const fetchDestinations = async () => {
  const res = await fetch(`${BASE_URL}/destinations`);
  if (!res.ok) throw new Error('Failed to fetch destinations');
  return res.json();
};
