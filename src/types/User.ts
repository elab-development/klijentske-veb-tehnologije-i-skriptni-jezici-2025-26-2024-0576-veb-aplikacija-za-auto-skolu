export type DrivingCategory = 'A' | 'B' | 'C' | 'D';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  drivingCategory: DrivingCategory;
  completedLessons: number;
  totalLessons: number;
  nextLessonAt: string | null;
}
