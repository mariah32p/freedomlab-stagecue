import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { products } from '../stripe-config';
import { Alert } from '../components/Alert';

export function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const { user, session } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async (priceId: string, mode: 'payment' | 'subscription') => {
    if (!user || !session) {
      navigate('/login');
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Professional event timing system for all your needs
          </p>
        </div>

        {error && (
          <div className="mt-8 max-w-md mx-auto">
            <Alert type="error">
              {error}
            </Alert>
          </div>
        )}

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-5xl lg:mx-auto">
          {products.map((product) => (
            <div key={product.id} className={`card relative ${product.name === 'StageCue Pro' ? 'ring-2 ring-primary-500' : ''}`}>
              {product.name === 'StageCue Pro' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-3 py-1 text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-4 text-gray-600">{product.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                  {product.mode === 'subscription' && (
                    <span className="text-base font-medium text-gray-500">/month</span>
                  )}
                </div>
                <button
                  onClick={() => handleCheckout(product.priceId, product.mode)}
                  disabled={loading === product.priceId}
                  className="mt-8 btn btn-primary w-full py-3"
                >
                  {loading === product.priceId ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Get ${product.name}`
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            All plans include professional event timing features and multi-session management.
          </p>
        </div>
      </div>
  );
}