export interface CourseCategory {
  category: string;
  description: string;
  duration: string;
  drivingLessons: number;
  isPopular: boolean;
  minAge: number;
  price: string;
  theoryLessons: number;
  title: string;
  vehicleIcon: string;
}

export const courseCategories: CourseCategory[] = [
  {
    category: 'AM',
    description: 'Mopedi i laki motocikli do 45 km/h',
    duration: '6 nedelja',
    drivingLessons: 15,
    isPopular: false,
    minAge: 16,
    price: '12.900',
    theoryLessons: 12,
    title: 'AM Kategorija',
    vehicleIcon: '🛵',
  },
  {
    category: 'A1',
    description: 'Motocikli do 125cc i 11kW',
    duration: '7 nedelja',
    drivingLessons: 20,
    isPopular: false,
    minAge: 16,
    price: '16.900',
    theoryLessons: 14,
    title: 'A1 Kategorija',
    vehicleIcon: '🏍️',
  },
  {
    category: 'A2',
    description: 'Motocikli ograničene snage do 35kW',
    duration: '8 nedelja',
    drivingLessons: 25,
    isPopular: false,
    minAge: 18,
    price: '19.900',
    theoryLessons: 14,
    title: 'A2 Kategorija',
    vehicleIcon: '🏍️',
  },
  {
    category: 'A',
    description: 'Motocikli bez ograničenja snage',
    duration: '2 meseca',
    drivingLessons: 30,
    isPopular: true,
    minAge: 24,
    price: '24.900',
    theoryLessons: 16,
    title: 'A Kategorija',
    vehicleIcon: '🏍️',
  },
  {
    category: 'B',
    description: 'Putnički automobili do 3.500 kg',
    duration: '3 meseca',
    drivingLessons: 40,
    isPopular: true,
    minAge: 17,
    price: '29.900',
    theoryLessons: 20,
    title: 'B Kategorija',
    vehicleIcon: '🚗',
  },
  {
    category: 'C',
    description: 'Teretna vozila preko 3.500 kg',
    duration: '4 meseca',
    drivingLessons: 50,
    isPopular: true,
    minAge: 21,
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
    minAge: 24,
    price: '49.900',
    theoryLessons: 24,
    title: 'D Kategorija',
    vehicleIcon: '🚌',
  },
];
