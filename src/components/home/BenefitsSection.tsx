const benefits = [
  {
    description:
      'Naši instruktori imaju prosečno 12 godina iskustva i strpljiv, profesionalan pristup svakom polazniku.',
    icon: '👨‍🏫',
    title: 'Iskusni instruktori',
  },
  {
    description:
      'Vozni park opremljen najnovijim modelima vozila sa duplim komandama i svim sigurnosnim sistemima.',
    icon: '🚘',
    title: 'Moderna vozila',
  },
  {
    description:
      'Biramo termine koji vama odgovaraju - ujutru, popodne ili vikendom. Prilagođavamo se vašem rasporedu.',
    icon: '🗓️',
    title: 'Fleksibilni termini',
  },
  {
    description:
      'Pratite napredak obuke u realnom vremenu kroz našu platformu - statistike, rezultati, zakazani časovi.',
    icon: '📊',
    title: 'Online praćenje',
  },
];

const BenefitsSection = () => {
  return (
    <section className='px-6 py-20 md:py-[88px]'>
      <div className='mx-auto max-w-6xl'>
        <div className='mx-auto mb-12 max-w-2xl text-center'>
          <div className='mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-[#f5a623] uppercase before:block before:h-0.5 before:w-6 before:rounded-full before:bg-[#f5a623]'>
            Naše prednosti
          </div>
          <h2 className='mb-4 font-["Syne",sans-serif] text-3xl leading-[1.18] font-extrabold text-[#0b1d3a] md:text-[2.6rem]'>
            Zašto izabrati DrivePro?
          </h2>
          <p className='text-base leading-7 text-[#4a5568] md:text-[1.05rem]'>
            Pružamo kompletnu obuku uz personalizovani pristup svakom polazniku.
          </p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {benefits.map((benefit) => (
            <article
              className='group relative overflow-hidden rounded-[20px] border-[1.5px] border-[#eef0f4] bg-white px-6 py-8 transition hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(11,29,58,0.12)] before:absolute before:top-0 before:left-0 before:h-[3px] before:w-full before:origin-left before:scale-x-0 before:bg-linear-to-r before:from-[#f5a623] before:to-[#ff6b35] before:transition group-hover:before:scale-x-100'
              key={benefit.title}
            >
              <div className='mb-[18px] flex size-[52px] items-center justify-center rounded-xl bg-linear-to-br from-[#f5a623]/15 to-[#f5a623]/5 text-2xl'>
                {benefit.icon}
              </div>
              <h3 className='mb-2 font-["Syne",sans-serif] text-[1.05rem] font-bold text-[#0b1d3a]'>
                {benefit.title}
              </h3>
              <p className='text-[0.88rem] leading-[1.65] text-[#4a5568]'>
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
