import { useFeatureGating } from '../hooks/useFeatureGating';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import React from 'react';

interface FeatureGateNoticeProps {
  feature: 'customLinks' | 'speakerPortals' | 'advancedSlack' | 'templates';
  children: React.ReactNode;
}

export function FeatureGateNotice({ feature, children }: FeatureGateNoticeProps) {
  const featureGates = useFeatureGating();
  const subscriptionStatus = useSubscriptionStatus();

  const featureMap = {
    customLinks: featureGates.hasCustomLinks,
    speakerPortals: featureGates.hasSpeakerPortals,
    advancedSlack: featureGates.hasAdvancedSlack,
    templates: featureGates.hasTemplates,
  };

  const featureNames = {
    customLinks: 'Custom Moderator Links',
    speakerPortals: 'Speaker Self-Service Portals',
    advancedSlack: 'Advanced Slack Notifications',
    templates: 'Event Templates',
  };

  const hasFeature = featureMap[feature];

  if (hasFeature) {
    return <>{children}</>;
  }

  // Show upgrade notice for Basic users
  if (subscriptionStatus.plan === 'standard' && subscriptionStatus.status === 'active') {
    return (
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-purple-900">{featureNames[feature]}</h3>
            <p className="text-sm text-purple-700">Coming soon with StageCue Pro</p>
          </div>
          <a
            href="#"
            className="btn bg-slate-400 text-white px-4 py-2 text-sm cursor-not-allowed"
            onClick={(e) => e.preventDefault()}
          >
            Coming Soon
          </a>
        </div>
      </div>
    );
  }

  // Show subscription required notice for users without subscription
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-slate-900">{featureNames[feature]}</h3>
          <p className="text-sm text-slate-600">Subscription required</p>
        </div>
        <a
          href="/get-started"
          className="btn btn-primary px-4 py-2 text-sm"
        >
          Choose Plan
        </a>
      </div>
    </div>
  );
}