import { useState, type FormEvent } from 'react';
import { Event, TimeBlock } from '../types/event';

interface CreateTimeBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBlock: (blockData: Omit<TimeBlock, 'id' | 'created_at' | 'updated_at'>) => Promise<TimeBlock>;
  event: Event;
  existingBlocks: TimeBlock[];
}

export function CreateTimeBlockModal({ 
  isOpen, 
  onClose, 
  onCreateBlock, 
  event, 
  existingBlocks 
}: CreateTimeBlockModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    type: 'session' as TimeBlock['type']
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate next start time based on existing blocks
  const getNextStartTime = () => {
    if (existingBlocks.length === 0) return 0;
    
    const lastBlock = existingBlocks
      .sort((a, b) => a.order_index - b.order_index)
      .pop();
    
    return lastBlock ? lastBlock.start_time + lastBlock.duration : 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const startTime = getNextStartTime();
      const orderIndex = existingBlocks.length;

      await onCreateBlock({
        event_id: event.id,
        title: formData.title,
        start_time: startTime,
        duration: parseInt(formData.duration),
        type: formData.type,
        order_index: orderIndex
      });

      // Reset form and close modal
      setFormData({
        title: '',
        duration: '',
        type: 'session'
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create time block');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const nextStartTime = getNextStartTime();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-navy-900">Add Time Block</h2>
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
              <label htmlFor="block-title" className="block text-sm font-medium text-navy-700 mb-2">
                Block Title *
              </label>
              <input
                id="block-title"
                type="text"
                required
                className="input"
                placeholder="e.g., Opening Keynote, Coffee Break"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="block-duration" className="block text-sm font-medium text-navy-700 mb-2">
                  Duration (minutes) *
                </label>
                <input
                  id="block-duration"
                  type="number"
                  required
                  min="1"
                  className="input"
                  placeholder="45"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="block-type" className="block text-sm font-medium text-navy-700 mb-2">
                  Block Type *
                </label>
                <select
                  id="block-type"
                  required
                  className="input"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as TimeBlock['type'] }))}
                >
                  <option value="session">Session</option>
                  <option value="break">Break</option>
                  <option value="qa">Q&A</option>
                  <option value="networking">Networking</option>
                </select>
              </div>
            </div>

            {/* Start Time Info */}
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-sm text-navy-600">
                <strong>Start Time:</strong> {Math.floor(nextStartTime / 60) > 0 
                  ? `${Math.floor(nextStartTime / 60)}:${(nextStartTime % 60).toString().padStart(2, '0')}`
                  : `${nextStartTime} min`} from event start
              </div>
              {existingBlocks.length > 0 && (
                <div className="text-xs text-navy-500 mt-1">
                  This block will start after the previous block ends
                </div>
              )}
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
                    Creating block...
                  </div>
                ) : (
                  'Create Time Block'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}