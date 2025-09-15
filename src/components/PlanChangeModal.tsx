import { useState } from 'react';
import { products } from '../stripe-config';
import { Alert } from './Alert';
import { supabase } from '../lib/supabase';

interface PlanChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: 'standard' | 'pro';
  onSuccess: () => void;
}

export function PlanChangeModal({ isOpen, onClose, currentPlan, onSuccess }: PlanChangeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'pro'>(currentPlan === 'standard' ? 'pro' : 'standard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePlanChange = async () => {
    setLoading(true);
    setError('');

    try {
      const selectedProduct = products.find(p =>
        selectedPlan === 'standard' ? p.name === 'StageCue Standard' : p.name === 'StageCue Pro'
      );

      if (!selectedProduct) {
        throw new Error('Selected plan not found');
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      // Create checkout session for plan change
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: selectedProduct.priceId,
          success_url: `${window.location.origin}/dashboard`,
          cancel_url: `${window.location.origin}/settings`,
          mode: 'subscription',
          // No trial for plan changes
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.open(data.url, '_blank');
        onSuccess();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to change plan';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isUpgrade = currentPlan === 'standard' && selectedPlan === 'pro';
  const isDowngrade = currentPlan === 'pro' && selectedPlan === 'standard';

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-navy-900">
              {isUpgrade ? 'Upgrade to Pro' : isDowngrade ? 'Downgrade to Basic' : 'Change Plan'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <Alert type="error" className="mb-4">
              {error}
            </Alert>
          )}

          <div className="space-y-4 mb-6">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-medium text-navy-900 mb-2">Current Plan</h3>
              <div className="text-sm text-navy-600">
                {currentPlan === 'standard' ? 'StageCue Standard - $29/month' : 'StageCue Pro - $49/month'}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-medium text-navy-900 mb-2">
                {selectedPlan === 'standard' ? 'StageCue Standard' : 'StageCue Pro'}
              </h3>
              <div className="text-lg font-bold text-navy-900 mb-2">
                {selectedPlan === 'standard' ? '$29' : '$49'}/month
              </div>
              <div className="space-y-2 text-sm text-navy-600">
                {selectedPlan === 'standard' ? (
                  <>
                    <div>• Unlimited active timers</div>
                    <div>• Advanced Slack notifications</div>
                    <div>• Speaker notes management</div>
                    <div>• Custom moderator links</div>
                    <div>• Speaker self-service portals</div>
                  </>
                ) : (
                  <>
                    <div>• Everything in Standard, plus:</div>
                    <div>• White-label branding</div>
                    <div>• Advanced analytics & reporting</div>
                    <div>• Priority support</div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-amber-800">
                <strong>Billing Note:</strong> Plan changes are prorated automatically. 
                {isUpgrade && ' You\'ll be charged the difference immediately.'}
                {isDowngrade && ' You\'ll receive a credit for the unused portion.'}
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 btn btn-outline py-3"
            >
              Cancel
            </button>
            <button
              onClick={handlePlanChange}
              disabled={loading}
              className={`flex-1 btn py-3 ${
                isUpgrade 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-slate-600 hover:bg-slate-700 text-white'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `${isUpgrade ? 'Upgrade' : 'Downgrade'} Plan`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}