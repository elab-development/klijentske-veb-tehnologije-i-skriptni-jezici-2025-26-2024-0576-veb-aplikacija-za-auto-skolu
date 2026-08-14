import { Link } from 'react-router-dom';

import type { CourseCategory } from '../../data/courseCategories';

interface CourseCardProps {
  course: CourseCategory;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <article className='overflow-hidden rounded-[20px] border-[1.5px] border-[#eef0f4] bg-white transition hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(11,29,58,0.12)]'>
      <div className='flex items-center gap-4 bg-linear-to-br from-[#0b1d3a] to-[#1e3a5f] px-6 py-7'>
        <div className='flex size-14 shrink-0 items-center justify-center rounded-xl border-2 border-[#f5a623]/30 bg-[#f5a623]/15 font-["Syne",sans-serif] text-2xl font-extrabold text-[#f5a623]'>
          {course.category}
        </div>
        <div>
          <h3 className='mb-1 font-["Syne",sans-serif] text-base font-bold text-white'>
            {course.title}
          </h3>
          <p className='text-[0.82rem] leading-5 text-white/60'>
            {course.description}
          </p>
        </div>
      </div>
      <div className='px-6 py-[22px]'>
        <div className='mb-[18px] flex flex-wrap gap-4'>
          <span className='text-[0.82rem] text-[#4a5568]'>
            📚 {course.theoryLessons} teorij.
          </span>
          <span className='text-[0.82rem] text-[#4a5568]'>
            {course.vehicleIcon} {course.drivingLessons} vožnji
          </span>
          <span className='text-[0.82rem] text-[#4a5568]'>
            ⏱️ {course.duration}
          </span>
        </div>
        <div className='mb-4 font-["Syne",sans-serif] text-2xl font-extrabold text-[#0b1d3a]'>
          {course.price}{' '}
          <span className='font-["DM_Sans",sans-serif] text-[0.85rem] font-normal text-[#8f9bb3]'>
            RSD
          </span>
        </div>
        <Link
          className='inline-flex w-full items-center justify-center rounded-xl bg-[#f5a623] px-6 py-3 text-[0.95rem] font-semibold text-[#0b1d3a] transition hover:-translate-y-px hover:bg-[#e8961a] hover:shadow-[0_8px_20px_rgba(245,166,35,0.35)]'
          to='/lessons'
        >
          Pogledaj detalje
        </Link>
      </div>
    </article>
  );
};

export default CourseCard;
