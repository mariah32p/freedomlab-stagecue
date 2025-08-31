import { useState, useEffect } from 'react';

interface SpeakerNote {
  timeMarker: number; // seconds from start
  content: string;
  type: 'essential' | 'optional' | 'transition' | 'warning';
  completed?: boolean;
}

interface DemoStage {
  id: string;
  title: string;
  speaker: string;
  sessionTitle: string;
  timeRemaining: number;
  totalDuration: number;
  status: 'current' | 'break' | 'upcoming' | 'completed';
  notes: SpeakerNote[];
  nextSession: string;
  attendees: number;
  room: string;
  description: string;
}

const demoStages: DemoStage[] = [
  {
    id: 'kickoff',
    title: 'Project Kickoff',
    speaker: 'Sarah Martinez',
    sessionTitle: 'Q1 Product Launch Planning',
    timeRemaining: 18 * 60 + 42, // 18:42
    totalDuration: 20,
    status: 'current',
    description: 'Opening presentation and project overview',
    notes: [
      { timeMarker: 0, content: 'Welcome team, introduce Q1 launch timeline', type: 'essential' },
      { timeMarker: 300, content: 'At 5 minutes: Present market research findings', type: 'essential' },
      { timeMarker: 600, content: 'At 10 minutes: Introduce new product features demo', type: 'essential' },
      { timeMarker: 900, content: 'At 15 minutes: Discuss beta program signup process', type: 'optional' },
      { timeMarker: 1080, content: 'At 18 minutes: Wrap up, prepare for Q&A transition', type: 'transition' },
      { timeMarker: 1140, content: '1-minute warning: Start moving toward conclusion', type: 'warning' }
    ],
    nextSession: 'Technical Deep Dive',
    attendees: 12,
    room: 'Conference Room A'
  },
  {
    id: 'technical',
    title: 'Technical Deep Dive',
    speaker: 'Alex Chen',
    sessionTitle: 'Architecture & Implementation Strategy',
    timeRemaining: 25 * 60, // 25:00
    totalDuration: 25,
    status: 'upcoming',
    description: 'Technical architecture and development timeline',
    notes: [
      { timeMarker: 0, content: 'System architecture overview - show main diagram', type: 'essential' },
      { timeMarker: 420, content: 'At 7 minutes: Database design and API structure', type: 'essential' },
      { timeMarker: 900, content: 'At 15 minutes: Development timeline and milestones', type: 'essential' },
      { timeMarker: 1200, content: 'At 20 minutes: Risk assessment and mitigation', type: 'optional' },
      { timeMarker: 1380, content: 'At 23 minutes: Prepare for questions about timeline', type: 'transition' },
      { timeMarker: 1440, content: '2-minute warning: Summarize key technical decisions', type: 'warning' }
    ],
    nextSession: 'Marketing Strategy',
    attendees: 12,
    room: 'Conference Room A'
  },
  {
    id: 'marketing',
    title: 'Marketing Strategy',
    speaker: 'Jessica Park',
    sessionTitle: 'Go-to-Market & Customer Acquisition',
    timeRemaining: 20 * 60, // 20:00
    totalDuration: 20,
    status: 'upcoming',
    description: 'Marketing strategy and launch campaign',
    notes: [
      { timeMarker: 0, content: 'Target audience analysis and personas', type: 'essential' },
      { timeMarker: 300, content: 'At 5 minutes: Launch campaign timeline and channels', type: 'essential' },
      { timeMarker: 720, content: 'At 12 minutes: Budget allocation and expected ROI', type: 'essential' },
      { timeMarker: 960, content: 'At 16 minutes: Partnership opportunities (skip if running late)', type: 'optional' },
      { timeMarker: 1080, content: 'At 18 minutes: Hand off to team discussion', type: 'transition' },
      { timeMarker: 1140, content: '1-minute warning: Summarize key marketing metrics', type: 'warning' }
    ],
    nextSession: 'Team Discussion',
    attendees: 12,
    room: 'Conference Room A'
  },
  {
    id: 'discussion',
    title: 'Team Discussion',
    speaker: 'Team Collaboration',
    sessionTitle: 'Open Discussion & Next Steps',
    timeRemaining: 25 * 60, // 25:00
    totalDuration: 25,
    status: 'upcoming',
    description: 'Team discussion and action items',
    notes: [
      { timeMarker: 0, content: 'Open floor for questions and concerns', type: 'essential' },
      { timeMarker: 600, content: 'At 10 minutes: Focus on timeline and resource questions', type: 'essential' },
      { timeMarker: 1200, content: 'At 20 minutes: Assign action items and owners', type: 'essential' },
      { timeMarker: 1380, content: 'At 23 minutes: Schedule follow-up meetings', type: 'transition' },
      { timeMarker: 1440, content: '2-minute warning: Final questions and wrap-up', type: 'warning' }
    ],
    nextSession: 'Meeting End',
    attendees: 12,
    room: 'Conference Room A'
  }
];

