// ─── Contact (Discipleship): ViewModel ────────────────────────────────────────
import { useState } from 'react';
import type { ContactFormData, ContactViewModelState } from '../types/contact.types';
import { INITIAL_CONTACT_FORM_STATE } from '../types/contact.constants';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

export const useContactViewModel = (): ContactViewModelState => {
  const [form, setForm] = useState<ContactFormData>(INITIAL_CONTACT_FORM_STATE);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        message: form.message,
      };

      console.log('Submitting discipleship payload:', payload);

      const response = await fetch(`${API_BASE}/api/wlcm/discipleship`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => null);
        console.error('Server error body:', errBody);
        const msg = errBody?.message ?? errBody?.error ?? `Server error ${response.status}`;
        setError(msg);
        return;
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error('Network error submitting discipleship form:', err);
      setError('A network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = (): void => {
    setForm(INITIAL_CONTACT_FORM_STATE);
    setIsSubmitted(false);
    setError(null);
  };

  return {
    form,
    isSubmitted,
    isLoading,
    error,
    handleChange,
    handleSubmit,
    handleReset,
  };
};
