import { useState, useEffect } from 'react';
import type { ChurchEvent, Announcement } from './events.types';
import { EventsService } from './events.service';

export const useEventsViewModel = () => {
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch events and announcements in parallel for better performance
        const [fetchedEvents, fetchedAnnouncements] = await Promise.all([
          EventsService.fetchEvents(),
          EventsService.fetchAnnouncements(),
        ]);

        setEvents(fetchedEvents);
        setAnnouncements(fetchedAnnouncements);
      } catch (err: any) {
        console.error('Failed to load events data:', err);
        setError(err.message || 'Failed to fetch events data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    events,
    announcements,
    isLoading,
    error,
  };
};
