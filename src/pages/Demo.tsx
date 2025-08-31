import { useState, useEffect, useCallback } from 'react';

// --- TYPES ---
interface SpeakerNote {
  id: string;
  minute: number;
  text: string;
}

interface TimerAdjustment {
  id: string;
  timestamp: string;
  action: string;
  amount: number;
}

// --- TIMER HOOK ---
const useTimer = (initialDuration: number) => {
  const [timeRemaining, setTimeRemaining] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeRemaining(initialDuration);
  }, [initialDuration]);

  const adjustTime = useCallback((seconds: number) => {
    setTimeRemaining(prev => Math.max(0, prev + seconds));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeRemaining]);

  const elapsedTime = initialDuration - timeRemaining;
  const currentMinute = Math.floor(elapsedTime / 60) + 1;

  return {
    timeRemaining,
    elapsedTime,
    currentMinute,
    isRunning,
    isPaused,
    start,
    pause,
    reset,
    adjustTime,
  };
};

// --- UTILITY FUNCTIONS ---
const formatTime = (seconds: number): string => {
  const mins = Math.floor(Math.abs(seconds) / 60).toString().padStart(2, '0');
  const secs = (Math.abs(seconds) % 60).toString().padStart(2, '0');
  return `${seconds < 0 ? '-' : ''}${mins}:${secs}`;
};

const getTimerColor = (seconds: number): string => {
  if (seconds <= 0) return 'text-red-500';
  if (seconds <= 60) return 'text-red-400';
  if (seconds <= 300) return 'text-yellow-400';
  return 'text-slate-800';
};

// --- COMPONENTS ---
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-lg border border-slate-200 p-6 transition-all duration-300 hover:shadow-xl ${className}`}>
    {children}
  </div>
);

const Button = ({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${className}`}
    {...props}
  >
    {children}
  </button>
);

