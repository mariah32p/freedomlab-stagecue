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
    name: 'StageCue',
    description: 'Professional event timing system with multi-session management for conferences, meetings, and live events.',
    mode: 'subscription',
    price: 29.00,
  },
  {
    id: 'prod_StageCuePro',
    priceId: 'price_StageCueProMonthly',
    name: 'StageCue Pro',
    description: 'Advanced event timing with unlimited sessions, custom branding, analytics, and priority support for large-scale events.',
    mode: 'subscription',
    price: 49.00,
  },
];