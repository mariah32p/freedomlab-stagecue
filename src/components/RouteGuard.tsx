import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import { isInGracePeriod } from '../utils/graceHelper';

interface RouteGuardProps {
  children: ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const { user, loading: authLoading } = useAuth();
  const subscriptionStatus = useSubscriptionStatus();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't navigate while still loading
    if (authLoading || subscriptionStatus.loading) {
      return;
    }
       // Handle password reset redirects - check for reset token in URL
    // This works regardless of which page the user initially lands on
    if (window.location.hash && window.location.hash.includes('type=recovery')) {
      // Only redirect if not already on reset-password page
      if (location.pathname !== '/reset-password') {
        navigate('/reset-password' + window.location.hash);
      }
      return;
    }

    // Don't interfere with Supabase auth redirects (they contain # fragments)
    if (window.location.hash && window.location.hash.includes('access_token')) {
      return;
    }


    // If not signed in → send to /signup
    if (!user) {
      // Allow certain public routes without authentication
      const publicRoutes = ['/login', '/signup', '/pricing', '/', '/demo'];
      if (publicRoutes.includes(location.pathname)) {
        return;
      }
      navigate('/signup');
      return;
    }

    // Special handling for password reset - allow access even when authenticated
    if (location.pathname === '/reset-password') {
      return;
    }

    // If signed in and on landing page → redirect to dashboard
    if (location.pathname === '/') {
      navigate('/dashboard');
      return;
    }

    // If user is signed in, apply subscription-based routing
    const { status, paymentIssueSince } = subscriptionStatus;

    // If status is trialing or active → allow access to /dashboard and /settings
    if (status === 'trialing' || status === 'active') {
      if (location.pathname === '/get-started') {
        navigate('/dashboard');
      }
      return;
    }

    // If past_due and within 30-day grace period → allow /dashboard and /settings but show banner
    if (status === 'past_due' && isInGracePeriod(paymentIssueSince)) {
      if (location.pathname === '/get-started') {
        navigate('/dashboard');
      }
      return;
    }

    // For canceled, incomplete, or no subscription → send to /get-started
    // Allow access to /settings even without subscription for account management
    // Don't redirect from dashboard/settings on initial load to prevent flashing
    const protectedRoutes = ['/dashboard', '/settings'];
    const isOnProtectedRoute = protectedRoutes.includes(location.pathname);
    
    if (!isOnProtectedRoute && location.pathname !== '/get-started') {
      navigate('/get-started');
    }
  }, [user, authLoading, subscriptionStatus, navigate, location.pathname]);

  // Show loading while determining route
  if (authLoading || subscriptionStatus.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}