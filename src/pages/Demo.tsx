import {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import type { FC, ReactNode } from "react";

// --- TYPES & MOCK DATA (Typically in separate files) ---

interface Speaker {
  id: string;
  name: string;
  title: string;
  avatar: string; // URL to avatar image
}

interface SpeakerNote {
  id: string;
  // Time in seconds from the start of the presentation
  timestamp: number;
  note: string;
}

interface Session {
  id: string;
  title: string;
  speakerId: string;
  // Duration in seconds
  duration: number;
  notes: SpeakerNote[];
}

interface EventData {
  id: string;
  name: string;
  sessions: Session[];
}

// --- Mock Data ---
const MOCK_SPEAKERS: Speaker[] = [
  {
    id: "spk_1",
    name: "Dr. Anya Sharma",
    title: "Lead AI Researcher",
    avatar: "👩‍🔬",
  },
  {
    id: "spk_2",
    name: "Ben Carter",
    title: "UX Design Lead, Orbit Inc.",
    avatar: "👨‍🎨",
  },
  {
    id: "spk_3",
    name: "Chloe Davis",
    title: "Quantum Computing Evangelist",
    avatar: "👩‍💻",
  },
];

const MOCK_EVENT: EventData = {
  id: "evt_1",
  name: "Future Forward Tech Summit 2025",
  sessions: [
    {
      id: "ses_1",
      title: "The Ethics of Generative AI",
      speakerId: "spk_1",
      duration: 1200, // 20 minutes
      notes: [
        { id: "n1", timestamp: 60, note: "Opening statement & hook." },
        { id: "n2", timestamp: 300, note: "Introduce Case Study 1: Healthcare." },
        { id: "n3", timestamp: 720, note: "Discuss societal impact data." },
        { id: "n4", timestamp: 1080, note: "Begin wrap-up and Q&A transition." },
      ],
    },
    {
      id: "ses_2",
      title: "Designing for the Next Billion Users",
      speakerId: "spk_2",
      duration: 1800, // 30 minutes
      notes: [
        { id: "n1", timestamp: 120, note: "Core principles of inclusive design." },
        { id: "n2", timestamp: 600, note: "Showcase accessibility fails." },
        { id: "n3", timestamp: 1200, note: "Live demo of new prototyping tool." },
        { id: "n4", timestamp: 1680, note: "Final call to action." },
      ],
    },
    {
      id: "ses_3",
      title: "Quantum Leaps in Modern Computing",
      speakerId: "spk_3",
      duration: 900, // 15 minutes
      notes: [
        { id: "n1", timestamp: 60, note: "Explain superposition with analogy." },
        { id: "n2", timestamp: 300, note: "Future applications: cryptography." },
        { id: "n3", timestamp: 780, note: "Concluding thoughts." },
      ],
    },
  ],
};

// --- CENTRALIZED STATE (React Context API) ---

interface AppContextType {
  event: EventData;
  speakers: Speaker[];
  liveSessionId: string | null;
  getSpeakerById: (id: string) => Speaker | undefined;
  getSessionById: (id: string) => Session | undefined;
  setLiveSession: (sessionId: string | null) => void;
  sendSpeakerMessage: (message: string) => void;
  speakerMessage: { text: string; id: number } | null;
}

const AppContext = createContext<AppContextType | null>(null);

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [event] = useState<EventData>(MOCK_EVENT);
  const [speakers] = useState<Speaker[]>(MOCK_SPEAKERS);
  const [liveSessionId, setLiveSessionId] = useState<string | null>(null);
  const [speakerMessage, setSpeakerMessage] = useState<{
    text: string;
    id: number;
  } | null>(null);

  const getSpeakerById = useCallback(
    (id: string) => speakers.find((s) => s.id === id),
    [speakers],
  );

  const getSessionById = useCallback(
    (id: string) => event.sessions.find((s) => s.id === id),
    [event.sessions],
  );

  // FIX #1: Wrap state setters in useCallback to give them a stable identity
  const setLiveSession = useCallback((sessionId: string | null) => {
    setLiveSessionId(sessionId);
    setSpeakerMessage(null); // Clear message when session changes
  }, []);

  const sendSpeakerMessage = useCallback((text: string) => {
    console.log(`Sending message to speaker: "${text}"`);
    setSpeakerMessage({ text, id: Date.now() });
  }, []);

  const value = useMemo(
    () => ({
      event,
      speakers,
      liveSessionId,
      getSpeakerById,
      getSessionById,
      setLiveSession, // This function is now stable
      sendSpeakerMessage, // This function is now stable
      speakerMessage,
    }),
    // FIX #1 (continued): Add the stable functions to the dependency array
    [
      event,
      speakers,
      liveSessionId,
      speakerMessage,
      getSpeakerById,
      getSessionById,
      setLiveSession,
      sendSpeakerMessage,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// --- CUSTOM TIMER HOOK ---

interface UseTimerOptions {
  duration: number;
  onEnd?: () => void;
}

const useTimer = ({ duration, onEnd }: UseTimerOptions) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setTimeRemaining(duration);
    setIsRunning(false);
    setIsPaused(false);
  }, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining <= 0 && isRunning) {
      setIsRunning(false);
      onEnd?.();
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeRemaining, onEnd]);

  const start = useCallback(() => {
    if (timeRemaining > 0) {
      setIsRunning(true);
      setIsPaused(false);
    }
  }, [timeRemaining]);

  const pause = () => setIsPaused((p) => !p);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeRemaining(duration);
  }, [duration]);

  const adjustTime = (seconds: number) =>
    setTimeRemaining((prev) => Math.max(0, prev + seconds));

  return {
    timeRemaining,
    isRunning,
    isPaused,
    start,
    pause,
    reset,
    adjustTime,
    elapsedTime: duration - timeRemaining,
  };
};

