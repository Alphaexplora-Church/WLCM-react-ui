export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  inspiration: string;
  hearAboutUs: string;
}

export interface Program {
  number: string;
  title: string;
  description: string;
  duration: string;
  tag: string;
}

export interface DiscoverPurposeViewModelState {
  form: FormData;
  isSubmitted: boolean;
  isLoading: boolean;
  programs: Program[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleReset: () => void;
}
