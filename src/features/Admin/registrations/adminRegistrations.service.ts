// ─── Admin Registrations: Service (Model) ─────────────────────────────────────
import type { Registration } from './adminRegistrations.types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

export const AdminRegistrationsService = {
    /**
     * Fetches all plan-a-visit registrations (requires authentication).
     * GET /api/wlcm/registrations
     */
    fetchAll: async (): Promise<Registration[]> => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No auth token found. Please log in.');

        const response = await fetch(`${API_BASE}/api/wlcm/registrations`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
             throw new Error('Failed to fetch registrations');
        }

        const json = await response.json();
        return (json.data ?? []) as Registration[];
    },
};
