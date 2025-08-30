import { useState } from 'react';
import { SignUpModal } from '../components/SignUpModal';

export function Home() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
              Professional Event
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Management System
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Complete event timing platform with speaker management, audience displays, and team coordination for flawless conferences and workshops
            </p>
            <button
              onClick={() => setShowSignUpModal(true)}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Free Trial
            </button>
            <p className="text-slate-500 mt-4 text-sm">
              7-day free trial • No credit card required • Setup in minutes
            </p>
          </div>
        </div>
      </section>

      {/* Product Mockup */}
      <section className="relative -mt-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl transform scale-110"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="bg-white rounded-lg px-4 py-2 text-sm text-slate-500 inline-block shadow-sm">
                    app.stagecue.com/events/tech-summit-2024
                  </div>
                </div>
              </div>
              
              {/* Dashboard Interface */}
              <div className="bg-slate-50 p-8">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Timer Display */}
                  <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
                    <div className="relative">
                      <div className="text-6xl font-mono font-bold text-white mb-4">15:42</div>
                      <div className="text-white/70 text-lg mb-6">Session Time Remaining</div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="text-white/60 text-sm mb-1">Current Speaker</div>
                        <div className="text-white font-semibold">Dr. Sarah Chen - AI in Healthcare</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Event Schedule */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-4">Today's Schedule</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-900">Dr. Sarah Chen</div>
                          <div className="text-xs text-slate-500">2:00 PM - 2:30 PM</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-900">Panel Discussion</div>
                          <div className="text-xs text-slate-500">2:30 PM - 3:15 PM</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-900">Coffee Break</div>
                          <div className="text-xs text-slate-500">3:15 PM - 3:30 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Speaker Notes Panel */}
                <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Speaker Notes & Controls</h3>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">Start</button>
                      <button className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">Pause</button>
                      <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">Stop</button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-2">Speaker Instructions</div>
                      <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                        • 5-minute warning at 20:00<br/>
                        • 2-minute warning at 17:00<br/>
                        • Hard stop at 15:00<br/>
                        • Q&A follows immediately
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-2">Team Notifications</div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-slate-600">Slack: #event-team</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-slate-600">Email: moderators@event.com</span>
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
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything you need for perfect events
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Professional tools that keep conferences, workshops, and meetings running smoothly
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Smart Timer Management</h3>
              <p className="text-slate-600 leading-relaxed">
                Multiple countdown displays, automatic transitions, and precision timing controls for seamless event flow
              </p>
            </div>
            
            <div className="group bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Speaker Portal</h3>
              <p className="text-slate-600 leading-relaxed">
                Dedicated speaker views with notes, timing cues, and self-service controls for confident presentations
              </p>
            </div>
            
            <div className="group bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Team Coordination</h3>
              <p className="text-slate-600 leading-relaxed">
                Automatic Slack notifications, email alerts, and real-time updates keep your entire team synchronized
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to run flawless events?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join event professionals who trust StageCue for perfect timing and seamless coordination
          </p>
          <button
            onClick={() => setShowSignUpModal(true)}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Start Free Trial
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