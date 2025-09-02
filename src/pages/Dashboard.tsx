import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from '../components/Alert';
import { PaymentIssueBanner } from '../components/PaymentIssueBanner';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import { isInGracePeriod } from '../utils/graceHelper';
import { supabase } from '../lib/supabase';
import { useEvents } from '../hooks/useEvents';
import { useSpeakers } from '../hooks/useSpeakers';
import { CreateEventModal } from '../components/CreateEventModal';
import { EventCard } from '../components/EventCard';
import { LiveEventManager } from '../components/LiveEventManager';
import { Event } from '../types/event';

export function Dashboard() {
  const { user } = useAuth();
  const subscriptionStatus = useSubscriptionStatus();
  const { events, loading: eventsLoading, createEvent, updateEvent, deleteEvent } = useEvents();
  const { addSpeaker } = useSpeakers();
  const [error, setError] = useState('');
  const [portalLoading, setPortalLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showLiveManager, setShowLiveManager] = useState(false);

  const showPaymentBanner = subscriptionStatus.status === 'past_due' && 
    isInGracePeriod(subscriptionStatus.paymentIssueSince);

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    setError('');

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
      const message = err instanceof Error ? err.message : 'Failed to open billing portal';
      setError(message);
    } finally {
      setPortalLoading(false);
    }
  };

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
      {showPaymentBanner && (
        <PaymentIssueBanner 
          paymentIssueSince={subscriptionStatus.paymentIssueSince}
          onManageSubscription={handleManageSubscription}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-900">Dashboard</h1>
          <p className="mt-2 text-navy-600">Welcome back, {user?.email}</p>
        </div>

        {error && (
          <Alert type="error" className="mb-8">
            {error}
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Events Overview */}
          <div className="md:col-span-2 card">
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

          <div className="card">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">Subscription Status</h2>
            {subscriptionStatus.status !== 'not_started' ? (
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-navy-500">Plan:</span>
                  <p className="text-lg font-semibold text-navy-900">
                    {subscriptionStatus.plan === 'basic' ? 'StageCue Basic' : 
                     subscriptionStatus.plan === 'pro' ? 'StageCue Pro' : 'No active subscription'}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-navy-500">Status:</span>
                  <p className={`text-sm font-medium capitalize ${
                    subscriptionStatus.status === 'active' 
                      ? 'text-green-600' 
                      : subscriptionStatus.status === 'not_started'
                      ? 'text-navy-600'
                      : subscriptionStatus.status === 'trialing'
                      ? 'text-blue-600'
                      : 'text-red-600'
                  }`}>
                    {subscriptionStatus.status === 'not_started' 
                      ? 'No Active Subscription'
                      : subscriptionStatus.status === 'trialing'
                     ? subscriptionStatus.cancelAtPeriodEnd ? 'Free Trial (Canceled)' : 'Free Trial'
                      : subscriptionStatus.status}
                  </p>
                </div>
                {subscriptionStatus.currentPeriodEnd && (
                  <div>
                    <span className="text-sm font-medium text-navy-500">
                      {subscriptionStatus.status === 'trialing' ? 'Trial ends:' :
                       subscriptionStatus.cancelAtPeriodEnd ? 'Expires:' : 'Renews:'}
                    </span>
                    <p className="text-sm text-navy-900">
                      {formatDate(subscriptionStatus.currentPeriodEnd)}
                    </p>
                    {subscriptionStatus.status === 'trialing' && subscriptionStatus.cancelAtPeriodEnd && (
                      <p className="text-sm text-red-600 mt-1">
                        Subscription will not renew after trial
                      </p>
                    )}
                  </div>
                )}
                {subscriptionStatus.status !== 'not_started' && (
                  <div className="mt-4">
                    <button
                      onClick={handleManageSubscription}
                      disabled={portalLoading}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-current bg-transparent hover:bg-current hover:text-white focus:ring-primary-500 transition-all duration-200"
                    >
                      {portalLoading ? 'Opening...' : 'Manage Subscription'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-navy-600">No subscription information available.</p>
            )}
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {subscriptionStatus.status === 'not_started' ? (
                <a
                  href="/get-started"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 w-full"
                >
                  Subscribe to StageCue
                </a>
              ) : (
                <div className="space-y-2">
                  <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 w-full">
                    onClick={() => setShowCreateModal(true)}
                    Create New Event
                  </button>
                  <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-current bg-transparent hover:bg-current hover:text-white focus:ring-primary-500 transition-all duration-200 w-full">
                    View All Events
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pro Features Section */}
        {hasProAccess && (
          <div className="mt-8 card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-navy-900">Pro Features</h2>
              <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {subscriptionStatus.status === 'trialing' ? 'Trial Access' : 'Pro Plan'}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border border-teal-200">
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-navy-900">Unlimited Timers</h3>
                <p className="text-sm text-navy-600 mt-1">Run multiple sessions simultaneously</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 className="font-medium text-navy-900">Custom Links</h3>
                <p className="text-sm text-navy-600 mt-1">Moderator and speaker self-service portals</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h8v-2H4v2zM4 11h10V9H4v2z" />
                  </svg>
                </div>
                <h3 className="font-medium text-navy-900">Advanced Notifications</h3>
                <p className="text-sm text-navy-600 mt-1">Rich Slack integration with custom alerts</p>
              </div>
            </div>
          </div>
        )}

        {/* Basic Plan Limitation */}
        {subscriptionStatus.plan === 'basic' && subscriptionStatus.status === 'active' && (
          <div className="mt-8 card bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">Upgrade to Pro</h3>
                <p className="text-navy-600 mb-4">
                  Unlock unlimited timers, custom links, and advanced Slack notifications
                </p>
                <div className="flex items-center space-x-4 text-sm text-navy-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Current: {events.length}/10 timers
                  </div>
                </div>
              </div>
              <button
                onClick={handleManageSubscription}
                className="btn bg-amber-500 hover:bg-amber-600 text-white px-6 py-3"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        )}
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