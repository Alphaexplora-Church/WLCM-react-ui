// ─── Contact (Discipleship): Types ────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactViewModelState {
  form: ContactFormData;
  isSubmitted: boolean;
  isLoading: boolean;
  error: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleReset: () => void;
}
