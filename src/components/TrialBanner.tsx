import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';

export function TrialBanner() {
  const subscriptionStatus = useSubscriptionStatus();

  if (subscriptionStatus.status !== 'trialing' || !subscriptionStatus.currentPeriodEnd) {
    return null;
  }

  const trialEndDate = new Date(subscriptionStatus.currentPeriodEnd * 1000);
  const now = new Date();
  const daysRemaining = Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const planName = subscriptionStatus.plan === 'basic' ? 'StageCue Basic' : 'StageCue Pro';
  const planPrice = subscriptionStatus.plan === 'basic' ? '$29' : '$49';

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-navy-900">
              {planName} Trial Active
            </h3>
            <p className="text-sm text-navy-600">
              {daysRemaining > 0 ? (
                <>
                  {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining • 
                  Billing starts {trialEndDate.toLocaleDateString()} ({planPrice}/month)
                </>
              ) : (
                <>Trial ends today • Billing starts {trialEndDate.toLocaleDateString()} ({planPrice}/month)</>
              )}
            </p>
          </div>
        </div>
        {subscriptionStatus.cancelAtPeriodEnd && (
          <div className="text-right">
            <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              Trial will not renew
            </span>
          </div>
        )}
      </div>
    </div>
  );
}