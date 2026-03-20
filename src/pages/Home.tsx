import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../features/Home/Hero';
import WelcomeGrid from '../features/Home/WelcomeGrid';
import StrategyCards from '../features/Home/StrategyCards';
import WelcomeVideo from '../features/Home/WelcomeVideo';
import WhatToExpect from '../features/Home/WhatToExpect';
import WelcomeExperienceFlow from '../features/Home/WelcomeExperienceFlow';
import PlanVisitForm from '../features/Home/PlanVisitForm';
import CommunityPulse from '../features/Home/CommunityPulse';
import FooterCTA from '../features/Home/FooterCTA';

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
        <PlanVisitForm />

        {/* Community Photo Gallery */}
        {/* <CommunityPulse /> */}

        {/* Footer CTA */}
        <FooterCTA />
      </main>
    </div>
  );
};

export default Home;