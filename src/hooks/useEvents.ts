import { useState, useEffect } from 'react';
import { Event } from '../types/event';

// Mock data for now - in real implementation this would connect to Supabase
const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Q1 Product Launch Planning',
    date: '2025-03-15',
    duration: 90,
    meeting_link: 'https://zoom.us/j/123456789',
    status: 'draft',
    created_at: '2025-01-22T10:00:00Z',
    updated_at: '2025-01-22T10:00:00Z',
    user_id: 'user-1'
  },
  {
    id: '2',
    name: 'Tech Summit 2025',
    date: '2025-04-20',
    duration: 480,
    meeting_link: 'https://teams.microsoft.com/l/meetup-join/...',
    status: 'live',
    created_at: '2025-01-20T09:00:00Z',
    updated_at: '2025-01-22T14:30:00Z',
    user_id: 'user-1'
  }
];

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 500);
  }, []);

  const createEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: 'user-1'
    };
    
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  };

  const updateEvent = async (id: string, updates: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id 
        ? { ...event, ...updates, updated_at: new Date().toISOString() }
        : event
    ));
  };

  const deleteEvent = async (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  return {
    events,
    loading,
    createEvent,
    updateEvent,
    deleteEvent
  };
}