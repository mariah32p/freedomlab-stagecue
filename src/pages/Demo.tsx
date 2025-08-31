import { useState, useEffect } from 'react';

export function StageCue() {
  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes
  const [currentMinute, setCurrentMinute] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);

  // Auto-play timer
  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        const elapsed = 1200 - newTime;
        setCurrentMinute(Math.floor(elapsed / 60) + 1);
        return Math.max(0, newTime);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  // Auto-advance speaker notes
  useEffect(() => {
    const noteInterval = setInterval(() => {
      setCurrentNoteIndex(prev => (prev + 1) % speakerNotes.length);
    }, 8000);

    return () => clearInterval(noteInterval);
  }, []);

  const speakerNotes = [
    { minute: 2, text: "Welcome audience and introduce topic", active: currentMinute >= 2 },
    { minute: 5, text: "Present first key concept with slides", active: currentMinute >= 5 },
    { minute: 8, text: "Show live demonstration", active: currentMinute >= 8 },
    { minute: 12, text: "Discuss real-world applications", active: currentMinute >= 12 },
    { minute: 15, text: "Address common challenges", active: currentMinute >= 15 },
    { minute: 18, text: "Prepare for Q&A transition", active: currentMinute >= 18 },
  ];

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(Math.abs(seconds) / 60).toString().padStart(2, '0');
    const secs = (Math.abs(seconds) % 60).toString().padStart(2, '0');
    return `${seconds < 0 ? '-' : ''}${mins}:${secs}`;
  };

  const getTimerColor = () => {
    if (timeRemaining <= 0) return 'text-red-500';
    if (timeRemaining <= 120) return 'text-red-400';
    if (timeRemaining <= 300) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const adjustTime = (seconds: number) => {
    setTimeRemaining(prev => Math.max(0, prev + seconds));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Floating Header */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">StageCue</span>
            <div className="flex items-center space-x-2 bg-emerald-500/20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-300 text-sm font-medium">Live Demo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Timer Display */}
          <div className="text-center mb-12">
            <div className="inline-block bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-white/90 mb-2">AI in Healthcare: Future Perspectives</h1>
                <p className="text-white/60">Dr. Sarah Chen • Main Auditorium • 247 attendees</p>
              </div>
              
              <div className={`text-8xl md:text-9xl font-mono font-bold tracking-wider mb-6 transition-all duration-1000 ${getTimerColor()}`}>
                {formatTime(timeRemaining)}
              </div>
              
              <div className="text-white/70 text-xl mb-8">Session Time Remaining</div>
              
              {/* Timer Controls */}
              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-110 hover:shadow-xl active:scale-95 ${
                    isRunning 
                      ? 'bg-amber-500 hover:bg-amber-400 text-white' 
                      : 'bg-emerald-500 hover:bg-emerald-400 text-white'
                  }`}
                >
                  {isRunning ? '⏸ Pause' : '▶ Start'}
                </button>
                <button
                  onClick={() => {
                    setTimeRemaining(1200);
                    setCurrentMinute(1);
                    setIsRunning(false);
                  }}
                  className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-110 hover:shadow-xl active:scale-95"
                >
                  ↻ Reset
                </button>
              </div>

              {/* Time Adjustment Controls */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-white/60 text-sm mb-4 font-medium">Quick Time Adjustments</div>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => adjustTime(-300)}
                    className="px-4 py-2 bg-red-500/80 hover:bg-red-400 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-110 active:scale-95"
                  >
                    -5m
                  </button>
                  <button
                    onClick={() => adjustTime(-60)}
                    className="px-4 py-2 bg-red-500/80 hover:bg-red-400 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-110 active:scale-95"
                  >
                    -1m
                  </button>
                  <button
                    onClick={() => adjustTime(60)}
                    className="px-4 py-2 bg-emerald-500/80 hover:bg-emerald-400 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-110 active:scale-95"
                  >
                    +1m
                  </button>
                  <button
                    onClick={() => adjustTime(300)}
                    className="px-4 py-2 bg-emerald-500/80 hover:bg-emerald-400 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-110 active:scale-95"
                  >
                    +5m
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Speaker Notes Timeline */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Speaker Notes Timeline</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {speakerNotes.map((note, index) => {
                  const isPast = currentMinute > note.minute;
                  const isCurrent = currentMinute === note.minute;
                  const isHighlighted = index === currentNoteIndex;
                  
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border-l-4 transition-all duration-700 transform hover:scale-102 hover:shadow-lg ${
                        isCurrent 
                          ? 'bg-emerald-500/20 border-emerald-400 shadow-lg animate-pulse' 
                          : isPast 
                          ? 'bg-white/5 border-slate-500 opacity-60' 
                          : isHighlighted
                          ? 'bg-blue-500/20 border-blue-400 shadow-lg'
                          : 'bg-white/10 border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-sm">
                          Minute {note.minute}
                        </span>
                        {isCurrent && (
                          <span className="text-xs bg-emerald-400 text-emerald-900 px-2 py-1 rounded-full font-bold animate-bounce">
                            NOW
                          </span>
                        )}
                        {isHighlighted && !isCurrent && !isPast && (
                          <span className="text-xs bg-blue-400 text-blue-900 px-2 py-1 rounded-full font-bold">
                            NEXT
                          </span>
                        )}
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed">{note.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Stats & Controls */}
            <div className="space-y-6">
              {/* Current Status */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Live Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-emerald-500/20 rounded-lg">
                    <span className="text-white/90 font-medium">Current Minute</span>
                    <span className="text-emerald-400 font-bold text-lg">{currentMinute}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg">
                    <span className="text-white/90 font-medium">Progress</span>
                    <span className="text-blue-400 font-bold">{Math.round(((1200 - timeRemaining) / 1200) * 100)}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-500/20 rounded-lg">
                    <span className="text-white/90 font-medium">Attendees</span>
                    <span className="text-purple-400 font-bold">247</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 bg-blue-500/80 hover:bg-blue-400 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95">
                    📢 Send 5-min Warning
                  </button>
                  <button className="w-full p-3 bg-purple-500/80 hover:bg-purple-400 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95">
                    💬 Message Speaker
                  </button>
                  <button className="w-full p-3 bg-amber-500/80 hover:bg-amber-400 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95">
                    🔔 Notify Team
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Session Progress</h3>
                <div className="relative">
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-emerald-400 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${((1200 - timeRemaining) / 1200) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-white/60 mt-2">
                    <span>Start</span>
                    <span>20 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info Panel */}
          <div className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Precision Timing</h3>
                <p className="text-white/70 text-sm">Millisecond accuracy with automatic speaker alerts</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Team Coordination</h3>
                <p className="text-white/70 text-sm">Real-time Slack notifications and team alerts</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Speaker Portal</h3>
                <p className="text-white/70 text-sm">Dedicated speaker interfaces with personal timers</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to run flawless events?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Join event professionals who trust StageCue for precision timing and seamless coordination
              </p>
              <button 
                onClick={() => window.location.href = '/signup'}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300"
              >
                Start Free Trial
              </button>
              <p className="text-white/60 mt-4 text-sm">
                7-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}