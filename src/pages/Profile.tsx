import { Link } from 'react-router-dom';

import { courseCategories } from '../data/courseCategories';
import { instructors } from '../data/instructors';
import { useAuth } from '../contexts/useAuth';
import { getScheduledLessonsForUser } from '../services/scheduledLessonsStorage';
import type { LessonType } from '../types/ScheduledLesson';

const lessonTypeLabels: Record<LessonType, string> = {
  'exam-prep': 'Priprema za ispit',
  polygon: 'Vožnja na poligonu',
  practical: 'Praktična vožnja',
  theory: 'Teorijska nastava',
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('sr-Latn-RS', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`));

const getDateParts = (date: string) => {
  const parsedDate = new Date(`${date}T12:00:00`);

  return {
    day: new Intl.DateTimeFormat('sr-Latn-RS', {
      day: 'numeric',
    }).format(parsedDate),
    month: new Intl.DateTimeFormat('sr-Latn-RS', {
      month: 'short',
    }).format(parsedDate),
  };
};

const Profile = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  const scheduledLessons = getScheduledLessonsForUser(currentUser.id);
  const course = courseCategories.find(
    (courseCategory) => courseCategory.category === currentUser.drivingCategory,
  );
  const instructor =
    instructors.find((item) =>
      item.categories.includes(currentUser.drivingCategory),
    ) ?? instructors[0];
  const progressPercent =
    currentUser.totalLessons > 0
      ? Math.round(
          (currentUser.completedLessons / currentUser.totalLessons) * 100,
        )
      : 0;
  const remainingPercent = Math.max(0, 100 - progressPercent);

  return (
    <main className='bg-[#f7f8fa] px-6 py-10 font-["DM_Sans",sans-serif] text-[#0b1d3a]'>
      <div className='mx-auto grid max-w-6xl gap-7 lg:grid-cols-[320px_minmax(0,1fr)]'>
        <aside className='flex flex-col gap-5'>
          <section className='rounded-[20px] border-[1.5px] border-[#eef0f4] bg-white px-6 py-8 text-center shadow-[0_2px_8px_rgba(11,29,58,0.08)]'>
            <div className='mx-auto mb-4 flex size-22 items-center justify-center rounded-full border-4 border-[#f5a623] bg-linear-to-br from-[#0b1d3a] to-[#1e3a5f] text-4xl text-white'>
              👤
            </div>
            <h1 className='font-["Syne",sans-serif] text-xl font-bold text-[#0b1d3a]'>
              {currentUser.name}
            </h1>
            <p className='mt-1 text-sm text-[#8f9bb3]'>{currentUser.email}</p>
            <div className='my-4 inline-flex rounded-full bg-[#f5a623]/15 px-3.5 py-1 text-sm font-bold text-[#f5a623]'>
              {currentUser.drivingCategory} Kategorija
            </div>

            <div className='text-left'>
              <div className='flex items-center gap-2.5 border-b border-[#eef0f4] py-2.5 text-sm text-[#4a5568]'>
                <span className='w-5 text-center'>✉️</span>
                <div>
                  <div className='text-xs text-[#8f9bb3]'>Email</div>
                  <div className='font-medium text-[#0b1d3a]'>
                    {currentUser.email}
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2.5 border-b border-[#eef0f4] py-2.5 text-sm text-[#4a5568]'>
                <span className='w-5 text-center'>📱</span>
                <div>
                  <div className='text-xs text-[#8f9bb3]'>Telefon</div>
                  <div className='font-medium text-[#0b1d3a]'>
                    {currentUser.phone}
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2.5 border-b border-[#eef0f4] py-2.5 text-sm text-[#4a5568]'>
                <span className='w-5 text-center'>🎓</span>
                <div>
                  <div className='text-xs text-[#8f9bb3]'>Kategorija</div>
                  <div className='font-medium text-[#0b1d3a]'>
                    {course?.title ??
                      `${currentUser.drivingCategory} Kategorija`}
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2.5 py-2.5 text-sm text-[#4a5568]'>
                <span className='w-5 text-center'>🏅</span>
                <div>
                  <div className='text-xs text-[#8f9bb3]'>Status</div>
                  <div className='font-medium text-[#0b1d3a]'>U toku obuke</div>
                </div>
              </div>
            </div>
          </section>

          <section className='rounded-[20px] border-[1.5px] border-[#eef0f4] bg-white p-6 shadow-[0_2px_8px_rgba(11,29,58,0.08)]'>
            <h2 className='mb-3.5 font-["Syne",sans-serif] text-xs font-bold tracking-widest text-[#8f9bb3] uppercase'>
              Vaš instruktor
            </h2>
            <div className='flex items-center gap-3'>
              <div className='flex size-12.5 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#1e3a5f] to-[#0b1d3a] text-2xl'>
                👨
              </div>
              <div>
                <div className='font-semibold text-[#0b1d3a]'>
                  {instructor.name}
                </div>
                <div className='text-sm text-[#8f9bb3]'>
                  ⭐ {instructor.rating} · {instructor.categories.join(', ')}
                </div>
              </div>
            </div>
          </section>
        </aside>

        <section className='flex flex-col gap-5'>
          <article className='rounded-[20px] border-[1.5px] border-[#eef0f4] bg-white p-7 shadow-[0_2px_8px_rgba(11,29,58,0.08)]'>
            <h2 className='mb-5 font-["Syne",sans-serif] text-lg font-bold text-[#0b1d3a]'>
              📊 Ukupni napredak obuke
            </h2>
            <div className='mb-5'>
              <div className='mb-2 flex items-center justify-between gap-4'>
                <span className='font-bold text-[#0b1d3a]'>
                  Završenost obuke
                </span>
                <span className='font-extrabold text-[#f5a623]'>
                  {progressPercent}%
                </span>
              </div>
              <div className='h-3 overflow-hidden rounded-full bg-[#eef0f4]'>
                <div
                  className='h-full rounded-full bg-linear-to-r from-[#f5a623] to-[#ff6b35]'
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className='mt-2 text-sm text-[#8f9bb3]'>
                Odlično napredujete! Ostalo je još {remainingPercent}% do
                završetka obuke.
              </p>
            </div>

            <div className='grid gap-3 sm:grid-cols-3'>
              <div className='rounded-xl bg-[#f7f8fa] p-4 text-center'>
                <div className='font-["Syne",sans-serif] text-2xl font-extrabold text-[#0b1d3a]'>
                  {currentUser.completedLessons}/{currentUser.totalLessons}
                </div>
                <div className='mt-1 text-xs text-[#8f9bb3]'>Časovi vožnje</div>
              </div>
              <div className='rounded-xl bg-[#f7f8fa] p-4 text-center'>
                <div className='font-["Syne",sans-serif] text-2xl font-extrabold text-[#0b1d3a]'>
                  {scheduledLessons.length}
                </div>
                <div className='mt-1 text-xs text-[#8f9bb3]'>
                  Zakazani časovi
                </div>
              </div>
              <div className='rounded-xl bg-[#f7f8fa] p-4 text-center'>
                <div className='font-["Syne",sans-serif] text-2xl font-extrabold text-[#22c55e]'>
                  3/4
                </div>
                <div className='mt-1 text-xs text-[#8f9bb3]'>
                  Položeni testovi
                </div>
              </div>
            </div>
          </article>

          <article className='rounded-[20px] border-[1.5px] border-[#eef0f4] bg-white p-7 shadow-[0_2px_8px_rgba(11,29,58,0.08)]'>
            <div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
              <h2 className='font-["Syne",sans-serif] text-lg font-bold text-[#0b1d3a]'>
                🗓️ Zakazani časovi
              </h2>
              <Link
                className='inline-flex items-center justify-center rounded-xl bg-[#f5a623] px-4 py-2 text-sm font-semibold text-[#0b1d3a] transition hover:bg-[#e8961a]'
                to='/schedule'
              >
                + Zakaži novi čas
              </Link>
            </div>

            {scheduledLessons.length === 0 ? (
              <div className='rounded-xl border border-dashed border-[#d8dce6] bg-[#f7f8fa] p-6 text-center'>
                <p className='text-sm leading-6 text-[#4a5568]'>
                  Trenutno nemate zakazane časove.
                </p>
              </div>
            ) : (
              <div className='space-y-3'>
                {scheduledLessons.map((lesson) => {
                  const dateParts = getDateParts(lesson.date);

                  return (
                    <div
                      className='flex flex-col gap-4 rounded-xl border-[1.5px] border-[#eef0f4] bg-[#f7f8fa] p-4 sm:flex-row sm:items-center'
                      key={lesson.id}
                    >
                      <div className='w-15 shrink-0 rounded-md bg-[#0b1d3a] px-3 py-2 text-center text-white'>
                        <div className='font-["Syne",sans-serif] text-2xl font-extrabold leading-none'>
                          {dateParts.day}
                        </div>
                        <div className='mt-1 text-[0.7rem] tracking-[0.08em] uppercase opacity-70'>
                          {dateParts.month}
                        </div>
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-semibold text-[#0b1d3a]'>
                          {lessonTypeLabels[lesson.lessonType]}
                        </h3>
                        <p className='mt-1 text-sm text-[#4a5568]'>
                          {formatDate(lesson.date)} · {lesson.time}
                        </p>
                        <p className='mt-1 text-sm text-[#8f9bb3]'>
                          Instruktor: {lesson.instructorName} · Kategorija{' '}
                          {lesson.category}
                        </p>
                        {lesson.note && (
                          <p className='mt-2 rounded-lg bg-white p-3 text-sm leading-6 text-[#4a5568]'>
                            {lesson.note}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </article>
        </section>
      </div>
    </main>
  );
};

export default Profile;
