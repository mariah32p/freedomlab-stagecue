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
    // Don't redirect while still loading
    if (authLoading || subscriptionStatus.loading) {
      return;
    }

    // Allow certain public routes without authentication
    const publicRoutes = ['/login', '/signup', '/reset-password', '/pricing', '/'];
    if (publicRoutes.includes(location.pathname)) {
      return;
    }

    // If not signed in → send to /signup
    if (!user) {
      navigate('/signup');
      return;
    }

    // If user is signed in, apply subscription-based routing
    const { status, paymentIssueSince } = subscriptionStatus;

    // If status is trialing or active → allow access to /dashboard
    if (status === 'trialing' || status === 'active') {
      if (location.pathname === '/get-started') {
        navigate('/dashboard');
      }
      return;
    }

    // If past_due and within 30-day grace period → allow /dashboard but show banner
    if (status === 'past_due' && isInGracePeriod(paymentIssueSince)) {
      if (location.pathname === '/get-started') {
        navigate('/dashboard');
      }
      return;
    }

    // Otherwise → send to /get-started
    if (location.pathname !== '/get-started') {
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