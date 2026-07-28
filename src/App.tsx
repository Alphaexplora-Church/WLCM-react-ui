import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from './shared/components/ScrollToTop';

// --- IMPORT YOUR PAGES ---
import Home from './features/home/views/Home';
import AboutUs from './features/about/views/AboutUs';
import Experience from './features/experience/views/Experience';
import Engage from './features/engage/views/Engage';
import Give from './features/give/views/Give';
import Watch from './features/watch/views/Watch';
import PrayerWall from './features/engage/views/PrayerWall';
import Contact from './features/engage/views/Contact';
import FindFreedom from './features/engage/views/FindFreedom';
import DiscoverPurpose from './features/engage/views/DiscoverPurpose';
import Login from './features/auth/views/Login';
import AdminDashboard from './features/admin/views/AdminDashboard';
import AdminEvents from './features/admin/views/AdminEvents';
import AdminRegistrations from './features/admin/views/AdminRegistrations';

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* Reset scroll on every route change */}
      <ScrollToTop />

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/beliefs" element={<AboutUs />} />
        <Route path="/leaders" element={<AboutUs />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/engage" element={<Engage />} />
        <Route path="/sermons" element={<Engage />} />
        <Route path="/give" element={<Give />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/find-freedom" element={<FindFreedom />} />
        <Route path="/discover-purpose" element={<DiscoverPurpose />} />
        <Route path="/churches" element={<AboutUs />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/prayer" element={<PrayerWall />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/registrations" element={<AdminRegistrations />} />
      </Routes>
    </AnimatePresence>
  );
}