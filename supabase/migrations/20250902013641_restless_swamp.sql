/*
  # Add payment issue tracking

  1. Schema Changes
    - Add `payment_issue_since` column to `stripe_subscriptions` table
    - This tracks when payment issues started for grace period calculation

  2. Security
    - No RLS changes needed (inherits existing policies)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'stripe_subscriptions' AND column_name = 'payment_issue_since'
  ) THEN
    ALTER TABLE stripe_subscriptions ADD COLUMN payment_issue_since timestamptz DEFAULT NULL;
  END IF;
END $$;