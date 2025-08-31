import { useState, useEffect } from 'react';

export function Demo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const steps = [
    'Mission Control Dashboard',
    'Create New Session',
    'Multi-Room Management', 
    'Speaker Portal',
    'Team Coordination',
    'Professional Notifications',
    'Session Analytics'
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % steps.length);
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  const goToStep = (step: number) => setCurrentStep(step);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="bg-gradient-to-br from-slate-50 to-white p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Tech Summit 2024</h3>
                <p className="text-slate-600">3 active rooms • 12 speakers scheduled</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 text-sm font-medium">Event Live</span>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  + New Session
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Timer */}
              <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="relative">
                  <div className="text-7xl font-mono font-bold text-white mb-4 tracking-wider">18:42</div>
                  <div className="text-white/80 text-xl mb-8 font-medium">Session Time Remaining</div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="text-white/60 text-sm mb-2 uppercase tracking-wide">Current Speaker</div>
                    <div className="text-white text-xl font-semibold mb-1">Dr. Sarah Chen</div>
                    <div className="text-white/80 text-sm">AI in Healthcare: Future Perspectives</div>
                    <div className="text-white/60 text-xs mt-2">Main Auditorium • 30 min session</div>
                  </div>
                  <div className="flex justify-center space-x-4 mt-8">
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
              
              {/* Event Schedule */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-900 text-lg">Speaker Queue</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Manage
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                    <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-900">Dr. Sarah Chen</div>
                      <div className="text-xs text-slate-500 mb-1">2:00 PM - 2:30 PM • Main Auditorium</div>
                      <div className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-md inline-block">
                        Speaking Now
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                    <div className="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-900">Mike Johnson</div>
                      <div className="text-xs text-slate-500 mb-1">2:30 PM - 3:00 PM • Main Auditorium</div>
                      <div className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-md inline-block">
                        Ready & Waiting
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
                    <div className="flex-shrink-0 w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-900">Anna Lee</div>
                      <div className="text-xs text-slate-500 mb-1">3:15 PM - 3:45 PM • Room B</div>
                      <div className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-md inline-block">
                        Reviewing Notes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Room Status Grid */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-900">Main Auditorium</h4>
                  <div className="flex items-center space-x-2 bg-green-100 px-2 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 text-xs font-medium">Active</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Capacity</span>
                    <span className="font-medium text-slate-900">247/300</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">AV Status</span>
                    <span className="text-green-600 font-medium">✓ Online</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Next Speaker</span>
                    <span className="font-medium text-slate-900">Mike J.</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-900">Room B</h4>
                  <div className="flex items-center space-x-2 bg-yellow-100 px-2 py-1 rounded-full">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-yellow-700 text-xs font-medium">Setup</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Capacity</span>
                    <span className="font-medium text-slate-900">45/60</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">AV Status</span>
                    <span className="text-yellow-600 font-medium">⚠ Testing</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Next Speaker</span>
                    <span className="font-medium text-slate-900">Anna L.</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-900">Workshop Room</h4>
                  <div className="flex items-center space-x-2 bg-slate-100 px-2 py-1 rounded-full">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <span className="text-slate-600 text-xs font-medium">Standby</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Capacity</span>
                    <span className="font-medium text-slate-900">0/40</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">AV Status</span>
                    <span className="text-slate-600 font-medium">— Offline</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Next Speaker</span>
                    <span className="text-slate-500">TBD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="bg-gradient-to-br from-slate-50 to-white p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Create New Session</h3>
                <p className="text-slate-600">Set up timing, speakers, and coordination for your next session</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Session Setup */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Session Title</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="e.g., Keynote: Future of Technology"
                        defaultValue="Panel: Startup Funding Strategies"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Duration</label>
                        <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>30 minutes</option>
                          <option>45 minutes</option>
                          <option>60 minutes</option>
                          <option>90 minutes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Room</label>
                        <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Main Auditorium</option>
                          <option>Room B</option>
                          <option>Workshop Room</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Speaker(s)</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">JD</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900">John Davis</div>
                            <div className="text-xs text-slate-500">Venture Capital Partner</div>
                          </div>
                          <button className="text-slate-400 hover:text-red-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        <button className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors">
                          + Add Speaker
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Timing Configuration */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-4">Timing Alerts</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-amber-800 font-medium">5-minute warning</span>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="text-red-800 font-medium">Time's up alert</span>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className="text-blue-800 font-medium">Team notifications</span>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-4">Session Notes</h4>
                      <textarea 
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                        placeholder="Add moderator notes, special instructions, or technical requirements..."
                        defaultValue="Panel format: 5 min intro, 20 min discussion, 5 min Q&A. Ensure all mics are tested before start."
                      />
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Create Session
                      </button>
                      <button className="px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                        Save Draft
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="bg-gradient-to-br from-slate-50 to-white p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Multi-Room Management</h3>
              <p className="text-slate-600">Monitor and control multiple sessions simultaneously</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Room 1 - Active */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <h4 className="font-bold text-lg">Main Auditorium</h4>
                      <p className="text-green-100 text-sm">Dr. Sarah Chen • AI in Healthcare</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">LIVE</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-mono font-bold text-slate-900 mb-2">18:42</div>
                    <div className="text-slate-600">Time Remaining</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-lg font-bold text-slate-900">247</div>
                      <div className="text-xs text-slate-500">Attendees</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">✓</div>
                      <div className="text-xs text-slate-500">AV Ready</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">Q&A</div>
                      <div className="text-xs text-slate-500">Next</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium">
                      Extend +5
                    </button>
                    <button className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium">
                      End Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Room 2 - Setup */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <h4 className="font-bold text-lg">Room B</h4>
                      <p className="text-yellow-100 text-sm">Anna Lee • Design Workshop</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm font-medium">SETUP</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-mono font-bold text-slate-900 mb-2">15:00</div>
                    <div className="text-slate-600">Until Start</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-lg font-bold text-slate-900">45</div>
                      <div className="text-xs text-slate-500">Expected</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-lg font-bold text-yellow-600">⚠</div>
                      <div className="text-xs text-slate-500">AV Testing</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">✓</div>
                      <div className="text-xs text-slate-500">Speaker Ready</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium">
                      Start Early
                    </button>
                    <button className="flex-1 px-3 py-2 bg-slate-500 text-white rounded-lg text-sm font-medium">
                      Delay
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h4 className="font-semibold text-slate-900 mb-4">Quick Actions</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-slate-900">Test AV</div>
                </button>
                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-slate-900">Alert Team</div>
                </button>
                <button className="p-4 bg-teal-50 hover:bg-teal-100 rounded-lg text-center transition-colors">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-slate-900">Speaker Link</div>
                </button>
                <button className="p-4 bg-slate-50 hover:bg-slate-100 rounded-lg text-center transition-colors">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-slate-900">Schedule</div>
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                  Speaker portal is live
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">Speaker Portal</h3>
                <p className="text-slate-600">Dedicated interface for speakers with timing cues and presentation notes</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                {/* Speaker Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-2xl font-bold mb-1">Panel: Startup Funding Strategies</h4>
                      <p className="text-purple-100">John Davis • Main Auditorium • 30 minutes</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-mono font-bold">18:42</div>
                      <div className="text-purple-100 text-sm">Time Remaining</div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Presentation Timeline */}
                    <div>
                      <h5 className="font-bold text-slate-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Presentation Timeline
                      </h5>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold text-sm">0</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-900 mb-1">Opening (0:00)</div>
                            <div className="text-sm text-slate-600">Welcome panel, introduce speakers, set expectations for Q&A format</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">5</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-900 mb-1">Core Discussion (5:00)</div>
                            <div className="text-sm text-slate-600">Main funding topics: seed vs series A, investor relations, valuation strategies</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                          <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                            <span className="text-amber-600 font-bold text-sm">20</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-900 mb-1">Transition to Q&A (20:00)</div>
                            <div className="text-sm text-slate-600">⚠️ 5-minute warning - wrap up current topic, prepare for audience questions</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-bold text-sm">25</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-900 mb-1">Q&A Session (25:00)</div>
                            <div className="text-sm text-slate-600">Open floor for audience questions, 5 minutes total</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Speaker Controls & Status */}
                    <div className="space-y-6">
                      <div className="bg-slate-50 rounded-xl p-6">
                        <h5 className="font-bold text-slate-900 mb-4">Speaker Actions</h5>
                        <div className="space-y-3">
                          <button className="w-full p-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Request 5-Minute Extension
                          </button>
                          <button className="w-full p-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                            Mark Ready for Q&A
                          </button>
                          <button className="w-full p-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors">
                            Signal Technical Issue
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-6">
                        <h5 className="font-bold text-slate-900 mb-4">Session Info</h5>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Format:</span>
                            <span className="font-medium text-slate-900">Panel Discussion</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Q&A:</span>
                            <span className="font-medium text-slate-900">Last 5 minutes</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Room Capacity:</span>
                            <span className="font-medium text-slate-900">300 seats</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">AV Contact:</span>
                            <span className="font-medium text-blue-600">tech@event.com</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                        <div className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <div className="font-medium text-green-800">All Systems Ready</div>
                            <div className="text-sm text-green-600">Microphone, slides, and timer are active</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="bg-gradient-to-br from-slate-50 to-white p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Team Coordination</h3>
              <p className="text-slate-600">Role-based access and real-time team communication</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Team Members */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h4 className="font-bold text-slate-900 mb-4">Team Status</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">SM</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">Stage Manager</div>
                      <div className="text-xs text-green-600 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        Active - Main Auditorium
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">AV</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">AV Technician</div>
                      <div className="text-xs text-blue-600 flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                        Testing - Room B
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">EC</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">Event Coordinator</div>
                      <div className="text-xs text-purple-600 flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
                        Managing - All Rooms
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Access Links */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h4 className="font-bold text-slate-900 mb-4">Quick Access Links</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900">Stage Manager View</span>
                      <button className="text-blue-600 hover:text-blue-700 text-xs">Copy</button>
                    </div>
                    <div className="text-xs text-slate-500 font-mono bg-white p-2 rounded border">
                      stagecue.com/stage/tech-summit-2024
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900">Speaker Portal</span>
                      <button className="text-blue-600 hover:text-blue-700 text-xs">Copy</button>
                    </div>
                    <div className="text-xs text-slate-500 font-mono bg-white p-2 rounded border">
                      stagecue.com/speaker/john-davis
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900">Timer Display</span>
                      <button className="text-blue-600 hover:text-blue-700 text-xs">Copy</button>
                    </div>
                    <div className="text-xs text-slate-500 font-mono bg-white p-2 rounded border">
                      stagecue.com/timer/main-auditorium
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900">QR Code Access</span>
                      <button className="text-blue-600 hover:text-blue-700 text-xs">Generate</button>
                    </div>
                    <div className="flex items-center justify-center h-16 bg-white rounded border">
                      <div className="w-12 h-12 bg-slate-200 rounded flex items-center justify-center">
                        <svg className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM13 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Activity Feed */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h4 className="font-bold text-slate-900 mb-4">Live Activity</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900">
                        <span className="font-medium">Sarah Chen</span> started session in Main Auditorium
                      </div>
                      <div className="text-xs text-slate-500">2 minutes ago</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900">
                        <span className="font-medium">Mike Johnson</span> marked ready for next session
                      </div>
                      <div className="text-xs text-slate-500">5 minutes ago</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900">
                        <span className="font-medium">AV Team</span> completed Room B setup
                      </div>
                      <div className="text-xs text-slate-500">8 minutes ago</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900">
                        <span className="font-medium">Anna Lee</span> requested 10-minute extension
                      </div>
                      <div className="text-xs text-slate-500">12 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="bg-gradient-to-br from-slate-50 to-white p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Professional Notifications</h3>
              <p className="text-slate-600">Automated team coordination and speaker alerts</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Notification Channels */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h4 className="font-bold text-slate-900 mb-6">Active Channels</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">Slack Integration</div>
                      <div className="text-sm text-slate-600">#event-team • Auto-notifications enabled</div>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-100 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-700 text-xs font-medium">Connected</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">Email Alerts</div>
                      <div className="text-sm text-slate-600">speakers@event.com • Timing reminders</div>
                    </div>
                    <div className="flex items-center space-x-2 bg-blue-100 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-700 text-xs font-medium">Active</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">SMS Emergency</div>
                      <div className="text-sm text-slate-600">Critical alerts only • 3 contacts</div>
                    </div>
                    <div className="flex items-center space-x-2 bg-purple-100 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-purple-700 text-xs font-medium">Standby</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h4 className="font-bold text-slate-900 mb-4">Recent Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 mb-1">Slack: #event-team</div>
                      <div className="text-sm text-slate-600 mb-2">
                        "🎤 Dr. Sarah Chen session started in Main Auditorium. Timer: 30:00 | Next: Mike Johnson at 2:30 PM"
                      </div>
                      <div className="text-xs text-slate-500">Sent 2 minutes ago</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 mb-1">Email: mike.johnson@speaker.com</div>
                      <div className="text-sm text-slate-600 mb-2">
                        "Your session 'Panel Discussion' starts in 15 minutes. Please check your speaker portal for timing cues."
                      </div>
                      <div className="text-xs text-slate-500">Sent 15 minutes ago</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-lg">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 mb-1">Slack: #event-team</div>
                      <div className="text-sm text-slate-600 mb-2">
                        "⚠️ 5-minute warning sent to Dr. Sarah Chen. Session should wrap up by 2:25 PM for smooth transition."
                      </div>
                      <div className="text-xs text-slate-500">Sent 3 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="bg-gradient-to-br from-slate-50 to-white p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Session Analytics</h3>
              <p className="text-slate-600">Track timing performance and speaker coordination</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Timing Performance */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h4 className="font-bold text-slate-900 mb-4">Timing Performance</h4>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-1">94%</div>
                    <div className="text-sm text-slate-600">Sessions On Time</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Average Overrun</span>
                      <span className="font-medium text-slate-900">2.3 minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Extensions Used</span>
                      <span className="font-medium text-slate-900">3 of 12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Early Finishes</span>
                      <span className="font-medium text-green-600">2 sessions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Speaker Readiness */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h4 className="font-bold text-slate-900 mb-4">Speaker Readiness</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">Dr. Sarah Chen</div>
                      <div className="text-xs text-green-600">Ready • Notes reviewed</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">Mike Johnson</div>
                      <div className="text-xs text-green-600">Ready • Waiting backstage</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">Anna Lee</div>
                      <div className="text-xs text-yellow-600">Reviewing notes • 15 min to session</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Log */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h4 className="font-bold text-slate-900 mb-4">Notification Log</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-900">5-Minute Warning</span>
                      <span className="text-xs text-slate-500">2:25 PM</span>
                    </div>
                    <div className="text-xs text-slate-600">Sent to Dr. Sarah Chen via speaker portal</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-900">Team Alert</span>
                      <span className="text-xs text-slate-500">2:20 PM</span>
                    </div>
                    <div className="text-xs text-slate-600">Slack #event-team: "Mike Johnson ready for 2:30 PM session"</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-900">Speaker Reminder</span>
                      <span className="text-xs text-slate-500">2:15 PM</span>
                    </div>
                    <div className="text-xs text-slate-600">Email to mike.johnson@speaker.com: "15-minute reminder"</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-900">Session Started</span>
                      <span className="text-xs text-slate-500">2:00 PM</span>
                    </div>
                    <div className="text-xs text-slate-600">Slack #event-team: "Dr. Sarah Chen session started"</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Summary */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-4">Today's Event Summary</h4>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">8</div>
                  <div className="text-sm text-slate-600">Total Sessions</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">12</div>
                  <div className="text-sm text-slate-600">Speakers Managed</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
                  <div className="text-sm text-slate-600">Active Rooms</div>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <div className="text-2xl font-bold text-teal-600 mb-1">5</div>
                  <div className="text-sm text-slate-600">Team Members</div>
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
    <div className="min-h-screen bg-white">
      {/* Demo Header */}
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
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">DEMO</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-600">
                Interactive Demo • Professional Event Timing
              </div>
              <a 
                href="/"
                className="btn btn-primary"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo Content */}
      <div className="relative">
        {renderStep()}
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={prevStep}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>

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

              <div className="flex space-x-1">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToStep(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep ? 'bg-blue-600' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              <span className="text-sm text-slate-600 font-medium">
                {currentStep + 1} / {steps.length}
              </span>

              <button
                onClick={nextStep}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                onClick={() => setShowControls(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
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
          className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}