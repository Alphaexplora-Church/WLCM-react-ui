// ─── Admin Events: Service (Model) ──────────────────────────────────────────
import type { ChurchEvent, Announcement } from '../../Experience/events/events.types';
import type { EventFormData } from './adminEvents.types';

const API_BASE = 'http://localhost:4000';

/** Retrieves the stored JWT and builds the Authorization header. */
const getAuthHeaders = (isFormData: boolean = false): HeadersInit => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No auth token found. Please log in.');

    const headers: Record<string, string> = {
        'Authorization': `Bearer ${token}`,
    };

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    return headers;
};

const buildFormData = (data: EventFormData, type: string): FormData => {
    const formData = new FormData();
    formData.append('type', type);
    formData.append('title', data.title);

    if (data.description) formData.append('description', data.description);
    if (data.location) formData.append('location', data.location);
    if (data.category_content) formData.append('category_content', data.category_content);

    if (data.start_date_date) {
        const time = data.start_date_time || '00:00';
        formData.append('start_date', `${data.start_date_date}T${time}:00`);
    }

    if (data.end_date_date) {
        const time = data.end_date_time || '00:00';
        formData.append('end_date', `${data.end_date_date}T${time}:00`);
    }

    if (data.image) {
        formData.append('image', data.image);
    }

    return formData;
};

export const AdminEventsService = {
    /**
     * Fetches all events from the admin endpoint (requires authentication).
     */
    fetchEvents: async (): Promise<ChurchEvent[]> => {
        const response = await fetch(`${API_BASE}/api/contents/admin/events`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch events');
        const json = await response.json();
        return (json.data ?? []) as ChurchEvent[];
    },

    /**
     * Fetches all announcements from the admin endpoint (requires authentication).
     */
    fetchAnnouncements: async (): Promise<Announcement[]> => {
        const response = await fetch(`${API_BASE}/api/contents/admin/announcements`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch announcements');
        const json = await response.json();
        return (json.data ?? []) as Announcement[];
    },

    /**
     * Creates a new event (requires authentication).
     */
    createEvent: async (data: EventFormData, type: string = 'event'): Promise<void> => {
        const formData = buildFormData(data, type);
        const response = await fetch(`${API_BASE}/api/contents/admin`, {
            method: 'POST',
            headers: getAuthHeaders(true),
            body: formData,
        });
        if (!response.ok) throw new Error('Failed to create event');
    },

    /**
     * Updates an existing event by ID (requires authentication).
     */
    updateEvent: async (id: number, data: EventFormData, type: string = 'event'): Promise<void> => {
        const formData = buildFormData(data, type);
        const response = await fetch(`${API_BASE}/api/contents/admin/${id}`, {
            method: 'PATCH',
            headers: getAuthHeaders(true),
            body: formData,
        });
        if (!response.ok) throw new Error('Failed to update event');
    },

    /**
     * Deletes an event by ID (requires authentication).
     */
    deleteEvent: async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE}/api/contents/admin/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to delete event');
    },
};
