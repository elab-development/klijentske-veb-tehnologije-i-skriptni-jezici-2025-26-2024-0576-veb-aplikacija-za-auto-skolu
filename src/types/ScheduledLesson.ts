export type LessonType = 'practical' | 'theory' | 'polygon' | 'exam-prep';

export interface ScheduledLesson {
  id: string;
  userId: number;
  category: string;
  lessonType: LessonType;
  date: string;
  time: string;
  instructorId: string;
  instructorName: string;
  note: string;
  createdAt: string;
}

export interface ScheduledLessonInput {
  category: string;
  lessonType: LessonType;
  date: string;
  time: string;
  instructorId: string;
  instructorName: string;
  note: string;
}
