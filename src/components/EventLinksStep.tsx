import { useState } from 'react';
import { Event, Speaker } from '../types/event';
import { Toast } from './Toast';

interface EventLinksStepProps {
  event: Event;
  speakers: Speaker[];
  onUpdateEvent: (id: string, updates: Partial<Event>) => Promise<void>;
  onUnsavedChanges: (hasChanges: boolean) => void;
  onPrevious: () => void;
}

export function EventLinksStep({ event, speakers, onUpdateEvent, onUnsavedChanges, onPrevious }: EventLinksStepProps) {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });
  const [startingLive, setStartingLive] = useState(false);

  // This step typically doesn't have unsaved changes, but we'll track the live status change
  useState(() => {
    onUnsavedChanges(false); // Links step doesn't have form data to save
  }, [onUnsavedChanges]);

  const sortedSpeakers = [...speakers].sort((a, b) => a.order_index - b.order_index);
  const totalDuration = sortedSpeakers.reduce((sum, speaker) => sum + (speaker.duration || 0), 0);

  const eventSlug = event.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const moderatorUrl = `${window.location.origin}/moderate/${eventSlug}`;

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} copied to clipboard!`);
    } catch (err) {
      showToast(`Failed to copy ${label.toLowerCase()}`, 'error');
    }
  };

  const getSpeakerSlug = (speaker: Speaker) => {
    return speaker.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleStartLive = async () => {
    setStartingLive(true);
    try {
      await onUpdateEvent(event.id, { status: 'live' });
      showToast('Event is now live! Share the links with your team.');
    } catch (err) {
      showToast('Failed to start live event', 'error');
    } finally {
      setStartingLive(false);
    }
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
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Links & Go Live</h2>
        <p className="text-navy-600">Generate links and start your live event</p>
      </div>

      {/* Event Summary */}
      <div className="bg-slate-50 rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-navy-900 mb-4">Event Summary</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-navy-600">Event:</span>
            <div className="font-medium text-navy-900">{event.name}</div>
          </div>
          <div>
            <span className="text-navy-600">Date:</span>
            <div className="font-medium text-navy-900">
              {new Date(event.date).toLocaleDateString()}
            </div>
          </div>
          <div>
            <span className="text-navy-600">Total Duration:</span>
            <div className="font-medium text-navy-900">{formatDuration(totalDuration)}</div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Moderator Link */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-navy-900">Moderator Control Portal</h3>
              <p className="text-sm text-navy-600">Share with event moderator or assistant</p>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-3 mb-4">
            <div className="text-sm font-mono text-navy-700 break-all">
              {moderatorUrl}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => copyToClipboard(moderatorUrl, 'Moderator link')}
              className="btn btn-outline px-4 py-2 text-sm"
            >
              Copy Link
            </button>
            <button
              onClick={() => window.open(moderatorUrl, '_blank')}
              className="btn btn-secondary px-4 py-2 text-sm"
            >
              Open Portal
            </button>
          </div>
        </div>

        {/* Speaker Links */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-navy-900">Speaker Portals</h3>
              <p className="text-sm text-navy-600">Send these links to your speakers</p>
            </div>
          </div>

          {sortedSpeakers.length === 0 ? (
            <div className="text-center py-8 text-navy-500">
              <p>Add speakers to generate their portal links</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedSpeakers.map((speaker, index) => {
                const speakerUrl = `${window.location.origin}/speaker/${eventSlug}/${getSpeakerSlug(speaker)}`;
                
                return (
                  <div key={speaker.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 bg-navy-100 rounded-full flex items-center justify-center text-xs font-medium text-navy-600">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-medium text-navy-900">{speaker.name}</div>
                        <div className="text-sm text-navy-600">{speaker.session_title} • {formatDuration(speaker.duration || 0)}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(speakerUrl, `${speaker.name}'s link`)}
                        className="btn btn-outline px-3 py-1 text-xs"
                      >
                        Copy Link
                      </button>
                      <button
                        onClick={() => window.open(speakerUrl, '_blank')}
                        className="btn btn-secondary px-3 py-1 text-xs"
                      >
                        Open
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Go Live Section */}
        {sortedSpeakers.length > 0 && (
          <div className="bg-gradient-to-r from-teal-50 to-purple-50 border border-teal-200 rounded-xl p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Ready to Go Live?</h3>
              <p className="text-navy-600 mb-6">
                Your event is set up with {sortedSpeakers.length} speakers. 
                Start the live event when you're ready to begin timing.
              </p>
              
              {event.status === 'live' ? (
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Event is Live!</span>
                </div>
              ) : (
                <button
                  onClick={handleStartLive}
                  disabled={startingLive}
                  className="btn bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold"
                >
                  {startingLive ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Starting Live Event...
                    </div>
                  ) : (
                    '🔴 Start Live Event'
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8 border-t border-slate-200 mt-8">
        <button
          onClick={onPrevious}
          className="btn btn-outline px-6 py-3"
        >
          ← Back to Details
        </button>
        
        <div className="text-sm text-navy-500 flex items-center">
          {sortedSpeakers.length === 0 ? (
            'Add speakers to continue'
          ) : (
            `${sortedSpeakers.length} speakers • ${formatDuration(totalDuration)} total`
          )}
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}