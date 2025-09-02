import { useState, useEffect } from 'react';
import { Event } from '../types/event';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching events:', error);
        return;
      }

      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('events')
      .insert({
        ...eventData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating event:', error);
      throw error;
    }

    setEvents(prev => [data, ...prev]);
    return data;
  };

  const updateEvent = async (id: string, updates: Partial<Event>) => {
    const { data, error } = await supabase
      .from('events')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating event:', error);
      throw error;
    }

    setEvents(prev => prev.map(event => 
      event.id === id ? data : event
    ));
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
      throw error;
    }

    setEvents(prev => prev.filter(event => event.id !== id));
  };

  return {
    events,
    loading,
    createEvent,
    updateEvent,
    deleteEvent,
    refetch: fetchEvents
  };
}