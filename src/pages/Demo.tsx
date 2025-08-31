import { useState, useEffect } from 'react';

interface DemoLayoutProps {
  children: React.ReactNode;
  currentStep: string;
  onStepChange: (step: string) => void;
}

function DemoLayout({ children, currentStep, onStepChange }: DemoLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900">StageCue</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm font-medium">Live Demo</span>
              </div>
              <div className="text-sm text-slate-600">
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
  const [sessionNotes, setSessionNotes] = useState({
    intro: "Introduction and agenda overview...",
    fiveMin: "Key statistics and market trends...",
    twentyMin: "Implementation case studies...",
    twentyFiveMin: "Wrap up and prepare for Q&A..."
  });
  const [sessionTitle, setSessionTitle] = useState('Blockchain in Finance: Real-World Applications');
  const [speakerName, setSpeakerName] = useState('Robert Kim');
  const [sessionDuration, setSessionDuration] = useState('30');
  const [notificationSettings, setNotificationSettings] = useState({
    slack: true,
    email: true,
    sms: false
  });

  // Auto-advance through steps
  useEffect(() => {
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
      const timer = setTimeout(() => {
        setCurrentStep(steps[currentIndex + 1]);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 'dashboard':
        return (
          <DemoLayout currentStep={currentStep} onStepChange={setCurrentStep}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Event Dashboard</h1>
                <p className="mt-2 text-slate-600">Tech Summit 2024 • Main Auditorium</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Active Sessions */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-slate-900">Active Sessions</h2>
                      <button 
                        onClick={() => setCurrentStep('create-session')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        + New Session
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-slate-900">Dr. Sarah Chen</h3>
                            <p className="text-sm text-slate-600">AI in Healthcare: Future Perspectives</p>
                            <div className="flex items-center mt-2 space-x-4">
                              <span className="text-2xl font-mono font-bold text-green-600">18:42</span>
                              <span className="text-sm text-slate-500">remaining</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded-md mb-2">
                              In Progress
                            </div>
                            <div className="text-xs text-slate-500">Started 2:00 PM</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-slate-900">Panel Discussion</h3>
                            <p className="text-sm text-slate-600">Future of Technology</p>
                            <div className="text-sm text-slate-500 mt-1">4 speakers • 45 minutes</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-slate-500 bg-slate-200 px-2 py-1 rounded-md mb-2">
                              Up Next
                            </div>
                            <div className="text-xs text-slate-500">Starts 2:30 PM</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Speaker Queue */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-4">Speaker Queue</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold text-sm">SC</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-900">Sarah Chen</div>
                          <div className="text-xs text-green-600">Currently presenting</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">RK</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-900">Robert Kim</div>
                          <div className="text-xs text-blue-600">Ready to present</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                          <span className="text-slate-600 font-semibold text-sm">MJ</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-900">Mike Johnson</div>
                          <div className="text-xs text-slate-500">Scheduled 3:15 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                        <div className="font-medium text-blue-900">Extend Current Session</div>
                        <div className="text-xs text-blue-600">Add 5 minutes</div>
                      </button>
                      <button className="w-full text-left p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                        <div className="font-medium text-amber-900">Send Speaker Alert</div>
                        <div className="text-xs text-amber-600">5-minute warning</div>
                      </button>
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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Create New Session</h1>
                <p className="mt-2 text-slate-600">Set up timing and speaker details</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="sessionTitle" className="block text-sm font-semibold text-slate-700 mb-2">
                        Session Title
                      </label>
                      <input
                        id="sessionTitle"
                        type="text"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                        placeholder="Enter session title"
                        value={sessionTitle}
                        onChange={(e) => setSessionTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="speakerName" className="block text-sm font-semibold text-slate-700 mb-2">
                        Speaker Name
                      </label>
                      <input
                        id="speakerName"
                        type="text"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                        placeholder="Enter speaker name"
                        value={speakerName}
                        onChange={(e) => setSpeakerName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="sessionDuration" className="block text-sm font-semibold text-slate-700 mb-2">
                        Duration (minutes)
                      </label>
                      <select 
                        id="sessionDuration"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg"
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
                    <div>
                      <label htmlFor="sessionTime" className="block text-sm font-semibold text-slate-700 mb-2">
                        Scheduled Time
                      </label>
                      <input
                        id="sessionTime"
                        type="time"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                        defaultValue="14:30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-4">
                      Notification Settings
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <input 
                          id="slackNotifications"
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600" 
                          checked={notificationSettings.slack}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, slack: e.target.checked }))}
                        />
                        <label htmlFor="slackNotifications" className="text-sm text-slate-700">
                          Send Slack notifications to #event-team
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input 
                          id="emailNotifications"
                          type="checkbox" 
                          className="w-4 h-4 text-amber-600" 
                          checked={notificationSettings.email}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, email: e.target.checked }))}
                        />
                        <label htmlFor="emailNotifications" className="text-sm text-slate-700">
                          Email alerts to moderators@techsummit.com
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input 
                          id="smsNotifications"
                          type="checkbox" 
                          className="w-4 h-4 text-purple-600" 
                          checked={notificationSettings.sms}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, sms: e.target.checked }))}
                        />
                        <label htmlFor="smsNotifications" className="text-sm text-slate-700">
                          SMS alerts to stage manager
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                    <button
                      type="button"
                      className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep('session-setup')}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                <h1 className="text-3xl font-bold text-slate-900">Session Timeline Setup</h1>
                <p className="mt-2 text-slate-600">{sessionTitle} • {speakerName}</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Timeline Markers</h3>
                  <p className="text-slate-600 mb-6">Add notes and cues at specific time points during the presentation</p>
                </div>

                <div className="space-y-6">
                  {/* 0:00 Marker */}
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold">0:00</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">Session Start</h4>
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-md">Auto-trigger</span>
                      </div>
                      <textarea 
                        className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none"
                        rows={2}
                        placeholder="Add notes for this timing..."
                        value={sessionNotes.intro}
                        onChange={(e) => setSessionNotes(prev => ({ ...prev, intro: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* 5:00 Marker */}
                  <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                    <div className="flex-shrink-0 w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
                      <span className="text-amber-600 font-bold">5:00</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">First Checkpoint</h4>
                        <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-md">Speaker Alert</span>
                      </div>
                      <textarea 
                        className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none"
                        rows={2}
                        placeholder="Add notes for this timing..."
                        value={sessionNotes.fiveMin}
                        onChange={(e) => setSessionNotes(prev => ({ ...prev, fiveMin: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* 20:00 Marker */}
                  <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-bold">20:00</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">Main Content</h4>
                        <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-md">Team Alert</span>
                      </div>
                      <textarea 
                        className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none"
                        rows={2}
                        placeholder="Add notes for this timing..."
                        value={sessionNotes.twentyMin}
                        onChange={(e) => setSessionNotes(prev => ({ ...prev, twentyMin: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* 25:00 Marker */}
                  <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <div className="flex-shrink-0 w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-red-600 font-bold">25:00</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">Wrap-up Warning</h4>
                        <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-md">Final Alert</span>
                      </div>
                      <textarea 
                        className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none"
                        rows={2}
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
                    className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep('live-session')}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
                    <h1 className="text-3xl font-bold text-slate-900">Live Session Management</h1>
                    <p className="mt-2 text-slate-600">{sessionTitle} • {speakerName}</p>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-medium">Live</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Timer */}
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                  <div className="relative">
                    <div className="text-8xl font-mono font-bold text-white mb-4 tracking-wider">22:15</div>
                    <div className="text-white/80 text-xl mb-8 font-medium">Time Remaining</div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
                      <div className="text-white/60 text-sm mb-2 uppercase tracking-wide">Current Speaker</div>
                      <div className="text-white text-xl font-semibold mb-1">{speakerName}</div>
                      <div className="text-white/80 text-sm">{sessionTitle}</div>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors">
                        Extend +5
                      </button>
                      <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors">
                        Pause
                      </button>
                      <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
                        End Session
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Session Progress */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-lg mb-6">Session Progress</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">0:00 - Session Started</div>
                        <div className="text-xs text-green-600">Completed</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">5:00 - First Checkpoint</div>
                        <div className="text-xs text-green-600">Completed</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">20:00 - Main Content</div>
                        <div className="text-xs text-blue-600">Current</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">25:00 - Wrap-up Warning</div>
                        <div className="text-xs text-slate-500">Upcoming</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                        <div className="font-medium text-amber-900">Send 5-min Warning</div>
                        <div className="text-xs text-amber-600">Alert speaker now</div>
                      </button>
                      <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                        <div className="font-medium text-purple-900">Notify Team</div>
                        <div className="text-xs text-purple-600">Prepare for transition</div>
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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Your session is live
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{sessionTitle}</h1>
                <p className="text-slate-600">{speakerName} • Main Auditorium</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Speaker Timer */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center">
                  <div className="text-7xl font-mono font-bold text-slate-900 mb-4">22:15</div>
                  <div className="text-slate-600 text-lg mb-6">Time Remaining</div>
                  <div className="flex justify-center space-x-3">
                    <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                      On Track
                    </div>
                    <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      Q&A Ready
                    </div>
                  </div>
                </div>

                {/* Speaker Timeline */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4">Your Timeline</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div className="font-medium text-green-800 mb-1">✓ 0:00 - Introduction</div>
                      <div className="text-sm text-green-700">{sessionNotes.intro}</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div className="font-medium text-green-800 mb-1">✓ 5:00 - First Checkpoint</div>
                      <div className="text-sm text-green-700">{sessionNotes.fiveMin}</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="font-medium text-blue-800 mb-1">→ 20:00 - Main Content</div>
                      <div className="text-sm text-blue-700">{sessionNotes.twentyMin}</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-slate-300">
                      <div className="font-medium text-slate-700 mb-1">25:00 - Wrap-up</div>
                      <div className="text-sm text-slate-600">{sessionNotes.twentyFiveMin}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Speaker Controls</h3>
                <div className="flex justify-center space-x-4">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Request 5 More Minutes
                  </button>
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Ready for Q&A
                  </button>
                  <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
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
                    <h1 className="text-3xl font-bold text-slate-900">Team Coordination</h1>
                    <p className="mt-2 text-slate-600">Stage Manager View • {speakerName} presenting</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-mono font-bold text-blue-600">22:15</div>
                    <div className="text-slate-500">remaining</div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Live Activity Feed */}
                <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-6">Live Activity Feed</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">Session started on time</div>
                        <div className="text-xs text-slate-500">2:00 PM • Automated</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">5-minute checkpoint reached</div>
                        <div className="text-xs text-slate-500">2:05 PM • Speaker notified</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">Team alert sent</div>
                        <div className="text-xs text-slate-500">2:20 PM • Slack #event-team</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 animate-pulse"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">Approaching 25-minute mark</div>
                        <div className="text-xs text-slate-500">Now • Prepare wrap-up signal</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Actions */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-4">Team Members</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold text-xs">SM</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-900">Stage Manager</div>
                          <div className="text-xs text-green-600">Active</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-xs">AV</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-900">AV Tech</div>
                          <div className="text-xs text-blue-600">Monitoring</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-semibold text-xs">EC</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-900">Event Coordinator</div>
                          <div className="text-xs text-purple-600">Standby</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-4">Emergency Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                        <div className="font-medium text-red-900">Technical Pause</div>
                        <div className="text-xs text-red-600">Stop timer & notify all</div>
                      </button>
                      <button className="w-full text-left p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                        <div className="font-medium text-amber-900">Extend Session</div>
                        <div className="text-xs text-amber-600">Add 10 minutes</div>
                      </button>
                      <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                        <div className="font-medium text-green-900">Broadcast Update</div>
                        <div className="text-xs text-green-600">All team channels</div>
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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Session Complete</h1>
                <p className="text-slate-600">{sessionTitle} • {speakerName}</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-4">Session Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Duration:</span>
                        <span className="font-medium text-slate-900">29:45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Status:</span>
                        <span className="font-medium text-green-600">Completed on time</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Alerts sent:</span>
                        <span className="font-medium text-slate-900">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Team notifications:</span>
                        <span className="font-medium text-slate-900">5</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-4">Performance</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-slate-700">All timing markers hit</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-slate-700">Speaker stayed on schedule</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-slate-700">Smooth team coordination</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-slate-700">No technical issues</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">Next Session</h4>
                      <p className="text-slate-600">Panel Discussion • 4 speakers • 2:30 PM</p>
                    </div>
                    <div className="flex space-x-4">
                      <button className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                        View Report
                      </button>
                      <button 
                        onClick={() => setCurrentStep('dashboard')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
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
      
      {/* Demo Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white rounded-full shadow-lg border border-slate-200 px-6 py-3">
          <div className="flex items-center space-x-4">
            {/* Previous */}
            <button
              onClick={() => {
                const steps = ['dashboard', 'create-session', 'session-setup', 'live-session', 'speaker-portal', 'team-coordination', 'session-complete'];
                const currentIndex = steps.indexOf(currentStep);
                if (currentIndex > 0) {
                  setCurrentStep(steps[currentIndex - 1]);
                }
              }}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              disabled={currentStep === 'dashboard'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Play/Pause */}
            <div className="w-px h-6 bg-slate-300 mx-2"></div>
            <button className="p-2 text-slate-600 hover:text-slate-800 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6l5-3-5-3z" />
              </svg>
            </button>
            <div className="w-px h-6 bg-slate-300 mx-2"></div>

            {/* Next */}
            <button
              onClick={() => {
                const steps = ['dashboard', 'create-session', 'session-setup', 'live-session', 'speaker-portal', 'team-coordination', 'session-complete'];
                const currentIndex = steps.indexOf(currentStep);
                if (currentIndex < steps.length - 1) {
                  setCurrentStep(steps[currentIndex + 1]);
                }
              }}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              disabled={currentStep === 'session-complete'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}