// ─── Admin Encounter (Discover Purpose) Registrations: Types ──────────────────

export interface EncounterRegistration {
    id: number;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    phone: string | null;
    program: string | null;
    inspiration: string | null;
    hear_about_us: string | null;
    submitted_at: string;
}
