import type { Program } from './discoverPurpose.types';

export const DISCOVER_PURPOSE_PROGRAMS: Program[] = [
  {
    number: '01',
    title: 'Pre-Encounter',
    description:
      'Begin your spiritual awakening with foundational teachings that prepare your heart for transformation. This intensive retreat experience sets the stage for encountering God`s love and grace.',
    duration: '3-day Retreat',
    tag: 'Foundation',
  },
  {
    number: '02',
    title: 'Counter Journey',
    description:
      'Deepen your relationship with Christ through post-encounter discipleship and mentorship. Integrate your spiritual experience into daily life alongside a community of believers.',
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
  hearAboutUs: '',
};
