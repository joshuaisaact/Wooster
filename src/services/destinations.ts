import { api } from '@/lib/axios';
import {
  Activity,
  SavedDestinationsResponse,
  DestinationsResponse,
  DestinationResponse,
} from '@/types';

interface ActivitiesResponse {
  activities: Activity[];
}

export const destinationService = {
  getAllSaved: () =>
    api.get<SavedDestinationsResponse>('/saved-destinations').then((response) => response.data),

  getAll: () => api.get<DestinationsResponse>('/destinations').then((response) => response.data),

  getActivities: (destinationName: string) =>
    api
      .get<ActivitiesResponse>(`/destination/${encodeURIComponent(destinationName)}/activities`)
      .then((response) => response.data),

  save: (destinationId: number) => api.post<void>(`/saved-destinations/${destinationId}`),

  unsave: (destinationId: number) => api.delete<void>(`/saved-destinations/${destinationId}`),

  create: (destinationName: string) =>
    api
      .post<DestinationResponse>('/destinations', {
        destination: destinationName,
      })
      .then((response) => response.data),

  delete: (destinationId: number) => api.delete<void>(`/destinations/${destinationId}`),
};
