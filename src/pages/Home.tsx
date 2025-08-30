import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignUpModal } from '../components/SignUpModal';

export function Home() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Trusted by 500+ event organizers
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-8 leading-[0.9] tracking-tight">
              Perfect Event
              <span className="block bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Timing
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Professional countdown displays, speaker management, and Slack integration. 
              Keep your events running flawlessly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => setShowSignUpModal(true)}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="relative z-10">Start Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <Link
                to="/pricing"
                className="text-slate-600 hover:text-primary-600 font-medium text-lg transition-colors flex items-center group"
              >
                View Pricing 
                <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Product Mockup */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 mx-6">
                  <div className="bg-white rounded-lg px-4 py-2 text-sm text-slate-500 border">
                    stagecue.com/timer/conference-2024
                  </div>
                </div>
              </div>
              
              {/* App Interface */}
              <div className="bg-gradient-to-br from-slate-50 to-white p-8">
                {/* Timer Display */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-80 h-80 bg-gradient-to-br from-primary-500 to-purple-600 rounded-3xl shadow-2xl mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="relative text-center">
                      <div className="text-6xl font-bold text-white mb-2 font-mono tracking-tight">
                        12:34
                      </div>
                      <div className="text-white/80 text-lg font-medium">
                        Time Remaining
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-white/90 text-sm font-medium mb-1">Current Speaker</div>
                        <div className="text-white text-base font-semibold">Sarah Chen - AI in Healthcare</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Control Panel */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900">Timer Controls</h3>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg text-sm font-medium">
                        Start Timer
                      </button>
                      <button className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg text-sm font-medium">
                        Pause
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900">Next Speaker</h3>
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="text-sm text-slate-600">
                      <div className="font-medium text-slate-900">Dr. Michael Torres</div>
                      <div>Machine Learning Ethics</div>
                      <div className="text-xs text-slate-500 mt-1">15 min session</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900">Notifications</h3>
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600">
                      <div className="flex items-center text-xs">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                        Slack connected
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Team notified at 5min, 2min, 30sec</div>
                    </div>
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
            <h2 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Built for Modern Events
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
              Everything you need to run professional events that start and end on time.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Visual Countdown</h3>
              <p className="text-slate-600 leading-relaxed">
                Professional displays that speakers and audience can see. Clean, distraction-free design.
              </p>
            </div>

            <div className="group relative bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Speaker Links</h3>
              <p className="text-slate-600 leading-relaxed">
                Give speakers their own view with time remaining and notes. No more hand signals.
              </p>
            </div>

            <div className="group relative bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Slack Alerts</h3>
              <p className="text-slate-600 leading-relaxed">
                Automatic team notifications for time warnings and speaker transitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-slate-400">Events</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-slate-400">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50k+</div>
              <div className="text-slate-400">Speakers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">2min</div>
              <div className="text-slate-400">Setup Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Ready to go live?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light">
            Join event organizers who've eliminated timing stress.
          </p>
          <button
            onClick={() => setShowSignUpModal(true)}
            className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-primary-600 bg-white rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <span className="relative z-10">Start Free Trial</span>
            <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="text-white/80 mt-6 text-sm">
            7-day free trial • No credit card required • Cancel anytime
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