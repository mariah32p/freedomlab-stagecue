import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { products } from '../stripe-config';
import { Alert } from '../components/Alert';

export function GetStarted() {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro'>('basic');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, session } = useAuth();

  const handleStartTrial = async () => {
    if (!user || !session) {
      setError('Please sign in to continue');
      return;
    }

    // Debug logging
    console.log('User:', user?.id);
    console.log('Session exists:', !!session);
    console.log('Access token exists:', !!session?.access_token);

    setLoading(true);
    setError('');

    try {
      // Get the selected product
      const selectedProduct = products.find(p =>
        selectedPlan === 'basic' ? p.name === 'StageCue Basic' : p.name === 'StageCue Pro'
      );

      if (!selectedProduct) {
        throw new Error('Selected plan not found');
      }

      console.log('Making request to:', `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`);
      console.log('Authorization header:', `Bearer ${session.access_token?.substring(0, 20)}...`);

      // Create Stripe checkout session with trial
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: selectedProduct.priceId,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/get-started`,
          mode: selectedProduct.mode,
          trial_period_days: 7,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (err: unknown) {
      console.error('Checkout error:', err);
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const basicFeatures = [
    'Up to 10 active timers',
    'Timer controls via web dashboard',
    'Speaker notes management',
    'Basic Slack notifications',
    'Save/reuse timer configurations'
  ];

  const proFeatures = [
    'Everything in Basic, plus:',
    'Unlimited active timers',
    'Custom moderator links',
    'Speaker self-service links',
    'Advanced Slack notifications',
    'Timer + speaker templates'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* FIX: Added an opening h1 tag with content */}
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Start your 7-day free trial and experience professional event timing
          </p>
        </div>

        {error && (
          <div className="mb-8">
            {/* FIX: Simplified the Alert component to just show the error message */}
            <Alert type="error">{error}</Alert>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Basic Plan */}
          <div
            className={`bg-white rounded-2xl p-8 shadow-lg border-2 cursor-pointer transition-all duration-300 ${
              selectedPlan === 'basic'
                ? 'border-teal-500 bg-teal-50/50 shadow-xl'
                : 'border-slate-200 hover:border-slate-300 hover:shadow-xl'
            }`}
            onClick={() => setSelectedPlan('basic')}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">StageCue Basic</h3>
                <p className="text-slate-600 mt-1">Perfect for small events and workshops</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedPlan === 'basic'
                  ? 'border-teal-500 bg-teal-500'
                  : 'border-slate-300'
              }`}>
                {selectedPlan === 'basic' && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-slate-900">$29</span>
              <span className="text-lg font-medium text-slate-500">/month</span>
              <div className="text-sm text-teal-600 font-medium mt-1">7-day free trial</div>
            </div>

            <div className="space-y-3">
              {basicFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan */}
          <div
            className={`bg-white rounded-2xl p-8 shadow-lg border-2 cursor-pointer transition-all duration-300 relative ${
              selectedPlan === 'pro'
                ? 'border-purple-500 bg-purple-50/50 shadow-xl'
                : 'border-slate-200 hover:border-slate-300 hover:shadow-xl'
            }`}
            onClick={() => setSelectedPlan('pro')}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-purple-600 text-white px-4 py-2 text-sm font-bold rounded-full shadow-lg">
                MOST POPULAR
              </span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">StageCue Pro</h3>
                <p className="text-slate-600 mt-1">Perfect for conferences and larger events</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedPlan === 'pro'
                  ? 'border-purple-500 bg-purple-500'
                  : 'border-slate-300'
              }`}>
                {selectedPlan === 'pro' && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-slate-900">$49</span>
              <span className="text-lg font-medium text-slate-500">/month</span>
              <div className="text-sm text-purple-600 font-medium mt-1">7-day free trial</div>
            </div>

            <div className="space-y-3">
              {proFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className={`${feature.startsWith('Everything') ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Start Trial Button */}
        <div className="text-center">
          <button
            onClick={handleStartTrial}
            disabled={loading}
            className={`btn px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${
              selectedPlan === 'basic'
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating checkout session...
              </div>
            ) : (
              `Start ${selectedPlan === 'basic' ? 'Basic' : 'Pro'} Trial (7 days free)`
            )}
          </button>
          <p className="text-sm text-slate-600 mt-4">
            No charge for 7 days • Cancel anytime • Full access during trial
          </p>
        </div>
      </div>
    </div>
  );
}