export interface Product {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
}

const products: Product[] = [
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
    description: 'Perfect for conferences and larger events. Unlimited timers, custom moderator links, speaker self-service, and advanced Slack notifications.',
    mode: 'subscription',
    price: 49.00,
  },
];

// The `products` array is now the default export
export default products;