import Navigation from '../../../shared/components/Navigation';
import Hero from './Hero';
import WelcomeGrid from './WelcomeGrid';
import StrategyCards from './StrategyCards';
import WelcomeVideo from './WelcomeVideo';
import WhatToExpect from './WhatToExpect';
import WelcomeExperienceFlow from './WelcomeExperienceFlow';
// import PlanVisitForm from './PlanVisitForm';
import FooterCTA from './FooterCTA';

const Home = () => {
  return (
    <div className="bg-midnight-teal selection:bg-harvest-orange selection:text-soft-linen relative">
      <Navigation lightMode={false} />

      <main>
        {/* Hero */}
        <Hero />

        {/* Quick Reassurance Strip */}
        <WelcomeGrid />

        {/* Mission Pathway — 4 accordion cards */}
        <StrategyCards />

        {/* Welcome Video */}
        <WelcomeVideo />

        {/* What to Expect */}
        <WhatToExpect />

        {/* Welcome Experience Flow */}
        <WelcomeExperienceFlow />

        {/* Plan a Visit inline form */}
        {/* <PlanVisitForm /> */}

        {/* Community Photo Gallery */}
        {/* <CommunityPulse /> */}

        {/* Footer CTA */}
        <FooterCTA />
      </main>
    </div>
  );
};

export default Home;