import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';

export function Navbar() {
  const { user, signOut } = useAuth();
  const subscriptionStatus = useSubscriptionStatus();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleStartTrial = () => {
    navigate('/signup');
  };

  // Check if user has an active subscription or is in trial
  const hasActiveSubscription = subscriptionStatus.status === 'trialing' || 
    subscriptionStatus.status === 'active' || 
    (subscriptionStatus.status === 'past_due' && subscriptionStatus.paymentIssueSince);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900">StageCue</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {hasActiveSubscription && (
                  <Link to="/dashboard" className="text-slate-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Dashboard
                  </Link>
                )}
                <Link to="/settings" className="text-slate-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-slate-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Login
                </Link>
                <button
                  onClick={handleStartTrial}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  Start Free Trial
                </button>
              </>
            )}
          </div>

          {/* Mobile CTA Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Hamburger Menu - Mobile Only */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {!user && (
              <button
                onClick={handleStartTrial}
                className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
              >
                Start Trial
              </button>
            )}
            {user && hasActiveSubscription && (
              <Link to="/dashboard" className="text-slate-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  {hasActiveSubscription && (
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  {hasActiveSubscription && (
                    <Link
                      to="/settings"
                      className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <div className="px-3 py-2">
                    <button
                      onClick={() => {
                        handleStartTrial();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md text-base font-semibold transition-colors shadow-sm"
                      style={{ minHeight: '44px', margin: '0 16px' }}
                    >
                      Start Free Trial
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}