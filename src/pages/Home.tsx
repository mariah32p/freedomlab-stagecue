import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2301b79e' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Professional Event Timing Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Stop the Event
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-300 block">
                Chaos
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-navy-200 mb-12 max-w-4xl mx-auto leading-relaxed">
              Replace chaotic stopwatches and scattered speaker notes with organized timer management 
              and automatic Slack notifications that keep your team informed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              {user ? (
                <Link to="/dashboard" className="btn text-lg px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="btn text-lg px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200">
                    Start 7-Day Free Trial
                  </Link>
                  <Link to="/pricing" className="btn text-lg px-8 py-4 border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-navy-900 rounded-xl transition-all duration-200">
                    View Pricing
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Hero Mockup */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative">
              {/* Main Dashboard Mockup */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-navy-100 transform perspective-1000 rotate-x-2">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-900">Tech Conference 2025</h3>
                      <p className="text-sm text-gray-500">Main Auditorium • 3 active timers</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-green-700">LIVE</span>
                    </div>
                    <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                      + New Timer
                    </button>
                  </div>
                </div>

                {/* Active Timers */}
                <div className="grid gap-6">
                  {/* Running Timer */}
                  <div className="bg-gradient-to-r from-teal-50 to-teal-100 border-2 border-teal-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">RUNNING</span>
                        </div>
                        <h4 className="text-2xl font-bold text-navy-900 mb-2">Opening Keynote</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Dr. Sarah Chen</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>AI in Healthcare</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-5xl font-bold text-teal-600 mb-2">12:45</div>
                        <div className="text-sm text-gray-500">Started 17:15 ago</div>
                        <div className="flex space-x-2 mt-4">
                          <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50">
                            Pause
                          </button>
                          <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50">
                            +5 min
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Timer */}
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="text-xs font-bold text-purple-700 uppercase tracking-wide">NEXT UP</span>
                        </div>
                        <h4 className="text-2xl font-bold text-navy-900 mb-2">Panel Discussion</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>4 Speakers</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>Future of Tech</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-5xl font-bold text-purple-600 mb-2">45:00</div>
                        <div className="text-sm text-gray-500">Starts after current</div>
                        <div className="flex space-x-2 mt-4">
                          <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50">
                            Edit
                          </button>
                          <button className="px-3 py-1 bg-purple-500 text-white rounded-lg text-xs font-medium hover:bg-purple-600">
                            Start Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scheduled Timer */}
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">SCHEDULED</span>
                        </div>
                        <h4 className="text-xl font-bold text-navy-900 mb-2">Networking Break</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>15 minutes</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            <span>Lobby Area</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-600 mb-2">15:00</div>
                        <div className="text-sm text-gray-500">Starts at 3:30 PM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Slack Notification */}
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-80 bg-navy-900 rounded-2xl shadow-2xl p-6 border border-navy-700">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">#</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">#event-team</p>
                    <p className="text-gray-400 text-xs">StageCue Bot</p>
                  </div>
                  <div className="ml-auto text-xs text-gray-400">2:34 PM</div>
                </div>
                <div className="space-y-3 text-white font-mono text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">⚠️</span>
                    <span>Opening Keynote - 5 minutes remaining</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400">📝</span>
                    <span>Next: Panel Discussion (4 speakers)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">👤</span>
                    <span>Dr. Sarah Chen finishing soon</span>
                  </div>
                </div>
              </div>

              {/* Floating Public Display */}
              <div className="absolute -left-4 bottom-8 w-64 bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="text-center">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">PUBLIC DISPLAY</div>
                  <h4 className="text-lg font-bold text-navy-900 mb-4">Opening Keynote</h4>
                  <div className="text-6xl font-bold text-teal-500 mb-2">12:45</div>
                  <div className="text-sm text-gray-500 mb-4">Dr. Sarah Chen</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">58% complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem/Solution Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-600 text-sm font-medium mb-8">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                The Current Problem
              </div>
              <h2 className="text-4xl font-bold text-navy-900 mb-8">
                Event Timing is Still Stuck in the Stone Age
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-lg mb-2">Multiple stopwatches and phones</h4>
                    <p className="text-gray-600 leading-relaxed">Event teams juggle different timing devices, leading to confusion, missed cues, and speakers running over time.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-lg mb-2">Scattered speaker information</h4>
                    <p className="text-gray-600 leading-relaxed">Speaker notes, bios, and presentation details scattered across emails, documents, and sticky notes.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-lg mb-2">Manual team coordination</h4>
                    <p className="text-gray-600 leading-relaxed">Team members miss critical timing updates, speaker changes, and transition cues during live events.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Solution Preview */}
              <div className="bg-gradient-to-br from-teal-50 to-white rounded-3xl shadow-2xl p-8 border-2 border-teal-100">
                <div className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  The StageCue Solution
                </div>
                <h3 className="text-3xl font-bold text-navy-900 mb-8">One Platform, Perfect Timing</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900 text-lg mb-2">Centralized timer dashboard</h4>
                      <p className="text-gray-600 leading-relaxed">All event timers in one place with shareable countdown displays for speakers and audience.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900 text-lg mb-2">Integrated speaker management</h4>
                      <p className="text-gray-600 leading-relaxed">Speaker information, notes, and presentation details organized with each timer session.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900 text-lg mb-2">Automatic team notifications</h4>
                      <p className="text-gray-600 leading-relaxed">Slack integration keeps everyone informed with timing alerts and speaker transition updates.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-600 text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
              </svg>
              Core Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
              Everything You Need for Perfect Event Timing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From small workshops to large conferences, StageCue provides professional timer management and speaker coordination
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">Web-Based Timers</h3>
                <p className="text-gray-600 leading-relaxed mb-6">Create named countdown timers with shareable public displays. No more juggling multiple stopwatches or phone timers.</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Shareable countdown URLs</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Start/stop/pause controls</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Clean, professional displays</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">Speaker Management</h3>
                <p className="text-gray-600 leading-relaxed mb-6">Organize speaker notes and transitions. Keep track of who's speaking when and what's coming next.</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Speaker notes per timer</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Session templates</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Self-service speaker links</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h8v-2H4v2zM4 11h10V9H4v2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">Slack Notifications</h3>
                <p className="text-gray-600 leading-relaxed mb-6">Automatic alerts keep your team informed with time warnings and speaker transition notifications.</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Time warnings</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Speaker transitions</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Custom messages</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Mockup */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-navy-900 mb-6">Real-Time Event Coordination</h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    See exactly what's happening across all your event sessions. Get instant visibility into timing, speakers, and upcoming transitions.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">Live timer status across all sessions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">Instant speaker and session information</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">Automatic team notifications</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  {/* Mobile App Mockup */}
                  <div className="bg-navy-900 rounded-3xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="bg-white rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-navy-900">Event Control</h4>
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-navy-900 text-sm">Main Stage</p>
                              <p className="text-xs text-gray-500">Dr. Sarah Chen</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-teal-600">08:32</p>
                              <p className="text-xs text-teal-600">ACTIVE</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-navy-900 text-sm">Workshop A</p>
                              <p className="text-xs text-gray-500">Panel Discussion</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-purple-600">25:00</p>
                              <p className="text-xs text-purple-600">READY</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-navy-900 text-sm">Break Time</p>
                              <p className="text-xs text-gray-500">Networking</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-gray-500">15:00</p>
                              <p className="text-xs text-gray-500">SCHEDULED</p>
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
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Perfect For Every Event
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Event Professionals
            </h2>
            <p className="text-xl text-navy-200 max-w-3xl mx-auto leading-relaxed">
              From intimate workshops to large-scale conferences, StageCue adapts to your event needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Conferences</h3>
                <p className="text-navy-200 text-sm leading-relaxed">Multi-track events with complex scheduling and speaker coordination</p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Workshops</h3>
                <p className="text-navy-200 text-sm leading-relaxed">Interactive sessions with timed activities and breakout groups</p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Corporate Events</h3>
                <p className="text-navy-200 text-sm leading-relaxed">Professional presentations, meetings, and company gatherings</p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="current Color" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Live Productions</h3>
                <p className="text-navy-200 text-sm leading-relaxed">Real-time coordination for broadcasts, webinars, and live shows</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Alternative - Feature Stats */}
      <div className="py-24 bg-gradient-to-br from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-6">
              Built for Professional Event Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed with input from event organizers who manage everything from 50-person workshops to 5,000-person conferences
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-teal-600 mb-2">99.9%</div>
              <div className="text-lg font-semibold text-navy-900 mb-2">Uptime</div>
              <p className="text-gray-600 text-sm">Reliable timing when it matters most</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">< 2s</div>
              <div className="text-lg font-semibold text-navy-900 mb-2">Response Time</div>
              <p className="text-gray-600 text-sm">Lightning-fast timer updates</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-teal-600 mb-2">24/7</div>
              <div className="text-lg font-semibold text-navy-900 mb-2">Support</div>
              <p className="text-gray-600 text-sm">Help when you need it most</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">∞</div>
              <div className="text-lg font-semibold text-navy-900 mb-2">Scalability</div>
              <p className="text-gray-600 text-sm">From small meetings to large conferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 bg-gradient-to-br from-navy-900 via-navy-800 to-teal-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Transform Your Events?
          </h2>
          <p className="text-xl text-navy-200 mb-12 leading-relaxed">
            Join event professionals who trust StageCue for reliable timing and seamless speaker coordination
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/signup" className="btn text-lg px-10 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200">
                Start 7-Day Free Trial
              </Link>
              <Link to="/pricing" className="btn text-lg px-10 py-4 border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-navy-900 rounded-xl transition-all duration-200">
                View Pricing Plans
              </Link>
            </div>
          )}
          
          <div className="mt-12 text-center">
            <p className="text-navy-300 text-sm">
              No setup required • Cancel anytime • 7-day free trial
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}