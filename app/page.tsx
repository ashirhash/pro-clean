import Banner from "@/components/Banner";
import CaseStudy from "@/components/CaseStudy";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import MostRecentJob from "@/components/MostRecentJob";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      {/* <MostRecentJob /> */}
      {/* <Intro /> */}
      <Services />
      <CaseStudy />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
