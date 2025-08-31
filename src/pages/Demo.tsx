import { useState, useEffect, useMemo } from 'react';

// ===================================================================================
// INTERFACES & TYPES
// ===================================================================================

interface DemoStep {
  id: string;
  title: string;
  description: string;
  duration: number; // seconds to show this step
  component: () => JSX.Element;
}

interface Speaker {
  id: number;
  name: string;
  session: string;
  duration: string;
  initials: string;
}

interface SpeakerNote {
  time: string;
  content: string;
  type: 'essential' | 'optional' | 'transition';
}

type NoteCollection = {
  [speakerName: string]: SpeakerNote[];
};


// ===================================================================================
// MOCK DATA & ASSETS
// ===================================================================================

const SvgAssets = {
  Clock: () => (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Bell: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 00-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m8 0v1a3 3 0 01-6 0v-1m6 0H9" />
    </svg>
  ),
  Help: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  AddUser: () => (
    <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  Notes: () => (
     <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Close: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  SlackMessage: () => (
    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Checkmark: () => (
    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  ),
  Chart: () => (
     <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
};

// ===================================================================================
// STAGECUE: MAIN COMPONENT
// ===================================================================================

export function StageCue() {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepTimer, setStepTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // Memoize the steps array to prevent it from being recreated on every render.
  // This stabilizes the dependency for the main useEffect.
  const demoSteps: DemoStep[] = useMemo(() => [
    {
      id: 'create-event',
      title: 'Create Event',
      description: 'Start by setting up the basic event details and schedule.',
      duration: 10,
      component: CreateEventStep
    },
    {
      id: 'add-speakers',
      title: 'Add Speakers',
      description: 'Build the agenda by adding speakers and their sessions.',
      duration: 12,
      component: AddSpeakersStep
    },
    {
      id: 'speaker-notes',
      title: 'Speaker Notes Setup',
      description: 'Add time-synced talking points and cues for each presenter.',
      duration: 15,
      component: SpeakerNotesStep
    },
    {
      id: 'live-management',
      title: 'Live Event Management',
      description: 'Monitor the event in real-time and coordinate with the team.',
      duration: 18,
      component: LiveManagementStep
    },
    {
      id: 'post-event-recap',
      title: 'Post-Event Recap',
      description: 'Review key metrics and audience engagement after the event concludes.',
      duration: 12,
      component: PostEventRecapStep
    },
  ], []);

  // Main effect to auto-advance through the demo steps
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setStepTimer(prev => {
        const newTime = prev + 1;
        if (newTime >= demoSteps[currentStep].duration && currentStep < demoSteps.length - 1) {
          setCurrentStep(prevStep => prevStep + 1);
          return 0; // Reset timer for the next step
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, currentStep, demoSteps]);

  const CurrentComponent = demoSteps[currentStep].component;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 px-6 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <SvgAssets.Clock />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">StageCue</h1>
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <nav className="flex items-center space-x-2">
              <a href="#" className="text-slate-600 hover:text-indigo-600 hover:bg-slate-100 px-3 py-2 rounded-md text-sm font-medium transition-colors">Dashboard</a>
              <a href="#" className="bg-slate-100 text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Events</a>
              <a href="#" className="text-slate-600 hover:text-indigo-600 hover:bg-slate-100 px-3 py-2 rounded-md text-sm font-medium transition-colors">Templates</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
             <div className="relative w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SvgAssets.Search />
                </div>
                <input
                    type="text"
                    placeholder="Search events..."
                    className="block w-full bg-slate-100 border-transparent rounded-lg py-2 pl-10 pr-3 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center">
              <SvgAssets.Plus />
              New Event
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><SvgAssets.Help /></button>
              <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><SvgAssets.Bell /></button>
              <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center ring-2 ring-white">
                <span className="text-slate-600 text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="bg-white border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-bold text-slate-800">{demoSteps[currentStep].title}</h2>
            <p className="text-sm text-slate-500">{demoSteps[currentStep].description}</p>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3">
                <div 
                    className="bg-indigo-600 h-1.5 rounded-full transition-all duration-1000 ease-linear" 
                    style={{ width: `${(stepTimer / demoSteps[currentStep].duration) * 100}%` }}>
                </div>
            </div>
        </div>
        <CurrentComponent />
      </main>
    </div>
  );
}

// ===================================================================================
// STEP 1: CREATE EVENT
// ===================================================================================

function CreateEventStep() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    duration: '',
    room: '',
    description: '',
  });

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    timeouts.push(setTimeout(() => setFormData(prev => ({ ...prev, name: 'Q1 Product Launch Planning' })), 1000));
    timeouts.push(setTimeout(() => setFormData(prev => ({ ...prev, date: '2025-03-15' })), 2500));
    timeouts.push(setTimeout(() => setFormData(prev => ({ ...prev, duration: '90 minutes' })), 4000));
    timeouts.push(setTimeout(() => setFormData(prev => ({ ...prev, room: 'https://zoom.us/j/123456789' })), 5500));
    timeouts.push(setTimeout(() => setFormData(prev => ({ ...prev, description: 'Internal all-hands to align on the upcoming Q1 product launch, timeline, and go-to-market strategy.' })), 7000));
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
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Event Name</label>
            <input type="text" value={formData.name} readOnly className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
              <input type="date" value={formData.date} readOnly className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
              <input type="text" value={formData.duration} readOnly className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Link</label>
            <input type="text" value={formData.room} readOnly className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Event Description</label>
            <textarea value={formData.description} readOnly className="w-full px-4 py-3 border border-slate-300 rounded-lg h-24" />
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

// ===================================================================================
// STEP 2: ADD SPEAKERS
// ===================================================================================

function AddSpeakersStep() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [formData, setFormData] = useState({ name: '', session: '', duration: '' });

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    const addSpeaker = (speaker: Speaker, delay: number, nextFormData: any) => {
      timeouts.push(setTimeout(() => {
        setFormData({ name: speaker.name, session: speaker.session, duration: speaker.duration });
      }, delay));
      timeouts.push(setTimeout(() => {
        setSpeakers(prev => [...prev, speaker]);
        if (nextFormData) {
          setFormData(nextFormData);
        } else {
          setFormData({ name: '', session: '', duration: '' });
        }
      }, delay + 1300));
    };

    addSpeaker({ id: 1, name: 'Sarah Martinez', session: 'Project Overview', duration: '20 min', initials: 'SM' }, 500, { name: 'Alex Chen', session: '', duration: '' });
    addSpeaker({ id: 2, name: 'Alex Chen', session: 'Technical Architecture', duration: '25 min', initials: 'AC' }, 2500, { name: 'Jessica Park', session: '', duration: '' });
    addSpeaker({ id: 3, name: 'Jessica Park', session: 'Marketing Strategy', duration: '20 min', initials: 'JP' }, 4500, { name: 'Team Discussion', session: '', duration: '' });
    addSpeaker({ id: 4, name: 'Team Discussion', session: 'Q&A and Next Steps', duration: '25 min', initials: 'TD' }, 6500, null);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Add Speakers & Sessions</h2>
          <p className="text-slate-600">Configure your event agenda and timing</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Add New Speaker</h3>
            <div className="space-y-4 p-6 bg-slate-50 rounded-lg">
              <input type="text" value={formData.name} readOnly placeholder="Speaker name..." className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
              <input type="text" value={formData.session} readOnly placeholder="Session title..." className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
              <input type="text" value={formData.duration} readOnly placeholder="Duration (e.g., 20 min)..." className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium">Add Speaker</button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Event Agenda</h3>
            <div className="space-y-3">
              {speakers.map((speaker) => (
                <div key={speaker.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm animate-fade-in">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold text-sm">{speaker.initials}</span>
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
                <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-200 rounded-lg">
                  <SvgAssets.AddUser />
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

// ===================================================================================
// STEP 3: SPEAKER NOTES
// ===================================================================================

function SpeakerNotesStep() {
  const [selectedSpeaker, setSelectedSpeaker] = useState('Sarah Martinez');
  const [notes, setNotes] = useState<SpeakerNote[]>([]);
  const [formData, setFormData] = useState<SpeakerNote>({ time: '', content: '', type: 'essential' });
  const [charCount, setCharCount] = useState(0);

  const allNotes: NoteCollection = useMemo(() => ({
    'Sarah Martinez': [
      { time: '0:00', content: 'Welcome team, introduce Q1 launch timeline.', type: 'essential' },
      { time: '5:00', content: 'Present market research findings.', type: 'essential' },
      { time: '10:00', content: 'Demo new product features.', type: 'essential' },
      { time: '15:00', content: 'Discuss beta program (skip if running late).', type: 'optional' },
      { time: '18:00', content: 'Wrap up, prepare for Q&A transition.', type: 'transition' },
    ],
    'Alex Chen': [
      { time: '0:00', content: 'Briefly introduce the tech stack.', type: 'essential' },
      { time: '3:00', content: 'Walk through the primary service architecture diagram.', type: 'essential' },
      { time: '12:00', content: 'Highlight key performance improvements and benchmarks.', type: 'optional' },
      { time: '20:00', content: 'Hand over to Jessica for marketing.', type: 'transition' },
    ],
    'Jessica Park': [],
  }), []);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    setNotes([]); // Clear notes when speaker changes
    const notesForSpeaker = allNotes[selectedSpeaker];

    if (notesForSpeaker && notesForSpeaker.length > 0) {
      let delay = 500;
      notesForSpeaker.forEach(note => {
        timeouts.push(setTimeout(() => {
          setFormData(note);
          setCharCount(note.content.length);
        }, delay));
        delay += 1000;
        timeouts.push(setTimeout(() => {
          setNotes(prev => [...prev, note]);
          setFormData({ time: '', content: '', type: 'essential' });
          setCharCount(0);
        }, delay));
        delay += 1000;
      });
    }
    
    return () => timeouts.forEach(clearTimeout);
  }, [selectedSpeaker, allNotes]);

  const getNoteTypeColor = (type: string) => {
    switch (type) {
      case 'essential': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'optional': return 'bg-slate-50 border-slate-200 text-slate-600';
      case 'transition': return 'bg-purple-50 border-purple-200 text-purple-800';
      default: return 'bg-slate-50 border-slate-200 text-slate-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Setup Speaker Notes</h2>
          <p className="text-slate-600">Add time-synced speaking notes and cues</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Select Speaker</label>
              <select value={selectedSpeaker} onChange={(e) => setSelectedSpeaker(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg">
                <option>Sarah Martinez</option>
                <option>Alex Chen</option>
                <option>Jessica Park</option>
              </select>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">Add Speaking Note</h3>
              <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                <input type="text" value={formData.time} readOnly placeholder="Time marker (e.g., 5:00)..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                <div className="relative">
                  <textarea value={formData.content} readOnly placeholder="Speaking note or cue..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm h-24" />
                  <span className="absolute bottom-2 right-2 text-xs text-slate-400">{charCount} / 280</span>
                </div>
                <select value={formData.type} readOnly className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                  <option value="essential">Essential</option>
                  <option value="optional">Optional</option>
                  <option value="transition">Transition</option>
                </select>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium">Add Note</button>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Notes for {selectedSpeaker}</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
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
                <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-200 rounded-lg">
                  <SvgAssets.Notes />
                  {allNotes[selectedSpeaker]?.length > 0 ? "Loading notes..." : "No notes for this speaker."}
                </div>
              )}
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
  const [isRunning, setIsRunning] = useState(true);
  const [showSlackModal, setShowSlackModal] = useState(false);
  const [slackMessage, setSlackMessage] = useState('@alex I see Jennifer has had her hand raised for a bit. Take it now or wait for Q&A?');
  const [showSlackSuccess, setShowSlackSuccess] = useState(false);
  
  useEffect(() => {
    const slackTimeout = setTimeout(() => setShowSlackModal(true), 2000);
    return () => clearTimeout(slackTimeout);
  }, []);

  useEffect(() => {
    if (showSlackSuccess) {
      const closeTimeout = setTimeout(() => setShowSlackSuccess(false), 4000);
      return () => clearTimeout(closeTimeout);
    }
  }, [showSlackSuccess]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setTimeRemaining(prev => Math.max(0, prev - 1)), 1000);
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

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fade-in">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="text-center mb-8">
            <div className={`text-8xl font-mono font-bold mb-4 transition-colors ${getTimeColor()}`}>{formatTime(timeRemaining)}</div>
            <p className="text-slate-600 text-lg mb-6">Time Remaining for Current Session</p>
            <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000" style={{ width: `${Math.max(0, (timeRemaining / (20 * 60)) * 100)}%` }} />
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-900 mb-1">Sarah Martinez</h3>
              <p className="text-slate-600 mb-2">Project Overview & Timeline</p>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button onClick={() => setIsRunning(!isRunning)} className={`px-6 py-3 rounded-lg font-medium transition-all ${isRunning ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'}`}>
              {isRunning ? 'Pause Timer' : 'Resume Timer'}
            </button>
            <button onClick={() => setTimeRemaining(prev => prev + 300)} className="px-4 py-3 bg-blue-500 text-white rounded-lg font-medium">+5 min</button>
            <button onClick={() => setTimeRemaining(20 * 60)} className="px-6 py-3 bg-slate-500 text-white rounded-lg font-medium">Reset</button>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Team Status</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /><div><div className="text-sm font-medium">Moderator Ready</div><div className="text-xs text-slate-500">Mike (Room A)</div></div></div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg"><div className="w-2 h-2 bg-blue-500 rounded-full" /><div><div className="text-sm font-medium">Next Speaker</div><div className="text-xs text-slate-500">Alex (Preparing)</div></div></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button onClick={() => setShowSlackModal(true)} className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-left"><div className="font-medium">Send Slack Alert</div><div className="text-sm text-slate-500">Notify #launch-team</div></button>
              <button className="w-full p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-left"><div className="font-medium text-purple-900">Advance to Next Session</div><div className="text-sm text-purple-600">Technical Architecture</div></button>
            </div>
          </div>
        </div>
      </div>
      {showSlackModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><SvgAssets.SlackMessage /></div>
                  <h3 className="text-lg font-semibold text-slate-900">Send Slack Alert</h3>
                </div>
                <button onClick={() => setShowSlackModal(false)} className="text-slate-400 hover:text-slate-600"><SvgAssets.Close /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Channel</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg"><option>#launch-team</option></select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea value={slackMessage} onChange={(e) => setSlackMessage(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg h-24 text-sm" />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button onClick={() => { setShowSlackSuccess(true); setShowSlackModal(false); }} className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700">Send Alert</button>
                  <button onClick={() => setShowSlackModal(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSlackSuccess && (
        <div className="fixed top-24 right-6 z-50 animate-slide-in-right">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-4 max-w-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center"><SvgAssets.Checkmark /></div>
              <div className="flex-1">
                <div className="font-medium text-slate-900 mb-1">Alert Sent Successfully</div>
                <div className="text-sm text-slate-600 mb-2">#launch-team</div>
                <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">Message delivered to 8 team members</div>
              </div>
              <button onClick={() => setShowSlackSuccess(false)} className="text-slate-400 hover:text-slate-600 ml-2"><SvgAssets.Close /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===================================================================================
// STEP 5: POST-EVENT RECAP (NEW)
// ===================================================================================

function PostEventRecapStep() {
    const [stats, setStats] = useState({ viewers: 0, engagement: 0, duration: 0 });

    useEffect(() => {
        const timeouts: NodeJS.Timeout[] = [];
        timeouts.push(setTimeout(() => setStats({ viewers: 142, engagement: 0, duration: 0 }), 1000));
        timeouts.push(setTimeout(() => setStats({ viewers: 142, engagement: 87, duration: 0 }), 2000));
        timeouts.push(setTimeout(() => setStats({ viewers: 142, engagement: 87, duration: 88 }), 3000));
        return () => timeouts.forEach(clearTimeout);
    }, []);

    const topQuestions = [
        "What is the official release date for the new features?",
        "Will there be a beta testing program for enterprise customers?",
        "Can you share more details on the pricing tiers?",
    ];

    return (
        <div className="max-w-6xl mx-auto p-6 animate-fade-in">
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <div className="text-center mb-10">
                    <SvgAssets.Chart />
                    <h2 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Event Recap & Analytics</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">Key metrics from the 'Q1 Product Launch Planning' event. Use these insights to improve future presentations.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-10">
                    <div className="bg-slate-50 p-6 rounded-lg">
                        <div className="text-4xl font-bold text-indigo-600">{stats.viewers}</div>
                        <div className="text-sm font-medium text-slate-500 mt-1">Peak Concurrent Viewers</div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-lg">
                        <div className="text-4xl font-bold text-indigo-600">{stats.engagement}%</div>
                        <div className="text-sm font-medium text-slate-500 mt-1">Audience Engagement</div>
                    </div>
                     <div className="bg-slate-50 p-6 rounded-lg">
                        <div className="text-4xl font-bold text-indigo-600">{stats.duration} <span className="text-2xl">min</span></div>
                        <div className="text-sm font-medium text-slate-500 mt-1">Total Duration</div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-slate-900 mb-4">Top Audience Questions</h3>
                    <div className="space-y-3">
                        {topQuestions.map((q, index) => (
                            <div key={index} className="p-4 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 animate-fade-in" style={{animationDelay: `${3500 + index * 200}ms`}}>
                               {q}
                            </div>
                        ))}
                    </div>
                </div>

             </div>
        </div>
    );
}