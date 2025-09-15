import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface SharedTimerState {
  id?: string;
  eventId: string;
  currentBlockId?: string;
  currentBlockIndex: number;
  timeRemaining: number; // in seconds
  totalDuration: number; // in seconds
  isRunning: boolean;
  isPaused: boolean;
  startedAt?: string;
  updatedAt: string;
}

export function useSharedTimer(eventId: string, isModeratorView: boolean = false) {
  const [timerState, setTimerState] = useState<SharedTimerState>({
    eventId,
    currentBlockIndex: 0,
    timeRemaining: 0,
    totalDuration: 0,
    isRunning: false,
    isPaused: false,
    updatedAt: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);

  // Fetch initial timer state from Supabase
  useEffect(() => {
    if (!eventId) return;

    const fetchTimerState = async () => {
      try {
        const { data, error } = await supabase
          .from('event_sessions')
          .select('*')
          .eq('event_id', eventId)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          console.error('Error fetching timer state:', error);
          return;
        }

        if (data) {
          // Calculate elapsed time if timer was running
          let adjustedTimeRemaining = data.time_remaining;
          
          if (data.is_running && !data.is_paused && data.updated_at) {
            const elapsed = Math.floor((Date.now() - new Date(data.updated_at).getTime()) / 1000);
            adjustedTimeRemaining = Math.max(0, data.time_remaining - elapsed);
          }

          setTimerState({
            id: data.id,
            eventId: data.event_id,
            currentBlockId: data.current_block_id,
            currentBlockIndex: data.current_block_index,
            timeRemaining: adjustedTimeRemaining,
            totalDuration: data.total_duration,
            isRunning: data.is_running,
            isPaused: data.is_paused,
            startedAt: data.started_at,
            updatedAt: data.updated_at
          });
        }
      } catch (err) {
        console.error('Error fetching timer state:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimerState();
  }, [eventId]);

  // Subscribe to real-time changes
  useEffect(() => {
    if (!eventId) return;

    const channel = supabase
      .channel(`event_session_${eventId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'event_sessions',
          filter: `event_id=eq.${eventId}`
        },
        (payload) => {
          if (payload.new) {
            const data = payload.new as any;
            setTimerState({
              id: data.id,
              eventId: data.event_id,
              currentBlockId: data.current_block_id,
              currentBlockIndex: data.current_block_index,
              timeRemaining: data.time_remaining,
              totalDuration: data.total_duration,
              isRunning: data.is_running,
              isPaused: data.is_paused,
              startedAt: data.started_at,
              updatedAt: data.updated_at
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventId]);

  // Auto-decrement timer when running (only for moderator to avoid conflicts)
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isModeratorView && timerState.isRunning && !timerState.isPaused && timerState.timeRemaining > 0) {
      interval = setInterval(() => {
        setTimerState(prev => {
          const newTimeRemaining = Math.max(0, prev.timeRemaining - 1);
          
          // Update database every 5 seconds to reduce load
          if (newTimeRemaining % 5 === 0 || newTimeRemaining === 0) {
            updateTimerInDatabase({
              time_remaining: newTimeRemaining,
              updated_at: new Date().toISOString()
            });
          }
          
          return {
            ...prev,
            timeRemaining: newTimeRemaining,
            updatedAt: new Date().toISOString()
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerState.isRunning, timerState.isPaused, timerState.timeRemaining, isModeratorView]);

  // Helper function to update timer in database
  const updateTimerInDatabase = async (updates: Partial<any>) => {
    if (!isModeratorView || !eventId) return;

    try {
      if (timerState.id) {
        // Update existing session
        await supabase
          .from('event_sessions')
          .update({
            ...updates,
            updated_at: new Date().toISOString()
          })
          .eq('id', timerState.id);
      } else {
        // Create new session
        const { data } = await supabase
          .from('event_sessions')
          .insert({
            event_id: eventId,
            current_block_index: timerState.currentBlockIndex,
            time_remaining: timerState.timeRemaining,
            total_duration: timerState.totalDuration,
            is_running: false,
            is_paused: false,
            ...updates
          })
          .select()
          .single();

        if (data) {
          setTimerState(prev => ({ ...prev, id: data.id }));
        }
      }
    } catch (error) {
      console.error('Error updating timer state:', error);
    }
  };

  // Moderator-only actions
  const updateTimerState = useCallback(async (updates: Partial<SharedTimerState>) => {
    if (!isModeratorView) {
      console.warn('Only moderator can update timer state');
      return;
    }

    const newState = {
      ...timerState,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    setTimerState(newState);
    await updateTimerInDatabase(updates);
  }, [isModeratorView, timerState]);

  const startTimer = useCallback(async () => {
    await updateTimerState({ 
      isRunning: true, 
      isPaused: false,
      startedAt: new Date().toISOString()
    });
  }, [updateTimerState]);

  const pauseTimer = useCallback(async () => {
    await updateTimerState({ isPaused: true });
  }, [updateTimerState]);

  const resumeTimer = useCallback(async () => {
    await updateTimerState({ isPaused: false });
  }, [updateTimerState]);

  const resetTimer = useCallback(async (newDuration?: number) => {
    await updateTimerState({
      timeRemaining: newDuration ?? timerState.totalDuration,
      totalDuration: newDuration ?? timerState.totalDuration,
      isRunning: false,
      isPaused: false,
      startedAt: undefined
    });
  }, [updateTimerState, timerState.totalDuration]);

  const extendTimer = useCallback(async (additionalSeconds: number) => {
    await updateTimerState({
      timeRemaining: Math.max(0, timerState.timeRemaining + additionalSeconds)
    });
  }, [updateTimerState, timerState.timeRemaining]);

  const setCurrentBlock = useCallback(async (blockIndex: number, blockId: string, blockDuration: number) => {
    await updateTimerState({
      currentBlockIndex: blockIndex,
      currentBlockId: blockId,
      timeRemaining: blockDuration,
      totalDuration: blockDuration,
      isRunning: false,
      isPaused: false,
      startedAt: undefined
    });
  }, [updateTimerState]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const getProgress = useCallback(() => {
    if (timerState.totalDuration === 0) return 0;
    return ((timerState.totalDuration - timerState.timeRemaining) / timerState.totalDuration) * 100;
  }, [timerState.timeRemaining, timerState.totalDuration]);

  return {
    timerState,
    loading,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    extendTimer,
    setCurrentBlock,
    formatTime,
    getProgress,
    isModeratorView
  };
}