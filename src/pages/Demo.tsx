import { useState, useEffect, useMemo, useCallback } from 'react';
import clsx from 'clsx';

// --- CONSTANTS & TYPES ---
const INITIAL_TIME_SECONDS = 25 * 60; // 25 minutes
type Tab = 'organizer' | 'moderator' | 'speaker';

const DEMO_SEQUENCE = [
  { tab: 'organizer' as Tab, duration: 4000 },
  { tab: 'moderator' as Tab, duration: 3000 },
  { tab: 'speaker' as Tab, duration: 3500 },
];

const SPEAKER_NOTES = [
  { minute: 0, text: "Welcome everyone to our Q1 Product Launch Planning session. Thank you all for joining today's kickoff." },
  { minute: 1, text: "Quick introductions - I'm Sarah, Product Manager. We have 25 minutes to cover our launch strategy." },
  { minute: 2, text: "Agenda overview: Market analysis (8 min), feature roadmap (10 min), timeline & resources (5 min), Q&A (2 min)" },
  { minute: 3, text: "Let's dive into market analysis. Share screen with competitive landscape slide." },
  { minute: 4, text: "Key insight: Our main competitor launched similar features last month - we need to differentiate." },
  { minute: 5, text: "Show user research findings - 73% want integration with existing tools." },
  { minute: 6, text: "Market opportunity: $2.3M potential revenue if we hit Q1 launch date." },
  { minute: 7, text: "Transition: 'Now let's look at how we'll build this...' Move to feature roadmap section." },
  { minute: 8, text: "Feature roadmap overview - show the product mockups on screen." },
  { minute: 9, text: "Core features: Dashboard redesign, API integrations, mobile app updates." },
  { minute: 10, text: "Technical requirements - mention the backend changes needed for scalability." },
  { minute: 11, text: "Design system updates - new component library will speed development." },
  { minute: 12, text: "User testing plan - we'll validate with 50 beta customers before full launch." },
  { minute: 13, text: "Risk mitigation - backup plan if API partner delays their integration." },
  { minute: 14, text: "Resource allocation - engineering team priorities and design timeline." },
  { minute: 15, text: "Quality assurance plan - automated testing and manual QA process." },
  { minute: 16, text: "Performance benchmarks - load testing for 10x current user base." },
  { minute: 17, text: "Final feature decisions - what's in scope vs. what moves to Q2." },
  { minute: 18, text: "Transition to timeline: 'Here's how we'll execute this plan...' Show project timeline." },
  { minute: 19, text: "Key milestones: Design complete (Week 3), Development (Week 6), Testing (Week 8)." },
  { minute: 20, text: "Resource needs: 2 additional engineers, 1 designer, QA support." },
  { minute: 21, text: "Budget requirements: $150K additional for external contractors." },
  { minute: 22, text: "Launch date confirmed: March 15th - non-negotiable due to conference season." },
  { minute: 23, text: "Wrap up timeline section. Ask: 'Any questions about the timeline or resources?'" },
  { minute: 24, text: "Open for final questions. Remind everyone: next check-in is Friday at 2 PM." },
  { minute: 25, text: "Thank everyone for their time. Follow-up email with action items goes out today." },
];

// --- HELPER FUNCTIONS ---
const formatTime = (seconds: number): string => {
  const mins = Math.floor(Math.abs(seconds) / 60).toString().padStart(2, '0');
  const secs = (Math.abs(seconds) % 60).toString().padStart(2, '0');
  return `${seconds < 0 ? '-' : ''}${mins}:${secs}`;
};

// --- UI COMPONENTS ---
const ClockIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LiveStatusIndicator = ({ text, color = 'green' }: { text: string; color?: string }) => (
  <div className={clsx('inline-flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-sm border shadow-lg', {
    'bg-emerald-50/90 text-emerald-700 border-emerald-200': color === 'green',
    'bg-blue-50/90 text-blue-700 border-blue-200': color === 'blue',
    'bg-amber-50/90 text-amber-700 border-amber-200': color === 'orange',
  })}>
    <div className={clsx('w-2.5 h-2.5 rounded-full animate-pulse shadow-sm', {
      'bg-emerald-500 shadow-emerald-500/50': color === 'green',
      'bg-blue-500 shadow-blue-500/50': color === 'blue',
      'bg-amber-500 shadow-amber-500/50': color === 'orange',
    })} />
    <span className="text-sm font-semibold tracking-wide">{text}</span>
  </div>
);

