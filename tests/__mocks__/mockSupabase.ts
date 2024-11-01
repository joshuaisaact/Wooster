import { SupabaseClient } from '@supabase/supabase-js';
import { vi } from 'vitest';

// Create a mock Supabase client
export const mockSupabase = {
  auth: {
    getSession: vi.fn().mockResolvedValue({
      data: {
        session: {
          access_token: 'fake-token',
        },
      },
    }),
    signIn: vi.fn(),
    signOut: vi.fn(),
    // Add other auth methods as needed
  },
  from: vi.fn().mockReturnThis(), // Mocking the `from` method
  select: vi.fn().mockReturnThis(), // Allow chaining
  insert: vi.fn().mockResolvedValue({ data: null, error: null }), // Mock insert
  delete: vi.fn().mockResolvedValue({ data: null, error: null }), // Mock delete
  update: vi.fn().mockResolvedValue({ data: null, error: null }), // Mock update
  on: vi.fn(), // Mock on method for real-time updates
  // Add other methods you need for your tests
  supabaseUrl: 'https://fake-supabase-url.supabase.co', // Mock URL
  supabaseKey: 'fake-key', // Mock key
  realtime: {}, // Mock for the realtime property
  realtimeUrl: 'https://fake-realtime-url', // Mock realtime URL
  // Include other properties required by SupabaseClient if necessary
} as unknown as SupabaseClient; // Type assertion to SupabaseClient
