import { useState } from 'react';
import type { FormData, DiscoverPurposeViewModelState } from '../types/discoverPurpose.types';
import { DISCOVER_PURPOSE_PROGRAMS, INITIAL_FORM_STATE } from '../types/discoverPurpose.constants';

export const useDiscoverPurposeViewModel = (): DiscoverPurposeViewModelState => {
  const [form, setForm] = useState<FormData>(INITIAL_FORM_STATE);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // TODO: Add API call or further processing here
    console.log('Form submitted:', form);
    setIsSubmitted(true);
  };

  const handleReset = (): void => {
    setForm(INITIAL_FORM_STATE);
    setIsSubmitted(false);
  };

  return {
    form,
    isSubmitted,
    programs: DISCOVER_PURPOSE_PROGRAMS,
    handleChange,
    handleSubmit,
    handleReset,
  };
};
