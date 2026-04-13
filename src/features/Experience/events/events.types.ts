export interface ChurchEvent {
  id?: string | number; // Added optional ID for mapping
  day: string;
  date: string;
  location: string;
  title: string;
  subtitle: string;
  time: string;
  align: 'left' | 'right' | string;
  color: 'orange' | string;
  img: string;
}

export interface Announcement {
  id?: string | number;
  category: string;
  date: string;
  title: string;
  desc: string;
}
