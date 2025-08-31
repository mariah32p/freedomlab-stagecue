import { useState, useEffect } from 'react';

interface DemoStep {
  id: string;
  title: string;
  duration: number; // seconds to show this step
  component: () => JSX.Element;
}

export function StageCue() {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepTimer, setStepTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const demoSteps: DemoStep[] = [
    {
      id: 'create-event',
      title: 'Create Event',
      duration: 8,
      component: CreateEventStep
    },
    {
      id: 'add-speakers',
      title: 'Add Speakers',
      duration: 7,
      component: AddSpeakersStep
    },
    {
      id: 'speaker-notes',
      title: 'Speaker Notes Setup',
      duration: 8,
      component: SpeakerNotesStep
    },
    {
      id: 'live-management',
      title: 'Live Event Management',
      duration: 15,
      component: LiveManagementStep
    }
  ];

  // Auto-advance through demo steps
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setStepTimer(prev => {
        const newTime = prev + 1;
        
        // Auto-advance to next step when duration is reached
        if (newTime >= demoSteps[currentStep].duration && currentStep < demoSteps.length - 1) {
          setCurrentStep(currentStep + 1);
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, currentStep, demoSteps]);

  const CurrentComponent = demoSteps[currentStep].component;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Demo Progress Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">StageCue</h1>
              <p className="text-sm text-slate-500">Q1 Product Launch Planning</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-6">
              <button className="text-slate-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Events
              </button>
              <button className="text-slate-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Templates
              </button>
              <button className="text-slate-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Settings
              </button>
            </nav>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <span className="text-slate-600 text-sm font-medium">JD</span>
              </div>
              <span className="text-sm text-slate-700">John Doe</span>
            </div>
          </div>
        </div>
      </header>

      <CurrentComponent />
    </div>
  );
}

