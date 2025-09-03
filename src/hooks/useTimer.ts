import { useState, useEffect, useCallback } from 'react';

export interface TimerState {
  timeRemaining: number; // in seconds
  isRunning: boolean;
  isPaused: boolean;
  totalDuration: number; // in seconds
  startTime?: Date;
  endTime?: Date;
}

export function useTimer(initialDuration: number = 0, autoStart: boolean = false) {
  const [timer, setTimer] = useState<TimerState>({
    timeRemaining: initialDuration,
    isRunning: autoStart,
    isPaused: false,
    totalDuration: initialDuration,
  });

  // Update timer when initialDuration changes
  useEffect(() => {
    setTimer(prev => ({
      ...prev,
      timeRemaining: initialDuration,
      totalDuration: initialDuration,
      isRunning: autoStart
    }));
  }, [initialDuration, autoStart]);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer.isRunning && !timer.isPaused && timer.timeRemaining > 0) {
      interval = setInterval(() => {
        setTimer(prev => ({
          ...prev,
          timeRemaining: Math.max(0, prev.timeRemaining - 1)
        }));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer.isRunning, timer.isPaused, timer.timeRemaining]);

  const startTimer = useCallback(() => {
    setTimer(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      startTime: new Date()
    }));
  }, []);

  const pauseTimer = useCallback(() => {
    setTimer(prev => ({
      ...prev,
      isPaused: true
    }));
  }, []);

  const resumeTimer = useCallback(() => {
    setTimer(prev => ({
      ...prev,
      isPaused: false
    }));
  }, []);

  const stopTimer = useCallback(() => {
    setTimer(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      timeRemaining: prev.totalDuration,
      endTime: new Date()
    }));
  }, []);

  const extendTimer = useCallback((additionalSeconds: number) => {
    setTimer(prev => ({
      ...prev,
      timeRemaining: Math.max(0, prev.timeRemaining + additionalSeconds)
    }));
  }, []);

  const resetTimer = useCallback((newDuration?: number) => {
    const duration = newDuration ?? timer.totalDuration;
    setTimer({
      timeRemaining: duration,
      isRunning: false,
      isPaused: false,
      totalDuration: duration
    });
  }, [timer.totalDuration]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const getProgress = useCallback(() => {
    if (timer.totalDuration === 0) return 0;
    return ((timer.totalDuration - timer.timeRemaining) / timer.totalDuration) * 100;
  }, [timer.timeRemaining, timer.totalDuration]);

  return {
    timer,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    extendTimer,
    resetTimer,
    formatTime,
    getProgress
  };
}