/*
  # Add Event Sessions for Real-time Timer Management

  1. New Tables
    - `event_sessions`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key to events)
      - `current_block_id` (uuid, foreign key to time_blocks)
      - `current_block_index` (integer)
      - `time_remaining` (integer, seconds)
      - `total_duration` (integer, seconds)
      - `is_running` (boolean)
      - `is_paused` (boolean)
      - `started_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `event_sessions` table
    - Add policies for public read access (moderator/speaker links)
    - Add policies for authenticated users to manage their own event sessions

  3. Changes
    - Public read access allows moderator/speaker portals to work without auth
    - Only event owners can create/update sessions
*/

-- Create event_sessions table for real-time timer state
CREATE TABLE IF NOT EXISTS event_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  current_block_id uuid REFERENCES time_blocks(id) ON DELETE SET NULL,
  current_block_index integer DEFAULT 0,
  time_remaining integer DEFAULT 0, -- seconds
  total_duration integer DEFAULT 0, -- seconds
  is_running boolean DEFAULT false,
  is_paused boolean DEFAULT false,
  started_at timestamptz,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE event_sessions ENABLE ROW LEVEL SECURITY;

-- Allow public read access for moderator/speaker portals
CREATE POLICY "Public read access for event sessions"
  ON event_sessions
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can manage their own event sessions
CREATE POLICY "Users can manage own event sessions"
  ON event_sessions
  FOR ALL
  TO authenticated
  USING (
    event_id IN (
      SELECT id FROM events WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    event_id IN (
      SELECT id FROM events WHERE user_id = auth.uid()
    )
  );

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_event_sessions_event_id ON event_sessions(event_id);
CREATE INDEX IF NOT EXISTS idx_event_sessions_updated_at ON event_sessions(updated_at);