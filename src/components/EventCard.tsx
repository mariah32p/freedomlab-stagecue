import { useState } from 'react';
import { Event } from '../types/event';
import { Toast } from './Toast';

interface EventCardProps {
  event: Event;
  onManageBlocks: (event: Event) => void;
  onDelete: (event: Event) => void;
  onStartLive: (event: Event) => void;
}

export function EventCard({ event, onManageBlocks, onDelete, onStartLive }: EventCardProps) {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-navy-900 mb-2">{event.name}</h3>
          <div className="space-y-1 text-sm text-navy-600">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              {formatDate(event.date)}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {event.total_duration} minutes
            </div>
            {event.meeting_link && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <a 
                  href={event.meeting_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 truncate"
                >
                  Meeting Link
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="ml-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="flex space-x-2">
          <button
            onClick={() => window.location.href = `/events/${event.id}`}
            className="btn btn-primary px-4 py-2 text-sm"
          >
            Manage Event
          </button>
          <button
            onClick={() => {
              const speakerUrl = `${window.location.origin}/speaker/${event.id}/speaker-1`;
              if (navigator.clipboard) {
                navigator.clipboard.writeText(speakerUrl).then(() => {
                  showToast('Speaker link copied to clipboard!');
                }).catch(() => {
                  showToast('Failed to copy link', 'error');
                });
              } else {
                // Fallback for browsers that don't support clipboard API
                showToast('Clipboard not supported - link: ' + speakerUrl, 'error');
              }
            }}
            className="text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
          >
            Copy Speaker Link
          </button>
          <button
            onClick={() => onDelete(event)}
            className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            Delete
          </button>
        </div>
        <div className="flex space-x-2">
          {event.status === 'draft' && (
            <button
              onClick={() => onStartLive(event)}
              className="btn btn-primary px-4 py-2 text-sm"
            >
              Start Live
            </button>
          )}
          {event.status === 'live' && (
            <button
              onClick={() => onStartLive(event)}
              className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm"
            >
              Manage Live
            </button>
          )}
        </div>
      </div>
      </div>
      
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
}