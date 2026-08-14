import { Link } from 'react-router-dom';

const stats = [
  {
    label: 'Uspešnih kandidata',
    value: '2.400+',
  },
  {
    label: 'Godina iskustva',
    value: '15+',
  },
  {
    label: 'Prolaznost na ispitu',
    value: '97%',
  },
];

const HeroSection = () => {
  return (
    <section className='relative overflow-hidden bg-linear-to-br from-[#0b1d3a] via-[#1e3a5f] to-[#1a4080] px-6 pt-20 pb-24 before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_70%_50%,rgba(245,166,35,0.12)_0%,transparent_65%)] after:absolute after:right-0 after:bottom-[-2px] after:left-0 after:h-[60px] after:bg-[#f7f8fa] after:[clip-path:ellipse(55%_100%_at_50%_100%)] sm:pt-24 md:pt-[100px] md:pb-28'>
      <div className='relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-[60px]'>
        <div>
          <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-[#f5a623]/30 bg-[#f5a623]/15 px-3.5 py-[7px] text-xs font-bold tracking-[0.1em] text-[#f5a623] uppercase'>
            ⭐ #1 Auto škola u gradu
          </div>
          <h1 className='mb-5 font-["Syne",sans-serif] text-[2.45rem] leading-[1.12] font-extrabold text-white sm:text-5xl lg:text-[3.4rem]'>
            Nauči da voziš
            <br />
            sigurno i
            <br />
            <span className='text-[#f5a623]'>samouvereno</span>
          </h1>
          <p className='mb-9 max-w-[520px] text-base leading-[1.72] text-white/75 sm:text-lg'>
            DrivePro Auto Škola nudi stručnu obuku za sve kategorije vozila. Sa
            iskusnim instruktorima, modernim vozilima i fleksibilnim terminima,
            tvoj put do vozačke dozvole nikada nije bio lakši.
          </p>
          <div className='flex flex-wrap gap-3.5'>
            <Link
              className='inline-flex items-center justify-center gap-2 rounded-xl bg-[#f5a623] px-[34px] py-4 text-base font-semibold whitespace-nowrap text-[#0b1d3a] transition hover:-translate-y-px hover:bg-[#e8961a] hover:shadow-[0_8px_20px_rgba(245,166,35,0.35)]'
              to='/lessons'
            >
              📚 Pogledaj obuke
            </Link>
            <Link
              className='inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-[34px] py-4 text-base font-semibold whitespace-nowrap text-white transition hover:border-white hover:bg-white/10'
              to='/schedule'
            >
              🗓️ Zakaži čas
            </Link>
          </div>
          <div className='mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-9 sm:flex sm:gap-8'>
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className='font-["Syne",sans-serif] text-2xl leading-none font-extrabold text-[#f5a623] sm:text-3xl'>
                  {stat.value}
                </div>
                <div className='mt-1 text-xs leading-5 text-white/55 sm:text-[0.82rem]'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='hidden flex-col items-center justify-center gap-5 lg:flex'>
          <div className='text-[9rem] leading-none drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)]'>
            🚗
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
