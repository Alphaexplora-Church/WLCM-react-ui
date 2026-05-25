import { useState, useEffect } from 'react';
import type { ChurchEvent, Announcement } from './events.types';
import { EventsService } from './events.service';

export const useEventsViewModel = () => {
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  
  const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(true);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState<boolean>(true);
  
  const [errorEvents, setErrorEvents] = useState<string | null>(null);
  const [errorAnnouncements, setErrorAnnouncements] = useState<string | null>(null);

  const [eventsPage, setEventsPage] = useState<number>(1);
  const [announcementsPage, setAnnouncementsPage] = useState<number>(1);
  const limit = 5;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoadingEvents(true);
        setErrorEvents(null);
        const fetchedEvents = await EventsService.fetchEvents(eventsPage, limit);
        setEvents(fetchedEvents);
      } catch (err: any) {
        console.error('Failed to load events data:', err);
        setErrorEvents(err.message || 'Failed to fetch events data');
      } finally {
        setIsLoadingEvents(false);
      }
    };
    fetchEvents();
  }, [eventsPage]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoadingAnnouncements(true);
        setErrorAnnouncements(null);
        const fetchedAnnouncements = await EventsService.fetchAnnouncements(announcementsPage, limit);
        setAnnouncements(fetchedAnnouncements);
      } catch (err: any) {
        console.error('Failed to load announcements data:', err);
        setErrorAnnouncements(err.message || 'Failed to fetch announcements data');
      } finally {
        setIsLoadingAnnouncements(false);
      }
    };
    fetchAnnouncements();
  }, [announcementsPage]);

  const nextEventsPage = () => setEventsPage(p => p + 1);
  const prevEventsPage = () => setEventsPage(p => Math.max(1, p - 1));
  const hasMoreEvents = events.length === limit;

  const nextAnnouncementsPage = () => setAnnouncementsPage(p => p + 1);
  const prevAnnouncementsPage = () => setAnnouncementsPage(p => Math.max(1, p - 1));
  const hasMoreAnnouncements = announcements.length === limit;

  return {
    events,
    announcements,
    isLoadingEvents,
    isLoadingAnnouncements,
    errorEvents,
    errorAnnouncements,
    eventsPage,
    nextEventsPage,
    prevEventsPage,
    hasMoreEvents,
    announcementsPage,
    nextAnnouncementsPage,
    prevAnnouncementsPage,
    hasMoreAnnouncements,
  };
};
