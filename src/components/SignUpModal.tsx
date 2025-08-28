import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { products } from '../stripe-config';
import { Alert } from '../components/Alert';

interface Subscription {
  subscription_status: string;
  price_id: string | null;
  current_period_end: number | null;
  current_period_start: number | null;
  cancel_at_period_end: boolean;
}

export function Dashboard() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('subscription_status, price_id, current_period_end, current_period_start, cancel_at_period_end')
        .maybeSingle();

      if (error) {
        throw error;
      }

      setSubscription(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getProductName = (priceId: string | null) => {
    if (!priceId) return 'No active subscription';
    const product = products.find(p => p.priceId === priceId);
    return product ? product.name : 'Unknown Plan';
  };

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const getTrialDaysLeft = () => {
    if (!subscription?.current_period_start || !subscription?.current_period_end) return null;
    if (subscription.subscription_status !== 'trialing') return null;
    
    const now = Date.now() / 1000;
    const daysLeft = Math.ceil((subscription.current_period_end - now) / (24 * 60 * 60));
    return Math.max(0, daysLeft);
  };

  const handleManageSubscription = async () => {
    try {
      // This would call a Stripe customer portal function
      // For now, we'll just show an alert
      alert('Subscription management coming soon!');
    } catch (error) {
      console.error('Error opening customer portal:', error);
    }
  };

  if (loading) {
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
            {subscription ? (
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-navy-500">Plan:</span>
                  <p className="text-lg font-semibold text-navy-900">
                    {getProductName(subscription.price_id)}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-navy-500">Status:</span>
                  <div className="flex items-center space-x-2">
                    <p className={`text-sm font-medium capitalize ${
                      subscription.subscription_status === 'active' 
                        ? 'text-green-600' 
                        : subscription.subscription_status === 'trialing'
                        ? 'text-blue-600'
                        : subscription.subscription_status === 'not_started'
                        ? 'text-navy-600'
                        : 'text-red-600'
                    }`}>
                      {subscription.subscription_status === 'not_started' 
                        ? 'No Active Subscription' 
                        : subscription.subscription_status === 'trialing'
                        ? 'Trialing'
                        : subscription.subscription_status}
                    </p>
                  </div>
                {subscription.current_period_end && (
                  <div>
                    <span className="text-sm font-medium text-navy-500">
                      {subscription.cancel_at_period_end ? 'Expires:' : 'Renews:'}
                    </span>
                    <p className="text-sm text-navy-900">
                      {formatDate(subscription.current_period_end)}
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
              {!subscription || subscription.subscription_status === 'not_started' ? (
                <Link
                  to="/pricing"
                  className="btn btn-primary w-full"
                >
                  Subscribe to StageCue
                </Link>
              ) : (
                <div className="space-y-2">
                  <button className="btn btn-primary w-full">
                    Create New Timer
                  </button>
                  <button className="btn btn-outline w-full">
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