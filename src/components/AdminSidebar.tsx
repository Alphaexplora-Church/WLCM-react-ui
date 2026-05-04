import { Link } from 'react-router-dom';

interface AdminSidebarProps {
    className?: string;
}

export default function AdminSidebar({ className = '' }: AdminSidebarProps) {
    return (
        <aside className={`w-64 bg-midnight-teal text-soft-linen flex flex-col ${className}`}>
            <div className="p-6 font-serif text-2xl text-center border-b border-soft-linen/20">
                Admin Panel
            </div>
            <nav className="flex-1 p-6 space-y-4">
                <Link to="/admin/dashboard" className="block hover:text-harvest-orange">
                    Home
                </Link>
                <Link to="/admin/events" className="block hover:text-harvest-orange">
                    Events
                </Link>
                <Link to="/admin/settings" className="block hover:text-harvest-orange">
                    Settings
                </Link>
            </nav>
        </aside>
    );
}