// --- MAIN DEMO COMPONENT ---
export function StageCue() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'live' | 'speaker' | 'setup'>('dashboard');
  const [speakerNotes, setSpeakerNotes] = useState<SpeakerNote[]>([
    { id: '1', minute: 5, text: 'Introduce main concept' },
    { id: '2', minute: 10, text: 'Show first demo' },
    { id: '3', minute: 15, text: 'Q&A transition' },
  ]);
  const [timerAdjustments, setTimerAdjustments] = useState<TimerAdjustment[]>([]);
  const [newNoteMinute, setNewNoteMinute] = useState(1);
  const [newNoteText, setNewNoteText] = useState('');
  const [speakerMessage, setSpeakerMessage] = useState<string | null>(null);

  const timer = useTimer(1200); // 20 minutes default

  const addNote = () => {
    if (newNoteText.trim()) {
      const newNote: SpeakerNote = {
        id: Date.now().toString(),
        minute: newNoteMinute,
        text: newNoteText.trim(),
      };
      setSpeakerNotes(prev => [...prev, newNote].sort((a, b) => a.minute - b.minute));
      setNewNoteText('');
    }
  };

  const removeNote = (id: string) => {
    setSpeakerNotes(prev => prev.filter(note => note.id !== id));
  };

  const adjustTimer = (amount: number, action: string) => {
    timer.adjustTime(amount);
    const adjustment: TimerAdjustment = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      action,
      amount: Math.abs(amount),
    };
    setTimerAdjustments(prev => [adjustment, ...prev].slice(0, 10));
  };

  const sendMessage = (message: string) => {
    setSpeakerMessage(message);
    setTimeout(() => setSpeakerMessage(null), 5000);
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'live', label: 'Live Event', icon: '🎯' },
    { id: 'speaker', label: 'Speaker Portal', icon: '🎤' },
    { id: 'setup', label: 'Event Setup', icon: '⚙️' },
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      <Card>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Tech Summit 2024</h1>
        <p className="text-slate-600 mb-6">Event management dashboard</p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
            <div className="text-sm text-blue-700 font-medium">Total Sessions</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
            <div className="text-sm text-purple-700 font-medium">Speakers</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
            <div className="text-3xl font-bold text-teal-600 mb-2">247</div>
            <div className="text-sm text-teal-700 font-medium">Attendees</div>
          </div>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-700">Dr. Sarah Chen session started</span>
            <span className="text-xs text-slate-500 ml-auto">2:00 PM</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-slate-700">Speaker notes updated</span>
            <span className="text-xs text-slate-500 ml-auto">1:45 PM</span>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderLiveEvent = () => (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Timer */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">AI in Healthcare: Future Perspectives</h1>
          <p className="text-slate-600">Dr. Sarah Chen • Main Auditorium</p>
        </Card>

        <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 text-center">
          <div className={`text-8xl font-mono font-bold tracking-wider transition-all duration-500 ${getTimerColor(timer.timeRemaining)}`}>
            {formatTime(timer.timeRemaining)}
          </div>
          <div className="text-white/80 text-xl font-medium mt-4 mb-8">Session Time Remaining</div>
          
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              onClick={timer.start}
              disabled={timer.isRunning && !timer.isPaused}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              ▶ Start
            </Button>
            <Button
              onClick={timer.pause}
              disabled={!timer.isRunning}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              {timer.isPaused ? '▶ Resume' : '⏸ Pause'}
            </Button>
            <Button
              onClick={timer.reset}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              ↻ Reset
            </Button>
          </div>

          {/* Timer Adjustment Controls */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-white/70 text-sm mb-3">Adjust Timer</div>
            <div className="flex justify-center space-x-2">
              <Button
                onClick={() => adjustTimer(-300, 'Reduced by 5 minutes')}
                className="bg-red-400/80 hover:bg-red-500 text-white text-sm"
              >
                -5m
              </Button>
              <Button
                onClick={() => adjustTimer(-60, 'Reduced by 1 minute')}
                className="bg-red-400/80 hover:bg-red-500 text-white text-sm"
              >
                -1m
              </Button>
              <Button
                onClick={() => adjustTimer(60, 'Added 1 minute')}
                className="bg-green-400/80 hover:bg-green-500 text-white text-sm"
              >
                +1m
              </Button>
              <Button
                onClick={() => adjustTimer(300, 'Added 5 minutes')}
                className="bg-green-400/80 hover:bg-green-500 text-white text-sm"
              >
                +5m
              </Button>
            </div>
          </div>
        </div>

        {/* Speaker Notes Timeline */}
        <Card>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Speaker Notes Timeline</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {speakerNotes.map(note => {
              const isPast = timer.currentMinute > note.minute;
              const isCurrent = timer.currentMinute === note.minute;
              const statusClass = isCurrent 
                ? 'bg-green-100 border-green-500 scale-102 shadow-lg animate-pulse' 
                : isPast 
                ? 'bg-slate-100 border-slate-300 opacity-60' 
                : 'bg-blue-50 border-blue-500';

              return (
                <div
                  key={note.id}
                  className={`p-4 rounded-lg border-l-4 transition-all duration-500 hover:scale-102 hover:shadow-md ${statusClass}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-slate-800">
                        Minute {note.minute}
                      </span>
                      {isCurrent && (
                        <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeNote(note.id)}
                      className="text-red-400 hover:text-red-600 hover:scale-110 hover:rotate-90 transition-all duration-200"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-sm text-slate-700 mt-1">{note.text}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Add Speaker Note */}
        <Card>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Add Speaker Note</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Minute Mark
              </label>
              <select
                value={newNoteMinute}
                onChange={(e) => setNewNoteMinute(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
              >
                {Array.from({ length: 30 }, (_, i) => i + 1).map(minute => (
                  <option key={minute} value={minute}>
                    Minute {minute}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Note Text
              </label>
              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Enter your note..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 resize-none"
                rows={3}
              />
            </div>
            <Button
              onClick={addNote}
              disabled={!newNoteText.trim()}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            >
              Add Note
            </Button>
          </div>
        </Card>

        {/* Timer Activity */}
        <Card>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Timer Activity</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {timerAdjustments.length === 0 ? (
              <p className="text-sm text-slate-500">No timer adjustments yet</p>
            ) : (
              timerAdjustments.map(adj => (
                <div key={adj.id} className="p-3 bg-slate-50 rounded-lg text-sm">
                  <div className="font-medium text-slate-900">{adj.action}</div>
                  <div className="text-slate-500">{adj.timestamp}</div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Quick Messages */}
        <Card>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Messages</h3>
          <div className="grid grid-cols-2 gap-2">
            {['5 mins left', '2 mins left', 'Wrap up', 'Great pace!', 'Speak louder', 'Q&A ready'].map(msg => (
              <Button
                key={msg}
                onClick={() => sendMessage(msg)}
                className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200"
              >
                {msg}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderSpeakerPortal = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">AI in Healthcare: Future Perspectives</h1>
        <p className="text-slate-600">Dr. Sarah Chen • Main Auditorium</p>
        {speakerMessage && (
          <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg animate-bounce">
            <p className="font-semibold text-yellow-900">Message from Moderator:</p>
            <p className="text-yellow-800">{speakerMessage}</p>
          </div>
        )}
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800 rounded-2xl p-8 text-center">
          <div className={`text-7xl font-mono font-bold tracking-wider transition-all duration-500 ${getTimerColor(timer.timeRemaining) === 'text-slate-800' ? 'text-white' : getTimerColor(timer.timeRemaining)}`}>
            {formatTime(timer.timeRemaining)}
          </div>
          <div className="text-white/70 text-lg font-medium mt-3">Time Remaining</div>
          <div className="mt-4 text-white/60 text-sm">
            Current: Minute {timer.currentMinute}
          </div>
        </div>

        <Card>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Your Notes</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {speakerNotes.map(note => {
              const isPast = timer.currentMinute > note.minute;
              const isCurrent = timer.currentMinute === note.minute;
              const statusClass = isCurrent 
                ? 'bg-green-100 border-green-500 scale-102 shadow-lg animate-pulse' 
                : isPast 
                ? 'bg-slate-100 border-slate-300 opacity-60' 
                : 'bg-white border-slate-200';

              return (
                <div
                  key={note.id}
                  className={`p-4 rounded-lg border-l-4 transition-all duration-500 ${statusClass}`}
                >
                  <div className="font-bold text-sm text-slate-800 mb-1">
                    Minute {note.minute}
                    {isCurrent && (
                      <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                        Now
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-700">{note.text}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderSetup = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Event Setup</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Session Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Session Title</label>
                <input
                  type="text"
                  defaultValue="AI in Healthcare: Future Perspectives"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Speaker Name</label>
                <input
                  type="text"
                  defaultValue="Dr. Sarah Chen"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  defaultValue="20"
                  min="1"
                  max="120"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <input type="checkbox" defaultChecked className="rounded" />
                <div>
                  <div className="font-medium text-slate-900">Slack Notifications</div>
                  <div className="text-sm text-slate-600">#event-team channel</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <input type="checkbox" defaultChecked className="rounded" />
                <div>
                  <div className="font-medium text-slate-900">Email Alerts</div>
                  <div className="text-sm text-slate-600">moderators@event.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <input type="checkbox" className="rounded" />
                <div>
                  <div className="font-medium text-slate-900">SMS Alerts</div>
                  <div className="text-sm text-slate-600">Emergency only</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'live':
        return renderLiveEvent();
      case 'speaker':
        return renderSpeakerPortal();
      case 'setup':
        return renderSetup();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-slate-900">StageCue</span>
              </div>
              <nav className="hidden md:flex space-x-1">
                {navigationItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as any)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
                      currentPage === item.id
                        ? 'bg-teal-100 text-teal-700 shadow-md'
                        : 'text-slate-600 hover:text-teal-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 text-sm font-medium">Demo Mode</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
}