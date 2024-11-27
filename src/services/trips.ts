import { api } from '@/lib/axios';
import {
  CreateTripParams,
  SharedTripResponse,
  ShareLinkResponse,
  TripResponse,
  TripsResponse,
} from '@/types';

export const tripService = {
  getAll: () => api.get<TripsResponse>('/trips').then((response) => response.data),

  getById: (tripId: string) =>
    api.get<TripResponse>(`/trips/${tripId}`).then((response) => response.data),

  create: (tripData: CreateTripParams) =>
    api.post<TripResponse>('/trips', tripData).then((response) => response.data),

  update: (
    tripId: string,
    updates: { startDate?: string; title?: string; description?: string; status?: string },
  ) => api.put<TripResponse>(`/trips/${tripId}`, updates).then((response) => response.data),

  delete: (tripId: string) => api.delete<void>(`/trips/${tripId}`),

  createShareLink: (tripId: string) =>
    api.post<ShareLinkResponse>(`/trips/${tripId}/share`).then((response) => response.data),

  getSharedTrip: (shareCode: string) =>
    api.get<SharedTripResponse>(`/shared/${shareCode}`).then((response) => response.data),
};