// --- UTILITY FUNCTIONS ---

const formatTime = (seconds: number) => {
  const isNegative = seconds < 0;
  const absSeconds = Math.abs(seconds);
  const mins = Math.floor(absSeconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (absSeconds % 60).toString().padStart(2, "0");
  return `${isNegative ? "-" : ""}${mins}:${secs}`;
};

const getTimerColor = (seconds: number) => {
  if (seconds <= 0) return "text-red-400";
  if (seconds <= 60) return "text-red-500"; // 1 min
  if (seconds <= 300) return "text-yellow-400"; // 5 mins
  return "text-white";
};

// --- UI COMPONENTS ---

const Card: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`bg-white rounded-2xl shadow-lg border border-slate-200 p-6 ${className}`}
  >
    {children}
  </div>
);

const SectionTitle: FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="text-xl font-bold text-slate-900 mb-6">{children}</h2>
);

const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button
    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none ${className}`}
    {...props}
  >
    {children}
  </button>
);

// --- PAGE COMPONENTS ---

const Dashboard = () => {
  const { event, speakers } = useAppContext();
  return (
    <div className="space-y-8">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{event.name}</h1>
            <p className="text-slate-600 mt-1">
              Welcome to your event dashboard.
            </p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            + New Event
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {event.sessions.length}
            </div>
            <div className="text-sm text-blue-700 font-medium">
              Total Sessions
            </div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {speakers.length}
            </div>
            <div className="text-sm text-purple-700 font-medium">
              Unique Speakers
            </div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
            <div className="text-3xl font-bold text-teal-600 mb-2">
              {formatTime(
                event.sessions.reduce((acc, s) => acc + s.duration, 0),
              )}
            </div>
            <div className="text-sm text-teal-700 font-medium">
              Total Runtime
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <SectionTitle>Today's Agenda</SectionTitle>
        <p className="text-slate-500">
          Go to the 'Live Moderator' tab to start a session.
        </p>
      </Card>
    </div>
  );
};

const LiveModeratorView = () => {
  const {
    event,
    getSpeakerById,
    liveSessionId,
    getSessionById,
    setLiveSession,
    sendSpeakerMessage,
  } = useAppContext();
  const liveSession = getSessionById(liveSessionId || "");
  const speaker = getSpeakerById(liveSession?.speakerId || "");

  const {
    timeRemaining,
    isRunning,
    isPaused,
    start,
    pause,
    reset,
    adjustTime,
    elapsedTime,
  } = useTimer({
    duration: liveSession?.duration || 0,
    onEnd: () => sendSpeakerMessage("Time's up! Please wrap up."),
  });

  const getNoteStatus = (timestamp: number) => {
    const buffer = 15; // seconds before a note becomes 'current'
    if (elapsedTime > timestamp) return "past";
    if (elapsedTime >= timestamp - buffer && elapsedTime <= timestamp + 60)
      return "current"; // current for a minute
    return "future";
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Timer and Controls */}
      <div className="lg:col-span-2 space-y-6">
        {!liveSession ? (
          <Card className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-700">
                No Active Session
              </p>
              <p className="text-slate-500 mt-2">
                Select a session from the agenda to begin.
              </p>
            </div>
          </Card>
        ) : (
          speaker && (
            <>
              <Card>
                <h1 className="text-3xl font-bold text-slate-900">
                  {liveSession.title}
                </h1>
                <p className="text-slate-600 mt-1">
                  {speaker.name} • {speaker.title}
                </p>
              </Card>
              <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 text-center">
                <div
                  className={`text-8xl font-mono font-bold tracking-wider ${getTimerColor(
                    timeRemaining,
                  )}`}
                >
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-white/80 text-xl font-medium mt-4">
                  Session Time Remaining
                </div>
                <div className="mt-8 flex justify-center space-x-4">
                  <Button
                    onClick={start}
                    disabled={isRunning && !isPaused}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    ▶ Start
                  </Button>
                  <Button
                    onClick={pause}
                    disabled={!isRunning}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    {isPaused ? "Resume" : "❚❚ Pause"}
                  </Button>
                  <Button
                    onClick={reset}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    ↻ Reset
                  </Button>
                </div>
                <div className="mt-6 bg-white/10 p-4 rounded-xl">
                  <div className="flex justify-center space-x-2">
                    <button onClick={() => adjustTime(-60)} className="timer-adj-btn">-1m</button>
                    <button onClick={() => adjustTime(-10)} className="timer-adj-btn">-10s</button>
                    <button onClick={() => adjustTime(10)} className="timer-adj-btn">+10s</button>
                    <button onClick={() => adjustTime(60)} className="timer-adj-btn">+1m</button>
                    <style>{`.timer-adj-btn { background: rgba(255,255,255,0.2); color: white; padding: 8px 16px; border-radius: 8px; font-weight: 500; transition: all 0.2s; } .timer-adj-btn:hover { background: rgba(255,255,255,0.4); }`}</style>
                  </div>
                </div>
              </div>
              <Card>
                <SectionTitle>Speaker Notes Timeline</SectionTitle>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {liveSession.notes.map((note) => {
                    const status = getNoteStatus(note.timestamp);
                    const statusStyles = {
                      current: "bg-green-50 border-green-500",
                      past: "bg-slate-50 border-slate-300 opacity-60",
                      future: "bg-blue-50 border-blue-500",
                    };
                    return (
                      <div
                        key={note.id}
                        className={`p-4 rounded-lg border-l-4 transition-all duration-500 ${statusStyles[status]}`}
                      >
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="font-bold text-sm text-slate-800">
                            @{formatTime(note.timestamp)}
                          </span>
                          {status === "current" && (
                            <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full animate-pulse">
                              Now
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-700">{note.note}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </>
          )
        )}
      </div>

      {/* Agenda & Messaging */}
      <div className="space-y-6">
        <Card>
          <SectionTitle>Agenda</SectionTitle>
          <div className="space-y-3">
            {event.sessions.map((session) => {
              const speaker = getSpeakerById(session.speakerId);
              const isLive = session.id === liveSessionId;
              return (
                <div
                  key={session.id}
                  className={`p-4 rounded-xl border-l-4 transition-all duration-300 ${
                    isLive
                      ? "bg-green-100 border-green-500 shadow-md"
                      : "bg-slate-50 border-slate-300 hover:bg-slate-100 cursor-pointer"
                  }`}
                  onClick={() => !isLive && setLiveSession(session.id)}
                >
                  <h3 className="font-semibold text-slate-900">
                    {session.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {speaker?.name} • {formatTime(session.duration)}
                  </p>
                  {isLive && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click from bubbling to parent div
                        setLiveSession(null);
                      }}
                      className="text-xs mt-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                    >
                      End Session
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
        <Card>
          <SectionTitle>Message Speaker</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            {[
              "5 mins left", "2 mins left", "Wrap up now",
              "Great pace!", "Speak louder", "Closer to mic",
            ].map((msg) => (
              <button
                key={msg}
                onClick={() => sendSpeakerMessage(msg)}
                disabled={!liveSession}
                className="text-sm p-3 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg transition disabled:opacity-50 disabled:hover:bg-blue-50"
              >
                {msg}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const SpeakerPortal = () => {
  const { getSessionById, getSpeakerById, liveSessionId, speakerMessage } = useAppContext();
  const liveSession = getSessionById(liveSessionId || "");
  const speaker = getSpeakerById(liveSession?.speakerId || "");

  const { timeRemaining, elapsedTime, start, isRunning } = useTimer({
    duration: liveSession?.duration || 0,
  });

  // FIX #2: Correctly start the timer when the session goes live
  useEffect(() => {
    if (liveSessionId && !isRunning) {
      start();
    }
  }, [liveSessionId, isRunning, start]);

  const getNoteStatus = (timestamp: number) => {
    if (elapsedTime > timestamp) return "past";
    if (elapsedTime >= timestamp && elapsedTime < timestamp + 60) return "current";
    return "future";
  };

  if (!liveSession || !speaker) {
    return (
      <Card className="text-center py-20">
        <h1 className="text-3xl font-bold text-slate-800">Welcome, Speaker!</h1>
        <p className="text-slate-500 mt-2">
          Your session is not live yet. Please stand by.
        </p>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Live: {liveSession.title}
        </h1>
        <p className="text-slate-600 mt-1">Good luck, {speaker.name}!</p>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-2xl p-8 text-center sticky top-24">
            <div
              className={`text-7xl font-mono font-bold tracking-wider ${getTimerColor(
                timeRemaining,
              )}`}
            >
              {formatTime(timeRemaining)}
            </div>
            <div className="text-white/70 text-lg font-medium mt-3">
              Time Remaining
            </div>
          </div>
          <Card>
            <SectionTitle>Messages from Moderator</SectionTitle>
            {speakerMessage ? (
              <div
                key={speakerMessage.id}
                className="p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg animate-pulse"
              >
                <p className="font-semibold text-yellow-900">
                  {speakerMessage.text}
                </p>
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No new messages.</p>
            )}
          </Card>
        </div>

        <Card>
          <SectionTitle>Your Notes</SectionTitle>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {liveSession.notes.map((note) => {
              const status = getNoteStatus(note.timestamp);
              const statusStyles = {
                current: "bg-green-100 border-green-500 scale-105 shadow-lg",
                past: "bg-slate-100 border-slate-300 opacity-50",
                future: "bg-white border-slate-200",
              };
              return (
                <div
                  key={note.id}
                  className={`p-4 rounded-lg border-l-4 transition-all duration-700 ${statusStyles[status]}`}
                >
                  <p className="font-bold text-sm text-slate-500">
                    @{formatTime(note.timestamp)}
                  </p>
                  <p
                    className={`mt-1 ${
                      status === "current"
                        ? "font-semibold text-slate-900"
                        : "text-slate-700"
                    }`}
                  >
                    {note.note}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

type AppPage = "dashboard" | "moderator" | "speaker";

export function StageCue() {
  const [currentPage, setCurrentPage] = useState<AppPage>("dashboard");

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "moderator", label: "Live Moderator", icon: "🎯" },
    { id: "speaker", label: "Speaker Portal", icon: "🎤" },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "moderator":
        return <LiveModeratorView />;
      case "speaker":
        return <SpeakerPortal />;
      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 font-sans">
        <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-slate-900">
                    StageCue
                  </span>
                </div>
                <nav className="hidden md:flex space-x-1">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentPage(item.id as AppPage)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        currentPage === item.id
                          ? "bg-teal-100 text-teal-700"
                          : "text-slate-600 hover:text-teal-600 hover:bg-slate-100"
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderPage()}
        </main>
      </div>
    </AppProvider>
  );
}