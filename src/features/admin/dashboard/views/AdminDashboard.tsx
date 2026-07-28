import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { useAdminDashboardViewModel } from '../viewModels/useAdminDashboardViewModel';

export default function AdminDashboard() {
    const { userName } = useAdminDashboardViewModel();

    return (
        <div className="flex min-h-screen bg-soft-linen">
            <AdminSidebar />

            <div className="flex-1 flex flex-col">
                <AdminHeader userName={userName} />

                <main className="p-6 flex-1 bg-white/50">
                    <h1 className="text-2xl font-serif text-midnight-teal">Dashboard Home</h1>
                </main>
            </div>
        </div>
    );
}