const GlassCard = ({ children, className = '', gradient = false }: {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}) => (
  <div className={clsx(
    'backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden',
    gradient ? 'bg-gradient-to-br from-white/95 to-white/80' : 'bg-white/95',
    className
  )}>
    {children}
  </div>
);

const MetricCard = ({ value, label, color = 'blue', icon }: {
  value: string;
  label: string;
  color?: 'blue' | 'purple' | 'emerald' | 'amber' | 'red';
  icon: React.ReactNode;
}) => (
  <div className={clsx('p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg', {
    'bg-blue-50/80 border-blue-200/50': color === 'blue',
    'bg-purple-50/80 border-purple-200/50': color === 'purple',
    'bg-emerald-50/80 border-emerald-200/50': color === 'emerald',
    'bg-amber-50/80 border-amber-200/50': color === 'amber',
    'bg-red-50/80 border-red-200/50': color === 'red',
  })}>
    <div className="flex items-center justify-between mb-3">
      <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center shadow-sm', {
        'bg-blue-500': color === 'blue',
        'bg-purple-500': color === 'purple',
        'bg-emerald-500': color === 'emerald',
        'bg-amber-500': color === 'amber',
        'bg-red-500': color === 'red',
      })}>
        {icon}
      </div>
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-600 font-medium">{label}</div>
  </div>
);

