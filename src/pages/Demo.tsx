              import { useState, useEffect } from 'react';

interface DemoLayoutProps {
  children: React.ReactNode;
  showControls?: boolean;
  onToggleControls?: () => void;
}

function DemoLayout({ children, showControls = true, onToggleControls }: DemoLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Team Coordination Dashboard</h1>
              <p className="text-slate-600 text-lg">Real-time event management and team communication</p>
            </div>
          </div>
        </div>

        {/* Demo watermark */}
        <div className="fixed top-6 left-6 z-50">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 text-sm font-medium">LIVE DEMO</span>
            </div>
          </div>
        </div>

        {/* Demo controls */}
        {showControls && onToggleControls && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={onToggleControls}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white/90 hover:bg-white/20 transition-all duration-300"
            >
              Hide Controls
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
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
  const [showControls, setShowControls] = useState(true);

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
          <DemoLayout showControls={showControls} onToggleControls={() => setShowControls(!showControls)}>
            <div className="flex items-center justify-center min-h-screen p-8">
              <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium mb-8">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                    Setting up your first event
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                    Welcome to
                    <span className="block bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                      StageCue
                    </span>
                  </h1>
                  <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                    Professional event timing that keeps speakers on track and teams coordinated
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="eventName" className="block text-white/90 font-semibold mb-3">
                          Event Name
                        </label>
                        <input
                          id="eventName"
                          type="text"
                          value="Tech Summit 2024"
                          onChange={() => {}}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                          placeholder="Enter event name"
                        />
                      </div>
                      <div>
                        <label htmlFor="venue" className="block text-white/90 font-semibold mb-3">
                          Venue
                        </label>
                        <input
                          id="venue"
                          type="text"
                          value="Main Auditorium"
                          onChange={() => {}}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                          placeholder="Enter venue"
                        />
                      </div>
                      <div>
                        <label htmlFor="expectedAttendees" className="block text-white/90 font-semibold mb-3">
                          Expected Attendees
                        </label>
                        <input
                          id="expectedAttendees"
                          type="number"
                          value="247"
                          onChange={() => {}}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                          placeholder="Number of attendees"
                        />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="eventDate" className="block text-white/90 font-semibold mb-3">
                          Event Date
                        </label>
                        <input
                          id="eventDate"
                          type="date"
                          value="2024-03-15"
                          onChange={() => {}}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="slackChannel" className="block text-white/90 font-semibold mb-3">
                          Slack Channel (Optional)
                        </label>
                        <input
                          id="slackChannel"
                          type="text"
                          value="#event-team"
                          onChange={() => {}}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
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
          </DemoLayout>
        );

      case 1:
        return (
          <DemoLayout showControls={showControls} onToggleControls={() => setShowControls(!showControls)}>
            <div className="flex items-center justify-center min-h-screen p-8">
              <div className="max-w-5xl w-full">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium mb-8">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                    Configuring session timing
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Session Setup
                  </h2>
                  <p className="text-lg text-white/80">
                    Configure timing, alerts, and speaker information
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Session Details */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-white mb-6">Session Details</h3>
                      
                      <div>
                        <label htmlFor="sessionTitleInput" className="block text-white/90 font-semibold mb-3">
                          Session Title
                        </label>
                        <input
                          id="sessionTitleInput"
                          type="text"
                          value={sessionTitle}
                          onChange={(e) => setSessionTitle(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="speakerNameInput" className="block text-white/90 font-semibold mb-3">
                          Speaker Name
                        </label>
                        <input
                          id="speakerNameInput"
                          type="text"
                          value={speakerName}
                          onChange={(e) => setSpeakerName(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="sessionDuration" className="block text-white/90 font-semibold mb-3">
                          Session Duration
                        </label>
                        <select
                          id="sessionDuration"
                          value="25"
                          onChange={() => {}}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                        >
                          <option value="15" className="bg-slate-800">15 minutes</option>
                          <option value="20" className="bg-slate-800">20 minutes</option>
                          <option value="25" className="bg-slate-800">25 minutes</option>
                          <option value="30" className="bg-slate-800">30 minutes</option>
                          <option value="45" className="bg-slate-800">45 minutes</option>
                          <option value="60" className="bg-slate-800">60 minutes</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="sessionNotesInput" className="block text-white/90 font-semibold mb-3">
                          Speaker Notes
                        </label>
                        <textarea
                          id="sessionNotesInput"
                          value={sessionNotes}
                          onChange={(e) => setSessionNotes(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all resize-none"
                          placeholder="Add notes for the speaker..."
                        />
                      </div>
                    </div>

                    {/* Alert Configuration */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-white mb-6">Alert Configuration</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <label htmlFor="fiveMinAlert" className="text-white/90 font-medium">
                              5-minute warning
                            </label>
                            <input
                              id="fiveMinAlert"
                              type="checkbox"
                              checked={true}
                              onChange={() => {}}
                              className="w-5 h-5 text-amber-500 bg-white/10 border-white/20 rounded focus:ring-amber-400"
                            />
                          </div>
                          <p className="text-white/60 text-sm">Alert speaker and team when 5 minutes remain</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <label htmlFor="twoMinAlert" className="text-white/90 font-medium">
                              2-minute final warning
                            </label>
                            <input
                              id="twoMinAlert"
                              type="checkbox"
                              checked={true}
                              onChange={() => {}}
                              className="w-5 h-5 text-red-500 bg-white/10 border-white/20 rounded focus:ring-red-400"
                            />
                          </div>
                          <p className="text-white/60 text-sm">Final warning before time expires</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <label htmlFor="slackNotifications" className="text-white/90 font-medium">
                              Slack notifications
                            </label>
                            <input
                              id="slackNotifications"
                              type="checkbox"
                              checked={true}
                              onChange={() => {}}
                              className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-400"
                            />
                          </div>
                          <p className="text-white/60 text-sm">Send alerts to #event-team channel</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setCurrentStep(2)}
                        className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                      >
                        Start Session
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DemoLayout>
        );

      case 2:
        return (
          <DemoLayout showControls={showControls} onToggleControls={() => setShowControls(!showControls)}>
            <div className="min-h-screen p-8">
              <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-white">Tech Summit 2024</h1>
                    <p className="text-white/70">Main Auditorium • 247 attendees</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-green-500/20 border border-green-400/30 px-4 py-2 rounded-full">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-300 font-medium">Live Event</span>
                    </div>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/90 hover:bg-white/20 transition-all"
                    >
                      Speaker View
                    </button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Timer */}
                  <div className="lg:col-span-2">
                    <div className={`bg-gradient-to-br ${getTimerBgColor()} backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center shadow-2xl`}>
                      <div className="mb-6">
                        <div className={`text-8xl font-mono font-bold ${getTimerColor()} mb-4 tracking-wider transition-colors duration-500`}>
                          {formatTime(timeRemaining)}
                        </div>
                        <div className="text-white/80 text-xl font-medium">
                          {timeRemaining <= 0 ? 'Session Overtime' : 'Time Remaining'}
                        </div>
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

                  {/* Event Schedule */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-white text-lg">Today's Schedule</h3>
                      <button className="text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors">
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4 border-l-4 border-l-blue-400">
                        <div className="flex items-start space-x-3">
                          <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
                          <div className="flex-1">
                            <div className="text-white font-semibold">{speakerName}</div>
                            <div className="text-white/60 text-sm mb-2">2:00 PM - 2:30 PM</div>
                            <div className="inline-block px-3 py-1 bg-blue-400/30 text-blue-200 rounded-full text-xs font-medium">
                              In Progress
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-3 h-3 bg-white/30 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="text-white/90 font-semibold">Panel Discussion</div>
                            <div className="text-white/50 text-sm mb-2">2:30 PM - 3:15 PM</div>
                            <div className="text-white/60 text-xs">4 speakers</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-3 h-3 bg-white/30 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="text-white/90 font-semibold">Coffee Break</div>
                            <div className="text-white/50 text-sm">3:15 PM - 3:30 PM</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Activity Feed */}
                <div className="mt-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
                  <h3 className="font-bold text-white text-lg mb-4">Live Activity</h3>
                  <div className="space-y-3 max-h-32 overflow-y-auto">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-white/70">2:00 PM</span>
                      <span className="text-white">Session started: {sessionTitle}</span>
                    </div>
                    {alertsTriggered.includes('5min') && (
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                        <span className="text-white/70">2:20 PM</span>
                        <span className="text-amber-300">5-minute warning sent to speaker and team</span>
                      </div>
                    )}
                    {alertsTriggered.includes('2min') && (
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-white/70">2:23 PM</span>
                        <span className="text-red-300">Final 2-minute warning triggered</span>
                      </div>
                    )}
                    {alertsTriggered.includes('overtime') && (
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-white/70">2:25 PM</span>
                        <span className="text-red-400">Session overtime - moderator alerted</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DemoLayout>
        );

      case 3:
        return (
          <DemoLayout showControls={showControls} onToggleControls={() => setShowControls(!showControls)}>
            <div className="flex items-center justify-center min-h-screen p-8">
              <div className="max-w-4xl w-full">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium mb-6">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
                    Speaker's personal view
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">Speaker Portal</h2>
                  <p className="text-lg text-white/80">Clean, distraction-free interface for speakers</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-200 text-sm font-medium mb-6">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                      Your session is live
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">{sessionTitle}</h1>
                    <p className="text-white/70">{speakerName} • Main Auditorium</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Speaker Timer */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center shadow-xl">
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

                    {/* Speaker Notes */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
                      <h3 className="font-bold text-white mb-4">Your Notes</h3>
                      <div className="space-y-4 text-sm">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <div className="font-medium text-white/90 mb-2">Key Points</div>
                          <div className="text-white/70 leading-relaxed">{sessionNotes}</div>
                        </div>
                        
                        <div className="bg-amber-500/10 border border-amber-400/20 rounded-lg p-4 border-l-4 border-l-amber-400">
                          <div className="font-medium text-amber-200 mb-2">Timing Alerts</div>
                          <div className="text-amber-300/80 text-xs space-y-1">
                            <div>• 5-minute warning at 20:00</div>
                            <div>• Final warning at 23:00</div>
                            <div>• Hard stop at 25:00</div>
                          </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4">
                          <div className="font-medium text-blue-200 mb-2">Next Up</div>
                          <div className="text-blue-300/80 text-xs">Q&A Session (5 minutes)</div>
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
            </div>
          </DemoLayout>
        );

      case 4:
        return (
          <DemoLayout showControls={showControls} onToggleControls={() => setShowControls(!showControls)}>
            <div className="min-h-screen p-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium mb-6">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mr-3 animate-pulse"></div>
                    Team coordination in action
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">Team Dashboard</h2>
                  <p className="text-lg text-white/80">Real-time coordination and notifications</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Team Notifications */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
                    <h3 className="font-bold text-white text-lg mb-6">Team Notifications</h3>
                    <div className="space-y-4">
                      <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-green-400/30 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="font-medium text-green-700">Slack Connected</span>
                            </div>
                            <div className="text-slate-600 text-sm">
                              Connected & monitoring
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowSlackModal(true)}
                          className="text-green-300 hover:text-green-200 text-sm font-medium transition-colors"
                        >
                          View recent messages →
                        </button>
                      </div>

                      <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-400/30 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="font-medium text-blue-700">Email Alerts</span>
                            </div>
                            <div className="text-slate-600 text-sm">
                              moderators@event.com
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
                    <h3 className="font-bold text-white text-lg mb-6">Team Status</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">MJ</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">Mike Johnson</div>
                          <div className="text-white/60 text-sm">Event Moderator</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-300 text-xs font-medium">Active</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">AL</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">Anna Lee</div>
                          <div className="text-white/60 text-sm">AV Technician</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-300 text-xs font-medium">Active</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">RK</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">Rachel Kim</div>
                          <div className="text-white/60 text-sm">Stage Manager</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                          <span className="text-amber-300 text-xs font-medium">Away</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="lg:col-span-2 bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-900 mb-6">Event Overview</h3>
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      <div className="bg-white rounded-xl p-4 border border-slate-200 text-center shadow-sm">
                        <div className="text-2xl font-bold text-green-600">3/8</div>
                        <div className="text-slate-600 text-sm">Sessions Complete</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-slate-200 text-center shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">247</div>
                        <div className="text-slate-600 text-sm">Attendees</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-slate-200 text-center shadow-sm">
                        <div className="text-2xl font-bold text-purple-600">5</div>
                        <div className="text-slate-600 text-sm">Team Online</div>
                      </div>
                    </div>

                    <h4 className="font-semibold text-slate-900 mb-4">Today's Schedule</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <div className="font-medium text-green-800">{sessionTitle}</div>
                          <div className="text-green-600 text-sm">{speakerName} • 2:00 PM - 2:30 PM</div>
                          <div className="text-green-700 text-xs bg-green-100 px-2 py-1 rounded-md inline-block mt-1">
                            In Progress
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-slate-200">
                        <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">Panel Discussion</div>
                          <div className="text-slate-600 text-sm">4 speakers • 2:30 PM - 3:15 PM</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-slate-200">
                        <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">Coffee Break</div>
                          <div className="text-slate-600 text-sm">3:15 PM - 3:30 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Team Communication</h3>
                    <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                      <div className="text-slate-600 text-sm">
                        Real-time coordination and notifications
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
          </DemoLayout>
        );

      default:
        return (
          <DemoLayout showControls={showControls} onToggleControls={() => setShowControls(!showControls)}>
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Demo Complete</h2>
                <button
                  onClick={() => setCurrentStep(0)}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-xl"
                >
                  Restart Demo
                </button>
              </div>
            </div>
          </DemoLayout>
        );
    }
  };

  return (
    <>
      {renderStep()}

      {/* Demo Progress Indicator */}
      {showControls && (
        <div className="fixed bottom-6 left-6 z-50">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-xl">
            <div className="text-white/90 text-sm font-medium mb-3">Demo Progress</div>
            <div className="flex space-x-2">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-teal-400 scale-125'
                      : index < currentStep
                      ? 'bg-white/60'
                      : 'bg-white/20'
                  }`}
                  title={step}
                />
              ))}
            </div>
            <div className="text-white/60 text-xs mt-2">{steps[currentStep]}</div>
          </div>
        </div>
      )}

      {/* Slack Notification Modal */}
      {showSlackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Slack Alert Sent</h3>
                  <p className="text-slate-600 text-sm">#event-team</p>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <div className="text-sm text-slate-700">
                  <div className="font-medium mb-1">🕐 StageCue Alert</div>
                  <div>5 minutes remaining in "{sessionTitle}"</div>
                  <div className="text-slate-500 mt-1">Speaker: {speakerName}</div>
                </div>
              </div>

              <button
                onClick={() => setShowSlackModal(false)}
                className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Speaker Alert Modal */}
      {showSpeakerAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Final Warning</h3>
                  <p className="text-slate-600 text-sm">2 minutes remaining</p>
                </div>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 mb-6">
                <div className="text-sm text-red-800">
                  <div className="font-medium mb-2">⏰ Time Alert</div>
                  <div>Only 2 minutes left in your session.</div>
                  <div className="mt-2 text-red-600">Please begin wrapping up your presentation.</div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSpeakerAlert(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
                >
                  Acknowledge
                </button>
                <button
                  onClick={() => {
                    setShowSpeakerAlert(false);
                    setShowExtendModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Request Extension
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time Extension Modal */}
      {showExtendModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Extend Session Time</h3>
                  <p className="text-slate-600 text-sm">Add more time to current session</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <button
                  onClick={() => {
                    setTimeRemaining(prev => prev + 5 * 60);
                    setShowExtendModal(false);
                  }}
                  className="w-full p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-left transition-colors"
                >
                  <div className="font-medium text-slate-900">+ 5 minutes</div>
                  <div className="text-slate-600 text-sm">Quick extension for Q&A</div>
                </button>
                
                <button
                  onClick={() => {
                    setTimeRemaining(prev => prev + 10 * 60);
                    setShowExtendModal(false);
                  }}
                  className="w-full p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-left transition-colors"
                >
                  <div className="font-medium text-slate-900">+ 10 minutes</div>
                  <div className="text-slate-600 text-sm">Extended discussion time</div>
                </button>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowExtendModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setTimeRemaining(0);
                    setIsTimerRunning(false);
                    setShowExtendModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  End Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}