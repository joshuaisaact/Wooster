import { useEffect, useState, useCallback } from 'react';
import { Destination } from '@/types/types';
import { supabase } from '@/lib/supabase';
import { BASE_URL } from '@/services/apiService';

export function useDestinationSearch() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch destinations from API
  const fetchDestinations = useCallback(async (query = '', country = 'all') => {
    setIsLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const params = new URLSearchParams({
        search: query,
        country: country,
      });

      const response = await fetch(`${BASE_URL}/destinations/search?${params}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setDestinations(data.destinations || []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle search and country changes
  const handleSearchQueryChange = (query: string) => setSearchQuery(query);
  const handleCountryChange = (country: string) => setSelectedCountry(country);

  // Fetch destinations whenever searchQuery or selectedCountry changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchDestinations(searchQuery, selectedCountry);
    }, 500); // Debounce fetch by 500ms

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCountry, fetchDestinations]);

  return {
    destinations,
    isLoading,
    searchQuery,
    selectedCountry,
    setSearchQuery: handleSearchQueryChange,
    setSelectedCountry: handleCountryChange,
  };
}
