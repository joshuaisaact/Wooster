import { Trip, ItineraryItem, ActivityProps } from '@/types/types';

// Mock activities for a day in the itinerary
const mockActivitiesParisDay1: ActivityProps[] = [
  {
    name: 'Visit Eiffel Tower',
    description: 'An iconic landmark of Paris with breathtaking views of the city.',
    location: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    price: '25 EUR',
  },
  {
    name: 'Lunch at Le Jules Verne',
    description: 'A Michelin-starred restaurant on the Eiffel Tower offering fine dining.',
    location: 'Eiffel Tower, 75007 Paris, France',
    price: '150 EUR',
  },
];

const mockActivitiesParisDay2: ActivityProps[] = [
  {
    name: 'Louvre Museum',
    description: 'The world’s largest art museum, home to the Mona Lisa.',
    location: 'Rue de Rivoli, 75001 Paris, France',
    price: '17 EUR',
  },
  {
    name: 'Dinner at L’Ambroisie',
    description: 'A three-Michelin-star restaurant known for its classic French cuisine.',
    location: '9 Place des Vosges, 75004 Paris, France',
    price: '220 EUR',
  },
];

// Mock activities for another trip to New York
export const mockActivitiesNYC: ActivityProps[] = [
  {
    name: 'Central Park Tour',
    description: 'A guided tour through Central Park, including a visit to Bethesda Terrace.',
    location: 'Central Park, New York, NY, USA',
    price: 'Free',
  },
  {
    name: 'Empire State Building',
    description: 'Visit the observation deck of this iconic skyscraper for a view of the city.',
    location: '20 W 34th St, New York, NY 10118, USA',
    price: '40 USD',
  },
];

// Mock itinerary items for the Paris trip
export const mockItineraryParis: ItineraryItem[] = [
  {
    day: 1,
    activities: mockActivitiesParisDay1,
  },
  {
    day: 2,
    activities: mockActivitiesParisDay2,
  },
];

// Mock itinerary items for the New York trip
export const mockItineraryNYC: ItineraryItem[] = [
  {
    day: 1,
    activities: mockActivitiesNYC,
  },
];

// Mock trips
export const mockTrips: Trip[] = [
  {
    tripId: 'trip_1',
    destinationName: 'Paris, France',
    numDays: 5,
    startDate: '2024-05-01',
    itinerary: mockItineraryParis,
  },
  {
    tripId: 'trip_2',
    destinationName: 'New York, USA',
    numDays: 3,
    startDate: '2024-07-15',
    itinerary: mockItineraryNYC,
  },
];
