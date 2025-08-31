import { useState, useEffect } from 'react';

interface SpeakerNote {
  id: string;
  minute: number;
  note: string;
  timestamp: Date;
}

interface TimerActivity {
  id: string;
  action: string;
  amount: number;
  timestamp: Date;
}

export function Demo() {
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSlackModal, setShowSlackModal] = useState(false);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [speakerNotes, setSpeakerNotes] = useState<SpeakerNote[]>([
    {
      id: '1',
      minute: 5,
      note: 'Introduce main thesis - AI diagnostic accuracy',
      timestamp: new Date()
    },
    {
      id: '2', 
      minute: 15,
      note: 'Show case study examples and data visualization',
      timestamp: new Date()
    },
    {
      id: '3',
      minute: 25,
      note: 'Wrap up with implementation roadmap',
      timestamp: new Date()
    }
  ]);
  const [newNoteMinute, setNewNoteMinute] = useState(10);
  const [newNoteText, setNewNoteText] = useState('');
  const [timerActivity, setTimerActivity] = useState<TimerActivity[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          
          // Trigger alerts
          if (newTime === 300) { // 5 minutes
            setShowSlackModal(true);
          } else if (newTime === 120) { // 2 minutes
            setShowSlackModal(true);
          } else if (newTime === 0) { // Time's up
            setShowExtendModal(true);
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    const sign = seconds < 0 ? '-' : '';
    return `${sign}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentMinute = () => {
    const totalMinutes = 30;
    const remainingMinutes = Math.ceil(timeRemaining / 60);
    return totalMinutes - remainingMinutes + 1;
  };

  const getTimerColor = () => {
    if (timeRemaining <= 0) return 'text-red-400';
    if (timeRemaining <= 120) return 'text-red-400';
    if (timeRemaining <= 300) return 'text-yellow-400';
    return 'text-white';
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    addActivity('Started timer', 0);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    addActivity(isPaused ? 'Resumed timer' : 'Paused timer', 0);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeRemaining(1800);
    addActivity('Reset timer', 0);
  };

  const adjustTime = (minutes: number) => {
    setTimeRemaining(prev => Math.max(0, prev + (minutes * 60)));
    addActivity(minutes > 0 ? 'Added time' : 'Reduced time', Math.abs(minutes));
  };

  const addActivity = (action: string, amount: number) => {
    const newActivity: TimerActivity = {
      id: Date.now().toString(),
      action,
      amount,
      timestamp: new Date()
    };
    setTimerActivity(prev => [newActivity, ...prev.slice(0, 4)]);
  };

  const addSpeakerNote = () => {
    if (!newNoteText.trim()) return;
    
    const newNote: SpeakerNote = {
      id: Date.now().toString(),
      minute: newNoteMinute,
      note: newNoteText.trim(),
      timestamp: new Date()
    };
    
    setSpeakerNotes(prev => [...prev, newNote].sort((a, b) => a.minute - b.minute));
    setNewNoteText('');
  };

  const removeSpeakerNote = (id: string) => {
    setSpeakerNotes(prev => prev.filter(note => note.id !== id));
  };

  const getNoteStatus = (minute: number) => {
    const currentMinute = getCurrentMinute();
    if (minute < currentMinute) return 'past';
    if (minute === currentMinute) return 'current';
    return 'future';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Professional Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-slate-900">StageCue</span>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-slate-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">Dashboard</a>
                <a href="#" className="text-teal-600 px-3 py-2 text-sm font-medium">Events</a>
                <a href="#" className="text-slate-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">Speakers</a>
                <a href="#" className="text-slate-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">Settings</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-sm">SC</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-slate-900">Sarah Chen</div>
                  <div className="text-xs text-purple-600 font-medium">Pro Plan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">AI in Healthcare: Future Perspectives</h1>
              <p className="text-slate-600 mt-1">Dr. Sarah Chen • Main Auditorium • 247 attendees</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm font-medium">Live Session</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Timer */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timer Display */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
              <div className="relative">
                <div className={`text-8xl font-mono font-bold mb-4 tracking-wider ${getTimerColor()}`}>
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-white/80 text-xl mb-8 font-medium">Session Time Remaining</div>
                
                {/* Timer Controls */}
                <div className="flex justify-center space-x-4 mb-6">
                  <button
                    onClick={handleStart}
                    disabled={isRunning && !isPaused}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                  >
                    Start
                  </button>
                  <button
                    onClick={handlePause}
                    disabled={!isRunning}
                    className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                  >
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                  <button
                    onClick={handleStop}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Reset
                  </button>
                </div>

                {/* Time Adjustment Controls */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-white/60 text-sm mb-3 uppercase tracking-wide">Adjust Time</div>
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => adjustTime(-5)}
                      className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-110 hover:shadow-md active:scale-95"
                    >
                      -5m
                    </button>
                    <button
                      onClick={() => adjustTime(-1)}
                      className="px-4 py-2 bg-red-500/60 hover:bg-red-500/80 text-white rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-110 hover:shadow-md active:scale-95"
                    >
                      -1m
                    </button>
                    <button
                      onClick={() => adjustTime(1)}
                      className="px-4 py-2 bg-green-500/60 hover:bg-green-500/80 text-white rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-110 hover:shadow-md active:scale-95"
                    >
                      +1m
                    </button>
                    <button
                      onClick={() => adjustTime(5)}
                      className="px-4 py-2 bg-green-500/80 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-110 hover:shadow-md active:scale-95"
                    >
                      +5m
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 text-lg mb-4">Timer Activity</h3>
              <div className="space-y-3">
                {timerActivity.length === 0 ? (
                  <p className="text-slate-500 text-sm">No timer activity yet</p>
                ) : (
                  timerActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium text-slate-900">{activity.action}</span>
                        {activity.amount > 0 && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {activity.amount}m
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">
                        {activity.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Speaker Notes Panel */}
          <div className="space-y-6">
            {/* Add New Note */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 text-lg mb-4">Add Speaker Note</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Minute Mark
                  </label>
                  <select
                    value={newNoteMinute}
                    onChange={(e) => setNewNoteMinute(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    {Array.from({ length: 30 }, (_, i) => i + 1).map(minute => (
                      <option key={minute} value={minute}>
                        {minute} minute{minute !== 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Note
                  </label>
                  <textarea
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add your speaker note..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                    rows={3}
                  />
                </div>
                <button
                  onClick={addSpeakerNote}
                  disabled={!newNoteText.trim()}
                  className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 disabled:transform-none disabled:shadow-none"
                >
                  Add Note
                </button>
              </div>
            </div>

            {/* Speaker Notes Timeline */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 text-lg mb-4">Speaker Notes Timeline</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {speakerNotes.length === 0 ? (
                  <p className="text-slate-500 text-sm">No speaker notes yet</p>
                ) : (
                  speakerNotes.map((note) => {
                    const status = getNoteStatus(note.minute);
                    const currentMinute = getCurrentMinute();
                    
                    return (
                      <div
                        key={note.id}
                        className={`p-4 rounded-lg border-l-4 transition-all duration-500 transform hover:scale-102 hover:shadow-md ${
                          status === 'current'
                            ? 'bg-green-50 border-green-500 animate-pulse'
                            : status === 'past'
                            ? 'bg-slate-50 border-slate-300'
                            : 'bg-blue-50 border-blue-500'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className={`text-sm font-bold ${
                                status === 'current'
                                  ? 'text-green-700'
                                  : status === 'past'
                                  ? 'text-slate-500'
                                  : 'text-blue-700'
                              }`}>
                                {note.minute} minute{note.minute !== 1 ? 's' : ''}
                              </span>
                              {status === 'current' && (
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                  Current
                                </span>
                              )}
                              {status === 'past' && (
                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-medium">
                                  Completed
                                </span>
                              )}
                            </div>
                            <p className={`text-sm ${
                              status === 'past' ? 'text-slate-500' : 'text-slate-700'
                            }`}>
                              {note.note}
                            </p>
                          </div>
                          <button
                            onClick={() => removeSpeakerNote(note.id)}
                            className="text-slate-400 hover:text-red-500 transition-all duration-200 transform hover:scale-110 hover:rotate-90 ml-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Session Progress */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 text-lg mb-4">Session Progress</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    {getCurrentMinute()}/30
                  </div>
                  <div className="text-sm text-slate-600">Minutes elapsed</div>
                </div>
                
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${((30 * 60 - timeRemaining) / (30 * 60)) * 100}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-lg font-bold text-slate-900">
                      {Math.floor((30 * 60 - timeRemaining) / 60)}m
                    </div>
                    <div className="text-xs text-slate-500">Elapsed</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-lg font-bold text-slate-900">
                      {Math.ceil(timeRemaining / 60)}m
                    </div>
                    <div className="text-xs text-slate-500">Remaining</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slack Notification Modal */}
      {showSlackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.042 15.165a2.528 2.528 0 0 0 2.5 2.5c1.61 0 2.5-.89 2.5-2.5a2.528 2.528 0 0 0-2.5-2.5c-1.61 0-2.5.89-2.5 2.5zM17.5 15.165a2.528 2.528 0 0 0 2.5 2.5c1.61 0 2.5-.89 2.5-2.5a2.528 2.528 0 0 0-2.5-2.5c-1.61 0-2.5.89-2.5 2.5z"/>
                  <path d="M22.5 6.908c0-.6-.4-1-.9-1-.5 0-.9.4-.9 1 0 .6.4 1 .9 1 .5 0 .9-.4.9-1z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Slack Notification Sent</h3>
              <p className="text-slate-600">
                {timeRemaining <= 120 ? '2-minute warning' : '5-minute warning'} sent to #event-team
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-slate-600 mb-2">Message sent:</div>
              <div className="text-sm font-medium text-slate-900">
                "⏰ {timeRemaining <= 120 ? '2 minutes' : '5 minutes'} remaining for Dr. Sarah Chen's session in Main Auditorium"
              </div>
            </div>
            <button
              onClick={() => setShowSlackModal(false)}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Time Extension Modal */}
      {showExtendModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Time's Up!</h3>
              <p className="text-slate-600">
                Dr. Sarah Chen's session has reached the scheduled end time.
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => {
                  adjustTime(5);
                  setShowExtendModal(false);
                }}
                className="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Extend by 5 minutes
              </button>
              <button
                onClick={() => {
                  adjustTime(2);
                  setShowExtendModal(false);
                }}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Extend by 2 minutes
              </button>
              <button
                onClick={() => {
                  handleStop();
                  setShowExtendModal(false);
                }}
                className="w-full px-4 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
              >
                End Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}