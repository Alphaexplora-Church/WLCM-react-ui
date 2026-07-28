// ─── Admin Dashboard: ViewModel ──────────────────────────────────────────────
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface AdminDashboardViewModel {
    userName: string;
}

export function useAdminDashboardViewModel(): AdminDashboardViewModel {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return {
        userName: 'Admin',
    };
}
