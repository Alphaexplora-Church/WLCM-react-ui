// ─── Admin Events: Service (Model) ──────────────────────────────────────────
import type { ChurchEvent, Announcement } from '../../Experience/events/events.types';
import type { EventFormData } from './adminEvents.types';

const API_BASE = 'http://localhost:4000';

export const AdminEventsService = {
    /**
     * Fetches all active events (public endpoint — no auth required).
     */
    fetchEvents: async (): Promise<ChurchEvent[]> => {
        const response = await fetch(`${API_BASE}/api/contents/public/events`);
        if (!response.ok) throw new Error('Failed to fetch events');
        const json = await response.json();
        return (json.data ?? []) as ChurchEvent[];
    },

    /**
     * Fetches all active announcements (public endpoint — no auth required).
     */
    fetchAnnouncements: async (): Promise<Announcement[]> => {
        const response = await fetch(`${API_BASE}/api/contents/public/announcements`);
        if (!response.ok) throw new Error('Failed to fetch announcements');
        const json = await response.json();
        return (json.data ?? []) as Announcement[];
    },

    /**
     * Creates a new event.
     * TODO: wire up to authenticated POST endpoint when available.
     */
    createEvent: async (_data: EventFormData): Promise<void> => {
        // const token = localStorage.getItem('token');
        // await fetch(`${API_BASE}/api/contents`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ ..._data, type_content: 'event' }) });
        return Promise.resolve();
    },

    /**
     * Updates an existing event by ID.
     * TODO: wire up to authenticated PUT endpoint when available.
     */
    updateEvent: async (_id: number, _data: EventFormData): Promise<void> => {
        // const token = localStorage.getItem('token');
        // await fetch(`${API_BASE}/api/contents/${_id}`, { method: 'PUT', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(_data) });
        return Promise.resolve();
    },

    /**
     * Deletes an event by ID.
     * TODO: wire up to authenticated DELETE endpoint when available.
     */
    deleteEvent: async (_id: number): Promise<void> => {
        // const token = localStorage.getItem('token');
        // await fetch(`${API_BASE}/api/contents/${_id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
        return Promise.resolve();
    },
};
