import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { supabase } from '../lib/supabase';

export function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await supabase
        .from('stripe_user_subscriptions')
        .select('subscription_status')
        .maybeSingle();

      if (data?.subscription_status === 'trialing' || data?.subscription_status === 'active') {
        clearInterval(interval);
        navigate('/dashboard');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Payment Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Finalizing your subscription...
          </p>
        </div>

        <Alert type="success">This may take a few seconds.</Alert>

        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="btn btn-primary w-full py-3"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/"
            className="btn btn-outline w-full py-3"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
