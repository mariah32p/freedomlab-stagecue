import { useState, type FormEvent } from 'react';
import { Speaker, SpeakerNote } from '../types/event';
import { useTimeBlocks } from '../hooks/useTimeBlocks';

interface SpeakerNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  speaker: Speaker;
  notes: SpeakerNote[];
}

export function SpeakerNotesModal({ isOpen, onClose, speaker, notes }: SpeakerNotesModalProps) {
  const { addNote, updateNote, deleteNote } = useTimeBlocks();
  const [formData, setFormData] = useState({
    time_marker: '',
    content: '',
    type: 'essential' as SpeakerNote['type']
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingNote, setEditingNote] = useState<SpeakerNote | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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

      // Reset form
      setFormData({
        time_marker: '',
        content: '',
        type: 'essential'
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save note');
    } finally {
      setLoading(false);
    }
  };

  const parseTimeToSeconds = (timeString: string): number => {
    const parts = timeString.split(':');
    if (parts.length === 2) {
      const minutes = parseInt(parts[0]) || 0;
      const seconds = parseInt(parts[1]) || 0;
      return minutes * 60 + seconds;
    }
    // If just a number, treat as minutes
    return (parseInt(timeString) || 0) * 60;
  };

  const formatTimeMarker = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
    setFormData({
      time_marker: '',
      content: '',
      type: 'essential'
    });
  };

  const getNoteTypeColor = (type: SpeakerNote['type']) => {
    const colors = {
      essential: 'bg-blue-50 border-blue-200 text-blue-800',
      optional: 'bg-slate-50 border-slate-200 text-slate-600',
      transition: 'bg-purple-50 border-purple-200 text-purple-800'
    };
    return colors[type];
  };

  if (!isOpen) return null;

  const sortedNotes = [...notes].sort((a, b) => a.time_marker - b.time_marker);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-navy-900">Speaker Notes</h2>
              <p className="text-navy-600">{speaker.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Add/Edit Note Form */}
            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-4">
                {editingNote ? 'Edit Note' : 'Add Speaking Note'}
              </h3>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
                  {error}
                </div>
              )}

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
                    placeholder="Speaking note or cue..."
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
            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-4">
                Speaking Notes ({sortedNotes.length})
              </h3>
              
              {sortedNotes.length === 0 ? (
                <div className="text-center py-8 bg-slate-50 rounded-lg">
                  <svg className="w-8 h-8 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm text-navy-500">No notes yet</p>
                  <p className="text-xs text-navy-400 mt-1">Add time-synced speaking notes</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                  {sortedNotes.map((note) => (
                    <div key={note.id} className={`p-3 rounded-lg border ${getNoteTypeColor(note.type)}`}>
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
        </div>
      </div>
    </div>
  );
}