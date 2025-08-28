import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignUpModal } from '../components/SignUpModal';

export function Home() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [defaultPlan, setDefaultPlan] = useState<'basic' | 'pro'>('basic');

  const handleGetStarted = (plan: 'basic' | 'pro') => {
    setDefaultPlan(plan);
    setShowSignUpModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6">
            Professional Event Timing
          </h1>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
            Keep your conferences, workshops, and live events on schedule with our powerful timing system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleGetStarted('basic')}
              className="btn btn-primary px-8 py-4 text-lg"
            >
              Start Free Trial
            </button>
            <Link
              to="/pricing"
              className="btn px-8 py-4 text-lg border-2 border-navy-700 text-navy-700 bg-white hover:bg-navy-700 hover:text-white transition-all duration-200"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      <SignUpModal 
        isOpen={showSignUpModal} 
        onClose={() => setShowSignUpModal(false)}
        defaultPlan={defaultPlan}
      />
    </div>
  );
}