import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../stripe-config';
import { Alert } from '../components/Alert';
import { SignUpModal } from '../components/SignUpModal';

export function Pricing() {
  const [error, setError] = useState('');
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [defaultPlan, setDefaultPlan] = useState<'basic' | 'pro'>('basic');
  const { user, session } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async (priceId: string, mode: 'payment' | 'subscription') => {
    if (!user || !session) {
      // If not logged in, show sign up modal with the selected plan
      const plan = priceId === products[0].priceId ? 'basic' : 'pro';
      setDefaultPlan(plan);
      setShowSignUpModal(true);
      return;
    }

    setLoading(priceId);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: priceId,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/pricing`,
          mode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(null);
    }
  };

  const basicFeatures = [
    'Up to 10 active timers',
    'Timer controls via web dashboard',
    'Speaker notes management',
    'Basic Slack notifications',
    'Save/reuse timer configurations',
    '7-day free trial'
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
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            Professional event timing system for conferences, workshops, and live events
          </p>
        </div>

        {error && (
          <div className="mb-8 max-w-md mx-auto">
            <Alert type="error">
              {error}
            </Alert>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="card relative">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-navy-900 mb-2">StageCue Basic</h3>
              <p className="text-navy-600 mb-6">Perfect for small events, workshops, team meetings</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-navy-900">$29</span>
                <span className="text-lg font-medium text-navy-500">/month</span>
              </div>
              <button
                onClick={() => handleGetStarted('basic')}
                disabled={loading === products[0].priceId}
                className="btn w-full py-3 border-2 border-navy-700 text-navy-700 bg-white hover:bg-navy-700 hover:text-white transition-all duration-200"
              >
                Start Free Trial
              </button>
            </div>
            <div className="space-y-4">
              {basicFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-navy-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan */}
          <div className="card relative ring-2 ring-purple-500 bg-gradient-to-br from-white to-purple-50">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-purple-600 text-white px-4 py-2 text-sm font-bold rounded-full shadow-lg">
                MOST POPULAR
              </span>
            </div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-navy-900 mb-2">StageCue Pro</h3>
              <p className="text-navy-600 mb-6">Perfect for conferences and larger events</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-navy-900">$49</span>
                <span className="text-lg font-medium text-navy-500">/month</span>
              </div>
              <button
                onClick={() => handleGetStarted('pro')}
                disabled={loading === products[1].priceId}
                className="btn btn-primary w-full py-3 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 text-white"
              >
                Get Pro Plan
              </button>
            </div>
            <div className="space-y-4">
              {proFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className={`${feature.startsWith('Everything') ? 'font-semibold text-navy-900' : 'text-navy-700'}`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-navy-200">
            <h3 className="text-2xl font-bold text-navy-900 mb-6">All Plans Include</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-navy-900 mb-2">Secure & Reliable</h4>
                <p className="text-sm text-navy-600">Enterprise-grade security and 99.9% uptime</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-navy-900 mb-2">24/7 Support</h4>
                <p className="text-sm text-navy-600">Get help when you need it most</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h4 className="font-semibold text-navy-900 mb-2">No Setup Required</h4>
                <p className="text-sm text-navy-600">Start timing events in minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      <SignUpModal 
        isOpen={showSignUpModal} 
        onClose={() => setShowSignUpModal(false)}
        defaultPlan={defaultPlan}
      />
    </div>
  );
}