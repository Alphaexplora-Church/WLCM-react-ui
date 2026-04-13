import type { ChurchEvent, Announcement } from './events.types';

// These mock arrays hold the data that was previously hardcoded in Events.tsx.
// We keep them here temporarily so your UI continues to work while the backend is not yet ready.
const MOCK_EVENTS: ChurchEvent[] = [
  {
    id: 1,
    day: "FRIDAY",
    date: "WEEKLY",
    location: "CENTER",
    title: "Prayer Night",
    subtitle: "Prayer & Worship",
    time: "7 PM",
    align: "right",
    color: "orange",
    img: "/events/crowd-1.jpg"
  },
  {
    id: 2,
    day: "SUNDAY",
    date: "MAR 29",
    location: "TEATRINO GREENHILLS",
    title: "Pulse Service",
    subtitle: "Youth",
    time: "12 PM",
    align: "left",
    color: "",
    img: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    day: "THURSDAY - SATURDAY",
    date: "AUG 20-22",
    location: "BAGUIO PALACE HOTEL",
    title: "The Fire of God",
    subtitle: "Conference",
    time: "",
    align: "right",
    color: "",
    img: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 4,
    day: "FRIDAY",
    date: "MARCH 20",
    location: "WLCM CENTER",
    title: "Women Called to Walk",
    subtitle: "A four-part session by A Women's Forum",
    time: "2 PM",
    align: "left",
    color: "orange",
    img: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2000&auto=format&fit=crop"
  }
];

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    category: "IMPORTANT",
    date: "DEC 24",
    title: "Holiday Office Closure",
    desc: "The church offices will be closed from Dec 24-26 for the Christmas holiday."
  },
  {
    id: 2,
    category: "FINANCE",
    date: "JAN 31",
    title: "Year-End Giving",
    desc: "2025 contribution statements will be mailed out by the end of January."
  },
  {
    id: 3,
    category: "VOLUNTEER",
    date: "FEB 02",
    title: "New Team Orientation",
    desc: "Interested in serving? Join us for a quick orientation after the 11am service."
  }
];

export const EventsService = {
  /**
   * Fetches the church events from the API.
   */
  fetchEvents: async (): Promise<ChurchEvent[]> => {
    // ------------------------------------------------------------------
    // REAL API FETCHING (Uncomment when you have a backend endpoint)
    // ------------------------------------------------------------------
    // const response = await fetch('/api/events');
    // if (!response.ok) throw new Error('Network error when fetching events');
    // const data = await response.json();
    // return data as ChurchEvent[];
    
    // ------------------------------------------------------------------
    // MOCK DELAYED RESPONSE FOR NOW
    // ------------------------------------------------------------------
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_EVENTS), 1000); // 1s delay to see loading state
    });
  },

  /**
   * Fetches the church announcements from the API.
   */
  fetchAnnouncements: async (): Promise<Announcement[]> => {
    // ------------------------------------------------------------------
    // REAL API FETCHING (Uncomment when you have a backend endpoint)
    // ------------------------------------------------------------------
    // const response = await fetch('/api/announcements');
    // if (!response.ok) throw new Error('Network error when fetching announcements');
    // const data = await response.json();
    // return data as Announcement[];

    // ------------------------------------------------------------------
    // MOCK DELAYED RESPONSE FOR NOW
    // ------------------------------------------------------------------
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_ANNOUNCEMENTS), 1000); // 1s delay to see loading state
    });
  }
};
