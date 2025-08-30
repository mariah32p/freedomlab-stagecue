import { useState } from 'react';
import { SignUpModal } from '../components/SignUpModal';

export function Home() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-6 tracking-tight leading-none">
              Perfect Event
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Timing
              </span>
            </h1>
            <p className="text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-light">
              Professional countdown displays and speaker management for flawless events
            </p>
            <button
              onClick={() => setShowSignUpModal(true)}
              className="inline-flex items-center px-8 py-4 text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Free Trial
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Product Mockup */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative">
              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-pink-400 to-orange-400 rounded-3xl opacity-20 blur-xl"></div>
              
              {/* Main Interface */}
              <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                {/* Browser Chrome */}
                <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 mx-6">
                    <div className="bg-white rounded-lg px-4 py-2 text-sm text-slate-500 border">
                      app.stagecue.com/timer/tech-conference-2024
                    </div>
                  </div>
                </div>
                
                {/* App Interface */}
                <div className="bg-gradient-to-br from-slate-50 to-white p-12">
                  {/* Main Timer Display */}
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-96 h-96 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                      <div className="relative text-center">
                        <div className="text-7xl font-black text-white mb-4 font-mono tracking-tight">
                          08:42
                        </div>
                        <div className="text-white/90 text-xl font-medium">
                          Time Remaining
                        </div>
                      </div>
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                          <div className="text-white/80 text-sm font-medium mb-2">Current Speaker</div>
                          <div className="text-white text-lg font-bold">Sarah Chen</div>
                          <div className="text-white/90 text-base">AI in Modern Healthcare</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Control Dashboard */}
                  <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900 text-lg">Controls</h3>
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="space-y-3">
                        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                          Start Timer
                        </button>
                        <button className="w-full bg-slate-100 text-slate-700 py-3 px-4 rounded-xl font-semibold hover:bg-slate-200 transition-colors">
                          Pause
                        </button>
                        <button className="w-full bg-slate-100 text-slate-700 py-3 px-4 rounded-xl font-semibold hover:bg-slate-200 transition-colors">
                          Reset
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900 text-lg">Next Up</h3>
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="space-y-3">
                        <div className="font-semibold text-slate-900">Dr. Michael Torres</div>
                        <div className="text-slate-600">Machine Learning Ethics</div>
                        <div className="text-sm text-slate-500 bg-slate-50 px-3 py-2 rounded-lg">
                          15 min session • Stage A
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900 text-lg">Team Alerts</h3>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-xs text-slate-500">Connected</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span className="text-slate-600">Slack notifications active</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                          <span className="text-slate-600">5min, 2min, 30sec warnings</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                          <span className="text-slate-600">Auto speaker transitions</span>
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

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Visual Displays</h3>
              <p className="text-lg text-slate-600">
                Professional countdown timers that speakers and audience can see
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Speaker Links</h3>
              <p className="text-lg text-slate-600">
                Give speakers their own view with time and notes
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Slack Alerts</h3>
              <p className="text-lg text-slate-600">
                Automatic team notifications and time warnings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Demo */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Glow Effects */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-20"></div>
            
            {/* Browser Window */}
            <div className="relative bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Browser Chrome */}
              <div className="bg-slate-700 px-6 py-4 flex items-center border-b border-slate-600">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 mx-6">
                  <div className="bg-slate-600 rounded-lg px-4 py-2 text-sm text-slate-300">
                    app.stagecue.com/timer/conference-main-stage
                  </div>
                </div>
              </div>
              
              {/* Timer Interface */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-12">
                <div className="text-center">
                  {/* Main Timer */}
                  <div className="inline-flex items-center justify-center w-80 h-80 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full shadow-2xl mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                    <div className="relative text-center">
                      <div className="text-6xl font-black text-white mb-2 font-mono tracking-wider">
                        12:34
                      </div>
                      <div className="text-white/80 text-lg font-semibold uppercase tracking-wide">
                        Minutes Left
                      </div>
                    </div>
                  </div>
                  
                  {/* Speaker Info */}
                  <div className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50 max-w-2xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="text-left">
                        <div className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wide">Current Speaker</div>
                        <div className="text-white text-2xl font-bold mb-1">Dr. Sarah Chen</div>
                        <div className="text-slate-300 text-lg">AI in Healthcare Innovation</div>
                      </div>
                      <div className="text-left">
                        <div className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wide">Next Up</div>
                        <div className="text-white text-xl font-semibold mb-1">Michael Torres</div>
                        <div className="text-slate-300">Machine Learning Ethics</div>
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
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">
            Ready to go live?
          </h2>
          <button
            onClick={() => setShowSignUpModal(true)}
            className="inline-flex items-center px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
          >
            Start Free Trial
          </button>
          <p className="text-slate-500 mt-6 text-lg">
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