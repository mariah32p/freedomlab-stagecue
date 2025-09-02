import { useState, useEffect } from 'react';
import { TimeBlock, Speaker, SpeakerNote } from '../types/event';
import { supabase } from '../lib/supabase';

export function useTimeBlocks(eventId?: string) {
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [notes, setNotes] = useState<SpeakerNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eventId) {
      fetchTimeBlocks();
    } else {
      setLoading(false);
    }
  }, [eventId]);

  const fetchTimeBlocks = async () => {
    if (!eventId) return;

    try {
      // Fetch time blocks
      const { data: blocksData, error: blocksError } = await supabase
        .from('time_blocks')
        .select('*')
        .eq('event_id', eventId)
        .order('order_index');

      if (blocksError) {
        console.error('Error fetching time blocks:', blocksError);
        return;
      }

      setTimeBlocks(blocksData || []);

      // Fetch speakers for these blocks
      if (blocksData && blocksData.length > 0) {
        const blockIds = blocksData.map(b => b.id);
        
        const { data: speakersData, error: speakersError } = await supabase
          .from('speakers')
          .select('*')
          .in('time_block_id', blockIds)
          .order('order_index');

        if (speakersError) {
          console.error('Error fetching speakers:', speakersError);
        } else {
          setSpeakers(speakersData || []);

          // Fetch notes for these speakers
          if (speakersData && speakersData.length > 0) {
            const speakerIds = speakersData.map(s => s.id);
            
            const { data: notesData, error: notesError } = await supabase
              .from('speaker_notes')
              .select('*')
              .in('speaker_id', speakerIds)
              .order('time_marker');

            if (notesError) {
              console.error('Error fetching speaker notes:', notesError);
            } else {
              setNotes(notesData || []);
            }
          }
        }
      }
    } catch (err) {
      console.error('Error fetching time blocks data:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTimeBlock = async (blockData: Omit<TimeBlock, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('time_blocks')
      .insert(blockData)
      .select()
      .single();

    if (error) {
      console.error('Error creating time block:', error);
      throw error;
    }

    setTimeBlocks(prev => [...prev, data].sort((a, b) => a.order_index - b.order_index));
    return data;
  };

  const updateTimeBlock = async (id: string, updates: Partial<TimeBlock>) => {
    const { data, error } = await supabase
      .from('time_blocks')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating time block:', error);
      throw error;
    }

    setTimeBlocks(prev => prev.map(block => 
      block.id === id ? data : block
    ));
  };

  const deleteTimeBlock = async (id: string) => {
    const { error } = await supabase
      .from('time_blocks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting time block:', error);
      throw error;
    }

    setTimeBlocks(prev => prev.filter(block => block.id !== id));
    // Remove speakers and notes for this block (cascade delete should handle this)
    setSpeakers(prev => prev.filter(speaker => speaker.time_block_id !== id));
    const speakerIds = speakers.filter(s => s.time_block_id === id).map(s => s.id);
    setNotes(prev => prev.filter(note => !speakerIds.includes(note.speaker_id)));
  };

  const addSpeaker = async (speakerData: Omit<Speaker, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('speakers')
      .insert(speakerData)
      .select()
      .single();

    if (error) {
      console.error('Error creating speaker:', error);
      throw error;
    }

    setSpeakers(prev => [...prev, data]);
    return data;
  };

  const updateSpeaker = async (id: string, updates: Partial<Speaker>) => {
    const { data, error } = await supabase
      .from('speakers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating speaker:', error);
      throw error;
    }

    setSpeakers(prev => prev.map(speaker => 
      speaker.id === id ? data : speaker
    ));
  };

  const deleteSpeaker = async (id: string) => {
    const { error } = await supabase
      .from('speakers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting speaker:', error);
      throw error;
    }

    setSpeakers(prev => prev.filter(speaker => speaker.id !== id));
    setNotes(prev => prev.filter(note => note.speaker_id !== id));
  };

  const addNote = async (noteData: Omit<SpeakerNote, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('speaker_notes')
      .insert(noteData)
      .select()
      .single();

    if (error) {
      console.error('Error creating speaker note:', error);
      throw error;
    }

    setNotes(prev => [...prev, data]);
    return data;
  };

  const updateNote = async (id: string, updates: Partial<SpeakerNote>) => {
    const { data, error } = await supabase
      .from('speaker_notes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating speaker note:', error);
      throw error;
    }

    setNotes(prev => prev.map(note => 
      note.id === id ? data : note
    ));
  };

  const deleteNote = async (id: string) => {
    const { error } = await supabase
      .from('speaker_notes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting speaker note:', error);
      throw error;
    }

    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const getSpeakersForBlock = (blockId: string) => {
    return speakers.filter(speaker => speaker.time_block_id === blockId)
      .sort((a, b) => a.order_index - b.order_index);
  };

  const getNotesForSpeaker = (speakerId: string) => {
    return notes.filter(note => note.speaker_id === speakerId)
      .sort((a, b) => a.time_marker - b.time_marker);
  };

  const getBlocksForEvent = (eventId: string) => {
    return timeBlocks.filter(block => block.event_id === eventId)
      .sort((a, b) => a.order_index - b.order_index);
  };

  return {
    timeBlocks,
    speakers,
    notes,
    loading,
    addTimeBlock,
    updateTimeBlock,
    deleteTimeBlock,
    addSpeaker,
    updateSpeaker,
    deleteSpeaker,
    addNote,
    updateNote,
    deleteNote,
    getSpeakersForBlock,
    getNotesForSpeaker,
    getBlocksForEvent,
    refetch: fetchTimeBlocks
  };
}