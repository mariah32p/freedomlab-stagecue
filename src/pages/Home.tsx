import { useNavigate } from 'react-router-dom';
import { StageCue } from './Demo';
import { products } from '../stripe-config';

export function Home() {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate('/signup');
  };
  const proPlan = products.find(p => p.name === 'StageCue Pro')!;

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
                <span className="block bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mt-1 pb-2">
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
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Countdown Display Mockup */}
            <div className="group">
              <h3 className="text-2xl font-bold text-navy-900 mb-6 text-center">Live Countdown Display</h3>
              <div className="bg-white rounded-2xl shadow-xl p-8 group-hover:shadow-2xl transition-all duration-300">
                <div className="text-center">
                  <div className="text-6xl font-mono font-bold text-teal-600 mb-4">12:34</div>
                  <div className="text-lg font-semibold text-slate-900 mb-2">AI in Healthcare</div>
                  <div className="text-slate-600 mb-6">Dr. Emily Chen</div>
                  <div className="w-full bg-teal-100 rounded-full h-3 mb-6">
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-3 rounded-full transition-all duration-1000" style={{width: '75%'}}></div>
                  </div>
                  <div className="flex justify-center space-x-3">
                    <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium">+5 min</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">Alert Team</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Speaker Notes Mockup */}
            <div className="group">
              <h3 className="text-2xl font-bold text-navy-900 mb-6 text-center">Speaker Notes & Coordination</h3>
              <div className="bg-white rounded-2xl shadow-xl p-6 group-hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">EC</span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Dr. Emily Chen</div>
                      <div className="text-sm text-slate-600">AI in Healthcare</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">20 min</div>
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-blue-600">0:00</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Essential</span>
                    </div>
                    <div className="text-sm text-blue-800">Welcome and introduce AI diagnostic tools</div>
                  </div>
                  
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-600">5:00</span>
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Optional</span>
                    </div>
                    <div className="text-sm text-slate-600">Share personal research background</div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-purple-600">18:00</span>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Transition</span>
                    </div>
                    <div className="text-sm text-purple-800">Wrap up, prepare for Q&A</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-slate-600">Speaker Ready</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-slate-600">Moderator Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Team Notifications Mockup */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-navy-900 mb-6 text-center">Real-time Team Notifications</h3>
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 max-w-2xl mx-auto">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-bold">#</span>
                </div>
                <span className="text-sm sm:text-base font-semibold text-slate-900">#event-team</span>
                <span className="text-xs sm:text-sm text-slate-500">Slack</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-2 sm:space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                      <span className="text-sm sm:text-base font-medium text-slate-900">StageCue</span>
                      <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded">BOT</span>
                      <span className="text-xs text-slate-500">2:34 PM</span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-700">⏰ <strong>5 minutes remaining</strong> for "AI in Healthcare" session</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 sm:space-x-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                      <span className="text-sm sm:text-base font-medium text-slate-900">StageCue</span>
                      <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded">BOT</span>
                      <span className="text-xs text-slate-500">2:39 PM</span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-700">🎤 Next up: <strong>Alex Chen</strong> - "Technical Architecture" in 5 minutes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Trusted by Event Professionals Worldwide
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              From tech conferences to corporate workshops, StageCue keeps events running smoothly
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-white text-sm sm:text-base font-semibold">MW</span>
                </div>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-navy-900">Mariah W.</div>
                  <div className="text-xs sm:text-sm text-navy-600">Technology Conference Director</div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm sm:text-base text-navy-700 italic">
                "StageCue transformed our annual tech conference. No more awkward delays or rushed sessions. Everything runs like clockwork."
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-white text-sm sm:text-base font-semibold">DR</span>
                </div>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-navy-900">Diane R.</div>
                  <div className="text-xs sm:text-sm text-navy-600">Software Summit Organizer</div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm sm:text-base text-navy-700 italic">
                "The speaker coordination features are incredible. Our software conference speakers love having their notes synced with the countdown timer."
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-white text-sm sm:text-base font-semibold">NR</span>
                </div>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-navy-900">Nathan R.</div>
                  <div className="text-xs sm:text-sm text-navy-600">IT Workshop Coordinator</div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm sm:text-base text-navy-700 italic">
                "Setup took 10 minutes and saved us hours of coordination headaches for our IT training workshops. The Slack integration is a game-changer."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Professional event timing system with a 7-day free trial.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard Plan */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-teal-500 p-8 hover:shadow-2xl transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-teal-600 text-white px-4 py-2 text-sm font-bold rounded-full shadow-lg">
                  AVAILABLE NOW
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-navy-900 mb-2">StageCue Standard</h3>
                <p className="text-navy-600 mb-6">Professional event timing for all your needs</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-navy-900">$29</span>
                  <span className="text-base sm:text-lg font-medium text-navy-500">/month</span>
                </div>
                <div className="inline-flex items-center px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  7-day free trial
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-navy-700">Up to 10 active timers</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-navy-700">Timer controls via web dashboard</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-navy-700">Speaker notes management</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-navy-700">Basic Slack notifications</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-navy-700">Save/reuse timer configurations</span>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-500 p-8 hover:shadow-2xl transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-2 text-sm font-bold rounded-full shadow-lg">
                  MOST POPULAR
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-2">StageCue Pro</h3>
                <p className="text-sm sm:text-base text-navy-600 mb-6">Perfect for conferences and larger events</p>
                <div className="mb-6">
                  <span className="text-4xl sm:text-5xl font-bold text-navy-900">$49</span>
                  <span className="text-base sm:text-lg font-medium text-navy-500">/month</span>
                </div>
                <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  7-day free trial
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-navy-900">Everything in Basic, plus:</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-navy-700">Unlimited active timers</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-navy-700">Custom moderator links</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-navy-700">Speaker self-service links</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-navy-700">Advanced Slack notifications</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-navy-700">Timer + speaker templates</span>
                </div>
              </div>
            </div>

            {/* Premium Plan - Coming Soon */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-300 p-8 hover:shadow-2xl transition-all duration-300 relative opacity-75">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-slate-600 text-white px-4 py-2 text-sm font-bold rounded-full shadow-lg">
                  COMING SOON
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-700 mb-2">StageCue Premium</h3>
                <p className="text-sm sm:text-base text-slate-600 mb-6">Enterprise features for large organizations</p>
                <div className="mb-6">
                  <span className="text-4xl sm:text-5xl font-bold text-slate-500">${premiumPlan.price}</span>
                  <span className="text-base sm:text-lg font-medium text-slate-500">/month</span>
                </div>
                <div className="text-sm text-slate-500 font-medium">7-day free trial</div>
              </div>
              <div className="space-y-4 mb-8">
                {products.find(p => p.name === 'StageCue Standard')!.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className={`${feature.startsWith('Everything') ? 'font-semibold text-slate-500' : 'text-slate-500'} text-sm sm:text-base`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
            {/* Pro Plan - Coming Soon */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-300 p-8 hover:shadow-2xl transition-all duration-300 relative opacity-75">
          <div className="mt-12 text-center">
            <button
              onClick={handleStartTrial}
              className="btn btn-primary px-8 py-4 text-lg bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Free Trial
            </button>
            <p className="text-sm text-navy-600 mt-4">
              7-day free trial • Choose your plan after signup • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-navy-600">
              Everything you need to know about StageCue
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-navy-900 mb-3">
                How quickly can I set up my first event?
              </h3>
              <p className="text-navy-700">
                Most users have their first event running in under 15 minutes. Simply create your event, add speakers, and share the countdown display link. No technical setup required.
              </p>
            </div>
                <span className="bg-slate-600 text-white px-4 py-2 text-sm font-bold rounded-full shadow-lg">
                  COMING SOON
              <h3 className="text-lg font-semibold text-navy-900 mb-3">
                What happens during the 7-day free trial?
              </h3>
              <p className="text-navy-700">
                <p className="text-slate-600 mb-6">Advanced features for enterprise organizations</p>
              </p>
                  <span className="text-5xl font-bold text-slate-500">${proPlan.price}</span>
                  <span className="text-lg font-medium text-slate-500">/month</span>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="text-sm text-slate-500 font-medium">7-day free trial</div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-navy-900 mb-3">
                    <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <p className="text-navy-700">
                Yes! You can upgrade or downgrade anytime from your account settings. Changes take effect immediately, and billing is prorated automatically.
              </p>
                    <span className={`${feature.startsWith('Everything') ? 'font-semibold text-slate-500' : 'text-slate-500'}`}>
                      {feature}
                    </span>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-navy-900 mb-3">
                How does the Slack integration work?
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              className="btn btn-primary px-8 py-4 text-lg bg-teal-600 hover:bg-teal-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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
              7-day free trial • Cancel anytime • Full access during trial
            7 days free • Full access • No commitment
          </p>
        </div>
      </section>
    </div>
  );
}