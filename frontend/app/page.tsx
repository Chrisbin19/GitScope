import { About } from "@/components/sections/About";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <About />
    </>
  );
}
