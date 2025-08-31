import { useState, useEffect } from 'react';

export function StageCue() {
  const [timeRemaining, setTimeRemaining] = useState(18 * 60 + 42);
  const [isRunning, setIsRunning] = useState(true);
  const [autoDemo, setAutoDemo] = useState(true);
  const [showSlackNotification, setShowSlackNotification] = useState(false);
  const [currentSpeaker] = useState({
    name: 'Dr. Sarah Chen',
    title: 'AI in Healthcare: Future Perspectives',
    duration: 30,
    notes: [
      'Introduction: 2 minutes',
      'Current AI applications: 8 minutes',
      'Future trends and challenges: 15 minutes',
      'Q&A preparation: 5 minutes'
    ],
    warnings: [
      { time: 5, message: '5-minute warning' },
      { time: 2, message: '2-minute warning' },
      { time: 0, message: 'Time is up' }
    ]
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, autoDemo]);

  // Auto-demo progression
  useEffect(() => {
    if (!autoDemo) return;

    // Show Slack notification at 5 minutes remaining
    if (timeRemaining === 5 * 60 && !showSlackNotification) {
      setShowSlackNotification(true);
      setTimeout(() => setShowSlackNotification(false), 4000);
    }
  }, [timeRemaining, autoDemo, showSlackNotification]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining <= 120) return 'text-red-500'; // Last 2 minutes
    if (timeRemaining <= 300) return 'text-amber-500'; // Last 5 minutes
    return 'text-slate-700';
  };

  const handleSlackNotification = () => {
    setShowSlackNotification(true);
    setTimeout(() => setShowSlackNotification(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">StageCue</h1>
              <p className="text-sm text-slate-500">Tech Summit 2024 • Main Auditorium</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 text-sm font-medium">Live Event</span>
            </div>
            <span className="text-slate-500 text-sm">247 attendees</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Timer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="text-center mb-8">
                <div className={`text-8xl font-mono font-bold mb-4 transition-colors ${getTimeColor()}`}>
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-slate-600 text-lg">Time Remaining</div>
                
                {/* Progress Bar */}
                <div className="mt-6 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                    style={{ width: `${Math.max(0, (timeRemaining / (30 * 60)) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>0:00</span>
                  <span>30:00</span>
                </div>
              </div>

              {/* Current Speaker Info */}
              <div className="bg-slate-50 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">{currentSpeaker.name}</h3>
                  <p className="text-slate-600">{currentSpeaker.title}</p>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    isRunning
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isRunning ? 'Pause' : 'Resume'}
                </button>
                <button
                  onClick={() => {
                    setTimeRemaining(30 * 60);
                    setIsRunning(true);
                    setAutoDemo(true);
                  }}
                  className="px-6 py-3 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setTimeRemaining(0)}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                >
                  End Session
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Speaker Notes */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Speaker Notes
              </h3>
              <div className="space-y-3">
                {currentSpeaker.notes.map((note, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-medium text-indigo-600 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-slate-700 text-sm">{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timing Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Timing Alerts
              </h3>
              <div className="space-y-3">
                {currentSpeaker.warnings.map((warning, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${
                    warning.time === 0 
                      ? 'bg-red-50 border-red-400 text-red-700'
                      : warning.time <= 2
                      ? 'bg-amber-50 border-amber-400 text-amber-700'
                      : 'bg-blue-50 border-blue-400 text-blue-700'
                  }`}>
                    <div className="text-sm font-medium">{warning.message}</div>
                    <div className="text-xs opacity-75">
                      {warning.time === 0 ? 'Session complete' : `At ${warning.time} minutes remaining`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleSlackNotification}
                  className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Send Slack Alert</div>
                      <div className="text-sm text-slate-500">Notify team channel</div>
                    </div>
                    <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5.042 15.165a2.528 2.528 0 0 0 2.5 2.5c1.61 0 2.5-.89 2.5-2.5v-1.25h-2.5a2.528 2.528 0 0 0-2.5 2.5zm2.5-6.25a2.528 2.528 0 0 0-2.5-2.5 2.528 2.528 0 0 0-2.5 2.5c0 1.61.89 2.5 2.5 2.5h2.5v-2.5z"/>
                      <path d="M8.915 8.915c0-1.61.89-2.5 2.5-2.5s2.5.89 2.5 2.5v6.25c0 1.61-.89 2.5-2.5 2.5s-2.5-.89-2.5-2.5v-6.25z"/>
                      <path d="M15.165 18.958a2.528 2.528 0 0 0 2.5-2.5c0-1.61-.89-2.5-2.5-2.5h-1.25v2.5a2.528 2.528 0 0 0 2.5 2.5zm6.25-2.5a2.528 2.528 0 0 0-2.5-2.5 2.528 2.528 0 0 0-2.5 2.5c0 1.61.89 2.5 2.5 2.5h2.5v-2.5z"/>
                      <path d="M15.165 15.165c1.61 0 2.5-.89 2.5-2.5s-.89-2.5-2.5-2.5h-6.25c-1.61 0-2.5.89-2.5 2.5s.89 2.5 2.5 2.5h6.25z"/>
                    </svg>
                  </div>
                </button>
                
                <button className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Extend Time</div>
                      <div className="text-sm text-slate-500">Add 5 minutes</div>
                    </div>
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </button>

                <button className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Next Speaker</div>
                      <div className="text-sm text-slate-500">Prepare transition</div>
                    </div>
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Today's Schedule
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Dr. Sarah Chen</div>
                      <div className="text-sm text-slate-500">2:00 PM - 2:30 PM</div>
                    </div>
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                      Current
                    </span>
                  </div>
                </div>
                
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Panel Discussion</div>
                      <div className="text-sm text-slate-500">2:30 PM - 3:15 PM</div>
                    </div>
                    <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full">
                      Next
                    </span>
                  </div>
                </div>
                
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Coffee Break</div>
                      <div className="text-sm text-slate-500">3:15 PM - 3:30 PM</div>
                    </div>
                    <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full">
                      Upcoming
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Speaker Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Speaker Details
            </h3>
            
            {/* Speaker Info */}
            <div className="mb-6 p-4 bg-slate-50 rounded-lg">
              <div className="font-medium text-slate-900 mb-1">{currentSpeaker.name}</div>
              <div className="text-sm text-slate-600 mb-2">{currentSpeaker.title}</div>
              <div className="text-xs text-slate-500">Duration: {currentSpeaker.duration} minutes</div>
            </div>

            {/* Session Outline */}
            <div className="mb-6">
              <h4 className="font-medium text-slate-900 mb-3">Session Outline</h4>
              <div className="space-y-2">
                {currentSpeaker.notes.map((note, index) => (
                  <div key={index} className="flex items-start space-x-3 text-sm">
                    <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-slate-700">{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Schedule */}
            <div>
              <h4 className="font-medium text-slate-900 mb-3">Warning Schedule</h4>
              <div className="space-y-2">
                {currentSpeaker.warnings.map((warning, index) => (
                  <div key={index} className={`p-3 rounded-lg text-sm ${
                    warning.time === 0 
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : warning.time <= 2
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    <div className="font-medium">{warning.message}</div>
                    <div className="text-xs opacity-75">
                      {warning.time === 0 ? 'End of session' : `${warning.time} min remaining`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Event Stats */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">3/8</div>
                <div className="text-sm text-slate-500">Sessions Complete</div>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">247</div>
                <div className="text-sm text-slate-500">Attendees</div>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">92%</div>
                <div className="text-sm text-slate-500">On Schedule</div>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">5</div>
                <div className="text-sm text-slate-500">Team Online</div>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slack Notification Popup */}
      {showSlackNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-4 max-w-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.042 15.165a2.528 2.528 0 0 0 2.5 2.5c1.61 0 2.5-.89 2.5-2.5v-1.25h-2.5a2.528 2.528 0 0 0-2.5 2.5zm2.5-6.25a2.528 2.528 0 0 0-2.5-2.5 2.528 2.528 0 0 0-2.5 2.5c0 1.61.89 2.5 2.5 2.5h2.5v-2.5z"/>
                  <path d="M8.915 8.915c0-1.61.89-2.5 2.5-2.5s2.5.89 2.5 2.5v6.25c0 1.61-.89 2.5-2.5 2.5s-2.5-.89-2.5-2.5v-6.25z"/>
                  <path d="M15.165 18.958a2.528 2.528 0 0 0 2.5-2.5c0-1.61-.89-2.5-2.5-2.5h-1.25v2.5a2.528 2.528 0 0 0 2.5 2.5zm6.25-2.5a2.528 2.528 0 0 0-2.5-2.5 2.528 2.528 0 0 0-2.5 2.5c0 1.61.89 2.5 2.5 2.5h2.5v-2.5z"/>
                  <path d="M15.165 15.165c1.61 0 2.5-.89 2.5-2.5s-.89-2.5-2.5-2.5h-6.25c-1.61 0-2.5.89-2.5 2.5s.89 2.5 2.5 2.5h6.25z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-900 mb-1">Slack Message Sent</div>
                <div className="text-sm text-slate-600 mb-2">#event-team</div>
                <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded border">
                  "⏰ Dr. Sarah Chen has {formatTime(timeRemaining)} remaining in her session. Team prepare for transition to Panel Discussion."
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}