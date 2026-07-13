import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
    userName?: string;
}

export default function AdminHeader({ userName = 'Admin' }: AdminHeaderProps) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
                await fetch(`${apiUrl}/api/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error('Logout failed', error);
            }
        }
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="flex items-center justify-between bg-soft-linen px-6 py-4 shadow">
            <span className="text-xl font-sans text-midnight-teal">Welcome, {userName}</span>
            <button onClick={handleLogout} className="text-harvest-orange font-bold">
                Logout
            </button>
        </header>
    );
}
