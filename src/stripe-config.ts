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
];