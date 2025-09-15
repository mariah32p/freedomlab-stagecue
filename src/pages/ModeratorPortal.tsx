import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSharedTimer } from '../hooks/useSharedTimer';

export function ModeratorPortal() {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<any>(null);
  const [timeBlocks, setTimeBlocks] = useState<any[]>([]);
  const [speakers, setSpeakers] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [notifications, setNotifications] = useState<string[]>([]);
  
  // Fetch event data without authentication
  useEffect(() => {
    const fetchEventData = async () => {
      if (!eventId) return;
      
      try {
        // For now, use mock data - in production this would be a public API endpoint
        const mockEvent = {
          id: eventId,
          name: 'Tech Summit 2025',
          date: '2025-01-25',
          total_duration: 120,
          status: 'live'
        };
        
        const mockTimeBlocks = [
          {
            id: '1',
            event_id: eventId,
            title: 'Opening Keynote',
            duration: 30,
            type: 'session',
            order_index: 0,
            start_time: 0
          },
          {
            id: '2',
            event_id: eventId,
            title: 'Coffee Break',
            duration: 15,
            type: 'break',
            order_index: 1,
            start_time: 30
          },
          {
            id: '3',
            event_id: eventId,
            title: 'Panel Discussion',
            duration: 45,
            type: 'session',
            order_index: 2,
            start_time: 45
          }
        ];
        
        const mockSpeakers = [
          {
            id: '1',
            time_block_id: '1',
            name: 'Dr. Sarah Chen',
            email: 'sarah@example.com'
          },
          {
            id: '2',
            time_block_id: '3',
            name: 'Alex Rodriguez',
            email: 'alex@example.com'
          }
        ];
        
        const mockNotes = [
          {
            id: '1',
            speaker_id: '1',
            time_marker: 300, // 5 minutes
            content: 'Introduce the new AI features',
            type: 'essential'
          },
          {
            id: '2',
            speaker_id: '1',
            time_marker: 1200, // 20 minutes
            content: 'Wrap up and transition to Q&A',
            type: 'transition'
          }
        ];
        
        setEvent(mockEvent);
        setTimeBlocks(mockTimeBlocks);
        setSpeakers(mockSpeakers);
        setNotes(mockNotes);
      } catch (error) {
        console.error('Error fetching event data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEventData();
  }, [eventId]);
  
  const getSpeakersForBlock = (blockId: string) => {
    return speakers.filter(speaker => speaker.time_block_id === blockId);
  };
  
  const getNotesForSpeaker = (speakerId: string) => {
    return notes.filter(note => note.speaker_id === speakerId)
      .sort((a, b) => a.time_marker - b.time_marker);
  };
  
  const eventBlocks = timeBlocks.filter(block => block.event_id === eventId)
    .sort((a, b) => a.order_index - b.order_index);
  const currentBlock = eventBlocks[currentBlockIndex];
  const currentBlockSpeakers = currentBlock ? getSpeakersForBlock(currentBlock.id) : [];
  
  const { 
    timerState, 
    loading: timerLoading,
    startTimer, 
    pauseTimer, 
    resumeTimer, 
    extendTimer, 
    resetTimer, 
    setCurrentBlock,
    formatTime, 
    getProgress 
  } = useSharedTimer(eventId || '', true); // true = moderator view

  // Update shared timer when time block changes
  useEffect(() => {
    if (currentBlock) {
      setCurrentBlock(currentBlockIndex, currentBlock.id, currentBlock.duration * 60);
    }
  }, [currentBlock?.id, currentBlockIndex, setCurrentBlock]);

  // Add notifications when timer hits certain thresholds
  useEffect(() => {
    if (timerState.isRunning && !timerState.isPaused) {
      if (timerState.timeRemaining === 300) { // 5 minutes
        addNotification('⏰ 5 minutes remaining');
      } else if (timerState.timeRemaining === 120) { // 2 minutes
        addNotification('⚠️ 2 minutes remaining');
      } else if (timerState.timeRemaining === 30) { // 30 seconds
        addNotification('🔔 30 seconds remaining');
      } else if (timerState.timeRemaining === 0) {
        addNotification('⏱️ Time is up!');
      }
    }
  }, [timerState.timeRemaining, timerState.isRunning, timerState.isPaused]);

  const addNotification = (message: string) => {
    setNotifications(prev => [message, ...prev.slice(0, 4)]); // Keep last 5 notifications
  };

  const handleNextBlock = () => {
    if (currentBlockIndex < eventBlocks.length - 1) {
      const newIndex = currentBlockIndex + 1;
      setCurrentBlockIndex(newIndex);
      const nextBlock = eventBlocks[currentBlockIndex + 1];
      addNotification(`🎤 Now starting: ${nextBlock?.title}`);
    }
  };

  const handlePreviousBlock = () => {
    if (currentBlockIndex > 0) {
      const newIndex = currentBlockIndex - 1;
      setCurrentBlockIndex(newIndex);
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

  const handleCopyDisplayLink = () => {
    if (currentBlock) {
      const displayUrl = `${window.location.origin}/display/${eventId}/${currentBlock.id}`;
      navigator.clipboard.writeText(displayUrl);
      addNotification('📋 Display link copied to clipboard');
    }
  };

  // Get all notes for speakers in current block
  const currentNotes = currentBlockSpeakers.flatMap(speaker => 
    getNotesForSpeaker(speaker.id)
  ).sort((a, b) => a.time_marker - b.time_marker);

  if (loading || timerLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-navy-600">Loading event...</p>
        </div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy-900 mb-4">Event Not Found</h1>
          <p className="text-navy-600">The requested event could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">
            Moderator Portal
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-teal-600 mb-2">
            {event.name}
          </h2>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <a
              href={`/events/${eventId}`}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              ← Back to Event Management
            </a>
          </div>
          <p className="text-navy-600">
            {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Timer Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-red-600">LIVE MODERATOR VIEW</span>
                </div>
                <span className="text-sm text-navy-600">
                  Block {currentBlockIndex + 1} of {eventBlocks.length}
                </span>
              </div>

              <div className="text-center mb-6">
                <div className={`text-6xl md:text-8xl font-mono font-bold mb-4 transition-colors duration-500 ${
                  timerState.timeRemaining < 300 ? 'text-red-500 animate-pulse' : 'text-navy-900'
                }`}>
                  {formatTime(timerState.timeRemaining)}
                </div>
                <div className="text-navy-600 text-lg mb-4">Time Remaining</div>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-3 mb-6">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      timerState.timeRemaining < 300 ? 'bg-red-500' : 'bg-gradient-to-r from-teal-500 to-purple-500'
                    }`}
                    style={{ width: `${getProgress()}%` }}
                  ></div>
                </div>

                {/* Current Block Info */}
                {currentBlock && (
                  <div className="bg-slate-50 rounded-lg p-6 mb-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                        currentBlock.type === 'session' ? 'bg-blue-100 text-blue-800' :
                        currentBlock.type === 'break' ? 'bg-green-100 text-green-800' :
                        currentBlock.type === 'qa' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {currentBlock.type}
                      </span>
                    </div>
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
                <div className="flex justify-center space-x-3 mb-4">
                  {!timerState.isRunning ? (
                    <button
                      onClick={startTimer}
                      className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-3"
                    >
                      Start Timer
                    </button>
                  ) : timerState.isPaused ? (
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
                    onClick={() => resetTimer()}
                    className="btn bg-slate-500 hover:bg-slate-600 text-white px-4 py-3"
                  >
                    Reset
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={handleCopyDisplayLink}
                    className="btn bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 text-sm"
                  >
                    Copy Display Link
                  </button>
                  <button
                    onClick={handleSlackAlert}
                    className="btn bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm"
                  >
                    Send Alert
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Speaker Notes */}
            {currentNotes.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
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
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
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
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
              <h3 className="font-semibold text-navy-900 mb-4">Team Status</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-navy-700">Moderator Active</span>
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

            {/* Event Info */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
              <h3 className="font-semibold text-navy-900 mb-4">Event Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-navy-600">Total Duration:</span>
                  <span className="font-medium">{event.total_duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-600">Time Blocks:</span>
                  <span className="font-medium">{eventBlocks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-600">Status:</span>
                  <span className={`font-medium capitalize ${
                    event.status === 'live' ? 'text-green-600' : 
                    event.status === 'completed' ? 'text-blue-600' : 'text-navy-600'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}