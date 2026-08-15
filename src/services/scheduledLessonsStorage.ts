import type {
  ScheduledLesson,
  ScheduledLessonInput,
} from '../types/ScheduledLesson';

const storageKey = 'drive_pro_scheduled_lessons';

const createId = () => {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const loadAll = (): ScheduledLesson[] => {
  const storedLessons = localStorage.getItem(storageKey);

  if (!storedLessons) {
    return [];
  }

  try {
    return JSON.parse(storedLessons) as ScheduledLesson[];
  } catch {
    localStorage.removeItem(storageKey);
    return [];
  }
};

const saveAll = (lessons: ScheduledLesson[]) => {
  localStorage.setItem(storageKey, JSON.stringify(lessons));
};

export const getAllScheduledLessons = () => loadAll();

export const getScheduledLessonsForUser = (userId: number) => {
  return loadAll()
    .filter((lesson) => lesson.userId === userId)
    .sort((firstLesson, secondLesson) =>
      `${firstLesson.date}T${firstLesson.time}`.localeCompare(
        `${secondLesson.date}T${secondLesson.time}`,
      ),
    );
};

export const addScheduledLesson = (
  userId: number,
  input: ScheduledLessonInput,
) => {
  const lesson: ScheduledLesson = {
    ...input,
    id: createId(),
    userId,
    createdAt: new Date().toISOString(),
  };

  const lessons = loadAll();
  saveAll([...lessons, lesson]);

  return lesson;
};
