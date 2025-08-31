import { useState, useEffect } from 'react';

interface Timer {
  id: string;
  name: string;
  duration: number;
  remaining: number;
  status: 'idle' | 'running' | 'paused' | 'completed';
  speaker: string;
  notes: string;
}

interface DemoStep {
  title: string;
  description: string;
  duration: number;
}

export function Demo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [timers, setTimers] = useState<Timer[]>([
    {
      id: '1',
      name: 'Opening Keynote',
      duration: 1800, // 30 minutes
      remaining: 1800,
      status: 'idle',
      speaker: 'Dr. Sarah Chen',
      notes: 'Welcome attendees, introduce conference theme, highlight key speakers'
    },
    {
      id: '2',
      name: 'AI in Healthcare Panel',
      duration: 2700, // 45 minutes
      remaining: 2700,
      status: 'idle',
      speaker: 'Panel Discussion',
      notes: '4 speakers: Dr. Chen, Prof. Martinez, Dr. Kim, Dr. Johnson. Q&A for last 15 minutes'
    },
    {
      id: '3',
      name: 'Coffee Break',
      duration: 900, // 15 minutes
      remaining: 900,
      status: 'idle',
      speaker: 'Break',
      notes: 'Networking opportunity, refreshments in lobby'
    }
  ]);

  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [slackMessages, setSlackMessages] = useState<string[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const demoSteps: DemoStep[] = [
    { title: 'Event Dashboard Overview', description: 'View all timers and event status', duration: 3000 },
    { title: 'Creating a New Timer', description: 'Add speaker and session details', duration: 4000 },
    { title: 'Starting a Session', description: 'Begin countdown and notifications', duration: 3000 },
    { title: 'Live Timer Management', description: 'Monitor progress and send alerts', duration: 4000 },
    { title: 'Speaker Self-Service', description: 'Speakers can update their own notes', duration: 3000 },
    { title: 'Moderator Controls', description: 'Share control links with team members', duration: 3000 },
    { title: 'Advanced Notifications', description: 'Custom Slack alerts and channels', duration: 3000 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, demoSteps[currentStep]?.duration || 3000);

    return () => clearInterval(interval);
  }, [currentStep, demoSteps]);

  useEffect(() => {
    // Simulate timer countdown
    if (activeTimer) {
      const interval = setInterval(() => {
        setTimers(prev => prev.map(timer => {
          if (timer.id === activeTimer && timer.status === 'running' && timer.remaining > 0) {
            const newRemaining = timer.remaining - 1;
            
            // Simulate Slack notifications
            if (newRemaining === 300) { // 5 minutes left
              setSlackMessages(prev => [...prev, `⚠️ 5 minutes remaining for "${timer.name}" with ${timer.speaker}`]);
            }
            if (newRemaining === 60) { // 1 minute left
              setSlackMessages(prev => [...prev, `🚨 1 minute remaining for "${timer.name}"`]);
            }
            if (newRemaining === 0) { // Time's up
              setSlackMessages(prev => [...prev, `✅ "${timer.name}" session completed. Next: Coffee Break`]);
              return { ...timer, remaining: 0, status: 'completed' as const };
            }
            
            return { ...timer, remaining: newRemaining };
          }
          return timer;
        }));
      }, 100); // Fast demo speed

      return () => clearInterval(interval);
    }
  }, [activeTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id ? { ...timer, status: 'running' } : timer
    ));
    setActiveTimer(id);
  };

  const pauseTimer = (id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id ? { ...timer, status: 'paused' } : timer
    ));
    setActiveTimer(null);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Dashboard Overview
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Tech Summit 2024 - Main Auditorium</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{timers.length}</div>
                  <div className="text-sm text-slate-600">Active Sessions</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">247</div>
                  <div className="text-sm text-slate-600">Attendees</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">5</div>
                  <div className="text-sm text-slate-600">Team Members</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 1: // Creating Timer
        return (
          <div className="space-y-6">
            {showCreateForm ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Create New Timer</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Session Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      value="Blockchain Workshop"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Speaker</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      value="Prof. Alex Martinez"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Duration (minutes)</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      value="60"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Speaker Notes</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg h-24"
                      value="Hands-on workshop covering smart contracts, DeFi protocols, and practical blockchain development"
                      readOnly
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
                    Create Timer
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <button 
                  onClick={() => setShowCreateForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-lg"
                >
                  + Create New Timer
                </button>
              </div>
            )}
          </div>
        );

      case 2: // Starting Session
      case 3: // Live Management
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              {timers.map((timer) => (
                <div key={timer.id} className={`bg-white rounded-xl shadow-lg p-6 ${timer.status === 'running' ? 'ring-2 ring-blue-500' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{timer.name}</h3>
                      <p className="text-slate-600">{timer.speaker}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-mono font-bold ${
                        timer.remaining <= 300 ? 'text-red-600' : 
                        timer.remaining <= 600 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {formatTime(timer.remaining)}
                      </div>
                      <div className="text-sm text-slate-500">
                        {timer.status === 'running' ? 'Running' : 
                         timer.status === 'paused' ? 'Paused' : 
                         timer.status === 'completed' ? 'Completed' : 'Ready'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mb-4">
                    {timer.status === 'idle' && (
                      <button 
                        onClick={() => startTimer(timer.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
                      >
                        Start
                      </button>
                    )}
                    {timer.status === 'running' && (
                      <button 
                        onClick={() => pauseTimer(timer.id)}
                        className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium"
                      >
                        Pause
                      </button>
                    )}
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
                      Share Display
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium">
                      Moderator Link
                    </button>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Speaker Notes</h4>
                    <p className="text-sm text-slate-600">{timer.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4: // Speaker Self-Service
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Speaker Portal
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome, Dr. Sarah Chen</h2>
                <p className="text-slate-600">Opening Keynote • Main Auditorium</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Your Session Notes</h3>
                <textarea 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg h-32 mb-4"
                  value="Welcome attendees, introduce conference theme, highlight key speakers. Remember to mention the networking session after lunch."
                  readOnly
                />
                <div className="flex space-x-3">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium">
                    Save Changes
                  </button>
                  <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium">
                    View Timer Display
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 5: // Moderator Controls
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Team Coordination</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Moderator Links</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Stage Manager</div>
                        <div className="text-sm text-slate-500">Can control all timers</div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">Copy Link</button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">AV Technician</div>
                        <div className="text-sm text-slate-500">View-only access</div>
                      </div>
                      <button className="text-green-600 hover:text-green-700 font-medium">Copy Link</button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Speaker Links</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Dr. Sarah Chen</div>
                        <div className="text-sm text-slate-500">Can edit own notes</div>
                      </div>
                      <button className="text-purple-600 hover:text-purple-700 font-medium">Copy Link</button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Prof. Martinez</div>
                        <div className="text-sm text-slate-500">Can edit own notes</div>
                      </div>
                      <button className="text-purple-600 hover:text-purple-700 font-medium">Copy Link</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 6: // Advanced Notifications
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Slack Integration</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Notification Channels</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <div className="font-medium text-slate-900">#event-team</div>
                        <div className="text-sm text-slate-500">Main coordination channel</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="font-medium text-slate-900">#av-tech</div>
                        <div className="text-sm text-slate-500">Technical alerts only</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div>
                        <div className="font-medium text-slate-900">#speakers</div>
                        <div className="text-sm text-slate-500">Speaker updates</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Recent Messages</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {slackMessages.map((message, index) => (
                      <div key={index} className="p-2 bg-slate-50 rounded text-sm">
                        {message}
                      </div>
                    ))}
                    {slackMessages.length === 0 && (
                      <div className="p-4 text-center text-slate-500 text-sm">
                        Start a timer to see live notifications
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Mock Header */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-slate-900">StageCue</span>
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">PRO</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-slate-700">sarah@techsummit.com</span>
              <button className="bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium">
                Settings
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-slate-900">{demoSteps[currentStep]?.title}</h1>
            <div className="text-sm text-slate-500">
              Step {currentStep + 1} of {demoSteps.length}
            </div>
          </div>
          <p className="text-slate-600 mb-4">{demoSteps[currentStep]?.description}</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        {renderStep()}
      </div>
    </div>
  );
}