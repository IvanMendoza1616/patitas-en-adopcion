import Hero from "./components/home/Hero";
import HowItWorks from "./components/home/HowItWorks";
import Testimonials from "./components/home/Testimonials";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <HowItWorks />
      <Testimonials />
    </main>
  );
}
