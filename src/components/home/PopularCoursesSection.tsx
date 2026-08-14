import { Link } from 'react-router-dom';

import { courseCategories } from '../../data/courseCategories';
import CourseCard from './CourseCard';

const popularCourses = courseCategories
  .filter((course) => course.isPopular)
  .slice(0, 3);

const PopularCoursesSection = () => {
  return (
    <section className='bg-white px-6 py-20 md:py-[88px]'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-12 max-w-2xl'>
          <div className='mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-[#f5a623] uppercase before:block before:h-0.5 before:w-6 before:rounded-full before:bg-[#f5a623]'>
            Kategorije obuke
          </div>
          <h2 className='mb-4 font-["Syne",sans-serif] text-3xl leading-[1.18] font-extrabold text-[#0b1d3a] md:text-[2.6rem]'>
            Popularne obuke
          </h2>
          <p className='text-base leading-7 text-[#4a5568] md:text-[1.05rem]'>
            Odaberite kategoriju vozačke dozvole i počnite svoju obuku danas.
          </p>
        </div>

        <div className='grid gap-6 lg:grid-cols-3'>
          {popularCourses.map((course) => (
            <CourseCard course={course} key={course.category} />
          ))}
        </div>

        <div className='mt-10 text-center'>
          <Link
            className='inline-flex items-center justify-center rounded-xl border-2 border-[#d8dce6] px-6 py-3 text-[0.95rem] font-semibold text-[#0b1d3a] transition hover:border-[#f5a623] hover:text-[#f5a623]'
            to='/lessons'
          >
            Pogledaj sve obuke
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;
