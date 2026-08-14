import BenefitsSection from '../components/home/BenefitsSection';
import HeroSection from '../components/home/HeroSection';
import PopularCoursesSection from '../components/home/PopularCoursesSection';

const Home = () => {
  return (
    <main className='bg-[#f7f8fa] font-["DM_Sans",sans-serif] text-[#0b1d3a]'>
      <HeroSection />
      <BenefitsSection />
      <PopularCoursesSection />
    </main>
  );
};

export default Home;
