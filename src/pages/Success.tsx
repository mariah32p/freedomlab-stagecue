import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../components/Alert';

export function Success() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/dashboard';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
            Thank you for your purchase. Your subscription is now active.
          </p>
        </div>

        <Alert type="success">
          Redirecting to dashboard in {countdown} seconds...
        </Alert>

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