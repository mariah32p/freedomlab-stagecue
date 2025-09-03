import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTimeBlocks } from '../hooks/useTimeBlocks';
import { SpeakerNote } from '../types/event';

export function SpeakerPortal() {
  const { speakerId } = useParams<{ speakerId: string }>();
  const { speakers, notes, addNote, updateNote, deleteNote, getNotesForSpeaker } = useTimeBlocks();
  const [formData, setFormData] = useState({
    time_marker: '',
    content: '',
    type: 'essential' as SpeakerNote['type']
  });
  const [editingNote, setEditingNote] = useState<SpeakerNote | null>(null);
  const [loading, setLoading] = useState(false);

  const speaker = speakers.find(s => s.id === speakerId);
  const speakerNotes = speaker ? getNotesForSpeaker(speaker.id) : [];

  const parseTimeToSeconds = (timeString: string): number => {
    const parts = timeString.split(':');
    if (parts.length === 2) {
      const minutes = parseInt(parts[0]) || 0;
      const seconds = parseInt(parts[1]) || 0;
      return minutes * 60 + seconds;
    }
    return (parseInt(timeString) || 0) * 60;
  };

  const formatTimeMarker = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!speaker) return;

    setLoading(true);
    try {
      const timeInSeconds = parseTimeToSeconds(formData.time_marker);
      
      if (editingNote) {
        await updateNote(editingNote.id, {
          time_marker: timeInSeconds,
          content: formData.content,
          type: formData.type
        });
        setEditingNote(null);
      } else {
        await addNote({
          speaker_id: speaker.id,
          time_marker: timeInSeconds,
          content: formData.content,
          type: formData.type
        });
      }

      setFormData({ time_marker: '', content: '', type: 'essential' });
    } catch (err) {
      console.error('Error saving note:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditNote = (note: SpeakerNote) => {
    setEditingNote(note);
    setFormData({
      time_marker: formatTimeMarker(note.time_marker),
      content: note.content,
      type: note.type
    });
  };

  const handleDeleteNote = async (noteId: string) => {
    await deleteNote(noteId);
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setFormData({ time_marker: '', content: '', type: 'essential' });
  };

  const getNoteTypeColor = (type: SpeakerNote['type']) => {
    const colors = {
      essential: 'bg-blue-50 border-blue-200 text-blue-800',
      optional: 'bg-slate-50 border-slate-200 text-slate-600',
      transition: 'bg-purple-50 border-purple-200 text-purple-800'
    };
    return colors[type];
  };

  if (!speaker) {
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
            Manage your speaking notes and preparation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add/Edit Note Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-navy-900 mb-6">
              {editingNote ? 'Edit Speaking Note' : 'Add Speaking Note'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="time-marker" className="block text-sm font-medium text-navy-700 mb-2">
                  Time Marker *
                </label>
                <input
                  id="time-marker"
                  type="text"
                  required
                  className="input"
                  placeholder="5:30 or 5 (minutes)"
                  value={formData.time_marker}
                  onChange={(e) => setFormData(prev => ({ ...prev, time_marker: e.target.value }))}
                />
                <p className="text-xs text-navy-500 mt-1">
                  Format: MM:SS or just minutes (e.g., "5:30" or "5")
                </p>
              </div>

              <div>
                <label htmlFor="note-content" className="block text-sm font-medium text-navy-700 mb-2">
                  Note Content *
                </label>
                <textarea
                  id="note-content"
                  required
                  className="input h-24 resize-none"
                  placeholder="Speaking note or reminder..."
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="note-type" className="block text-sm font-medium text-navy-700 mb-2">
                  Note Type *
                </label>
                <select
                  id="note-type"
                  required
                  className="input"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as SpeakerNote['type'] }))}
                >
                  <option value="essential">Essential - Must cover</option>
                  <option value="optional">Optional - Skip if running late</option>
                  <option value="transition">Transition - Handoff cue</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                {editingNote && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="flex-1 btn btn-outline py-3"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn btn-primary py-3"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {editingNote ? 'Updating...' : 'Adding...'}
                    </div>
                  ) : (
                    editingNote ? 'Update Note' : 'Add Note'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Notes List */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-navy-900 mb-6">
              Your Speaking Notes ({speakerNotes.length})
            </h2>
            
            {speakerNotes.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-xl">
                <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-navy-900 mb-2">No notes yet</h3>
                <p className="text-navy-600">Add time-synced speaking notes to help with your presentation</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {speakerNotes.map((note) => (
                  <div key={note.id} className={`p-4 rounded-lg border ${getNoteTypeColor(note.type)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {formatTimeMarker(note.time_marker)}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-white/50 rounded capitalize">
                          {note.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleEditNote(note)}
                          className="text-xs px-2 py-1 bg-white/70 hover:bg-white rounded text-navy-600 hover:text-navy-800 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="text-sm">{note.content}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Session Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-4">Session Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-navy-700 mb-2">Speaker Details</h3>
              <div className="space-y-2 text-sm text-navy-600">
                <div><strong>Name:</strong> {speaker.name}</div>
                {speaker.email && <div><strong>Email:</strong> {speaker.email}</div>}
                {speaker.bio && <div><strong>Bio:</strong> {speaker.bio}</div>}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-navy-700 mb-2">Preparation Tips</h3>
              <div className="space-y-2 text-sm text-navy-600">
                <div>• <strong>Essential notes:</strong> Must-cover content</div>
                <div>• <strong>Optional notes:</strong> Skip if running behind</div>
                <div>• <strong>Transition notes:</strong> Handoff cues to next speaker</div>
                <div>• Time markers help you stay on track during your presentation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}