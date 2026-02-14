import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <>
      <SEO />
      <Hero />
      <About />
      <Skills />
      <Projects />
    </>
  );
};

export default Home;
