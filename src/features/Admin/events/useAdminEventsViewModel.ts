// ─── Admin Events: ViewModel ─────────────────────────────────────────────────
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ChurchEvent } from '../../Experience/events/events.types';
import type { EventFormData } from './adminEvents.types';
import { AdminEventsService } from './adminEvents.service';

export interface AdminEventsViewModel {
    // Data
    events: ChurchEvent[];
    filtered: ChurchEvent[];
    isLoading: boolean;
    error: string | null;

    // Search
    search: string;
    setSearch: (v: string) => void;

    // Stats (derived)
    stats: { total: number; withImages: number; categories: number };

    // Modal state
    showModal: boolean;
    editTarget: ChurchEvent | null;
    deleteTarget: ChurchEvent | null;

    // Toast
    toast: { msg: string; type: 'success' | 'error' } | null;

    // Handlers
    openCreateModal: () => void;
    openEditModal: (event: ChurchEvent) => void;
    closeModal: () => void;
    openDeleteModal: (event: ChurchEvent) => void;
    closeDeleteModal: () => void;
    handleSave: (data: EventFormData) => Promise<void>;
    handleDelete: () => Promise<void>;
    retry: () => void;
}

export function useAdminEventsViewModel(): AdminEventsViewModel {
    const navigate = useNavigate();

    // ── State ──────────────────────────────────────────────────────────────
    const [events, setEvents] = useState<ChurchEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [editTarget, setEditTarget] = useState<ChurchEvent | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ChurchEvent | null>(null);

    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    // ── Auth guard ─────────────────────────────────────────────────────────
    useEffect(() => {
        if (!localStorage.getItem('token')) navigate('/login');
    }, [navigate]);

    // ── Initial load ───────────────────────────────────────────────────────
    useEffect(() => { loadEvents(); }, []);

    // ── Internal helpers ───────────────────────────────────────────────────
    const loadEvents = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await AdminEventsService.fetchEvents();
            setEvents(data);
        } catch {
            setError('Could not load events. Make sure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    // ── Derived values ─────────────────────────────────────────────────────
    const filtered = events.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        (e.location ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (e.category_content ?? '').toLowerCase().includes(search.toLowerCase())
    );

    const stats = {
        total: events.length,
        withImages: events.filter(e => e.media && e.media.length > 0).length,
        categories: new Set(events.map(e => e.category_content).filter(Boolean)).size,
    };

    // ── Handlers ───────────────────────────────────────────────────────────
    const openCreateModal = () => { setEditTarget(null); setShowModal(true); };
    const openEditModal = (event: ChurchEvent) => { setEditTarget(event); setShowModal(true); };
    const closeModal = () => { setShowModal(false); setEditTarget(null); };
    const openDeleteModal = (event: ChurchEvent) => setDeleteTarget(event);
    const closeDeleteModal = () => setDeleteTarget(null);

    const handleSave = async (data: EventFormData) => {
        try {
            if (editTarget) {
                await AdminEventsService.updateEvent(editTarget.id, data);
                showToast(`"${data.title}" updated successfully.`);
            } else {
                await AdminEventsService.createEvent(data);
                showToast(`"${data.title}" event created.`);
            }
            closeModal();
            await loadEvents();
        } catch {
            showToast('An error occurred. Please try again.', 'error');
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await AdminEventsService.deleteEvent(deleteTarget.id);
            setEvents(prev => prev.filter(e => e.id !== deleteTarget.id));
            showToast(`"${deleteTarget.title}" deleted.`);
            closeDeleteModal();
        } catch {
            showToast('Failed to delete event.', 'error');
        }
    };

    return {
        events,
        filtered,
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
        retry: loadEvents,
    };
}
