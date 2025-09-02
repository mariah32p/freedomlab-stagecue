/*
  # Update stripe_user_subscriptions view to include payment_issue_since

  1. View Updates
    - Update `stripe_user_subscriptions` view to include the new `payment_issue_since` column
    - This column was added to the `stripe_subscriptions` table but the view wasn't updated

  2. Changes
    - Add `payment_issue_since` to the SELECT statement in the view definition
*/

-- Drop the existing view
DROP VIEW IF EXISTS stripe_user_subscriptions;

-- Recreate the view with the payment_issue_since column
CREATE VIEW stripe_user_subscriptions 
WITH (security_invoker=true) AS
SELECT 
  sc.customer_id,
  ss.subscription_id,
  ss.status as subscription_status,
  ss.price_id,
  ss.current_period_start,
  ss.current_period_end,
  ss.cancel_at_period_end,
  ss.payment_method_brand,
  ss.payment_method_last4,
  ss.payment_issue_since
FROM stripe_customers sc
LEFT JOIN stripe_subscriptions ss ON sc.customer_id = ss.customer_id
WHERE sc.user_id = auth.uid() 
  AND sc.deleted_at IS NULL 
  AND (ss.deleted_at IS NULL OR ss.deleted_at IS NULL);