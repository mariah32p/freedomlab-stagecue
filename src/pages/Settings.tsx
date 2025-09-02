import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from '../components/Alert';
import { PaymentIssueBanner } from '../components/PaymentIssueBanner';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import { isInGracePeriod } from '../utils/graceHelper';
import { supabase } from '../lib/supabase';

export function Settings() {
  const { user, signOut } = useAuth();
  const subscriptionStatus = useSubscriptionStatus();
  const [error, setError] = useState('');
  const [portalLoading, setPortalLoading] = useState(false);

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

  const handleSignOut = async () => {
    await signOut();
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
          onManageSubscription={handleManageSubscription}
        />
      )}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-900">Settings</h1>
          <p className="mt-2 text-navy-600">Manage your account and subscription</p>
        </div>

        {error && (
          <Alert type="error" className="mb-8">
            {error}
          </Alert>
        )}

        <div className="space-y-6">
          {/* Account Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-500 mb-1">Email Address</label>
                <p className="text-navy-900">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-500 mb-1">Account Created</label>
                <p className="text-navy-900">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white px-4 py-2"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Subscription Management */}
          <div className="card">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">Subscription</h2>
            {subscriptionStatus.status !== 'not_started' ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-500 mb-1">Current Plan</label>
                    <p className="text-lg font-semibold text-navy-900">
                      {subscriptionStatus.plan === 'basic' ? 'StageCue Basic' : 
                       subscriptionStatus.plan === 'pro' ? 'StageCue Pro' : 'No active subscription'}
                    </p>
                    <p className="text-sm text-navy-600">
                      {subscriptionStatus.plan === 'basic' ? '$29/month' : 
                       subscriptionStatus.plan === 'pro' ? '$49/month' : ''}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-500 mb-1">Status</label>
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
                </div>

                {subscriptionStatus.currentPeriodEnd && (
                  <div>
                    <label className="block text-sm font-medium text-navy-500 mb-1">
                      {subscriptionStatus.status === 'trialing' ? 'Trial ends:' :
                       subscriptionStatus.cancelAtPeriodEnd ? 'Expires:' : 'Next billing date:'}
                    </label>
                    <p className="text-navy-900">
                      {formatDate(subscriptionStatus.currentPeriodEnd)}
                    </p>
                    {subscriptionStatus.status === 'trialing' && subscriptionStatus.cancelAtPeriodEnd && (
                      <p className="text-sm text-red-600 mt-1">
                        Subscription will not renew after trial
                      </p>
                    )}
                  </div>
                )}

                {/* Plan Features */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-medium text-navy-900 mb-3">Your Plan Includes</h3>
                  <div className="space-y-2">
                    {subscriptionStatus.plan === 'basic' ? (
                      <>
                        <div className="flex items-center text-sm text-navy-700">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Up to 10 active timers
                        </div>
                        <div className="flex items-center text-sm text-navy-700">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Basic Slack notifications
                        </div>
                        <div className="flex items-center text-sm text-navy-700">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Speaker notes management
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center text-sm text-navy-700">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Unlimited active timers
                        </div>
                        <div className="flex items-center text-sm text-navy-700">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Custom moderator links
                        </div>
                        <div className="flex items-center text-sm text-navy-700">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Speaker self-service links
                        </div>
                        <div className="flex items-center text-sm text-navy-700">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Advanced Slack notifications
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={handleManageSubscription}
                    disabled={portalLoading}
                    className="btn btn-outline px-4 py-2"
                  >
                    {portalLoading ? 'Opening...' : 'Manage Subscription'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <h3 className="text-lg font-medium text-navy-900 mb-2">No Active Subscription</h3>
                <p className="text-navy-600 mb-4">Subscribe to StageCue to start timing your events</p>
                <a
                  href="/get-started"
                  className="btn btn-primary px-6 py-3"
                >
                  Choose a Plan
                </a>
              </div>
            )}
          </div>

          {/* Plan Comparison */}
          {subscriptionStatus.plan === 'basic' && subscriptionStatus.status === 'active' && (
            <div className="card bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Upgrade to Pro</h3>
                  <p className="text-navy-600 mb-4">
                    Unlock unlimited timers, custom links, and advanced Slack notifications
                  </p>
                  <div className="space-y-2 text-sm text-navy-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Unlimited active timers
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Speaker self-service portals
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Advanced Slack integration
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-navy-900 mb-1">$49</div>
                  <div className="text-sm text-navy-600 mb-4">/month</div>
                  <button
                    onClick={handleManageSubscription}
                    className="btn bg-amber-500 hover:bg-amber-600 text-white px-6 py-3"
                  >
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pro Features Display */}
          {(subscriptionStatus.plan === 'pro' || subscriptionStatus.status === 'trialing') && (
            <div className="card">
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

          {/* Billing History */}
          {subscriptionStatus.status !== 'not_started' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">Billing</h2>
              <p className="text-navy-600 mb-4">
                Manage your billing information, view invoices, and update payment methods.
              </p>
              <button
                onClick={handleManageSubscription}
                disabled={portalLoading}
                className="btn btn-primary px-4 py-2"
              >
                {portalLoading ? 'Opening...' : 'Open Billing Portal'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}