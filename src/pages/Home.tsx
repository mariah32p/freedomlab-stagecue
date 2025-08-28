import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-primary-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Professional
              <span className="text-primary-400 block">Event Timing</span>
            </h1>
            <p className="text-xl md:text-2xl text-navy-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Replace chaotic stopwatches and scattered speaker notes with organized timer management 
              and automatic Slack notifications that keep your team informed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              {user ? (
                <Link to="/dashboard" className="btn btn-primary text-lg px-8 py-4 bg-primary-500 hover:bg-primary-600">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="btn btn-primary text-lg px-8 py-4 bg-primary-500 hover:bg-primary-600">
                    Start 7-Day Free Trial
                  </Link>
                  <Link to="/pricing" className="btn btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-navy-900">
                    View Pricing
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Feature Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-navy-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">Live Timer Dashboard</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-navy-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-navy-900">Opening Keynote</p>
                        <p className="text-sm text-navy-600">Sarah Johnson</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-500">12:45</p>
                        <p className="text-xs text-navy-500">RUNNING</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-navy-900">Q&A Session</p>
                        <p className="text-sm text-navy-600">Panel Discussion</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">15:00</p>
                        <p className="text-xs text-navy-500">NEXT</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">Slack Integration</h3>
                  <div className="bg-navy-900 rounded-lg p-4 text-white font-mono text-sm">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mr-2"></div>
                      <span className="text-primary-400">#event-team</span>
                    </div>
                    <p className="mb-1">🎤 Opening Keynote</p>
                    <p className="mb-1">⏰ 5 minutes remaining</p>
                    <p className="text-navy-400">📝 Next: Q&A Session (Panel Discussion)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Everything You Need for Event Timing
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              From small workshops to large conferences, StageCue keeps your events running smoothly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Web-Based Timers</h3>
              <p className="text-navy-600 leading-relaxed">Create named countdown timers with shareable public displays. No more juggling multiple stopwatches.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Speaker Management</h3>
              <p className="text-navy-600 leading-relaxed">Organize speaker notes and transitions. Keep track of who's speaking when and what's coming next.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h8v-2H4v2zM4 11h10V9H4v2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Slack Notifications</h3>
              <p className="text-navy-600 leading-relaxed">Automatic alerts keep your team informed with time warnings and speaker transition notifications.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Problem/Solution Section */}
      <div className="bg-navy-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy-900 mb-6">
                Stop the Event Chaos
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900">Multiple stopwatches and phones</h4>
                    <p className="text-navy-600">Juggling different timing devices leads to confusion and missed cues</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900">Scattered speaker notes</h4>
                    <p className="text-navy-600">Important speaker information lost in emails and documents</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900">Manual team coordination</h4>
                    <p className="text-navy-600">Team members miss critical timing updates and speaker changes</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-navy-200">
                <h3 className="text-2xl font-bold text-navy-900 mb-6">StageCue Solution</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900">Centralized timer dashboard</h4>
                      <p className="text-navy-600">All timers in one place with shareable countdown displays</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900">Integrated speaker notes</h4>
                      <p className="text-navy-600">Speaker information and notes organized with each timer</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900">Automatic Slack alerts</h4>
                      <p className="text-navy-600">Team gets notified automatically about timing and transitions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Perfect for Every Event Type
            </h2>
            <p className="text-xl text-navy-600">
              Event organizers, workshop leaders, and conference producers trust StageCue
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-navy-50 hover:bg-navy-100 transition-colors">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-bold text-navy-900 mb-2">Conferences</h3>
              <p className="text-sm text-navy-600">Multi-track events with complex scheduling</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-navy-50 hover:bg-navy-100 transition-colors">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold text-navy-900 mb-2">Workshops</h3>
              <p className="text-sm text-navy-600">Interactive sessions with timed activities</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-navy-50 hover:bg-navy-100 transition-colors">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h3 className="font-bold text-navy-900 mb-2">Corporate Events</h3>
              <p className="text-sm text-navy-600">Professional presentations and meetings</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-navy-50 hover:bg-navy-100 transition-colors">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-navy-900 mb-2">Live Events</h3>
              <p className="text-sm text-navy-600">Real-time coordination for live productions</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-navy-900 to-primary-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Events?
          </h2>
          <p className="text-xl text-navy-200 mb-8">
            Join event professionals who trust StageCue for reliable timing and coordination
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn btn-primary text-lg px-8 py-4 bg-white text-navy-900 hover:bg-navy-50">
                Start Free Trial
              </Link>
              <Link to="/pricing" className="btn btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-navy-900">
                View Plans
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}