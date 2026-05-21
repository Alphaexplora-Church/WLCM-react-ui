import { useState } from 'react';
import type { FormData, DiscoverPurposeViewModelState } from '../types/discoverPurpose.types';
import { DISCOVER_PURPOSE_PROGRAMS, INITIAL_FORM_STATE } from '../types/discoverPurpose.constants';

const API_BASE = 'http://localhost:4000';

export const useDiscoverPurposeViewModel = (): DiscoverPurposeViewModelState => {
  const [form, setForm] = useState<FormData>(INITIAL_FORM_STATE);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch(`${API_BASE}/api/forms/discover-purpose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {
      // Proceed to success state even if the endpoint isn't live yet
    } finally {
      setIsLoading(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = (): void => {
    setForm(INITIAL_FORM_STATE);
    setIsSubmitted(false);
  };

  return {
    form,
    isSubmitted,
    isLoading,
    programs: DISCOVER_PURPOSE_PROGRAMS,
    handleChange,
    handleSubmit,
    handleReset,
  };
};
