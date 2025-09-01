import { getGraceDaysRemaining } from '../utils/graceHelper';

interface PaymentIssueBannerProps {
  paymentIssueSince: string | null;
  onManageSubscription?: () => void;
}

export function PaymentIssueBanner({ paymentIssueSince, onManageSubscription }: PaymentIssueBannerProps) {
  if (!paymentIssueSince) {
    return null;
  }

  const daysRemaining = getGraceDaysRemaining(paymentIssueSince);

  if (daysRemaining <= 0) {
    return null;
  }

  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4">
      <div className="flex items-center justify-between">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-800">
              <span className="font-medium">Payment Issue:</span> Your subscription payment failed. 
              You have <span className="font-semibold">{daysRemaining} days</span> remaining to update your payment method.
            </p>
          </div>
        </div>
        {onManageSubscription && (
          <div className="flex-shrink-0">
            <button
              onClick={onManageSubscription}
              className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Update Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}