import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { products } from '../stripe-config';
import { Alert } from './Alert';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan: 'basic' | 'pro';
}

export function SignUpModal({ isOpen, onClose, defaultPlan }: SignUpModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro'>(defaultPlan);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First, sign up the user
      const { error: signUpError } = await signUp(email, password);

      if (signUpError) {
        throw signUpError;
      }

      // Get the selected product
      const selectedProduct = products.find(p => 
        selectedPlan === 'basic' ? p.name === 'StageCue Basic' : p.name === 'StageCue Pro'
      );

      if (!selectedProduct) {
        throw new Error('Selected plan not found');
      }

      // Create Stripe checkout session
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          price_id: selectedProduct.priceId,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/`,
          mode: selectedProduct.mode,
          trial_period_days: 7,
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
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-navy-900">Get Started with StageCue</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <Alert type="error" className="mb-6">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Plan Selection */}
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-3">Choose Your Plan</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPlan('basic')}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedPlan === 'basic'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-navy-900">Basic</div>
                  <div className="text-sm text-navy-600">$29/month</div>
                  <div className="text-xs text-navy-500 mt-1">7-day free trial</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlan('pro')}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedPlan === 'pro'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-navy-900">Pro</div>
                  <div className="text-sm text-navy-600">$49/month</div>
                  <div className="text-xs text-navy-500 mt-1">7-day free trial</div>
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="modal-email" className="block text-sm font-medium text-navy-700 mb-2">
                Email address
              </label>
              <input
                id="modal-email"
                type="email"
                required
                className="input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="modal-password" className="block text-sm font-medium text-navy-700 mb-2">
                Password
              </label>
              <input
                id="modal-password"
                type="password"
                required
                className="input"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                `Start ${selectedPlan === 'basic' ? 'Basic' : 'Pro'} Trial`
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-navy-600">
              Already have an account?{' '}
              <button
                onClick={onClose}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Sign in instead
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
</parameter>