// Step 1: Create Event
function CreateEventStep() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    duration: '',
    room: ''
  });

  useEffect(() => {
    // Simulate typing
    const timeouts: NodeJS.Timeout[] = [];
    
    timeouts.push(setTimeout(() => setFormData(prev => ({ ...prev, name: 'Q1 Product Launch Planning' })), 1000));
    timeouts.push(setTimeout(() => setFormData(prev => ({ ...prev, date: '2024-03-15' })), 2500));
    timeouts.push(setTimeout(() => setFormData(prev => ({ ...prev, duration: '90 minutes' })), 4000));
    timeouts.push(setTimeout(() => setFormData(prev => ({ ...prev, room: 'https://zoom.us/j/123456789' })), 5500));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Create New Event</h2>
          <p className="text-slate-600">Set up your event timing and coordination</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Event Name</label>
            <input
              type="text"
              value={formData.name}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter event name..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
              <input
                type="text"
                value={formData.duration}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 90 minutes"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Link</label>
            <input
              type="text"
              value={formData.room}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Zoom link or venue..."
            />
          </div>

          <div className="pt-4">
            <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 2: Add Speakers
function AddSpeakersStep() {
  const [speakers, setSpeakers] = useState<Array<{name: string, session: string, duration: string}>>([]);
  const [formData, setFormData] = useState({
    name: '',
    session: '',
    duration: ''
  });

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    // Fill form first, then add speaker
    timeouts.push(setTimeout(() => {
      setFormData({ name: 'Sarah Martinez', session: '', duration: '' });
    }, 500));
    
    timeouts.push(setTimeout(() => {
      setFormData(prev => ({ ...prev, session: 'Project Overview' }));
    }, 1000));
    
    timeouts.push(setTimeout(() => {
      setFormData(prev => ({ ...prev, duration: '20 min' }));
    }, 1500));
    
    timeouts.push(setTimeout(() => {
      setSpeakers([{ name: 'Sarah Martinez', session: 'Project Overview', duration: '20 min' }]);
      setFormData({ name: 'Alex Chen', session: '', duration: '' });
    }, 1500));
    
    timeouts.push(setTimeout(() => {
      setFormData(prev => ({ ...prev, session: 'Technical Architecture' }));
    }, 2000));
    
    timeouts.push(setTimeout(() => {
      setFormData(prev => ({ ...prev, duration: '25 min' }));
    }, 2500));
    
    timeouts.push(setTimeout(() => {
      setSpeakers(prev => [...prev, { name: 'Alex Chen', session: 'Technical Architecture', duration: '25 min' }]);
      setFormData({ name: 'Jessica Park', session: '', duration: '' });
    }, 3000));
    
    timeouts.push(setTimeout(() => {
      setFormData(prev => ({ ...prev, session: 'Marketing Strategy' }));
    }, 3500));
    
    timeouts.push(setTimeout(() => {
      setFormData(prev => ({ ...prev, duration: '20 min' }));
    }, 4000));
    
    timeouts.push(setTimeout(() => {
      setSpeakers(prev => [...prev, { name: 'Jessica Park', session: 'Marketing Strategy', duration: '20 min' }]);
      setFormData({ name: 'Team Discussion', session: '', duration: '' });
    }, 4500));
    
    timeouts.push(setTimeout(() => {
      setFormData(prev => ({ ...prev, session: 'Q&A and Next Steps' }));
    }, 5000));
    
    timeouts.push(setTimeout(() => {
      setFormData(prev => ({ ...prev, duration: '25 min' }));
    }, 5500));
    
    timeouts.push(setTimeout(() => {
      setSpeakers(prev => [...prev, { name: 'Team Discussion', session: 'Q&A and Next Steps', duration: '25 min' }]);
      setFormData({ name: '', session: '', duration: '' });
    }, 6000));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Add Speakers & Sessions</h2>
          <p className="text-slate-600">Configure your event agenda and timing</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Add New Speaker</h3>
            <div className="space-y-4 p-6 bg-slate-50 rounded-lg">
              <input
                type="text"
                value={formData.name}
                placeholder="Speaker name..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg"
              />
              <input
                type="text"
                value={formData.session}
                placeholder="Session title..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg"
              />
              <input
                type="text"
                value={formData.duration}
                placeholder="Duration (e.g., 20 min)..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg"
              />
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium">
                Add Speaker
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Event Agenda</h3>
            <div className="space-y-3">
              {speakers.map((speaker, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm animate-fade-in">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold text-sm">
                        {speaker.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{speaker.name}</div>
                      <div className="text-sm text-slate-600">{speaker.session}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-slate-500">{speaker.duration}</div>
                </div>
              ))}
              
              {speakers.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add speakers to build your agenda
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 3: Speaker Notes Setup
function SpeakerNotesStep() {
  const [selectedSpeaker, setSelectedSpeaker] = useState('Sarah Martinez');
  const [notes, setNotes] = useState<Array<{time: string, content: string, type: string}>>([]);
  const [formData, setFormData] = useState({
    time: '',
    content: '',
    type: 'essential'
  });

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    // Fill form first, then add note
    timeouts.push(setTimeout(() => {
      setFormData({ time: '0:00', content: '', type: 'essential' });
    }, 500));
    
    timeouts.push(setTimeout(() => {
      setFormData(prev => ({ ...prev, content: 'Welcome team, introduce Q1 launch timeline' }));
    }, 1000));
    
    timeouts.push(setTimeout(() => {
      setNotes([{ time: '0:00', content: 'Welcome team, introduce Q1 launch timeline', type: 'essential' }]);
      setFormData({ time: '5:00', content: '', type: 'essential' });
    }, 1200));
    
    timeouts.push(setTimeout(() => {
      setFormData(prev => ({ ...prev, content: 'Present market research findings' }));
    }, 1600));
    
    timeouts.push(setTimeout(() => {
      setNotes(prev => [...prev, { time: '5:00', content: 'Present market research findings', type: 'essential' }]);
      setFormData({ time: '10:00', content: '', type: 'essential' });
    }, 2000));
    
    timeouts.push(setTimeout(() => {
      setFormData(prev => ({ ...prev, content: 'Demo new product features' }));
    }, 2400));
    
    timeouts.push(setTimeout(() => {
      setNotes(prev => [...prev, { time: '10:00', content: 'Demo new product features', type: 'essential' }]);
      setFormData({ time: '15:00', content: '', type: 'optional' });
    }, 2800));
    
    timeouts.push(setTimeout(() => {
      setFormData(prev => ({ ...prev, content: 'Discuss beta program (skip if running late)' }));
    }, 3200));
    
    timeouts.push(setTimeout(() => {
      setNotes(prev => [...prev, { time: '15:00', content: 'Discuss beta program (skip if running late)', type: 'optional' }]);
      setFormData({ time: '18:00', content: '', type: 'transition' });
    }, 3600));
    
    timeouts.push(setTimeout(() => {
      setFormData(prev => ({ ...prev, content: 'Wrap up, prepare for Q&A transition' }));
    }, 4000));
    
    timeouts.push(setTimeout(() => {
      setNotes(prev => [...prev, { time: '18:00', content: 'Wrap up, prepare for Q&A transition', type: 'transition' }]);
      setFormData({ time: '', content: '', type: 'essential' });
    }, 4400));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const getNoteTypeColor = (type: string) => {
    switch (type) {
      case 'essential': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'optional': return 'bg-slate-50 border-slate-200 text-slate-600';
      case 'transition': return 'bg-purple-50 border-purple-200 text-purple-800';
      default: return 'bg-slate-50 border-slate-200 text-slate-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Setup Speaker Notes</h2>
          <p className="text-slate-600">Add time-synced speaking notes and cues</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Select Speaker</label>
              <select 
                value={selectedSpeaker}
                onChange={(e) => setSelectedSpeaker(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg"
              >
                <option>Sarah Martinez</option>
                <option>Alex Chen</option>
                <option>Jessica Park</option>
              </select>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">Add Speaking Note</h3>
              <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                <input
                  type="text"
                  value={formData.time}
                  placeholder="Time marker (e.g., 5:00)..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
                <textarea
                  value={formData.content}
                  placeholder="Speaking note or cue..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm h-20"
                />
                <select 
                  value={formData.type}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option>Essential</option>
                  <option>Optional</option>
                  <option>Transition</option>
                </select>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium">
                  Add Note
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Speaker Notes for {selectedSpeaker}</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notes.map((note, index) => (
                <div key={index} className={`p-4 rounded-lg border animate-fade-in ${getNoteTypeColor(note.type)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium text-sm">{note.time}</div>
                    <div className="text-xs px-2 py-1 bg-white/50 rounded capitalize">{note.type}</div>
                  </div>
                  <div className="text-sm">{note.content}</div>
                </div>
              ))}
              
              {notes.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Add time-synced notes for this speaker
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 4: Live Event Management
function LiveManagementStep() {
  const [timeRemaining, setTimeRemaining] = useState(18 * 60 + 42); // 18:42
  const [isRunning, setIsRunning] = useState(true);
  const [currentSpeaker] = useState('Sarah Martinez');
  const [showSlackModal, setShowSlackModal] = useState(false);
  const [slackMessage, setSlackMessage] = useState('@alex I see Jennifer has had her hand raised for a bit for a question - should we take it now or wait for Q&A?');
  const [showSlackSuccess, setShowSlackSuccess] = useState(false);

  useEffect(() => {
    // Show Slack modal after timer is visible
    const slackTimeout = setTimeout(() => {
      setShowSlackModal(true);
    }, 2000);

    return () => {
      clearTimeout(slackTimeout);
    };
  }, []);

  // Separate effect to handle success notification auto-close
  useEffect(() => {
    if (showSlackSuccess) {
      const closeTimeout = setTimeout(() => {
        setShowSlackSuccess(false);
      }, 1000);
      
      return () => clearTimeout(closeTimeout);
    }
  }, [showSlackSuccess]);

    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

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

  const addTime = (minutes: number) => {
    setTimeRemaining(prev => prev + (minutes * 60));
  };

  const elapsedTime = (20 * 60) - timeRemaining;
  const currentNote = elapsedTime >= 0 && elapsedTime < 300 ? 'Welcome team, introduce Q1 launch timeline' :
                     elapsedTime >= 300 && elapsedTime < 600 ? 'Present market research findings' :
                     elapsedTime >= 600 && elapsedTime < 900 ? 'Demo new product features' :
                     elapsedTime >= 900 ? 'Discuss beta program (skip if running late)' : null;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Timer */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="text-center mb-8">
            <div className={`text-8xl font-mono font-bold mb-4 transition-colors ${getTimeColor()}`}>
              {formatTime(timeRemaining)}
            </div>
            <div className="text-slate-600 text-lg mb-6">Time Remaining</div>
            
            <div className="bg-slate-100 rounded-full h-3 overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                style={{ width: `${Math.max(0, (timeRemaining / (20 * 60)) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-900 mb-1">{currentSpeaker}</h3>
              <p className="text-slate-600 mb-2">Project Overview & Timeline</p>
              {currentNote && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm font-medium text-blue-800">Current Focus:</div>
                  <div className="text-sm text-blue-700">{currentNote}</div>
                </div>
              )}
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
              className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
            >
              -5 min
            </button>
            <button
              onClick={() => addTime(5)}
              className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
            >
              +5 min
            </button>
            <button
              onClick={() => {
                setTimeRemaining(20 * 60);
                setIsRunning(true);
              }}
              className="px-6 py-3 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-medium"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Team Coordination */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Team Status</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <div className="text-sm font-medium text-slate-900">Moderator Ready</div>
                  <div className="text-xs text-slate-500">Mike (Room A)</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <div className="text-sm font-medium text-slate-900">Next Speaker</div>
                  <div className="text-xs text-slate-500">Alex (Preparing)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowSlackModal(true)}
                className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-left transition-colors"
              >
                <div className="font-medium text-slate-900">Send Slack Alert</div>
                <div className="text-sm text-slate-500">Notify #launch-team</div>
              </button>
              <button className="w-full p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
                <div className="font-medium text-purple-900">Next Session</div>
                <div className="text-sm text-purple-600">Technical Architecture</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slack Notification Modal */}
      {showSlackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Send Slack Alert</h3>
                </div>
                <button
                  onClick={() => setShowSlackModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Channel</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                    <option>#launch-team</option>
                    <option>#general</option>
                    <option>#events</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea
                    value={slackMessage}
                    onChange={(e) => setSlackMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg h-20 text-sm"
                  />
                </div>
                
                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => {
                      setShowSlackSuccess(true);
                      setShowSlackModal(false);
                    }}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Send Alert
                  </button>
                  <button
                    onClick={() => setShowSlackModal(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slack Success Notification */}
      {showSlackSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-4 max-w-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-900 mb-1">Alert Sent Successfully</div>
                <div className="text-sm text-slate-600 mb-2">#launch-team</div>
                <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
                  Message delivered to 8 team members
                </div>
              </div>
              <button
                onClick={() => setShowSlackSuccess(false)}
                className="text-slate-400 hover:text-slate-600 ml-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}