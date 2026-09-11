# DrivePro Auto Škola

Veb aplikacija za auto školu, rađena kao seminarski rad iz predmeta
Elektronsko poslovanje. Aplikacija omogućava kandidatima da se prijave,
pregledaju obuke, zakažu čas vožnje i prate svoj profil.

## Funkcionalnosti

- Prijava korisnika (email + lozinka)
- Pregled dostupnih kategorija obuke (AM, A1, A2, A, B, C, D)
- Filtriranje obuka po kategoriji i paginacija
- Zakazivanje časa vožnje (kategorija, instruktor, datum, termin)
- Prikaz vremenske prognoze za Beograd prilikom biranja datuma (Open-Meteo API)
- Profil korisnika sa napretkom kroz obuku i listom zakazanih časova
- Zakazani časovi i podaci o korisniku se čuvaju u localStorage-u

## Tehnologije

React 19, TypeScript, Vite, React Router DOM, Tailwind CSS, react-hot-toast.

## Pokretanje projekta

```bash
npm install
npm run dev
```

Aplikacija se posle toga otvara na `http://localhost:5173`.

Za produkcioni build:

```bash
npm run build
```

## Test nalozi

- marko@drivepro.rs / marko123
- jelena@drivepro.rs / jelena123
- stefan@drivepro.rs / stefan123

## Struktura

- `src/pages` - stranice aplikacije
- `src/components` - komponente za višekratnu upotrebu
- `src/services` - klase za rad sa localStorage-om i API-jem
- `src/contexts` - autentifikacija korisnika
- `src/types` - TypeScript tipovi i interfejsi
- `src/data` - statički podaci (obuke, instruktori, korisnici)
