export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
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
  programs: Program[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleReset: () => void;
}
