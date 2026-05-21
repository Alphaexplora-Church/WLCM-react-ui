// ─── Admin Registrations: ViewModel ───────────────────────────────────────────
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Registration } from './adminRegistrations.types';
import { AdminRegistrationsService } from './adminRegistrations.service';

export interface AdminRegistrationsViewModel {
    registrations: Registration[];
    filteredRegistrations: Registration[];
    isLoading: boolean;
    error: string | null;
    search: string;
    setSearch: (s: string) => void;
    stats: {
        total: number;
        firstTime: number;
        returning: number;
    };
    retry: () => void;
}

export function useAdminRegistrationsViewModel(): AdminRegistrationsViewModel {
    const navigate = useNavigate();

    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const loadRegistrations = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await AdminRegistrationsService.fetchAll();
            setRegistrations(data);
        } catch (err) {
            setError('Could not load registrations. Make sure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        } else {
            loadRegistrations();
        }
    }, [navigate]);

    const q = search.toLowerCase();
    const filteredRegistrations = registrations.filter(r => 
        (r.first_name || '').toLowerCase().includes(q) || 
        (r.last_name || '').toLowerCase().includes(q) || 
        (r.email || '').toLowerCase().includes(q)
    );

    const stats = {
        total: registrations.length,
        firstTime: registrations.filter(r => r.visitor_status === 'first_time').length,
        returning: registrations.filter(r => r.visitor_status === 'returning').length,
    };

    return {
        registrations,
        filteredRegistrations,
        isLoading,
        error,
        search,
        setSearch,
        stats,
        retry: loadRegistrations
    };
}
