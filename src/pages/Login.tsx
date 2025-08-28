import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from '../components/Alert';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check if there's a success message from password reset
  const resetMessage = searchParams.get('message');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }

    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setResetLoading(true);
    setError('');

    const { error } = await resetPassword(email);

    if (error) {
      setError(error.message);
    } else {
      setResetSuccess(true);
    }

    setResetLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-500">
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={showForgotPassword ? handleForgotPassword : handleSubmit}>
          {resetMessage && (
            <Alert type="success">
              {resetMessage}
            </Alert>
          )}
          {error && (
            <Alert type="error">
              {error}
            </Alert>
          )}
          {resetSuccess && (
            <Alert type="success">
              Password reset email sent! Check your inbox for further instructions.
            </Alert>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input mt-1"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {!showForgotPassword && (
              <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input mt-1"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={showForgotPassword ? resetLoading : loading}
              className="btn btn-primary w-full py-3"
            >
              {showForgotPassword 
                ? (resetLoading ? 'Sending reset email...' : 'Send Reset Email')
                : (loading ? 'Signing in...' : 'Sign in')
              }
            </button>
          </div>

          <div className="text-center space-y-2">
            {!showForgotPassword ? (
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-teal-600 hover:text-teal-500 font-medium"
              >
                Forgot your password?
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setError('');
                  setResetSuccess(false);
                }}
                className="text-sm text-gray-600 hover:text-gray-500 font-medium"
              >
                Back to sign in
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}