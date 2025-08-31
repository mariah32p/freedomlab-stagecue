import { useState, useEffect, useMemo, useRef } from 'react';

// ===================================================================================
// INTERFACES & STYLES
// ===================================================================================

interface DemoStep {
  id: string;
  title: string;
  duration: number;
  component: () => JSX.Element;
}

interface Speaker {
  name: string;
  session: string;
  duration: string;
}

interface SpeakerNote {
  time: string;
  content: string;
  type: 'essential' | 'optional' | 'transition';
}

// Styles to define the animations for the alert notification.
const AnimationStyles = () => (
  <style>{`
    @keyframes slide-in-right {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slide-out-right {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    .animate-slide-in-right { animation: slide-in-right 0.5s forwards; }
    .animate-slide-out-right { animation: slide-out-right 0.5s forwards; }
    .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `}</style>
);


// ===================================================================================
// STAGECUE: MAIN COMPONENT
// ===================================================================================

export function StageCue() {
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps: DemoStep[] = useMemo(() => [
    {
      id: 'create-event',
      title: 'Create Event',
      duration: 8,
      component: CreateEventStep
    },
    {
      id: 'add-speakers',
      title: 'Add Speakers',
      duration: 14,
      component: AddSpeakersStep
    },
    {
      id: 'speaker-notes',
      title: 'Speaker Notes Setup',
      duration: 16,
      component: SpeakerNotesStep
    },
    {
      id: 'live-management',
      title: 'Live Event Management',
      duration: 22,
      component: LiveManagementStep
    }
  ], []);

  useEffect(() => {
    const advanceStep = () => {
        setCurrentStep(prev => (prev < demoSteps.length - 1 ? prev + 1 : prev));
    };
    const timer = setTimeout(advanceStep, demoSteps[currentStep].duration * 1000);
    return () => clearTimeout(timer);
  }, [currentStep, demoSteps]);
  
  const CurrentComponent = demoSteps[currentStep].component;

  return (
    <div className="min-h-screen bg-slate-50">
      <AnimationStyles />
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">StageCue</h1>
              <p className="text-sm text-slate-500">Q1 Product Launch Planning</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-2">
              <button className="text-slate-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-100">Events</button>
              <button className="text-slate-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-100">Templates</button>
              <button className="text-slate-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-100">Settings</button>
            </nav>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center"><span className="text-slate-600 text-sm font-medium">JD</span></div>
              <span className="text-sm text-slate-700">John Doe</span>
            </div>
          </div>
        </div>
      </header>
      
      <CurrentComponent />
    </div>
  );
}

// ===================================================================================
// STEP 1: CREATE EVENT
// ===================================================================================
function CreateEventStep() {
  const [formData, setFormData] = useState({ name: '', date: '', duration: '', room: '' });

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    timeouts.push(setTimeout(() => setFormData(prev => ({ ...prev, name: 'Q1 Product Launch Planning' })), 1000));
    timeouts.push(setTimeout(() => setFormData(prev => ({ ...prev, date: '2025-03-15' })), 2500));
    timeouts.push(setTimeout(() => setFormData(prev => ({ ...prev, duration: '90 minutes' })), 4000));
    timeouts.push(setTimeout(() => setFormData(prev => ({ ...prev, room: 'https://zoom.us/j/123456789' })), 5500));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Create New Event</h2>
          <p className="text-slate-600">Set up your event timing and coordination</p>
        </div>
        <div className="max-w-2xl mx-auto space-y-6">
          <div><label className="block text-sm font-medium text-slate-700 mb-2">Event Name</label><input type="text" value={formData.name} readOnly className="w-full px-4 py-3 border border-slate-300 rounded-lg"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-2">Date</label><input type="date" value={formData.date} readOnly className="w-full px-4 py-3 border border-slate-300 rounded-lg"/></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-2">Duration</label><input type="text" value={formData.duration} readOnly className="w-full px-4 py-3 border border-slate-300 rounded-lg"/></div>
          </div>
          <div><label className="block text-sm font-medium text-slate-700 mb-2">Meeting Link</label><input type="text" value={formData.room} readOnly className="w-full px-4 py-3 border border-slate-300 rounded-lg"/></div>
          <div className="pt-4"><button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700">Create Event</button></div>
        </div>
      </div>
    </div>
  );
}

