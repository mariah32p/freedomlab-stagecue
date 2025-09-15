import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from '../components/Alert';
import { PaymentIssueBanner } from '../components/PaymentIssueBanner';
import { PlanChangeModal } from '../components/PlanChangeModal';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import { isInGracePeriod } from '../utils/graceHelper';
import { supabase } from '../lib/supabase';

export function Settings() {
  const { user, signOut } = useAuth();
  const subscriptionStatus = useSubscriptionStatus();
  const [error, setError] = useState('');
  const [portalLoading, setPortalLoading] = useState(false);
  const [showPlanChange, setShowPlanChange] = useState(false);

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
                      {subscriptionStatus.plan === 'standard' ? 'StageCue Standard' : 
                       subscriptionStatus.plan === 'pro' ? 'StageCue Pro' : 
                       subscriptionStatus.plan === 'premium' ? 'StageCue Premium' : 
                       'No active subscription'}
                    </p>
                    <p className="text-sm text-navy-600">
                      {subscriptionStatus.plan === 'standard' ? '$29/month' : 
                       subscriptionStatus.plan === 'pro' ? '$49/month' : 
                       subscriptionStatus.plan === 'premium' ? '$99/month' : ''}
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
                    {subscriptionStatus.plan === 'standard' && (
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
                          Speaker notes management
                        </div>
                        <div className="flex items-center text-sm text-navy-700">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Advanced Slack notifications
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
                          Speaker self-service portals
                        </div>
                        <div className="flex items-center text-sm text-navy-700">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Real-time countdown displays
                        </div>
                        <div className="flex items-center text-sm text-navy-700">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Timer + speaker templates
                        </div>
                      </>
                    )}
                    {(subscriptionStatus.plan === 'pro' || subscriptionStatus.plan === 'premium') && (
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
                      Speaker notes management
                    </div>
                    <div className="flex items-center text-sm text-navy-700">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Advanced Slack notifications
                    </div>
                    <div className="flex items-center text-sm text-navy-700">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Real-time countdown displays
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
                          Speaker self-service portals
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
          {/* Premium Coming Soon */}
          {(subscriptionStatus.status === 'active' && subscriptionStatus.plan !== 'pro') && (
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">StageCue Pro</h3>
                  <p className="text-navy-600 mb-4">
                    Advanced features coming Q2 2025 - White-label branding, advanced analytics, and priority support
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-500 mb-1">$49</div>
                  <div className="text-sm text-slate-500 mb-4">/month</div>
                  <button
                    disabled
                    className="btn bg-slate-400 text-white px-6 py-3 cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
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

      {/* Plan Change Modal */}
      {subscriptionStatus.plan && (subscriptionStatus.plan === 'standard' || subscriptionStatus.plan === 'pro') && (
        <PlanChangeModal
          isOpen={showPlanChange}
          onClose={() => setShowPlanChange(false)}
          currentPlan={subscriptionStatus.plan}
          onSuccess={() => {
            setShowPlanChange(false);
            // Optionally show a success message
          }}
        />
      )}
    </div>
  );
}