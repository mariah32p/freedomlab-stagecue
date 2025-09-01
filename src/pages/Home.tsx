import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StageCue } from './Demo';

export function Home() {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-8 sm:py-12 lg:py-16">
        <div className="absolute inset-0 bg-dots-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side Content */}
            <div>
              <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-teal-100 text-teal-800 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                7-Day Free Trial Available
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-3 sm:mb-4 leading-tight">
                Professional Event
                <span className="block bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mt-1">
                  Timing System
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-navy-600 mb-6 sm:mb-8 leading-relaxed">
                Keep conferences, workshops, and live events perfectly on schedule with real-time countdown displays, speaker coordination, and team notifications.
              </p>
              
              <button
                onClick={handleStartTrial}
                className="btn btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-teal-600 hover:bg-teal-700 text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 mb-3 sm:mb-4 w-full sm:w-auto"
              >
                Start Free Trial
              </button>
              
              <p className="text-xs sm:text-sm text-navy-500 text-center sm:text-left">
                7-day free trial • Cancel anytime
              </p>
            </div>
            
            {/* Right Side Mockup */}
            <div className="relative mt-8 lg:mt-0">
              {/* Multi-screen Event Management Dashboard */}
              <div className="relative transform rotate-1 hover:rotate-0 transition-transform duration-700 h-[500px] sm:h-[600px]">
                {/* Main Dashboard */}
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden h-full">
                  {/* Browser Header */}
                  <div className="bg-gradient-to-r from-slate-100 to-slate-200 px-3 sm:px-4 py-2 sm:py-3 flex items-center space-x-2 border-b border-slate-300">
                    <div className="flex space-x-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-white rounded-md px-2 sm:px-3 py-1 text-xs text-slate-500 ml-2 sm:ml-4 shadow-inner overflow-hidden">
                      stagecue.com/live/tech-summit-2025
                    </div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 h-full overflow-hidden">
                    {/* Live Event Header */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">LIVE: Tech Summit 2025</span>
                      </div>
                      <div className="text-xs text-slate-500 hidden sm:block">9:42 AM PST</div>
                    </div>
                    
                    {/* Multi-Session Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      {/* Main Stage */}
                      <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border-2 border-teal-200">
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">Main Stage</span>
                          <div className="text-xl sm:text-2xl font-mono font-bold text-teal-600">12:34</div>
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-slate-900 mb-1">AI in Healthcare</div>
                        <div className="text-xs text-slate-600 mb-3">Dr. Emily Chen</div>
                        <div className="w-full bg-teal-100 rounded-full h-1.5 sm:h-2">
                          <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-1.5 sm:h-2 rounded-full" style={{width: '75%'}}></div>
                        </div>
                      </div>
                      
                      {/* Workshop Room */}
                      <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-slate-200">
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Workshop A</span>
                          <div className="text-xl sm:text-2xl font-mono font-bold text-purple-600">08:15</div>
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-slate-900 mb-1">React Best Practices</div>
                        <div className="text-xs text-slate-600 mb-3">Alex Rodriguez</div>
                        <div className="w-full bg-purple-100 rounded-full h-1.5 sm:h-2">
                          <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 sm:h-2 rounded-full" style={{width: '45%'}}></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Upcoming Sessions */}
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-700 mb-2 sm:mb-3">Next Up</h4>
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex items-center justify-between p-2 sm:p-3 bg-white/70 rounded-md sm:rounded-lg border border-slate-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-400 rounded-full"></div>
                            <div>
                              <div className="text-xs sm:text-sm font-medium text-slate-900">Coffee Break</div>
                              <div className="text-xs text-slate-600">15 minutes</div>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500">10:30 AM</div>
                        </div>
                        <div className="flex items-center justify-between p-2 sm:p-3 bg-white/70 rounded-md sm:rounded-lg border border-slate-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full"></div>
                            <div>
                              <div className="text-xs sm:text-sm font-medium text-slate-900">Keynote: Future of AI</div>
                              <div className="text-xs text-slate-600">45 minutes</div>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500">10:45 AM</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Live Actions */}
                    <div className="flex space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                      <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-2 sm:px-3 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                        Extend +5min
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-2 sm:px-3 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                        Alert Team
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-2 sm:px-3 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                        Next Session
                      </button>
                    </div>
                    
                    {/* Speaker Notes Preview */}
                    <div className="mb-3 sm:mb-4">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-700 mb-2 sm:mb-3">Current Speaker Notes</h4>
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="p-2 sm:p-3 bg-blue-50 rounded-md sm:rounded-lg border border-blue-200">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-medium text-blue-600">12:30</span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 rounded">Essential</span>
                          </div>
                          <div className="text-xs sm:text-sm text-blue-800">Introduce new AI diagnostic tools</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Team Status */}
                    <div className="mt-4">
                      <div className="flex items-center space-x-2 sm:space-x-4 text-xs">
                        <div className="flex items-center space-x-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div><span className="text-slate-600">Moderator Ready</span></div>
                        <div className="flex items-center space-x-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div><span className="text-slate-600 hidden sm:inline">Speakers Online</span><span className="text-slate-600 sm:hidden">Speakers</span></div>
                        <div className="flex items-center space-x-1"><div className="w-2 h-2 bg-purple-500 rounded-full"></div><span className="text-slate-600 hidden sm:inline">Tech Support</span><span className="text-slate-600 sm:hidden">Tech</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-white rounded-lg sm:rounded-xl shadow-xl border border-slate-200 p-2 sm:p-3 animate-bounce">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-slate-900">Live Updates</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-lg sm:rounded-xl shadow-xl p-2 sm:p-3 animate-pulse">
                  <div className="text-xs font-bold">2 Sessions</div>
                  <div className="text-xs opacity-90">Running Live</div>
                </div>
                
                <div className="absolute top-1/2 -right-4 sm:-right-8 bg-white rounded-md sm:rounded-lg shadow-lg border border-slate-200 p-2 transform -translate-y-1/2 animate-slide-in-right">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold text-slate-900">Slack Alert</div>
                      <div className="text-slate-600 hidden sm:block">Sent to #event-team</div>
                      <div className="text-slate-600 sm:hidden">Delivered</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              See <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">StageCue</span> in Action
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Watch how StageCue transforms event timing from chaotic to seamless
            </p>
          </div>
          
          {/* Interactive Demo */}
          <div className="bg-slate-100 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-inner">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <StageCue />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Everything You Need for Perfect Event Timing
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Professional tools designed for event organizers, moderators, and speakers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Countdown Displays</h3>
              <p className="text-navy-600 leading-relaxed">
                Beautiful, shareable countdown timers that keep everyone synchronized. Perfect for session transitions and break management.
              </p>
            </div>

            <div className="card text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Speaker Coordination</h3>
              <p className="text-navy-600 leading-relaxed">
                Organize speaker notes, transitions, and timing cues. Keep your event flowing smoothly from start to finish.
              </p>
            </div>

            <div className="card text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Team Notifications</h3>
              <p className="text-navy-600 leading-relaxed">
                Instant Slack alerts for time warnings, speaker changes, and event updates. Keep your entire team in sync.
              </p>
            </div>

            <div className="card text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Real-time Control</h3>
              <p className="text-navy-600 leading-relaxed">
                Adjust timers on the fly, extend sessions, and manage unexpected changes without missing a beat.
              </p>
            </div>

            <div className="card text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Event Templates</h3>
              <p className="text-navy-600 leading-relaxed">
                Save and reuse timing configurations for recurring events. Build your library of proven event formats.
              </p>
            </div>

            <div className="card text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Analytics & Reports</h3>
              <p className="text-navy-600 leading-relaxed">
                Track event performance, timing accuracy, and team coordination metrics to improve future events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Events?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join event organizers who trust StageCue to keep their events perfectly timed and professionally managed.
          </p>
          <button
            onClick={handleStartTrial}
            className="btn bg-white text-teal-600 hover:bg-teal-50 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Start Your Free Trial
          </button>
          <p className="text-sm text-teal-200 mt-4">
            7 days free • Full access • No commitment
          </p>
        </div>
      </section>
    </div>
  );
}