export function StageCue() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(demoStages[0].timeRemaining);
  const [isRunning, setIsRunning] = useState(true);
  const [showSlackNotification, setShowSlackNotification] = useState(false);
  const [viewMode, setViewMode] = useState<'organizer' | 'moderator' | 'speaker'>('organizer');

  const currentStage = demoStages[currentStageIndex];
  const elapsedTime = currentStage.totalDuration * 60 - timeRemaining;

  // Timer countdown
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = Math.max(0, prev - 1);
        
        // Auto-advance to next stage when timer hits 0
        if (newTime === 0 && currentStageIndex < demoStages.length - 1) {
          setTimeout(() => {
            const nextIndex = currentStageIndex + 1;
            setCurrentStageIndex(nextIndex);
            setTimeRemaining(demoStages[nextIndex].timeRemaining);
          }, 2000); // 2 second pause between stages
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, currentStageIndex]);

  // Slack notifications at 5 minutes
  useEffect(() => {
    if (timeRemaining === 5 * 60 && !showSlackNotification) {
      setShowSlackNotification(true);
      setTimeout(() => setShowSlackNotification(false), 4000);
    }
  }, [timeRemaining, showSlackNotification]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining <= 120) return 'text-red-500';
    if (timeRemaining <= 300) return 'text-amber-500';
    return 'text-slate-700';
  };

  const getCurrentNote = () => {
    return currentStage.notes.find(note => 
      elapsedTime >= note.timeMarker && 
      elapsedTime < (note.timeMarker + 300) // Show for 5 minutes
    );
  };

  const getCompletedNotes = () => {
    return currentStage.notes.filter(note => elapsedTime > note.timeMarker + 300);
  };

  const getUpcomingNotes = () => {
    return currentStage.notes.filter(note => elapsedTime < note.timeMarker);
  };

  const handleStageChange = (index: number) => {
    setCurrentStageIndex(index);
    setTimeRemaining(demoStages[index].timeRemaining);
    setIsRunning(true);
  };

  const handleSlackNotification = () => {
    setShowSlackNotification(true);
    setTimeout(() => setShowSlackNotification(false), 4000);
  };

  const addTime = (minutes: number) => {
    setTimeRemaining(prev => prev + (minutes * 60));
  };

  const getNoteTypeColor = (type: string) => {
    switch (type) {
      case 'essential': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'optional': return 'bg-slate-50 border-slate-200 text-slate-600';
      case 'transition': return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'warning': return 'bg-amber-50 border-amber-200 text-amber-800';
      default: return 'bg-slate-50 border-slate-200 text-slate-600';
    }
  };

  const renderOrganizerView = () => (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Timer */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="text-center mb-8">
            <div className={`text-8xl font-mono font-bold mb-4 transition-colors ${getTimeColor()}`}>
              {formatTime(timeRemaining)}
            </div>
            <div className="text-slate-600 text-lg">Time Remaining</div>
            
            <div className="mt-6 bg-slate-100 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                style={{ width: `${Math.max(0, (timeRemaining / (currentStage.totalDuration * 60)) * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>0:00</span>
              <span>{currentStage.totalDuration}:00</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-900 mb-1">{currentStage.speaker}</h3>
              <p className="text-slate-600 mb-2">{currentStage.sessionTitle}</p>
              <p className="text-sm text-slate-500">{currentStage.description}</p>
              <div className="mt-3 inline-flex items-center px-3 py-1 bg-white rounded-full text-sm text-slate-500 border border-slate-200">
                Next: {currentStage.nextSession}
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isRunning ? 'Pause' : 'Resume'}
            </button>
            <button
              onClick={() => addTime(-5)}
              className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              -5 min
            </button>
            <button
              onClick={() => addTime(5)}
              className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              +5 min
            </button>
            <button
              onClick={() => {
                setAutoDemoEnabled(false);
                setTimeRemaining(30 * 60); // Reset to 30:00
                setIsRunning(true);
              }}
              className="px-6 py-3 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Team Coordination */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Team Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-900">Moderator Ready</div>
                <div className="text-xs text-slate-500">Mike (Room A)</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-900">Next Speaker</div>
                <div className="text-xs text-slate-500">Alex (Preparing)</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-900">AV Team</div>
                <div className="text-xs text-slate-500">Standing by</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={handleSlackNotification}
              className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">Send Slack Alert</div>
                  <div className="text-sm text-slate-500">Notify #launch-team</div>
                </div>
                <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.042 15.165a2.528 2.528 0 0 0 2.5 2.5c1.61 0 2.5-.89 2.5-2.5v-1.25h-2.5a2.528 2.528 0 0 0-2.5 2.5zm2.5-6.25a2.528 2.528 0 0 0-2.5-2.5 2.528 2.528 0 0 0-2.5 2.5c0 1.61.89 2.5 2.5 2.5h2.5v-2.5z"/>
                  <path d="M8.915 8.915c0-1.61.89-2.5 2.5-2.5s2.5.89 2.5 2.5v6.25c0 1.61-.89 2.5-2.5 2.5s-2.5-.89-2.5-2.5v-6.25z"/>
                  <path d="M15.165 18.958a2.528 2.528 0 0 0 2.5-2.5c0-1.61-.89-2.5-2.5-2.5h-1.25v2.5a2.528 2.528 0 0 0 2.5 2.5zm6.25-2.5a2.528 2.528 0 0 0-2.5-2.5 2.528 2.528 0 0 0-2.5 2.5c0 1.61.89 2.5 2.5 2.5h2.5v-2.5z"/>
                  <path d="M15.165 15.165c1.61 0 2.5-.89 2.5-2.5s-.89-2.5-2.5-2.5h-6.25c-1.61 0-2.5.89-2.5 2.5s.89 2.5 2.5 2.5h6.25z"/>
                </svg>
              </div>
            </button>
            
            <button 
              onClick={() => {
                const nextIndex = (currentStageIndex + 1) % demoStages.length;
                handleStageChange(nextIndex);
              }}
              className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">Next Session</div>
                  <div className="text-sm text-slate-500">{currentStage.nextSession}</div>
                </div>
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModeratorView = () => (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Current Session Control</h3>
        <div className="text-center mb-6">
          <div className={`text-6xl font-mono font-bold mb-2 ${getTimeColor()}`}>
            {formatTime(timeRemaining)}
          </div>
          <div className="text-slate-600">{currentStage.speaker}</div>
        </div>
        
        <div className="flex justify-center space-x-3 mb-6">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-lg font-medium ${
              isRunning ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'
            }`}
          >
            {isRunning ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={() => addTime(-2)}
            className="px-3 py-2 bg-red-500 text-white rounded-lg font-medium"
          >
            -2m
          </button>
          <button
            onClick={() => addTime(2)}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg font-medium"
          >
            +2m
          </button>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleSlackNotification}
            className="w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors"
          >
            <div className="font-medium text-blue-900">Send Warning</div>
            <div className="text-sm text-blue-600">5-minute alert to speaker</div>
          </button>
          <button
            onClick={() => {
              const nextIndex = (currentStageIndex + 1) % demoStages.length;
              handleStageChange(nextIndex);
            }}
            className="w-full p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors"
          >
            <div className="font-medium text-purple-900">Transition</div>
            <div className="text-sm text-purple-600">Move to {currentStage.nextSession}</div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Speaker Preparation</h3>
        <div className="space-y-4">
          {demoStages.slice(currentStageIndex, currentStageIndex + 3).map((stage, index) => (
            <div key={stage.id} className={`p-4 rounded-lg border ${
              index === 0 ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="font-medium text-slate-900">{stage.speaker}</div>
              <div className="text-sm text-slate-600">{stage.sessionTitle}</div>
              <div className="text-xs text-slate-500 mt-1">
                {index === 0 ? 'Current' : `Up in ${index * 20} minutes`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSpeakerView = () => {
    const currentNote = getCurrentNote();
    const completedNotes = getCompletedNotes();
    const upcomingNotes = getUpcomingNotes();

    return (
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="text-center mb-6">
            <div className={`text-7xl font-mono font-bold mb-4 ${getTimeColor()}`}>
              {formatTime(timeRemaining)}
            </div>
            <div className="text-slate-600 text-lg mb-4">Time Remaining</div>
            
            {/* Current Speaking Point */}
            {currentNote && (
              <div className={`p-4 rounded-lg border-2 border-dashed ${getNoteTypeColor(currentNote.type)}`}>
                <div className="font-medium mb-1">Current Focus:</div>
                <div className="text-sm">{currentNote.content}</div>
              </div>
            )}
          </div>

          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <h3 className="font-semibold text-slate-900 mb-1">Your Session</h3>
            <p className="text-slate-600 text-sm">{currentStage.sessionTitle}</p>
            <div className="mt-2 text-xs text-slate-500">
              {currentStage.room} • {currentStage.attendees} attendees
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Your Speaking Notes</h3>
          
          {/* Current Note */}
          {currentNote && (
            <div className="mb-4">
              <div className="text-sm font-medium text-slate-700 mb-2">Right Now:</div>
              <div className={`p-3 rounded-lg border-l-4 ${getNoteTypeColor(currentNote.type)}`}>
                <div className="font-medium text-sm">{currentNote.content}</div>
                <div className="text-xs mt-1 opacity-75">
                  {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')} elapsed
                </div>
              </div>
            </div>
          )}

          {/* Completed Notes */}
          {completedNotes.length > 0 && (
            <div className="mb-4">
              <div className="text-sm font-medium text-slate-700 mb-2">Completed:</div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {completedNotes.slice(-3).map((note, index) => (
                  <div key={index} className="p-2 bg-green-50 rounded border border-green-200 opacity-60">
                    <div className="text-sm text-green-800 line-through">{note.content}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Notes */}
          <div>
            <div className="text-sm font-medium text-slate-700 mb-2">Coming Up:</div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {upcomingNotes.slice(0, 3).map((note, index) => (
                <div key={index} className={`p-3 rounded-lg border ${getNoteTypeColor(note.type)}`}>
                  <div className="text-sm font-medium">{note.content}</div>
                  <div className="text-xs mt-1 opacity-75">
                    In {Math.floor((note.timeMarker - elapsedTime) / 60)} minutes
                  </div>
                  {note.type === 'optional' && (
                    <div className="text-xs text-slate-500 mt-1">• Skip if running late</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">StageCue Demo</h1>
              <p className="text-sm text-slate-500">Q1 Product Launch Planning • {currentStage.room}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 text-sm font-medium">Live Meeting</span>
            </div>
            <span className="text-slate-500 text-sm">{currentStage.attendees} attendees</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* View Mode Selector */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {(['organizer', 'moderator', 'speaker'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    viewMode === mode
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {mode} View
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stage Navigation */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex space-x-2 overflow-x-auto">
            {demoStages.map((stage, index) => (
              <button
                key={stage.id}
                onClick={() => handleStageChange(index)}
                className={`flex-shrink-0 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  index === currentStageIndex
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <div className="text-left">
                  <div className="font-medium">{stage.speaker}</div>
                  <div className="text-xs opacity-75">{stage.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic View Content */}
        {viewMode === 'organizer' && renderOrganizerView()}
        {viewMode === 'moderator' && renderModeratorView()}
        {viewMode === 'speaker' && renderSpeakerView()}

        {/* Meeting Progress */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">{currentStageIndex + 1}/{demoStages.length}</div>
                <div className="text-sm text-slate-500">Sessions Progress</div>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">{Math.floor(elapsedTime / 60)}</div>
                <div className="text-sm text-slate-500">Minutes Elapsed</div>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {Math.round(((currentStage.totalDuration * 60 - timeRemaining) / (currentStage.totalDuration * 60)) * 100)}%
                </div>
                <div className="text-sm text-slate-500">Session Complete</div>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">{currentStage.attendees}</div>
                <div className="text-sm text-slate-500">Attendees</div>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slack Notification Popup */}
      {showSlackNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-4 max-w-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.042 15.165a2.528 2.528 0 0 0 2.5 2.5c1.61 0 2.5-.89 2.5-2.5v-1.25h-2.5a2.528 2.528 0 0 0-2.5 2.5zm2.5-6.25a2.528 2.528 0 0 0-2.5-2.5 2.528 2.528 0 0 0-2.5 2.5c0 1.61.89 2.5 2.5 2.5h2.5v-2.5z"/>
                  <path d="M8.915 8.915c0-1.61.89-2.5 2.5-2.5s2.5.89 2.5 2.5v6.25c0 1.61-.89 2.5-2.5 2.5s-2.5-.89-2.5-2.5v-6.25z"/>
                  <path d="M15.165 18.958a2.528 2.528 0 0 0 2.5-2.5c0-1.61-.89-2.5-2.5-2.5h-1.25v2.5a2.528 2.528 0 0 0 2.5 2.5zm6.25-2.5a2.528 2.528 0 0 0-2.5-2.5 2.528 2.528 0 0 0-2.5 2.5c0 1.61.89 2.5 2.5 2.5h2.5v-2.5z"/>
                  <path d="M15.165 15.165c1.61 0 2.5-.89 2.5-2.5s-.89-2.5-2.5-2.5h-6.25c-1.61 0-2.5.89-2.5 2.5s.89 2.5 2.5 2.5h6.25z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-900 mb-1">Slack Alert Sent</div>
                <div className="text-sm text-slate-600 mb-2">#launch-team</div>
                <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded border">
                  "⏰ {currentStage.speaker} has {formatTime(timeRemaining)} remaining. {currentStage.nextSession} prep needed."
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}