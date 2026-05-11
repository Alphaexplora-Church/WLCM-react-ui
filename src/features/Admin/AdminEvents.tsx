import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import type { ChurchEvent } from '../Experience/events/events.types';

const API_BASE = 'http://localhost:4000';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=400&auto=format&fit=crop';

// ─── Modal: Add / Edit Event ────────────────────────────────────────────────
interface EventFormData {
  title: string;
  description: string;
  location: string;
  category_content: string;
  start_date_date: string;
  start_date_time: string;
}

const EMPTY_FORM: EventFormData = {
  title: '',
  description: '',
  location: '',
  category_content: '',
  start_date_date: '',
  start_date_time: '',
};

interface EventModalProps {
  open: boolean;
  initial?: EventFormData;
  onClose: () => void;
  onSave: (data: EventFormData) => void;
}

function EventModal({ open, initial, onClose, onSave }: EventModalProps) {
  const [form, setForm] = useState<EventFormData>(initial ?? EMPTY_FORM);

  useEffect(() => {
    setForm(initial ?? EMPTY_FORM);
  }, [initial, open]);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-midnight-teal px-6 py-5 flex items-center justify-between">
          <h2 className="font-serif text-xl text-soft-linen">
            {initial ? 'Edit Event' : 'New Event'}
          </h2>
          <button
            onClick={onClose}
            className="text-soft-linen/60 hover:text-soft-linen text-2xl leading-none transition-colors"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-midnight-teal mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Sunday Worship Service"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-midnight-teal/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-midnight-teal mb-1">Date</label>
              <input
                type="date"
                name="start_date_date"
                value={form.start_date_date}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-midnight-teal/40"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-midnight-teal mb-1">Time</label>
              <input
                type="time"
                name="start_date_time"
                value={form.start_date_time}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-midnight-teal/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-midnight-teal mb-1">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Main Sanctuary"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-midnight-teal/40"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-midnight-teal mb-1">Category</label>
            <input
              name="category_content"
              value={form.category_content}
              onChange={handleChange}
              placeholder="e.g. Worship, Youth, Prayer"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-midnight-teal/40"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-midnight-teal mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Brief description of the event..."
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-midnight-teal/40 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-5 py-2 rounded-lg text-sm font-bold bg-midnight-teal text-soft-linen hover:bg-midnight-teal/90 transition-colors"
          >
            {initial ? 'Save Changes' : 'Create Event'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ───────────────────────────────────────────────────
function ConfirmDeleteModal({ open, eventTitle, onCancel, onConfirm }: {
  open: boolean;
  eventTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="font-serif text-xl text-midnight-teal mb-2">Delete Event?</h3>
        <p className="text-sm text-gray-500 mb-6">
          "<span className="font-semibold text-gray-700">{eventTitle}</span>" will be permanently removed.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function AdminEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<ChurchEvent | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ChurchEvent | null>(null);

  // Toast
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/contents/public/events`);
      if (!res.ok) throw new Error('Failed to fetch events');
      const json = await res.json();
      setEvents((json.data ?? []) as ChurchEvent[]);
    } catch (err) {
      setError('Could not load events. Make sure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (formData: EventFormData) => {
    // TODO: wire up to POST/PUT API endpoint
    if (editTarget) {
      showToast(`"${formData.title}" updated successfully.`);
    } else {
      showToast(`"${formData.title}" event created.`);
    }
    setShowModal(false);
    setEditTarget(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    // TODO: wire up to DELETE API endpoint
    setEvents(prev => prev.filter(e => e.id !== deleteTarget.id));
    showToast(`"${deleteTarget.title}" deleted.`);
    setDeleteTarget(null);
  };

  const openEdit = (event: ChurchEvent) => {
    setEditTarget(event);
    setShowModal(true);
  };

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    (e.location ?? '').toLowerCase().includes(search.toLowerCase()) ||
    (e.category_content ?? '').toLowerCase().includes(search.toLowerCase())
  );

  // Stats
  const total = events.length;
  const withImages = events.filter(e => e.media && e.media.length > 0).length;
  const categories = [...new Set(events.map(e => e.category_content).filter(Boolean))];

  return (
    <div className="flex min-h-screen bg-soft-linen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader userName="Admin" />

        <main className="p-6 flex-1 space-y-6">

          {/* Page Title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif text-midnight-teal">Events</h1>
              <p className="text-sm text-gray-400 mt-0.5">Manage all church events and programs.</p>
            </div>
            <button
              onClick={() => { setEditTarget(null); setShowModal(true); }}
              className="flex items-center gap-2 bg-midnight-teal text-soft-linen px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-midnight-teal/90 transition-colors shadow"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Event
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Total Events</p>
              <p className="text-3xl font-serif text-midnight-teal">{total}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">With Images</p>
              <p className="text-3xl font-serif text-harvest-orange">{withImages}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 col-span-2 md:col-span-1">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Categories</p>
              <p className="text-3xl font-serif text-midnight-teal">{categories.length}</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title, location or category…"
              className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-midnight-teal/30 shadow-sm"
            />
          </div>

          {/* Events List */}
          {isLoading ? (
            <div className="flex flex-col gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-24 animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
              <p className="text-red-500 text-sm font-semibold">{error}</p>
              <button onClick={fetchEvents} className="mt-3 text-xs font-bold text-midnight-teal underline">
                Retry
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-soft-linen flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-midnight-teal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-serif text-lg text-midnight-teal">No events found</p>
              <p className="text-sm text-gray-400 mt-1">Try a different search, or add a new event.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map(event => {
                const thumb = event.media && event.media.length > 0
                  ? event.media[0].file_url
                  : FALLBACK_IMAGE;

                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 p-4 hover:shadow-md transition-shadow group"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={thumb}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE; }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <h3 className="font-serif text-midnight-teal text-base font-semibold truncate">
                          {event.title}
                        </h3>
                        {event.category_content && (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-harvest-orange border border-harvest-orange/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                            {event.category_content}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 flex-wrap text-xs text-gray-400 font-sans">
                        {event.start_date && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {event.start_date.date} · {event.start_date.time}
                          </span>
                        )}
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location}
                          </span>
                        )}
                        {event.media && event.media.length > 0 && (
                          <span className="flex items-center gap-1 text-green-500">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {event.media.length} image{event.media.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      {event.description && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{event.description}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => openEdit(event)}
                        title="Edit"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-midnight-teal/60 hover:bg-midnight-teal/10 hover:text-midnight-teal transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteTarget(event)}
                        title="Delete"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-red-400/70 hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-semibold transition-all
          ${toast.type === 'success' ? 'bg-midnight-teal text-soft-linen' : 'bg-red-500 text-white'}`}>
          {toast.msg}
        </div>
      )}

      {/* Modals */}
      <EventModal
        open={showModal}
        initial={editTarget ? {
          title: editTarget.title,
          description: editTarget.description ?? '',
          location: editTarget.location ?? '',
          category_content: editTarget.category_content ?? '',
          start_date_date: editTarget.start_date?.date ?? '',
          start_date_time: editTarget.start_date?.time ?? '',
        } : undefined}
        onClose={() => { setShowModal(false); setEditTarget(null); }}
        onSave={handleSave}
      />

      <ConfirmDeleteModal
        open={!!deleteTarget}
        eventTitle={deleteTarget?.title ?? ''}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
