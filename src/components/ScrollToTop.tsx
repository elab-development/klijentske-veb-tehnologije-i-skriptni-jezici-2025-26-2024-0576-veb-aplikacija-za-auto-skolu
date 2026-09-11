import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Prati trenutnu putanju (pathname) preko useLocation hooka i
 * automatski vraća scroll na vrh stranice svaki put kada korisnik
 * pređe na novu rutu (npr. sa Početne na Obuke).
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
