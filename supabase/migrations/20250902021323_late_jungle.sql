/*
  # Update grace period to 1 day for testing

  1. Changes
    - Update grace period helper functions to use 1 day instead of 30 days
    - This allows faster testing of payment failure scenarios

  2. Notes
    - This is for testing purposes only
    - In production, grace period should be 30 days
*/

-- No database changes needed, grace period is handled in application code
-- This migration serves as documentation of the testing configuration