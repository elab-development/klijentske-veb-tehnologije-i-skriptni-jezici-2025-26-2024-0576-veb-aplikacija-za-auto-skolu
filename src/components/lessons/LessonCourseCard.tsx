import toast from 'react-hot-toast';

import type { CourseCategory } from '../../data/courseCategories';

interface LessonCourseCardProps {
  course: CourseCategory;
}

const LessonCourseCard = ({ course }: LessonCourseCardProps) => {
  const handleDetailsClick = () => {
    toast(`${course.title} - detalji će biti dostupni uskoro.`);
  };

  return (
    <article
      className={[
        'overflow-hidden rounded-[20px] border-[1.5px] bg-white transition hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(11,29,58,0.12)]',
        course.category === 'B'
          ? 'border-[#f5a623]/40 shadow-[0_0_0_3px_rgba(245,166,35,0.1)]'
          : 'border-[#eef0f4]',
      ].join(' ')}
    >
      <div className='flex items-center gap-4 bg-linear-to-br from-[#0b1d3a] to-[#132848] p-6'>
        <div className='flex size-[60px] shrink-0 items-center justify-center rounded-xl border-2 border-[#f5a623]/30 bg-[#f5a623]/15 font-["Syne",sans-serif] text-[2rem] font-extrabold text-[#f5a623]'>
          {course.category}
        </div>
        <div>
          <h3 className='mb-1 flex flex-wrap items-center gap-2 font-["Syne",sans-serif] text-[1.05rem] font-bold text-white'>
            {course.title}
            {course.category === 'B' && (
              <span className='rounded-full bg-[#f5a623] px-2 py-0.5 text-[0.7rem] font-bold text-[#0b1d3a]'>
                NAJPOPULARNIJA
              </span>
            )}
          </h3>
          <p className='text-[0.82rem] leading-5 text-white/55'>
            {course.description}
          </p>
        </div>
      </div>

      <div className='p-[22px]'>
        <div className='mb-[18px] grid grid-cols-2 gap-2.5 max-[480px]:grid-cols-1'>
          <div className='rounded-md bg-[#f7f8fa] px-3 py-2.5'>
            <div className='mb-1 text-[0.72rem] font-bold tracking-[0.08em] text-[#8f9bb3] uppercase'>
              Teorija
            </div>
            <div className='text-[0.92rem] font-semibold text-[#0b1d3a]'>
              {course.theoryLessons} časova
            </div>
          </div>
          <div className='rounded-md bg-[#f7f8fa] px-3 py-2.5'>
            <div className='mb-1 text-[0.72rem] font-bold tracking-[0.08em] text-[#8f9bb3] uppercase'>
              Vožnja
            </div>
            <div className='text-[0.92rem] font-semibold text-[#0b1d3a]'>
              {course.drivingLessons} časova
            </div>
          </div>
          <div className='rounded-md bg-[#f7f8fa] px-3 py-2.5'>
            <div className='mb-1 text-[0.72rem] font-bold tracking-[0.08em] text-[#8f9bb3] uppercase'>
              Trajanje
            </div>
            <div className='text-[0.92rem] font-semibold text-[#0b1d3a]'>
              {course.duration}
            </div>
          </div>
          <div className='rounded-md bg-[#f7f8fa] px-3 py-2.5'>
            <div className='mb-1 text-[0.72rem] font-bold tracking-[0.08em] text-[#8f9bb3] uppercase'>
              Starost
            </div>
            <div className='text-[0.92rem] font-semibold text-[#0b1d3a]'>
              min. {course.minAge} god.
            </div>
          </div>
        </div>

        <div className='mt-4 flex items-center justify-between gap-4'>
          <div className='font-["Syne",sans-serif] text-2xl font-extrabold text-[#0b1d3a]'>
            {course.price}{' '}
            <span className='font-["DM_Sans",sans-serif] text-xs font-normal text-[#8f9bb3]'>
              RSD
            </span>
          </div>
          <button
            className='cursor-pointer rounded-xl bg-[#f5a623] px-[18px] py-2.5 text-sm font-semibold whitespace-nowrap text-[#0b1d3a] transition hover:-translate-y-px hover:bg-[#e8961a] hover:shadow-[0_8px_20px_rgba(245,166,35,0.35)]'
            onClick={handleDetailsClick}
            type='button'
          >
            Detalji
          </button>
        </div>
      </div>
    </article>
  );
};

export default LessonCourseCard;
