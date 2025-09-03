import { useState, type FormEvent } from 'react';
import { Event } from '../types/event';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEvent: (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => Promise<Event>;
}

export function CreateEventModal({ isOpen, onClose, onCreateEvent }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    duration: '',
    meeting_link: '',
    status: 'draft' as const
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onCreateEvent({
        name: formData.name,
        date: formData.date,
        total_duration: parseInt(formData.duration),
        meeting_link: formData.meeting_link || undefined,
        status: formData.status
      });

      // Reset form and close modal
      setFormData({
        name: '',
        date: '',
        duration: '',
        meeting_link: '',
        status: 'draft'
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-navy-900">Create New Event</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="event-name" className="block text-sm font-medium text-navy-700 mb-2">
                Event Name *
              </label>
              <input
                id="event-name"
                type="text"
                required
                className="input"
                placeholder="e.g., Q1 Product Launch Planning"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="event-date" className="block text-sm font-medium text-navy-700 mb-2">
                  Date *
                </label>
                <input
                  id="event-date"
                  type="date"
                  required
                  className="input"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="event-duration" className="block text-sm font-medium text-navy-700 mb-2">
                  Total Duration (minutes) *
                </label>
                <input
                  id="event-duration"
                  type="number"
                  required
                  min="1"
                  className="input"
                  placeholder="90"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label htmlFor="meeting-link" className="block text-sm font-medium text-navy-700 mb-2">
                Meeting Link (optional)
              </label>
              <input
                id="meeting-link"
                type="url"
                className="input"
                placeholder="https://zoom.us/j/123456789"
                value={formData.meeting_link}
                onChange={(e) => setFormData(prev => ({ ...prev, meeting_link: e.target.value }))}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full py-3"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating event...
                  </div>
                ) : (
                  'Create Event'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}