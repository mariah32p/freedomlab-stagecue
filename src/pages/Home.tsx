import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-dots-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                7-Day Free Trial Available
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6 leading-tight">
                Professional Event
                <span className="block bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                  Timing System
                </span>
              </h1>
              
              <p className="text-xl text-navy-600 mb-8 leading-relaxed">
                Keep conferences, workshops, and live events perfectly on schedule with real-time countdown displays, speaker coordination, and team notifications.
              </p>
              
              <button
                onClick={handleStartTrial}
                className="btn btn-primary px-8 py-4 text-lg bg-teal-600 hover:bg-teal-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 mb-4"
              >
                Start Free Trial
              </button>
              
              <p className="text-sm text-navy-500">
                7-day free trial • Cancel anytime
              </p>
            </div>
            
            {/* Right Side Mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                {/* Browser Header */}
                <div className="bg-slate-100 px-4 py-3 flex items-center space-x-2 border-b border-slate-200">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-500 ml-4">
                    stagecue.com/event/q1-launch
                  </div>
                </div>
                
                {/* Mockup Content */}
                <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50/30">
                  <div className="text-center mb-6">
                    <div className="text-6xl font-mono font-bold text-navy-900 mb-2">18:42</div>
                    <div className="text-slate-600">Time Remaining</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <span className="text-teal-600 font-semibold text-sm">SM</span>
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">Sarah Martinez</div>
                        <div className="text-sm text-slate-600">Project Overview</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg text-sm font-medium">
                      Pause
                    </button>
                    <button className="bg-blue-500 text-white py-2 px-3 rounded-lg text-sm">
                      +5 min
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Floating notification */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-xl border border-slate-200 p-3 max-w-xs animate-fade-in">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-900">Slack Alert Sent</div>
                    <div className="text-xs text-slate-600">#launch-team notified</div>
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