import { Trip, ItineraryItem, Activity } from '@/types';
import { mockTokyoObj } from './mockDestinations';

// Mock activities for a day in the itinerary
const mockActivitiesParisDay1: Activity[] = [
  {
    activityId: 1,
    activityName: 'Visit Eiffel Tower',
    description: 'An iconic landmark of Paris with breathtaking views of the city.',
    location: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    latitude: 48.8584,
    longitude: 2.2941,
    startTime: '09:00',
    endTime: '11:00',
    category: 'Sightseeing',
    price: '25 EUR',
    duration: '3 hours',
    difficulty: 'Medium',
    bestTime: 'Morning',
    slotNumber: 1,
  },
  {
    activityId: 2,
    activityName: 'Lunch at Le Jules Verne',
    description: 'A Michelin-starred restaurant on the Eiffel Tower offering fine dining.',
    location: 'Eiffel Tower, 75007 Paris, France',
    latitude: 48.8584,
    longitude: 2.2941,
    startTime: '12:00',
    endTime: '14:00',
    category: 'Dining',
    price: '150 EUR',
    duration: '3 hours',
    difficulty: 'Medium',
    bestTime: 'Morning',
    slotNumber: 2,
  },
];

const mockActivitiesParisDay2: Activity[] = [
  {
    activityId: 3,
    activityName: 'Louvre Museum',
    description: 'The world’s largest art museum, home to the Mona Lisa.',
    location: 'Rue de Rivoli, 75001 Paris, France',
    latitude: 48.8606,
    longitude: 2.3376,
    startTime: '10:00',
    endTime: '13:00',
    category: 'Museum',
    price: '17 EUR',
    duration: '3 hours',
    difficulty: 'Medium',
    bestTime: 'Morning',
    slotNumber: 1,
  },
  {
    activityId: 4,
    activityName: 'Dinner at L’Ambroisie',
    description: 'A three-Michelin-star restaurant known for its classic French cuisine.',
    location: '9 Place des Vosges, 75004 Paris, France',
    latitude: 48.8534,
    longitude: 2.3651,
    startTime: '19:00',
    endTime: '22:00',
    category: 'Dining',
    price: '220 EUR',
    duration: '3 hours',
    difficulty: 'Medium',
    bestTime: 'Morning',
    slotNumber: 2,
  },
];

// Mock activities for another trip to New York
export const mockActivitiesNYC: Activity[] = [
  {
    activityId: 5,
    activityName: 'Central Park Tour',
    description: 'A guided tour through Central Park, including a visit to Bethesda Terrace.',
    location: 'Central Park, New York, NY, USA',
    latitude: 40.7851,
    longitude: -73.9683,
    startTime: '09:00',
    endTime: '11:00',
    category: 'Tour',
    price: 'Free',
    duration: '3 hours',
    difficulty: 'Medium',
    bestTime: 'Morning',
    slotNumber: 1,
  },
  {
    activityId: 6,
    activityName: 'Empire State Building',
    description: 'Visit the observation deck of this iconic skyscraper for a view of the city.',
    location: '20 W 34th St, New York, NY 10118, USA',
    latitude: 40.748817,
    longitude: -73.985428,
    startTime: '14:00',
    endTime: '16:00',
    category: 'Sightseeing',
    price: '40 USD',
    duration: '3 hours',
    difficulty: 'Medium',
    bestTime: 'Morning',
    slotNumber: 2,
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
    destination: mockTokyoObj,
    numDays: 5,
    startDate: '2025-05-01',
    itinerary: mockItineraryParis,
    status: 'PLANNING',
  },
  {
    tripId: 'trip_2',
    destination: mockTokyoObj,
    numDays: 3,
    startDate: '2025-07-15',
    itinerary: mockItineraryNYC,
    status: 'PLANNING',
  },
];
