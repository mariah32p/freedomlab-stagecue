import { useState } from 'react';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import { useEvents } from '../hooks/useEvents';
import { useSpeakers } from '../hooks/useSpeakers';
import { CreateEventModal } from '../components/CreateEventModal';
import { EventCard } from '../components/EventCard';
import { LiveEventManager } from '../components/LiveEventManager';
import { Event } from '../types/event';

export function Dashboard() {
  const subscriptionStatus = useSubscriptionStatus();
  const { events, loading: eventsLoading, createEvent, updateEvent, deleteEvent } = useEvents();
  const { addSpeaker } = useSpeakers();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showLiveManager, setShowLiveManager] = useState(false);

  const handleCreateEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    const newEvent = await createEvent(eventData);
    
    // Add some default speakers for demo purposes
    if (subscriptionStatus.plan === 'pro' || subscriptionStatus.status === 'trialing') {
      await addSpeaker({
        event_id: newEvent.id,
        name: 'Opening Speaker',
        session_title: 'Welcome & Introduction',
        duration: 15,
        order_index: 0
      });
    }
    
    return newEvent;
  };

  const handleStartLive = (event: Event) => {
    setSelectedEvent(event);
    setShowLiveManager(true);
    updateEvent(event.id, { status: 'live' });
  };

  const handleEditEvent = (event: Event) => {
    // For now, just show an alert - in real implementation would open edit modal
    alert(`Edit functionality for "${event.name}" would open here`);
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      await deleteEvent(id);
    }
  };

  // Check if user has Pro features access
  const hasProAccess = subscriptionStatus.plan === 'pro' || subscriptionStatus.status === 'trialing';

  if (subscriptionStatus.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-900">Event Dashboard</h1>
          <p className="mt-2 text-navy-600">Manage your events and live timing sessions</p>
        </div>

        <div className="space-y-6">
          {/* Events Overview */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-navy-900">Your Events</h2>
              {subscriptionStatus.status !== 'not_started' && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="btn btn-primary px-4 py-2"
                >
                  Create New Event
                </button>
              )}
            </div>
            
            {eventsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-navy-900 mb-2">No events yet</h3>
                <p className="text-navy-600 mb-4">Create your first event to start timing sessions</p>
                {subscriptionStatus.status !== 'not_started' && (
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="btn btn-primary px-6 py-3"
                  >
                    Create Your First Event
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={handleEditEvent}
                    onDelete={handleDeleteEvent}
                    onStartLive={handleStartLive}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Modals */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateEvent={handleCreateEvent}
      />

      {selectedEvent && (
        <LiveEventManager
          event={selectedEvent}
          onClose={() => {
            setShowLiveManager(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
}