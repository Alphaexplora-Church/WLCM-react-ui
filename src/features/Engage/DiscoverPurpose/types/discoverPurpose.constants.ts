import type { Program } from './discoverPurpose.types';

export const DISCOVER_PURPOSE_PROGRAMS: Program[] = [
  {
    number: '01',
    title: 'Pre-Encounter',
    description:
      'A dedicated day where everything slows down so you can prepare your heart to hear from God. Come as you are — build a foundation for your journey.',
    duration: 'Day 1',
    tag: 'Foundation',
  },
  {
    number: '02',
    title: 'Encounter',
    description:
      'Step into a transformative spiritual experience designed to help you encounter God\'s purpose and grow deeper in your faith.',
    duration: 'Day 2',
    tag: 'Experience',
  },
  {
    number: '03',
    title: 'Post-Encounter',
    description:
      'The journey continues. Take your next step of faith through water baptism and walk out your purpose with a renewed spirit.',
    duration: 'Day 3',
    tag: 'Water Baptism',
  },
];

export const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  inspiration: '',
  hearAboutUs: '',
};
