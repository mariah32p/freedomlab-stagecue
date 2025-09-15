import { useFeatureGating } from '../hooks/useFeatureGating';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';

interface TimerLimitNoticeProps {
  currentTimerCount: number;
}

export function TimerLimitNotice({ currentTimerCount }: TimerLimitNoticeProps) {
  const featureGates = useFeatureGating();
  const subscriptionStatus = useSubscriptionStatus();

  // Don't show if unlimited timers
  if (featureGates.maxActiveTimers === Infinity) {
    return null;
  }

  // Don't show if well under limit
  if (currentTimerCount < featureGates.maxActiveTimers - 2) {
    return null;
  }

  const isAtLimit = currentTimerCount >= featureGates.maxActiveTimers;
  const isNearLimit = currentTimerCount >= featureGates.maxActiveTimers - 1;

  if (isAtLimit) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-red-900">Timer Limit Reached</h3>
            <p className="text-sm text-red-700">
              You've reached your limit of {featureGates.maxActiveTimers} active timers
              {subscriptionStatus.status === 'past_due' ? ' during grace period. Please update your payment method.' : 
               subscriptionStatus.plan === 'standard' ? '. All features included in your Standard plan.' : '.'}
            </p>
          </div>
          {subscriptionStatus.status === 'past_due' ? (
            <a
              href="/settings"
              className="btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm"
            >
              Update Payment
            </a>
          ) : subscriptionStatus.plan === 'standard' ? (
            null
          ) : null}
        </div>
      </div>
    );
  }

  if (isNearLimit) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-amber-900">Approaching Timer Limit</h3>
            <p className="text-sm text-amber-700">
              You're using {currentTimerCount} of {featureGates.maxActiveTimers} available timers
              {subscriptionStatus.status === 'past_due' ? ' during grace period.' : 
               subscriptionStatus.plan === 'standard' ? '. All features included in your Standard plan.' : '.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}