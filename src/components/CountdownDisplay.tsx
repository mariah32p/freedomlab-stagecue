import { useTimer } from '../hooks/useTimer';
import { Event, Speaker } from '../types/event';

interface CountdownDisplayProps {
  event: Event;
  speaker: Speaker;
  isFullscreen?: boolean;
}

export function CountdownDisplay({ event, speaker, isFullscreen = false }: CountdownDisplayProps) {
  const { timer, formatTime, getProgress } = useTimer(speaker.duration * 60);

  const containerClass = isFullscreen 
    ? "min-h-screen bg-gradient-to-br from-slate-900 to-navy-900 flex items-center justify-center p-8"
    : "bg-white rounded-xl shadow-lg border border-slate-200 p-8";

  const textColor = isFullscreen ? "text-white" : "text-navy-900";
  const secondaryTextColor = isFullscreen ? "text-slate-300" : "text-navy-600";

  return (
    <div className={containerClass}>
      <div className="text-center max-w-4xl mx-auto">
        {/* Event Info */}
        <div className="mb-8">
          <h1 className={`text-2xl md:text-4xl font-bold ${textColor} mb-2`}>
            {event.name}
          </h1>
          <p className={`text-lg md:text-xl ${secondaryTextColor}`}>
            {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Main Timer */}
        <div className="mb-8">
          <div className={`text-8xl md:text-9xl font-mono font-bold mb-4 ${
            timer.timeRemaining < 300 ? 'text-red-500 animate-pulse' : textColor
          }`}>
            {formatTime(timer.timeRemaining)}
          </div>
          <div className={`text-xl md:text-2xl ${secondaryTextColor} mb-6`}>
            Time Remaining
          </div>
          
          {/* Progress Bar */}
          <div className={`w-full ${isFullscreen ? 'bg-slate-700' : 'bg-slate-200'} rounded-full h-4 mb-6`}>
            <div 
              className={`h-4 rounded-full transition-all duration-1000 ${
                timer.timeRemaining < 300 
                  ? 'bg-red-500' 
                  : 'bg-gradient-to-r from-teal-500 to-purple-500'
              }`}
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* Current Speaker */}
        <div className={`${isFullscreen ? 'bg-slate-800/50' : 'bg-slate-50'} rounded-xl p-6 mb-8`}>
          <h2 className={`text-2xl md:text-3xl font-bold ${textColor} mb-2`}>
            {speaker.name}
          </h2>
          <p className={`text-lg md:text-xl ${secondaryTextColor} mb-2`}>
            {speaker.session_title}
          </p>
          <p className={`text-sm ${secondaryTextColor}`}>
            {speaker.duration} minutes allocated
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              timer.isRunning && !timer.isPaused ? 'bg-green-500 animate-pulse' : 'bg-slate-400'
            }`}></div>
            <span className={`text-sm ${secondaryTextColor}`}>
              {timer.isRunning && !timer.isPaused ? 'Live' : 'Paused'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className={`text-sm ${secondaryTextColor}`}>Moderator Online</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className={`text-sm ${secondaryTextColor}`}>Tech Support</span>
          </div>
        </div>

        {/* Fullscreen Toggle */}
        {!isFullscreen && (
          <div className="mt-6">
            <button
              onClick={() => {
                // In a real implementation, this would open a new window/tab
                window.open(`/countdown/${event.id}/${speaker.id}`, '_blank');
              }}
              className="btn btn-outline px-4 py-2 text-sm"
            >
              Open Fullscreen Display
            </button>
          </div>
        )}
      </div>
    </div>
  );
}