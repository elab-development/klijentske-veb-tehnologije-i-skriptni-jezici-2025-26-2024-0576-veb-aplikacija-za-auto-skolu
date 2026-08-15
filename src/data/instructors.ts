export interface Instructor {
  id: string;
  name: string;
  categories: string[];
  rating: number;
}

export const instructors: Instructor[] = [
  {
    id: 'nikola',
    name: 'Nikola Jovanović',
    categories: ['B', 'C', 'D'],
    rating: 4.9,
  },
  {
    id: 'ana',
    name: 'Ana Marković',
    categories: ['B', 'A2', 'A'],
    rating: 4.8,
  },
  {
    id: 'stefan',
    name: 'Stefan Nikolić',
    categories: ['AM', 'A1', 'A2', 'A'],
    rating: 5.0,
  },
  {
    id: 'milica',
    name: 'Milica Pavlović',
    categories: ['B', 'AM', 'A1'],
    rating: 4.7,
  },
];
