import { useEffect, useMemo, useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';

import { courseCategories } from '../data/courseCategories';
import { instructors } from '../data/instructors';
import { useAuth } from '../contexts/useAuth';
import {
  addScheduledLesson,
  getAllScheduledLessons,
  getScheduledLessonsForUser,
} from '../services/scheduledLessonsStorage';
import {
  getBelgradeDailyForecast,
  type DailyWeatherForecast,
} from '../services/WeatherService';
import type { LessonType, ScheduledLesson } from '../types/ScheduledLesson';

type WeatherForecastState =
  | {
      status: 'idle' | 'loading';
    }
  | {
      forecast: DailyWeatherForecast;
      status: 'success';
    }
  | {
      message: string;
      status: 'error';
    };

const lessonTypeOptions: { label: string; value: LessonType }[] = [
  {
    label: '🚗 Praktična vožnja',
    value: 'practical',
  },
  {
    label: '📚 Teorijska nastava',
    value: 'theory',
  },
  {
    label: '🏁 Vožnja na poligonu',
    value: 'polygon',
  },
  {
    label: '📝 Priprema za ispit',
    value: 'exam-prep',
  },
];

const timeSlots = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
];

const getTodayInputValue = () => new Date().toISOString().split('T')[0];

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('sr-Latn-RS', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`));

const getLessonTypeLabel = (lessonType: LessonType) =>
  lessonTypeOptions.find((option) => option.value === lessonType)?.label ??
  lessonType;

const ScheduleLesson = () => {
  const { currentUser } = useAuth();
  const [category, setCategory] = useState('B');
  const [lessonType, setLessonType] = useState<LessonType>('practical');
  const [date, setDate] = useState(getTodayInputValue);
  const [time, setTime] = useState('08:00');
  const [instructorId, setInstructorId] = useState('nikola');
  const [note, setNote] = useState('');
  const [weatherForecastState, setWeatherForecastState] =
    useState<WeatherForecastState>({
      status: 'idle',
    });
  const [scheduledLessons, setScheduledLessons] = useState<ScheduledLesson[]>(
    () => (currentUser ? getScheduledLessonsForUser(currentUser.id) : []),
  );

  const availableInstructors = useMemo(
    () =>
      instructors.filter((instructor) =>
        instructor.categories.includes(category),
      ),
    [category],
  );

  const effectiveInstructorId = availableInstructors.some(
    (instructor) => instructor.id === instructorId,
  )
    ? instructorId
    : (availableInstructors[0]?.id ?? '');

  const selectedInstructor = availableInstructors.find(
    (instructor) => instructor.id === effectiveInstructorId,
  );

  const bookedSlots = getAllScheduledLessons()
    .filter(
      (lesson) =>
        lesson.date === date && lesson.instructorId === effectiveInstructorId,
    )
    .map((lesson) => lesson.time);

  useEffect(() => {
    let isCurrentRequest = true;

    const loadWeatherForecast = async () => {
      if (!date) {
        setWeatherForecastState({ status: 'idle' });
        return;
      }

      setWeatherForecastState({ status: 'loading' });

      try {
        const forecast = await getBelgradeDailyForecast(date);

        if (isCurrentRequest) {
          setWeatherForecastState({
            forecast,
            status: 'success',
          });
        }
      } catch (error) {
        if (isCurrentRequest) {
          setWeatherForecastState({
            message:
              error instanceof Error
                ? error.message
                : 'Vremenska prognoza trenutno nije dostupna.',
            status: 'error',
          });
        }
      }
    };

    void loadWeatherForecast();

    return () => {
      isCurrentRequest = false;
    };
  }, [date]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentUser || !selectedInstructor) {
      toast.error('Izaberite instruktora za odabranu kategoriju.');
      return;
    }

    if (!category || !lessonType || !date || !time || !effectiveInstructorId) {
      toast.error('Popunite sva obavezna polja za zakazivanje.');
      return;
    }

    if (bookedSlots.includes(time)) {
      toast.error('Izabrani termin je već zauzet. Odaberite drugo vreme.');
      return;
    }

    const scheduledLesson = addScheduledLesson(currentUser.id, {
      category,
      date,
      instructorId: effectiveInstructorId,
      instructorName: selectedInstructor.name,
      lessonType,
      note: note.trim(),
      time,
    });

    setScheduledLessons((currentLessons) =>
      [...currentLessons, scheduledLesson].sort((firstLesson, secondLesson) =>
        `${firstLesson.date}T${firstLesson.time}`.localeCompare(
          `${secondLesson.date}T${secondLesson.time}`,
        ),
      ),
    );
    setNote('');
    toast.success(`Čas je zakazan za ${formatDate(date)} u ${time}.`);
  };

  return (
    <main className='bg-[#f7f8fa] font-["DM_Sans",sans-serif] text-[#0b1d3a]'>
      <section className='bg-linear-to-br from-[#0b1d3a] to-[#1e3a5f] px-6 py-16 text-center'>
        <div className='mx-auto max-w-3xl'>
          <div className='mb-3 inline-flex items-center justify-center gap-2 text-xs font-bold tracking-[0.12em] text-[#f5a623] uppercase before:block before:h-0.5 before:w-6 before:rounded-full before:bg-[#f5a623]'>
            Zakazivanje
          </div>
          <h1 className='mb-3 font-["Syne",sans-serif] text-4xl leading-tight font-extrabold text-white md:text-5xl'>
            Zakaži čas vožnje
          </h1>
          <p className='text-base leading-7 text-white/65'>
            Odaberite kategoriju, tip časa, instruktora i termin koji vam
            odgovara.
          </p>
        </div>
      </section>

      <section className='mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_360px]'>
        <form
          className='rounded-[20px] border-[1.5px] border-[#eef0f4] bg-white p-6 shadow-[0_2px_8px_rgba(11,29,58,0.08)] sm:p-8'
          onSubmit={handleSubmit}
        >
          <h2 className='mb-2 font-["Syne",sans-serif] text-2xl font-extrabold text-[#0b1d3a]'>
            Nova rezervacija
          </h2>
          <p className='mb-7 text-sm leading-6 text-[#4a5568]'>
            Popunite formu i potvrdite zakazivanje vašeg časa.
          </p>

          <div className='grid gap-5 md:grid-cols-2'>
            <label className='block'>
              <span className='mb-2 block text-sm font-semibold text-[#0b1d3a]'>
                Kategorija
              </span>
              <select
                className='w-full rounded-xl border-[1.5px] border-[#d8dce6] bg-white px-4 py-3 text-[0.95rem] text-[#0b1d3a] outline-none transition focus:border-[#f5a623] focus:shadow-[0_0_0_3px_rgba(245,166,35,0.15)]'
                onChange={(event) => setCategory(event.target.value)}
                value={category}
              >
                {courseCategories.map((course) => (
                  <option key={course.category} value={course.category}>
                    {course.category} - {course.title}
                  </option>
                ))}
              </select>
            </label>

            <label className='block'>
              <span className='mb-2 block text-sm font-semibold text-[#0b1d3a]'>
                Tip časa
              </span>
              <select
                className='w-full rounded-xl border-[1.5px] border-[#d8dce6] bg-white px-4 py-3 text-[0.95rem] text-[#0b1d3a] outline-none transition focus:border-[#f5a623] focus:shadow-[0_0_0_3px_rgba(245,166,35,0.15)]'
                onChange={(event) =>
                  setLessonType(event.target.value as LessonType)
                }
                value={lessonType}
              >
                {lessonTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className='block'>
              <span className='mb-2 block text-sm font-semibold text-[#0b1d3a]'>
                Datum
              </span>
              <input
                className='w-full rounded-xl border-[1.5px] border-[#d8dce6] bg-white px-4 py-3 text-[0.95rem] text-[#0b1d3a] outline-none transition focus:border-[#f5a623] focus:shadow-[0_0_0_3px_rgba(245,166,35,0.15)]'
                min={getTodayInputValue()}
                onChange={(event) => setDate(event.target.value)}
                type='date'
                value={date}
              />
            </label>

            <label className='block'>
              <span className='mb-2 block text-sm font-semibold text-[#0b1d3a]'>
                Instruktor
              </span>
              <select
                className='w-full rounded-xl border-[1.5px] border-[#d8dce6] bg-white px-4 py-3 text-[0.95rem] text-[#0b1d3a] outline-none transition focus:border-[#f5a623] focus:shadow-[0_0_0_3px_rgba(245,166,35,0.15)]'
                onChange={(event) => setInstructorId(event.target.value)}
                value={effectiveInstructorId}
              >
                {availableInstructors.map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.name} - {instructor.categories.join(', ')} ⭐{' '}
                    {instructor.rating}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className='mt-5 rounded-xl border-[1.5px] border-[#eef0f4] bg-[#f7f8fa] p-5'>
            <div className='mb-3 flex items-center justify-between gap-3'>
              <h3 className='font-["Syne",sans-serif] text-sm font-bold text-[#0b1d3a]'>
                🌤️ Prognoza za Beograd
              </h3>
              <span className='text-xs font-semibold text-[#8f9bb3]'>
                za izabrani datum
              </span>
            </div>

            {weatherForecastState.status === 'idle' && (
              <p className='text-sm leading-6 text-[#4a5568]'>
                Izaberite datum kako bismo prikazali prognozu.
              </p>
            )}

            {weatherForecastState.status === 'loading' && (
              <p className='text-sm leading-6 text-[#4a5568]'>
                Učitava se vremenska prognoza...
              </p>
            )}

            {weatherForecastState.status === 'error' && (
              <p className='text-sm leading-6 text-[#4a5568]'>
                {weatherForecastState.message} Prognoza je dostupna samo za
                narednih nekoliko dana, pa za udaljene termine proverite vreme
                kasnije.
              </p>
            )}

            {weatherForecastState.status === 'success' && (
              <div className='grid gap-3 text-sm sm:grid-cols-4'>
                <div className='rounded-lg bg-white p-3'>
                  <div className='text-xs font-bold tracking-[0.08em] text-[#8f9bb3] uppercase'>
                    Uslovi
                  </div>
                  <div className='mt-1 font-semibold text-[#0b1d3a]'>
                    {weatherForecastState.forecast.condition}
                  </div>
                </div>
                <div className='rounded-lg bg-white p-3'>
                  <div className='text-xs font-bold tracking-[0.08em] text-[#8f9bb3] uppercase'>
                    Temperatura
                  </div>
                  <div className='mt-1 font-semibold text-[#0b1d3a]'>
                    {Math.round(weatherForecastState.forecast.temperatureMin)}°/
                    {Math.round(weatherForecastState.forecast.temperatureMax)}°C
                  </div>
                </div>
                <div className='rounded-lg bg-white p-3'>
                  <div className='text-xs font-bold tracking-[0.08em] text-[#8f9bb3] uppercase'>
                    Padavine
                  </div>
                  <div className='mt-1 font-semibold text-[#0b1d3a]'>
                    {weatherForecastState.forecast.precipitationProbability}%
                  </div>
                </div>
                <div className='rounded-lg bg-white p-3'>
                  <div className='text-xs font-bold tracking-[0.08em] text-[#8f9bb3] uppercase'>
                    Vetar
                  </div>
                  <div className='mt-1 font-semibold text-[#0b1d3a]'>
                    {Math.round(weatherForecastState.forecast.windSpeedMax)}{' '}
                    km/h
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='mt-5'>
            <div className='mb-2 text-sm font-semibold text-[#0b1d3a]'>
              Vreme
            </div>
            <div className='grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4'>
              {timeSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = time === slot;

                return (
                  <button
                    className={[
                      'rounded-md border-[1.5px] px-2 py-3 text-sm font-semibold transition',
                      isBooked
                        ? 'cursor-not-allowed border-[#eef0f4] text-[#d8dce6] line-through'
                        : 'cursor-pointer',
                      isSelected && !isBooked
                        ? 'border-[#f5a623] bg-[#f5a623]/10 text-[#f5a623]'
                        : 'border-[#d8dce6] text-[#0b1d3a] hover:border-[#f5a623] hover:text-[#f5a623]',
                    ].join(' ')}
                    disabled={isBooked}
                    key={slot}
                    onClick={() => setTime(slot)}
                    type='button'
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
            <p className='mt-2.5 text-xs text-[#8f9bb3]'>
              Precrtani termini su već zauzeti za izabranog instruktora i datum.
            </p>
          </div>

          <label className='mt-5 block'>
            <span className='mb-2 block text-sm font-semibold text-[#0b1d3a]'>
              Napomena instruktoru (opciono)
            </span>
            <textarea
              className='min-h-28 w-full resize-y rounded-xl border-[1.5px] border-[#d8dce6] bg-white px-4 py-3 text-[0.95rem] text-[#0b1d3a] outline-none transition placeholder:text-[#8f9bb3] focus:border-[#f5a623] focus:shadow-[0_0_0_3px_rgba(245,166,35,0.15)]'
              onChange={(event) => setNote(event.target.value)}
              placeholder='npr. Trebam pomoć sa parkingom i vožnjom na raskrsnici...'
              value={note}
            />
          </label>

          <div className='mt-5 rounded-xl border-[1.5px] border-[#eef0f4] bg-[#f7f8fa] p-5'>
            <h3 className='mb-3.5 font-["Syne",sans-serif] text-sm font-bold text-[#0b1d3a]'>
              📋 Pregled rezervacije
            </h3>
            <div className='grid gap-3 text-sm sm:grid-cols-2'>
              <div>
                <span className='text-[#8f9bb3]'>Kategorija:</span>
                <br />
                <strong>{category}</strong>
              </div>
              <div>
                <span className='text-[#8f9bb3]'>Tip:</span>
                <br />
                <strong>{getLessonTypeLabel(lessonType)}</strong>
              </div>
              <div>
                <span className='text-[#8f9bb3]'>Datum:</span>
                <br />
                <strong>{formatDate(date)}</strong>
              </div>
              <div>
                <span className='text-[#8f9bb3]'>Vreme:</span>
                <br />
                <strong className='text-[#f5a623]'>{time}</strong>
              </div>
              <div className='sm:col-span-2'>
                <span className='text-[#8f9bb3]'>Instruktor:</span>
                <br />
                <strong>{selectedInstructor?.name ?? 'Nije izabran'}</strong>
              </div>
            </div>
          </div>

          <button
            className='mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#f5a623] px-[34px] py-4 text-base font-semibold text-[#0b1d3a] transition hover:-translate-y-px hover:bg-[#e8961a] hover:shadow-[0_8px_20px_rgba(245,166,35,0.35)]'
            type='submit'
          >
            Potvrdi zakazivanje
          </button>
        </form>

        <aside className='flex flex-col gap-5'>
          <section className='rounded-[20px] border-[1.5px] border-[#eef0f4] bg-white p-6 shadow-[0_2px_8px_rgba(11,29,58,0.08)]'>
            <h2 className='mb-4 font-["Syne",sans-serif] text-lg font-bold text-[#0b1d3a]'>
              Moji zakazani časovi
            </h2>
            {scheduledLessons.length === 0 ? (
              <p className='text-sm leading-6 text-[#4a5568]'>
                Još nemate zakazane časove. Popunite formu i prvi termin će se
                pojaviti ovde.
              </p>
            ) : (
              <div className='space-y-3'>
                {scheduledLessons.map((lesson) => (
                  <div
                    className='rounded-xl border border-[#eef0f4] bg-[#f7f8fa] p-4'
                    key={lesson.id}
                  >
                    <div className='mb-2 flex items-center justify-between gap-3'>
                      <span className='rounded-full bg-[#f5a623]/15 px-3 py-1 text-xs font-bold text-[#0b1d3a]'>
                        {lesson.category}
                      </span>
                      <span className='text-sm font-bold text-[#f5a623]'>
                        {lesson.time}
                      </span>
                    </div>
                    <h3 className='font-semibold text-[#0b1d3a]'>
                      {getLessonTypeLabel(lesson.lessonType)}
                    </h3>
                    <p className='mt-1 text-sm text-[#4a5568]'>
                      {formatDate(lesson.date)}
                    </p>
                    <p className='mt-1 text-sm text-[#8f9bb3]'>
                      {lesson.instructorName}
                    </p>
                    {lesson.note && (
                      <p className='mt-3 rounded-lg bg-white p-3 text-sm leading-6 text-[#4a5568]'>
                        {lesson.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </aside>
      </section>
    </main>
  );
};

export default ScheduleLesson;
