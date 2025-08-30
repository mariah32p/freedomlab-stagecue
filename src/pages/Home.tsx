import { useState } from 'react';
import { SignUpModal } from '../components/SignUpModal';

export function Home() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Professional Event Timing
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Keep your conferences and workshops perfectly on schedule with precision countdown displays
          </p>
          <button
            onClick={() => setShowSignUpModal(true)}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Mockup */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gray-100 rounded-2xl p-8 shadow-xl">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Browser bar */}
              <div className="bg-gray-50 px-4 py-3 border-b flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="bg-white rounded px-3 py-1 text-sm text-gray-500 inline-block">
                    stagecue.com/timer/conference-2024
                  </div>
                </div>
              </div>
              
              {/* Timer interface */}
              <div className="bg-gray-900 p-12 text-center">
                <div className="text-8xl font-mono font-bold text-white mb-4">
                  15:30
                </div>
                <div className="text-white/80 text-lg mb-8">
                  Time Remaining
                </div>
                <div className="bg-white/10 rounded-lg p-4 max-w-sm mx-auto">
                  <div className="text-white/60 text-sm">Current Speaker</div>
                  <div className="text-white font-semibold">Sarah Johnson</div>
                  <div className="text-white/80 text-sm">AI in Modern Healthcare</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Countdown Displays</h3>
              <p className="text-gray-600">
                Beautiful countdown timers that keep everyone on schedule
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Speaker Management</h3>
              <p className="text-gray-600">
                Give speakers their own view with notes and timing
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h8v-2H4v2zM4 11h10V9H4v2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Notifications</h3>
              <p className="text-gray-600">
                Automatic Slack alerts keep your team informed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to run flawless events?
          </h2>
          <button
            onClick={() => setShowSignUpModal(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Start Free Trial
          </button>
          <p className="text-blue-100 mt-4">
            7-day free trial • No setup required
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