import { useState, useEffect } from 'react';
import { TimeBlock, Speaker, SpeakerNote } from '../types/event';

// Mock data for time blocks
const mockTimeBlocks: TimeBlock[] = [
  {
    id: '1',
    event_id: '2',
    title: 'Opening Keynote',
    start_time: 0,
    duration: 45,
    type: 'session',
    order_index: 0,
    created_at: '2025-01-22T10:00:00Z',
    updated_at: '2025-01-22T10:00:00Z'
  },
  {
    id: '2',
    event_id: '2',
    title: 'Coffee Break',
    start_time: 45,
    duration: 15,
    type: 'break',
    order_index: 1,
    created_at: '2025-01-22T10:05:00Z',
    updated_at: '2025-01-22T10:05:00Z'
  },
  {
    id: '3',
    event_id: '2',
    title: 'Technical Deep Dive',
    start_time: 60,
    duration: 30,
    type: 'session',
    order_index: 2,
    created_at: '2025-01-22T10:10:00Z',
    updated_at: '2025-01-22T10:10:00Z'
  }
];

// Mock data for speakers
const mockSpeakers: Speaker[] = [
  {
    id: '1',
    time_block_id: '1',
    name: 'Dr. Emily Chen',
    email: 'emily@example.com',
    bio: 'AI researcher and healthcare technology expert',
    order_index: 0,
    created_at: '2025-01-22T10:00:00Z'
  },
  {
    id: '2',
    time_block_id: '3',
    name: 'Alex Rodriguez',
    email: 'alex@example.com',
    bio: 'Senior React developer and conference speaker',
    order_index: 0,
    created_at: '2025-01-22T10:05:00Z'
  }
];

// Mock data for speaker notes
const mockNotes: SpeakerNote[] = [
  {
    id: '1',
    speaker_id: '1',
    time_marker: 0,
    content: 'Welcome everyone, introduce the topic of AI in healthcare',
    type: 'essential',
    created_at: '2025-01-22T10:00:00Z'
  },
  {
    id: '2',
    speaker_id: '1',
    time_marker: 300,
    content: 'Share personal research background (skip if running late)',
    type: 'optional',
    created_at: '2025-01-22T10:01:00Z'
  },
  {
    id: '3',
    speaker_id: '1',
    time_marker: 2400,
    content: 'Wrap up main points, prepare for Q&A transition',
    type: 'transition',
    created_at: '2025-01-22T10:02:00Z'
  }
];

export function useTimeBlocks(eventId?: string) {
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [notes, setNotes] = useState<SpeakerNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const filteredBlocks = eventId 
        ? mockTimeBlocks.filter(b => b.event_id === eventId)
        : mockTimeBlocks;
      setTimeBlocks(filteredBlocks);
      setSpeakers(mockSpeakers);
      setNotes(mockNotes);
      setLoading(false);
    }, 300);
  }, [eventId]);

  const addTimeBlock = async (blockData: Omit<TimeBlock, 'id' | 'created_at' | 'updated_at'>) => {
    const newBlock: TimeBlock = {
      ...blockData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setTimeBlocks(prev => [...prev, newBlock].sort((a, b) => a.order_index - b.order_index));
    return newBlock;
  };

  const updateTimeBlock = async (id: string, updates: Partial<TimeBlock>) => {
    setTimeBlocks(prev => prev.map(block => 
      block.id === id 
        ? { ...block, ...updates, updated_at: new Date().toISOString() }
        : block
    ));
  };

  const deleteTimeBlock = async (id: string) => {
    setTimeBlocks(prev => prev.filter(block => block.id !== id));
    // Also remove speakers and notes for this block
    setSpeakers(prev => prev.filter(speaker => speaker.time_block_id !== id));
    const speakerIds = speakers.filter(s => s.time_block_id === id).map(s => s.id);
    setNotes(prev => prev.filter(note => !speakerIds.includes(note.speaker_id)));
  };

  const addSpeaker = async (speakerData: Omit<Speaker, 'id' | 'created_at'>) => {
    const newSpeaker: Speaker = {
      ...speakerData,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    
    setSpeakers(prev => [...prev, newSpeaker]);
    return newSpeaker;
  };

  const updateSpeaker = async (id: string, updates: Partial<Speaker>) => {
    setSpeakers(prev => prev.map(speaker => 
      speaker.id === id ? { ...speaker, ...updates } : speaker
    ));
  };

  const deleteSpeaker = async (id: string) => {
    setSpeakers(prev => prev.filter(speaker => speaker.id !== id));
    setNotes(prev => prev.filter(note => note.speaker_id !== id));
  };

  const addNote = async (noteData: Omit<SpeakerNote, 'id' | 'created_at'>) => {
    const newNote: SpeakerNote = {
      ...noteData,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    
    setNotes(prev => [...prev, newNote]);
    return newNote;
  };

  const updateNote = async (id: string, updates: Partial<SpeakerNote>) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ));
  };

  const deleteNote = async (id: string) => {
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
    getBlocksForEvent
  };
}