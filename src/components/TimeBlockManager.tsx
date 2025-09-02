import { useState } from 'react';
import { Event, TimeBlock, Speaker } from '../types/event';
import { useTimeBlocks } from '../hooks/useTimeBlocks';
import { CreateTimeBlockModal } from './CreateTimeBlockModal';
import { AddSpeakerModal } from './AddSpeakerModal';
import { SpeakerNotesModal } from './SpeakerNotesModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';

interface TimeBlockManagerProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export function TimeBlockManager({ event, isOpen, onClose }: TimeBlockManagerProps) {
  const { 
    timeBlocks, 
    speakers, 
    loading,
    addTimeBlock,
    updateTimeBlock,
    deleteTimeBlock,
    addSpeaker,
    getSpeakersForBlock,
    getNotesForSpeaker
  } = useTimeBlocks(event.id);

  const [showCreateBlock, setShowCreateBlock] = useState(false);
  const [showAddSpeaker, setShowAddSpeaker] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<TimeBlock | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [editingBlock, setEditingBlock] = useState<TimeBlock | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; block: TimeBlock | null }>({
    show: false,
    block: null
  });

  const eventBlocks = timeBlocks.filter(block => block.event_id === event.id)
    .sort((a, b) => a.order_index - b.order_index);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}`;
    }
    return `${mins} min`;
  };

  const getBlockTypeColor = (type: TimeBlock['type']) => {
    const colors = {
      session: 'bg-blue-50 border-blue-200 text-blue-800',
      break: 'bg-green-50 border-green-200 text-green-800',
      qa: 'bg-purple-50 border-purple-200 text-purple-800',
      networking: 'bg-orange-50 border-orange-200 text-orange-800'
    };
    return colors[type] || colors.session;
  };

  const handleAddSpeaker = (block: TimeBlock) => {
    setSelectedBlock(block);
    setShowAddSpeaker(true);
  };

  const handleManageNotes = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setShowSpeakerNotes(true);
  };

  const handleDeleteBlock = (block: TimeBlock) => {
    setDeleteConfirm({ show: true, block });
  };

  const handleEditBlock = (block: TimeBlock) => {
    setEditingBlock(block);
    setEditTitle(block.title);
  };

  const handleSaveEdit = async () => {
    if (editingBlock && editTitle.trim()) {
      await updateTimeBlock(editingBlock.id, { title: editTitle.trim() });
      setEditingBlock(null);
      setEditTitle('');
    }
  };

  const handleCancelEdit = () => {
    setEditingBlock(null);
    setEditTitle('');
  };

  const handleMoveBlock = async (blockId: string, direction: 'up' | 'down') => {
    const currentIndex = eventBlocks.findIndex(b => b.id === blockId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= eventBlocks.length) return;

    // Swap order_index values
    const currentBlock = eventBlocks[currentIndex];
    const targetBlock = eventBlocks[newIndex];

    await updateTimeBlock(currentBlock.id, { order_index: targetBlock.order_index });
    await updateTimeBlock(targetBlock.id, { order_index: currentBlock.order_index });
  };
  const confirmDeleteBlock = async () => {
    if (deleteConfirm.block) {
      await deleteTimeBlock(deleteConfirm.block.id);
      setDeleteConfirm({ show: false, block: null });
    }
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-navy-900">{event.name}</h2>
              <p className="text-navy-600">Manage time blocks and speakers</p>
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

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Time Blocks List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-navy-900">Event Timeline</h3>
                <button
                  onClick={() => setShowCreateBlock(true)}
                  className="btn btn-primary px-4 py-2 text-sm"
                >
                  Add Time Block
                </button>
              </div>

              {eventBlocks.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-xl">
                  <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-lg font-medium text-navy-900 mb-2">No time blocks yet</h4>
                  <p className="text-navy-600 mb-4">Create time blocks to organize your event schedule</p>
                  <button
                    onClick={() => setShowCreateBlock(true)}
                    className="btn btn-primary px-6 py-3"
                  >
                    Create First Time Block
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {eventBlocks.map((block, index) => {
                    const blockSpeakers = getSpeakersForBlock(block.id);
                    
                    return (
                      <div key={block.id} className={`border-2 rounded-xl p-4 ${getBlockTypeColor(block.type)}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-sm font-medium opacity-75">
                                {formatTime(block.start_time)} - {formatTime(block.start_time + block.duration)}
                              </span>
                              <span className="text-xs px-2 py-1 bg-white/50 rounded capitalize font-medium">
                                {block.type}
                              </span>
                            </div>
                            <h4 className="text-lg font-semibold">{block.title}</h4>
                            <p className="text-sm opacity-75">{block.duration} minutes</p>
                            {editingBlock?.id === block.id ? (
                              <div className="flex items-center space-x-2 mb-2">
                                <input
                                  type="text"
                                  value={editTitle}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                  className="text-lg font-semibold bg-white/70 border border-white rounded px-2 py-1 flex-1"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveEdit();
                                    if (e.key === 'Escape') handleCancelEdit();
                                  }}
                                  autoFocus
                                />
                                <button
                                  onClick={handleSaveEdit}
                                  className="text-xs px-2 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded font-medium transition-colors"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded font-medium transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <h4 className="text-lg font-semibold">{block.title}</h4>
                            )}
                            <p className="text-sm opacity-75">{block.duration} minutes</p>
                            {editingBlock?.id === block.id ? (
                              <div className="flex items-center space-x-2 mb-2">
                                <input
                                  type="text"
                                  value={editTitle}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                  className="text-lg font-semibold bg-white/70 border border-white rounded px-2 py-1 flex-1"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveEdit();
                                    if (e.key === 'Escape') handleCancelEdit();
                                  }}
                                  autoFocus
                                />
                                <button
                                  onClick={handleSaveEdit}
                                  className="text-xs px-2 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded font-medium transition-colors"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded font-medium transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <h4 className="text-lg font-semibold">{block.title}</h4>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            {/* Move buttons */}
                            <div className="flex flex-col space-y-1">
                              <button
                                onClick={() => handleMoveBlock(block.id, 'up')}
                                disabled={index === 0}
                                className="text-xs px-2 py-1 bg-white/70 hover:bg-white rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Move up"
                              >
                                ↑
                              </button>
                              <button
                                onClick={() => handleMoveBlock(block.id, 'down')}
                                disabled={index === eventBlocks.length - 1}
                                className="text-xs px-2 py-1 bg-white/70 hover:bg-white rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Move down"
                              >
                                ↓
                              </button>
                            </div>
                            
                            <div className="flex flex-col space-y-1">
                              <button
                                onClick={() => handleEditBlock(block)}
                                className="text-xs px-2 py-1 bg-white/70 hover:bg-white rounded font-medium transition-colors"
                              >
                                Edit
                              </button>
                            <button
                              onClick={() => handleAddSpeaker(block)}
                              className="text-xs px-2 py-1 bg-white/70 hover:bg-white rounded font-medium transition-colors"
                            >
                              Speaker
                            </button>
                            </div>
                            
                            <button
                              onClick={() => handleDeleteBlock(block)}
                              className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded font-medium transition-colors"
                            >
                              Del
                            </button>
                          </div>
                        </div>

                        {/* Speakers in this block */}
                        {blockSpeakers.length > 0 && (
                          <div className="space-y-2">
                            {blockSpeakers.map((speaker) => {
                              const speakerNotes = getNotesForSpeaker(speaker.id);
                              
                              return (
                                <div key={speaker.id} className="bg-white/70 rounded-lg p-3 border border-white/50">
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="font-medium text-sm">{speaker.name}</div>
                                      {speaker.email && (
                                        <div className="text-xs opacity-75">{speaker.email}</div>
                                      )}
                                      {speakerNotes.length > 0 && (
                                        <div className="text-xs opacity-75 mt-1">
                                          {speakerNotes.length} note{speakerNotes.length !== 1 ? 's' : ''}
                                        </div>
                                      )}
                                    </div>
                                    <button
                                      onClick={() => handleManageNotes(speaker)}
                                      className="text-xs px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md font-medium transition-colors"
                                    >
                                      Manage Notes
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {blockSpeakers.length === 0 && block.type === 'session' && (
                          <div className="text-center py-4 border-2 border-dashed border-white/50 rounded-lg">
                            <p className="text-sm opacity-75 mb-2">No speakers assigned</p>
                            <button
                              onClick={() => handleAddSpeaker(block)}
                              className="text-xs px-3 py-1 bg-white/70 hover:bg-white rounded-md font-medium transition-colors"
                            >
                              Add Speaker
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sidebar - Event Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-navy-900 mb-4">Event Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-navy-600">Total Duration:</span>
                    <span className="font-medium">{formatTime(event.total_duration)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-navy-600">Time Blocks:</span>
                    <span className="font-medium">{eventBlocks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-navy-600">Total Speakers:</span>
                    <span className="font-medium">
                      {eventBlocks.reduce((total, block) => total + getSpeakersForBlock(block.id).length, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-navy-600">Status:</span>
                    <span className={`font-medium capitalize ${
                      event.status === 'live' ? 'text-green-600' : 
                      event.status === 'completed' ? 'text-blue-600' : 'text-navy-600'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Block Types Legend */}
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-navy-900 mb-4">Block Types</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Session - Presentations & talks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Break - Coffee, lunch, etc.</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Q&A - Question & answer</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Networking - Social time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <CreateTimeBlockModal
          isOpen={showCreateBlock}
          onClose={() => setShowCreateBlock(false)}
          onCreateBlock={addTimeBlock}
          event={event}
          existingBlocks={eventBlocks}
        />

        {selectedBlock && (
          <AddSpeakerModal
            isOpen={showAddSpeaker}
            onClose={() => {
              setShowAddSpeaker(false);
              setSelectedBlock(null);
            }}
            onAddSpeaker={addSpeaker}
            timeBlock={selectedBlock}
          />
        )}

        {selectedSpeaker && (
          <SpeakerNotesModal
            isOpen={showSpeakerNotes}
            onClose={() => {
              setShowSpeakerNotes(false);
              setSelectedSpeaker(null);
            }}
            speaker={selectedSpeaker}
            notes={getNotesForSpeaker(selectedSpeaker.id)}
          />
        )}

        <DeleteConfirmModal
          isOpen={deleteConfirm.show}
          onClose={() => setDeleteConfirm({ show: false, block: null })}
          onConfirm={confirmDeleteBlock}
          title="Delete Time Block"
          message={`Are you sure you want to delete "${deleteConfirm.block?.title}"? This will also remove all speakers and notes for this block.`}
        />
      </div>
    </div>
  );
}