import CompatStrip from './_components/CompatStrip';
import CtaBanner from './_components/CtaBanner';
import Features from './_components/Features';
import Footer from './_components/Footer';
import Header from './_components/Header';
import Hero from './_components/Hero';
import Services from './_components/Services';
import Stats from './_components/Stats';
import Steps from './_components/Steps';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CompatStrip />
        <Stats />
        <Steps />
        <Services />
        <Features />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
