import HeroSection from '@/components/sections/HeroSection';
import EcosystemSection from '@/components/sections/EcosystemSection';
import StorySection from '@/components/sections/StorySection';
import EthicsSection from '@/components/sections/EthicsSection';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <EcosystemSection />
      <StorySection />
      <EthicsSection />
      <CTASection />
    </div>
  );
}