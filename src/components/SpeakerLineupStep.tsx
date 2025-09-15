import { useState, type FormEvent } from 'react';
import { Event, Speaker } from '../types/event';

interface SpeakerLineupStepProps {
  event: Event;
  speakers: Speaker[];
  onAddSpeaker: (speakerData: Omit<Speaker, 'id' | 'created_at'>) => Promise<Speaker>;
  onUpdateSpeaker: (id: string, updates: Partial<Speaker>) => Promise<void>;
  onDeleteSpeaker: (id: string) => Promise<void>;
  onPrevious: () => void;
  onNext: () => void;
}

export function SpeakerLineupStep({ 
  event, 
  speakers, 
  onAddSpeaker, 
  onUpdateSpeaker, 
  onDeleteSpeaker, 
  onPrevious, 
  onNext 
}: SpeakerLineupStepProps) {
  const [formData, setFormData] = useState({
    name: '',
    session_title: '',
    duration: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingSpeaker, setEditingSpeaker] = useState<string | null>(null);

  const sortedSpeakers = [...speakers].sort((a, b) => a.order_index - b.order_index);
  const totalDuration = sortedSpeakers.reduce((sum, speaker) => sum + (speaker.duration || 0), 0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onAddSpeaker({
        time_block_id: event.id, // Using event.id as time_block_id for simplicity
        name: formData.name,
        session_title: formData.session_title,
        duration: parseInt(formData.duration),
        order_index: speakers.length,
        email: undefined,
        bio: undefined
      });

      // Reset form
      setFormData({
        name: '',
        session_title: '',
        duration: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add speaker');
    } finally {
      setLoading(false);
    }
  };

  const handleMoveSpeaker = async (speakerId: string, direction: 'up' | 'down') => {
    const currentIndex = sortedSpeakers.findIndex(s => s.id === speakerId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= sortedSpeakers.length) return;

    // Swap order indices
    const currentSpeaker = sortedSpeakers[currentIndex];
    const targetSpeaker = sortedSpeakers[newIndex];

    await onUpdateSpeaker(currentSpeaker.id, { order_index: targetSpeaker.order_index });
    await onUpdateSpeaker(targetSpeaker.id, { order_index: currentSpeaker.order_index });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Speaker Lineup</h2>
        <p className="text-navy-600">Add speakers and organize your event schedule</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Add Speaker Form */}
        <div>
          <h3 className="text-lg font-semibold text-navy-900 mb-4">Add Speaker or Session</h3>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="speaker-name" className="block text-sm font-medium text-navy-700 mb-2">
                Name or Session Title *
              </label>
              <input
                id="speaker-name"
                type="text"
                required
                className="input"
                placeholder="e.g., Dr. Sarah Chen, Coffee Break"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="session-title" className="block text-sm font-medium text-navy-700 mb-2">
                Session Description *
              </label>
              <input
                id="session-title"
                type="text"
                required
                className="input"
                placeholder="e.g., Opening Keynote, 15-minute break"
                value={formData.session_title}
                onChange={(e) => setFormData(prev => ({ ...prev, session_title: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-navy-700 mb-2">
                Duration (minutes) *
              </label>
              <input
                id="duration"
                type="number"
                required
                min="1"
                className="input"
                placeholder="30"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding...
                </div>
              ) : (
                'Add to Lineup'
              )}
            </button>
          </form>
        </div>

        {/* Speaker Lineup */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-navy-900">Event Lineup</h3>
            <div className="text-sm text-navy-600">
              Total: {formatDuration(totalDuration)}
            </div>
          </div>

          {sortedSpeakers.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
              <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <h4 className="text-lg font-medium text-navy-900 mb-2">No speakers yet</h4>
              <p className="text-navy-600">Add speakers and sessions to build your event lineup</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedSpeakers.map((speaker, index) => (
                <div key={speaker.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-navy-500">
                      <span className="w-6 h-6 bg-navy-100 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <span className="text-teal-600 font-semibold text-sm">
                        {getInitials(speaker.name)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-navy-900">{speaker.name}</div>
                      <div className="text-sm text-navy-600">{speaker.session_title}</div>
                    </div>
                    <div className="text-sm font-medium text-navy-500">
                      {formatDuration(speaker.duration || 0)}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Move buttons */}
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => handleMoveSpeaker(speaker.id, 'up')}
                        disabled={index === 0}
                        className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => handleMoveSpeaker(speaker.id, 'down')}
                        disabled={index === sortedSpeakers.length - 1}
                        className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        ↓
                      </button>
                    </div>
                    
                    <button
                      onClick={() => onDeleteSpeaker(speaker.id)}
                      className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8 border-t border-slate-200 mt-8">
        <button
          onClick={onPrevious}
          className="btn btn-outline px-6 py-3"
        >
          ← Back to Details
        </button>
        
        <button
          onClick={onNext}
          disabled={sortedSpeakers.length === 0}
          className="btn btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Links →
        </button>
      </div>
    </div>
  );
}