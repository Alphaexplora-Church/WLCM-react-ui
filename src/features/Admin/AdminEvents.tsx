// ─── Admin Events: View ──────────────────────────────────────────────────────
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { useAdminEventsViewModel } from './events/useAdminEventsViewModel';
import { EventModal } from './events/EventModal';
import { ConfirmDeleteModal } from './events/ConfirmDeleteModal';

const FALLBACK_IMAGE =
    'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=400&auto=format&fit=crop';

export default function AdminEvents() {
    const vm = useAdminEventsViewModel();

    return (
        <div className="flex min-h-screen bg-soft-linen">
            <AdminSidebar />

            <div className="flex-1 flex flex-col">
                <AdminHeader userName="Admin" />

                <main className="p-6 flex-1 space-y-6">

                    {/* ── Page Title ─────────────────────────────────── */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-serif text-midnight-teal">Events</h1>
                            <p className="text-sm text-gray-400 mt-0.5">Manage all church events and programs.</p>
                        </div>
                        <button
                            onClick={vm.openCreateModal}
                            className="flex items-center gap-2 bg-midnight-teal text-soft-linen px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-midnight-teal/90 transition-colors shadow"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Event
                        </button>
                    </div>

                    {/* ── Stats ──────────────────────────────────────── */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Total Events</p>
                            <p className="text-3xl font-serif text-midnight-teal">{vm.stats.total}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">With Images</p>
                            <p className="text-3xl font-serif text-harvest-orange">{vm.stats.withImages}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 col-span-2 md:col-span-1">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Categories</p>
                            <p className="text-3xl font-serif text-midnight-teal">{vm.stats.categories}</p>
                        </div>
                    </div>

                    {/* ── Search ─────────────────────────────────────── */}
                    <div className="relative">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z" />
                        </svg>
                        <input
                            value={vm.search}
                            onChange={e => vm.setSearch(e.target.value)}
                            placeholder="Search by title, location or category…"
                            className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-midnight-teal/30 shadow-sm"
                        />
                    </div>

                    {/* ── Events List ────────────────────────────────── */}
                    {vm.isLoading ? (
                        <div className="flex flex-col gap-3">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl h-24 animate-pulse border border-gray-100" />
                            ))}
                        </div>

                    ) : vm.error ? (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                            <p className="text-red-500 text-sm font-semibold">{vm.error}</p>
                            <button onClick={vm.retry} className="mt-3 text-xs font-bold text-midnight-teal underline">
                                Retry
                            </button>
                        </div>

                    ) : vm.filtered.length === 0 ? (
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
                            {vm.filtered.map(event => {
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
                                                onClick={() => vm.openEditModal(event)}
                                                title="Edit"
                                                className="w-9 h-9 rounded-lg flex items-center justify-center text-midnight-teal/60 hover:bg-midnight-teal/10 hover:text-midnight-teal transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => vm.openDeleteModal(event)}
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

            {/* ── Toast ──────────────────────────────────────── */}
            {vm.toast && (
                <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-semibold transition-all
                    ${vm.toast.type === 'success' ? 'bg-midnight-teal text-soft-linen' : 'bg-red-500 text-white'}`}>
                    {vm.toast.msg}
                </div>
            )}

            {/* ── Modals ─────────────────────────────────────── */}
            <EventModal
                open={vm.showModal}
                initial={vm.editTarget ? {
                    title: vm.editTarget.title,
                    description: vm.editTarget.description ?? '',
                    location: vm.editTarget.location ?? '',
                    category_content: vm.editTarget.category_content ?? '',
                    start_date_date: vm.editTarget.start_date?.date ?? '',
                    start_date_time: vm.editTarget.start_date?.time ?? '',
                } : undefined}
                onClose={vm.closeModal}
                onSave={vm.handleSave}
            />

            <ConfirmDeleteModal
                open={!!vm.deleteTarget}
                eventTitle={vm.deleteTarget?.title ?? ''}
                onCancel={vm.closeDeleteModal}
                onConfirm={vm.handleDelete}
            />
        </div>
    );
}
