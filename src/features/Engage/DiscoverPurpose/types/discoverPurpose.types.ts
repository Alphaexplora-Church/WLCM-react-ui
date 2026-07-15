export interface DiscoverProgram {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  hookLine: string;
  description: string;
  closingLine: string;
  ctaText: string;
  tag: string;
}

export interface DiscoverFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  inspiration: string;
  hearAboutUs: string;
  interestedIn: string;
}

export interface DiscoverPurposeViewModelState {
  form: DiscoverFormData;
  isSubmitted: boolean;
  isLoading: boolean;
  error: string | null;
  discoverPrograms: DiscoverProgram[];
  expandedCardId: string | null;
  setExpandedCardId: (id: string | null) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleReset: () => void;
}
