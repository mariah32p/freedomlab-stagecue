export interface Product {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
}

export const products: Product[] = [
  {
    id: 'prod_SvecCbpHbEWJ0M',
    priceId: 'price_1RznJIDn6VTzl81bqsk5O1gR',
    name: 'StageCue Basic',
    description: 'Perfect for small events, workshops, and team meetings. Up to 10 active timers, speaker notes, and basic Slack notifications.',
    mode: 'subscription',
    price: 29.00,
  },
  {
    id: 'prod_StageCuePro',
    priceId: 'price_1RznJIDn6VTzl81bPK1TDU3Y',
    name: 'StageCue Pro',
    description: 'Ideal for professional events and conferences. Unlimited timers, advanced speaker notes, full Slack integration, and priority support.',
    mode: 'subscription',
    price: 49.00,
  },
];