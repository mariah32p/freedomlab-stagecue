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
    id: 'prod_standard',
    priceId: 'price_1RznJIDn6VTzl81bqsk5O1gR', // Keep same price ID for now
    name: 'StageCue Standard',
    description: 'Professional event timing for all your needs',
    mode: 'subscription',
    price: 29.00,
    features: [
      'Unlimited active timers',
      'Timer controls via web dashboard',
      'Speaker notes management',
      'Advanced Slack notifications',
      'Save/reuse timer configurations',
      'Real-time countdown displays',
      'Custom moderator links',
      'Speaker self-service portals',
      'Timer + speaker templates'
    ]
  },
  {
    id: 'prod_pro',
    priceId: 'price_pro_monthly',
    name: 'StageCue Pro',
    description: 'Advanced features for enterprise organizations',
    mode: 'subscription',
    price: 49.00,
    comingSoon: true,
    features: [
      'Everything in Standard, plus:',
      'White-label branding',
      'Advanced analytics & reporting',
      'Priority support',
      'Custom integrations',
      'Multi-team management',
      'API access'
    ]
  }
];