// ===================================================================================
// STEP 2: ADD SPEAKERS
// ===================================================================================
function AddSpeakersStep() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [formData, setFormData] = useState<Speaker>({ name: '', session: '', duration: '' });

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    // Speaker 1
    timeouts.push(setTimeout(() => setFormData({ name: 'Sarah Martinez', session: 'Project Overview', duration: '20 min' }), 1000));
    timeouts.push(setTimeout(() => {
        setSpeakers(prev => [...prev, { name: 'Sarah Martinez', session: 'Project Overview', duration: '20 min' }]);
        setFormData({ name: '', session: '', duration: '' });
    }, 3000));

    // Speaker 2
    timeouts.push(setTimeout(() => setFormData({ name: 'Alex Chen', session: 'Technical Architecture', duration: '25 min' }), 4500));
    timeouts.push(setTimeout(() => {
        setSpeakers(prev => [...prev, { name: 'Alex Chen', session: 'Technical Architecture', duration: '25 min' }]);
        setFormData({ name: '', session: '', duration: '' });
    }, 6500));

    // Speaker 3
    timeouts.push(setTimeout(() => setFormData({ name: 'Jessica Park', session: 'Marketing Strategy', duration: '20 min' }), 8000));
    timeouts.push(setTimeout(() => {
        setSpeakers(prev => [...prev, { name: 'Jessica Park', session: 'Marketing Strategy', duration: '20 min' }]);
        setFormData({ name: '', session: '', duration: '' });
    }, 10000));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="text-center mb-8"><h2 className="text-3xl font-bold text-slate-900 mb-2">Add Speakers & Sessions</h2><p className="text-slate-600">Configure your event agenda and timing</p></div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Add New Speaker</h3>
            <div className="space-y-4 p-6 bg-slate-50 rounded-lg">
              <input type="text" value={formData.name} readOnly placeholder="Speaker name..." className="w-full px-4 py-3 border border-slate-300 rounded-lg"/>
              <input type="text" value={formData.session} readOnly placeholder="Session title..." className="w-full px-4 py-3 border border-slate-300 rounded-lg"/>
              <input type="text" value={formData.duration} readOnly placeholder="Duration..." className="w-full px-4 py-3 border border-slate-300 rounded-lg"/>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium">Add Speaker</button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Event Agenda</h3>
            <div className="space-y-3">
              {speakers.map((speaker, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm animate-fade-in">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center"><span className="text-indigo-600 font-semibold text-sm">{getInitials(speaker.name)}</span></div>
                    <div><div className="font-medium text-slate-900">{speaker.name}</div><div className="text-sm text-slate-600">{speaker.session}</div></div>
                  </div>
                  <div className="text-sm font-medium text-slate-500">{speaker.duration}</div>
                </div>
              ))}
              {speakers.length === 0 && <div className="text-center py-8 text-slate-500"><svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>Add speakers to build your agenda</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================================================================================
// STEP 3: SPEAKER NOTES
// ===================================================================================
function SpeakerNotesStep() {
  const [notes, setNotes] = useState<SpeakerNote[]>([]);
  const [formData, setFormData] = useState<SpeakerNote>({ time: '', content: '', type: 'essential' });

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    const notesToAdd: SpeakerNote[] = [
      { time: '0:00', content: 'Welcome team, introduce Q1 launch timeline.', type: 'essential' },
      { time: '5:00', content: 'Present market research findings.', type: 'essential' },
      { time: '10:00', content: 'Demo new product features.', type: 'essential' },
      { time: '15:00', content: 'Discuss beta program (skip if running late).', type: 'optional' },
      { time: '18:00', content: 'Wrap up, prepare for Q&A transition.', type: 'transition' },
    ];
    let delay = 1000;
    notesToAdd.forEach(note => {
        timeouts.push(setTimeout(() => setFormData(note), delay));
        timeouts.push(setTimeout(() => {
            setNotes(prev => [...prev, note]);
            setFormData({ time: '', content: '', type: 'essential' });
        }, delay + 1500));
        delay += 2500;
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const getNoteTypeColor = (type: string) => {
    const colors = {
      essential: 'bg-blue-50 border-blue-200 text-blue-800',
      optional: 'bg-slate-50 border-slate-200 text-slate-600',
      transition: 'bg-purple-50 border-purple-200 text-purple-800'
    };
    return colors[type] || colors.optional;
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="text-center mb-8"><h2 className="text-3xl font-bold text-slate-900 mb-2">Setup Speaker Notes</h2><p className="text-slate-600">Add time-synced speaking notes and cues</p></div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-6"><label className="block text-sm font-medium text-slate-700 mb-2">Select Speaker</label><select className="w-full px-4 py-3 border border-slate-300 rounded-lg"><option>Sarah Martinez</option><option>Alex Chen</option><option>Jessica Park</option></select></div>
            <div className="space-y-4"><h3 className="font-semibold text-slate-900">Add Speaking Note</h3><div className="p-4 bg-slate-50 rounded-lg space-y-3"><input type="text" value={formData.time} readOnly placeholder="Time marker..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"/><textarea value={formData.content} readOnly placeholder="Speaking note..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm h-20"/><select value={formData.type} readOnly className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"><option value="essential">Essential</option><option value="optional">Optional</option><option value="transition">Transition</option></select><button className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium">Add Note</button></div></div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Speaker Notes for Sarah Martinez</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notes.map((note, index) => (<div key={index} className={`p-4 rounded-lg border animate-fade-in ${getNoteTypeColor(note.type)}`}><div className="flex items-start justify-between mb-2"><div className="font-medium text-sm">{note.time}</div><div className="text-xs px-2 py-1 bg-white/50 rounded capitalize">{note.type}</div></div><div className="text-sm">{note.content}</div></div>))}
              {notes.length === 0 && <div className="text-center py-8 text-slate-500"><svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>Add notes for this speaker</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================================================================================
// STEP 4: LIVE MANAGEMENT (REDESIGNED)
// ===================================================================================
function LiveManagementStep() {
  const [timeRemaining, setTimeRemaining] = useState(20 * 60);
  const [slackMessage, setSlackMessage] = useState('@alex a question came in about the beta program.');
  const [showCoordinationPanel, setShowCoordinationPanel] = useState(false);
  
  // State for the success notification
  const [isShowingSuccess, setIsShowingSuccess] = useState(false);
  const [isExitingSuccess, setIsExitingSuccess] = useState(false);
  
  // Use a ref to hold timers to ensure they are cleared on unmount
  const notificationTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Countdown timer for the main clock
    const countdown = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    
    // FIX: Delay the appearance of the coordination panel
    const panelTimer = setTimeout(() => {
        setShowCoordinationPanel(true);
    }, 6000); // Panel appears after 6 seconds

    // Cleanup function to clear all timers when the component unmounts
    return () => {
      clearInterval(countdown);
      clearTimeout(panelTimer);
      clearTimeout(notificationTimer.current);
    };
  }, []);

  // FIX: Redesigned and simplified alert handling logic for reliability
  const handleSendAlert = () => {
    clearTimeout(notificationTimer.current); // Clear any existing timer
    setIsExitingSuccess(false); // Reset exit animation state
    setIsShowingSuccess(true); // Show the notification
    
    // Set a new timer to hide the notification
    notificationTimer.current = setTimeout(() => {
      setIsExitingSuccess(true); // Trigger exit animation
      setTimeout(() => {
        setIsShowingSuccess(false); // Remove from DOM after animation
      }, 500); // This must match the animation duration
    }, 4000); // Alert stays visible for 4 seconds
  };
  
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fade-in">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="text-center mb-8">
            <div className="text-8xl font-mono font-bold text-slate-800 mb-4">{formatTime(timeRemaining)}</div>
            <div className="text-slate-600 text-lg">Time Remaining in Event</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-6 mb-6 text-center">
            <h3 className="text-xl font-semibold text-slate-900">Sarah Martinez</h3>
            <p className="text-slate-600">Currently Speaking: Project Overview</p>
          </div>
        </div>

        {/* FIX: Redesigned this panel to be simpler and appear after a delay */}
        <div className="space-y-6">
          {showCoordinationPanel && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fade-in">
              <h3 className="font-semibold text-slate-900 mb-4">Team Coordination</h3>
              <div className="space-y-4">
                <textarea
                  value={slackMessage}
                  onChange={(e) => setSlackMessage(e.target.value)}
                  placeholder="Send a message to the team..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm h-20"
                />
                <button
                  onClick={handleSendAlert}
                  className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Send Alert to #launch-team
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FIX: The alert notification with robust show/hide logic */}
      {isShowingSuccess && (
        <div className={`fixed top-6 right-6 z-50 ${isExitingSuccess ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-4 max-w-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Alert Sent Successfully</p>
                <p className="text-sm text-slate-600">Message delivered to #launch-team</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}