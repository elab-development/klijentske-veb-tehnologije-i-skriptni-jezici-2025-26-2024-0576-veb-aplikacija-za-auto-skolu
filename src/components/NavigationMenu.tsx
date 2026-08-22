import { useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/useAuth';

const navItems = [
  {
    icon: '🏠',
    label: 'Početna',
    to: '/',
  },
  {
    icon: '📚',
    label: 'Obuke',
    to: '/lessons',
  },
  {
    icon: '🗓️',
    label: 'Zakaži čas',
    to: '/schedule',
  },
  {
    icon: '👤',
    label: 'Moj profil',
    to: '/profile',
  },
];

const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3.5 py-2 text-sm font-medium whitespace-nowrap transition',
    isActive
      ? 'bg-white/10 text-[#f5a623]'
      : 'text-white/70 hover:bg-white/10 hover:text-white',
  ].join(' ');

const NavigationMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    toast.success('Uspešno ste se odjavili.');
    navigate('/login');
  };

  return (
    <nav className='sticky top-0 z-50 border-b border-white/10 bg-[#0b1d3a] font-["DM_Sans",sans-serif]'>
      <div className='mx-auto flex h-17 max-w-6xl items-center justify-between gap-6 px-5 sm:px-6'>
        <NavLink
          className='flex shrink-0 items-center gap-2.5 font-["Syne",sans-serif] text-[1.35rem] font-extrabold text-white'
          onClick={closeMenu}
          to='/'
        >
          <span
            className='flex size-9.5 items-center justify-center rounded-md bg-[#f5a623] text-[1.1rem]'
            aria-hidden='true'
          >
            🚘
          </span>
          Drive<span className='text-[#f5a623]'>Pro</span>
        </NavLink>

        <div className='hidden items-center gap-1 md:flex'>
          {navItems.map((item) => (
            <NavLink className={getLinkClassName} key={item.to} to={item.to}>
              <span aria-hidden='true'>{item.icon}</span> {item.label}
            </NavLink>
          ))}
          <button
            className='ml-2 cursor-pointer rounded-md bg-[#f5a623] px-3.5 py-2 text-sm font-bold whitespace-nowrap text-[#0b1d3a] transition hover:bg-[#e8961a]'
            onClick={handleLogout}
            type='button'
          >
            Odjava
          </button>
        </div>

        <div className='flex items-center gap-3 md:hidden'>
          <span className='hidden max-w-35 truncate text-sm font-semibold text-white/70 min-[420px]:block'>
            {currentUser?.name}
          </span>
          <button
            className='flex size-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border border-white/15 bg-white/5 text-white transition hover:bg-white/10'
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
            onClick={() => setIsMenuOpen((current) => !current)}
            type='button'
          >
            <span className='h-0.5 w-5 rounded-full bg-current' />
            <span className='h-0.5 w-5 rounded-full bg-current' />
            <span className='h-0.5 w-5 rounded-full bg-current' />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className='border-t border-white/10 bg-[#0b1d3a] px-5 py-4 shadow-2xl shadow-[#0b1d3a]/30 md:hidden'>
          <div className='mx-auto flex max-w-6xl flex-col gap-2'>
            {navItems.map((item) => (
              <NavLink
                className={getLinkClassName}
                key={item.to}
                onClick={closeMenu}
                to={item.to}
              >
                <span aria-hidden='true'>{item.icon}</span> {item.label}
              </NavLink>
            ))}
            <button
              className='mt-2 flex cursor-pointer items-center justify-center rounded-md bg-[#f5a623] px-3.5 py-3 text-sm font-bold text-[#0b1d3a] transition hover:bg-[#e8961a]'
              onClick={handleLogout}
              type='button'
            >
              Odjava
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;
