import type { User } from '../types/User';

export const predefinedUsers: User[] = [
  {
    id: 1,
    name: 'Marko Petrović',
    email: 'marko@drivepro.rs',
    password: 'marko123',
    phone: '+381 60 123 4567',
    drivingCategory: 'B',
    completedLessons: 18,
    totalLessons: 40,
    nextLessonAt: '2026-06-10T09:00:00',
  },
  {
    id: 2,
    name: 'Jelena Stojanović',
    email: 'jelena@drivepro.rs',
    password: 'jelena123',
    phone: '+381 61 222 3344',
    drivingCategory: 'A',
    completedLessons: 12,
    totalLessons: 30,
    nextLessonAt: '2026-06-11T17:30:00',
  },
  {
    id: 3,
    name: 'Stefan Bugariski',
    email: 'stefan@drivepro.rs',
    password: 'stefan123',
    phone: '+381 63 555 1212',
    drivingCategory: 'B',
    completedLessons: 0,
    totalLessons: 0,
    nextLessonAt: null,
  },
];
