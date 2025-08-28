import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { products } from '../stripe-config';
import { Alert } from '../components/Alert';

interface Subscription {
  subscription_status: string;
  price_id: string | null;
  current_period_end: number | null;
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
        .select('subscription_status, price_id, current_period_end, cancel_at_period_end')
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
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user?.email}</p>
        </div>

        {error && (
          <Alert type="error" className="mb-8">
            {error}
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscription Status</h2>
            {subscription ? (
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Plan:</span>
                  <p className="text-lg font-semibold text-gray-900">
                    {getProductName(subscription.price_id)}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <p className={`text-sm font-medium capitalize ${
                    subscription.subscription_status === 'active' 
                      ? 'text-green-600' 
                      : subscription.subscription_status === 'not_started'
                      ? 'text-gray-600'
                      : 'text-red-600'
                  }`}>
                    {subscription.subscription_status === 'not_started' 
                      ? 'No Active Subscription' 
                      : subscription.subscription_status}
                  </p>
                </div>
                {subscription.current_period_end && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      {subscription.cancel_at_period_end ? 'Expires:' : 'Renews:'}
                    </span>
                    <p className="text-sm text-gray-900">
                      {formatDate(subscription.current_period_end)}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600">No subscription information available.</p>
            )}
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {!subscription || subscription.subscription_status === 'not_started' ? (
                <a
                  href="/pricing"
                  className="btn btn-primary w-full"
                >
                  Subscribe to StageCue
                </a>
              ) : (
                <div className="space-y-2">
                  <button className="btn btn-primary w-full">
                    Create New Event
                  </button>
                  <button className="btn btn-outline w-full">
                    Manage Sessions
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Timing Features</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">Precision Timers</h3>
              <p className="text-sm text-gray-600 mt-1">Accurate countdown and session timing</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">Multi-Session</h3>
              <p className="text-sm text-gray-600 mt-1">Manage multiple concurrent events</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">Live Events</h3>
              <p className="text-sm text-gray-600 mt-1">Perfect for conferences and meetings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}