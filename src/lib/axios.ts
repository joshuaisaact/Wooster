import { SupabaseClient } from '@supabase/supabase-js';
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:4000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setupAxiosAuth = (supabase: SupabaseClient) => {
  api.interceptors.request.use(async (config) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
  });
};
