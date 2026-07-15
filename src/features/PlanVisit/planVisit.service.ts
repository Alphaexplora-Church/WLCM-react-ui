// ─── Plan Visit: Service (Model) ─────────────────────────────────────────────
import type { RegistrationPayload } from './planVisit.types';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const PlanVisitService = {
    /**
     * Submits a Plan-a-Visit registration to the API.
     * POST /api/wlcm/registrations
     */
    register: async (payload: RegistrationPayload): Promise<void> => {
        const response = await fetch(`${API_BASE}/api/wlcm/registrations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            let errorBody;
            try {
                errorBody = await response.json();
            } catch (e) {
                // Ignore json parse error
            }

            console.error('Registration API Error Payload:', errorBody);

            let message = `Registration failed (${response.status})`;
            if (errorBody) {
                if (typeof errorBody.message === 'string') message = errorBody.message;
                else if (typeof errorBody.error === 'string') message = errorBody.error;

                // Capture detailed validation errors if present
                if (errorBody.errors) {
                    message += ': ' + JSON.stringify(errorBody.errors);
                }
            }

            throw new Error(message);
        }
    },
};
