import { useState } from 'react';
import { SignUpModal } from '../components/SignUpModal';

export function Home() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Professional event timing system with speaker coordination, team notifications, and automated scheduling for conferences and workshops
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            </p>
            <div className="mb-8">
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-2xl font-bold mb-6">
                precision timing
              </span>
              <button
                onClick={() => setShowSignUpModal(true)}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 mb-6"
              >
                Start Free Trial
              </button>
            </div>
            <div className="flex items-center justify-center text-slate-500">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                7-day free trial • No setup required
              </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Mockup */}
      <section className="relative -mt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl transform scale-110"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="bg-white rounded-lg px-6 py-2 text-sm text-slate-500 inline-block shadow-sm border">
                    app.stagecue.com/events/tech-summit-2024
                  </div>
                </div>
              </div>
              
              {/* Dashboard Interface */}
              <div className="bg-gradient-to-br from-slate-50 to-white p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Tech Summit 2024</h3>
                    <p className="text-slate-600">Main Auditorium • 247 attendees</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 text-sm font-medium">Live</span>
                    </div>
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
                      </div>
                      <div className="flex justify-center space-x-4 mt-8">
                        <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors">
                          Start
                        </button>
                        <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors">
                          Pause
                        </button>
                        <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
                          Stop
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Event Schedule */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-slate-900 text-lg">Today's Schedule</h3>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                        <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-900">Dr. Sarah Chen</div>
                          <div className="text-xs text-slate-500 mb-1">2:00 PM - 2:30 PM</div>
                          <div className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-md inline-block">
                            In Progress
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-xl">
                        <div className="flex-shrink-0 w-3 h-3 bg-slate-300 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-900">Panel Discussion</div>
                          <div className="text-xs text-slate-500 mb-1">2:30 PM - 3:15 PM</div>
                          <div className="text-xs text-slate-500">4 speakers</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-xl">
                        <div className="flex-shrink-0 w-3 h-3 bg-slate-300 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-900">Coffee Break</div>
                          <div className="text-xs text-slate-500">3:15 PM - 3:30 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Speaker Notes & Team Coordination */}
                <div className="mt-8 grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-lg mb-4">Speaker Instructions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                        <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-amber-800">5-minute warning at 20:00</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-red-800">Hard stop at 15:00</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-600">Q&A follows immediately after presentation</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-lg mb-4">Team Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">Slack: #event-team</div>
                          <div className="text-xs text-slate-500">Auto-notifications enabled</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">Email Alerts</div>
                          <div className="text-xs text-slate-500">moderators@event.com</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Stop losing audience attention to
                <span className="text-red-600"> timing chaos</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Sessions run over time</h3>
                    <p className="text-slate-600">Speakers lose track of time, disrupting the entire schedule</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Team coordination fails</h3>
                    <p className="text-slate-600">Staff miss cues, transitions are awkward, attendees notice</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Manual timing is stressful</h3>
                    <p className="text-slate-600">Organizers juggle stopwatches while managing everything else</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-2xl"></div>
              <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">StageCue Solution</h3>
                  <p className="text-slate-600">Automated timing with team coordination</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-slate-900">Automatic speaker alerts</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-slate-900">Real-time team notifications</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-slate-900">Seamless transitions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Professional event management
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Everything you need to run conferences, workshops, and live events with precision
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Smart Timer Management</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Multiple countdown displays with automatic warnings, transitions, and millisecond accuracy
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Multiple timer displays
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Custom warning alerts
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Automatic transitions
                </div>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Speaker Portal</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Dedicated speaker interfaces with personal timers, notes, and self-service controls
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Personal speaker links
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Custom notes & cues
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Self-service controls
                </div>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Team Coordination</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Real-time Slack notifications and email alerts keep your entire team synchronized
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Slack integration
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Email notifications
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Real-time updates
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaker Portal Mockup */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Speakers get their own
              <span className="block text-purple-600">dedicated portal</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Personal timing displays, notes, and controls so speakers can focus on delivering great content
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-3xl transform scale-110"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="bg-white rounded-lg px-6 py-2 text-sm text-slate-500 inline-block shadow-sm border">
                    speaker.stagecue.com/sarah-chen
                  </div>
                </div>
              </div>
              
              {/* Speaker Interface */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                    Your session is live
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">AI in Healthcare: Future Perspectives</h1>
                  <p className="text-slate-600">Dr. Sarah Chen • Main Auditorium</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Speaker Timer */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center">
                    <div className="text-6xl font-mono font-bold text-slate-900 mb-4">18:42</div>
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

                  {/* Speaker Notes */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4">Your Notes</h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="font-medium text-slate-900 mb-1">Key Points</div>
                        <div className="text-slate-600">• AI diagnostic accuracy<br/>• Patient data privacy<br/>• Implementation challenges</div>
                      </div>
                      <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                        <div className="font-medium text-amber-800 mb-1">Timing Alerts</div>
                        <div className="text-amber-700">5-min warning at 20:00<br/>Hard stop at 15:00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Management Mockup */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Manage entire events
              <span className="block text-blue-600">from one dashboard</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Schedule sessions, coordinate speakers, and monitor everything in real-time
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-teal-600/10 blur-3xl transform scale-110"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="bg-white rounded-lg px-6 py-2 text-sm text-slate-500 inline-block shadow-sm border">
                    app.stagecue.com/events
                  </div>
                </div>
              </div>
              
              {/* Event Management Interface */}
              <div className="bg-gradient-to-br from-slate-50 to-white p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Event Management</h3>
                    <p className="text-slate-600">3 active events • 12 speakers scheduled</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    + New Event
                  </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Active Events */}
                  <div className="lg:col-span-2 space-y-4">
                    <h4 className="font-semibold text-slate-900 mb-4">Active Events</h4>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h5 className="font-semibold text-slate-900">Tech Summit 2024</h5>
                          <p className="text-sm text-slate-500">Main Auditorium • 247 attendees</p>
                        </div>
                        <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-green-700 text-sm font-medium">Live</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">18:42</div>
                          <div className="text-xs text-slate-500">Current Session</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">3/8</div>
                          <div className="text-xs text-slate-500">Sessions Complete</div>
                        </div>
                        <div className="p-3 bg-teal-50 rounded-lg">
                          <div className="text-2xl font-bold text-teal-600">5</div>
                          <div className="text-xs text-slate-500">Team Members</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h5 className="font-semibold text-slate-900">Design Workshop</h5>
                          <p className="text-sm text-slate-500">Room B • 45 attendees</p>
                        </div>
                        <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-yellow-700 text-sm font-medium">Break</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-slate-600">15:00</div>
                          <div className="text-xs text-slate-500">Break Time</div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-slate-600">2/4</div>
                          <div className="text-xs text-slate-500">Sessions Complete</div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-slate-600">3</div>
                          <div className="text-xs text-slate-500">Team Members</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-4">Quick Actions</h4>
                      <div className="space-y-3">
                        <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                          <div className="font-medium text-blue-900">Start Next Session</div>
                          <div className="text-xs text-blue-600">Panel Discussion</div>
                        </button>
                        <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <div className="font-medium text-purple-900">Send Speaker Alert</div>
                          <div className="text-xs text-purple-600">5-minute warning</div>
                        </button>
                        <button className="w-full text-left p-3 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
                          <div className="font-medium text-teal-900">Notify Team</div>
                          <div className="text-xs text-teal-600">Slack #event-team</div>
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-4">Today's Speakers</h4>
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
                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                            <span className="text-slate-600 font-semibold text-sm">MJ</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900">Mike Johnson</div>
                            <div className="text-xs text-slate-500">Up next (2:30 PM)</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                            <span className="text-slate-600 font-semibold text-sm">AL</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900">Anna Lee</div>
                            <div className="text-xs text-slate-500">Scheduled (4:00 PM)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to run flawless events?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto font-light">
            Join event professionals who trust StageCue for precision timing and seamless coordination
          </p>
          <button
            onClick={() => setShowSignUpModal(true)}
            className="group relative px-8 py-4 bg-white text-slate-900 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <span className="relative z-10">Start Free Trial</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <p className="text-white/60 mt-6 text-sm">
            7-day free trial • No setup required • Cancel anytime
          </p>
        </div>
      </section>

      <SignUpModal 
        isOpen={showSignUpModal} 
        onClose={() => setShowSignUpModal(false)} 
        defaultPlan="basic"
      />
    </div>
  );
}
  )
}