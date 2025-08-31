import { useState, useEffect, useMemo, useCallback } from 'react';
import clsx from 'clsx';

// --- CONSTANTS & TYPES ---
const INITIAL_TIME_SECONDS = 20 * 60; // 20 minutes
type Tab = 'dashboard' | 'live' | 'speaker' | 'setup';

const DEMO_SEQUENCE = [
  { tab: 'live' as Tab, duration: 8000 },
  { tab: 'speaker' as Tab, duration: 6000 },
  { tab: 'dashboard' as Tab, duration: 5000 },
  { tab: 'setup' as Tab, duration: 4000 },
];

const SPEAKER_NOTES = [
    { minute: 0, text: "Welcome everyone to today's session on AI in Healthcare. Thank you for joining us." },
    { minute: 1, text: "Introduce yourself and your background in healthcare AI research." },
    { minute: 2, text: "Present agenda: Current state, breakthrough technologies, implementation challenges, and future outlook." },
    { minute: 3, text: "Show opening slide: 'AI is transforming healthcare at an unprecedented pace'" },
    { minute: 4, text: "Discuss current AI applications: diagnostic imaging, drug discovery, personalized treatment plans." },
    { minute: 5, text: "Present case study: AI-powered radiology reducing diagnosis time by 40%" },
    { minute: 6, text: "Transition to breakthrough technologies section" },
    { minute: 7, text: "Introduce machine learning models in clinical decision support" },
    { minute: 8, text: "Show live demonstration of AI diagnostic tool (have backup video ready)" },
    { minute: 9, text: "Explain the technology behind the demonstration" },
    { minute: 10, text: "Next paragraph: Implementation challenges in healthcare systems" },
    { minute: 11, text: "Discuss data privacy and HIPAA compliance requirements" },
    { minute: 12, text: "Address physician adoption and training challenges" },
    { minute: 13, text: "Present solutions: gradual integration and physician-AI collaboration models" },
    { minute: 14, text: "Show success metrics from early adopter hospitals" },
    { minute: 15, text: "Transition to future outlook section" },
    { minute: 16, text: "Discuss emerging trends: federated learning, edge computing in medical devices" },
    { minute: 17, text: "Present timeline for next 5 years of healthcare AI development" },
    { minute: 18, text: "Prepare for conclusion and Q&A transition" },
    { minute: 19, text: "Summarize key takeaways and thank the audience" },
    { minute: 20, text: "Open floor for questions - Q&A session begins" },
];


// --- HELPER FUNCTIONS ---
const formatTime = (seconds: number): string => {
  const mins = Math.floor(Math.abs(seconds) / 60).toString().padStart(2, '0');
  const secs = (Math.abs(seconds) % 60).toString().padStart(2, '0');
  return `${seconds < 0 ? '-' : ''}${mins}:${secs}`;
};

// --- UI & ICON COMPONENTS ---
const ClockIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LiveStatusIndicator = ({ text, color = 'green' }: { text: string; color?: string }) => (
  <div className={clsx('inline-flex items-center space-x-2 px-3 py-1 rounded-full', {
    'bg-green-100 text-green-700': color === 'green',
    'bg-blue-100 text-blue-700': color === 'blue',
  })}>
    <div className={clsx('w-2 h-2 rounded-full animate-pulse', {
      'bg-green-500': color === 'green',
      'bg-blue-500': color === 'blue',
    })} />
    <span className="text-sm font-medium">{text}</span>
  </div>
);

