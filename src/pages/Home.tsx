import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';

// ===================================================================================
// DEMO EMBED COMPONENT
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

const AnimationStyles = () => (
  <style>{`
    .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `}</style>
);

function DemoEmbed() {
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
      duration: 20,
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
    <div className="bg-slate-50">
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
    const colors: { [key: string]: string } = {
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
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">Add Speaking Note</h3>
              <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                <input
                  type="text"
                  value={formData.time}
                  readOnly
                  placeholder="Time marker..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
                <textarea
                  value={formData.content}
                  readOnly
                  placeholder="Speaking note..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm h-20"
                />
                <select
                  value={formData.type}
                  disabled
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="essential">Essential</option>
                  <option value="optional">Optional</option>
                  <option value="transition">Transition</option>
                </select>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium">
                  Add Note
                </button>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Speaker Notes for Sarah Martinez</h3>
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
              {notes.length === 0 && <div className="text-center py-8 text-slate-500"><svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>Add notes for this speaker</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================================================================================
// STEP 4: LIVE MANAGEMENT
// ===================================================================================
function LiveManagementStep() {
  const [timeRemaining, setTimeRemaining] = useState(18 * 60 + 42);
  const [showSlackModal, setShowSlackModal] = useState(false);
  const [slackMessage, setSlackMessage] = useState('@alex I see Jennifer has had her hand raised for a bit. Take it now or wait for Q&A?');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const notificationTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const modalTimer = setTimeout(() => setShowSlackModal(true), 6000);
    const countdownTimer = setInterval(() => setTimeRemaining(prev => Math.max(0, prev - 1)), 1000);
    
    return () => {
      clearTimeout(modalTimer);
      clearInterval(countdownTimer);
      if (notificationTimer.current) {
        clearTimeout(notificationTimer.current);
      }
    };
  }, []);

  const handleSendAlert = () => {
    setShowSlackModal(false);

    if (notificationTimer.current) {
      clearTimeout(notificationTimer.current);
    }

    setShowSuccessAlert(true);
    
    notificationTimer.current = setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);
  };

  const handleManualClose = () => {
    if (notificationTimer.current) {
      clearTimeout(notificationTimer.current);
    }
    setShowSuccessAlert(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fade-in">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="text-center mb-8"><div className="text-8xl font-mono font-bold mb-4">{formatTime(timeRemaining)}</div><div className="text-slate-600 text-lg">Time Remaining</div></div>
          <div className="bg-slate-50 rounded-lg p-6 mb-6 text-center"><h3 className="text-xl font-semibold text-slate-900">Sarah Martinez</h3><p className="text-slate-600">Project Overview & Timeline</p></div>
          <div className="flex justify-center space-x-4"><button className="px-6 py-3 rounded-lg font-medium bg-amber-500 text-white">Pause</button><button onClick={() => setTimeRemaining(prev => prev + 300)} className="px-4 py-3 bg-blue-500 text-white rounded-lg font-medium">+5 min</button><button onClick={() => setTimeRemaining(20 * 60)} className="px-6 py-3 bg-slate-500 text-white rounded-lg font-medium">Reset</button></div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"><h3 className="font-semibold text-slate-900 mb-4">Team Status</h3><div className="space-y-3"><div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"><div className="w-2 h-2 bg-green-500 rounded-full"></div><div><div className="text-sm font-medium">Moderator Ready</div></div></div><div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg"><div className="w-2 h-2 bg-blue-500 rounded-full"></div><div><div className="text-sm font-medium">Next Speaker</div></div></div></div></div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"><h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3><div className="space-y-3"><button onClick={() => setShowSlackModal(true)} className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-left"><div className="font-medium">Send Slack Alert</div></button><button className="w-full p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-left"><div className="font-medium text-purple-900">Next Session</div></button></div></div>
        </div>
      </div>
      
      {showSlackModal && (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"><div className="bg-white rounded-xl shadow-2xl max-w-md w-full"><div className="p-6"><div className="flex items-center justify-between mb-4"><div className="flex items-center space-x-3"><div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg></div><h3 className="text-lg font-semibold text-slate-900">Send Slack Alert</h3></div><button onClick={() => setShowSlackModal(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div><div className="space-y-4"><div><label className="block text-sm font-medium text-slate-700 mb-2">Channel</label><select className="w-full px-3 py-2 border border-slate-300 rounded-lg"><option>#launch-team</option></select></div><div><label className="block text-sm font-medium text-slate-700 mb-2">Message</label><textarea value={slackMessage} onChange={(e) => setSlackMessage(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg h-20 text-sm"/></div><div className="flex space-x-3 pt-2"><button onClick={handleSendAlert} className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700">Send Alert</button><button onClick={() => setShowSlackModal(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50">Cancel</button></div></div></div></div></div>)}
      
      {showSuccessAlert && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-4 max-w-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0"><svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div>
              <div className="flex-1">
                <div className="font-medium text-slate-900 mb-1">Alert Sent Successfully</div>
                <div className="text-sm text-slate-600">Message delivered to #launch-team</div>
              </div>
              <button onClick={handleManualClose} className="text-slate-400 hover:text-slate-600 shrink-0"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    window.scrollTo(0, 0);
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50/30 pt-12 pb-16 md:pt-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side Content */}
            <div className="max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                7-Day Free Trial Available
              </div>
              
              {/* Header Text */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Professional Event Timing
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mt-2">
                  Made Simple
                </span>
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed font-light">
                Keep speakers on track, coordinate your team, and deliver flawless events with automated timing and real-time notifications.
              </p>
              
              {/* CTA Button */}
              <div className="mb-6">
                <button
                  onClick={handleStartTrial}
                  className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="relative z-10">Start Free Trial</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
              
              {/* Trial Info */}
              <div className="flex items-center text-slate-500 text-sm">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                7-day free trial • Cancel anytime
              </div>
            </div>
            
            {/* Right Side Mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl transform scale-110"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
                {/* Browser Chrome */}
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-white rounded-md px-4 py-1 text-xs text-slate-500 inline-block shadow-sm border">
                      app.stagecue.com/live
                    </div>
                  </div>
                </div>
                
                {/* Timer Interface */}
                <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                  <div className="relative">
                    {/* Live Indicator */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-red-400/30">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-red-200 text-sm font-medium">LIVE</span>
                      </div>
                    </div>
                    
                    {/* Main Timer */}
                    <div className="text-5xl md:text-6xl font-mono font-bold text-white mb-3 tracking-wider">18:42</div>
                    <div className="text-white/80 text-lg mb-6 font-medium">Session Time Remaining</div>
                    
                    {/* Speaker Info */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-6">
                      <div className="text-white/60 text-xs mb-1 uppercase tracking-wide">Current Speaker</div>
                      <div className="text-white text-lg font-semibold">Dr. Sarah Chen</div>
                      <div className="text-white/80 text-sm">AI in Healthcare</div>
                    </div>
                    
                    {/* Control Buttons */}
                    <div className="flex justify-center space-x-3">
                      <button className="px-4 py-2 bg-green-500/80 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
                        Start
                      </button>
                      <button className="px-4 py-2 bg-yellow-500/80 hover:bg-yellow-500 text-white rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
                        Pause
                      </button>
                      <button className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
                        Stop
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="bg-white p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">3/8</div>
                      <div className="text-xs text-slate-500">Sessions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">247</div>
                      <div className="text-xs text-slate-500">Attendees</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-teal-600">5</div>
                      <div className="text-xs text-slate-500">Team</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            See StageCue in Action
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Watch how StageCue transforms event timing from chaotic to seamless
          </p>
        </div>
      </section>

      {/* Demo Section */}
      <section className="relative -mt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl transform scale-110"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="bg-white rounded-lg px-6 py-2 text-sm text-slate-500 inline-block shadow-sm border">
                    app.stagecue.com/demo
                  </div>
                </div>
              </div>
              
              {/* Demo Content */}
              <div className="bg-slate-50">
                <DemoEmbed />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Mockup */}
      <section className="relative -mt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl transform scale-110"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="bg-white rounded-lg px-6 py-2 text-sm text-slate-500 inline-block shadow-sm border">
                    app.stagecue.com/events/tech-summit-2024
                  </div>
                </div>
              </div>
              
              {/* Dashboard Interface */}
              <div className="bg-gradient-to-br from-slate-50 to-white p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Tech Summit 2024</h3>
                    <p className="text-slate-600">Main Auditorium • 247 attendees</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 text-sm font-medium">Live</span>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Timer */}
                  <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                    <div className="relative">
                      <div className="text-7xl font-mono font-bold text-white mb-4 tracking-wider">18:42</div>
                      <div className="text-white/80 text-xl mb-8 font-medium">Session Time Remaining</div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <div className="text-white/60 text-sm mb-2 uppercase tracking-wide">Current Speaker</div>
                        <div className="text-white text-xl font-semibold mb-1">Dr. Sarah Chen</div>
                        <div className="text-white/80 text-sm">AI in Healthcare: Future Perspectives</div>
                      </div>
                      <div className="flex justify-center space-x-4 mt-8">
                        <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors">
                          Start
                        </button>
                        <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors">
                          Pause
                        </button>
                        <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
                          Stop
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Event Schedule */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-slate-900 text-lg">Today's Schedule</h3>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                        <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-900">Dr. Sarah Chen</div>
                          <div className="text-xs text-slate-500 mb-1">2:00 PM - 2:30 PM</div>
                          <div className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-md inline-block">
                            In Progress
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-xl">
                        <div className="flex-shrink-0 w-3 h-3 bg-slate-300 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-900">Panel Discussion</div>
                          <div className="text-xs text-slate-500 mb-1">2:30 PM - 3:15 PM</div>
                          <div className="text-xs text-slate-500">4 speakers</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-xl">
                        <div className="flex-shrink-0 w-3 h-3 bg-slate-300 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-900">Coffee Break</div>
                          <div className="text-xs text-slate-500">3:15 PM - 3:30 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Speaker Notes & Team Coordination */}
                <div className="mt-8 grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-lg mb-4">Speaker Instructions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                        <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-amber-800">5-minute warning at 20:00</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-red-800">Hard stop at 15:00</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-600">Q&A follows immediately after presentation</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-lg mb-4">Team Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">Slack: #event-team</div>
                          <div className="text-xs text-slate-500">Auto-notifications enabled</div>
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
                          <div className="text-sm font-medium text-slate-900">Email Alerts</div>
                          <div className="text-xs text-slate-500">moderators@event.com</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Stop losing audience attention to
                <span className="text-red-600"> timing chaos</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Sessions run over time</h3>
                    <p className="text-slate-600">Speakers lose track of time, disrupting the entire schedule</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Team coordination fails</h3>
                    <p className="text-slate-600">Staff miss cues, transitions are awkward, attendees notice</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Manual timing is stressful</h3>
                    <p className="text-slate-600">Organizers juggle stopwatches while managing everything else</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-2xl"></div>
              <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">StageCue Solution</h3>
                  <p className="text-slate-600">Automated timing with team coordination</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-slate-900">Automatic speaker alerts</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-slate-900">Real-time team notifications</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-slate-900">Seamless transitions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Professional event management
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Everything you need to run conferences, workshops, and live events with precision
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Smart Timer Management</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Multiple countdown displays with automatic warnings, transitions, and millisecond accuracy
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Multiple timer displays
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Custom warning alerts
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Automatic transitions
                </div>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Speaker Portal</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Dedicated speaker interfaces with personal timers, notes, and self-service controls
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Personal speaker links
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Custom notes & cues
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Self-service controls
                </div>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Team Coordination</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Real-time Slack notifications and email alerts keep your entire team synchronized
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Slack integration
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Email notifications
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Real-time updates
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaker Portal Mockup */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Speakers get their own
              <span className="block text-purple-600">dedicated portal</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Personal timing displays, notes, and controls so speakers can focus on delivering great content
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-3xl transform scale-110"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="bg-white rounded-lg px-6 py-2 text-sm text-slate-500 inline-block shadow-sm border">
                    speaker.stagecue.com/sarah-chen
                  </div>
                </div>
              </div>
              
              {/* Speaker Interface */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                    Your session is live
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">AI in Healthcare: Future Perspectives</h1>
                  <p className="text-slate-600">Dr. Sarah Chen • Main Auditorium</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Speaker Timer */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center">
                    <div className="text-6xl font-mono font-bold text-slate-900 mb-4">18:42</div>
                    <div className="text-slate-600 text-lg mb-6">Time Remaining</div>
                    <div className="flex justify-center space-x-3">
                      <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        On Track
                      </div>
                      <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                        Q&A Ready
                      </div>
                    </div>
                  </div>

                  {/* Speaker Notes */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4">Your Notes</h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="font-medium text-slate-900 mb-1">Key Points</div>
                        <div className="text-slate-600">• AI diagnostic accuracy<br/>• Patient data privacy<br/>• Implementation challenges</div>
                      </div>
                      <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                        <div className="font-medium text-amber-800 mb-1">Timing Alerts</div>
                        <div className="text-amber-700">5-min warning at 20:00<br/>Hard stop at 15:00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Management Mockup */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Manage entire events
              <span className="block text-blue-600">from one dashboard</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Schedule sessions, coordinate speakers, and monitor everything in real-time
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-teal-600/10 blur-3xl transform scale-110"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="bg-white rounded-lg px-6 py-2 text-sm text-slate-500 inline-block shadow-sm border">
                    app.stagecue.com/events
                  </div>
                </div>
              </div>
              
              {/* Event Management Interface */}
              <div className="bg-gradient-to-br from-slate-50 to-white p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Event Management</h3>
                    <p className="text-slate-600">3 active events • 12 speakers scheduled</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    + New Event
                  </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Active Events */}
                  <div className="lg:col-span-2 space-y-4">
                    <h4 className="font-semibold text-slate-900 mb-4">Active Events</h4>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h5 className="font-semibold text-slate-900">Tech Summit 2024</h5>
                          <p className="text-sm text-slate-500">Main Auditorium • 247 attendees</p>
                        </div>
                        <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-green-700 text-sm font-medium">Live</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">18:42</div>
                          <div className="text-xs text-slate-500">Current Session</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">3/8</div>
                          <div className="text-xs text-slate-500">Sessions Complete</div>
                        </div>
                        <div className="p-3 bg-teal-50 rounded-lg">
                          <div className="text-2xl font-bold text-teal-600">5</div>
                          <div className="text-xs text-slate-500">Team Members</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h5 className="font-semibold text-slate-900">Design Workshop</h5>
                          <p className="text-sm text-slate-500">Room B • 45 attendees</p>
                        </div>
                        <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-yellow-700 text-sm font-medium">Break</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-slate-600">15:00</div>
                          <div className="text-xs text-slate-500">Break Time</div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-slate-600">2/4</div>
                          <div className="text-xs text-slate-500">Sessions Complete</div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-slate-600">3</div>
                          <div className="text-xs text-slate-500">Team Members</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-4">Quick Actions</h4>
                      <div className="space-y-3">
                        <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                          <div className="font-medium text-blue-900">Start Next Session</div>
                          <div className="text-xs text-blue-600">Panel Discussion</div>
                        </button>
                        <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <div className="font-medium text-purple-900">Send Speaker Alert</div>
                          <div className="text-xs text-purple-600">5-minute warning</div>
                        </button>
                        <button className="w-full text-left p-3 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
                          <div className="font-medium text-teal-900">Notify Team</div>
                          <div className="text-xs text-teal-600">Slack #event-team</div>
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-4">Today's Speakers</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-semibold text-sm">SC</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900">Sarah Chen</div>
                            <div className="text-xs text-green-600">Currently presenting</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                            <span className="text-slate-600 font-semibold text-sm">MJ</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900">Mike Johnson</div>
                            <div className="text-xs text-slate-500">Up next (2:30 PM)</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                            <span className="text-slate-600 font-semibold text-sm">AL</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900">Anna Lee</div>
                            <div className="text-xs text-slate-500">Scheduled (4:00 PM)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to run flawless events?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto font-light">
            Join event professionals who trust StageCue for precision timing and seamless coordination
          </p>
          <button
            onClick={handleStartTrial}
            className="group relative px-8 py-4 bg-white text-slate-900 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <span className="relative z-10">Start Free Trial</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <p className="text-white/60 mt-6 text-sm">
            Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}