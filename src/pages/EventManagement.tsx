import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Event } from '../types/event';
import { useEvents } from '../hooks/useEvents';
import { useTimeBlocks } from '../hooks/useTimeBlocks';
import { EventDetailsStep } from '../components/EventDetailsStep';
import { SpeakerLineupStep } from '../components/SpeakerLineupStep';
import { EventLinksStep } from '../components/EventLinksStep';
import { UnsavedChangesModal } from '../components/UnsavedChangesModal.tsx';

type Step = 'details' | 'speakers' | 'links';

export function EventManagement() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { events, updateEvent } = useEvents();
  const { speakers, addSpeaker, updateSpeaker, deleteSpeaker } = useTimeBlocks(eventId);
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingStep, setPendingStep] = useState<Step | null>(null);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const event = events.find(e => e.id === eventId);

  useEffect(() => {
    if (!eventId) {
      navigate('/dashboard');
      return;
    }

    // Auto-advance to speakers step if event has basic details
    if (event && event.name && event.date) {
      const eventSpeakers = speakers.filter(s => s.time_block_id === eventId);
      if (eventSpeakers.length === 0) {
        setCurrentStep('speakers');
      } else {
        setCurrentStep('links');
      }
    }

    setLoading(false);
  }, [event, speakers, eventId, navigate]);

  const handleStepChange = (newStep: Step) => {
    if (hasUnsavedChanges) {
      setPendingStep(newStep);
      setShowUnsavedModal(true);
    } else {
      setCurrentStep(newStep);
    }
  };

  const handleDiscardChanges = () => {
    setHasUnsavedChanges(false);
    setShowUnsavedModal(false);
    if (pendingStep) {
      setCurrentStep(pendingStep);
      setPendingStep(null);
    }
  };

  const handleSaveAndContinue = () => {
    // This will be handled by each step component
    setShowUnsavedModal(false);
    
    // Trigger save action for current step
    if (typeof window.handleSaveAndContinue === 'function') {
      window.handleSaveAndContinue();
    }
    
    if (pendingStep) {
      setCurrentStep(pendingStep);
      setPendingStep(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy-900 mb-4">Event Not Found</h1>
          <p className="text-navy-600 mb-6">The requested event could not be found.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-primary px-6 py-3"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 'details', label: 'Event Details', icon: '📝' },
    { id: 'speakers', label: 'Speaker Lineup', icon: '🎤' },
    { id: 'links', label: 'Links & Go Live', icon: '🔗' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-navy-600 hover:text-navy-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-navy-900">{event.name || 'New Event'}</h1>
              <p className="text-navy-600">
                {event.date ? new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Set up your event details'}
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between max-w-2xl">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => handleStepChange(step.id as Step)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    currentStep === step.id
                      ? 'bg-teal-100 text-teal-700 font-semibold'
                      : index <= currentStepIndex
                      ? 'text-navy-600 hover:text-teal-600 hover:bg-teal-50'
                      : 'text-navy-400 cursor-not-allowed'
                  }`}
                >
                  <span className="text-lg">{step.icon}</span>
                  <span className="text-sm font-medium">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    index < currentStepIndex ? 'bg-teal-500' : 'bg-navy-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          {currentStep === 'details' && (
            <EventDetailsStep
              event={event}
              onUpdateEvent={updateEvent}
              onUnsavedChanges={setHasUnsavedChanges}
              onSaveAndContinue={() => handleStepChange('speakers')}
              onNext={() => setCurrentStep('speakers')}
            />
          )}
          
          {currentStep === 'speakers' && (
            <SpeakerLineupStep
              event={event}
              speakers={speakers.filter(s => s.time_block_id === eventId)}
              onAddSpeaker={addSpeaker}
              onUpdateSpeaker={updateSpeaker}
              onDeleteSpeaker={deleteSpeaker}
              onUnsavedChanges={setHasUnsavedChanges}
              onSaveAndContinue={() => handleStepChange('links')}
              onPrevious={() => setCurrentStep('details')}
              onNext={() => setCurrentStep('links')}
            />
          )}
          
          {currentStep === 'links' && (
            <EventLinksStep
              event={event}
              speakers={speakers.filter(s => s.time_block_id === eventId)}
              onUpdateEvent={updateEvent}
              onUnsavedChanges={setHasUnsavedChanges}
              onPrevious={() => setCurrentStep('speakers')}
            />
          )}
        </div>

        {/* Unsaved Changes Modal */}
        <UnsavedChangesModal
          isOpen={showUnsavedModal}
          onClose={() => {
            setShowUnsavedModal(false);
            setPendingStep(null);
          }}
          onDiscard={handleDiscardChanges}
          onSaveAndContinue={handleSaveAndContinue}
          pendingStep={pendingStep}
          currentStep={currentStep}
        />
      </div>
    </div>
  );
}