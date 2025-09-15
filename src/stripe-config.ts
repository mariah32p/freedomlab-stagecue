export interface Product {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  features: string[];
  popular?: boolean;
  comingSoon?: boolean;
}

export const products: Product[] = [
  {
    id: 'prod_basic',
    priceId: 'price_1RznJIDn6VTzl81bqsk5O1gR',
    name: 'StageCue Basic',
    description: 'Perfect for small events and workshops',
    mode: 'subscription',
    price: 29.00,
    features: [
      'Up to 10 active timers',
      'Timer controls via web dashboard',
      'Speaker notes management',
      'Basic Slack notifications',
      'Save/reuse timer configurations',
      'Real-time countdown displays'
    ]
  },
  {
    id: 'prod_pro',
    priceId: 'price_1RznJIDn6VTzl81bPK1TDU3Y',
    name: 'StageCue Pro',
    description: 'Professional event timing system for conferences and larger events',
    mode: 'subscription',
    price: 49.00,
    popular: true,
    features: [
      'Unlimited active timers',
      'Timer controls via web dashboard',
      'Speaker notes management',
      'Advanced Slack notifications',
      'Save/reuse timer configurations',
      'Real-time countdown displays',
      'Custom moderator links',
      'Speaker self-service portals'
    ]
  },
  {
    id: 'prod_premium',
    priceId: 'price_premium_monthly',
    name: 'StageCue Premium',
    description: 'Enterprise features for large organizations',
    mode: 'subscription',
    price: 99.00,
    comingSoon: true,
    features: [
      'Everything in Pro, plus:',
      'White-label branding',
      'Advanced analytics & reporting',
      'Priority support',
      'Custom integrations',
      'Multi-team management',
      'API access'
    ]
  }
];