import { useState, useEffect, useCallback } from 'react';

// This would be replaced with a real-time database solution like Supabase Realtime
// For now, we'll use localStorage to simulate shared state across tabs/windows

export interface SharedTimerState {
  eventId: string;
  currentBlockIndex: number;
  timeRemaining: number; // in seconds
  isRunning: boolean;
  isPaused: boolean;
  totalDuration: number; // in seconds
  lastUpdate: number; // timestamp
  moderatorId?: string;
}

const STORAGE_KEY_PREFIX = 'stagecue_timer_';

export function useSharedTimer(eventId: string, isModeratorView: boolean = false) {
  const storageKey = `${STORAGE_KEY_PREFIX}${eventId}`;
  
  const [timerState, setTimerState] = useState<SharedTimerState>({
    eventId,
    currentBlockIndex: 0,
    timeRemaining: 0,
    isRunning: false,
    isPaused: false,
    totalDuration: 0,
    lastUpdate: Date.now()
  });

  // Load initial state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState) as SharedTimerState;
        
        // If timer was running, calculate elapsed time since last update
        if (parsed.isRunning && !parsed.isPaused) {
          const elapsed = Math.floor((Date.now() - parsed.lastUpdate) / 1000);
          const newTimeRemaining = Math.max(0, parsed.timeRemaining - elapsed);
          
          setTimerState({
            ...parsed,
            timeRemaining: newTimeRemaining,
            lastUpdate: Date.now()
          });
        } else {
          setTimerState(parsed);
        }
      } catch (error) {
        console.error('Failed to parse saved timer state:', error);
      }
    }
  }, [storageKey]);

  // Listen for storage changes (cross-tab synchronization)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        try {
          const newState = JSON.parse(e.newValue) as SharedTimerState;
          setTimerState(newState);
        } catch (error) {
          console.error('Failed to parse storage change:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [storageKey]);

  // Auto-decrement timer when running
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerState.isRunning && !timerState.isPaused && timerState.timeRemaining > 0) {
      interval = setInterval(() => {
        setTimerState(prev => {
          const newState = {
            ...prev,
            timeRemaining: Math.max(0, prev.timeRemaining - 1),
            lastUpdate: Date.now()
          };
          
          // Only moderator can update localStorage to avoid conflicts
          if (isModeratorView) {
            localStorage.setItem(storageKey, JSON.stringify(newState));
          }
          
          return newState;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerState.isRunning, timerState.isPaused, timerState.timeRemaining, storageKey, isModeratorView]);

  // Moderator-only actions
  const updateTimerState = useCallback((updates: Partial<SharedTimerState>) => {
    if (!isModeratorView) {
      console.warn('Only moderator can update timer state');
      return;
    }

    setTimerState(prev => {
      const newState = {
        ...prev,
        ...updates,
        lastUpdate: Date.now()
      };
      
      localStorage.setItem(storageKey, JSON.stringify(newState));
      return newState;
    });
  }, [isModeratorView, storageKey]);

  const startTimer = useCallback(() => {
    updateTimerState({ isRunning: true, isPaused: false });
  }, [updateTimerState]);

  const pauseTimer = useCallback(() => {
    updateTimerState({ isPaused: true });
  }, [updateTimerState]);

  const resumeTimer = useCallback(() => {
    updateTimerState({ isPaused: false });
  }, [updateTimerState]);

  const resetTimer = useCallback((newDuration?: number) => {
    updateTimerState({
      timeRemaining: newDuration ?? timerState.totalDuration,
      totalDuration: newDuration ?? timerState.totalDuration,
      isRunning: false,
      isPaused: false
    });
  }, [updateTimerState, timerState.totalDuration]);

  const extendTimer = useCallback((additionalSeconds: number) => {
    updateTimerState({
      timeRemaining: Math.max(0, timerState.timeRemaining + additionalSeconds)
    });
  }, [updateTimerState, timerState.timeRemaining]);

  const setCurrentBlock = useCallback((blockIndex: number, blockDuration: number) => {
    updateTimerState({
      currentBlockIndex: blockIndex,
      timeRemaining: blockDuration,
      totalDuration: blockDuration,
      isRunning: false,
      isPaused: false
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