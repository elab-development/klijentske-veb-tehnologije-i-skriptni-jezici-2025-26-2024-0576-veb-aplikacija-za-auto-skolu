import type {
  ScheduledLesson,
  ScheduledLessonInput,
} from '../types/ScheduledLesson';

/**
 * Ugovor (interfejs) koji definiše metode za rad sa zakazanim časovima.
 * Bilo koja implementacija (localStorage, API, baza...) mora da ponudi
 * ove tri metode.
 */
export interface LessonsRepository {
  add(userId: number, input: ScheduledLessonInput): ScheduledLesson;
  getAll(): ScheduledLesson[];
  getForUser(userId: number): ScheduledLesson[];
}

/**
 * Konkretna implementacija LessonsRepository interfejsa koja čuva
 * zakazane časove u localStorage-u browsera.
 */
export class ScheduledLessonsRepository implements LessonsRepository {
  private readonly storageKey = 'drive_pro_scheduled_lessons';

  add(userId: number, input: ScheduledLessonInput): ScheduledLesson {
    const lesson: ScheduledLesson = {
      ...input,
      id: this.createId(),
      userId,
      createdAt: new Date().toISOString(),
    };

    const lessons = this.loadAll();
    this.saveAll([...lessons, lesson]);

    return lesson;
  }

  getAll(): ScheduledLesson[] {
    return this.loadAll();
  }

  getForUser(userId: number): ScheduledLesson[] {
    return this.loadAll()
      .filter((lesson) => lesson.userId === userId)
      .sort((firstLesson, secondLesson) =>
        `${firstLesson.date}T${firstLesson.time}`.localeCompare(
          `${secondLesson.date}T${secondLesson.time}`,
        ),
      );
  }

  private createId(): string {
    if (crypto.randomUUID) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  private loadAll(): ScheduledLesson[] {
    const storedLessons = localStorage.getItem(this.storageKey);

    if (!storedLessons) {
      return [];
    }

    try {
      return JSON.parse(storedLessons) as ScheduledLesson[];
    } catch {
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }

  private saveAll(lessons: ScheduledLesson[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(lessons));
  }
}

// Jedinstvena instanca (singleton) koja se koristi kroz celu aplikaciju.
export const scheduledLessonsRepository = new ScheduledLessonsRepository();
