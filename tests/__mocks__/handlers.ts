import { api } from '@/lib/axios';
import { http, HttpResponse } from 'msw';

interface CreateDestinationRequest {
  destination: string;
}

interface CreateDestinationResponse {
  id: number;
  name: string;
}

interface TripRequest {
  days: number;
  location: string;
  startDate: string | null;
  selectedCategories?: string[];
}

interface TripResponse {
  trip: {
    tripId: string;
    destination: {
      destinationId: number;
      destinationName: string;
      country: string;
      description: string;
    };
    numDays: number;
    startDate: string;
  };
}

const BASE_URL = api.defaults.baseURL;

export const handlers = [
  // Destinations endpoints
  http.get(`${BASE_URL}/saved-destinations`, () => {
    return HttpResponse.json([
      { id: 1, name: 'Destination 1' },
      { id: 2, name: 'Destination 2' },
    ]);
  }),

  http.get(`${BASE_URL}/destinations`, () => {
    return HttpResponse.json([
      { id: 1, name: 'Destination 1' },
      { id: 2, name: 'Destination 2' },
      { id: 3, name: 'Destination 3' },
    ]);
  }),

  http.get(`${BASE_URL}/destination/:name/activities`, ({ params }) => {
    const { name } = params;
    return HttpResponse.json([
      { id: 1, name: `Activity 1 in ${name}` },
      { id: 2, name: `Activity 2 in ${name}` },
    ]);
  }),

  http.post(`${BASE_URL}/saved-destinations/:id`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ message: `Destination ${id} saved` });
  }),

  http.delete(`${BASE_URL}/saved-destinations/:id`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ message: `Destination ${id} unsaved` });
  }),

  http.post(`${BASE_URL}/destinations`, async ({ request }) => {
    const { destination } = (await request.json()) as CreateDestinationRequest;
    const response: CreateDestinationResponse = {
      id: 4,
      name: destination,
    };
    return HttpResponse.json(response);
  }),

  http.delete(`${BASE_URL}/destinations/:id`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ message: `Destination ${id} deleted` });
  }),

  // Trips endpoints
  http.get(`${BASE_URL}/trips`, () => {
    return HttpResponse.json([
      { id: '1', location: 'Trip 1', days: 5, startDate: '2023-06-01' },
      { id: '2', location: 'Trip 2', days: 7, startDate: '2023-07-15' },
    ]);
  }),

  http.get(`${BASE_URL}/trips/:id`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id,
      location: 'Trip 1',
      days: 5,
      startDate: '2023-06-01',
    });
  }),

  http.post(`${BASE_URL}/trips`, async ({ request }) => {
    const data = (await request.json()) as TripRequest;
    const response: TripResponse = {
      trip: {
        tripId: '3',
        destination: {
          destinationId: 1,
          destinationName: data.location,
          country: 'Japan',
          description: 'Capital of Japan',
        },
        numDays: data.days,
        startDate: data.startDate || '',
      },
    };
    return HttpResponse.json(response);
  }),

  http.delete(`${BASE_URL}/trips/:id`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ message: `Trip ${id} deleted` });
  }),
];
