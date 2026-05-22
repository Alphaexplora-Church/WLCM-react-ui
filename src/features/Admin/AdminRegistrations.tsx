// ─── Admin Registrations: View ──────────────────────────────────────────────
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { useAdminRegistrationsViewModel } from './registrations/useAdminRegistrationsViewModel';

export default function AdminRegistrations() {
    const vm = useAdminRegistrationsViewModel();

    return (
        <div className="flex min-h-screen bg-soft-linen">
            <AdminSidebar />

            <div className="flex-1 flex flex-col">
                <AdminHeader userName="Admin" />

                <main className="p-6 flex-1 space-y-6">
                    {/* ── Page Title ─────────────────────────────────── */}
                    <div>
                        <h1 className="text-2xl font-serif text-midnight-teal">Registrations</h1>
                        <p className="text-sm text-gray-400 mt-0.5">
                            Manage visitor registrations from the Plan a Visit form.
                        </p>
                    </div>

                    {/* ── Stats ──────────────────────────────────────── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                                Total Registrations
                            </p>
                            <p className="text-3xl font-serif text-midnight-teal">{vm.stats.total}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                                First-Time Guests
                            </p>
                            <p className="text-3xl font-serif text-harvest-orange">{vm.stats.firstTime}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                                Returning Guests
                            </p>
                            <p className="text-3xl font-serif text-midnight-teal">{vm.stats.returning}</p>
                        </div>
                    </div>

                    {/* ── Search ─────────────────────────────────────── */}
                    <div className="relative max-w-md">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z" />
                        </svg>
                        <input
                            value={vm.search}
                            onChange={e => vm.setSearch(e.target.value)}
                            placeholder="Search by name or email…"
                            className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-midnight-teal/30 shadow-sm"
                        />
                    </div>

                    {/* ── Content List ───────────────────────────────── */}
                    {vm.isLoading ? (
                        <div className="flex flex-col gap-3">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl h-16 animate-pulse border border-gray-100" />
                            ))}
                        </div>
                    ) : vm.error ? (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                            <p className="text-red-500 text-sm font-semibold">{vm.error}</p>
                            <button onClick={vm.retry} className="mt-3 text-xs font-bold text-midnight-teal underline">
                                Retry
                            </button>
                        </div>
                    ) : vm.filteredRegistrations.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                            <div className="w-14 h-14 rounded-full bg-soft-linen flex items-center justify-center mx-auto mb-4">
                                <svg className="w-7 h-7 text-midnight-teal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <p className="font-serif text-lg text-midnight-teal">No registrations found</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-500">
                                    <thead className="text-xs text-gray-400 uppercase bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 font-bold tracking-wider">Name</th>
                                            <th className="px-6 py-4 font-bold tracking-wider">Contact</th>
                                            <th className="px-6 py-4 font-bold tracking-wider">Service</th>
                                            <th className="px-6 py-4 font-bold tracking-wider">Guests</th>
                                            <th className="px-6 py-4 font-bold tracking-wider">Type</th>
                                            <th className="px-6 py-4 font-bold tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {vm.filteredRegistrations.map((reg) => (
                                            <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-semibold text-midnight-teal">
                                                    {reg.first_name} {reg.last_name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {reg.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {reg.service_type === 'sunday-10am' ? '10:00 AM' : reg.service_type === 'sunday-2pm' ? '2:00 PM' : reg.service_type}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {reg.adult_count ?? 0} Adults, {reg.child_count ?? 0} Kids
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full ${
                                                        reg.visitor_status === 'first_time' 
                                                            ? 'bg-harvest-orange/10 text-harvest-orange border border-harvest-orange/20'
                                                            : 'bg-midnight-teal/10 text-midnight-teal border border-midnight-teal/20'
                                                    }`}>
                                                        {reg.visitor_status === 'first_time' ? 'First Time' : 'Returning'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-xs">
                                                    {new Date(reg.submitted_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
