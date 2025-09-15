import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { products } from '../stripe-config';
import { Alert } from '../components/Alert';

export function GetStarted() {
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'pro'>('standard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, session } = useAuth();

  const handleStartTrial = async () => {
    if (!user || !session) {
      setError('Please sign in to continue');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get the selected product
      const selectedProduct = products.find(p =>
        selectedPlan === 'standard' ? p.name === 'StageCue Standard' : p.name === 'StageCue Pro'
      );

      if (!selectedProduct) {
        throw new Error('Selected plan not found');
      }

      // Create Stripe checkout session with trial
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: selectedProduct.priceId,
          success_url: `${window.location.origin}/dashboard`,
          cancel_url: `${window.location.origin}/get-started`,
          mode: selectedProduct.mode,
          trial_period_days: 7, // 7-day trial period
        }),
      });

      const data = await response.json();

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

  const standardPlan = products.find(p => p.name === 'StageCue Standard')!;
  const proPlan = products.find(p => p.name === 'StageCue Pro')!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Start your 7-day free trial and experience professional event timing
          </p>
        </div>

        {error && (
          <div className="mb-8">
            <Alert type="error">{error}</Alert>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {/* Standard Plan */}
          <div
            className={`bg-white rounded-2xl p-8 shadow-lg border-2 cursor-pointer transition-all duration-300 ${
              selectedPlan === 'standard'
                ? 'border-teal-500 bg-teal-50/50 shadow-xl'
                : 'border-slate-200 hover:border-slate-300 hover:shadow-xl'
            }`}
            onClick={() => setSelectedPlan('standard')}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">StageCue Standard</h3>
                <p className="text-slate-600 mt-1">Professional event timing for all your needs</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedPlan === 'standard'
                  ? 'border-teal-500 bg-teal-500'
                  : 'border-slate-300'
              }`}>
                {selectedPlan === 'standard' && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-slate-900">${standardPlan.price}</span>
              <span className="text-lg font-medium text-slate-500">/month</span>
              <div className="text-sm text-teal-600 font-medium mt-1">7-day free trial</div>
            </div>

            <div className="space-y-3">
              {standardPlan.features.map((feature, index) => (
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

          {/* Pro Plan - Coming Soon */}
          <div
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-slate-300 transition-all duration-300 relative opacity-75 cursor-not-allowed"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-slate-600 text-white px-4 py-2 text-sm font-bold rounded-full shadow-lg">
                COMING SOON
              </span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">StageCue Pro</h3>
                <p className="text-slate-600 mt-1">Advanced features for enterprise organizations</p>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center">
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-slate-500">${proPlan.price}</span>
              <span className="text-lg font-medium text-slate-500">/month</span>
              <div className="text-sm text-slate-500 font-medium mt-1">7-day free trial</div>
            </div>

            <div className="space-y-3">
              {proPlan.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className={`${feature.startsWith('Everything') ? 'font-semibold text-slate-500' : 'text-slate-500'}`}>
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
            className="btn px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 text-white"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating checkout session...
              </div>
            ) : (
              `Start ${selectedPlan === 'standard' ? 'Standard' : 'Pro'} Trial (7 days free)`
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