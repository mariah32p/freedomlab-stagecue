import { useState, type FormEvent } from 'react';
import { TimeBlock, Speaker } from '../types/event';

interface AddSpeakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSpeaker: (speakerData: Omit<Speaker, 'id' | 'created_at'>) => Promise<Speaker>;
  timeBlock: TimeBlock;
}

export function AddSpeakerModal({ isOpen, onClose, onAddSpeaker, timeBlock }: AddSpeakerModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onAddSpeaker({
        time_block_id: timeBlock.id,
        name: formData.name,
        email: formData.email || undefined,
        bio: formData.bio || undefined,
        order_index: 0 // For now, single speaker per block
      });

      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        bio: ''
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add speaker');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-navy-900">Add Speaker</h2>
              <p className="text-sm text-navy-600">to "{timeBlock.title}"</p>
            </div>
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
              <label htmlFor="speaker-name" className="block text-sm font-medium text-navy-700 mb-2">
                Speaker Name *
              </label>
              <input
                id="speaker-name"
                type="text"
                required
                className="input"
                placeholder="e.g., Dr. Emily Chen"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="speaker-email" className="block text-sm font-medium text-navy-700 mb-2">
                Email (optional)
              </label>
              <input
                id="speaker-email"
                type="email"
                className="input"
                placeholder="speaker@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="speaker-bio" className="block text-sm font-medium text-navy-700 mb-2">
                Bio (optional)
              </label>
              <textarea
                id="speaker-bio"
                className="input h-20 resize-none"
                placeholder="Brief speaker bio or credentials..."
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              />
            </div>

            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-sm text-navy-600">
                <strong>Time Block:</strong> {timeBlock.title}
              </div>
              <div className="text-sm text-navy-600">
                <strong>Duration:</strong> {timeBlock.duration} minutes
              </div>
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
                    Adding speaker...
                  </div>
                ) : (
                  'Add Speaker'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}