import { useState, type FormEvent } from 'react';
import { Event } from '../types/event';

interface EventDetailsStepProps {
  event: Event;
  onUpdateEvent: (id: string, updates: Partial<Event>) => Promise<void>;
  onUnsavedChanges: (hasChanges: boolean) => void;
  onSaveAndContinue: () => void;
  onNext: () => void;
}

export function EventDetailsStep({ event, onUpdateEvent, onUnsavedChanges, onSaveAndContinue, onNext }: EventDetailsStepProps) {
  const [formData, setFormData] = useState({
    name: event.name || '',
    date: event.date || '',
    meeting_link: event.meeting_link || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check for unsaved changes
  const hasChanges = formData.name !== (event.name || '') ||
    formData.date !== (event.date || '') ||
    formData.meeting_link !== (event.meeting_link || '');

  // Notify parent of unsaved changes
  useState(() => {
    onUnsavedChanges(hasChanges);
  }, [hasChanges, onUnsavedChanges]);

  // Handle save and continue from unsaved changes modal
  window.handleSaveAndContinue = onSaveAndContinue;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onUpdateEvent(event.id, {
        name: formData.name,
        date: formData.date,
        meeting_link: formData.meeting_link || undefined
      });
      onUnsavedChanges(false);
      onNext();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Event Details</h2>
        <p className="text-navy-600">Set up the basic information for your event</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label htmlFor="event-name" className="block text-sm font-medium text-navy-700 mb-2">
            Event Name *
          </label>
          <input
            id="event-name"
            type="text"
            required
            className="input"
            placeholder="e.g., Tech Summit 2025, Weekly Standup"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="event-date" className="block text-sm font-medium text-navy-700 mb-2">
            Event Date *
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
          <p className="text-sm text-navy-500 mt-1">
            Zoom, Teams, or any video conferencing link
          </p>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full py-3 text-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Saving details...
              </div>
            ) : (
              'Save & Continue to Speaker Lineup'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}