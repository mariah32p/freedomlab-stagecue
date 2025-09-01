import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from '../components/Alert';
import { PasswordInput } from '../components/PasswordInput';

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

  const handleSubmit = async (e: FormEvent) => {
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

  const handleForgotPassword = async (e: FormEvent) => {
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
      setShowForgotPassword(false);
    }

    setResetLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-center text-3xl font-bold text-slate-900">
            {showForgotPassword ? 'Reset your password' : 'Welcome back'}
          </h2>
          <p className="mt-3 text-center text-slate-600">
            {showForgotPassword ? (
              'Enter your email to receive reset instructions'
            ) : (
              <>
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-teal-600 hover:text-teal-500">
                  Sign up
                </Link>
              </>
            )}
          </p>
        </div>
        
        <div className="mt-10 bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <form className="space-y-6" onSubmit={showForgotPassword ? handleForgotPassword : handleSubmit}>
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
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {!showForgotPassword && (
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
                <PasswordInput
                id="password"
                name="password"
                autoComplete="current-password"
                required
                className="input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={showForgotPassword ? resetLoading : loading}
              className="btn btn-primary w-full py-3 text-base font-semibold"
            >
              {showForgotPassword 
                ? (resetLoading ? 'Sending reset email...' : 'Send Reset Email')
                : (loading ? 'Signing in...' : 'Sign in')
              }
            </button>
          </div>

          <div className="text-center pt-4 border-t border-slate-200">
            {!showForgotPassword ? (
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-teal-600 hover:text-teal-500 font-semibold transition-colors"
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
                className="text-sm text-slate-600 hover:text-slate-500 font-semibold transition-colors"
              >
                ← Back to sign in
              </button>
            )}
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}