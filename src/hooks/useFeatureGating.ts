import { useSubscriptionStatus } from './useSubscriptionStatus';

export interface FeatureGates {
  maxActiveTimers: number;
  hasCustomLinks: boolean;
  hasSpeakerPortals: boolean;
  hasAdvancedSlack: boolean;
  hasTemplates: boolean;
  canCreateEvents: boolean;
}

export function useFeatureGating(): FeatureGates {
  const subscriptionStatus = useSubscriptionStatus();

  // During trial or active subscription, provide features based on plan
  if (subscriptionStatus.status === 'trialing' || subscriptionStatus.status === 'active') {
    if (subscriptionStatus.plan === 'basic') {
      return {
        maxActiveTimers: 10,
        hasCustomLinks: false,
        hasSpeakerPortals: false,
        hasAdvancedSlack: false,
        hasTemplates: true,
        canCreateEvents: true,
      };
    } else if (subscriptionStatus.plan === 'pro') {
      return {
        maxActiveTimers: Infinity,
        hasCustomLinks: true,
        hasSpeakerPortals: true,
        hasAdvancedSlack: true,
        hasTemplates: true,
        canCreateEvents: true,
      };
    } else if (subscriptionStatus.plan === 'premium') {
      // Premium features (when available)
      return {
        maxActiveTimers: Infinity,
        hasCustomLinks: true,
        hasSpeakerPortals: true,
        hasAdvancedSlack: true,
        hasTemplates: true,
        canCreateEvents: true,
      };
    }
  }

  // Grace period - allow basic features regardless of original plan
  if (subscriptionStatus.status === 'past_due') {
    return {
      maxActiveTimers: 5, // Limited during grace period
      hasCustomLinks: false,
      hasSpeakerPortals: false,
      hasAdvancedSlack: false,
      hasTemplates: false,
      canCreateEvents: true,
    };
  }

  // No active subscription - very limited access
  return {
    maxActiveTimers: 0,
    hasCustomLinks: false,
    hasSpeakerPortals: false,
    hasAdvancedSlack: false,
    hasTemplates: false,
    canCreateEvents: false,
  };
}