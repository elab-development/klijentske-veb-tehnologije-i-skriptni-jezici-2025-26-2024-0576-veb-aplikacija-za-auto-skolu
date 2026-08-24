import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/useAuth';

const authFeatures = [
  {
    icon: '🏆',
    label: 'Iskusni i sertifikovani instruktori',
  },
  {
    icon: '📱',
    label: 'Online praćenje napretka u realnom vremenu',
  },
  {
    icon: '🗓️',
    label: 'Fleksibilno zakazivanje časova',
  },
  {
    icon: '🎓',
    label: 'Visoka prolaznost na ispitima',
  },
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate replace to='/' />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Unesite email adresu i lozinku.');
      return;
    }

    const loggedInUser = login(email, password);

    if (!loggedInUser) {
      toast.error('Korisnik sa unetim podacima ne postoji.');
      return;
    }

    toast.success(`Dobrodošli, ${loggedInUser.name}!`);
    navigate('/');
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-[#0b1d3a] to-[#1e3a5f] font-['DM_Sans',sans-serif] text-[#0b1d3a] antialiased">
      <section
        className='grid min-h-screen grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(420px,1fr)]'
        aria-label='DrivePro prijava'
      >
        <aside
          className='relative hidden flex-col items-center justify-center overflow-hidden bg-linear-[160deg,#132848_0%,#0d2445_100%] px-12 py-15 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_70%,rgba(245,166,35,0.12)_0%,transparent_60%)] md:flex'
          aria-label='Prednosti DrivePro škole'
        >
          <div
            className='relative mb-8 text-8xl leading-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]'
            aria-hidden='true'
          >
            🚗
          </div>
          <h1 className="relative mb-4 text-center font-['Syne',sans-serif] text-[2.2rem] leading-[1.2] font-extrabold text-white">
            Dobrodošli nazad u
            <br />
            <span className='text-[#f5a623]'>DrivePro</span>
          </h1>
          <p className='relative m-0 max-w-90 text-center text-[0.95rem] leading-[1.6] text-white/60'>
            Vaš pouzdani partner na putu do vozačke dozvole.
          </p>

          <div className='relative mt-8 flex w-full max-w-95 flex-col gap-2.5'>
            {authFeatures.map((feature) => (
              <div
                className='flex items-center gap-2.5 text-[0.85rem] text-white/70'
                key={feature.label}
              >
                <div
                  className='flex size-7.5 shrink-0 items-center justify-center rounded-md bg-[#f5a623]/15 text-[0.9rem]'
                  aria-hidden='true'
                >
                  {feature.icon}
                </div>
                <span>{feature.label}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className='flex min-h-screen items-center justify-center bg-white px-7 py-10 max-[420px]:px-5 max-[420px]:py-8 md:px-14 md:py-15'>
          <div className='w-full max-w-110'>
            <div
              className="mb-8 flex items-center gap-2.5 font-['Syne',sans-serif] text-xl font-extrabold text-[#0b1d3a] max-[420px]:mb-7"
              aria-label='DrivePro'
            >
              <div
                className='flex size-8.5 items-center justify-center rounded-md bg-[#f5a623]'
                aria-hidden='true'
              >
                🚘
              </div>
              Drive<span className='text-[#f5a623]'>Pro</span>
            </div>

            <header className='mb-9 max-[420px]:mb-7'>
              <h2 className="mb-2 font-['Syne',sans-serif] text-[1.9rem] leading-[1.15] font-extrabold text-[#0b1d3a]">
                Prijavite se
              </h2>
              <p className='m-0 text-[0.95rem] text-[#4a5568]'>
                Unesite vaše podatke za pristup nalogu
              </p>
            </header>

            <form onSubmit={handleSubmit}>
              <div className='mb-5'>
                <label
                  className='mb-1.75 block text-sm font-semibold text-[#0b1d3a]'
                  htmlFor='email'
                >
                  Email adresa
                </label>
                <div className='relative'>
                  <span
                    className='pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-base text-[#8f9bb3]'
                    aria-hidden='true'
                  >
                    ✉️
                  </span>
                  <input
                    autoComplete='email'
                    className='w-full rounded-xl border-[1.5px] border-[#d8dce6] bg-white py-3 pr-4 pl-10.5 text-[0.95rem] text-[#0b1d3a] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#8f9bb3] focus:border-[#f5a623] focus:shadow-[0_0_0_3px_rgba(245,166,35,0.15)]'
                    id='email'
                    name='email'
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='Unesite email adresu'
                    type='email'
                    value={email}
                  />
                </div>
              </div>

              <div className='mb-5'>
                <label
                  className='mb-1.75 block text-sm font-semibold text-[#0b1d3a]'
                  htmlFor='password'
                >
                  Lozinka
                </label>
                <div className='relative'>
                  <span
                    className='pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-base text-[#8f9bb3]'
                    aria-hidden='true'
                  >
                    🔒
                  </span>
                  <input
                    autoComplete='current-password'
                    className='w-full rounded-xl border-[1.5px] border-[#d8dce6] bg-white py-3 pr-4 pl-10.5 text-[0.95rem] text-[#0b1d3a] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#8f9bb3] focus:border-[#f5a623] focus:shadow-[0_0_0_3px_rgba(245,166,35,0.15)]'
                    id='password'
                    name='password'
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder='Unesite lozinku'
                    type='password'
                    value={password}
                  />
                </div>
              </div>

              <button
                className='inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#f5a623] px-8.5 py-4 text-base font-semibold whitespace-nowrap text-[#0b1d3a] transition duration-200 hover:-translate-y-px hover:bg-[#e8961a] hover:shadow-[0_8px_20px_rgba(245,166,35,0.35)] max-[420px]:whitespace-normal'
                type='submit'
              >
                Prijavi se
              </button>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Login;
