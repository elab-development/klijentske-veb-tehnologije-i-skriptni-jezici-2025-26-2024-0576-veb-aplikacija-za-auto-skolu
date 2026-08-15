import { useMemo, useState } from 'react';

import LessonCourseCard from '../components/lessons/LessonCourseCard';
import { courseCategories } from '../data/courseCategories';

const pageSize = 3;
const allCategoriesFilter = 'Sve';

const Lessons = () => {
  const [activeCategory, setActiveCategory] = useState(allCategoriesFilter);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryFilters = useMemo(
    () => [
      allCategoriesFilter,
      ...courseCategories.map((course) => course.category),
    ],
    [],
  );

  const filteredCourses = useMemo(() => {
    if (activeCategory === allCategoriesFilter) {
      return courseCategories;
    }

    return courseCategories.filter(
      (course) => course.category === activeCategory,
    );
  }, [activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / pageSize));
  const pageStartIndex = (currentPage - 1) * pageSize;
  const visibleCourses = filteredCourses.slice(
    pageStartIndex,
    pageStartIndex + pageSize,
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <main className='bg-[#f7f8fa] font-["DM_Sans",sans-serif] text-[#0b1d3a]'>
      <section className='bg-linear-to-br from-[#0b1d3a] to-[#1e3a5f] px-6 py-16 text-center'>
        <div className='mx-auto max-w-3xl'>
          <div className='mb-3 inline-flex items-center justify-center gap-2 text-xs font-bold tracking-[0.12em] text-[#f5a623] uppercase before:block before:h-0.5 before:w-6 before:rounded-full before:bg-[#f5a623]'>
            Kategorije vozačkih dozvola
          </div>
          <h1 className='mb-3 font-["Syne",sans-serif] text-4xl leading-tight font-extrabold text-white md:text-5xl'>
            Sve dostupne obuke
          </h1>
          <p className='text-base leading-7 text-white/65'>
            Odaberite kategoriju vozačke dozvole i saznajte sve detalje o
            obuci, ceni i uslovima.
          </p>
        </div>
      </section>

      <section className='px-6 py-10'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-8 flex flex-col gap-4 rounded-[20px] border border-[#eef0f4] bg-white p-5 shadow-[0_2px_8px_rgba(11,29,58,0.08)] md:flex-row md:items-center md:justify-between'>
            <div>
              <h2 className='font-["Syne",sans-serif] text-xl font-extrabold text-[#0b1d3a]'>
                Filtriraj obuke
              </h2>
              <p className='mt-1 text-sm text-[#4a5568]'>
                Prikazano {visibleCourses.length} od {filteredCourses.length}{' '}
                obuka
              </p>
            </div>

            <div
              className='flex flex-wrap gap-2'
              aria-label='Filter po kategoriji'
            >
              {categoryFilters.map((category) => {
                const isActive = category === activeCategory;

                return (
                  <button
                    className={[
                      'cursor-pointer rounded-full px-4 py-2 text-sm font-bold transition',
                      isActive
                        ? 'bg-[#f5a623] text-[#0b1d3a] shadow-[0_8px_20px_rgba(245,166,35,0.22)]'
                        : 'bg-[#f7f8fa] text-[#4a5568] hover:bg-[#0b1d3a] hover:text-white',
                    ].join(' ')}
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    type='button'
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className='grid gap-6 lg:grid-cols-3'>
            {visibleCourses.map((course) => (
              <LessonCourseCard course={course} key={course.category} />
            ))}
          </div>

          <div className='mt-10 flex flex-col items-center justify-between gap-4 rounded-[20px] border border-[#eef0f4] bg-white p-4 shadow-[0_2px_8px_rgba(11,29,58,0.08)] sm:flex-row'>
            <p className='text-sm font-semibold text-[#4a5568]'>
              Strana {currentPage} od {totalPages}
            </p>
            <div className='flex items-center gap-2'>
              <button
                className='cursor-pointer rounded-xl border-2 border-[#d8dce6] px-4 py-2 text-sm font-semibold text-[#0b1d3a] transition disabled:cursor-not-allowed disabled:opacity-45 enabled:hover:border-[#f5a623] enabled:hover:text-[#f5a623]'
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
                type='button'
              >
                Prethodna
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    className={[
                      'size-10 cursor-pointer rounded-xl text-sm font-bold transition',
                      page === currentPage
                        ? 'bg-[#0b1d3a] text-white'
                        : 'bg-[#f7f8fa] text-[#4a5568] hover:bg-[#f5a623] hover:text-[#0b1d3a]',
                    ].join(' ')}
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    type='button'
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                className='cursor-pointer rounded-xl border-2 border-[#d8dce6] px-4 py-2 text-sm font-semibold text-[#0b1d3a] transition disabled:cursor-not-allowed disabled:opacity-45 enabled:hover:border-[#f5a623] enabled:hover:text-[#f5a623]'
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
                type='button'
              >
                Sledeća
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Lessons;
