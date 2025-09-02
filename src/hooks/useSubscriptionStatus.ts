import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export interface SubscriptionStatus {
  status: string;
  plan: string | null;
  paymentIssueSince: string | null;
  currentPeriodEnd: number | null;
  cancelAtPeriodEnd: boolean;
  loading: boolean;
}

export function useSubscriptionStatus() {
  const { user } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>({
    status: 'not_started',
    plan: null,
    paymentIssueSince: null,
    currentPeriodEnd: null,
    cancelAtPeriodEnd: false,
    loading: true,
  });

  useEffect(() => {
    if (!user) {
      setSubscriptionStatus(prev => ({ ...prev, loading: false }));
      return;
    }

    fetchSubscriptionStatus();
  }, [user]);

  const fetchSubscriptionStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('subscription_status, price_id, current_period_end, cancel_at_period_end, payment_issue_since')
        .maybeSingle();

      if (error) {
        console.error('Error fetching subscription:', error);
        setSubscriptionStatus(prev => ({ 
          ...prev, 
          status: 'not_started',
          loading: false 
        }));
        return;
      }

      // Get plan name from price_id
      let plan = null;
      if (data?.price_id) {
        if (data.price_id === 'price_1RznJIDn6VTzl81bqsk5O1gR') {
          plan = 'basic';
        } else if (data.price_id === 'price_1RznJIDn6VTzl81bPK1TDU3Y') {
          plan = 'pro';
        }
      }

      setSubscriptionStatus({
        status: data?.subscription_status || 'not_started',
        plan,
        paymentIssueSince: data?.payment_issue_since || null,
        currentPeriodEnd: data?.current_period_end || null,
        cancelAtPeriodEnd: data?.cancel_at_period_end || false,
        loading: false,
      });
    } catch (err) {
      console.error('Error fetching subscription status:', err);
      setSubscriptionStatus(prev => ({ 
        ...prev, 
        status: 'not_started',
        loading: false 
      }));
    }
  };

  return subscriptionStatus;
}