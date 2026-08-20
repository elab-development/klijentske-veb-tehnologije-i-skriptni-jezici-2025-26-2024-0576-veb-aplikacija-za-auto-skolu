import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='mt-auto bg-[#0b1d3a] px-6 pt-14 pb-8 font-["DM_Sans",sans-serif] text-white/70'>
      <div className='mx-auto mb-10 grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]'>
        <div>
          <Link
            className='mb-3.5 flex items-center gap-2.5 font-["Syne",sans-serif] text-xl font-extrabold text-white'
            to='/'
          >
            <span
              className='flex size-[38px] items-center justify-center rounded-md bg-[#f5a623] text-[1.1rem]'
              aria-hidden='true'
            >
              🚘
            </span>
            Drive<span className='text-[#f5a623]'>Pro</span>
          </Link>
          <p className='max-w-[280px] text-sm leading-7'>
            DrivePro Auto Škola - vaš pouzdani partner na putu do vozačke
            dozvole.
          </p>
        </div>

        <div>
          <h2 className='mb-4 font-["Syne",sans-serif] text-[0.85rem] font-bold tracking-[0.08em] text-white uppercase'>
            Navigacija
          </h2>
          <ul className='space-y-2.5 text-sm'>
            <li>
              <Link className='transition hover:text-[#f5a623]' to='/'>
                Početna
              </Link>
            </li>
            <li>
              <Link className='transition hover:text-[#f5a623]' to='/lessons'>
                Obuke
              </Link>
            </li>
            <li>
              <Link className='transition hover:text-[#f5a623]' to='/schedule'>
                Zakaži čas
              </Link>
            </li>
            <li>
              <Link className='transition hover:text-[#f5a623]' to='/profile'>
                Moj profil
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className='mb-4 font-["Syne",sans-serif] text-[0.85rem] font-bold tracking-[0.08em] text-white uppercase'>
            Kategorije
          </h2>
          <ul className='space-y-2.5 text-sm'>
            <li>
              <Link className='transition hover:text-[#f5a623]' to='/lessons'>
                B kategorija
              </Link>
            </li>
            <li>
              <Link className='transition hover:text-[#f5a623]' to='/lessons'>
                A kategorija
              </Link>
            </li>
            <li>
              <Link className='transition hover:text-[#f5a623]' to='/lessons'>
                C kategorija
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className='mb-4 font-["Syne",sans-serif] text-[0.85rem] font-bold tracking-[0.08em] text-white uppercase'>
            Kontakt
          </h2>
          <ul className='space-y-2.5 text-sm'>
            <li className='flex items-start gap-2'>
              📍 <span>Vojvode Stepe 42, Beograd</span>
            </li>
            <li className='flex items-start gap-2'>
              📞 <span>+381 11 234 5678</span>
            </li>
            <li className='flex items-start gap-2'>
              ✉️ <span>info@drivepro.rs</span>
            </li>
          </ul>
        </div>
      </div>

      <div className='mx-auto flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-7 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between'>
        <span>© 2026 DrivePro Auto Škola.</span>
        <span>Dizajnirano za bezbednost u saobraćaju</span>
      </div>
    </footer>
  );
};

export default Footer;
