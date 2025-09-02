import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface TestState {
  status: string;
  plan: 'basic' | 'pro';
  cancelAtPeriodEnd: boolean;
  paymentIssueSince: string | null;
  currentPeriodEnd: number;
}

export function StripeTestPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const testStates: { name: string; state: TestState }[] = [
    {
      name: 'Active Basic',
      state: {
        status: 'active',
        plan: 'basic',
        cancelAtPeriodEnd: false,
        paymentIssueSince: null,
        currentPeriodEnd: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days from now
      }
    },
    {
      name: 'Active Pro',
      state: {
        status: 'active',
        plan: 'pro',
        cancelAtPeriodEnd: false,
        paymentIssueSince: null,
        currentPeriodEnd: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
      }
    },
    {
      name: 'Trial Basic',
      state: {
        status: 'trialing',
        plan: 'basic',
        cancelAtPeriodEnd: false,
        paymentIssueSince: null,
        currentPeriodEnd: Math.floor(Date.now() / 1000) + (5 * 24 * 60 * 60), // 5 days from now
      }
    },
    {
      name: 'Trial Pro (Canceled)',
      state: {
        status: 'trialing',
        plan: 'pro',
        cancelAtPeriodEnd: true,
        paymentIssueSince: null,
        currentPeriodEnd: Math.floor(Date.now() / 1000) + (3 * 24 * 60 * 60), // 3 days from now
      }
    },
    {
      name: 'Past Due (Grace Period)',
      state: {
        status: 'past_due',
        plan: 'pro',
        cancelAtPeriodEnd: false,
        paymentIssueSince: new Date(Date.now() - (5 * 24 * 60 * 60 * 1000)).toISOString(), // 5 days ago
        currentPeriodEnd: Math.floor(Date.now() / 1000) - (5 * 24 * 60 * 60), // 5 days ago
      }
    },
    {
      name: 'Past Due (Expired Grace)',
      state: {
        status: 'past_due',
        plan: 'basic',
        cancelAtPeriodEnd: false,
        paymentIssueSince: new Date(Date.now() - (35 * 24 * 60 * 60 * 1000)).toISOString(), // 35 days ago
        currentPeriodEnd: Math.floor(Date.now() / 1000) - (35 * 24 * 60 * 60),
      }
    },
    {
      name: 'Canceled',
      state: {
        status: 'canceled',
        plan: 'pro',
        cancelAtPeriodEnd: true,
        paymentIssueSince: null,
        currentPeriodEnd: Math.floor(Date.now() / 1000) - (1 * 24 * 60 * 60), // 1 day ago
      }
    },
    {
      name: 'No Subscription',
      state: {
        status: 'not_started',
        plan: 'basic',
        cancelAtPeriodEnd: false,
        paymentIssueSince: null,
        currentPeriodEnd: 0,
      }
    }
  ];

  const applyTestState = async (state: TestState) => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Get the price_id based on plan
      const priceId = state.plan === 'basic' 
        ? 'price_1RznJIDn6VTzl81bqsk5O1gR' 
        : 'price_1RznJIDn6VTzl81bPK1TDU3Y';

      // First ensure customer exists
      const { error: customerError } = await supabase
        .from('stripe_customers')
        .upsert({
          user_id: user.id,
          customer_id: `test_customer_${user.id}`,
        }, { onConflict: 'user_id' });

      if (customerError) {
        console.error('Error creating test customer:', customerError);
        return;
      }

      // Update subscription state
      const { error: subscriptionError } = await supabase
        .from('stripe_subscriptions')
        .upsert({
          customer_id: `test_customer_${user.id}`,
          subscription_id: state.status === 'not_started' ? null : `test_sub_${Date.now()}`,
          price_id: state.status === 'not_started' ? null : priceId,
          current_period_start: state.status === 'not_started' ? null : Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60),
          current_period_end: state.status === 'not_started' ? null : state.currentPeriodEnd,
          cancel_at_period_end: state.cancelAtPeriodEnd,
          payment_issue_since: state.paymentIssueSince,
          status: state.status,
        }, { onConflict: 'customer_id' });

      if (subscriptionError) {
        console.error('Error updating test subscription:', subscriptionError);
        return;
      }

      // Refresh the page to see changes
      window.location.reload();
    } catch (error) {
      console.error('Error applying test state:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetToReal = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Delete test data
      await supabase
        .from('stripe_subscriptions')
        .delete()
        .eq('customer_id', `test_customer_${user.id}`);
      
      await supabase
        .from('stripe_customers')
        .delete()
        .eq('customer_id', `test_customer_${user.id}`);

      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error('Error resetting test data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        title="Stripe Test Panel"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </button>

      {/* Test Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Stripe Test Panel</h3>
            <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">DEV ONLY</div>
          </div>
          
          <div className="space-y-2 mb-4">
            {testStates.map((test, index) => (
              <button
                key={index}
                onClick={() => applyTestState(test.state)}
                disabled={loading}
                className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors text-sm"
              >
                <div className="font-medium text-slate-900">{test.name}</div>
                <div className="text-xs text-slate-600 mt-1">
                  {test.state.status} • {test.state.plan} • {test.state.cancelAtPeriodEnd ? 'canceled' : 'active'}
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4">
            <button
              onClick={resetToReal}
              disabled={loading}
              className="w-full p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg border border-red-200 transition-colors text-sm font-medium"
            >
              {loading ? 'Resetting...' : 'Reset to Real Data'}
            </button>
          </div>

          <div className="mt-3 text-xs text-slate-500">
            This panel creates test data to simulate different subscription states. Use "Reset to Real Data" to return to actual Stripe data.
          </div>
        </div>
      )}
    </div>
  );
}