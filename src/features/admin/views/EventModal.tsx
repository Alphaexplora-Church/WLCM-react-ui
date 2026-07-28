// ─── Admin Events: EventModal (View) ────────────────────────────────────────
import { useEffect, useState } from 'react';
import type { EventFormData } from '../models/adminEvents.types';
import { EMPTY_FORM } from '../models/adminEvents.types';

interface EventModalProps {
    open: boolean;
    title: string;
    isAnnouncement?: boolean;
    initial?: EventFormData;
    onClose: () => void;
    onSave: (data: EventFormData) => Promise<void>;
}

export function EventModal({ open, title, isAnnouncement, initial, onClose, onSave }: EventModalProps) {
    const [form, setForm] = useState<EventFormData>(initial ?? EMPTY_FORM);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    useEffect(() => {
        setForm(initial ?? EMPTY_FORM);
        setSaveError(null);
        setIsSaving(false);
    }, [initial, open]);

    if (!open) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setForm(prev => ({ ...prev, image: e.target.files![0] }));
        }
    };

    const handleSubmit = async () => {
        if (isSaving) return;
        setSaveError(null);
        setIsSaving(true);
        try {
            await onSave(form);
        } catch (err: any) {
            // Extract a clean message from the error (backend or validation)
            const raw = err?.message ?? 'An unexpected error occurred.';
            // Strip any JSON wrapper if the backend returned a JSON string in the body
            let message = raw;
            try {
                const parsed = JSON.parse(raw.replace(/^Failed to (create|update) event: /, ''));
                if (parsed?.error) {
                    if (parsed.error.details && Array.isArray(parsed.error.details)) {
                        message = parsed.error.details.map((d: any) => d.message).join(', ');
                    } else if (typeof parsed.error.message === 'string') {
                        message = parsed.error.message;
                    } else if (typeof parsed.error === 'string') {
                        message = parsed.error;
                    } else {
                        message = raw;
                    }
                } else if (typeof parsed?.message === 'string') {
                    message = parsed.message;
                }
            } catch {
                // Not JSON — keep as-is, but strip verbose prefix if present
                message = raw.replace(/^Failed to (create|update) event: /, '');
            }
            setSaveError(message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden max-h-[92vh] flex flex-col">

                {/* Header */}
                <div className="bg-midnight-teal px-6 py-5 flex items-center justify-between flex-shrink-0">
                    <h2 className="font-serif text-xl text-soft-linen">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={isSaving}
                        className="text-soft-linen/60 hover:text-soft-linen text-2xl leading-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        ×
                    </button>
                </div>

                {/* Body — scrollable */}
                <div className="p-6 space-y-4 overflow-y-auto flex-1">

                    {/* 1. Title */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-midnight-teal mb-1">Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g. Sunday Worship Service"
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-midnight-teal/40"
                        />
                    </div>

                    {/* 2. Description */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-midnight-teal mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Brief description of the event..."
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-midnight-teal/40 resize-none"
                        />
                    </div>

                    {/* 3. Start Date & Time */}
                    {!isAnnouncement && (
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-midnight-teal mb-1">Start Date &amp; Time</label>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="date"
                                    name="start_date_date"
                                    value={form.start_date_date}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-midnight-teal/40"
                                />
                                <input
                                    type="time"
                                    name="start_date_time"
                                    value={form.start_date_time}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-midnight-teal/40"
                                />
                            </div>
                        </div>
                    )}

                    {/* 4. End Date & Time */}
                    {!isAnnouncement && (
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-midnight-teal mb-1">End Date &amp; Time</label>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="date"
                                    name="end_date_date"
                                    value={form.end_date_date}
                                    onChange={handleChange}
                                    min={form.start_date_date || undefined}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-midnight-teal/40"
                                />
                                <input
                                    type="time"
                                    name="end_date_time"
                                    value={form.end_date_time}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-midnight-teal/40"
                                />
                            </div>
                        </div>
                    )}

                    {/* 5. Location */}
                    {!isAnnouncement && (
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-midnight-teal mb-1">Location</label>
                            <input
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="e.g. Main Sanctuary"
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-midnight-teal/40"
                            />
                        </div>
                    )}

                    {/* 6. Category */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-midnight-teal mb-1">Category</label>
                        <input
                            name="category_content"
                            value={form.category_content}
                            onChange={handleChange}
                            placeholder="e.g. Worship, Youth, Prayer"
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-midnight-teal/40"
                        />
                    </div>

                    {/* 7. Image Upload */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-midnight-teal mb-1">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-midnight-teal/40 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-midnight-teal/10 file:text-midnight-teal hover:file:bg-midnight-teal/20"
                        />
                        {form.image && (
                            <p className="mt-1 text-xs text-gray-400 truncate">Selected: {form.image.name}</p>
                        )}
                    </div>

                    {/* Error block — directly below Image Upload */}
                    {saveError && (
                        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                            <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-red-600">{saveError}</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100 flex-shrink-0">
                    <button
                        onClick={onClose}
                        disabled={isSaving}
                        className="px-5 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSaving}
                        className="px-5 py-2 rounded-lg text-sm font-bold bg-midnight-teal text-soft-linen hover:bg-midnight-teal/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center"
                    >
                        {isSaving ? (
                            <>
                                {/* Spinner */}
                                <svg
                                    className="animate-spin h-4 w-4 text-soft-linen"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                <span>Saving…</span>
                            </>
                        ) : (
                            <span>{initial ? 'Save Changes' : 'Create Event'}</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
