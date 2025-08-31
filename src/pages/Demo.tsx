import { useState, useEffect } from 'react';

interface DemoHeaderProps {
  currentStep: number;
  totalSteps: number;
}

function DemoHeader({ currentStep, totalSteps }: DemoHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900">StageCue</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-700 hover:text-teal-600 font-medium transition-colors">Dashboard</a>
            <a href="#" className="text-slate-700 hover:text-teal-600 font-medium transition-colors">Events</a>
            <a href="#" className="text-slate-700 hover:text-teal-600 font-medium transition-colors">Speakers</a>
            <a href="#" className="text-slate-700 hover:text-teal-600 font-medium transition-colors">Settings</a>
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-purple-700 text-sm font-medium">Pro Plan</span>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">SC</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Demo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showSlackModal, setShowSlackModal] = useState(false);
  const [showSpeakerAlert, setShowSpeakerAlert] = useState(false);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('AI in Healthcare: Future Perspectives');
  const [speakerName, setSpeakerName] = useState('Dr. Sarah Chen');
  const [sessionNotes, setSessionNotes] = useState('Key points: AI diagnostic accuracy, patient data privacy, implementation challenges');
  const [alertsTriggered, setAlertsTriggered] = useState<string[]>([]);
  const [eventLocation, setEventLocation] = useState('Main Auditorium');

  const steps = [
    'Event Setup',
    'Session Configuration', 
    'Live Event Dashboard',
    'Speaker Portal',
    'Team Coordination'
  ];

  // Auto-advance demo steps
  useEffect(() => {
    if (currentStep < 2) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Timer countdown logic
  useEffect(() => {
    if (!isTimerRunning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        
        // Trigger alerts at specific times
        if (newTime === 5 * 60 && !alertsTriggered.includes('5min')) {
          setAlertsTriggered(prev => [...prev, '5min']);
          setShowSlackModal(true);
          setTimeout(() => setShowSlackModal(false), 3000);
        }
        
        if (newTime === 2 * 60 && !alertsTriggered.includes('2min')) {
          setAlertsTriggered(prev => [...prev, '2min']);
          setShowSpeakerAlert(true);
        }
        
        if (newTime === 0 && !alertsTriggered.includes('overtime')) {
          setAlertsTriggered(prev => [...prev, 'overtime']);
          setShowExtendModal(true);
        }
        
        return Math.max(0, newTime);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining, alertsTriggered]);

  // Auto-start timer when reaching live dashboard
  useEffect(() => {
    if (currentStep === 2) {
      setTimeout(() => {
        setIsTimerRunning(true);
      }, 1500);
    }
  }, [currentStep]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    const sign = seconds < 0 ? '-' : '';
    return `${sign}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeRemaining <= 0) return 'text-red-400';
    if (timeRemaining <= 2 * 60) return 'text-red-400';
    if (timeRemaining <= 5 * 60) return 'text-amber-400';
    return 'text-green-400';
  };

  const getTimerBgColor = () => {
    if (timeRemaining <= 0) return 'from-red-900/50 to-red-800/50';
    if (timeRemaining <= 2 * 60) return 'from-red-900/30 to-red-800/30';
    if (timeRemaining <= 5 * 60) return 'from-amber-900/30 to-amber-800/30';
    return 'from-green-900/30 to-green-800/30';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-6 py-3 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-8">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                  Setting up your first event
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                  Create New Event
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Set up your event details and configure team coordination
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="eventName" className="block text-slate-700 font-semibold mb-3">
                        Event Name
                      </label>
                      <input
                        id="eventName"
                        type="text"
                        value="Tech Summit 2024"
                        onChange={() => {}}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="Enter event name"
                      />
                    </div>
                    <div>
                      <label htmlFor="venue" className="block text-slate-700 font-semibold mb-3">
                        Venue
                      </label>
                      <input
                        id="venue"
                        type="text"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="Enter venue"
                      />
                    </div>
                    <div>
                      <label htmlFor="expectedAttendees" className="block text-slate-700 font-semibold mb-3">
                        Expected Attendees
                      </label>
                      <input
                        id="expectedAttendees"
                        type="number"
                        value="247"
                        onChange={() => {}}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="Number of attendees"
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="eventDate" className="block text-slate-700 font-semibold mb-3">
                        Event Date
                      </label>
                      <input
                        id="eventDate"
                        type="date"
                        value="2024-03-15"
                        onChange={() => {}}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="slackChannel" className="block text-slate-700 font-semibold mb-3">
                        Slack Channel (Optional)
                      </label>
                      <input
                        id="slackChannel"
                        type="text"
                        value="#event-team"
                        onChange={() => {}}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="#channel-name"
                      />
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                      >
                        Create Event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-6 py-3 bg-purple-100 border border-purple-200 rounded-full text-purple-700 text-sm font-medium mb-8">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
                  Configuring session timing
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  Session Setup
                </h2>
                <p className="text-lg text-slate-600">
                  Configure timing, alerts, and speaker information
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Session Details */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Session Details</h3>
                    
                    <div>
                      <label htmlFor="sessionTitleInput" className="block text-slate-700 font-semibold mb-3">
                        Session Title
                      </label>
                      <input
                        id="sessionTitleInput"
                        type="text"
                        value={sessionTitle}
                        onChange={(e) => setSessionTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="speakerNameInput" className="block text-slate-700 font-semibold mb-3">
                        Speaker Name
                      </label>
                      <input
                        id="speakerNameInput"
                        type="text"
                        value={speakerName}
                        onChange={(e) => setSpeakerName(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="sessionDuration" className="block text-slate-700 font-semibold mb-3">
                        Session Duration
                      </label>
                      <select
                        id="sessionDuration"
                        value="25"
                        onChange={() => {}}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      >
                        <option value="15">15 minutes</option>
                        <option value="20">20 minutes</option>
                        <option value="25">25 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="sessionNotesInput" className="block text-slate-700 font-semibold mb-3">
                        Speaker Notes
                      </label>
                      <textarea
                        id="sessionNotesInput"
                        value={sessionNotes}
                        onChange={(e) => setSessionNotes(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        placeholder="Add notes for the speaker..."
                      />
                    </div>
                  </div>

                  {/* Alert Configuration */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Alert Configuration</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <label htmlFor="fiveMinAlert" className="text-slate-700 font-medium">
                            5-minute warning
                          </label>
                          <input
                            id="fiveMinAlert"
                            type="checkbox"
                            checked={true}
                            onChange={() => {}}
                            className="w-5 h-5 text-amber-500 bg-white border-slate-300 rounded focus:ring-amber-400"
                          />
                        </div>
                        <p className="text-slate-600 text-sm">Alert speaker and team when 5 minutes remain</p>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <label htmlFor="twoMinAlert" className="text-slate-700 font-medium">
                            2-minute final warning
                          </label>
                          <input
                            id="twoMinAlert"
                            type="checkbox"
                            checked={true}
                            onChange={() => {}}
                            className="w-5 h-5 text-red-500 bg-white border-slate-300 rounded focus:ring-red-400"
                          />
                        </div>
                        <p className="text-slate-600 text-sm">Final warning before time expires</p>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <label htmlFor="slackNotifications" className="text-slate-700 font-medium">
                            Slack notifications
                          </label>
                          <input
                            id="slackNotifications"
                            type="checkbox"
                            checked={true}
                            onChange={() => {}}
                            className="w-5 h-5 text-blue-500 bg-white border-slate-300 rounded focus:ring-blue-400"
                          />
                        </div>
                        <p className="text-slate-600 text-sm">Send alerts to #event-team channel</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentStep(2)}
                      className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      Start Session
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Tech Summit 2024</h1>
                  <p className="text-slate-600">{eventLocation} • 247 attendees</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-green-100 border border-green-200 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-medium">Live Event</span>
                  </div>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-all"
                  >
                    Speaker View
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Timer */}
                <div className="lg:col-span-2">
                  <div className={`bg-gradient-to-br ${getTimerBgColor()} from-slate-900 via-blue-900 to-purple-900 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                    <div className="relative">
                      <div className={`text-8xl font-mono font-bold ${getTimerColor()} mb-4 tracking-wider transition-colors duration-500`}>
                        {formatTime(timeRemaining)}
                      </div>
                      <div className="text-white/80 text-xl font-medium mb-8">
                        {timeRemaining <= 0 ? 'Session Overtime' : 'Time Remaining'}
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
                        <div className="text-white/60 text-sm mb-2 uppercase tracking-wide">Current Speaker</div>
                        <div className="text-white text-2xl font-bold mb-1">{speakerName}</div>
                        <div className="text-white/80">{sessionTitle}</div>
                      </div>

                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={() => setIsTimerRunning(!isTimerRunning)}
                          className={`px-8 py-3 ${isTimerRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                        >
                          {isTimerRunning ? 'Pause' : 'Start'}
                        </button>
                        <button
                          onClick={() => {
                            setTimeRemaining(25 * 60);
                            setIsTimerRunning(false);
                            setAlertsTriggered([]);
                          }}
                          className="px-8 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => setShowExtendModal(true)}
                          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                          Extend
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Schedule */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-900 text-lg">Today's Schedule</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 border-l-4 border-l-blue-500">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
                        <div className="flex-1">
                          <div className="text-slate-900 font-semibold">{speakerName}</div>
                          <div className="text-slate-600 text-sm mb-2">2:00 PM - 2:30 PM</div>
                          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            In Progress
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-slate-300 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="text-slate-900 font-semibold">Panel Discussion</div>
                          <div className="text-slate-600 text-sm mb-2">2:30 PM - 3:15 PM</div>
                          <div className="text-slate-500 text-xs">4 speakers</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-slate-300 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="text-slate-900 font-semibold">Coffee Break</div>
                          <div className="text-slate-600 text-sm">3:15 PM - 3:30 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Activity Feed */}
              <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 text-lg mb-4">Live Activity</h3>
                <div className="space-y-3 max-h-32 overflow-y-auto">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-slate-500">2:00 PM</span>
                    <span className="text-slate-900">Session started: {sessionTitle}</span>
                  </div>
                  {alertsTriggered.includes('5min') && (
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                      <span className="text-slate-500">2:20 PM</span>
                      <span className="text-amber-700">5-minute warning sent to speaker and team</span>
                    </div>
                  )}
                  {alertsTriggered.includes('2min') && (
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-slate-500">2:23 PM</span>
                      <span className="text-red-700">Final 2-minute warning triggered</span>
                    </div>
                  )}
                  {alertsTriggered.includes('overtime') && (
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                      <span className="text-slate-500">2:25 PM</span>
                      <span className="text-red-700">Session overtime - moderator alerted</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  View Speaker Portal
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-6 py-3 bg-purple-100 border border-purple-200 rounded-full text-purple-700 text-sm font-medium mb-6">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
                  Speaker's personal view
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Speaker Portal</h2>
                <p className="text-lg text-slate-600">Clean, distraction-free interface for speakers</p>
              </div>

              <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-purple-100 border border-purple-200 rounded-full text-purple-700 text-sm font-medium mb-6">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                    Your session is live
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{sessionTitle}</h1>
                  <p className="text-slate-600">{speakerName} • {eventLocation}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Speaker Timer */}
                  <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-center shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                    <div className="relative">
                      <div className={`text-7xl font-mono font-bold ${getTimerColor()} mb-4 transition-colors duration-500`}>
                        {formatTime(timeRemaining)}
                      </div>
                      <div className="text-white/80 text-lg mb-6">
                        {timeRemaining <= 0 ? 'Session Overtime' : 'Time Remaining'}
                      </div>
                      <div className="flex justify-center space-x-3">
                        {timeRemaining > 5 * 60 && (
                          <div className="px-4 py-2 bg-green-500/20 border border-green-400/30 text-green-300 rounded-lg text-sm font-medium">
                            On Track
                          </div>
                        )}
                        {timeRemaining <= 5 * 60 && timeRemaining > 2 * 60 && (
                          <div className="px-4 py-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-lg text-sm font-medium animate-pulse">
                            5 Min Warning
                          </div>
                        )}
                        {timeRemaining <= 2 * 60 && timeRemaining > 0 && (
                          <div className="px-4 py-2 bg-red-500/20 border border-red-400/30 text-red-300 rounded-lg text-sm font-medium animate-pulse">
                            Final Warning
                          </div>
                        )}
                        {timeRemaining <= 0 && (
                          <div className="px-4 py-2 bg-red-600/30 border border-red-500/50 text-red-200 rounded-lg text-sm font-medium animate-pulse">
                            Time Up
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Speaker Notes */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4">Your Notes</h3>
                    <div className="space-y-4 text-sm">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <div className="font-medium text-slate-900 mb-1">Session Notes</div>
                        <div className="text-slate-600">{sessionNotes}</div>
                      </div>
                      
                      <div className={`p-3 rounded-lg border ${
                        timeRemaining > 300 ? 'bg-green-50 text-green-700 border-green-200' :
                        timeRemaining > 120 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        <div className="font-medium mb-2">Timing Alerts</div>
                        <div className="text-xs space-y-1">
                          <div>• 5-minute warning at 20:00</div>
                          <div>• Final warning at 23:00</div>
                          <div>• Hard stop at 25:00</div>
                        </div>
                      </div>

                      <div className={`p-3 rounded-lg border ${
                        timeRemaining > 300 ? 'bg-blue-50 border-blue-200 text-blue-800' :
                        timeRemaining > 120 ? 'bg-amber-50 border-amber-200 text-amber-800' :
                        'bg-red-50 border-red-200 text-red-800'
                      }`}>
                        <div className="font-medium mb-2">Next Up</div>
                        <div className="text-xs">Q&A Session (5 minutes)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  View Team Coordination
                </button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50/30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-6 py-3 bg-teal-100 border border-teal-200 rounded-full text-teal-700 text-sm font-medium mb-6">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 animate-pulse"></div>
                  Team coordination in action
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Team Dashboard</h2>
                <p className="text-lg text-slate-600">Real-time coordination and notifications</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Team Notifications */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-lg mb-6">Team Notifications</h3>
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-slate-900 font-medium">Slack: #event-team</div>
                          <div className="text-green-600 text-xs">Connected & monitoring</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowSlackModal(true)}
                        className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
                      >
                        View recent messages →
                      </button>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-slate-900 font-medium">Email Alerts</div>
                          <div className="text-blue-600 text-xs">moderators@event.com</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-lg mb-6">Team Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">MJ</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-slate-900 font-medium">Mike Johnson</div>
                        <div className="text-slate-600 text-sm">Event Moderator</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-600 text-xs font-medium">Active</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">AL</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-slate-900 font-medium">Anna Lee</div>
                        <div className="text-slate-600 text-sm">AV Technician</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-600 text-xs font-medium">Active</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">RK</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-slate-900 font-medium">Rachel Kim</div>
                        <div className="text-slate-600 text-sm">Stage Manager</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-amber-600 text-xs font-medium">Away</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setCurrentStep(0)}
                  className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Restart Demo
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Demo Complete</h2>
              <button
                onClick={() => setCurrentStep(0)}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-xl"
              >
                Restart Demo
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DemoHeader currentStep={currentStep} totalSteps={steps.length} />
      
      {renderStep()}

      {/* Demo Progress Indicator */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl px-4 py-3 shadow-lg">
          <div className="flex items-center space-x-3">
            <span className="text-slate-600 text-sm font-medium">Demo Progress:</span>
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-teal-500 scale-125'
                      : index < currentStep
                      ? 'bg-teal-300'
                      : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slack Modal */}
      {showSlackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900">#event-team</h3>
                </div>
                <button
                  onClick={() => setShowSlackModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-amber-600 font-bold text-xs">SC</span>
                    </div>
                    <div>
                      <div className="font-medium text-amber-800">StageCue Bot</div>
                      <div className="text-amber-700 text-sm">🚨 5-minute warning: Dr. Sarah Chen's session</div>
                      <div className="text-amber-600 text-xs mt-1">Just now</div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 font-bold text-xs">MJ</span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Mike Johnson</div>
                      <div className="text-slate-700 text-sm">👍 Got it, preparing for Q&A transition</div>
                      <div className="text-slate-500 text-xs mt-1">1 minute ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Speaker Alert Modal */}
      {showSpeakerAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full border border-slate-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Final Warning</h3>
              <p className="text-slate-600 mb-6">2 minutes remaining in your session</p>
              <button
                onClick={() => setShowSpeakerAlert(false)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Acknowledged
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Extend Time Modal */}
      {showExtendModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Session Overtime</h3>
                <p className="text-slate-600">Would you like to extend the session?</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => {
                    setTimeRemaining(timeRemaining + 5 * 60);
                    setShowExtendModal(false);
                  }}
                  className="px-4 py-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                >
                  +5 minutes
                </button>
                <button
                  onClick={() => {
                    setTimeRemaining(timeRemaining + 10 * 60);
                    setShowExtendModal(false);
                  }}
                  className="px-4 py-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                >
                  +10 minutes
                </button>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setShowExtendModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  End Session
                </button>
                <button
                  onClick={() => setShowExtendModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}