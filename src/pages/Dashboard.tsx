import { useState } from 'react';
import { useEvents } from '../hooks/useEvents';
// import { useTimeBlocks } from '../hooks/useTimeBlocks';
import { TrialBanner } from '../components/TrialBanner';
import { PaymentIssueBanner } from '../components/PaymentIssueBanner';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import { isInGracePeriod } from '../utils/graceHelper';
import { useFeatureGating } from '../hooks/useFeatureGating';
import { TimerLimitNotice } from '../components/TimerLimitNotice';
import { CreateEventModal } from '../components/CreateEventModal';
import { EventCard } from '../components/EventCard';
import { LiveEventManager } from '../components/LiveEventManager';
import { TimeBlockManager } from '../components/TimeBlockManager';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { Event } from '../types/event';
import { supabase } from '../lib/supabase';

export function Dashboard() {
  const { events, loading: eventsLoading, createEvent, updateEvent, deleteEvent } = useEvents();
  const subscriptionStatus = useSubscriptionStatus();
  const featureGates = useFeatureGating();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showLiveManager, setShowLiveManager] = useState(false);
  const [showTimeBlockManager, setShowTimeBlockManager] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; event: Event | null }>({
    show: false,
    event: null
  });

  const handleCreateEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!featureGates.canCreateEvents) {
      throw new Error('Please upgrade your subscription to create events');
    }
    return await createEvent(eventData);
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

  const showPaymentBanner = subscriptionStatus.status === 'past_due' && 
    isInGracePeriod(subscriptionStatus.paymentIssueSince);

  const handleManageSubscription = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-portal-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create portal session');
      }

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (err: unknown) {
      console.error('Failed to open billing portal:', err);
    }
  };

  if (eventsLoading || subscriptionStatus.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {showPaymentBanner && (
        <PaymentIssueBanner 
          paymentIssueSince={subscriptionStatus.paymentIssueSince}
          onManageSubscription={handleManageSubscription}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrialBanner />
        
        <TimerLimitNotice currentTimerCount={events.filter(e => e.status === 'live').length} />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-900">Event Dashboard</h1>
          <p className="mt-2 text-navy-600">Manage your events and live timing sessions</p>
        </div>

        <div className="space-y-6">
          {/* Events Overview */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-navy-900">Your Events</h2>
              {featureGates.canCreateEvents ? (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="btn btn-primary px-4 py-2"
                >
                  Create New Event
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-navy-600 mb-2">Upgrade to create events</p>
                  <a href="/get-started" className="btn btn-primary px-4 py-2 text-sm">
                    Choose Plan
                  </a>
                </div>
              )}
            </div>
            
            {events.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-navy-900 mb-2">No events yet</h3>
                <p className="text-navy-600 mb-4">Create your first event to start timing sessions</p>
                {featureGates.canCreateEvents ? (
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="btn btn-primary px-6 py-3"
                  >
                    Create Your First Event
                  </button>
                ) : (
                  <a href="/get-started" className="btn btn-primary px-6 py-3">
                    Choose a Plan to Get Started
                  </a>
                )}
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

            {/* Feature Limitations Notice */}
            {!featureGates.canCreateEvents && (
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm font-medium text-amber-800">
                    Subscription required to create and manage events
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Modals */}
      {showCreateModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowCreateModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-navy-900">Create New Event</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleCreateEvent({
                  name: formData.get('name') as string,
                  date: formData.get('date') as string,
                  total_duration: 60, // Default 1 hour
                  meeting_link: (formData.get('meeting_link') as string) || undefined,
                  status: 'draft'
                });
              }} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-2">
                    Event Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="input"
                    placeholder="e.g., Tech Summit 2025"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-navy-700 mb-2">
                    Date *
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="meeting_link" className="block text-sm font-medium text-navy-700 mb-2">
                    Meeting Link (optional)
                  </label>
                  <input
                    id="meeting_link"
                    name="meeting_link"
                    type="url"
                    className="input"
                    placeholder="https://zoom.us/j/123456789"
                  />
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-full py-3"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={showCreateModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Event"
        message={`Are you sure you want to delete "${deleteConfirm.event?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}