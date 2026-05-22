// ─── Plan Visit: Types (Model) ───────────────────────────────────────────────

/** Visitor status values as expected by the API `visitor_status` field. */
export type VisitorStatus = 'first_time' | 'returning';

/** The multi-step form state managed by the ViewModel. */
export interface PlanVisitForm {
    first_name: string;
    last_name: string;
    email: string;
    service: string;
    adults: string;
    kids: string;
    /** Internal UI radio value — maps to visitor_status in the API payload. */
    guestType: VisitorStatus;
}

/** Shape of the JSON body sent to POST /api/wlcm/registrations. */
export interface RegistrationPayload {
    first_name: string;
    last_name: string;
    email: string;
    service_type: string;
    adult_count: number | null;
    child_count: number | null;
    visitor_status: VisitorStatus;
}

export const EMPTY_PLAN_VISIT_FORM: PlanVisitForm = {
    first_name: '',
    last_name: '',
    email: '',
    service: '',
    adults: '1',
    kids: '0',
    guestType: 'first_time',
};
