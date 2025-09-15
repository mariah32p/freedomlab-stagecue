/*
  # Add simple speaker notes

  1. New Tables
    - `speaker_notes`
      - `id` (uuid, primary key)
      - `speaker_id` (uuid, references speakers)
      - `content` (text, the note content)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `speaker_notes` table
    - Add policy for public read access (speakers can view via public links)
    - Add policy for speakers to manage their own notes
*/

CREATE TABLE IF NOT EXISTS speaker_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  speaker_id uuid NOT NULL REFERENCES speakers(id) ON DELETE CASCADE,
  content text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE speaker_notes ENABLE ROW LEVEL SECURITY;

-- Allow public read access for speaker portals (no auth required)
CREATE POLICY "Public read access for speaker notes"
  ON speaker_notes
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow speakers to manage their own notes (when authenticated)
CREATE POLICY "Users can manage speaker notes for their events"
  ON speaker_notes
  FOR ALL
  TO authenticated
  USING (
    speaker_id IN (
      SELECT s.id
      FROM speakers s
      JOIN time_blocks tb ON tb.id = s.time_block_id
      JOIN events e ON e.id = tb.event_id
      WHERE e.user_id = auth.uid()
    )
  )
  WITH CHECK (
    speaker_id IN (
      SELECT s.id
      FROM speakers s
      JOIN time_blocks tb ON tb.id = s.time_block_id
      JOIN events e ON e.id = tb.event_id
      WHERE e.user_id = auth.uid()
    )
  );

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_speaker_notes_speaker_id ON speaker_notes(speaker_id);