import { useState, useEffect } from 'react';

interface Timer {
  id: string;
  name: string;
  duration: number;
  remaining: number;
  status: 'idle' | 'running' | 'paused' | 'completed';
  speaker: string;
  notes: string;
  room: string;
  attendees: number;
  warningTimes: number[];
  customAlerts: string[];
  priority: 'low' | 'medium' | 'high';
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'away' | 'busy';
  avatar: string;
}

interface Analytics {
  totalSessions: number;
  averageOverrun: number;
  onTimePercentage: number;
  attendeeEngagement: number;
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
      name: 'Opening Keynote: The Future of AI',
      duration: 1800,
      remaining: 1122,
      status: 'running',
      speaker: 'Dr. Sarah Chen',
      notes: 'Welcome attendees, introduce conference theme, highlight key speakers. Demo the new AI assistant live on stage.',
      room: 'Main Auditorium',
      attendees: 847,
      warningTimes: [300, 120, 60],
      customAlerts: ['Prepare demo laptop', 'Check microphone levels', 'Cue spotlight'],
      priority: 'high'
    },
    {
      id: '2',
      name: 'AI in Healthcare: Transforming Patient Care',
      duration: 2700,
      remaining: 2700,
      status: 'idle',
      speaker: 'Panel Discussion',
      notes: '4 speakers: Dr. Chen, Prof. Martinez, Dr. Kim, Dr. Johnson. Q&A for last 15 minutes. Have backup questions ready.',
      room: 'Conference Hall B',
      attendees: 324,
      warningTimes: [900, 300, 60],
      customAlerts: ['Set up panel microphones', 'Prepare Q&A cards', 'Check livestream'],
      priority: 'high'
    },
    {
      id: '3',
      name: 'Networking Coffee Break',
      duration: 900,
      remaining: 900,
      status: 'idle',
      speaker: 'Break',
      notes: 'Networking opportunity, refreshments in lobby. Sponsors have demo booths set up.',
      room: 'Main Lobby',
      attendees: 650,
      warningTimes: [300, 120],
      customAlerts: ['Announce sponsor booths', 'Prepare next session rooms'],
      priority: 'medium'
    },
    {
      id: '4',
      name: 'Workshop: Building AI Applications',
      duration: 3600,
      remaining: 3600,
      status: 'idle',
      speaker: 'Prof. Alex Martinez',
      notes: 'Hands-on coding workshop. Participants need laptops. GitHub repo: ai-workshop-2024',
      room: 'Workshop Room A',
      attendees: 85,
      warningTimes: [1800, 900, 300, 60],
      customAlerts: ['Check WiFi capacity', 'Distribute workshop materials', 'Test code examples'],
      priority: 'medium'
    }
  ]);

  const [teamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Sarah Johnson', role: 'Event Director', status: 'online', avatar: 'SJ' },
    { id: '2', name: 'Mike Chen', role: 'Stage Manager', status: 'online', avatar: 'MC' },
    { id: '3', name: 'Lisa Park', role: 'AV Technician', status: 'busy', avatar: 'LP' },
    { id: '4', name: 'David Kim', role: 'Registration', status: 'online', avatar: 'DK' },
    { id: '5', name: 'Emma Wilson', role: 'Catering Coordinator', status: 'away', avatar: 'EW' }
  ]);

  const [analytics] = useState<Analytics>({
    totalSessions: 24,
    averageOverrun: 2.3,
    onTimePercentage: 87,
    attendeeEngagement: 94
  });

  const [activeTimer, setActiveTimer] = useState<string>('1');
  const [slackMessages, setSlackMessages] = useState<string[]>([
    '🎯 Opening Keynote started with 847 attendees',
    '📊 Attendance tracking: 92% check-in rate',
    '🔧 AV Team: All systems green for main auditorium'
  ]);
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('Main Auditorium');
  const [livePolls, setLivePolls] = useState([
    { question: 'How would you rate this keynote?', responses: 234, avgRating: 4.7 },
    { question: 'Which topic interests you most?', responses: 189, topAnswer: 'AI Ethics' }
  ]);

  const demoSteps: DemoStep[] = [
    { title: 'Mission Control Dashboard', description: 'Real-time event overview with live analytics and team status', duration: 4000 },
    { title: 'Advanced Timer Creation', description: 'Smart scheduling with room management and attendee tracking', duration: 4000 },
    { title: 'Live Session Management', description: 'Multi-room coordination with real-time alerts and controls', duration: 4000 },
    { title: 'AI-Powered Insights', description: 'Predictive analytics and automated recommendations', duration: 4000 },
    { title: 'Speaker Experience Portal', description: 'Comprehensive speaker dashboard with audience feedback', duration: 4000 },
    { title: 'Team Collaboration Hub', description: 'Real-time coordination with role-based permissions', duration: 4000 },
    { title: 'Advanced Integrations', description: 'Multi-platform notifications and third-party connections', duration: 4000 },
    { title: 'Event Analytics & Reporting', description: 'Comprehensive insights and performance metrics', duration: 4000 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, demoSteps[currentStep]?.duration || 4000);

    return () => clearInterval(interval);
  }, [currentStep, demoSteps]);

  useEffect(() => {
    // Simulate timer countdown and smart notifications
    if (activeTimer) {
      const interval = setInterval(() => {
        setTimers(prev => prev.map(timer => {
          if (timer.id === activeTimer && timer.status === 'running' && timer.remaining > 0) {
            const newRemaining = timer.remaining - 1;
            
            // Smart notifications based on custom warning times
            if (timer.warningTimes.includes(newRemaining)) {
              const minutes = Math.floor(newRemaining / 60);
              setSlackMessages(prev => [...prev, `⏰ ${minutes} minute${minutes !== 1 ? 's' : ''} remaining for "${timer.name}" in ${timer.room}`]);
            }
            
            // Custom alerts
            if (newRemaining === 180 && timer.customAlerts.length > 0) {
              setSlackMessages(prev => [...prev, `🎬 Custom Alert: ${timer.customAlerts[0]} for "${timer.name}"`]);
            }
            
            // AI-powered predictions
            if (newRemaining === 600) {
              setSlackMessages(prev => [...prev, `🤖 AI Insight: Based on speaker pace, session may run 3 minutes over. Consider gentle time reminder.`]);
            }
            
            if (newRemaining === 0) {
              setSlackMessages(prev => [...prev, `✅ "${timer.name}" completed. Auto-transitioning to next session in ${timer.room}.`]);
              return { ...timer, remaining: 0, status: 'completed' as const };
            }
            
            return { ...timer, remaining: newRemaining };
          }
          return timer;
        }));
      }, 50); // Faster for demo

      return () => clearInterval(interval);
    }
  }, [activeTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = (remaining: number, duration: number) => {
    const percentage = (remaining / duration) * 100;
    if (percentage <= 5) return 'text-red-600';
    if (percentage <= 15) return 'text-orange-600';
    if (percentage <= 30) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
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
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Mission Control Dashboard
        return (
          <div className="space-y-6">
            {/* Event Header with Live Stats */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">AI Summit 2024 - Mission Control</h2>
                  <p className="text-blue-100">San Francisco Convention Center • Live Event</p>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">LIVE</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">1,247</div>
                  <div className="text-sm text-blue-100">Total Attendees</div>
                  <div className="text-xs text-green-300 mt-1">↗ +23 since last hour</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">4</div>
                  <div className="text-sm text-blue-100">Active Sessions</div>
                  <div className="text-xs text-blue-300 mt-1">2 starting soon</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">94%</div>
                  <div className="text-sm text-blue-100">Engagement Score</div>
                  <div className="text-xs text-green-300 mt-1">Above target</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">87%</div>
                  <div className="text-sm text-blue-100">On-Time Rate</div>
                  <div className="text-xs text-yellow-300 mt-1">2.3min avg delay</div>
                </div>
              </div>
            </div>

            {/* Team Status and Quick Actions */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Live Session Overview</h3>
                <div className="space-y-4">
                  {timers.slice(0, 2).map((timer) => (
                    <div key={timer.id} className={`p-4 rounded-xl border-2 ${timer.status === 'running' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-bold text-slate-900">{timer.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(timer.priority)}`}>
                              {timer.priority.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-600">
                            <span>🎤 {timer.speaker}</span>
                            <span>📍 {timer.room}</span>
                            <span>👥 {timer.attendees} attendees</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-mono font-bold ${getTimerColor(timer.remaining, timer.duration)}`}>
                            {formatTime(timer.remaining)}
                          </div>
                          <div className="text-sm text-slate-500 capitalize">{timer.status}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Team Status</h3>
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {member.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">{member.name}</div>
                        <div className="text-sm text-slate-500">{member.role}</div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        member.status === 'online' ? 'bg-green-100 text-green-700' :
                        member.status === 'busy' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {member.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 1: // Advanced Timer Creation
        return (
          <div className="space-y-6">
            {showCreateForm ? (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Create Smart Session</h3>
                  <button 
                    onClick={() => setShowCreateForm(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Session Details</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value="Machine Learning Ethics Workshop"
                        readOnly
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Duration</label>
                        <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option>90 minutes</option>
                          <option>60 minutes</option>
                          <option>45 minutes</option>
                          <option>30 minutes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Priority</label>
                        <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option>High Priority</option>
                          <option>Medium Priority</option>
                          <option>Low Priority</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Room Assignment</label>
                      <select 
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                      >
                        <option>Workshop Room A (Capacity: 100)</option>
                        <option>Workshop Room B (Capacity: 75)</option>
                        <option>Conference Hall C (Capacity: 200)</option>
                        <option>Main Auditorium (Capacity: 1000)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Speaker Information</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg mb-3"
                        value="Dr. Priya Sharma, AI Ethics Researcher"
                        readOnly
                      />
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                        value="priya.sharma@university.edu"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Smart Alerts Configuration</label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm font-medium">15-minute warning</span>
                          <input type="checkbox" checked readOnly className="rounded" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm font-medium">5-minute warning</span>
                          <input type="checkbox" checked readOnly className="rounded" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm font-medium">1-minute final call</span>
                          <input type="checkbox" checked readOnly className="rounded" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Custom Pre-Session Alerts</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 p-2 bg-slate-50 rounded">
                          <span className="text-sm">🎤 Check microphone levels</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-slate-50 rounded">
                          <span className="text-sm">💻 Test presentation slides</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-slate-50 rounded">
                          <span className="text-sm">📊 Prepare audience polls</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Session Notes</label>
                      <textarea 
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
                        value="Interactive workshop covering bias in AI systems, fairness metrics, and ethical decision-making frameworks. Includes hands-on exercises with real datasets."
                        readOnly
                      />
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Create Session
                      </button>
                      <button className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                        Save Template
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Smart Session Creation</h3>
                  <p className="text-slate-600 max-w-md mx-auto">AI-powered scheduling with room optimization and automated speaker coordination</p>
                </div>
                <button 
                  onClick={() => setShowCreateForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Create Smart Session
                </button>
              </div>
            )}
          </div>
        );

      case 2: // Live Session Management
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Multi-Room Session Control</h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">All Rooms</button>
                  <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium">Main Floor</button>
                  <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium">Workshop Level</button>
                </div>
              </div>

              <div className="grid gap-6">
                {timers.map((timer) => (
                  <div key={timer.id} className={`p-6 rounded-xl border-2 transition-all ${
                    timer.status === 'running' ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50' : 
                    timer.status === 'completed' ? 'border-green-500 bg-green-50' :
                    'border-slate-200 bg-white'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-xl font-bold text-slate-900">{timer.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(timer.priority)}`}>
                            {timer.priority.toUpperCase()}
                          </span>
                          {timer.status === 'running' && (
                            <div className="flex items-center space-x-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                              <span>LIVE</span>
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-500">🎤</span>
                            <span className="font-medium">{timer.speaker}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-500">📍</span>
                            <span>{timer.room}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-500">👥</span>
                            <span>{timer.attendees} attendees</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-500">⏱️</span>
                            <span>{Math.floor(timer.duration / 60)} min session</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-6">
                        <div className={`text-4xl font-mono font-bold mb-1 ${getTimerColor(timer.remaining, timer.duration)}`}>
                          {formatTime(timer.remaining)}
                        </div>
                        <div className="text-sm text-slate-500 capitalize mb-2">{timer.status}</div>
                        <div className="w-32 bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              timer.remaining / timer.duration > 0.3 ? 'bg-green-500' :
                              timer.remaining / timer.duration > 0.1 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(timer.remaining / timer.duration) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        {timer.status === 'idle' && (
                          <button 
                            onClick={() => startTimer(timer.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            ▶ Start
                          </button>
                        )}
                        {timer.status === 'running' && (
                          <>
                            <button 
                              onClick={() => pauseTimer(timer.id)}
                              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                              ⏸ Pause
                            </button>
                            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                              +5 Min
                            </button>
                          </>
                        )}
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          📺 Display
                        </button>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          🔗 Share Control
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-slate-600">AV Ready</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-slate-600">Stream Live</span>
                        </div>
                      </div>
                    </div>

                    {timer.customAlerts.length > 0 && (
                      <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                        <div className="text-sm font-medium text-slate-700 mb-2">Pre-Session Checklist:</div>
                        <div className="flex flex-wrap gap-2">
                          {timer.customAlerts.map((alert, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                              {alert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // AI-Powered Insights
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">AI Event Intelligence</h3>
                  <p className="text-blue-100">Real-time insights and predictive analytics</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">94%</div>
                  <div className="text-sm text-blue-100">Predicted Satisfaction</div>
                  <div className="text-xs text-green-300 mt-1">↗ +7% vs last event</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">12 min</div>
                  <div className="text-sm text-blue-100">Optimal Break Length</div>
                  <div className="text-xs text-blue-300 mt-1">Based on engagement data</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">3</div>
                  <div className="text-sm text-blue-100">Sessions at Risk</div>
                  <div className="text-xs text-yellow-300 mt-1">May run over time</div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-xl font-bold text-slate-900 mb-4">🤖 AI Recommendations</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-blue-900">Timing Optimization</div>
                        <div className="text-sm text-blue-700 mt-1">Dr. Chen's keynote is running 15% slower than optimal pace. Consider a gentle 10-minute reminder.</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-green-900">Engagement Boost</div>
                        <div className="text-sm text-green-700 mt-1">Workshop Room A showing high engagement. Consider extending Q&A by 5 minutes.</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-yellow-900">Capacity Alert</div>
                        <div className="text-sm text-yellow-700 mt-1">Conference Hall B approaching 95% capacity. Consider overflow room setup.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-xl font-bold text-slate-900 mb-4">📊 Live Audience Insights</h4>
                <div className="space-y-4">
                  {livePolls.map((poll, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-slate-900">{poll.question}</div>
                        <div className="text-sm text-slate-500">{poll.responses} responses</div>
                      </div>
                      {poll.avgRating ? (
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg key={star} className={`w-4 h-4 ${star <= poll.avgRating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-slate-700">{poll.avgRating}/5</span>
                        </div>
                      ) : (
                        <div className="text-sm text-blue-600 font-medium">Top: {poll.topAnswer}</div>
                      )}
                    </div>
                  ))}
                  
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-blue-900">Live Sentiment Analysis</span>
                    </div>
                    <div className="text-sm text-blue-700">Current session sentiment: 87% positive, trending upward</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Speaker Experience Portal
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                  Speaker Portal - Premium Experience
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">SC</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome, Dr. Sarah Chen</h2>
                <p className="text-slate-600">Opening Keynote: The Future of AI • Main Auditorium</p>
                <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-slate-600">Session Active</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-slate-600">👥 847 attendees</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-slate-600">⏱️ 18:42 remaining</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Timer Display */}
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="text-5xl font-mono font-bold text-slate-900 mb-2">18:42</div>
                  <div className="text-slate-600 text-lg mb-4">Time Remaining</div>
                  <div className="flex justify-center space-x-2 mb-4">
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      On Track
                    </div>
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      Q&A Ready
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>

                {/* Session Notes */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-4">Your Session Notes</h3>
                  <textarea 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg h-32 mb-4 text-sm"
                    value="Key Points:
• AI diagnostic accuracy improvements
• Patient data privacy concerns  
• Implementation challenges in hospitals
• Future regulatory landscape

Demo: Show live AI diagnosis tool
Q&A: Focus on practical applications"
                    readOnly
                  />
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm">
                      Save Changes
                    </button>
                    <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium text-sm">
                      Export PDF
                    </button>
                  </div>
                </div>

                {/* Live Feedback */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-4">Live Audience Feedback</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Engagement Level</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                        <span className="text-sm font-bold text-green-600">94%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Pace Rating</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-sm font-medium text-purple-900 mb-1">Live Questions (23)</div>
                      <div className="text-xs text-purple-700">Top: "How do you handle bias in training data?"</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Speaker Tools */}
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-4">Presentation Tools</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
                      <div className="text-2xl mb-1">📊</div>
                      <div className="text-sm font-medium">Launch Poll</div>
                    </button>
                    <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
                      <div className="text-2xl mb-1">❓</div>
                      <div className="text-sm font-medium">Q&A Mode</div>
                    </button>
                    <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
                      <div className="text-2xl mb-1">📱</div>
                      <div className="text-sm font-medium">Share Screen</div>
                    </button>
                    <button className="p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-center transition-colors">
                      <div className="text-2xl mb-1">🎤</div>
                      <div className="text-sm font-medium">Audio Check</div>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-4">Session Support</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">MJ</span>
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">Mike Johnson</div>
                          <div className="text-sm text-slate-500">Stage Manager</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">Available</span>
                      </div>
                    </div>
                    
                    <button className="w-full p-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium transition-colors">
                      🚨 Request Technical Support
                    </button>
                    
                    <button className="w-full p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition-colors">
                      💬 Message Event Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5: // Team Collaboration Hub
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Team Collaboration Hub</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600">5 team members online</span>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Role-Based Access Control */}
                <div className="lg:col-span-2">
                  <h4 className="font-bold text-slate-900 mb-4">Smart Link Sharing</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-semibold text-blue-900">Stage Manager Control</div>
                          <div className="text-sm text-blue-700">Full timer control + emergency overrides</div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium">Copy Link</button>
                          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">QR Code</button>
                        </div>
                      </div>
                      <div className="text-xs text-blue-600 font-mono bg-blue-50 p-2 rounded">
                        stagecue.com/control/stage-mgr-abc123
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-semibold text-green-900">AV Technician View</div>
                          <div className="text-sm text-green-700">Monitor-only access + technical alerts</div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-medium">Copy Link</button>
                          <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">QR Code</button>
                        </div>
                      </div>
                      <div className="text-xs text-green-600 font-mono bg-green-50 p-2 rounded">
                        stagecue.com/monitor/av-tech-def456
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-semibold text-purple-900">Speaker Self-Service</div>
                          <div className="text-sm text-purple-700">Personal notes + session feedback</div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm font-medium">Copy Link</button>
                          <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">Email</button>
                        </div>
                      </div>
                      <div className="text-xs text-purple-600 font-mono bg-purple-50 p-2 rounded">
                        stagecue.com/speaker/sarah-chen-ghi789
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-semibold text-orange-900">Public Display</div>
                          <div className="text-sm text-orange-700">Clean countdown for screens + projectors</div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-orange-600 text-white rounded-lg text-sm font-medium">Copy Link</button>
                          <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">Fullscreen</button>
                        </div>
                      </div>
                      <div className="text-xs text-orange-600 font-mono bg-orange-50 p-2 rounded">
                        stagecue.com/display/main-auditorium-jkl012
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Status */}
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Team Status</h4>
                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {member.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">{member.name}</div>
                          <div className="text-sm text-slate-500">{member.role}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            member.status === 'online' ? 'bg-green-100 text-green-700' :
                            member.status === 'busy' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {member.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-2">Quick Actions</h5>
                    <div className="space-y-2">
                      <button className="w-full p-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                        📢 Broadcast to All
                      </button>
                      <button className="w-full p-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                        🚨 Emergency Alert
                      </button>
                      <button className="w-full p-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                        📊 Team Performance
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Activity Feed */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-bold text-slate-900 mb-4">Live Activity Feed</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm"><span className="font-medium">Mike Johnson</span> started timer for "Opening Keynote"</div>
                    <div className="text-xs text-slate-500">2 minutes ago</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm"><span className="font-medium">Lisa Park</span> confirmed AV setup for Workshop Room A</div>
                    <div className="text-xs text-slate-500">5 minutes ago</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm"><span className="font-medium">Dr. Sarah Chen</span> updated session notes</div>
                    <div className="text-xs text-slate-500">8 minutes ago</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm"><span className="font-medium">System</span> sent 5-minute warning to Main Auditorium</div>
                    <div className="text-xs text-slate-500">12 minutes ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 6: // Advanced Integrations
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Advanced Integration Hub</h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Multi-Platform Notifications */}
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Smart Notification Channels</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.521-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.523 2.521h-2.521V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.521A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.523v-2.521h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-green-900">Slack Integration</div>
                            <div className="text-sm text-green-700">Multi-channel smart routing</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600 font-medium">Connected</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-green-100 rounded">
                          <span className="text-sm font-medium">#event-control</span>
                          <span className="text-xs text-green-600">Critical alerts</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-100 rounded">
                          <span className="text-sm font-medium">#av-team</span>
                          <span className="text-xs text-green-600">Technical updates</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-100 rounded">
                          <span className="text-sm font-medium">#speakers</span>
                          <span className="text-xs text-green-600">Speaker notifications</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-blue-900">Twitter/X Integration</div>
                            <div className="text-sm text-blue-700">Auto-tweet session updates</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-blue-600 font-medium">Connected</span>
                        </div>
                      </div>
                      <div className="text-sm text-blue-700 bg-blue-100 p-2 rounded">
                        Latest: "🎤 Dr. Sarah Chen's AI keynote is live! #AISummit2024 #Innovation"
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-purple-900">Discord Integration</div>
                            <div className="text-sm text-purple-700">Community engagement</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-purple-600 font-medium">Connected</span>
                        </div>
                      </div>
                      <div className="text-sm text-purple-700 bg-purple-100 p-2 rounded">
                        Active in #ai-summit-live with 1,247 members
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Message Feed */}
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Live Notification Feed</h4>
                  <div className="bg-slate-50 rounded-xl p-4 h-96 overflow-y-auto">
                    <div className="space-y-3">
                      {slackMessages.map((message, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-slate-900">{message}</div>
                            <div className="text-xs text-slate-500 mt-1">Just now</div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-slate-900">🐦 Auto-tweeted: "Amazing insights from Dr. Chen on AI ethics! 🤖 #AISummit2024"</div>
                          <div className="text-xs text-slate-500 mt-1">2 minutes ago</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-slate-900">💬 Discord: "The keynote is incredible! When will slides be available?"</div>
                          <div className="text-xs text-slate-500 mt-1">3 minutes ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Third-Party Integrations */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Third-Party Integrations</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border border-slate-200 rounded-lg text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div className="font-medium text-slate-900">YouTube Live</div>
                  <div className="text-sm text-slate-500">Auto-stream sessions</div>
                  <div className="mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Connected</span>
                  </div>
                </div>

                <div className="p-4 border border-slate-200 rounded-lg text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div className="font-medium text-slate-900">LinkedIn Events</div>
                  <div className="text-sm text-slate-500">Professional updates</div>
                  <div className="mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Connected</span>
                  </div>
                </div>

                <div className="p-4 border border-slate-200 rounded-lg text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </div>
                  <div className="font-medium text-slate-900">Pinterest</div>
                  <div className="text-sm text-slate-500">Visual content sharing</div>
                  <div className="mt-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Setup Required</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 7: // Event Analytics & Reporting
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">Event Analytics Dashboard</h3>
                  <p className="text-indigo-100">Comprehensive insights and performance metrics</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">AI Summit 2024</div>
                  <div className="text-indigo-100">Live Performance Data</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold mb-1">98.2%</div>
                  <div className="text-sm text-indigo-100">Event Success Score</div>
                  <div className="text-xs text-green-300 mt-1">↗ +12% vs target</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold mb-1">1,247</div>
                  <div className="text-sm text-indigo-100">Peak Attendance</div>
                  <div className="text-xs text-blue-300 mt-1">847 concurrent sessions</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold mb-1">4.8/5</div>
                  <div className="text-sm text-indigo-100">Avg Session Rating</div>
                  <div className="text-xs text-green-300 mt-1">1,089 reviews</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold mb-1">2.1min</div>
                  <div className="text-sm text-indigo-100">Avg Overrun</div>
                  <div className="text-xs text-yellow-300 mt-1">Within target range</div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Session Performance */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-xl font-bold text-slate-900 mb-4">Session Performance Analysis</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-green-900">Opening Keynote: The Future of AI</div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">EXCELLENT</span>
                        <span className="text-green-600 font-bold">4.9/5</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-slate-500">Attendance</div>
                        <div className="font-bold text-slate-900">847/850</div>
                      </div>
                      <div>
                        <div className="text-slate-500">Engagement</div>
                        <div className="font-bold text-slate-900">94%</div>
                      </div>
                      <div>
                        <div className="text-slate-500">On Time</div>
                        <div className="font-bold text-green-600">✓ Perfect</div>
                      </div>
                      <div>
                        <div className="text-slate-500">Q&A</div>
                        <div className="font-bold text-slate-900">23 questions</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-blue-900">AI in Healthcare Panel</div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">GREAT</span>
                        <span className="text-blue-600 font-bold">4.6/5</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-slate-500">Attendance</div>
                        <div className="font-bold text-slate-900">324/350</div>
                      </div>
                      <div>
                        <div className="text-slate-500">Engagement</div>
                        <div className="font-bold text-slate-900">89%</div>
                      </div>
                      <div>
                        <div className="text-slate-500">Timing</div>
                        <div className="font-bold text-yellow-600">+3min over</div>
                      </div>
                      <div>
                        <div className="text-slate-500">Q&A</div>
                        <div className="font-bold text-slate-900">31 questions</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-purple-900">ML Ethics Workshop</div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">EXCELLENT</span>
                        <span className="text-purple-600 font-bold">4.8/5</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-slate-500">Attendance</div>
                        <div className="font-bold text-slate-900">85/100</div>
                      </div>
                      <div>
                        <div className="text-slate-500">Engagement</div>
                        <div className="font-bold text-slate-900">96%</div>
                      </div>
                      <div>
                        <div className="text-slate-500">Timing</div>
                        <div className="font-bold text-green-600">Perfect</div>
                      </div>
                      <div>
                        <div className="text-slate-500">Hands-on</div>
                        <div className="font-bold text-slate-900">78 completed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Insights */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-xl font-bold text-slate-900 mb-4">Key Insights</h4>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-900">Top Performer</span>
                    </div>
                    <div className="text-sm text-green-700">ML Ethics Workshop achieved 96% engagement with perfect timing</div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-blue-900">Timing Insight</span>
                    </div>
                    <div className="text-sm text-blue-700">Panel discussions tend to run 2-4 minutes over. Consider shorter Q&A.</div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      <span className="font-medium text-purple-900">Engagement</span>
                    </div>
                    <div className="text-sm text-purple-700">Interactive workshops show 15% higher engagement than lectures</div>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <span className="font-medium text-yellow-900">Recommendation</span>
                    </div>
                    <div className="text-sm text-yellow-700">Schedule 15-min buffer between high-attendance sessions</div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <h5 className="font-medium text-slate-900 mb-3">Export Options</h5>
                  <div className="space-y-2">
                    <button className="w-full p-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                      📊 Download Full Report
                    </button>
                    <button className="w-full p-2 bg-green-600 text-white rounded-lg text-sm font-medium">
                      📈 Export to Excel
                    </button>
                    <button className="w-full p-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
                      📧 Email Summary
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Predictive Analytics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-xl font-bold text-slate-900 mb-4">🔮 Predictive Analytics for Future Events</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600 mb-2">87%</div>
                  <div className="font-medium text-blue-900 mb-1">Predicted Success Rate</div>
                  <div className="text-sm text-blue-700">For similar AI/Tech conferences based on current performance patterns</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="text-2xl font-bold text-green-600 mb-2">1,450</div>
                  <div className="font-medium text-green-900 mb-1">Optimal Capacity</div>
                  <div className="text-sm text-green-700">Recommended attendee limit for next event to maximize satisfaction</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600 mb-2">45min</div>
                  <div className="font-medium text-purple-900 mb-1">Ideal Session Length</div>
                  <div className="text-sm text-purple-700">Sweet spot for engagement vs. attention span based on data analysis</div>
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
                <span className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold border border-purple-200">
                  PRO
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-600">Live Event</span>
                </div>
                <div className="text-slate-400">|</div>
                <span className="text-slate-700 font-medium">sarah@techsummit.com</span>
              </div>
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
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
            <div className="flex items-center space-x-3">
              <div className="text-sm text-slate-500">
                Step {currentStep + 1} of {demoSteps.length}
              </div>
              <div className="flex space-x-1">
                {demoSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep ? 'bg-blue-600' : 
                      index < currentStep ? 'bg-green-500' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-slate-600 mb-4">{demoSteps[currentStep]?.description}</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
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