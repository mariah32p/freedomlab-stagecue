import { useState, useEffect } from 'react';

export function StageCue() {
  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes
  const [currentMinute, setCurrentMinute] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'live' | 'speaker' | 'setup'>('live');
  const [demoStep, setDemoStep] = useState(0);

  // Auto-navigate through demo steps
  useEffect(() => {
    const demoSequence = [
      { tab: 'dashboard', duration: 5000 },
      { tab: 'setup', duration: 4000 },
      { tab: 'live', duration: 8000 },
      { tab: 'speaker', duration: 6000 },
    ];

    const interval = setInterval(() => {
      setDemoStep(prev => {
        const nextStep = (prev + 1) % demoSequence.length;
        setActiveTab(demoSequence[nextStep].tab as any);
        return nextStep;
      });
    }, demoSequence[demoStep]?.duration || 5000);

    return () => clearInterval(interval);
  }, [demoStep]);

  // Auto-play timer
  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        const elapsed = 1200 - newTime;
        setCurrentMinute(Math.floor(elapsed / 60) + 1);
        return Math.max(0, newTime);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  // Auto-advance speaker notes
  useEffect(() => {
    const noteInterval = setInterval(() => {
      setCurrentNoteIndex(prev => (prev + 1) % speakerNotes.length);
    }, 8000);

    return () => clearInterval(noteInterval);
  }, []);

  const speakerNotes = [
    { minute: 2, text: "Welcome audience and introduce topic", active: currentMinute >= 2 },
    { minute: 5, text: "Present first key concept with slides", active: currentMinute >= 5 },
    { minute: 8, text: "Show live demonstration", active: currentMinute >= 8 },
    { minute: 12, text: "Discuss real-world applications", active: currentMinute >= 12 },
    { minute: 15, text: "Address common challenges", active: currentMinute >= 15 },
    { minute: 18, text: "Prepare for Q&A transition", active: currentMinute >= 18 },
  ];

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(Math.abs(seconds) / 60).toString().padStart(2, '0');
    const secs = (Math.abs(seconds) % 60).toString().padStart(2, '0');
    return `${seconds < 0 ? '-' : ''}${mins}:${secs}`;
  };

  const getTimerColor = () => {
    if (timeRemaining <= 0) return 'text-red-600';
    if (timeRemaining <= 120) return 'text-red-500';
    if (timeRemaining <= 300) return 'text-amber-500';
    return 'text-blue-600';
  };

  const adjustTime = (seconds: number) => {
    setTimeRemaining(prev => Math.max(0, prev + seconds));
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Event Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Tech Summit 2024</h2>
              <p className="text-gray-600">Main Auditorium • 247 attendees</p>
            </div>
            <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 text-sm font-medium">Live</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-1">{formatTime(timeRemaining)}</div>
              <div className="text-sm text-gray-600">Current Session</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-1">3/8</div>
              <div className="text-sm text-gray-600">Sessions Complete</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-1">5</div>
              <div className="text-sm text-gray-600">Team Members</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="text-sm font-semibold text-gray-900">Dr. Sarah Chen</div>
              <div className="text-xs text-gray-500">2:00 PM - 2:30 PM</div>
              <div className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-md inline-block mt-1">
                In Progress
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-semibold text-gray-900">Panel Discussion</div>
              <div className="text-xs text-gray-500">2:30 PM - 3:15 PM</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-semibold text-gray-900">Coffee Break</div>
              <div className="text-xs text-gray-500">3:15 PM - 3:30 PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLiveEvent = () => (
    <div className="space-y-8">
      {/* Main Timer */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI in Healthcare: Future Perspectives</h2>
          <p className="text-gray-600">Dr. Sarah Chen • Main Auditorium</p>
        </div>
        
        <div className={`text-8xl font-mono font-bold mb-6 transition-colors duration-1000 ${getTimerColor()}`}>
          {formatTime(timeRemaining)}
        </div>
        
        <div className="text-gray-600 text-xl mb-8">Session Time Remaining</div>
        
        {/* Timer Controls */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isRunning 
                ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={() => {
              setTimeRemaining(1200);
              setCurrentMinute(1);
              setIsRunning(false);
            }}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Reset
          </button>
        </div>

        {/* Time Adjustment Controls */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="text-gray-700 text-sm mb-4 font-medium">Quick Time Adjustments</div>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => adjustTime(-300)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              -5m
            </button>
            <button
              onClick={() => adjustTime(-60)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              -1m
            </button>
            <button
              onClick={() => adjustTime(60)}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              +1m
            </button>
            <button
              onClick={() => adjustTime(300)}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              +5m
            </button>
          </div>
        </div>
      </div>

      {/* Speaker Notes Timeline */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Speaker Notes Timeline</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {speakerNotes.map((note, index) => {
              const isPast = currentMinute > note.minute;
              const isCurrent = currentMinute === note.minute;
              const isHighlighted = index === currentNoteIndex;
              
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 transition-all duration-500 ${
                    isCurrent 
                      ? 'bg-green-50 border-green-500 shadow-md animate-pulse' 
                      : isPast 
                      ? 'bg-gray-50 border-gray-300 opacity-60' 
                      : isHighlighted
                      ? 'bg-blue-50 border-blue-500 shadow-md'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900 text-sm">
                      Minute {note.minute}
                    </span>
                    {isCurrent && (
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-bold">
                        NOW
                      </span>
                    )}
                    {isHighlighted && !isCurrent && !isPast && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-bold">
                        NEXT
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm">{note.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Live Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700 font-medium">Current Minute</span>
                <span className="text-green-600 font-bold text-lg">{currentMinute}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700 font-medium">Progress</span>
                <span className="text-blue-600 font-bold">{Math.round(((1200 - timeRemaining) / 1200) * 100)}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700 font-medium">Attendees</span>
                <span className="text-purple-600 font-bold">247</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Session Progress</h3>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${((1200 - timeRemaining) / 1200) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>Start</span>
                <span>20 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSpeakerPortal = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Your session is live
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI in Healthcare: Future Perspectives</h1>
        <p className="text-gray-600">Dr. Sarah Chen • Main Auditorium</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Speaker Timer */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
          <div className={`text-6xl font-mono font-bold mb-4 transition-colors duration-1000 ${getTimerColor()}`}>
            {formatTime(timeRemaining)}
          </div>
          <div className="text-gray-600 text-lg mb-6">Time Remaining</div>
          <div className="flex justify-center space-x-3">
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
              On Track
            </div>
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
              Q&A Ready
            </div>
          </div>
        </div>

        {/* Speaker Notes */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Your Notes</h3>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-1">Key Points</div>
              <div className="text-gray-600">• AI diagnostic accuracy<br/>• Patient data privacy<br/>• Implementation challenges</div>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
              <div className="font-medium text-amber-800 mb-1">Timing Alerts</div>
              <div className="text-amber-700">5-min warning at 20:00<br/>Hard stop at 15:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEventSetup = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Configuration</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
              <input 
                type="text" 
                value="Tech Summit 2024" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Duration</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>20 minutes</option>
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>60 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Warning Times</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" checked className="mr-2" readOnly />
                  <span className="text-gray-700">5-minute warning</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" checked className="mr-2" readOnly />
                  <span className="text-gray-700">2-minute warning</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" checked className="mr-2" readOnly />
                  <span className="text-gray-700">Time's up alert</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slack Integration</label>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-700 font-medium">Connected to #event-team</span>
                </div>
                <p className="text-green-600 text-sm">Auto-notifications enabled</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Alerts</label>
              <input 
                type="email" 
                value="moderators@event.com" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Options</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" checked className="mr-2" readOnly />
                  <span className="text-gray-700">Show speaker name</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" checked className="mr-2" readOnly />
                  <span className="text-gray-700">Show session title</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" readOnly />
                  <span className="text-gray-700">Show attendee count</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">StageCue</span>
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full ml-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm font-medium">Demo Mode</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex space-x-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                { id: 'live', label: 'Live Event', icon: '⏱️' },
                { id: 'speaker', label: 'Speaker Portal', icon: '🎤' },
                { id: 'setup', label: 'Event Setup', icon: '⚙️' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'live' && renderLiveEvent()}
        {activeTab === 'speaker' && renderSpeakerPortal()}
        {activeTab === 'setup' && renderEventSetup()}
      </main>
    </div>
  );
}