import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useEvents } from '../hooks/useEvents';
import { useTimeBlocks } from '../hooks/useTimeBlocks';
import { useTimer } from '../hooks/useTimer';

export function CountdownDisplay() {
  const { eventId, blockId } = useParams<{ eventId: string; blockId?: string }>();
  const { events } = useEvents();
  const { timeBlocks, getSpeakersForBlock } = useTimeBlocks(eventId);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  
  const event = events.find(e => e.id === eventId);
  const eventBlocks = timeBlocks.filter(b => b.event_id === eventId)
    .sort((a, b) => a.order_index - b.order_index);
  
  // If blockId is specified, find that block, otherwise use current index
  const currentBlock = blockId 
    ? eventBlocks.find(b => b.id === blockId)
    : eventBlocks[currentBlockIndex];
    
  const currentSpeakers = currentBlock ? getSpeakersForBlock(currentBlock.id) : [];
  const { timer, formatTime, getProgress } = useTimer(currentBlock ? currentBlock.duration * 60 : 0, true);

  // Auto-advance to next block when timer reaches zero
  useEffect(() => {
    if (timer.timeRemaining === 0 && !blockId) {
      const nextIndex = currentBlockIndex + 1;
      if (nextIndex < eventBlocks.length) {
        setCurrentBlockIndex(nextIndex);
      }
    }
  }, [timer.timeRemaining, currentBlockIndex, eventBlocks.length, blockId]);

  if (!event || !currentBlock) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-navy-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading event...</p>
        </div>
      </div>
    );
  }

  const getBlockTypeColor = (type: string) => {
    const colors = {
      session: 'from-teal-500 to-purple-500',
      break: 'from-green-500 to-emerald-500',
      qa: 'from-purple-500 to-indigo-500',
      networking: 'from-orange-500 to-red-500'
    };
    return colors[type as keyof typeof colors] || colors.session;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-navy-900 flex items-center justify-center p-8">
      <div className="text-center max-w-6xl mx-auto text-white">
        {/* Event Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{event.name}</h1>
          <p className="text-xl md:text-2xl text-slate-300">
            {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Main Timer */}
        <div className="mb-12">
          <div className={`text-8xl md:text-9xl font-mono font-bold mb-6 transition-colors duration-500 ${
            timer.timeRemaining < 300 ? 'text-red-400 animate-pulse' : 'text-white'
          }`}>
            {formatTime(timer.timeRemaining)}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-700 rounded-full h-6 mb-8 max-w-4xl mx-auto">
            <div 
              className={`h-6 rounded-full transition-all duration-1000 bg-gradient-to-r ${
                timer.timeRemaining < 300 ? 'from-red-500 to-red-600' : getBlockTypeColor(currentBlock.type)
              }`}
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
          
          <div className="text-2xl md:text-3xl text-slate-300 mb-2">
            {timer.timeRemaining < 60 ? 'Seconds Remaining' : 'Time Remaining'}
          </div>
        </div>

        {/* Current Block Info */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-700">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide bg-gradient-to-r ${getBlockTypeColor(currentBlock.type)} text-white`}>
              {currentBlock.type}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">{currentBlock.duration} minutes</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{currentBlock.title}</h2>
          
          {/* Speakers */}
          {currentSpeakers.length > 0 && (
            <div className="space-y-4">
              {currentSpeakers.map((speaker) => (
                <div key={speaker.id} className="text-center">
                  <h3 className="text-2xl md:text-3xl font-semibold text-teal-300">
                    {speaker.name}
                  </h3>
                  {speaker.bio && (
                    <p className="text-lg text-slate-400 mt-2 max-w-2xl mx-auto">
                      {speaker.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Next Up */}
        {!blockId && currentBlockIndex < eventBlocks.length - 1 && (
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-slate-300 mb-3">Next Up</h3>
            <div className="text-lg text-slate-400">
              {eventBlocks[currentBlockIndex + 1].title}
            </div>
          </div>
        )}

        {/* Status Indicators */}
        <div className="flex justify-center space-x-8 mt-8">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              timer.isRunning && !timer.isPaused ? 'bg-green-400 animate-pulse' : 'bg-slate-500'
            }`}></div>
            <span className="text-slate-400 text-sm">
              {timer.isRunning && !timer.isPaused ? 'Live' : 'Paused'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-slate-400 text-sm">Event Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <span className="text-slate-400 text-sm">StageCue</span>
          </div>
        </div>
      </div>
    </div>
  );
}