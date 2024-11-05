import { Activity } from '@/types/types';

export const mockActivities: Activity[] = [
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
  },
];
