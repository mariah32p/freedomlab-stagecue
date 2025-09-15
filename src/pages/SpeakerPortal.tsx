import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSharedTimer } from '../hooks/useSharedTimer';
import { SpeakerNote } from '../types/event';

export function SpeakerPortal() {
  const { eventId, speakerId } = useParams<{ eventId: string; speakerId: string }>();
  const [speaker, setSpeaker] = useState<any>(null);
  const [speakerNotes, setSpeakerNotes] = useState('');
  const [originalNotes, setOriginalNotes] = useState('');
  const [currentBlock, setCurrentBlock] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);
  const { 
    timerState, 
    loading: timerLoading,
    formatTime, 
    getProgress 
  } = useSharedTimer(eventId || '', false); // false = speaker view

  // Fetch speaker data (mock data for now)
  useEffect(() => {
    const fetchSpeakerData = async () => {
      if (!speakerId || !eventId) return;
      
      try {
        // Mock data - in production this would be a public API call
        const mockSpeaker = {
          id: speakerId,
          name: 'Dr. Sarah Chen',
          email: 'sarah@example.com',
          bio: 'AI Research Scientist',
          time_block_id: '1'
        };
        
        const mockBlock = {
          id: '1',
          title: 'AI in Healthcare',
          duration: 30,
          type: 'session'
        };
        
        const mockNotes = [
          {
            id: '1',
            speaker_id: speakerId,
            time_marker: 300, // 5 minutes
            content: 'Introduce the new AI diagnostic tools',
            type: 'essential' as const,
            created_at: '2025-01-22T10:00:00Z'
          },
          {
            id: '2',
            speaker_id: speakerId,
            time_marker: 1200, // 20 minutes
            content: 'Wrap up and transition to Q&A',
            type: 'transition' as const,
            created_at: '2025-01-22T10:01:00Z'
          }
        ];
        
        setSpeaker(mockSpeaker);
        setCurrentBlock(mockBlock);
        
        // Load speaker's notes (simplified to single text block)
        const existingNotes = "Welcome everyone to today's session on AI in Healthcare.\n\n5:00 - Introduce the new diagnostic tools\n10:00 - Share research findings\n20:00 - Demo the AI system\n25:00 - Wrap up and prepare for Q&A";
        setSpeakerNotes(existingNotes);
        setOriginalNotes(existingNotes);
      } catch (error) {
        console.error('Error fetching speaker data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSpeakerData();
  }, [speakerId, eventId]);
  
  // Auto-save notes with debouncing
  useEffect(() => {
    if (speakerNotes === originalNotes) return;
    
    const saveTimer = setTimeout(async () => {
      setIsSaving(true);
      setSaveStatus('saving');
      
      try {
        // In production, this would save to Supabase
        // await supabase.from('speaker_notes').upsert({
        //   speaker_id: speakerId,
        //   content: speakerNotes
        // });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setOriginalNotes(speakerNotes);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(null), 2000);
      } catch (err) {
        console.error('Error saving notes:', err);
        setSaveStatus('error');
      } finally {
        setIsSaving(false);
      }
    }, 1000); // Save 1 second after user stops typing
    
    return () => clearTimeout(saveTimer);
  }, [speakerNotes, originalNotes, speakerId]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSpeakerNotes(e.target.value);
    if (saveStatus === 'error') {
      setSaveStatus(null);
    }
  };

  const handleSaveNow = async () => {
    setIsSaving(true);
    setSaveStatus('saving');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setOriginalNotes(speakerNotes);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (err) {
      console.error('Error saving notes:', err);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || timerLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-navy-600">Loading speaker portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-2xl font-bold text-white">
              {speaker.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">
            Welcome, {speaker.name}
          </h1>
          <p className="text-xl text-navy-600">
            {currentBlock?.title} - {currentBlock?.duration} minutes
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <a
              href={`/events/${eventId}`}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              ← Back to Event Management
            </a>
          </div>
        </div>

        {/* Live Timer Display */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-600">LIVE SESSION TIMER</span>
          </div>
          
          <div className={`text-4xl md:text-6xl font-mono font-bold mb-4 transition-colors duration-500 ${
            timerState.timeRemaining < 300 ? 'text-red-500 animate-pulse' : 'text-navy-900'
          }`}>
            {formatTime(timerState.timeRemaining)}
          </div>
          
          <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ${
                timerState.timeRemaining < 300 ? 'bg-red-500' : 'bg-gradient-to-r from-teal-500 to-purple-500'
              }`}
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
          
          <div className="text-sm text-navy-600">
            {timerState.isRunning && !timerState.isPaused ? 'Session in progress' : 
             timerState.isPaused ? 'Session paused' : 'Session not started'}
            {timerState.isRunning && (
              <span className="ml-2 text-green-600">• Live from moderator</span>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Speaker Notes */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-navy-900">
                Your Speaking Notes
              </h2>
              <div className="flex items-center space-x-2">
                {saveStatus === 'saving' && (
                  <div className="flex items-center text-sm text-blue-600">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600 mr-1"></div>
                    Saving...
                  </div>
                )}
                {saveStatus === 'saved' && (
                  <div className="flex items-center text-sm text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Saved
                  </div>
                )}
                {saveStatus === 'error' && (
                  <div className="flex items-center text-sm text-red-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Error saving
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <textarea
                className="w-full h-96 p-4 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-base leading-relaxed"
                placeholder="Add your speaking notes here...&#10;&#10;You can organize them however you like:&#10;• Key points to cover&#10;• Time markers (5:00 - introduce topic)&#10;• Reminders and cues&#10;• Transition notes"
                value={speakerNotes}
                onChange={handleNotesChange}
              />
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-navy-500">
                  {speakerNotes !== originalNotes ? 'Unsaved changes' : 'All changes saved'}
                </div>
                <button
                  onClick={handleSaveNow}
                  disabled={isSaving || speakerNotes === originalNotes}
                  className="btn btn-primary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save Now'}
                </button>
              </div>
            </div>
          </div>

        {/* Session Info & Tips */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-navy-900 mb-6">Session Information</h2>
            
            <div className="space-y-6">
              {/* Session Details */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-medium text-navy-900 mb-2">Your Session</h4>
                <div className="space-y-1 text-sm text-navy-600">
                  <div><strong>Session:</strong> {currentBlock?.title}</div>
                  <div><strong>Duration:</strong> {currentBlock?.duration} minutes</div>
                  <div><strong>Speaker:</strong> {speaker?.name}</div>
                </div>
              </div>
              
              {/* Tips */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">💡 Tips for Your Notes</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <div>• Add time markers: "5:00 - introduce topic"</div>
                  <div>• Mark key points you must cover</div>
                  <div>• Include transition cues for smooth handoffs</div>
                  <div>• Notes auto-save as you type</div>
                </div>
              </div>
              
              {/* Timer Status */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">🎤 Session Status</h4>
                <div className="text-sm text-green-800">
                  {timerState.isRunning && !timerState.isPaused ? (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                      Your session is live! Timer controlled by moderator.
                    </div>
                  ) : timerState.isPaused ? (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                      Session paused by moderator.
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mr-2"></div>
                      Waiting for moderator to start your session.
                    </div>
                  )}
                </div>
              </div>
              
              {/* Character Count */}
              <div className="space-y-1 text-sm text-navy-600">
                <div className="text-xs text-navy-500">
                  {speakerNotes.length} characters • {speakerNotes.split('\n').length} lines
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-navy-700 mb-2">During Your Session</h3>
              <div className="space-y-2 text-sm text-navy-600">
                <div>• The timer shows your remaining time</div>
                <div>• Moderator controls start/stop/extend</div>
                <div>• Timer updates in real-time across all devices</div>
                <div>• Use your notes as a reference during presentation</div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-navy-700 mb-2">Note Organization Tips</h3>
              <div className="space-y-2 text-sm text-navy-600">
                <div>• Add time markers: "10:00 - demo feature"</div>
                <div>• Mark essential vs optional content</div>
                <div>• Include transition cues for handoffs</div>
                <div>• Keep it simple - you'll be presenting!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}