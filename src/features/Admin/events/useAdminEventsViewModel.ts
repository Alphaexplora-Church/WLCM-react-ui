// ─── Admin Events: ViewModel ─────────────────────────────────────────────────
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ChurchEvent, Announcement } from '../../Experience/events/events.types';
import type { ContentTab, EventFormData } from './adminEvents.types';
import { AdminEventsService } from './adminEvents.service';

type ContentItem = ChurchEvent | Announcement;
export type StatusFilter = 'all' | 'active' | 'completed';

// ── Date helpers (work with the formatted {date, time, day} objects the API returns)
// function toDate(value: any): Date | null {
//     if (!value) return null;
//     // Formatted object from the backend service
//     if (typeof value === 'object' && value.date) {
//         const parsed = new Date(value.date);
//         return isNaN(parsed.getTime()) ? null : parsed;
//     }
//     // Raw ISO string fallback
//     if (typeof value === 'string') {
//         const parsed = new Date(value);
//         return isNaN(parsed.getTime()) ? null : parsed;
//     }
//     return null;
// }

function startOfDay(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export interface AdminEventsViewModel {
    // Tab
    activeTab: ContentTab;
    setActiveTab: (tab: ContentTab) => void;

    // Status filter (chip)
    statusFilter: StatusFilter;
    setStatusFilter: (f: StatusFilter) => void;

    // Data
    events: ChurchEvent[];
    announcements: Announcement[];
    filteredEvents: ChurchEvent[];
    filteredAnnouncements: Announcement[];
    isLoading: boolean;
    error: string | null;

    // Search
    search: string;
    setSearch: (v: string) => void;

    // Stats (tab-specific KPIs)
    stats: {
        kpi1: { label: string; value: number; accent?: string };
        kpi2: { label: string; value: number; accent?: string };
        kpi3: { label: string; value: number; accent?: string };
    };

    // Modal state
    showModal: boolean;
    editTarget: ContentItem | null;
    deleteTarget: ContentItem | null;

    // Toast
    toast: { msg: string; type: 'success' | 'error' } | null;

    // Handlers
    openCreateModal: () => void;
    openEditModal: (item: ContentItem) => void;
    closeModal: () => void;
    openDeleteModal: (item: ContentItem) => void;
    closeDeleteModal: () => void;
    handleSave: (data: EventFormData) => Promise<void>;
    handleDelete: () => Promise<void>;
    retry: () => void;

    // Pagination
    page: number;
    nextPage: () => void;
    prevPage: () => void;
    hasMore: boolean;
}

export function useAdminEventsViewModel(): AdminEventsViewModel {
    const navigate = useNavigate();

    // ── State ──────────────────────────────────────────────────────────────
    const [activeTab, setActiveTab] = useState<ContentTab>('event');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [events, setEvents] = useState<ChurchEvent[]>([]);
    const [eventsTotal, setEventsTotal] = useState(0);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [announcementsTotal, setAnnouncementsTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const [page, setPage] = useState(1);
    const limit = 10;

    const [showModal, setShowModal] = useState(false);
    const [editTarget, setEditTarget] = useState<ContentItem | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ContentItem | null>(null);

    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    // Holds the DB-level KPI counts returned by the /admin/stats endpoint.
    // Initialised to zeros so the cards render immediately without waiting.
    const [dbStats, setDbStats] = useState({
        events: { upcomingMonth: 0, thisWeek: 0, completedMonth: 0 },
        announcements: { activeLive: 0, postedThisMonth: 0, activeCategories: 0 },
    });

    // ── Auth guard ─────────────────────────────────────────────────────────
    useEffect(() => {
        if (!localStorage.getItem('token')) navigate('/login');
    }, [navigate]);

    // ── Load on page change ────────────────────────────────────────────────
    useEffect(() => { loadAll(page); }, [page]);

    // ── Reset search + filter when switching tabs ──────────────────────────
    useEffect(() => { setSearch(''); setPage(1); setStatusFilter('all'); }, [activeTab]);

    // ── Internal helpers ───────────────────────────────────────────────────
    const loadAll = async (currentPage: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const [eventsResult, announcementsResult, statsResult] = await Promise.all([
                AdminEventsService.fetchEvents(currentPage, limit),
                AdminEventsService.fetchAnnouncements(currentPage, limit),
                AdminEventsService.fetchStats(),
            ]);
            setEvents(eventsResult.items);
            setEventsTotal(eventsResult.total);
            setAnnouncements(announcementsResult.items);
            setAnnouncementsTotal(announcementsResult.total);
            setDbStats(statsResult);
        } catch {
            setError('Could not load content. Make sure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    // ── Derived: KPI date helpers ──────────────────────────────────────────
    const now = new Date();
    const todayStart = startOfDay(now);

    // Start of current month
    // const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    // // End of current month (exclusive)
    // const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Start of current week (Sunday)
    const weekStart = new Date(todayStart);
    weekStart.setDate(todayStart.getDate() - todayStart.getDay());
    // End of current week (Saturday 23:59:59)
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    // ── Derived: filtered lists (search + chip) ────────────────────────────
    const q = search.toLowerCase();

    const searchedEvents = events.filter(e =>
        e.title.toLowerCase().includes(q) ||
        (e.location ?? '').toLowerCase().includes(q) ||
        (e.category_content ?? '').toLowerCase().includes(q)
    );

    const filteredEvents = searchedEvents.filter(e => {
        if (statusFilter === 'all') return true;
        const statusVal = (e as any).status ?? '';
        if (statusFilter === 'active') return statusVal === 'active';
        if (statusFilter === 'completed') return statusVal === 'completed';
        return true;
    });

    const searchedAnnouncements = announcements.filter(a =>
        a.title.toLowerCase().includes(q) ||
        (a.category_content ?? '').toLowerCase().includes(q) ||
        (a.description ?? '').toLowerCase().includes(q)
    );

    const filteredAnnouncements = searchedAnnouncements.filter(a => {
        if (statusFilter === 'all') return true;
        const statusVal = (a as any).status ?? '';
        if (statusFilter === 'active') return statusVal === 'active';
        if (statusFilter === 'completed') return statusVal !== 'active';
        return true;
    });

    // ── Derived: tab-specific KPI stats (sourced from DB via /admin/stats) ──
    const stats = (() => {
        if (activeTab === 'event') {
            return {
                kpi1: { label: 'Upcoming (Month)', value: dbStats.events.upcomingMonth, accent: 'teal' },
                kpi2: { label: 'Happening This Week', value: dbStats.events.thisWeek, accent: 'orange' },
                kpi3: { label: 'Completed (Month)', value: dbStats.events.completedMonth, accent: 'teal' },
            };
        } else {
            return {
                kpi1: { label: 'Active (Live)', value: dbStats.announcements.activeLive, accent: 'teal' },
                kpi2: { label: 'Posted This Month', value: dbStats.announcements.postedThisMonth, accent: 'orange' },
                kpi3: { label: 'Active Categories', value: dbStats.announcements.activeCategories, accent: 'teal' },
            };
        }
    })();

    // ── Handlers ───────────────────────────────────────────────────────────
    const openCreateModal = () => { setEditTarget(null); setShowModal(true); };
    const openEditModal = (item: ContentItem) => { setEditTarget(item); setShowModal(true); };
    const closeModal = () => { setShowModal(false); setEditTarget(null); };
    const openDeleteModal = (item: ContentItem) => setDeleteTarget(item);
    const closeDeleteModal = () => setDeleteTarget(null);

    const handleSave = async (data: EventFormData) => {
        if (editTarget) {
            await AdminEventsService.updateEvent(editTarget.id, data, activeTab);
            showToast(`"${data.title}" updated successfully.`);
        } else {
            await AdminEventsService.createEvent(data, activeTab);
            showToast(`"${data.title}" created.`);
        }
        closeModal();
        await loadAll(page);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await AdminEventsService.deleteEvent(deleteTarget.id);
            if (activeTab === 'announcement') {
                setAnnouncements(prev => prev.filter(a => a.id !== deleteTarget.id));
            } else {
                setEvents(prev => prev.filter(e => e.id !== deleteTarget.id));
            }
            showToast(`"${deleteTarget.title}" deleted.`);
            closeDeleteModal();
        } catch {
            showToast('Failed to delete.', 'error');
        }
    };

    return {
        activeTab,
        setActiveTab,
        statusFilter,
        setStatusFilter,
        events,
        announcements,
        filteredEvents,
        filteredAnnouncements,
        isLoading,
        error,
        search,
        setSearch,
        stats,
        showModal,
        editTarget,
        deleteTarget,
        toast,
        openCreateModal,
        openEditModal,
        closeModal,
        openDeleteModal,
        closeDeleteModal,
        handleSave,
        handleDelete,
        retry: () => loadAll(page),
        page,
        nextPage: () => setPage(p => p + 1),
        prevPage: () => setPage(p => Math.max(1, p - 1)),
        hasMore: activeTab === 'event'
            ? page * limit < eventsTotal
            : page * limit < announcementsTotal,
    };
}
