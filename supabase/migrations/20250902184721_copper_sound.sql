/*
  # Create event management tables

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text)
      - `date` (date)
      - `total_duration` (integer, minutes)
      - `meeting_link` (text, optional)
      - `status` (enum: draft, live, completed)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `time_blocks`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key to events)
      - `title` (text)
      - `start_time` (integer, minutes from event start)
      - `duration` (integer, minutes)
      - `type` (enum: session, break, qa, networking)
      - `order_index` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `speakers`
      - `id` (uuid, primary key)
      - `time_block_id` (uuid, foreign key to time_blocks)
      - `name` (text)
      - `email` (text, optional)
      - `bio` (text, optional)
      - `order_index` (integer)
      - `created_at` (timestamp)
    
    - `speaker_notes`
      - `id` (uuid, primary key)
      - `speaker_id` (uuid, foreign key to speakers)
      - `time_marker` (integer, seconds from block start)
      - `content` (text)
      - `type` (enum: essential, optional, transition)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create enums
CREATE TYPE event_status AS ENUM ('draft', 'live', 'completed');
CREATE TYPE time_block_type AS ENUM ('session', 'break', 'qa', 'networking');
CREATE TYPE speaker_note_type AS ENUM ('essential', 'optional', 'transition');

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  date date NOT NULL,
  total_duration integer NOT NULL, -- in minutes
  meeting_link text,
  status event_status NOT NULL DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create time_blocks table
CREATE TABLE IF NOT EXISTS time_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  title text NOT NULL,
  start_time integer NOT NULL DEFAULT 0, -- minutes from event start
  duration integer NOT NULL, -- in minutes
  type time_block_type NOT NULL DEFAULT 'session',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create speakers table
CREATE TABLE IF NOT EXISTS speakers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  time_block_id uuid NOT NULL REFERENCES time_blocks(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  bio text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create speaker_notes table
CREATE TABLE IF NOT EXISTS speaker_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  speaker_id uuid NOT NULL REFERENCES speakers(id) ON DELETE CASCADE,
  time_marker integer NOT NULL DEFAULT 0, -- seconds from block start
  content text NOT NULL,
  type speaker_note_type NOT NULL DEFAULT 'essential',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE speaker_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events
CREATE POLICY "Users can read own events"
  ON events
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own events"
  ON events
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for time_blocks
CREATE POLICY "Users can read own time blocks"
  ON time_blocks
  FOR SELECT
  TO authenticated
  USING (
    event_id IN (
      SELECT id FROM events WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own time blocks"
  ON time_blocks
  FOR INSERT
  TO authenticated
  WITH CHECK (
    event_id IN (
      SELECT id FROM events WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own time blocks"
  ON time_blocks
  FOR UPDATE
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

CREATE POLICY "Users can delete own time blocks"
  ON time_blocks
  FOR DELETE
  TO authenticated
  USING (
    event_id IN (
      SELECT id FROM events WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for speakers
CREATE POLICY "Users can read own speakers"
  ON speakers
  FOR SELECT
  TO authenticated
  USING (
    time_block_id IN (
      SELECT tb.id FROM time_blocks tb
      JOIN events e ON e.id = tb.event_id
      WHERE e.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own speakers"
  ON speakers
  FOR INSERT
  TO authenticated
  WITH CHECK (
    time_block_id IN (
      SELECT tb.id FROM time_blocks tb
      JOIN events e ON e.id = tb.event_id
      WHERE e.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own speakers"
  ON speakers
  FOR UPDATE
  TO authenticated
  USING (
    time_block_id IN (
      SELECT tb.id FROM time_blocks tb
      JOIN events e ON e.id = tb.event_id
      WHERE e.user_id = auth.uid()
    )
  )
  WITH CHECK (
    time_block_id IN (
      SELECT tb.id FROM time_blocks tb
      JOIN events e ON e.id = tb.event_id
      WHERE e.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own speakers"
  ON speakers
  FOR DELETE
  TO authenticated
  USING (
    time_block_id IN (
      SELECT tb.id FROM time_blocks tb
      JOIN events e ON e.id = tb.event_id
      WHERE e.user_id = auth.uid()
    )
  );

-- RLS Policies for speaker_notes
CREATE POLICY "Users can read own speaker notes"
  ON speaker_notes
  FOR SELECT
  TO authenticated
  USING (
    speaker_id IN (
      SELECT s.id FROM speakers s
      JOIN time_blocks tb ON tb.id = s.time_block_id
      JOIN events e ON e.id = tb.event_id
      WHERE e.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own speaker notes"
  ON speaker_notes
  FOR INSERT
  TO authenticated
  WITH CHECK (
    speaker_id IN (
      SELECT s.id FROM speakers s
      JOIN time_blocks tb ON tb.id = s.time_block_id
      JOIN events e ON e.id = tb.event_id
      WHERE e.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own speaker notes"
  ON speaker_notes
  FOR UPDATE
  TO authenticated
  USING (
    speaker_id IN (
      SELECT s.id FROM speakers s
      JOIN time_blocks tb ON tb.id = s.time_block_id
      JOIN events e ON e.id = tb.event_id
      WHERE e.user_id = auth.uid()
    )
  )
  WITH CHECK (
    speaker_id IN (
      SELECT s.id FROM speakers s
      JOIN time_blocks tb ON tb.id = s.time_block_id
      JOIN events e ON e.id = tb.event_id
      WHERE e.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own speaker notes"
  ON speaker_notes
  FOR DELETE
  TO authenticated
  USING (
    speaker_id IN (
      SELECT s.id FROM speakers s
      JOIN time_blocks tb ON tb.id = s.time_block_id
      JOIN events e ON e.id = tb.event_id
      WHERE e.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);
CREATE INDEX IF NOT EXISTS idx_time_blocks_event_id ON time_blocks(event_id);
CREATE INDEX IF NOT EXISTS idx_time_blocks_order ON time_blocks(event_id, order_index);
CREATE INDEX IF NOT EXISTS idx_speakers_time_block_id ON speakers(time_block_id);
CREATE INDEX IF NOT EXISTS idx_speaker_notes_speaker_id ON speaker_notes(speaker_id);