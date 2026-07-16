// ─── Plan Visit: ViewModel ────────────────────────────────────────────────────
import { useState } from 'react';
import type { PlanVisitForm, VisitorStatus } from './planVisit.types';
import { PlanVisitService } from './planVisit.service';
import { EMPTY_PLAN_VISIT_FORM } from './planVisit.types';

export interface PlanVisitViewModel {
    /** Current wizard step: 1 = form, 2 = success confirmation */
    step: 1 | 2;
    form: PlanVisitForm;
    isSubmitting: boolean;
    /** Server/network error message, null when none */
    error: string | null;

    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    /** Reset form and step — used when the modal closes */
    reset: () => void;
}

export function usePlanVisitViewModel(): PlanVisitViewModel {
    const [step, setStep] = useState<1 | 2>(1);
    const [form, setForm] = useState<PlanVisitForm>(EMPTY_PLAN_VISIT_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setError(null);
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const adults = parseInt(form.adults, 10);
            const kids = parseInt(form.kids, 10);

            await PlanVisitService.register({
                first_name: form.first_name.trim(),
                last_name: form.last_name.trim(),
                email: form.email.trim(),
                service_type: form.service,
                adult_count: isNaN(adults) ? null : adults,
                child_count: isNaN(kids) ? null : kids,
                attend_date: form.attend_date,
                // Map UI guestType → API visitor_status
                visitor_status: form.guestType as VisitorStatus,
            });

            setStep(2);
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : 'Something went wrong. Please try again.';
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const reset = () => {
        setStep(1);
        setForm(EMPTY_PLAN_VISIT_FORM);
        setError(null);
        setIsSubmitting(false);
    };

    return { step, form, isSubmitting, error, handleChange, handleSubmit, reset };
}
