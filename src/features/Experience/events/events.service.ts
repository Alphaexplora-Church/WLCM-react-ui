import type { ChurchEvent, Announcement } from './events.types';

const API_BASE = 'http://localhost:4000';

export const EventsService = {
  /**
   * Fetches the church events from the API.
   */
  fetchEvents: async (): Promise<ChurchEvent[]> => {
    const response = await fetch(`${API_BASE}/api/contents/public/events`);
    if (!response.ok) throw new Error('Network error when fetching events');
    const json = await response.json();
    return (json.data ?? []) as ChurchEvent[];
  },

  /**
   * Fetches the church announcements from the API.
   */
  fetchAnnouncements: async (): Promise<Announcement[]> => {
    const response = await fetch(`${API_BASE}/api/contents/public/announcements`);
    if (!response.ok) throw new Error('Network error when fetching announcements');
    const json = await response.json();
    return (json.data ?? []) as Announcement[];
  }
};
