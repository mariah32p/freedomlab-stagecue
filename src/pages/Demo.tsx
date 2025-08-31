import { useState, useEffect } from 'react';

interface DemoLayoutProps {
  children: React.ReactNode;
  currentStep: string;
  onStepChange: (step: string) => void;
}

function DemoLayout({ children, currentStep, onStepChange }: DemoLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900">StageCue</span>
              <span className="ml-3 text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Demo</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm font-medium">Live Demo</span>
              </div>
              <div className="text-sm text-slate-600 bg-white px-3 py-2 rounded-lg shadow-sm border">
                sarah.chen@techsummit.com
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}

export function Demo() {
  const [currentStep, setCurrentStep] = useState('dashboard');
  const [timeRemaining, setTimeRemaining] = useState(1380); // 23:00 in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'5min' | '2min' | 'overtime'>('5min');
  const [showSlackModal, setShowSlackModal] = useState(false);
  const [showSpeakerModal, setShowSpeakerModal] = useState(false);
  
  const [sessionNotes, setSessionNotes] = useState({
    intro: "Welcome everyone! Start with agenda overview and introduce key topics we'll cover today.",
    fiveMin: "Present market statistics: 73% adoption rate, $2.4B market size. Show the growth chart.",
    twentyMin: "Deep dive into case studies: JPMorgan's blockchain implementation, Visa's pilot program results.",
    twentyFiveMin: "Summarize key takeaways and transition to Q&A. Remind audience about networking session."
  });
  
  const [sessionTitle, setSessionTitle] = useState('Blockchain in Finance: Real-World Applications');
  const [speakerName, setSpeakerName] = useState('Robert Kim');
  const [sessionDuration, setSessionDuration] = useState('30');
  const [notificationSettings, setNotificationSettings] = useState({
    slack: true,
    email: true
  });

  // Timer countdown effect
  useEffect(() => {
    if (!isTimerRunning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        
        // Trigger alerts at specific times
        if (newTime === 300) { // 5 minutes
          setAlertType('5min');
          setShowAlert(true);
          setShowSlackModal(true);
          setTimeout(() => setShowAlert(false), 3000);
        } else if (newTime === 120) { // 2 minutes
          setAlertType('2min');
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        } else if (newTime === 0) { // Time's up
          setAlertType('overtime');
          setShowAlert(true);
          setIsTimerRunning(false);
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  // Auto-advance through steps with realistic timing
  useEffect(() => {
    if (currentStep === 'live-session' && !isTimerRunning) {
      // Auto-start timer when entering live session
      setTimeout(() => setIsTimerRunning(true), 1000);
    }

    const stepTimings: Record<string, number> = {
      'dashboard': 4000,
      'create-session': 5000,
      'session-setup': 6000,
      'live-session': 8000, // Longer to show timer in action
      'speaker-portal': 5000,
      'team-coordination': 5000,
      'session-complete': 0 // Don't auto-advance from final step
    };

    const timing = stepTimings[currentStep];
    if (timing === 0) return;

    const timer = setTimeout(() => {
      const steps = [
        'dashboard',
        'create-session', 
        'session-setup',
        'live-session',
        'speaker-portal',
        'team-coordination',
        'session-complete'
      ];
      
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1]);
      }
    }, timing);
    
    return () => clearTimeout(timer);
  }, [currentStep, isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    const sign = seconds < 0 ? '-' : '';
    return `${sign}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = (seconds: number) => {
    if (seconds < 0) return 'text-red-500';
    if (seconds <= 120) return 'text-red-500';
    if (seconds <= 300) return 'text-amber-500';
    return 'text-slate-900';
  };

  const SlackNotificationModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-in slide-in-from-bottom-4 duration-300">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.042 15.165a2.528 2.528 0 0 0 2.5 2.5c.44 0 .85-.113 1.21-.312l1.15-.65-.1-.1c-.215-.215-.215-.565 0-.78l.78-.78c.215-.215.565-.215.78 0l.1.1.65-1.15c.2-.36.312-.77.312-1.21a2.528 2.528 0 0 0-2.5-2.5H5.042z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Slack Notification Sent</h3>
              <p className="text-sm text-slate-600">#event-team</p>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SC</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-900">StageCue Bot</div>
                <div className="text-sm text-slate-600 mt-1">
                  🕐 <strong>5-minute warning</strong> for {speakerName}<br/>
                  📍 {sessionTitle}<br/>
                  ⏰ Session ends at 2:30 PM
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowSlackModal(false)}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );

  const SpeakerAlertModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-in slide-in-from-top-4 duration-300">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Time Alert</h3>
            <p className="text-slate-600">
              {alertType === '5min' && '5 minutes remaining in your session'}
              {alertType === '2min' && '2 minutes remaining - please wrap up'}
              {alertType === 'overtime' && 'Session time has ended'}
            </p>
          </div>
          
          <div className="bg-amber-50 rounded-lg p-4 mb-6">
            <div className="text-center">
              <div className={`text-4xl font-mono font-bold mb-2 ${getTimeColor(timeRemaining)}`}>
                {formatTime(timeRemaining)}
              </div>
              <div className="text-sm text-slate-600">
                {timeRemaining > 0 ? 'Time Remaining' : 'Overtime'}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowSpeakerModal(false)}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Acknowledge
            </button>
            <button
              onClick={() => {
                setTimeRemaining(prev => prev + 300); // Add 5 minutes
                setShowSpeakerModal(false);
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              +5 Minutes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 'dashboard':
        return (
          <DemoLayout currentStep={currentStep} onStepChange={setCurrentStep}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Event Dashboard</h1>
                <p className="text-xl text-slate-600">Tech Summit 2024 • Main Auditorium • 247 attendees</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Active Sessions */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-slate-900">Active Sessions</h2>
                      <button 
                        onClick={() => setCurrentStep('create-session')}
                        className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          New Session
                        </span>
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">Dr. Sarah Chen</h3>
                            <p className="text-slate-600 mb-3">AI in Healthcare: Future Perspectives</p>
                            <div className="flex items-center space-x-6">
                              <div className="text-center">
                                <div className="text-3xl font-mono font-bold text-green-600">18:42</div>
                                <div className="text-xs text-slate-500">remaining</div>
                              </div>
                              <div className="text-center">
                                <div className="text-3xl font-mono font-bold text-slate-700">11:18</div>
                                <div className="text-xs text-slate-500">elapsed</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full mb-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-green-700 font-medium">In Progress</span>
                            </div>
                            <div className="text-sm text-slate-500">Started 2:00 PM</div>
                            <div className="text-xs text-slate-400">247 attendees watching</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">Panel Discussion</h3>
                            <p className="text-slate-600 mb-2">Future of Technology</p>
                            <div className="flex items-center space-x-4 text-sm text-slate-500">
                              <span>4 speakers</span>
                              <span>•</span>
                              <span>45 minutes</span>
                              <span>•</span>
                              <span>Room B</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-blue-600 bg-blue-100 px-3 py-2 rounded-full mb-2 font-medium">
                              Up Next
                            </div>
                            <div className="text-sm text-slate-500">Starts 2:30 PM</div>
                            <div className="text-xs text-slate-400">Ready to begin</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Speaker Queue & Stats */}
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Today's Speakers</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold">SC</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">Sarah Chen</div>
                          <div className="text-sm text-green-600 font-medium">Currently presenting</div>
                          <div className="text-xs text-slate-500">2:00 PM - 2:30 PM</div>
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold">RK</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">Robert Kim</div>
                          <div className="text-sm text-blue-600 font-medium">Ready to present</div>
                          <div className="text-xs text-slate-500">2:30 PM - 3:00 PM</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold">MJ</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">Mike Johnson</div>
                          <div className="text-sm text-slate-500">Scheduled</div>
                          <div className="text-xs text-slate-400">3:15 PM - 4:00 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Event Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600">8</div>
                        <div className="text-xs text-slate-600">Total Sessions</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                        <div className="text-2xl font-bold text-green-600">3</div>
                        <div className="text-xs text-slate-600">Completed</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                        <div className="text-2xl font-bold text-purple-600">247</div>
                        <div className="text-xs text-slate-600">Attendees</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
                        <div className="text-2xl font-bold text-teal-600">5</div>
                        <div className="text-xs text-slate-600">Team Members</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DemoLayout>
        );

      case 'create-session':
        return (
          <DemoLayout currentStep={currentStep} onStepChange={setCurrentStep}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Create New Session</h1>
                <p className="text-xl text-slate-600">Set up timing and speaker details for your next presentation</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8">
                <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="sessionTitle" className="block text-sm font-bold text-slate-700">
                        Session Title
                      </label>
                      <input
                        id="sessionTitle"
                        type="text"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Enter session title"
                        value={sessionTitle}
                        onChange={(e) => setSessionTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="speakerName" className="block text-sm font-bold text-slate-700">
                        Speaker Name
                      </label>
                      <input
                        id="speakerName"
                        type="text"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Enter speaker name"
                        value={speakerName}
                        onChange={(e) => setSpeakerName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="sessionDuration" className="block text-sm font-bold text-slate-700">
                        Duration (minutes)
                      </label>
                      <select 
                        id="sessionDuration"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        value={sessionDuration}
                        onChange={(e) => setSessionDuration(e.target.value)}
                      >
                        <option value="15">15 minutes</option>
                        <option value="20">20 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="sessionTime" className="block text-sm font-bold text-slate-700">
                        Scheduled Time
                      </label>
                      <input
                        id="sessionTime"
                        type="time"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        defaultValue="14:30"
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <label className="block text-sm font-bold text-slate-700 mb-4">
                      Notification Settings
                    </label>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-white/60 rounded-lg">
                        <input 
                          id="slackNotifications"
                          type="checkbox" 
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" 
                          checked={notificationSettings.slack}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, slack: e.target.checked }))}
                        />
                        <label htmlFor="slackNotifications" className="flex-1 text-slate-700 font-medium">
                          Send Slack notifications to #event-team
                        </label>
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5.042 15.165a2.528 2.528 0 0 0 2.5 2.5c.44 0 .85-.113 1.21-.312l1.15-.65-.1-.1c-.215-.215-.215-.565 0-.78l.78-.78c.215-.215.565-.215.78 0l.1.1.65-1.15c.2-.36.312-.77.312-1.21a2.528 2.528 0 0 0-2.5-2.5H5.042z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-white/60 rounded-lg">
                        <input 
                          id="emailNotifications"
                          type="checkbox" 
                          className="w-5 h-5 text-amber-600 rounded focus:ring-2 focus:ring-amber-500" 
                          checked={notificationSettings.email}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, email: e.target.checked }))}
                        />
                        <label htmlFor="emailNotifications" className="flex-1 text-slate-700 font-medium">
                          Email alerts to moderators@techsummit.com
                        </label>
                        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                    <button
                      type="button"
                      className="px-8 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep('session-setup')}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold"
                    >
                      Continue to Setup
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </DemoLayout>
        );

      case 'session-setup':
        return (
          <DemoLayout currentStep={currentStep} onStepChange={setCurrentStep}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Session Timeline Setup</h1>
                <p className="text-xl text-slate-600">{sessionTitle} • {speakerName}</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Timeline Markers</h3>
                  <p className="text-slate-600 mb-6">Add notes and cues at specific time points during the presentation</p>
                </div>

                <div className="space-y-6">
                  {/* 0:00 Marker */}
                  <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500 shadow-sm">
                    <div className="flex-shrink-0 w-20 h-20 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">0:00</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-slate-900">Session Start</h4>
                        <span className="text-xs text-blue-600 bg-blue-200 px-3 py-1 rounded-full font-medium">Auto-trigger</span>
                      </div>
                      <textarea 
                        className="w-full mt-3 px-4 py-3 border border-slate-300 rounded-xl text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        rows={3}
                        placeholder="Add notes for this timing..."
                        value={sessionNotes.intro}
                        onChange={(e) => setSessionNotes(prev => ({ ...prev, intro: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* 5:00 Marker */}
                  <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border-l-4 border-amber-500 shadow-sm">
                    <div className="flex-shrink-0 w-20 h-20 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">5:00</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-slate-900">First Checkpoint</h4>
                        <span className="text-xs text-amber-600 bg-amber-200 px-3 py-1 rounded-full font-medium">Speaker Alert</span>
                      </div>
                      <textarea 
                        className="w-full mt-3 px-4 py-3 border border-slate-300 rounded-xl text-sm resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                        rows={3}
                        placeholder="Add notes for this timing..."
                        value={sessionNotes.fiveMin}
                        onChange={(e) => setSessionNotes(prev => ({ ...prev, fiveMin: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* 20:00 Marker */}
                  <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border-l-4 border-purple-500 shadow-sm">
                    <div className="flex-shrink-0 w-20 h-20 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">20:00</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-slate-900">Main Content</h4>
                        <span className="text-xs text-purple-600 bg-purple-200 px-3 py-1 rounded-full font-medium">Team Alert</span>
                      </div>
                      <textarea 
                        className="w-full mt-3 px-4 py-3 border border-slate-300 rounded-xl text-sm resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                        rows={3}
                        placeholder="Add notes for this timing..."
                        value={sessionNotes.twentyMin}
                        onChange={(e) => setSessionNotes(prev => ({ ...prev, twentyMin: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* 25:00 Marker */}
                  <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border-l-4 border-red-500 shadow-sm">
                    <div className="flex-shrink-0 w-20 h-20 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">25:00</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-slate-900">Wrap-up Warning</h4>
                        <span className="text-xs text-red-600 bg-red-200 px-3 py-1 rounded-full font-medium">Final Alert</span>
                      </div>
                      <textarea 
                        className="w-full mt-3 px-4 py-3 border border-slate-300 rounded-xl text-sm resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        rows={3}
                        placeholder="Add notes for this timing..."
                        value={sessionNotes.twentyFiveMin}
                        onChange={(e) => setSessionNotes(prev => ({ ...prev, twentyFiveMin: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-8 border-t border-slate-200 mt-8">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('dashboard')}
                    className="px-8 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTimeRemaining(1800); // Reset to 30:00
                      setCurrentStep('live-session');
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold"
                  >
                    Start Session
                  </button>
                </div>
              </div>
            </div>
          </DemoLayout>
        );

      case 'live-session':
        return (
          <DemoLayout currentStep={currentStep} onStepChange={setCurrentStep}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Live Session Management</h1>
                    <p className="text-xl text-slate-600">{sessionTitle} • {speakerName}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full shadow-sm">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-medium">Live</span>
                    </div>
                    <div className="text-sm text-slate-500">247 attendees</div>
                  </div>
                </div>
              </div>

              {/* Alert Notification */}
              {showAlert && (
                <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-right-4 duration-500">
                  <div className={`p-4 rounded-xl shadow-2xl border-l-4 ${
                    alertType === '5min' ? 'bg-amber-50 border-amber-500' :
                    alertType === '2min' ? 'bg-red-50 border-red-500' :
                    'bg-red-100 border-red-600'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <svg className={`w-6 h-6 ${
                        alertType === '5min' ? 'text-amber-600' :
                        alertType === '2min' ? 'text-red-600' :
                        'text-red-700'
                      }`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <div className={`font-bold ${
                          alertType === '5min' ? 'text-amber-800' :
                          alertType === '2min' ? 'text-red-800' :
                          'text-red-900'
                        }`}>
                          {alertType === '5min' && '5 Minutes Remaining'}
                          {alertType === '2min' && '2 Minutes - Wrap Up'}
                          {alertType === 'overtime' && 'Session Overtime'}
                        </div>
                        <div className="text-sm text-slate-600">
                          {alertType === '5min' && 'Speaker and team notified'}
                          {alertType === '2min' && 'Final warning sent'}
                          {alertType === 'overtime' && 'Please conclude session'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Timer */}
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                  <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                  
                  <div className="relative">
                    <div className={`text-8xl font-mono font-bold mb-6 tracking-wider transition-colors duration-500 ${getTimeColor(timeRemaining)} ${timeRemaining < 0 ? 'animate-pulse' : ''}`}>
                      {formatTime(timeRemaining)}
                    </div>
                    <div className="text-white/80 text-2xl mb-10 font-medium">
                      {timeRemaining >= 0 ? 'Time Remaining' : 'Overtime'}
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-10">
                      <div className="text-white/60 text-sm mb-3 uppercase tracking-wide">Current Speaker</div>
                      <div className="text-white text-2xl font-bold mb-2">{speakerName}</div>
                      <div className="text-white/80 text-lg">{sessionTitle}</div>
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      <button 
                        onClick={() => setTimeRemaining(prev => prev + 300)}
                        className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        +5 Min
                      </button>
                      <button 
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className={`px-8 py-3 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 ${
                          isTimerRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                      >
                        {isTimerRunning ? 'Pause' : 'Resume'}
                      </button>
                      <button 
                        onClick={() => {
                          setIsTimerRunning(false);
                          setCurrentStep('session-complete');
                        }}
                        className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        End Session
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Session Progress */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50">
                  <h3 className="text-xl font-bold text-slate-900 mb-8">Session Progress</h3>
                  <div className="space-y-4">
                    <div className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                      timeRemaining <= 1500 ? 'bg-green-50 border-2 border-green-200' : 'bg-slate-50'
                    }`}>
                      <div className={`w-4 h-4 rounded-full transition-colors duration-500 ${
                        timeRemaining <= 1500 ? 'bg-green-500' : 'bg-slate-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">0:00 - Session Started</div>
                        <div className={`text-sm transition-colors duration-500 ${
                          timeRemaining <= 1500 ? 'text-green-600' : 'text-slate-500'
                        }`}>
                          {timeRemaining <= 1500 ? 'Completed ✓' : 'Pending'}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                      timeRemaining <= 1200 ? 'bg-green-50 border-2 border-green-200' : 'bg-slate-50'
                    }`}>
                      <div className={`w-4 h-4 rounded-full transition-colors duration-500 ${
                        timeRemaining <= 1200 ? 'bg-green-500' : 'bg-slate-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">5:00 - First Checkpoint</div>
                        <div className={`text-sm transition-colors duration-500 ${
                          timeRemaining <= 1200 ? 'text-green-600' : 'text-slate-500'
                        }`}>
                          {timeRemaining <= 1200 ? 'Completed ✓' : 'Pending'}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                      timeRemaining <= 600 ? 'bg-green-50 border-2 border-green-200' : 
                      timeRemaining <= 900 ? 'bg-blue-50 border-2 border-blue-200' : 'bg-slate-50'
                    }`}>
                      <div className={`w-4 h-4 rounded-full transition-colors duration-500 ${
                        timeRemaining <= 600 ? 'bg-green-500' : 
                        timeRemaining <= 900 ? 'bg-blue-500 animate-pulse' : 'bg-slate-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">20:00 - Main Content</div>
                        <div className={`text-sm transition-colors duration-500 ${
                          timeRemaining <= 600 ? 'text-green-600' : 
                          timeRemaining <= 900 ? 'text-blue-600' : 'text-slate-500'
                        }`}>
                          {timeRemaining <= 600 ? 'Completed ✓' : 
                           timeRemaining <= 900 ? 'In Progress...' : 'Pending'}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                      timeRemaining <= 300 ? 'bg-amber-50 border-2 border-amber-200' : 'bg-slate-50'
                    }`}>
                      <div className={`w-4 h-4 rounded-full transition-colors duration-500 ${
                        timeRemaining <= 300 ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">25:00 - Wrap-up Warning</div>
                        <div className={`text-sm transition-colors duration-500 ${
                          timeRemaining <= 300 ? 'text-amber-600' : 'text-slate-500'
                        }`}>
                          {timeRemaining <= 300 ? 'Alert Triggered!' : 'Upcoming'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <button 
                        onClick={() => setShowSpeakerModal(true)}
                        className="w-full text-left p-4 bg-amber-50 hover:bg-amber-100 rounded-xl transition-all duration-200 border border-amber-200 hover:shadow-md"
                      >
                        <div className="font-semibold text-amber-900">Send Speaker Alert</div>
                        <div className="text-sm text-amber-600">Notify about time remaining</div>
                      </button>
                      <button 
                        onClick={() => setShowSlackModal(true)}
                        className="w-full text-left p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all duration-200 border border-purple-200 hover:shadow-md"
                      >
                        <div className="font-semibold text-purple-900">Notify Team</div>
                        <div className="text-sm text-purple-600">Send update to #event-team</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DemoLayout>
        );

      case 'speaker-portal':
        return (
          <DemoLayout currentStep={currentStep} onStepChange={setCurrentStep}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full text-green-700 font-medium mb-6 shadow-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  Your session is live • 247 attendees watching
                </div>
                <h1 className="text-4xl font-bold text-slate-900 mb-3">{sessionTitle}</h1>
                <p className="text-xl text-slate-600">{speakerName} • Main Auditorium</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Speaker Timer */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-slate-200/50 text-center">
                  <div className={`text-8xl font-mono font-bold mb-6 transition-colors duration-500 ${getTimeColor(timeRemaining)}`}>
                    {formatTime(timeRemaining)}
                  </div>
                  <div className="text-slate-600 text-xl mb-8">
                    {timeRemaining >= 0 ? 'Time Remaining' : 'Overtime'}
                  </div>
                  <div className="flex justify-center space-x-4">
                    <div className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      timeRemaining > 300 ? 'bg-green-100 text-green-700' : 
                      timeRemaining > 0 ? 'bg-amber-100 text-amber-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {timeRemaining > 300 ? 'On Track' : 
                       timeRemaining > 0 ? 'Wrap Up' : 
                       'Overtime'}
                    </div>
                    <div className="px-6 py-3 bg-blue-100 text-blue-700 rounded-xl text-sm font-semibold">
                      Q&A Ready
                    </div>
                  </div>
                </div>

                {/* Speaker Timeline */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-200/50">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Your Timeline</h3>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-xl border-l-4 transition-all duration-500 ${
                      timeRemaining <= 1500 ? 'bg-green-50 border-green-500' : 'bg-slate-50 border-slate-300'
                    }`}>
                      <div className={`font-semibold mb-2 ${timeRemaining <= 1500 ? 'text-green-800' : 'text-slate-700'}`}>
                        {timeRemaining <= 1500 ? '✓' : '○'} 0:00 - Introduction
                      </div>
                      <div className="text-sm text-slate-600">{sessionNotes.intro}</div>
                    </div>
                    
                    <div className={`p-4 rounded-xl border-l-4 transition-all duration-500 ${
                      timeRemaining <= 1200 ? 'bg-green-50 border-green-500' : 'bg-slate-50 border-slate-300'
                    }`}>
                      <div className={`font-semibold mb-2 ${timeRemaining <= 1200 ? 'text-green-800' : 'text-slate-700'}`}>
                        {timeRemaining <= 1200 ? '✓' : '○'} 5:00 - First Checkpoint
                      </div>
                      <div className="text-sm text-slate-600">{sessionNotes.fiveMin}</div>
                    </div>
                    
                    <div className={`p-4 rounded-xl border-l-4 transition-all duration-500 ${
                      timeRemaining <= 600 ? 'bg-green-50 border-green-500' : 
                      timeRemaining <= 900 ? 'bg-blue-50 border-blue-500' : 'bg-slate-50 border-slate-300'
                    }`}>
                      <div className={`font-semibold mb-2 ${
                        timeRemaining <= 600 ? 'text-green-800' : 
                        timeRemaining <= 900 ? 'text-blue-800' : 'text-slate-700'
                      }`}>
                        {timeRemaining <= 600 ? '✓' : timeRemaining <= 900 ? '→' : '○'} 20:00 - Main Content
                      </div>
                      <div className="text-sm text-slate-600">{sessionNotes.twentyMin}</div>
                    </div>
                    
                    <div className={`p-4 rounded-xl border-l-4 transition-all duration-500 ${
                      timeRemaining <= 300 ? 'bg-amber-50 border-amber-500' : 'bg-slate-50 border-slate-300'
                    }`}>
                      <div className={`font-semibold mb-2 ${timeRemaining <= 300 ? 'text-amber-800' : 'text-slate-700'}`}>
                        {timeRemaining <= 300 ? '⚠' : '○'} 25:00 - Wrap-up
                      </div>
                      <div className="text-sm text-slate-600">{sessionNotes.twentyFiveMin}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Speaker Controls</h3>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => setTimeRemaining(prev => prev + 300)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Request 5 More Minutes
                  </button>
                  <button className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold hover:shadow-lg transform hover:-translate-y-0.5">
                    Ready for Q&A
                  </button>
                  <button 
                    onClick={() => {
                      setIsTimerRunning(false);
                      setCurrentStep('session-complete');
                    }}
                    className="px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    End Early
                  </button>
                </div>
              </div>
            </div>
          </DemoLayout>
        );

      case 'team-coordination':
        return (
          <DemoLayout currentStep={currentStep} onStepChange={setCurrentStep}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Team Coordination</h1>
                    <p className="text-xl text-slate-600">Stage Manager View • {speakerName} presenting</p>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className={`text-5xl font-mono font-bold ${getTimeColor(timeRemaining)}`}>
                        {formatTime(timeRemaining)}
                      </div>
                      <div className="text-slate-500 text-sm">remaining</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Live Activity Feed */}
                <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50">
                  <h3 className="text-xl font-bold text-slate-900 mb-8">Live Activity Feed</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-green-200 animate-in slide-in-from-left-4 duration-300">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">Session started on time</div>
                        <div className="text-sm text-slate-500">2:00 PM • Automated trigger</div>
                      </div>
                      <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-md">Success</div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200 animate-in slide-in-from-left-4 duration-300 delay-150">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">5-minute checkpoint reached</div>
                        <div className="text-sm text-slate-500">2:05 PM • Speaker notified via portal</div>
                      </div>
                      <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-md">Sent</div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl border border-purple-200 animate-in slide-in-from-left-4 duration-300 delay-300">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">Team alert sent to Slack</div>
                        <div className="text-sm text-slate-500">2:20 PM • #event-team channel</div>
                      </div>
                      <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-md">Delivered</div>
                    </div>
                    
                    {timeRemaining <= 300 && (
                      <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-xl border-l-4 border-amber-400 animate-in slide-in-from-left-4 duration-300">
                        <div className="w-3 h-3 bg-amber-500 rounded-full mt-2 animate-pulse"></div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">5-minute warning triggered</div>
                          <div className="text-sm text-slate-500">Now • Prepare transition team</div>
                        </div>
                        <div className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-md">Active</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Team Actions */}
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Team Members</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold">SM</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">Stage Manager</div>
                          <div className="text-sm text-green-600 font-medium">Active</div>
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold">AV</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">AV Technician</div>
                          <div className="text-sm text-blue-600 font-medium">Monitoring</div>
                        </div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold">EC</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">Event Coordinator</div>
                          <div className="text-sm text-purple-600 font-medium">Standby</div>
                        </div>
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Emergency Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 border border-red-200 hover:shadow-md">
                        <div className="font-semibold text-red-900">Technical Pause</div>
                        <div className="text-sm text-red-600">Stop timer & notify all</div>
                      </button>
                      <button 
                        onClick={() => setTimeRemaining(prev => prev + 600)}
                        className="w-full text-left p-4 bg-amber-50 hover:bg-amber-100 rounded-xl transition-all duration-200 border border-amber-200 hover:shadow-md"
                      >
                        <div className="font-semibold text-amber-900">Extend Session</div>
                        <div className="text-sm text-amber-600">Add 10 minutes</div>
                      </button>
                      <button 
                        onClick={() => setShowSlackModal(true)}
                        className="w-full text-left p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-all duration-200 border border-green-200 hover:shadow-md"
                      >
                        <div className="font-semibold text-green-900">Broadcast Update</div>
                        <div className="text-sm text-green-600">All team channels</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DemoLayout>
        );

      case 'session-complete':
        return (
          <DemoLayout currentStep={currentStep} onStepChange={setCurrentStep}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold text-slate-900 mb-3">Session Complete</h1>
                <p className="text-xl text-slate-600">{sessionTitle} • {speakerName}</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-900">Session Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                        <span className="text-slate-600 font-medium">Duration:</span>
                        <span className="font-bold text-slate-900">29:45</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                        <span className="text-slate-600 font-medium">Status:</span>
                        <span className="font-bold text-green-600">Completed on time</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                        <span className="text-slate-600 font-medium">Alerts sent:</span>
                        <span className="font-bold text-slate-900">3</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                        <span className="text-slate-600 font-medium">Team notifications:</span>
                        <span className="font-bold text-slate-900">5</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-900">Performance</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-slate-700 font-medium">All timing markers hit</span>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-slate-700 font-medium">Speaker stayed on schedule</span>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-slate-700 font-medium">Smooth team coordination</span>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-slate-700 font-medium">No technical issues</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Actions */}
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Live Metrics</h3>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                        <div className="text-3xl font-bold text-green-600">247</div>
                        <div className="text-sm text-slate-600">Active Viewers</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                        <div className="text-3xl font-bold text-blue-600">98%</div>
                        <div className="text-sm text-slate-600">Engagement</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                        <div className="text-3xl font-bold text-purple-600">12</div>
                        <div className="text-sm text-slate-600">Q&A Questions</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Next Session Prep</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="font-semibold text-blue-900 mb-1">Panel Discussion</div>
                        <div className="text-sm text-blue-600">Starts in 15 minutes</div>
                        <div className="text-xs text-slate-500 mt-1">4 speakers ready</div>
                      </div>
                      <button className="w-full p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                        Prepare Next Session
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DemoLayout>
        );

      default:
        return (
          <DemoLayout currentStep={currentStep} onStepChange={setCurrentStep}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900">StageCue Demo</h1>
                <p className="mt-4 text-slate-600">Professional event timing system</p>
              </div>
            </div>
          </DemoLayout>
        );
    }
  };

  return (
    <>
      {renderStep()}
      
      {/* Modals */}
      {showSlackModal && <SlackNotificationModal />}
      {showSpeakerModal && <SpeakerAlertModal />}
      
      {/* Demo Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-2xl border border-slate-200/50 px-8 py-4">
          <div className="flex items-center space-x-6">
            {/* Previous */}
            <button
              onClick={() => {
                const steps = ['dashboard', 'create-session', 'session-setup', 'live-session', 'speaker-portal', 'team-coordination', 'session-complete'];
                const currentIndex = steps.indexOf(currentStep);
                if (currentIndex > 0) {
                  setCurrentStep(steps[currentIndex - 1]);
                }
              }}
              className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
              disabled={currentStep === 'dashboard'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Step Indicator */}
            <div className="flex items-center space-x-2">
              {['dashboard', 'create-session', 'session-setup', 'live-session', 'speaker-portal', 'team-coordination', 'session-complete'].map((step, index) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    step === currentStep ? 'bg-blue-600 scale-125' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>

            {/* Play/Pause */}
            <div className="w-px h-8 bg-slate-300 mx-2"></div>
            <button 
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-all duration-200"
            >
              {isTimerRunning ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 4h10a1 1 0 001-1V7a1 1 0 00-1-1H6a1 1 0 00-1 1v10a1 1 0 001 1z" />
                </svg>
              )}
            </button>
            <div className="w-px h-8 bg-slate-300 mx-2"></div>

            {/* Next */}
            <button
              onClick={() => {
                const steps = ['dashboard', 'create-session', 'session-setup', 'live-session', 'speaker-portal', 'team-coordination', 'session-complete'];
                const currentIndex = steps.indexOf(currentStep);
                if (currentIndex < steps.length - 1) {
                  setCurrentStep(steps[currentIndex + 1]);
                }
              }}
              className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
              disabled={currentStep === 'session-complete'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            </div>
          </div>
        </div>
    </>
  );
}