// --- VIEW COMPONENTS ---
const OrganizerView = ({ timeRemaining, isRunning, onToggleTimer, onResetTimer, onAdjustTime }: {
  timeRemaining: number;
  isRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onAdjustTime: (seconds: number) => void;
}) => (
  <div className="space-y-8 animate-fade-in">
    {/* Hero Section with Main Timer */}
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-90"></div>
      {/* FIXED: Replaced 'bg-dots-pattern' with inline SVG and fixed quotes */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&apos;60&apos; height=&apos;60&apos; viewBox=&apos;0 0 60 60&apos; xmlns=&apos;http://www.w3.org/2000/svg&apos;%3E%3Cg fill=&apos;none&apos; fill-rule=&apos;evenodd&apos;%3E%3Cg fill=&apos;%23ffffff&apos; fill-opacity=&apos;0.05&apos;%3E%3Ccircle cx=&apos;30&apos; cy=&apos;30&apos; r=&apos;2&apos;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      <GlassCard className="relative p-12" gradient>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <ClockIcon />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-900">Q1 Product Launch Kickoff</h1>
              <p className="text-gray-600 flex items-center space-x-2">
                <span>Virtual Event</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>23 attendees</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <LiveStatusIndicator text="Live" />
              </p>
            </div>
          </div>

          {/* Main Timer Display */}
          <div className="relative mb-8">
            <div className={clsx('text-8xl font-mono font-black mb-4 transition-all duration-700 tracking-wider', {
              'text-red-600 animate-pulse': timeRemaining <= 0,
              'text-red-500': timeRemaining > 0 && timeRemaining <= 120,
              'text-amber-500': timeRemaining > 120 && timeRemaining <= 300,
              'text-indigo-600': timeRemaining > 300,
            })}>
              {formatTime(timeRemaining)}
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl rounded-full opacity-50"></div>
            <p className="text-gray-700 text-xl font-semibold mb-8 relative">Session Time Remaining</p>
          </div>

          {/* Enhanced Timer Controls */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={onToggleTimer}
              className={clsx('group px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2',
                isRunning
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                  : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600'
              )}
            >
              <div className={clsx('w-5 h-5 transition-transform group-hover:scale-110', isRunning ? 'animate-pulse' : '')}>
                {isRunning ? (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span>{isRunning ? 'Pause Session' : 'Resume Session'}</span>
            </button>
            <button
              onClick={onResetTimer}
              className="group px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
            >
              <svg className="w-5 h-5 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span>Reset Timer</span>
            </button>
          </div>

          {/* Premium Time Adjustment Panel */}
          <div className="bg-gradient-to-r from-slate-50/80 to-gray-50/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-inner">
            <p className="text-gray-800 text-sm mb-4 font-semibold tracking-wide">PRECISION TIME CONTROL</p>
            <div className="flex justify-center space-x-3">
              {[
                { label: '-5m', seconds: -300, color: 'from-red-500 to-red-600' },
                { label: '-1m', seconds: -60, color: 'from-red-400 to-red-500' },
                { label: '+1m', seconds: 60, color: 'from-emerald-500 to-green-500' },
                { label: '+5m', seconds: 300, color: 'from-emerald-600 to-green-600' },
              ].map(({ label, seconds, color }) => (
                <button
                  key={label}
                  onClick={() => onAdjustTime(seconds)}
                  className={clsx(
                    'group px-6 py-3 bg-gradient-to-r text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105',
                    color
                  )}
                >
                  <span className="transition-transform group-hover:scale-110">{label}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 font-medium">Real-time adjustments sync across all displays</p>
          </div>
        </div>
      </GlassCard>
    </div>

    {/* Analytics Dashboard */}
    <div className="grid lg:grid-cols-4 gap-6">
      <MetricCard
        value="18:42"
        label="Current Session"
        color="blue"
        icon={<ClockIcon />}
      />
      <MetricCard
        value="3/8"
        label="Sessions Complete"
        color="purple"
        icon={
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        }
      />
      <MetricCard
        value="23"
        label="Live Attendees"
        color="emerald"
        icon={
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        }
      />
      <MetricCard
        value="97%"
        label="On Schedule"
        color="emerald"
        icon={
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        }
      />
    </div>

    {/* Enhanced Event Management */}
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Current Speaker Spotlight */}
      <div className="lg:col-span-2">
        <GlassCard className="p-8" gradient>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white font-bold text-xl">SC</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Sarah Chen</h3>
                <p className="text-gray-600 font-medium">Product Manager • Currently Presenting</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-emerald-600 text-sm font-semibold">Live • Minute {Math.floor((INITIAL_TIME_SECONDS - timeRemaining) / 60)}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 font-medium mb-1">Session Progress</div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(100, ((INITIAL_TIME_SECONDS - timeRemaining) / INITIAL_TIME_SECONDS) * 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {Math.round(((INITIAL_TIME_SECONDS - timeRemaining) / INITIAL_TIME_SECONDS) * 100)}% complete
              </div>
            </div>
          </div>

          {/* Real-time Insights */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Pacing</div>
                  <div className="text-emerald-600 text-sm font-semibold">Perfect</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Speaker is maintaining ideal pace for all agenda items</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Engagement</div>
                  <div className="text-blue-600 text-sm font-semibold">High</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">3 questions queued, active chat participation</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Next Up</div>
                  <div className="text-purple-600 text-sm font-semibold">Ready</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Mike Torres prepared for seamless handoff</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Enhanced Schedule Sidebar */}
      <div className="space-y-6">
        <GlassCard className="p-6" gradient>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Today's Agenda</h3>
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-l-4 border-indigo-500 shadow-sm">
              <div className="absolute -left-2 top-6 w-4 h-4 bg-indigo-500 rounded-full shadow-lg animate-pulse"></div>
              <div className="ml-2">
                <p className="font-bold text-gray-900">Sarah Chen - Product Overview</p>
                <p className="text-sm text-gray-600 mb-2">2:00 PM - 2:25 PM</p>
                <div className="inline-flex items-center px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full shadow-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></div>
                  LIVE NOW
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow">
              <p className="font-bold text-gray-900">Mike Torres - Engineering Plan</p>
              <p className="text-sm text-gray-600 mb-2">2:25 PM - 2:45 PM</p>
              <div className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                UP NEXT
              </div>
            </div>

            <div className="p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-gray-200/30">
              <p className="font-bold text-gray-900">Team Q&A Session</p>
              <p className="text-sm text-gray-600">2:45 PM - 3:00 PM</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6" gradient>
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Team Coordination</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-emerald-50/80 backdrop-blur-sm rounded-xl border border-emerald-200/50 shadow-sm">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900">Slack Integration</div>
                <div className="text-sm text-emerald-600 font-semibold">#product-launch • Connected</div>
                <div className="text-xs text-gray-600 mt-1">Auto-notifications active</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200/50 shadow-sm">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900">Email Alerts</div>
                <div className="text-sm text-blue-600 font-semibold">leadership@company.com</div>
                <div className="text-xs text-gray-600 mt-1">Critical updates only</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  </div>
);

const ModeratorView = ({ timeRemaining, currentMinute, onAdjustTime, setShowSlackMessage }: {
  timeRemaining: number;
  currentMinute: number;
  onAdjustTime: (seconds: number) => void;
  setShowSlackMessage: (show: boolean) => void;
}) => (
  <div className="space-y-8 animate-fade-in">
    {/* Moderator Command Center */}
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 opacity-95"></div>
      {/* FIXED: Changed inner double quotes to single quotes */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&apos;40&apos; height=&apos;40&apos; viewBox=&apos;0 0 40 40&apos; xmlns=&apos;http://www.w3.org/2000/svg&apos;%3E%3Cg fill=&apos;%23ffffff&apos; fill-opacity=&apos;0.03&apos;%3E%3Cpath d=&apos;M20 20c0-11.046-8.954-20-20-20v20h20z&apos;/%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

      <GlassCard className="relative p-10" gradient>
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-bold text-sm shadow-xl mb-6">
            <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
            MODERATOR CONTROL CENTER
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Session Control</h1>
          <p className="text-gray-600 text-lg">Sarah Chen - Product Overview</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Enhanced Timer Display */}
          <div className="text-center">
            <div className="relative mb-6">
              <div className={clsx('text-7xl font-mono font-black transition-all duration-700 tracking-wider', {
                'text-red-600 animate-pulse': timeRemaining <= 0,
                'text-red-500': timeRemaining > 0 && timeRemaining <= 120,
                'text-amber-500': timeRemaining > 120 && timeRemaining <= 300,
                'text-indigo-600': timeRemaining > 300,
              })}>
                {formatTime(timeRemaining)}
              </div>
              <div className="absolute -inset-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-2xl rounded-full opacity-60"></div>
            </div>
            <p className="text-gray-700 text-xl font-bold mb-8 relative">Time Remaining</p>

            {/* Status Indicators */}
            <div className="flex justify-center space-x-4 mb-8">
              <div className={clsx('px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all duration-300', {
                'bg-emerald-500 text-white': timeRemaining > 300,
                'bg-amber-500 text-white': timeRemaining <= 300 && timeRemaining > 120,
                'bg-red-500 text-white animate-pulse': timeRemaining <= 120,
              })}>
                {timeRemaining > 300 ? 'ON TRACK' : timeRemaining > 120 ? 'WRAP UP SOON' : 'TIME UP'}
              </div>
              <div className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold text-sm shadow-lg">
                Q&A READY
              </div>
            </div>

            {/* Premium Time Controls */}
            <div className="bg-gradient-to-r from-slate-100/80 to-gray-100/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-inner">
              <p className="text-gray-800 text-sm mb-4 font-bold tracking-wide">PRECISION ADJUSTMENTS</p>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: '-5m', seconds: -300, color: 'from-red-500 to-red-600' },
                  { label: '-1m', seconds: -60, color: 'from-red-400 to-red-500' },
                  { label: '+1m', seconds: 60, color: 'from-emerald-500 to-green-500' },
                  { label: '+5m', seconds: 300, color: 'from-emerald-600 to-green-600' },
                ].map(({ label, seconds, color }) => (
                  <button
                    key={label}
                    onClick={() => onAdjustTime(seconds)}
                    className={clsx(
                      'group px-4 py-3 bg-gradient-to-r text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105',
                      color
                    )}
                  >
                    <span className="transition-transform group-hover:scale-110">{label}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-3 font-medium">Real-time sync across all displays</p>
            </div>
          </div>

          {/* Next Speaker Preparation */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-lg">
            <h3 className="font-bold text-gray-900 mb-6 text-lg">Next Speaker Ready</h3>
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl mb-4">
                  <span className="text-white font-bold text-2xl">MT</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 text-lg">Mike Torres</h4>
              <p className="text-gray-600 font-medium">Engineering Implementation</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/80 backdrop-blur-sm rounded-xl border border-emerald-200/50">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-emerald-700 font-bold text-sm">READY TO PRESENT</span>
                </div>
                <p className="text-emerald-600 text-sm font-medium">✓ Slides loaded ✓ Audio tested ✓ Screen share ready</p>
              </div>

              <button className="w-full p-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Start Mike's Session</span>
                </div>
              </button>

              <div className="p-4 bg-slate-50/80 backdrop-blur-sm rounded-xl border border-slate-200/50">
                <p className="text-gray-800 text-sm font-bold mb-2">Handoff Script</p>
                <p className="text-gray-600 text-sm italic">"Thanks Sarah. Now let's dive into the technical implementation that will make this vision reality..."</p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>

    {/* Premium Moderator Actions */}
    <GlassCard className="p-8" gradient>
      <h3 className="font-bold text-gray-900 mb-6 text-xl">Moderator Actions</h3>
      <div className="grid md:grid-cols-4 gap-6">
        <button className="group p-6 bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-2xl border border-amber-200/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="font-bold text-amber-800 mb-1">Send 5-Min Warning</div>
          <div className="text-xs text-amber-600 font-medium">Alert speaker to wrap up</div>
        </button>

        <button className="group p-6 bg-gradient-to-br from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 rounded-2xl border border-purple-200/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="font-bold text-purple-800 mb-1">Notify Team</div>
          <div className="text-xs text-purple-600 font-medium">Update #product-launch</div>
        </button>

        <button
          onClick={() => {
            setShowSlackMessage(true);
            setTimeout(() => setShowSlackMessage(false), 3000);
          }}
          className="group p-6 bg-gradient-to-br from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 rounded-2xl border border-rose-200/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" />
            </svg>
          </div>
          <div className="font-bold text-rose-800 mb-1">Alert Speaker</div>
          <div className="text-xs text-rose-600 font-medium">Audience question ready</div>
        </button>

        <button className="group p-6 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-2xl border border-blue-200/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="font-bold text-blue-800 mb-1">Prep Next Speaker</div>
          <div className="text-xs text-blue-600 font-medium">Alert Mike to get ready</div>
        </button>
      </div>
    </GlassCard>

    {/* Advanced Session Analytics */}
    <div className="grid lg:grid-cols-3 gap-8">
      <GlassCard className="p-6" gradient>
        <h3 className="font-bold text-gray-900 mb-6 text-lg">Session Analytics</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-emerald-50/80 backdrop-blur-sm rounded-xl border border-emerald-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900">Attendance</span>
            </div>
            <span className="text-emerald-600 font-bold">98%</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900">Questions</span>
            </div>
            <span className="text-blue-600 font-bold">3 queued</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50/80 backdrop-blur-sm rounded-xl border border-purple-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900">Pacing</span>
            </div>
            <span className="text-purple-600 font-bold">Perfect</span>
          </div>
        </div>
      </GlassCard>

      <div className="lg:col-span-2">
        <GlassCard className="p-6" gradient>
          <h3 className="font-bold text-gray-900 mb-6 text-lg">Live Event Feed</h3>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            <div className="flex items-start space-x-4 p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900 text-sm">Sarah Chen</span>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-medium">SPEAKING</span>
                </div>
                <p className="text-gray-600 text-sm">Currently covering market analysis • Minute {currentMinute}</p>
              </div>
              <span className="text-xs text-gray-500">2:14 PM</span>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-emerald-50/80 backdrop-blur-sm rounded-xl border border-emerald-200/50">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900 text-sm">Alex Rivera</span>
                  <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full font-medium">QUESTION</span>
                </div>
                <p className="text-gray-600 text-sm">Hand raised • Waiting for Q&A segment</p>
              </div>
              <span className="text-xs text-gray-500">2:12 PM</span>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-purple-50/80 backdrop-blur-sm rounded-xl border border-purple-200/50">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900 text-sm">Mike Torres</span>
                  <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full font-medium">READY</span>
                </div>
                <p className="text-gray-600 text-sm">Joined session • Slides prepared</p>
              </div>
              <span className="text-xs text-gray-500">2:10 PM</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  </div>
);

const SpeakerView = ({ timeRemaining, currentMinute, getTimerColor }: {
  timeRemaining: number;
  currentMinute: number;
  getTimerColor: () => string;
}) => (
  <div className="space-y-8 animate-fade-in">
    {/* Speaker Hero Section */}
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-90"></div>
      {/* FIXED: Changed inner double quotes to single quotes */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&apos;80&apos; height=&apos;80&apos; viewBox=&apos;0 0 80 80&apos; xmlns=&apos;http://www.w3.org/2000/svg&apos;%3E%3Cg fill=&apos;%23ffffff&apos; fill-opacity=&apos;0.05&apos;%3E%3Cpath d=&apos;M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 100-30 15 15 0 000 30z&apos;/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      <GlassCard className="relative p-10" gradient>
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full text-white font-bold text-sm shadow-xl mb-6">
            <div className="w-2.5 h-2.5 bg-white rounded-full mr-3 animate-pulse"></div>
            YOU'RE PRESENTING LIVE
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Q1 Product Launch Kickoff</h1>
          <p className="text-gray-600 text-lg font-medium">Sarah Chen • Product Overview Session</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Premium Speaker Timer */}
          <div className="text-center">
            <div className="relative mb-8">
              <div className={clsx("text-8xl font-mono font-black transition-all duration-700 tracking-wider", getTimerColor())}>
                {formatTime(timeRemaining)}
              </div>
              <div className="absolute -inset-8 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full opacity-60"></div>
            </div>
            <p className="text-gray-700 text-xl font-bold mb-8 relative">Time Remaining</p>

            {/* Dynamic Status Indicators */}
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <div className={clsx("px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all duration-300", {
                  'bg-emerald-500 text-white': timeRemaining > 300,
                  'bg-amber-500 text-white': timeRemaining <= 300 && timeRemaining > 120,
                  'bg-red-500 text-white animate-pulse': timeRemaining <= 120,
                })}>
                  {timeRemaining > 300 ? 'ON TRACK' : timeRemaining > 120 ? 'WRAP UP SOON' : 'TIME UP'}
                </div>
              </div>

              {timeRemaining <= 300 && timeRemaining > 0 && (
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-l-4 border-amber-400 shadow-lg animate-fade-in">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-amber-800 font-bold">5 Minutes Remaining</span>
                  </div>
                  <p className="text-amber-700 text-sm font-medium">Start moving toward your conclusion</p>
                </div>
              )}

              {timeRemaining <= 0 && (
                <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border-l-4 border-red-400 shadow-lg animate-fade-in">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-red-800 font-bold">Session Time Complete</span>
                  </div>
                  <p className="text-red-700 text-sm font-medium">Please wrap up your current point</p>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Speaker Notes */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <h3 className="font-bold text-gray-900 mb-6 text-lg flex items-center">
              <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Your Speaking Notes
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {SPEAKER_NOTES.slice(Math.max(0, currentMinute - 1), currentMinute + 4).map((note, index) => {
                const actualMinute = Math.max(0, currentMinute - 1) + index;
                const isPast = actualMinute < currentMinute;
                const isCurrent = actualMinute === currentMinute;
                const isNext = actualMinute === currentMinute + 1;

                return (
                  <div key={actualMinute} className={clsx('p-5 rounded-xl border-l-4 transition-all duration-500 shadow-sm', {
                    'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-500 shadow-lg scale-105': isCurrent,
                    'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-400 shadow-md': isNext,
                    'bg-gray-50/80 border-gray-300 opacity-60 scale-95': isPast,
                    'bg-white/80 border-gray-200': !isCurrent && !isPast && !isNext,
                  })}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-900 text-sm tracking-wide">MINUTE {actualMinute}</span>
                      {isCurrent && (
                        <span className="text-xs bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full font-bold shadow-sm animate-pulse">
                          NOW SPEAKING
                        </span>
                      )}
                      {isNext && (
                        <span className="text-xs bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full font-bold shadow-sm">
                          UP NEXT
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed font-medium">{note.text}</p>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Quick Reference */}
            <div className="mt-6 p-5 bg-gradient-to-r from-slate-50/80 to-gray-50/80 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-inner">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center">
                <svg className="w-4 h-4 text-slate-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Session Structure
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <span className="font-medium">Market analysis: 0-7 min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="font-medium">Feature roadmap: 8-17 min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Timeline: 18-22 min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="font-medium">Q&A: 23-25 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  </div>
);

const AppHeader = ({ activeTab, setActiveTab }: {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}) => {
  const tabs = [
    {
      id: 'organizer',
      label: 'Event Control',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
        </svg>
      ),
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'moderator',
      label: 'Moderator Hub',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
      gradient: 'from-slate-600 to-gray-700'
    },
    {
      id: 'speaker',
      label: 'Speaker Portal',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-green-600'
    },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                <ClockIcon />
              </div>
              <div>
                <span className="text-2xl font-black text-gray-900 tracking-tight">StageCue</span>
                <div className="text-xs text-gray-500 font-semibold tracking-wide">PROFESSIONAL EVENT TIMING</div>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={clsx(
                  'group relative px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1',
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-xl scale-105`
                    : 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200/50 hover:border-gray-300/50'
                )}
              >
                <div className={clsx('transition-transform group-hover:scale-110', {
                  'text-white': activeTab === tab.id,
                  'text-gray-600': activeTab !== tab.id,
                })}>
                  {tab.icon}
                </div>
                <span className="text-sm tracking-wide">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-700 text-sm font-bold">System Healthy</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// --- MAIN COMPONENT ---
export function StageCue() {
  // --- STATE MANAGEMENT ---
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME_SECONDS);
  const [isRunning, setIsRunning] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('organizer');
  const [showSlackMessage, setShowSlackMessage] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const currentMinute = useMemo(() => {
    const elapsed = INITIAL_TIME_SECONDS - timeRemaining;
    return Math.floor(elapsed / 60);
  }, [timeRemaining]);

  const getTimerColor = useCallback(() => {
    if (timeRemaining <= 0) return 'text-red-600';
    if (timeRemaining <= 120) return 'text-red-500';
    if (timeRemaining <= 300) return 'text-amber-500';
    return 'text-indigo-600';
  }, [timeRemaining]);

  // --- HANDLERS ---
  const handleResetTimer = () => {
    setTimeRemaining(INITIAL_TIME_SECONDS);
  };

  const handleAdjustTime = (seconds: number) => {
    setTimeRemaining(prev => Math.max(0, prev + seconds));
  };

  const handleToggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  const renderActiveTabView = () => {
    switch (activeTab) {
      case 'organizer':
        return (
          <OrganizerView
            timeRemaining={timeRemaining}
            isRunning={isRunning}
            onToggleTimer={handleToggleTimer}
            onResetTimer={handleResetTimer}
            onAdjustTime={handleAdjustTime}
          />
        );
      case 'moderator':
        return (
          <ModeratorView
            timeRemaining={timeRemaining}
            currentMinute={currentMinute}
            onAdjustTime={handleAdjustTime}
            setShowSlackMessage={setShowSlackMessage}
          />
        );
      case 'speaker':
        return (
          <SpeakerView
            timeRemaining={timeRemaining}
            currentMinute={currentMinute}
            getTimerColor={getTimerColor}
          />
        );
      default:
        return null;
    }
  };

  // --- SIDE EFFECTS ---
  // Effect for auto demo cycling
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDemoStep(prev => {
        const nextStep = (prev + 1) % DEMO_SEQUENCE.length;
        setActiveTab(DEMO_SEQUENCE[nextStep].tab);
        return nextStep;
      });
    }, DEMO_SEQUENCE[demoStep].duration);

    return () => clearTimeout(timeout);
  }, [demoStep]);

  // Effect for timer countdown (2x speed for demo)
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => Math.max(-300, prev - 2));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Premium Slack Notification */}
      {showSlackMessage && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-6 max-w-sm">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="font-bold text-gray-900">Slack Message Sent</span>
                  <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full font-bold">#product-launch</span>
                </div>
                <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4 border border-gray-200/50 shadow-inner">
                  <p className="text-sm text-gray-800 font-mono leading-relaxed">
                    @sarah-chen I see Alex Rivera has had their hand raised for a bit for a question
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600 font-medium">Delivered successfully</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AppHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {renderActiveTabView()}
      </main>
    </div>
  );
}