/*
  # Add INSERT and UPDATE policies for stripe_customers table

  1. Security Policies
    - Add policy for authenticated users to insert their own customer data
    - Add policy for authenticated users to update their own customer data
  
  2. Changes
    - Enables test panel functionality by allowing users to create/update their own customer records
    - Maintains security by restricting access to user's own data only
*/

-- Allow authenticated users to insert their own customer data
CREATE POLICY "Users can insert own customer data"
  ON stripe_customers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to update their own customer data  
CREATE POLICY "Users can update own customer data"
  ON stripe_customers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);