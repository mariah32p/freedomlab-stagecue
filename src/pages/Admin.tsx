import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface TestCase {
  id: string;
  category: string;
  title: string;
  description: string;
  instructions: string[];
  verification: string[];
  expectedOutcome: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  notes?: string;
  timeEstimate: string;
}

interface SubscriptionData {
  user_id: string;
  email: string;
  subscription_status: string;
  price_id: string | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_issue_since: string | null;
  created_at: string;
}

export function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  const adminPassword = 'stagecue2025'; // Temporary password

  useEffect(() => {
    if (isAuthenticated) {
      initializeTestCases();
      fetchSubscriptions();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const initializeTestCases = () => {
    const cases: TestCase[] = [
      // CORE SUBSCRIPTION LIFECYCLE
      {
        id: 'basic-trial-success',
        category: 'Core Lifecycle',
        title: 'Basic Trial → Active Success',
        description: 'Test successful trial to active conversion for Basic plan',
        instructions: [
          '1. Create new user account with unique email',
          '2. Sign up for Basic plan (1-day trial)',
          '3. Use test card: 4242424242424242',
          '4. Wait 24+ hours for trial to expire',
          '5. Check webhook logs for subscription.updated event'
        ],
        verification: [
          'Status changes from "trialing" to "active"',
          'current_period_end updates to next month',
          'User retains dashboard access',
          'No payment issue banner appears'
        ],
        expectedOutcome: 'Subscription automatically converts to active after trial',
        status: 'pending',
        timeEstimate: '24+ hours'
      },
      {
        id: 'pro-trial-success',
        category: 'Core Lifecycle',
        title: 'Pro Trial → Active Success',
        description: 'Test successful trial to active conversion for Pro plan',
        instructions: [
          '1. Create new user account with unique email',
          '2. Sign up for Pro plan (1-day trial)',
          '3. Use test card: 4242424242424242',
          '4. Wait 24+ hours for trial to expire',
          '5. Check webhook logs for subscription.updated event'
        ],
        verification: [
          'Status changes from "trialing" to "active"',
          'current_period_end updates to next month',
          'User retains dashboard access',
          'Plan shows as "StageCue Pro"'
        ],
        expectedOutcome: 'Pro subscription automatically converts to active after trial',
        status: 'pending',
        timeEstimate: '24+ hours'
      },
      {
        id: 'trial-cancel-during',
        category: 'Core Lifecycle',
        title: 'Cancel During Trial',
        description: 'Test canceling subscription while in trial period',
        instructions: [
          '1. Create new user account with unique email',
          '2. Sign up for any plan (1-day trial)',
          '3. Go to Dashboard → Manage Subscription',
          '4. Cancel subscription in Stripe portal',
          '5. Return to dashboard immediately'
        ],
        verification: [
          'Status shows "Free Trial (Canceled)"',
          'Message: "Subscription will not renew after trial"',
          'User still has dashboard access',
          'cancel_at_period_end = true in database'
        ],
        expectedOutcome: 'User keeps access until trial ends, then loses access',
        status: 'pending',
        timeEstimate: '5 minutes + 24 hours'
      },

      // PAYMENT FAILURES
      {
        id: 'trial-payment-failure',
        category: 'Payment Failures',
        title: 'Trial → Payment Failure',
        description: 'Test payment failure when trial converts',
        instructions: [
          '1. Create new user account with unique email',
          '2. Sign up for any plan (1-day trial)',
          '3. Use declining card: 4000000000000002',
          '4. Wait 24+ hours for trial conversion attempt',
          '5. Check webhook logs for invoice.payment_failed'
        ],
        verification: [
          'Status changes to "past_due"',
          'payment_issue_since is set to current timestamp',
          'Payment issue banner appears on dashboard',
          'User still has access (grace period)'
        ],
        expectedOutcome: 'Subscription goes past_due, grace period starts',
        status: 'pending',
        timeEstimate: '24+ hours'
      },
      {
        id: 'grace-period-recovery',
        category: 'Payment Failures',
        title: 'Grace Period → Payment Recovery',
        description: 'Test successful payment after grace period starts',
        instructions: [
          '1. Use subscription from "Trial → Payment Failure" test',
          '2. Go to Dashboard → Manage Subscription',
          '3. Update payment method to valid card: 4242424242424242',
          '4. Trigger retry in Stripe dashboard',
          '5. Check webhook logs for invoice.payment_succeeded'
        ],
        verification: [
          'Status changes back to "active"',
          'payment_issue_since is cleared (null)',
          'Payment issue banner disappears',
          'current_period_end updates properly'
        ],
        expectedOutcome: 'Subscription recovers, grace period ends',
        status: 'pending',
        timeEstimate: '10 minutes'
      },
      {
        id: 'grace-period-expiry',
        category: 'Payment Failures',
        title: 'Grace Period Expiry',
        description: 'Test access loss after grace period expires',
        instructions: [
          '1. Use subscription in past_due state',
          '2. Wait 24+ hours for grace period to expire',
          '3. Try to access dashboard',
          '4. Verify redirect behavior'
        ],
        verification: [
          'User redirected from /dashboard to /get-started',
          'No dashboard access',
          'Subscription still shows past_due in database',
          'Grace period helper returns false'
        ],
        expectedOutcome: 'User loses access, must resubscribe',
        status: 'pending',
        timeEstimate: '24+ hours'
      },

      // PLAN CHANGES
      {
        id: 'upgrade-basic-to-pro',
        category: 'Plan Changes',
        title: 'Upgrade Basic → Pro (Active)',
        description: 'Test upgrading from Basic to Pro while active',
        instructions: [
          '1. Use active Basic subscription',
          '2. Create new checkout session for Pro plan',
          '3. Complete payment with 4242424242424242',
          '4. Check webhook logs for subscription updates',
          '5. Verify immediate access to Pro features'
        ],
        verification: [
          'price_id changes to Pro price ID',
          'Status remains "active"',
          'Plan shows as "StageCue Pro" in UI',
          'Proration charge appears in Stripe'
        ],
        expectedOutcome: 'Immediate upgrade with prorated charge',
        status: 'pending',
        timeEstimate: '10 minutes'
      },
      {
        id: 'downgrade-pro-to-basic',
        category: 'Plan Changes',
        title: 'Downgrade Pro → Basic',
        description: 'Test downgrading from Pro to Basic',
        instructions: [
          '1. Use active Pro subscription',
          '2. Cancel current subscription (end of period)',
          '3. Create new Basic subscription to start at period end',
          '4. Wait for period to end',
          '5. Verify transition'
        ],
        verification: [
          'Pro access continues until period end',
          'Automatic transition to Basic',
          'price_id changes to Basic price ID',
          'No service interruption'
        ],
        expectedOutcome: 'Seamless downgrade at period end',
        status: 'pending',
        timeEstimate: '24+ hours'
      },

      // CUSTOMER PORTAL ACTIONS
      {
        id: 'portal-payment-update',
        category: 'Customer Portal',
        title: 'Update Payment Method',
        description: 'Test payment method updates via customer portal',
        instructions: [
          '1. Use any active subscription',
          '2. Go to Dashboard → Manage Subscription',
          '3. Update payment method in portal',
          '4. Check webhook logs for customer.updated',
          '5. Verify new payment method stored'
        ],
        verification: [
          'payment_method_brand updates in database',
          'payment_method_last4 updates in database',
          'No status changes',
          'User sees updated payment info'
        ],
        expectedOutcome: 'Payment method updates without affecting subscription',
        status: 'pending',
        timeEstimate: '5 minutes'
      },
      {
        id: 'portal-cancel',
        category: 'Customer Portal',
        title: 'Cancel via Customer Portal',
        description: 'Test subscription cancellation through Stripe portal',
        instructions: [
          '1. Use any active subscription',
          '2. Go to Dashboard → Manage Subscription',
          '3. Cancel subscription in portal',
          '4. Check webhook logs for subscription.updated',
          '5. Return to dashboard'
        ],
        verification: [
          'cancel_at_period_end = true',
          'Status remains current until period end',
          'UI shows cancellation notice',
          'Access continues until period end'
        ],
        expectedOutcome: 'Subscription marked for cancellation at period end',
        status: 'pending',
        timeEstimate: '5 minutes'
      },

      // WEBHOOK RELIABILITY
      {
        id: 'webhook-idempotency',
        category: 'Webhook Reliability',
        title: 'Duplicate Webhook Handling',
        description: 'Test that duplicate webhooks don\'t cause issues',
        instructions: [
          '1. Create subscription normally',
          '2. In Stripe dashboard, resend webhook events',
          '3. Send same event multiple times',
          '4. Check database for duplicate entries',
          '5. Verify data integrity'
        ],
        verification: [
          'No duplicate subscription records',
          'No data corruption',
          'Idempotency keys working',
          'Database constraints prevent duplicates'
        ],
        expectedOutcome: 'System handles duplicate webhooks gracefully',
        status: 'pending',
        timeEstimate: '10 minutes'
      },

      // EDGE CASES
      {
        id: 'multiple-checkout-attempts',
        category: 'Edge Cases',
        title: 'Multiple Checkout Sessions',
        description: 'Test creating multiple checkout sessions for same user',
        instructions: [
          '1. Start checkout session for Basic plan',
          '2. Close window without completing',
          '3. Start new checkout session for Pro plan',
          '4. Complete the Pro checkout',
          '5. Verify only Pro subscription exists'
        ],
        verification: [
          'Only one active subscription per customer',
          'Latest checkout session takes precedence',
          'No orphaned subscription records',
          'Correct plan is active'
        ],
        expectedOutcome: 'Latest completed checkout wins, no conflicts',
        status: 'pending',
        timeEstimate: '10 minutes'
      },
      {
        id: 'user-profile-sync',
        category: 'Edge Cases',
        title: 'User Profile Creation',
        description: 'Test user profile creation via webhook',
        instructions: [
          '1. Create Supabase auth user manually',
          '2. Create Stripe customer with userId metadata',
          '3. Trigger subscription webhook',
          '4. Verify user profile gets created',
          '5. Check email sync between Auth and profiles'
        ],
        verification: [
          'User record created in users table',
          'Email matches between auth.users and users table',
          'Foreign key constraints work',
          'RLS policies allow access'
        ],
        expectedOutcome: 'User profile auto-created from webhook',
        status: 'pending',
        timeEstimate: '15 minutes'
      }
    ];

    setTestCases(cases);
  };

  const fetchSubscriptions = async () => {
    setRefreshing(true);
    try {
      // Get all users and their subscription data
      const { data, error } = await supabase
        .from('users')
        .select(`
          id,
          email,
          stripe_customers!inner (
            customer_id,
            stripe_subscriptions (
              subscription_status,
              price_id,
              current_period_end,
              cancel_at_period_end,
              payment_issue_since,
              created_at
            )
          )
        `);

      if (error) {
        console.error('Error fetching subscriptions:', error);
        return;
      }

      // Transform the data
      const transformedData: SubscriptionData[] = data.map(user => {
        const subscription = user.stripe_customers[0]?.stripe_subscriptions[0];
        return {
          user_id: user.id,
          email: user.email,
          subscription_status: subscription?.subscription_status || 'not_started',
          price_id: subscription?.price_id || null,
          current_period_end: subscription?.current_period_end || null,
          cancel_at_period_end: subscription?.cancel_at_period_end || false,
          payment_issue_since: subscription?.payment_issue_since || null,
          created_at: subscription?.created_at || '',
        };
      });

      setSubscriptions(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const updateTestStatus = (id: string, status: TestCase['status'], notes?: string) => {
    setTestCases(prev => prev.map(test => 
      test.id === id ? { ...test, status, notes } : test
    ));
  };

  const getStatusColor = (status: TestCase['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanName = (priceId: string | null) => {
    if (priceId === 'price_1RznJIDn6VTzl81bqsk5O1gR') return 'Basic';
    if (priceId === 'price_1RznJIDn6VTzl81bPK1TDU3Y') return 'Pro';
    return 'None';
  };

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleString();
  };

  const categories = ['all', ...Array.from(new Set(testCases.map(t => t.category)))];
  const filteredTests = selectedCategory === 'all' 
    ? testCases 
    : testCases.filter(t => t.category === selectedCategory);

  const completedTests = testCases.filter(t => t.status === 'completed').length;
  const totalTests = testCases.length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
            <p className="text-gray-600 mt-2">Enter admin password to access testing dashboard</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="input w-full mb-4"
              autoFocus
            />
            <button type="submit" className="btn btn-primary w-full">
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Stripe Testing Dashboard</h1>
              <p className="text-gray-600 mt-2">Track and verify subscription flow testing</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{completedTests}/{totalTests}</div>
              <div className="text-sm text-gray-600">Tests Completed</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Testing Progress</span>
              <span>{Math.round((completedTests / totalTests) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-teal-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedTests / totalTests) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Test Cases */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Test Cases</h2>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input w-48"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-6">
                {filteredTests.map((test) => (
                  <div key={test.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{test.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                            {test.status.replace('-', ' ').toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500">⏱️ {test.timeEstimate}</span>
                        </div>
                        <p className="text-gray-600 mb-4">{test.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">📋 Instructions</h4>
                        <ol className="space-y-1 text-sm text-gray-700">
                          {test.instructions.map((instruction, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-2">{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">✅ Verification</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {test.verification.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-gray-400 mr-2">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-900">Expected Outcome:</div>
                      <div className="text-sm text-blue-800">{test.expectedOutcome}</div>
                    </div>

                    {/* Status Controls */}
                    <div className="mt-4 flex items-center space-x-3">
                      <button
                        onClick={() => updateTestStatus(test.id, 'in-progress')}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                      >
                        Start Test
                      </button>
                      <button
                        onClick={() => updateTestStatus(test.id, 'completed')}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                      >
                        Mark Complete
                      </button>
                      <button
                        onClick={() => updateTestStatus(test.id, 'failed')}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                      >
                        Mark Failed
                      </button>
                      <button
                        onClick={() => updateTestStatus(test.id, 'pending')}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Reset
                      </button>
                    </div>

                    {test.notes && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                        <div className="text-sm font-medium text-yellow-900">Notes:</div>
                        <div className="text-sm text-yellow-800">{test.notes}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Data Panel */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Live Data</h3>
                <button
                  onClick={fetchSubscriptions}
                  disabled={refreshing}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{subscriptions.length}</div>
                  <div className="text-sm text-gray-600">Total Users</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {subscriptions.filter(s => s.subscription_status === 'active' || s.subscription_status === 'trialing').length}
                  </div>
                  <div className="text-sm text-gray-600">Active/Trial</div>
                </div>
              </div>

              {/* Status Breakdown */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Status Breakdown</h4>
                {['trialing', 'active', 'past_due', 'canceled', 'not_started'].map(status => {
                  const count = subscriptions.filter(s => s.subscription_status === status).length;
                  return (
                    <div key={status} className="flex justify-between text-sm">
                      <span className="capitalize text-gray-700">{status.replace('_', ' ')}</span>
                      <span className="font-medium text-gray-900">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Subscriptions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Subscriptions</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {subscriptions.slice(0, 10).map((sub) => (
                  <div key={sub.user_id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {sub.email}
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        sub.subscription_status === 'active' ? 'bg-green-100 text-green-800' :
                        sub.subscription_status === 'trialing' ? 'bg-blue-100 text-blue-800' :
                        sub.subscription_status === 'past_due' ? 'bg-red-100 text-red-800' :
                        sub.subscription_status === 'canceled' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {sub.subscription_status}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Plan: {getPlanName(sub.price_id)}</div>
                      {sub.current_period_end && (
                        <div>Ends: {formatDate(sub.current_period_end)}</div>
                      )}
                      {sub.cancel_at_period_end && (
                        <div className="text-red-600 font-medium">Will cancel at period end</div>
                      )}
                      {sub.payment_issue_since && (
                        <div className="text-red-600 font-medium">
                          Payment issue since: {new Date(sub.payment_issue_since).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Cards Reference */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stripe Test Cards</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-900">Success</div>
                  <div className="text-green-800 font-mono">4242424242424242</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="font-medium text-red-900">Decline</div>
                  <div className="text-red-800 font-mono">4000000000000002</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-900">Insufficient Funds</div>
                  <div className="text-yellow-800 font-mono">4000000000009995</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-900">3D Secure</div>
                  <div className="text-blue-800 font-mono">4000000000003220</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}