// --- VIEW COMPONENTS ---
const DashboardView = ({ timeRemaining }: { timeRemaining: number }) => (
  <div className="space-y-8 animate-fade-in">
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tech Summit 2025</h2>
            <p className="text-gray-600">Main Auditorium • 247 attendees</p>
          </div>
          <LiveStatusIndicator text="Live" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-1">{formatTime(timeRemaining)}</div>
            <div className="text-sm text-gray-600">Current Session</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-1">3/8</div>
            <div className="text-sm text-gray-600">Sessions Complete</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-1">5</div>
            <div className="text-sm text-gray-600">Team Members</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Today's Schedule</h3>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm font-semibold text-gray-900">Dr. Sarah Chen</p>
            <p className="text-xs text-gray-500">2:00 PM - 2:30 PM</p>
            <div className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-md inline-block mt-1">In Progress</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-900">Panel Discussion</p>
            <p className="text-xs text-gray-500">2:30 PM - 3:15 PM</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LiveEventView = ({ timeRemaining, isRunning, currentMinute, getTimerColor, onToggleTimer, onResetTimer, onAdjustTime }) => (
  <div className="space-y-8 animate-fade-in">
    {/* Main Timer */}
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI in Healthcare: Future Perspectives</h2>
        <p className="text-gray-600">Dr. Sarah Chen • Main Auditorium</p>
      </div>
      <div className={clsx('text-8xl font-mono font-bold mb-6 transition-colors duration-500', getTimerColor())}>
        {formatTime(timeRemaining)}
      </div>
      <p className="text-gray-600 text-xl mb-8">Session Time Remaining</p>
      
      {/* Timer Controls */}
      <div className="flex justify-center space-x-4 mb-8">
        <button onClick={onToggleTimer} className={clsx('px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95', isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-500 hover:bg-green-600')}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={onResetTimer} className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95">
          Reset
        </button>
      </div>

      {/* Time Adjustment Controls */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 max-w-md mx-auto">
        <p className="text-gray-700 text-sm mb-4 font-medium">Quick Time Adjustments</p>
        <div className="flex justify-center space-x-3">
          {[ -300, -60, 60, 300 ].map(t => (
            <button key={t} onClick={() => onAdjustTime(t)} className={clsx('w-16 py-2 rounded-lg font-medium text-white transition-all duration-300 transform hover:scale-105 active:scale-95', t > 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600')}>
              {t / 60}m
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Speaker Notes & Live Stats */}
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Speaker Notes Timeline</h3>
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {SPEAKER_NOTES.map((note, index) => {
            const isPast = currentMinute > note.minute;
            const isCurrent = currentMinute === note.minute;
            return (
              <div key={index} className={clsx('p-4 rounded-lg border-l-4 transition-all duration-300', {
                'bg-green-50 border-green-500 shadow-md': isCurrent,
                'bg-gray-50 border-gray-300 opacity-60': isPast,
                'bg-white border-gray-200': !isCurrent && !isPast,
              })}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900 text-sm">Minute {note.minute}</span>
                  {isCurrent && <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-bold">NOW</span>}
                </div>
                <p className="text-gray-700 text-sm">{note.text}</p>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Live Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700 font-medium">Current Minute</span>
              <span className="text-green-600 font-bold text-lg">{currentMinute}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700 font-medium">Progress</span>
              <span className="text-blue-600 font-bold">{Math.round(((INITIAL_TIME_SECONDS - timeRemaining) / INITIAL_TIME_SECONDS) * 100)}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-700 font-medium">Attendees</span>
              <span className="text-purple-600 font-bold">247</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Session Progress</h3>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500 ease-out" style={{ width: `${((INITIAL_TIME_SECONDS - timeRemaining) / INITIAL_TIME_SECONDS) * 100}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>Start</span>
              <span>End</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SpeakerPortalView = ({ timeRemaining, getTimerColor }) => (
    <div className="space-y-8 animate-fade-in">
        <div className="text-center">
            <LiveStatusIndicator text="Your session is live" />
            <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">AI in Healthcare: Future Perspectives</h1>
            <p className="text-gray-600">Dr. Sarah Chen • Main Auditorium</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
                <div className={clsx("text-6xl font-mono font-bold mb-4 transition-colors duration-500", getTimerColor())}>
                    {formatTime(timeRemaining)}
                </div>
                <p className="text-gray-600 text-lg mb-6">Time Remaining</p>
                <div className="flex justify-center space-x-3">
                    <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">On Track</div>
                    <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">Q&A Ready</div>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Your Notes</h3>
                <div className="space-y-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-900 mb-1">Key Points</p>
                        <ul className="text-gray-600 list-disc list-inside">
                            <li>AI diagnostic accuracy</li>
                            <li>Patient data privacy</li>
                            <li>Implementation challenges</li>
                        </ul>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                        <p className="font-medium text-amber-800 mb-1">Timing Alerts</p>
                        <p className="text-amber-700">5-min warning at 05:00<br/>Hard stop at 00:00</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const EventSetupView = () => (
    <div className="animate-fade-in bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Configuration</h2>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                    <input type="text" value="Tech Summit 2025" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readOnly />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Duration</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>20 minutes</option>
                        <option>30 minutes</option>
                        <option>45 minutes</option>
                    </select>
                </div>
            </div>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Integrations</label>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center mb-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-green-700 font-medium">Slack Connected</span>
                        </div>
                        <p className="text-green-600 text-sm">Auto-notifications to #event-team enabled</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


const AppHeader = ({ activeTab, setActiveTab, autoScroll, setAutoScroll }) => {
    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'live', label: 'Live Event', icon: '⏱️' },
        { id: 'speaker', label: 'Speaker Portal', icon: '🎤' },
        { id: 'setup', label: 'Event Setup', icon: '⚙️' },
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
                        <LiveStatusIndicator text="Demo Mode" color="blue" />
                    </div>

                    <nav className="hidden md:flex items-center space-x-1">
                        {tabs.map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id as Tab)} className={clsx('px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2', activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100')}>
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    <button onClick={() => setAutoScroll(prev => !prev)} className={clsx('px-3 py-1 rounded-full text-sm font-medium transition-colors', autoScroll ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700')}>
                        Auto-scroll: {autoScroll ? 'ON' : 'OFF'}
                    </button>
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
    const [activeTab, setActiveTab] = useState<Tab>('live');
    const [demoStep, setDemoStep] = useState(0);
    const [autoScroll, setAutoScroll] = useState(true);

    // --- DERIVED STATE & MEMOS ---
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
    
    // --- SIDE EFFECTS ---

    // Effect for Demo Mode: Auto-navigate through tabs
    useEffect(() => {
        const handleNextStep = () => {
            setDemoStep(prev => {
                const nextStep = (prev + 1) % DEMO_SEQUENCE.length;
                setActiveTab(DEMO_SEQUENCE[nextStep].tab);
                return nextStep;
            });
        };
        const timerId = setTimeout(handleNextStep, DEMO_SEQUENCE[demoStep].duration);
        return () => clearTimeout(timerId);
    }, [demoStep]);

    // Effect for Auto-scroll functionality
    useEffect(() => {
        if (!autoScroll) return;
        const scrollInterval = setInterval(() => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (window.scrollY < maxScroll - 10) { // Check if not at the bottom
                window.scrollBy({ top: 1, behavior: 'smooth' });
            } else {
                // Smoothly scroll to top when bottom is reached
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 2000);
            }
        }, 50); // Slower interval for a smoother, continuous scroll
        return () => clearInterval(scrollInterval);
    }, [autoScroll, activeTab]); // Reruns when tab changes to restart scroll

    // Effect for the main countdown timer
    useEffect(() => {
        if (!isRunning || timeRemaining <= 0) return;
        const interval = setInterval(() => {
            setTimeRemaining(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning, timeRemaining]); // Re-evaluates when isRunning changes or time hits 0
    
    // --- HANDLERS ---
    const handleAdjustTime = (seconds: number) => {
        setTimeRemaining(prev => Math.max(0, prev + seconds));
    };

    const handleResetTimer = () => {
        setTimeRemaining(INITIAL_TIME_SECONDS);
        setIsRunning(false);
    };
    
    // --- RENDER LOGIC ---
    const renderActiveTabView = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardView timeRemaining={timeRemaining} />;
            case 'live': return <LiveEventView timeRemaining={timeRemaining} isRunning={isRunning} currentMinute={currentMinute} getTimerColor={getTimerColor} onToggleTimer={() => setIsRunning(!isRunning)} onResetTimer={handleResetTimer} onAdjustTime={handleAdjustTime} />;
            case 'speaker': return <SpeakerPortalView timeRemaining={timeRemaining} getTimerColor={getTimerColor} />;
            case 'setup': return <EventSetupView />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <AppHeader activeTab={activeTab} setActiveTab={setActiveTab} autoScroll={autoScroll} setAutoScroll={setAutoScroll} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderActiveTabView()}
            </main>
        </div>
    );
}