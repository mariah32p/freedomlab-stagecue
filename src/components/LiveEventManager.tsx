import { useState, useEffect } from 'react';
import { Event, TimeBlock } from '../types/event';
import { useTimer } from '../hooks/useTimer';
import { useTimeBlocks } from '../hooks/useTimeBlocks';

interface LiveEventManagerProps {
  event: Event;
  onClose: () => void;
  isOpen: boolean;
}

export function LiveEventManager({ event, onClose, isOpen }: LiveEventManagerProps) {
  const { timeBlocks, speakers, getSpeakersForBlock, getNotesForSpeaker } = useTimeBlocks(event.id);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [notifications, setNotifications] = useState<string[]>([]);
  
  const eventBlocks = timeBlocks.filter(block => block.event_id === event.id)
    .sort((a, b) => a.order_index - b.order_index);
  const currentBlock = eventBlocks[currentBlockIndex];
  const blockDurationInSeconds = currentBlock ? currentBlock.duration * 60 : 0;
  const currentBlockSpeakers = currentBlock ? getSpeakersForBlock(currentBlock.id) : [];
  
  const { timer, startTimer, pauseTimer, resumeTimer, extendTimer, resetTimer, formatTime, getProgress } = useTimer(blockDurationInSeconds, false);

  // Update timer when time block changes
  useEffect(() => {
    if (currentBlock) {
      resetTimer(currentBlock.duration * 60);
    }
  }, [currentBlock?.id, resetTimer]);

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

  const handleNextBlock = () => {
    if (currentBlockIndex < eventBlocks.length - 1) {
      setCurrentBlockIndex(prev => prev + 1);
      const nextBlock = eventBlocks[currentBlockIndex + 1];
      addNotification(`🎤 Now starting: ${nextBlock?.title}`);
    }
  };

  const handlePreviousBlock = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(prev => prev - 1);
      const prevBlock = eventBlocks[currentBlockIndex - 1];
      addNotification(`🎤 Back to: ${prevBlock?.title}`);
    }
  };

  const handleExtend = (minutes: number) => {
    extendTimer(minutes * 60);
    addNotification(`⏰ Extended session by ${minutes} minutes`);
  };

  const handleSlackAlert = () => {
    addNotification('📢 Slack alert sent to #event-team');
  };

  // Get all notes for speakers in current block
  const currentNotes = currentBlockSpeakers.flatMap(speaker => 
    getNotesForSpeaker(speaker.id)
  ).sort((a, b) => a.time_marker - b.time_marker);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
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
                  Block {currentBlockIndex + 1} of {eventBlocks.length}
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
                  <button
                    onClick={() => {
                      const moderatorUrl = `${window.location.origin}/moderator/${event.id}`;
                      window.open(moderatorUrl, '_blank');
                    }}
                    className="flex-1 btn bg-teal-600 hover:bg-teal-700 text-white py-3"
                  >
                    Open Moderator Portal
                  </button>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-3 mb-6">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      timer.timeRemaining < 300 ? 'bg-red-500' : 'bg-gradient-to-r from-teal-500 to-purple-500'
                    }`}
                    style={{ width: `${getProgress()}%` }}
                  ></div>
                </div>
                {currentBlock && (
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900 mb-2">{currentBlock.title}</h3>
                    <p className="text-sm text-navy-500">{currentBlock.duration} minutes allocated</p>
                    
                    {/* Show speakers in this block */}
                    {currentBlockSpeakers.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <div className="text-sm text-navy-600 mb-2">Speakers:</div>
                        <div className="space-y-1">
                          {currentBlockSpeakers.map(speaker => (
                            <div key={speaker.id} className="text-navy-900 font-medium">
                              {speaker.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
                    onClick={() => handleExtend(1)}
                    className="btn bg-blue-400 hover:bg-blue-500 text-white px-4 py-3"
                  >
                    +1 min
                  </button>
                  
                  <button
                    onClick={() => extendTimer(-60)}
                    className="btn bg-orange-400 hover:bg-orange-500 text-white px-4 py-3"
                  >
                    -1 min
                  </button>
                  
                  <button
                    onClick={() => resetTimer()}
                    className="btn bg-slate-500 hover:bg-slate-600 text-white px-4 py-3"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Block Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePreviousBlock}
                  disabled={currentBlockIndex === 0}
                  className="btn bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-300 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous Block
                </button>
                
                <div className="text-center">
                  <div className="text-sm text-navy-600">
                    {currentBlockIndex + 1} of {eventBlocks.length}
                  </div>
                </div>
                
                <button
                  onClick={handleNextBlock}
                  disabled={currentBlockIndex === eventBlocks.length - 1}
                  className="btn bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-300 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Block →
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
                </div>
              </div>

              {/* Speaker Notes */}
              {currentNotes.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <h3 className="font-semibold text-navy-900 mb-4">
                    Speaker Notes {currentBlockSpeakers.length > 1 ? '(All Speakers)' : ''}
                  </h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                    {currentNotes.map((note) => {
                      const noteTime = Math.floor(note.time_marker / 60);
                      const noteSeconds = note.time_marker % 60;
                      const timeString = `${noteTime}:${noteSeconds.toString().padStart(2, '0')}`;
                      
                      // Find which speaker this note belongs to
                      const noteSpeaker = currentBlockSpeakers.find(s => s.id === note.speaker_id);
                      
                      const typeColors = {
                        essential: 'bg-blue-50 border-blue-200 text-blue-800',
                        optional: 'bg-slate-50 border-slate-200 text-slate-600',
                        transition: 'bg-purple-50 border-purple-200 text-purple-800'
                      };

                      return (
                        <div key={note.id} className={`p-3 rounded-lg border ${typeColors[note.type]}`}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-medium">{timeString}</span>
                              {currentBlockSpeakers.length > 1 && noteSpeaker && (
                                <span className="text-xs text-navy-500">({noteSpeaker.name})</span>
                              )}
                            </div>
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