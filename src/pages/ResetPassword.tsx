import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Alert } from '../components/Alert';

export function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Debug the full URL
    console.log('Full URL:', window.location.href);
    console.log('Hash:', window.location.hash);
    console.log('Search params:', window.location.search);
    
    // Parse URL fragments for password reset tokens
    const parseHashParams = () => {
      const hash = window.location.hash;
      console.log('Raw hash:', hash);
      if (!hash) return {};
      
      const params: Record<string, string> = {};
      const hashString = hash.substring(1); // Remove the #
      console.log('Hash string after removing #:', hashString);
      const pairs = hashString.split('&');
      console.log('Hash pairs:', pairs);
      
      pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        if (key && value) {
          params[decodeURIComponent(key)] = decodeURIComponent(value);
        }
      });
      
      return params;
    };

    const hashParams = parseHashParams();
    const accessToken = hashParams.access_token;
    const refreshToken = hashParams.refresh_token;
    const type = hashParams.type;

    console.log('Hash params:', hashParams); // Debug log
    console.log('Access token:', accessToken); // Debug log
    console.log('Type:', type); // Debug log

    if (type === 'recovery' && accessToken && refreshToken) {
      console.log('Setting session for password reset'); // Debug log
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      }).then(({ error }) => {
        if (error) {
          console.error('Error setting session:', error);
          setError('Failed to authenticate reset link. Please try again.');
        } else {
          console.log('Session set successfully');
        }
      });
    } else {
      console.log('Missing required parameters for password reset');
      if (!type || type !== 'recovery') {
        setError('Invalid reset link type. Please request a new password reset.');
      } else if (!accessToken || !refreshToken) {
        setError('Missing authentication tokens. Please request a new password reset.');
      }
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password below
          </p>
        </div>
        
        {success ? (
          <div className="mt-8 space-y-6">
            <Alert type="success">
              Password updated successfully!
            </Alert>
            <button
              onClick={() =>
                navigate('/login?message=Password updated successfully! Please sign in with your new password.')
              }
              className="btn btn-primary w-full py-3"
            >
              Go to sign in
            </button>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <Alert type="error">
                {error}
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input mt-1"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="input mt-1"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full py-3"
              >
                {loading ? 'Updating password...' : 'Update password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}