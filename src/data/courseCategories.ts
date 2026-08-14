export interface CourseCategory {
  category: string;
  description: string;
  duration: string;
  drivingLessons: number;
  isPopular: boolean;
  price: string;
  theoryLessons: number;
  title: string;
  vehicleIcon: string;
}

export const courseCategories: CourseCategory[] = [
  {
    category: 'B',
    description: 'Putnički automobili do 3.500 kg',
    duration: '3 meseca',
    drivingLessons: 40,
    isPopular: true,
    price: '29.900',
    theoryLessons: 20,
    title: 'B Kategorija',
    vehicleIcon: '🚗',
  },
  {
    category: 'A',
    description: 'Motocikli bez ograničenja snage',
    duration: '2 meseca',
    drivingLessons: 30,
    isPopular: true,
    price: '24.900',
    theoryLessons: 16,
    title: 'A Kategorija',
    vehicleIcon: '🏍️',
  },
  {
    category: 'C',
    description: 'Teretna vozila preko 3.500 kg',
    duration: '4 meseca',
    drivingLessons: 50,
    isPopular: true,
    price: '44.900',
    theoryLessons: 24,
    title: 'C Kategorija',
    vehicleIcon: '🚛',
  },
  {
    category: 'D',
    description: 'Autobusi i vozila za prevoz putnika',
    duration: '4 meseca',
    drivingLessons: 45,
    isPopular: false,
    price: '49.900',
    theoryLessons: 24,
    title: 'D Kategorija',
    vehicleIcon: '🚌',
  },
];
