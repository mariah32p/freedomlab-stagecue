import { useState, useEffect } from 'react';
import { Event, Speaker } from '../types/event';
import { useTimer } from '../hooks/useTimer';
import { useSpeakers } from '../hooks/useSpeakers';

interface LiveEventManagerProps {
  event: Event;
  onClose: () => void;
  isOpen: boolean;
}

export function LiveEventManager({ event, onClose, isOpen }: LiveEventManagerProps) {
  const { speakers, getNotesForSpeaker } = useSpeakers(event.id);
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);
  const [notifications, setNotifications] = useState<string[]>([]);
  
  const currentSpeaker = speakers[currentSpeakerIndex];
  const speakerDurationInSeconds = currentSpeaker ? currentSpeaker.duration * 60 : 0;
  
  const { timer, startTimer, pauseTimer, resumeTimer, extendTimer, resetTimer, formatTime, getProgress } = useTimer(speakerDurationInSeconds);

  // Update timer when speaker changes
  useEffect(() => {
    if (currentSpeaker) {
      resetTimer(currentSpeaker.duration * 60);
    }
  }, [currentSpeaker, resetTimer]);

  // Add notifications when timer hits certain thresholds
  useEffect(() => {
    if (timer.isRunning && !timer.isPaused) {
      if (timer.timeRemaining === 300) { // 5 minutes
        addNotification('⏰ 5 minutes remaining');
      } else if (timer.timeRemaining === 120) { // 2 minutes
        addNotification('⚠️ 2 minutes remaining');
      } else if (timer.timeRemaining === 30) { // 30 seconds
        addNotification('🔔 30 seconds remaining');
      } else if (timer.timeRemaining === 0) {
        addNotification('⏱️ Time is up!');
      }
    }
  }, [timer.timeRemaining, timer.isRunning, timer.isPaused]);

  const addNotification = (message: string) => {
    setNotifications(prev => [message, ...prev.slice(0, 4)]); // Keep last 5 notifications
  };

  const handleNextSpeaker = () => {
    if (currentSpeakerIndex < speakers.length - 1) {
      setCurrentSpeakerIndex(prev => prev + 1);
      addNotification(`🎤 Now presenting: ${speakers[currentSpeakerIndex + 1]?.name}`);
    }
  };

  const handlePreviousSpeaker = () => {
    if (currentSpeakerIndex > 0) {
      setCurrentSpeakerIndex(prev => prev - 1);
      addNotification(`🎤 Back to: ${speakers[currentSpeakerIndex - 1]?.name}`);
    }
  };

  const handleExtend = (minutes: number) => {
    extendTimer(minutes * 60);
    addNotification(`⏰ Extended session by ${minutes} minutes`);
  };

  const handleSlackAlert = () => {
    addNotification('📢 Slack alert sent to #event-team');
  };

  const currentNotes = currentSpeaker ? getNotesForSpeaker(currentSpeaker.id) : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-navy-900">{event.name}</h2>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-red-600">LIVE EVENT</span>
                </div>
                <span className="text-sm text-navy-600">
                  Speaker {currentSpeakerIndex + 1} of {speakers.length}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Timer Display */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl p-8 text-center mb-6">
                <div className={`text-6xl md:text-8xl font-mono font-bold mb-4 transition-colors duration-500 ${
                  timer.timeRemaining < 300 ? 'text-red-500 animate-pulse' : 'text-navy-900'
                }`}>
                  {formatTime(timer.timeRemaining)}
                </div>
                <div className="text-navy-600 text-lg mb-4">Time Remaining</div>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-3 mb-6">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      timer.timeRemaining < 300 ? 'bg-red-500' : 'bg-gradient-to-r from-teal-500 to-purple-500'
                    }`}
                    style={{ width: `${getProgress()}%` }}
                  ></div>
                </div>

                {/* Current Speaker Info */}
                {currentSpeaker && (
                  <div className="bg-white rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-navy-900">{currentSpeaker.name}</h3>
                    <p className="text-navy-600">{currentSpeaker.session_title}</p>
                    <p className="text-sm text-navy-500 mt-1">{currentSpeaker.duration} minutes allocated</p>
                  </div>
                )}

                {/* Timer Controls */}
                <div className="flex justify-center space-x-3">
                  {!timer.isRunning ? (
                    <button
                      onClick={startTimer}
                      className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-3"
                    >
                      Start Timer
                    </button>
                  ) : timer.isPaused ? (
                    <button
                      onClick={resumeTimer}
                      className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                    >
                      Resume
                    </button>
                  ) : (
                    <button
                      onClick={pauseTimer}
                      className="btn bg-amber-600 hover:bg-amber-700 text-white px-6 py-3"
                    >
                      Pause
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleExtend(5)}
                    className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-3"
                  >
                    +5 min
                  </button>
                  
                  <button
                    onClick={() => resetTimer()}
                    className="btn bg-slate-500 hover:bg-slate-600 text-white px-4 py-3"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Speaker Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePreviousSpeaker}
                  disabled={currentSpeakerIndex === 0}
                  className="btn btn-outline px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous Speaker
                </button>
                
                <div className="text-center">
                  <div className="text-sm text-navy-600">
                    {currentSpeakerIndex + 1} of {speakers.length}
                  </div>
                </div>
                
                <button
                  onClick={handleNextSpeaker}
                  disabled={currentSpeakerIndex === speakers.length - 1}
                  className="btn btn-outline px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Speaker →
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-navy-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={handleSlackAlert}
                    className="w-full btn bg-purple-600 hover:bg-purple-700 text-white py-2 text-sm"
                  >
                    Send Slack Alert
                  </button>
                  <button
                    onClick={() => handleExtend(10)}
                    className="w-full btn bg-amber-500 hover:bg-amber-600 text-white py-2 text-sm"
                  >
                    Extend +10 min
                  </button>
                  <button
                    onClick={() => handleExtend(15)}
                    className="w-full btn bg-orange-500 hover:bg-orange-600 text-white py-2 text-sm"
                  >
                    Extend +15 min
                  </button>
                </div>
              </div>

              {/* Speaker Notes */}
              {currentSpeaker && currentNotes.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <h3 className="font-semibold text-navy-900 mb-4">Speaker Notes</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                    {currentNotes.map((note) => {
                      const noteTime = Math.floor(note.time_marker / 60);
                      const noteSeconds = note.time_marker % 60;
                      const timeString = `${noteTime}:${noteSeconds.toString().padStart(2, '0')}`;
                      
                      const typeColors = {
                        essential: 'bg-blue-50 border-blue-200 text-blue-800',
                        optional: 'bg-slate-50 border-slate-200 text-slate-600',
                        transition: 'bg-purple-50 border-purple-200 text-purple-800'
                      };

                      return (
                        <div key={note.id} className={`p-3 rounded-lg border ${typeColors[note.type]}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium">{timeString}</span>
                            <span className="text-xs px-2 py-0.5 bg-white/50 rounded capitalize">
                              {note.type}
                            </span>
                          </div>
                          <div className="text-sm">{note.content}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Live Notifications */}
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-navy-900 mb-4">Live Updates</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-sm text-navy-500 text-center py-4">
                      No notifications yet
                    </p>
                  ) : (
                    notifications.map((notification, index) => (
                      <div key={index} className="text-sm p-2 bg-slate-50 rounded border border-slate-200">
                        {notification}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Team Status */}
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-navy-900 mb-4">Team Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-navy-700">Moderator Ready</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-navy-700">Speakers Online</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-navy-700">Tech Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}