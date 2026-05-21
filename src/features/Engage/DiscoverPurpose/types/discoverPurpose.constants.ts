import type { Program } from './discoverPurpose.types';

export const DISCOVER_PURPOSE_PROGRAMS: Program[] = [
  {
    number: '01',
    title: 'Pre-Encounter',
    description:
      'A 3-day retreat where everything slows down so you can finally hear from God. Come as you are — leave with a foundation you will build on for the rest of your life.',
    duration: '3-day Retreat',
    tag: 'Foundation',
  },
  {
    number: '02',
    title: 'Counter Journey',
    description:
      'The retreat was just the beginning. Counter Journey walks alongside you through ongoing mentorship and community as you live out your faith, step by step.',
    duration: 'Ongoing Program',
    tag: 'Discipleship',
  },
];

export const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  program: '',
  inspiration: '',
  hearAboutUs: '',
};
