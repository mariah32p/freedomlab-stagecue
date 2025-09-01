import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from '../components/Alert';
import { PaymentIssueBanner } from '../components/PaymentIssueBanner';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import { isInGracePeriod } from '../utils/graceHelper';

export function Dashboard() {
  const { user } = useAuth();
  const subscriptionStatus = useSubscriptionStatus();
  const [error] = useState('');

  const showPaymentBanner = subscriptionStatus.status === 'past_due' && 
    isInGracePeriod(subscriptionStatus.paymentIssueSince);

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

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
          onManageSubscription={() => {
            // TODO: Implement Stripe Customer Portal
            console.log('Open Stripe Customer Portal');
          }}
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
                      ? 'Free Trial'
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
                    Create New Timer
                  </button>
                  <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-current bg-transparent hover:bg-current hover:text-white focus:ring-primary-500 transition-all duration-200 w-full">
                    Manage Events
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 card">
          <h2 className="text-xl font-semibold text-navy-900 mb-4">Event Timing Features</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-navy-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-navy-900">Countdown Displays</h3>
              <p className="text-sm text-navy-600 mt-1">Shareable countdown timers with clean design</p>
            </div>
            <div className="text-center p-4 bg-navy-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-navy-900">Speaker Notes</h3>
              <p className="text-sm text-navy-600 mt-1">Organize speaker information and transitions</p>
            </div>
            <div className="text-center p-4 bg-navy-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h8v-2H4v2zM4 11h10V9H4v2z" />
                </svg>
              </div>
              <h3 className="font-medium text-navy-900">Slack Notifications</h3>
              <p className="text-sm text-navy-600 mt-1">Automatic team alerts and updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}