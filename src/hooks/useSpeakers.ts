import { useState, useEffect } from 'react';
import { Speaker, SpeakerNote } from '../types/event';

// Mock data for speakers
const mockSpeakers: Speaker[] = [
  {
    id: '1',
    event_id: '2',
    name: 'Dr. Emily Chen',
    session_title: 'AI in Healthcare',
    duration: 45,
    order_index: 0,
    created_at: '2025-01-22T10:00:00Z'
  },
  {
    id: '2',
    event_id: '2',
    name: 'Alex Rodriguez',
    session_title: 'React Best Practices',
    duration: 30,
    order_index: 1,
    created_at: '2025-01-22T10:05:00Z'
  }
];

// Mock data for speaker notes
const mockNotes: SpeakerNote[] = [
  {
    id: '1',
    speaker_id: '1',
    time_marker: 0,
    content: 'Welcome and introduce AI diagnostic tools',
    type: 'essential',
    created_at: '2025-01-22T10:00:00Z'
  },
  {
    id: '2',
    speaker_id: '1',
    time_marker: 300,
    content: 'Share personal research background',
    type: 'optional',
    created_at: '2025-01-22T10:01:00Z'
  },
  {
    id: '3',
    speaker_id: '1',
    time_marker: 1080,
    content: 'Wrap up, prepare for Q&A',
    type: 'transition',
    created_at: '2025-01-22T10:02:00Z'
  }
];

export function useSpeakers(eventId?: string) {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [notes, setNotes] = useState<SpeakerNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const filteredSpeakers = eventId 
        ? mockSpeakers.filter(s => s.event_id === eventId)
        : mockSpeakers;
      setSpeakers(filteredSpeakers);
      setNotes(mockNotes);
      setLoading(false);
    }, 300);
  }, [eventId]);

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

  const getNotesForSpeaker = (speakerId: string) => {
    return notes.filter(note => note.speaker_id === speakerId)
      .sort((a, b) => a.time_marker - b.time_marker);
  };

  return {
    speakers,
    notes,
    loading,
    addSpeaker,
    updateSpeaker,
    deleteSpeaker,
    addNote,
    updateNote,
    deleteNote,
    getNotesForSpeaker
  };
}