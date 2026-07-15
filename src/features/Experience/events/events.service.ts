import type { ChurchEvent, Announcement } from './events.types';

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const CHURCH_ID = import.meta.env.VITE_CHURCH_ID;

export const EventsService = {
  /**
   * Fetches the church events from the API.
   */
  fetchEvents: async (page: number = 1, limit: number = 10): Promise<ChurchEvent[]> => {
    const response = await fetch(`${API_BASE}/api/contents/public/events/${CHURCH_ID}?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Network error when fetching events');
    const json = await response.json();
    return (json.data ?? []) as ChurchEvent[];
  },

  /**
   * Fetches the church announcements from the API.
   */
  fetchAnnouncements: async (page: number = 1, limit: number = 10): Promise<Announcement[]> => {
    const response = await fetch(`${API_BASE}/api/contents/public/announcements/${CHURCH_ID}?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Network error when fetching announcements');
    const json = await response.json();
    return (json.data ?? []) as Announcement[];
  }
};
