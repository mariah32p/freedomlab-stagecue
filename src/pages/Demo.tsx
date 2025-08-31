import { useState, useEffect } from 'react';

export function Demo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const steps = [
    'dashboard',
    'create-session',
    'session-setup',
    'live-management',
    'speaker-portal',
    'team-coordination',
    'session-complete'
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  const renderStep = () => {
    switch (steps[currentStep]) {
      case 'dashboard':
        return (
          <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xl font-bold text-slate-900">StageCue</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        <span className="text-slate-600 font-medium text-sm">SM</span>
                      </div>
                      <span className="text-slate-700 font-medium">Sarah Martinez</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Dashboard */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Event Dashboard</h1>
                <p className="text-slate-600 mt-2">Managing 2 active events • 8 speakers today</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-slate-900">3</p>
                      <p className="text-slate-600 text-sm">Active Sessions</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-slate-900">12</p>
                      <p className="text-slate-600 text-sm">Speakers Ready</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-slate-900">94%</p>
                      <p className="text-slate-600 text-sm">On Schedule</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-slate-900">7</p>
                      <p className="text-slate-600 text-sm">Team Online</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Events */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Tech Summit 2024</h2>
                      <p className="text-slate-600">Main Auditorium • 8 speakers scheduled</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 text-sm font-medium">Live</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">SC</span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Dr. Sarah Chen</div>
                          <div className="text-sm text-slate-600">AI in Healthcare • 2:00-2:30 PM</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-mono font-bold text-blue-600">18:42</div>
                        <div className="text-xs text-slate-500">Time remaining</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                          <span className="text-slate-600 font-semibold text-sm">MJ</span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Mike Johnson</div>
                          <div className="text-sm text-slate-600">Panel Discussion • 2:30-3:15 PM</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-500">Up next</div>
                        <div className="text-xs text-slate-400">Ready</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                          <span className="text-slate-600 font-semibold text-sm">AL</span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Anna Lee</div>
                          <div className="text-sm text-slate-600">Future of Work • 4:00-4:30 PM</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-500">Scheduled</div>
                        <div className="text-xs text-slate-400">Preparing</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      Manage Sessions
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Design Workshop</h2>
                      <p className="text-slate-600">Room B • 4 speakers scheduled</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-yellow-700 text-sm font-medium">Break</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                          <span className="text-slate-600 font-semibold text-sm">JD</span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">John Davis</div>
                          <div className="text-sm text-slate-600">Design Systems • 1:00-1:45 PM</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-600">Completed</div>
                        <div className="text-xs text-slate-400">On time</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-semibold text-sm">EM</span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Emma Wilson</div>
                          <div className="text-sm text-slate-600">UX Research • 2:00-2:30 PM</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-orange-600">Needs Setup</div>
                        <div className="text-xs text-slate-400">AV check required</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      Create New Session
                    </button>
                  </div>
                </div>
              </div>

              {/* Team Status */}
              <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Team Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Stage Manager</div>
                      <div className="text-sm text-slate-600">Alex Thompson • Online</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">AV Technician</div>
                      <div className="text-sm text-slate-600">Maria Garcia • Online</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Coordinator</div>
                      <div className="text-sm text-slate-600">David Kim • Away</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'create-session':
        return (
          <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xl font-bold text-slate-900">StageCue</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        <span className="text-slate-600 font-medium text-sm">SM</span>
                      </div>
                      <span className="text-slate-700 font-medium">Sarah Martinez</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Create New Session</h1>
                <p className="text-slate-600 mt-2">Set up timing and coordination for your speaker</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <form className="space-y-8">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Session Title</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter session title"
                        value="Blockchain in Finance"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Speaker Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter speaker name"
                        value="Robert Kim"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Duration</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>30 minutes</option>
                        <option>45 minutes</option>
                        <option>60 minutes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Room</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>Main Auditorium</option>
                        <option>Room A</option>
                        <option>Room B</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Start Time</label>
                      <input
                        type="time"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value="15:30"
                      />
                    </div>
                  </div>

                  {/* Speaker Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Speaker Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="speaker@email.com"
                        value="robert.kim@fintech.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Phone (Optional)</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+1 (555) 123-4567"
                        value="+1 (555) 987-6543"
                      />
                    </div>
                  </div>

                  {/* Timing Alerts */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-4">Timing Alerts</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <input type="checkbox" className="w-4 h-4 text-amber-600" checked />
                        <div>
                          <div className="font-medium text-slate-900">5-minute warning</div>
                          <div className="text-sm text-slate-600">Gentle reminder to wrap up</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                        <input type="checkbox" className="w-4 h-4 text-red-600" checked />
                        <div>
                          <div className="font-medium text-slate-900">Time's up alert</div>
                          <div className="text-sm text-slate-600">Hard stop notification</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Team Notifications */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-4">Team Notifications</label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                        <input type="checkbox" className="w-4 h-4 text-green-600" checked />
                        <div className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5.042 15.165a2.528 2.528 0 0 1 2.122 1.147A3.987 3.987 0 0 0 12 18c1.825 0 3.408-.98 4.836-2.688a2.528 2.528 0 0 1 2.122-1.147C20.049 14.165 21 15.247 21 16.523V18c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2v-1.477c0-1.276.951-2.358 2.042-2.358z"/>
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>
                          </svg>
                          <span className="font-medium text-slate-900">Slack #event-team</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                        <input type="checkbox" className="w-4 h-4 text-blue-600" checked />
                        <div className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                          </svg>
                          <span className="font-medium text-slate-900">Email team@event.com</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                    <button type="button" className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Create Session
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );

      case 'session-setup':
        return (
          <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xl font-bold text-slate-900">StageCue</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        <span className="text-slate-600 font-medium text-sm">SM</span>
                      </div>
                      <span className="text-slate-700 font-medium">Sarah Martinez</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-4">
                  <span>Sessions</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-slate-900">Blockchain in Finance</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-900">Session Setup</h1>
                <p className="text-slate-600 mt-2">Configure timing, notes, and team coordination</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Session Details */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Session Details</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">RK</span>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Robert Kim</div>
                        <div className="text-sm text-slate-600">robert.kim@fintech.com</div>
                        <div className="text-sm text-slate-600">+1 (555) 987-6543</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-slate-600">Duration</div>
                        <div className="text-lg font-bold text-slate-900">30 minutes</div>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-sm font-medium text-slate-600">Start Time</div>
                        <div className="text-lg font-bold text-slate-900">3:30 PM</div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-sm font-medium text-slate-600 mb-2">Room Assignment</div>
                      <div className="text-lg font-bold text-slate-900">Main Auditorium</div>
                      <div className="text-sm text-slate-600">Capacity: 250 • AV: Ready</div>
                    </div>
                  </div>
                </div>

                {/* Presentation Timeline */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Presentation Timeline</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                        <span className="text-blue-600 font-bold text-sm">0</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">Opening (0:00)</div>
                        <textarea 
                          className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none"
                          rows={2}
                          placeholder="Add notes for this timing..."
                          value="Introduction and agenda overview. Welcome attendees, introduce topic importance."
                        />
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                        <span className="text-green-600 font-bold text-sm">5</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">Main Content (5:00)</div>
                        <textarea 
                          className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none"
                          rows={2}
                          placeholder="Add notes for this timing..."
                          value="Core blockchain concepts. Show real-world banking examples. Demo the payment processing flow."
                        />
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mt-1">
                        <span className="text-amber-600 font-bold text-sm">20</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">Wrap Up (20:00)</div>
                        <textarea 
                          className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none"
                          rows={2}
                          placeholder="Add notes for this timing..."
                          value="Key takeaways summary. Transition to Q&A. Remind audience of next session."
                        />
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-1">
                        <span className="text-red-600 font-bold text-sm">25</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">Q&A (25:00)</div>
                        <textarea 
                          className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none"
                          rows={2}
                          placeholder="Add notes for this timing..."
                          value="Open floor for questions. Moderator will help manage time. Hard stop at 30:00."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      Save Timeline & Continue
                    </button>
                  </div>
                </div>
              </div>

              {/* Team Assignment */}
              <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Team Assignment</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="font-medium text-slate-900 mb-2">Stage Manager</div>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                      <option>Alex Thompson</option>
                      <option>Maria Garcia</option>
                      <option>David Kim</option>
                    </select>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-medium text-slate-900 mb-2">AV Technician</div>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                      <option>Maria Garcia</option>
                      <option>Alex Thompson</option>
                      <option>David Kim</option>
                    </select>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="font-medium text-slate-900 mb-2">Coordinator</div>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                      <option>David Kim</option>
                      <option>Alex Thompson</option>
                      <option>Maria Garcia</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'live-management':
        return (
          <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xl font-bold text-slate-900">StageCue</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 text-sm font-medium">Live Event</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        <span className="text-slate-600 font-medium text-sm">SM</span>
                      </div>
                      <span className="text-slate-700 font-medium">Sarah Martinez</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Live Event Management</h1>
                <p className="text-slate-600 mt-2">Tech Summit 2024 • Main Auditorium</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Timer Control */}
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                  <div className="relative">
                    <div className="text-7xl font-mono font-bold text-white mb-4 tracking-wider">18:42</div>
                    <div className="text-white/80 text-xl mb-8 font-medium">Session Time Remaining</div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
                      <div className="text-white/60 text-sm mb-2 uppercase tracking-wide">Current Speaker</div>
                      <div className="text-white text-xl font-semibold mb-1">Robert Kim</div>
                      <div className="text-white/80 text-sm">Blockchain in Finance</div>
                      <div className="text-white/60 text-xs mt-2">Started 11:18 ago • On schedule</div>
                    </div>

                    <div className="flex justify-center space-x-4 mb-6">
                      <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        <span>Extend +5</span>
                      </button>
                      <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Pause</span>
                      </button>
                      <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                        </svg>
                        <span>End Session</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-white/60">Next Speaker</div>
                        <div className="text-white font-medium">Panel Discussion</div>
                        <div className="text-white/80 text-xs">4:00 PM • 4 speakers</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-white/60">Room Status</div>
                        <div className="text-white font-medium">All Systems Ready</div>
                        <div className="text-white/80 text-xs">AV ✓ • Lighting ✓ • Audio ✓</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Session Queue */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Session Queue</h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View All
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-slate-900">Robert Kim</div>
                        <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Live</div>
                      </div>
                      <div className="text-sm text-slate-600">Blockchain in Finance</div>
                      <div className="text-xs text-slate-500 mt-1">3:30-4:00 PM • 18:42 remaining</div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-slate-900">Panel Discussion</div>
                        <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Ready</div>
                      </div>
                      <div className="text-sm text-slate-600">4 speakers • Moderated</div>
                      <div className="text-xs text-slate-500 mt-1">4:00-4:45 PM • All speakers checked in</div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-slate-900">Anna Lee</div>
                        <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Preparing</div>
                      </div>
                      <div className="text-sm text-slate-600">Future of Work</div>
                      <div className="text-xs text-slate-500 mt-1">5:00-5:30 PM • AV check needed</div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-slate-900">Coffee Break</div>
                        <div className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">Scheduled</div>
                      </div>
                      <div className="text-sm text-slate-600">15-minute break</div>
                      <div className="text-xs text-slate-500 mt-1">4:45-5:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Status & Quick Actions */}
              <div className="mt-8 grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Team Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">Alex Thompson</div>
                          <div className="text-sm text-slate-600">Stage Manager</div>
                        </div>
                      </div>
                      <div className="text-sm text-green-600 font-medium">Online</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">Maria Garcia</div>
                          <div className="text-sm text-slate-600">AV Technician</div>
                        </div>
                      </div>
                      <div className="text-sm text-green-600 font-medium">Online</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">David Kim</div>
                          <div className="text-sm text-slate-600">Coordinator</div>
                        </div>
                      </div>
                      <div className="text-sm text-yellow-600 font-medium">Away</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                      <div className="font-medium text-blue-900">Send 5-Min Warning</div>
                      <div className="text-sm text-blue-600">Alert current speaker</div>
                    </button>
                    <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                      <div className="font-medium text-purple-900">Notify Next Speaker</div>
                      <div className="text-sm text-purple-600">Panel Discussion prep</div>
                    </button>
                    <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                      <div className="font-medium text-green-900">Alert Team</div>
                      <div className="text-sm text-green-600">Slack #event-team</div>
                    </button>
                    <button className="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                      <div className="font-medium text-red-900">Emergency Stop</div>
                      <div className="text-sm text-red-600">End session immediately</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'speaker-portal':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Speaker Header */}
            <header className="bg-white shadow-sm border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xl font-bold text-slate-900">StageCue Speaker</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 text-sm font-medium">Your session is live</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">RK</span>
                      </div>
                      <span className="text-slate-700 font-medium">Robert Kim</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Blockchain in Finance</h1>
                <p className="text-slate-600">Main Auditorium • 3:30-4:00 PM</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Speaker Timer */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center">
                  <div className="text-6xl font-mono font-bold text-slate-900 mb-4">18:42</div>
                  <div className="text-slate-600 text-lg mb-6">Time Remaining</div>
                  
                  <div className="flex justify-center space-x-3 mb-6">
                    <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                      On Track
                    </div>
                    <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      Q&A Ready
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      Request 5-Min Extension
                    </button>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      Ready for Q&A
                    </button>
                  </div>
                </div>

                {/* Presentation Timeline */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Your Presentation Timeline</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">Opening (0:00) ✓</div>
                        <div className="text-sm text-slate-600 mt-1">Introduction and agenda overview. Welcome attendees, introduce topic importance.</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">Main Content (5:00) ✓</div>
                        <div className="text-sm text-slate-600 mt-1">Core blockchain concepts. Show real-world banking examples. Demo the payment processing flow.</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                        <span className="text-blue-600 font-bold text-xs">NOW</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">Current Section (11:18)</div>
                        <div className="text-sm text-slate-600 mt-1">Implementation challenges and solutions. Case studies from major banks.</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mt-1">
                        <span className="text-amber-600 font-bold text-xs">20</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">Wrap Up (20:00)</div>
                        <div className="text-sm text-slate-600 mt-1">Key takeaways summary. Transition to Q&A. Remind audience of next session.</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                        <span className="text-red-600 font-bold text-xs">25</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">Q&A (25:00)</div>
                        <div className="text-sm text-slate-600 mt-1">Open floor for questions. Moderator will help manage time. Hard stop at 30:00.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Contact */}
              <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Need Help?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1 2.122 1.147A3.987 3.987 0 0 0 12 18c1.825 0 3.408-.98 4.836-2.688a2.528 2.528 0 0 1 2.122-1.147C20.049 14.165 21 15.247 21 16.523V18c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2v-1.477c0-1.276.951-2.358 2.042-2.358z"/>
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>
                    </svg>
                    <div>
                      <div className="font-medium text-slate-900">Stage Manager</div>
                      <div className="text-sm text-slate-600">Alex Thompson</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <div>
                      <div className="font-medium text-slate-900">Event Support</div>
                      <div className="text-sm text-slate-600">support@event.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <div>
                      <div className="font-medium text-slate-900">Emergency</div>
                      <div className="text-sm text-slate-600">(555) 123-4567</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'team-coordination':
        return (
          <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xl font-bold text-slate-900">StageCue</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        <span className="text-slate-600 font-medium text-sm">AT</span>
                      </div>
                      <span className="text-slate-700 font-medium">Alex Thompson</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Stage Manager</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Team Coordination</h1>
                <p className="text-slate-600 mt-2">Real-time updates and notifications</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Live Activity Feed */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Live Activity</h2>
                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Live updates</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">Session Started</div>
                        <div className="text-sm text-slate-600">Robert Kim • Blockchain in Finance</div>
                        <div className="text-xs text-slate-500 mt-1">11 minutes ago</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">Speaker Reminder Sent</div>
                        <div className="text-sm text-slate-600">Email sent to robert.kim@fintech.com</div>
                        <div className="text-xs text-slate-500 mt-1">8 minutes ago</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5.042 15.165a2.528 2.528 0 0 1 2.122 1.147A3.987 3.987 0 0 0 12 18c1.825 0 3.408-.98 4.836-2.688a2.528 2.528 0 0 1 2.122-1.147C20.049 14.165 21 15.247 21 16.523V18c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2v-1.477c0-1.276.951-2.358 2.042-2.358z"/>
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">Team Alert</div>
                        <div className="text-sm text-slate-600">Slack notification sent to #event-team</div>
                        <div className="text-xs text-slate-500 mt-1">5 minutes ago</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">Next Speaker Check-in</div>
                        <div className="text-sm text-slate-600">Panel speakers arriving for 4:00 PM session</div>
                        <div className="text-xs text-slate-500 mt-1">2 minutes ago</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Actions */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors border border-amber-200">
                        <div className="font-medium text-amber-900">Send 5-Min Warning</div>
                        <div className="text-sm text-amber-600">Alert Robert Kim</div>
                      </button>
                      <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                        <div className="font-medium text-blue-900">Notify Next Speakers</div>
                        <div className="text-sm text-blue-600">Panel Discussion prep</div>
                      </button>
                      <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                        <div className="font-medium text-green-900">Broadcast Update</div>
                        <div className="text-sm text-green-600">All team channels</div>
                    </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Team Links</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div className="font-medium text-slate-900">Stage Manager View</div>
                          <div className="text-sm text-slate-600">Alex Thompson</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Copy Link
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div className="font-medium text-slate-900">AV Control Panel</div>
                          <div className="text-sm text-slate-600">Maria Garcia</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Copy Link
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div className="font-medium text-slate-900">Speaker Portal</div>
                          <div className="text-sm text-slate-600">Robert Kim</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Copy Link
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'session-complete':
        return (
          <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xl font-bold text-slate-900">StageCue</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        <span className="text-slate-600 font-medium text-sm">SM</span>
                      </div>
                      <span className="text-slate-700 font-medium">Sarah Martinez</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Session Completed Successfully</h1>
                <p className="text-slate-600">Blockchain in Finance • Robert Kim</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Session Summary */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Session Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-sm font-medium text-slate-600">Actual Duration</div>
                        <div className="text-lg font-bold text-green-600">29:45</div>
                        <div className="text-xs text-slate-500">15 seconds under</div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-slate-600">Timing Score</div>
                        <div className="text-lg font-bold text-blue-600">98%</div>
                        <div className="text-xs text-slate-500">Excellent timing</div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-sm font-medium text-slate-600 mb-2">Timeline Performance</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-700">Opening (0:00)</span>
                          <span className="text-xs text-green-600 font-medium">On time</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-700">Main Content (5:00)</span>
                          <span className="text-xs text-green-600 font-medium">On time</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-700">Wrap Up (20:00)</span>
                          <span className="text-xs text-green-600 font-medium">On time</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-700">Q&A (25:00)</span>
                          <span className="text-xs text-green-600 font-medium">On time</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Session Prep */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Next Session</h2>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                    <div className="font-semibold text-slate-900 mb-2">Panel Discussion</div>
                    <div className="text-sm text-slate-600 mb-3">4:00-4:45 PM • Main Auditorium</div>
                    <div className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-md inline-block">
                      Starts in 15 minutes
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="text-sm font-medium text-slate-700 mb-2">Speaker Check-in Status</div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-slate-900">Mike Johnson</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Ready</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-slate-900">Lisa Chen</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Ready</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-slate-900">Tom Wilson</span>
                      </div>
                      <span className="text-xs text-yellow-600 font-medium">En route</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-slate-900">Emma Davis</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Ready</span>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                    Start Panel Discussion
                  </button>
                </div>
              </div>

              {/* Event Progress */}
              <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Today's Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">4/8</div>
                    <div className="text-sm text-slate-600">Sessions Complete</div>
                    <div className="text-xs text-slate-500 mt-1">50% done</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">96%</div>
                    <div className="text-sm text-slate-600">On Schedule</div>
                    <div className="text-xs text-slate-500 mt-1">Excellent timing</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">12/12</div>
                    <div className="text-sm text-slate-600">Speakers Ready</div>
                    <div className="text-xs text-slate-500 mt-1">All checked in</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-1">3:45</div>
                    <div className="text-sm text-slate-600">Avg Session</div>
                    <div className="text-xs text-slate-500 mt-1">Under target</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <>
    <div className="relative">
      {renderStep()}
      
      {/* Navigation Controls */}
      {showControls && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 p-4">
            <div className="flex items-center space-x-4">
              {/* Previous Button */}
              <button
                onClick={prevStep}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Step Indicators */}
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToStep(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStep
                        ? 'bg-blue-600'
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextStep}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              </div>

              {/* Play/Pause */}
              <div className="w-px h-6 bg-slate-300 mx-2"></div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              {/* Step Counter */}
              <div className="text-sm text-slate-600 font-medium">
                {currentStep + 1} / {steps.length}
              </div>

              {/* Hide Controls */}
              <div className="w-px h-6 bg-slate-300 mx-2"></div>
              <button
                onClick={() => setShowControls(false)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show Controls Button (when hidden) */}
      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          className="fixed bottom-6 right-6 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors z-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      )}
    </div>
    </>
  );
}