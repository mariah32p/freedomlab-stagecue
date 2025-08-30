import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignUpModal } from '../components/SignUpModal';

export function Home() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
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
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <button
              onClick={() => setShowSignUpModal(true)}
              className="inline-flex items-center px-8 py-4 text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
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
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-pink-400 to-orange-400 rounded-3xl opacity-20 blur-xl"></div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center">
                  <div className="flex space-x-2">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Speaker Links</h3>
              <p className="text-lg text-slate-600">
                Give speakers their own view with time and notes
                  </div>
                  <div className="flex-1 mx-6">
                    <div className="bg-white rounded-lg px-4 py-2 text-sm text-slate-500 border">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                </div>
                
                {/* App Interface */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Slack Alerts</h3>
              <p className="text-lg text-slate-600">
                Automatic team notifications and time warnings
                          Reset
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">
            Ready to go live?
                          <span className="text-slate-600">Auto speaker transitions</span>
                  </div>
                </div>
            className="inline-flex items-center px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
            </div>
            Start Free Trial
          </button>
          <p className="text-slate-500 mt-6 text-lg">
            7-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>
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
  )
}
  )
}