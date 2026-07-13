import { useState } from 'react';
import type { FormData, FindFreedomViewModelState } from '../types/findFreedom.types';
import { FIND_FREEDOM_PROGRAMS, INITIAL_FORM_STATE } from '../types/findFreedom.constants';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

export const useFindFreedomViewModel = (): FindFreedomViewModelState => {
  const [form, setForm] = useState<FormData>(INITIAL_FORM_STATE);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone || null,
        inspiration: form.inspiration,
        hearAboutUs: form.hearAboutUs || null,
      };

      console.log('Submitting encounter payload:', payload);

      const response = await fetch(`${API_BASE}/api/wlcm/encounter`, {
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
      console.error('Network error submitting encounter registration:', err);
      setError('A network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = (): void => {
    setForm(INITIAL_FORM_STATE);
    setIsSubmitted(false);
    setError(null);
  };

  return {
    form,
    isSubmitted,
    isLoading,
    error,
    programs: FIND_FREEDOM_PROGRAMS,
    handleChange,
    handleSubmit,
    handleReset,
  };
};
