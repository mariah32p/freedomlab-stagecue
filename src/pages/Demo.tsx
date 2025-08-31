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
  <div className={clsx('inline-flex items-center space-x-2 px-3 py-1 rounded-full', {
    'bg-green-100 text-green-700': color === 'green',
    'bg-blue-100 text-blue-700': color === 'blue',
    'bg-orange-100 text-orange-700': color === 'orange',
  })}>
    <div className={clsx('w-2 h-2 rounded-full animate-pulse', {
      'bg-green-500': color === 'green',
      'bg-blue-500': color === 'blue',
      'bg-orange-500': color === 'orange',
    })} />
    <span className="text-sm font-medium">{text}</span>
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
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Event Control */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Q1 Product Launch Kickoff</h2>
            <p className="text-gray-600">Virtual Event • 23 attendees</p>
          </div>
          <LiveStatusIndicator text="Live" />
        </div>
        
        {/* Timer Display */}
        <div className="text-center mb-8">
          <div className={clsx('text-6xl font-mono font-bold mb-4 transition-colors duration-500', {
            'text-red-600': timeRemaining <= 0,
            'text-red-500': timeRemaining > 0 && timeRemaining <= 120,
            'text-amber-500': timeRemaining > 120 && timeRemaining <= 300,
            'text-blue-600': timeRemaining > 300,
          })}>
            {formatTime(timeRemaining)}
          </div>
          <p className="text-gray-600 text-lg mb-6">Session Time Remaining</p>
          
          {/* Timer Controls */}
          <div className="flex justify-center space-x-4 mb-6">
            <button 
              onClick={onToggleTimer}
              className={clsx('px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300', 
                isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-500 hover:bg-green-600'
              )}
            >
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button 
              onClick={onResetTimer}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-300"
            >
              Reset
            </button>
          </div>

          {/* Time Adjustment Controls */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-gray-700 text-sm mb-3 font-medium">Adjust Session Time</p>
            <div className="flex justify-center space-x-2">
              <button 
                onClick={() => onAdjustTime(-300)}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-sm transition-all duration-300"
              >
                -5m
              </button>
              <button 
                onClick={() => onAdjustTime(-60)}
                className="px-3 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg font-medium text-sm transition-all duration-300"
              >
                -1m
              </button>
              <button 
                onClick={() => onAdjustTime(60)}
                className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium text-sm transition-all duration-300"
              >
                +1m
              </button>
              <button 
                onClick={() => onAdjustTime(300)}
                className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-all duration-300"
              >
                +5m
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Schedule */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Today's Agenda</h3>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm font-semibold text-gray-900">Sarah Chen - Product Overview</p>
            <p className="text-xs text-gray-500">2:00 PM - 2:25 PM</p>
            <div className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-md inline-block mt-1">In Progress</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-900">Mike Torres - Engineering Plan</p>
            <p className="text-xs text-gray-500">2:25 PM - 2:45 PM</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-900">Team Q&A</p>
            <p className="text-xs text-gray-500">2:45 PM - 3:00 PM</p>
          </div>
        </div>
      </div>
    </div>

    {/* Team Coordination */}
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Team Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Slack: #product-launch</div>
              <div className="text-xs text-gray-500">Auto-notifications enabled</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Email Alerts</div>
              <div className="text-xs text-gray-500">leadership@company.com</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Schedule Intelligence</h3>
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-amber-800">Timing Alert</span>
            </div>
            <p className="text-amber-700 text-sm">Current pace will finish 3 minutes late. Consider shortening Q&A or skipping optional slides.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-blue-800">Next Speaker Ready</span>
            </div>
            <p className="text-blue-700 text-sm">Mike Torres is prepared and waiting for handoff.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ModeratorView = ({ timeRemaining, currentMinute, onAdjustTime, setShowSlackMessage, setAutoDemo }: {
  timeRemaining: number;
  currentMinute: number;
  onAdjustTime: (seconds: number) => void;
  setShowSlackMessage: (show: boolean) => void;
  setAutoDemo: (auto: boolean) => void;
}) => (
  <div className="space-y-8 animate-fade-in">
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Current Session Control */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Current Session</h2>
          <p className="text-gray-600">Sarah Chen - Product Overview</p>
        </div>
        
        <div className={clsx('text-5xl font-mono font-bold text-center mb-6 transition-colors duration-500', {
          'text-red-600': timeRemaining <= 0,
          'text-red-500': timeRemaining > 0 && timeRemaining <= 120,
          'text-amber-500': timeRemaining > 120 && timeRemaining <= 300,
          'text-blue-600': timeRemaining > 300,
        })}>
          {formatTime(timeRemaining)}
        </div>

        {/* Moderator Time Controls */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
          <p className="text-gray-700 text-sm mb-3 font-medium">Session Time Adjustments</p>
          <div className="grid grid-cols-4 gap-2">
            <button 
              onClick={() => onAdjustTime(-300)}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-sm transition-all duration-300"
            >
              -5m
            </button>
            <button 
              onClick={() => onAdjustTime(-60)}
              className="px-3 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg font-medium text-sm transition-all duration-300"
            >
              -1m
            </button>
            <button 
              onClick={() => onAdjustTime(60)}
              className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium text-sm transition-all duration-300"
            >
              +1m
            </button>
            <button 
              onClick={() => onAdjustTime(300)}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-all duration-300"
            >
              +5m
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Adjust if speaker needs more/less time</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-gray-700 font-medium">Speaker Status</span>
            <span className="text-green-600 font-bold">On Track</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-gray-700 font-medium">Current Topic</span>
            <span className="text-blue-600 font-bold">Minute {currentMinute}</span>
          </div>
        </div>
      </div>
      
      {/* Next Speaker Prep */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Next Speaker</h3>
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-purple-600 font-bold text-lg">MT</span>
          </div>
          <h4 className="font-semibold text-gray-900">Mike Torres</h4>
          <p className="text-gray-600 text-sm">Engineering Plan</p>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center mb-1">
              <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-green-700 font-medium text-sm">Ready to Present</span>
            </div>
            <p className="text-green-600 text-xs">Slides loaded, audio tested</p>
          </div>
          
          <button className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            Start Mike's Session
          </button>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-700 text-sm font-medium mb-1">Handoff Notes</p>
            <p className="text-gray-600 text-xs">"Thanks Sarah. Now let's dive into the technical implementation..."</p>
          </div>
        </div>
      </div>
    </div>

    {/* Moderator Actions */}
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h3 className="font-bold text-gray-900 mb-4">Moderator Actions</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <button className="p-4 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors">
          <div className="font-medium text-amber-800">Send 5-Min Warning</div>
          <div className="text-xs text-amber-600 mt-1">Alert speaker to wrap up</div>
        </button>
        <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
          <div className="font-medium text-purple-800">Notify Team</div>
          <div className="text-xs text-purple-600 mt-1">Update #product-launch channel</div>
        </button>
        <button 
          onClick={() => {
          className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors"
        >
          <div className="font-medium text-orange-800">Alert Speaker</div>
          <div className="text-xs text-orange-600 mt-1">Attendee has question</div>
        </button>
        <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
          <div className="font-medium text-blue-800">Prep Next Speaker</div>
          <div className="text-xs text-blue-600 mt-1">Alert Mike to get ready</div>
        </button>
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
    <div className="text-center">
      <LiveStatusIndicator text="You're presenting live" />
      <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Q1 Product Launch Kickoff</h1>
      <p className="text-gray-600">Sarah Chen • Product Overview Session</p>
    </div>
    
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Speaker Timer */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
        <div className={clsx("text-6xl font-mono font-bold mb-4 transition-colors duration-500", getTimerColor())}>
          {formatTime(timeRemaining)}
        </div>
        <p className="text-gray-600 text-lg mb-6">Time Remaining</p>
        
        <div className="space-y-3">
          <div className="flex justify-center space-x-3">
            <div className={clsx("px-4 py-2 rounded-lg text-sm font-medium", {
              'bg-green-100 text-green-700': timeRemaining > 300,
              'bg-amber-100 text-amber-700': timeRemaining <= 300 && timeRemaining > 120,
              'bg-red-100 text-red-700': timeRemaining <= 120,
            })}>
              {timeRemaining > 300 ? 'On Track' : timeRemaining > 120 ? 'Wrap Up Soon' : 'Time Up'}
            </div>
          </div>
          
          {timeRemaining <= 300 && timeRemaining > 0 && (
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-amber-800 text-sm font-medium">⚠️ 5 minutes remaining</p>
              <p className="text-amber-700 text-xs">Start moving toward conclusion</p>
            </div>
          )}
          
          {timeRemaining <= 0 && (
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-800 text-sm font-medium">🔴 Time is up</p>
              <p className="text-red-700 text-xs">Please wrap up your current point</p>
            </div>
          )}
        </div>
      </div>

      {/* Speaker Notes */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Your Speaking Notes</h3>
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {SPEAKER_NOTES.slice(Math.max(0, currentMinute - 2), currentMinute + 4).map((note, index) => {
            const actualMinute = Math.max(0, currentMinute - 2) + index;
            const isPast = actualMinute < currentMinute;
            const isCurrent = actualMinute === currentMinute;
            const isNext = actualMinute === currentMinute + 1;
            
            return (
              <div key={actualMinute} className={clsx('p-4 rounded-lg border-l-4 transition-all duration-300', {
                'bg-green-50 border-green-500 shadow-md': isCurrent,
                'bg-blue-50 border-blue-400': isNext,
                'bg-gray-50 border-gray-300 opacity-60': isPast,
                'bg-white border-gray-200': !isCurrent && !isPast && !isNext,
              })}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900 text-sm">Minute {actualMinute}</span>
                  {isCurrent && <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-bold">NOW</span>}
                  {isNext && <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-bold">NEXT</span>}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{note.text}</p>
              </div>
            );
          })}
        </div>
        
        {/* Quick Reference */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="font-medium text-slate-900 mb-2">Quick Reference</h4>
          <div className="text-xs text-slate-600 space-y-1">
            <p>• Market analysis: 8 minutes (0-7)</p>
            <p>• Feature roadmap: 10 minutes (8-17)</p>
            <p>• Timeline & resources: 5 minutes (18-22)</p>
            <p>• Q&A: 2 minutes (23-25)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AppHeader = ({ activeTab, setActiveTab }: {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}) => {
  const tabs = [
    { id: 'organizer', label: 'Event Organizer', icon: '📊' },
    { id: 'moderator', label: 'Session Moderator', icon: '🎯' },
    { id: 'speaker', label: 'Speaker Portal', icon: '🎤' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ClockIcon />
              </div>
              <span className="text-xl font-bold text-gray-900">StageCue</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {tabs.map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id as Tab)} 
                className={clsx('px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2', 
                  activeTab === tab.id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="w-8"></div>
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
  const [autoDemo, setAutoDemo] = useState(true);
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
    return 'text-blue-600';
  }, [timeRemaining]);
  
  // --- HANDLERS ---
  const handleResetTimer = () => {
    setTimeRemaining(INITIAL_TIME_SECONDS);
    setAutoDemo(false);
  };

  const handleAdjustTime = (seconds: number) => {
    setTimeRemaining(prev => Math.max(0, prev + seconds));
    setAutoDemo(false);
  };

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    setAutoDemo(false);
  };

  const handleToggleTimer = () => {
    setIsRunning(prev => !prev);
    setAutoDemo(false);
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
            setAutoDemo={setAutoDemo}
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
    if (!autoDemo) return;
    
    const timeout = setTimeout(() => {
      setDemoStep(prev => {
        const nextStep = (prev + 1) % DEMO_SEQUENCE.length;
        setActiveTab(DEMO_SEQUENCE[nextStep].tab);
        return nextStep;
      });
    }, DEMO_SEQUENCE[demoStep].duration);

    return () => clearTimeout(timeout);
  }, [autoDemo, demoStep]);

  // Effect for timer countdown
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => Math.max(-300, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-gray-50">
      {showSlackMessage && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900 text-sm">Slack Message Sent</span>
                  <span className="text-xs text-gray-500">#product-launch</span>
                </div>
                <div className="bg-gray-50 rounded p-2 text-xs text-gray-700 font-mono">
                  @sarah-chen I see Alex Rivera has had their hand raised for a bit for a question
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AppHeader 
        activeTab={activeTab} 
        setActiveTab={handleTabClick}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTabView()}
      </main>
    </div>
  );
}