// ─── Admin Registrations: Service (Model) ─────────────────────────────────────
import type { Registration } from './adminRegistrations.types';
import type { EncounterRegistration } from './adminEncounterRegistrations.types';
import type { DiscipleshipRegistration } from './adminDiscipleshipRegistrations.types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

const authHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No auth token found. Please log in.');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const AdminRegistrationsService = {
    /**
     * Fetches all plan-a-visit registrations (requires authentication).
     * GET /api/wlcm/registrations
     */
    fetchAll: async (): Promise<Registration[]> => {
        const response = await fetch(`${API_BASE}/api/wlcm/registrations`, {
            headers: authHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch plan-a-visit registrations');
        const json = await response.json();
        const data = json.data ?? [];
        return data.map((item: any) => ({
            ...item,
            submitted_at: item.submitted_at || item.created_at,
        })) as Registration[];
    },

    /**
     * Fetches all Encounter (Discover Purpose) registrations.
     * GET /api/wlcm/encounter-registrations
     */
    fetchAllEncounter: async (): Promise<EncounterRegistration[]> => {
        const response = await fetch(`${API_BASE}/api/wlcm/encounter`, {
            headers: authHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch encounter registrations');
        const json = await response.json();
        const data = json.data ?? [];
        return data.map((item: any) => ({
            ...item,
            submitted_at: item.submitted_at || item.created_at,
        })) as EncounterRegistration[];
    },

    /**
     * Fetches all Discipleship (Contact form) submissions.
     * GET /api/wlcm/contact-submissions
     */
    fetchAllDiscipleship: async (): Promise<DiscipleshipRegistration[]> => {
        const response = await fetch(`${API_BASE}/api/wlcm/discipleship`, {
            headers: authHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch discipleship submissions');
        const json = await response.json();
        const data = json.data ?? [];
        return data.map((item: any) => ({
            ...item,
            submitted_at: item.submitted_at || item.created_at,
        })) as DiscipleshipRegistration[];
    },
};
