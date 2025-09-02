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
  riskLevel: 'low' | 'medium' | 'high';
  cost: string;
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

  const adminPassword = 'stagecue2025';

  useEffect(() => {
    if (isAuthenticated) {
      initializeTestCases();
      fetchSubscriptions();
      // Auto-refresh every 30 seconds to catch webhook updates
      const interval = setInterval(fetchSubscriptions, 30000);
      return () => clearInterval(interval);
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
      // CRITICAL PATH TESTS (Do these first)
      {
        id: 'basic-trial-success',
        category: 'Critical Path',
        title: '🎯 Basic Trial → Active (SUCCESS)',
        description: 'Test successful trial to active conversion for Basic plan',
        instructions: [
          '1. Create new user account with unique email (test1@example.com)',
          '2. Sign up for Basic plan (1-day trial)',
          '3. Use REAL CARD: Your actual credit card',
          '4. Complete checkout successfully',
          '5. Wait 24+ hours for trial to expire',
          '6. Check webhook logs in Supabase for subscription.updated event',
          '7. IMMEDIATELY CANCEL after verification to avoid charges'
        ],
        verification: [
          'Status changes from "trialing" to "active"',
          'current_period_end updates to next month',
          'User retains dashboard access',
          'No payment issue banner appears',
          'Webhook received: customer.subscription.updated'
        ],
        expectedOutcome: 'Subscription automatically converts to active after trial',
        status: 'pending',
        timeEstimate: '24+ hours',
        riskLevel: 'medium',
        cost: '$29 (cancel immediately)'
      },
      {
        id: 'pro-trial-success',
        category: 'Critical Path',
        title: '🎯 Pro Trial → Active (SUCCESS)',
        description: 'Test successful trial to active conversion for Pro plan',
        instructions: [
          '1. Create new user account with unique email (test2@example.com)',
          '2. Sign up for Pro plan (1-day trial)',
          '3. Use REAL CARD: Your actual credit card',
          '4. Complete checkout successfully',
          '5. Wait 24+ hours for trial to expire',
          '6. Check webhook logs for subscription.updated event',
          '7. IMMEDIATELY CANCEL after verification to avoid charges'
        ],
        verification: [
          'Status changes from "trialing" to "active"',
          'current_period_end updates to next month',
          'Plan shows as "StageCue Pro"',
          'User retains dashboard access',
          'Webhook received: customer.subscription.updated'
        ],
        expectedOutcome: 'Pro subscription automatically converts to active after trial',
        status: 'pending',
        timeEstimate: '24+ hours',
        riskLevel: 'medium',
        cost: '$49 (cancel immediately)'
      },

      // PAYMENT FAILURE TESTS
      {
        id: 'trial-payment-failure',
        category: 'Payment Failures',
        title: '💳 Trial → Payment Failure → Grace Period',
        description: 'Test payment failure when trial converts using insufficient funds card',
        instructions: [
          '1. Create new user account (test3@example.com)',
          '2. Sign up for Basic plan (1-day trial)',
          '3. Use REAL CARD initially to start trial',
          '4. BEFORE trial expires: Go to Stripe dashboard',
          '5. Update customer payment method to insufficient funds card: 4000000000009995',
          '6. Wait 24+ hours for trial conversion attempt',
          '7. Check webhook logs for invoice.payment_failed',
          '8. Verify grace period starts'
        ],
        verification: [
          'Status changes to "past_due"',
          'payment_issue_since is set to current timestamp',
          'Payment issue banner appears on dashboard',
          'User still has access (grace period)',
          'Webhook received: invoice.payment_failed'
        ],
        expectedOutcome: 'Subscription goes past_due, 1-day grace period starts',
        status: 'pending',
        timeEstimate: '24+ hours',
        riskLevel: 'low',
        cost: '$0 (payment fails)'
      },
      {
        id: 'grace-period-recovery',
        category: 'Payment Failures',
        title: '🔄 Grace Period → Payment Recovery',
        description: 'Test successful payment after grace period starts',
        instructions: [
          '1. Use subscription from "Trial → Payment Failure" test',
          '2. Go to Dashboard → Manage Subscription',
          '3. Update payment method to valid card in Stripe portal',
          '4. In Stripe dashboard, manually retry the failed invoice',
          '5. Check webhook logs for invoice.payment_succeeded',
          '6. IMMEDIATELY CANCEL to avoid ongoing charges'
        ],
        verification: [
          'Status changes back to "active"',
          'payment_issue_since is cleared (null)',
          'Payment issue banner disappears',
          'current_period_end updates properly',
          'Webhook received: invoice.payment_succeeded'
        ],
        expectedOutcome: 'Subscription recovers, grace period ends',
        status: 'pending',
        timeEstimate: '10 minutes',
        riskLevel: 'medium',
        cost: '$29 or $49 (cancel immediately)'
      },
      {
        id: 'grace-period-expiry',
        category: 'Payment Failures',
        title: '⏰ Grace Period Expiry → Access Loss',
        description: 'Test access loss after 1-day grace period expires',
        instructions: [
          '1. Use subscription in past_due state from previous test',
          '2. DO NOT fix payment method',
          '3. Wait 24+ hours for grace period to expire',
          '4. Try to access /dashboard',
          '5. Verify redirect behavior'
        ],
        verification: [
          'User redirected from /dashboard to /get-started',
          'No dashboard access',
          'Subscription still shows past_due in database',
          'Grace period helper returns false',
          'Payment banner no longer shows'
        ],
        expectedOutcome: 'User loses access, must resubscribe',
        status: 'pending',
        timeEstimate: '24+ hours',
        riskLevel: 'low',
        cost: '$0'
      },

      // PLAN CHANGES (EXPENSIVE - DO LAST)
      {
        id: 'upgrade-basic-to-pro',
        category: 'Plan Changes',
        title: '⬆️ Upgrade Basic → Pro (Active)',
        description: 'Test upgrading from Basic to Pro while active',
        instructions: [
          '1. Use active Basic subscription from successful trial test',
          '2. Create new checkout session for Pro plan',
          '3. Complete payment with real card',
          '4. Check webhook logs for subscription updates',
          '5. Verify immediate access to Pro features',
          '6. IMMEDIATELY CANCEL both subscriptions'
        ],
        verification: [
          'price_id changes to Pro price ID',
          'Status remains "active"',
          'Plan shows as "StageCue Pro" in UI',
          'Proration charge appears in Stripe',
          'Old Basic subscription canceled'
        ],
        expectedOutcome: 'Immediate upgrade with prorated charge',
        status: 'pending',
        timeEstimate: '10 minutes',
        riskLevel: 'high',
        cost: '$49 + proration (cancel immediately)'
      },

      // CUSTOMER PORTAL TESTS
      {
        id: 'portal-cancel',
        category: 'Customer Portal',
        title: '🚪 Cancel via Customer Portal',
        description: 'Test subscription cancellation through Stripe portal',
        instructions: [
          '1. Use any active subscription',
          '2. Go to Dashboard → Manage Subscription',
          '3. Cancel subscription in portal (cancel at period end)',
          '4. Check webhook logs for customer.subscription.updated',
          '5. Return to dashboard'
        ],
        verification: [
          'cancel_at_period_end = true in database',
          'Status remains current until period end',
          'UI shows "Free Trial (Canceled)" or similar',
          'Access continues until period end',
          'Webhook received: customer.subscription.updated'
        ],
        expectedOutcome: 'Subscription marked for cancellation at period end',
        status: 'pending',
        timeEstimate: '5 minutes',
        riskLevel: 'low',
        cost: '$0'
      },
      {
        id: 'portal-payment-update',
        category: 'Customer Portal',
        title: '💳 Update Payment Method via Portal',
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
          'User sees updated payment info',
          'Webhook received: customer.updated'
        ],
        expectedOutcome: 'Payment method updates without affecting subscription',
        status: 'pending',
        timeEstimate: '5 minutes',
        riskLevel: 'low',
        cost: '$0'
      },

      // WEBHOOK RELIABILITY
      {
        id: 'webhook-idempotency',
        category: 'Webhook Reliability',
        title: '🔄 Duplicate Webhook Handling',
        description: 'Test that duplicate webhooks don\'t cause issues',
        instructions: [
          '1. Create subscription normally',
          '2. In Stripe dashboard, go to Webhooks section',
          '3. Find recent events and click "Resend"',
          '4. Send same event multiple times',
          '5. Check database for duplicate entries',
          '6. Verify data integrity'
        ],
        verification: [
          'No duplicate subscription records',
          'No data corruption',
          'Database constraints prevent duplicates',
          'Logs show webhook received multiple times but only processed once'
        ],
        expectedOutcome: 'System handles duplicate webhooks gracefully',
        status: 'pending',
        timeEstimate: '10 minutes',
        riskLevel: 'low',
        cost: '$0'
      },

      // EDGE CASES
      {
        id: 'multiple-checkout-attempts',
        category: 'Edge Cases',
        title: '🔀 Multiple Checkout Sessions',
        description: 'Test creating multiple checkout sessions for same user',
        instructions: [
          '1. Start checkout session for Basic plan',
          '2. Close window without completing',
          '3. Start new checkout session for Pro plan',
          '4. Complete the Pro checkout',
          '5. Verify only Pro subscription exists',
          '6. CANCEL immediately'
        ],
        verification: [
          'Only one active subscription per customer',
          'Latest checkout session takes precedence',
          'No orphaned subscription records',
          'Correct plan is active'
        ],
        expectedOutcome: 'Latest completed checkout wins, no conflicts',
        status: 'pending',
        timeEstimate: '10 minutes',
        riskLevel: 'medium',
        cost: '$49 (cancel immediately)'
      },
      {
        id: 'abandoned-signup',
        category: 'Edge Cases',
        title: '🚫 Abandoned Signup Flow',
        description: 'Test user who signs up but never completes payment',
        instructions: [
          '1. Create new user account (test-abandon@example.com)',
          '2. Start checkout for any plan',
          '3. Close checkout window without paying',
          '4. Try to access /dashboard',
          '5. Verify redirect to /get-started'
        ],
        verification: [
          'User redirected to /get-started',
          'No subscription record in database',
          'No access to dashboard features',
          'Can restart signup process'
        ],
        expectedOutcome: 'User must complete payment to access dashboard',
        status: 'pending',
        timeEstimate: '5 minutes',
        riskLevel: 'low',
        cost: '$0'
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
          created_at,
          stripe_customers (
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
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching subscriptions:', error);
        return;
      }

      // Transform the data
      const transformedData: SubscriptionData[] = data.map(user => {
        const customer = user.stripe_customers?.[0];
        const subscription = customer?.stripe_subscriptions?.[0];
        return {
          user_id: user.id,
          email: user.email,
          subscription_status: subscription?.subscription_status || 'not_started',
          price_id: subscription?.price_id || null,
          current_period_end: subscription?.current_period_end || null,
          cancel_at_period_end: subscription?.cancel_at_period_end || false,
          payment_issue_since: subscription?.payment_issue_since || null,
          created_at: subscription?.created_at || user.created_at,
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

  const getRiskColor = (risk: TestCase['riskLevel']) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
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
  const totalCost = testCases
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => {
      const cost = parseFloat(t.cost.replace(/[^0-9.]/g, '')) || 0;
      return sum + cost;
    }, 0);

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
            <h2 className="text-2xl font-bold text-gray-900">⚠️ LIVE MODE TESTING</h2>
            <p className="text-gray-600 mt-2">Real Stripe charges • Real webhooks • Real risk</p>
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
              Access Live Testing Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Warning */}
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-2xl mb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">🚨 LIVE MODE TESTING ACTIVE</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>• Using REAL Stripe products and webhooks</p>
                <p>• REAL charges will occur - cancel subscriptions immediately after testing</p>
                <p>• Estimated total cost if all tests completed: ~$200+ (if not canceled quickly)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Dashboard */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Stripe Live Testing Dashboard</h1>
              <p className="text-gray-600 mt-2">Track and verify subscription flow testing with real data</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{completedTests}/{totalTests}</div>
              <div className="text-sm text-gray-600">Tests Completed</div>
              <div className="text-lg font-semibold text-red-600 mt-1">${totalCost.toFixed(2)} spent</div>
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
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(test.riskLevel)}`}>
                            {test.riskLevel.toUpperCase()} RISK
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span>⏱️ {test.timeEstimate}</span>
                          <span>💰 {test.cost}</span>
                        </div>
                        <p className="text-gray-600 mb-4">{test.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">📋 Step-by-Step Instructions</h4>
                        <ol className="space-y-2 text-sm text-gray-700">
                          {test.instructions.map((instruction, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="font-medium text-blue-600 mr-2 min-w-0">{idx + 1}.</span>
                              <span>{instruction.replace(/^\d+\.\s*/, '')}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">✅ Verification Checklist</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          {test.verification.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-500 mr-2 min-w-0">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-900">🎯 Expected Outcome:</div>
                      <div className="text-sm text-blue-800">{test.expectedOutcome}</div>
                    </div>

                    {/* Status Controls */}
                    <div className="mt-4 flex items-center space-x-3 flex-wrap">
                      <button
                        onClick={() => updateTestStatus(test.id, 'in-progress')}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                      >
                        🚀 Start Test
                      </button>
                      <button
                        onClick={() => updateTestStatus(test.id, 'completed')}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                      >
                        ✅ Mark Complete
                      </button>
                      <button
                        onClick={() => updateTestStatus(test.id, 'failed')}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                      >
                        ❌ Mark Failed
                      </button>
                      <button
                        onClick={() => updateTestStatus(test.id, 'pending')}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        🔄 Reset
                      </button>
                    </div>

                    {test.notes && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="text-sm font-medium text-yellow-900">📝 Notes:</div>
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
                <h3 className="text-lg font-semibold text-gray-900">📊 Live Data</h3>
                <button
                  onClick={fetchSubscriptions}
                  disabled={refreshing}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  {refreshing ? '🔄 Refreshing...' : '🔄 Refresh'}
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
                <h4 className="font-medium text-gray-900">📈 Status Breakdown</h4>
                {['trialing', 'active', 'past_due', 'canceled', 'not_started'].map(status => {
                  const count = subscriptions.filter(s => s.subscription_status === status).length;
                  const percentage = subscriptions.length > 0 ? Math.round((count / subscriptions.length) * 100) : 0;
                  return (
                    <div key={status} className="flex justify-between text-sm">
                      <span className="capitalize text-gray-700">{status.replace('_', ' ')}</span>
                      <span className="font-medium text-gray-900">{count} ({percentage}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Subscriptions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">👥 Recent Subscriptions</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {subscriptions.slice(0, 15).map((sub) => (
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
                        <div className="text-red-600 font-medium">⚠️ Will cancel at period end</div>
                      )}
                      {sub.payment_issue_since && (
                        <div className="text-red-600 font-medium">
                          💳 Payment issue since: {new Date(sub.payment_issue_since).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {subscriptions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📭</div>
                    <div>No subscriptions yet</div>
                    <div className="text-sm">Start testing to see data here</div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/signup"
                  target="_blank"
                  className="block w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-center text-blue-800 font-medium transition-colors"
                >
                  🆕 Create Test Account
                </a>
                <a
                  href="https://dashboard.stripe.com/test/webhooks"
                  target="_blank"
                  className="block w-full p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-center text-purple-800 font-medium transition-colors"
                >
                  📡 View Webhook Logs
                </a>
                <a
                  href="https://dashboard.stripe.com/test/subscriptions"
                  target="_blank"
                  className="block w-full p-3 bg-green-50 hover:bg-green-100 rounded-lg text-center text-green-800 font-medium transition-colors"
                >
                  📋 Stripe Subscriptions
                </a>
                <button
                  onClick={() => {
                    const confirmed = confirm('This will refresh all subscription data from the database. Continue?');
                    if (confirmed) fetchSubscriptions();
                  }}
                  className="block w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-center text-gray-800 font-medium transition-colors"
                >
                  🔄 Force Refresh Data
                </button>
              </div>
            </div>

            {/* Testing Tips */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Testing Tips</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-900">🕐 Timing</div>
                  <div className="text-blue-800">Trials expire after 24 hours. Grace periods last 24 hours.</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-900">💰 Cost Control</div>
                  <div className="text-yellow-800">Cancel subscriptions immediately after verification to minimize charges.</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-900">📡 Webhooks</div>
                  <div className="text-green-800">Check Stripe webhook logs to verify events are being received.</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="font-medium text-red-900">⚠️ Safety</div>
                  <div className="text-red-800">Use unique test emails. Monitor charges closely.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}