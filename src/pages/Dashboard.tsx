import { useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import { useTimeBlocks } from '../hooks/useTimeBlocks';
import { CreateEventModal } from '../components/CreateEventModal';
import { EventCard } from '../components/EventCard';
import { LiveEventManager } from '../components/LiveEventManager';
import { TimeBlockManager } from '../components/TimeBlockManager';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { Event } from '../types/event';

export function Dashboard() {
  const { events, loading: eventsLoading, createEvent, updateEvent, deleteEvent } = useEvents();
  const { addTimeBlock } = useTimeBlocks();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showLiveManager, setShowLiveManager] = useState(false);
  const [showTimeBlockManager, setShowTimeBlockManager] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; event: Event | null }>({
    show: false,
    event: null
  });

  const handleCreateEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    const newEvent = await createEvent(eventData);
    
    // Add a default opening time block for demo purposes
    await addTimeBlock({
      event_id: newEvent.id,
      title: 'Welcome & Introduction',
      start_time: 0,
      duration: 15,
      type: 'session',
      order_index: 0
    });
    
    return newEvent;
  };

  const handleStartLive = (event: Event) => {
    setSelectedEvent(event);
    setShowLiveManager(true);
    updateEvent(event.id, { status: 'live' });
  };

  const handleManageBlocks = (event: Event) => {
    setSelectedEvent(event);
    setShowTimeBlockManager(true);
  };

  const handleDeleteEvent = (event: Event) => {
    setDeleteConfirm({ show: true, event });
  };

  const confirmDelete = async () => {
    if (deleteConfirm.event) {
      await deleteEvent(deleteConfirm.event.id);
      setDeleteConfirm({ show: false, event: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, event: null });
  };

  if (eventsLoading) {
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
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn btn-primary px-4 py-2"
              >
                Create New Event
              </button>
            </div>
            
            {events.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-navy-900 mb-2">No events yet</h3>
                <p className="text-navy-600 mb-4">Create your first event to start timing sessions</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="btn btn-primary px-6 py-3"
                >
                  Create Your First Event
                </button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onManageBlocks={handleManageBlocks}
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
          isOpen={showLiveManager}
          onClose={() => {
            setShowLiveManager(false);
            setSelectedEvent(null);
          }}
        />
      )}

      {selectedEvent && (
        <>
            <TimeBlockManager
              event={selectedEvent}
              isOpen={showTimeBlockManager}
              onClose={() => {
                setShowTimeBlockManager(false);
                setSelectedEvent(null);
              }}
            />
        </>
      )}
            
      <DeleteConfirmModal
        isOpen={deleteConfirm.show}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Event"
        message={`Are you sure you want to delete "${deleteConfirm.event?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}