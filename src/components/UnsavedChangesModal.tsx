import { ReactNode } from 'react';

type Step = 'details' | 'speakers' | 'links';

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDiscard: () => void;
  onSaveAndContinue: () => void;
  pendingStep: Step | null;
  currentStep: Step;
}

export function UnsavedChangesModal({
  isOpen,
  onClose,
  onDiscard,
  onSaveAndContinue,
  pendingStep,
  currentStep
}: UnsavedChangesModalProps) {
  if (!isOpen || !pendingStep) return null;

  const stepNames = {
    details: 'Event Details',
    speakers: 'Speaker Lineup',
    links: 'Links & Go Live'
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-navy-900">Unsaved Changes</h3>
          </div>
          
          <p className="text-navy-600 mb-6">
            You have unsaved changes in {stepNames[currentStep]}. What would you like to do before moving to {stepNames[pendingStep]}?
          </p>
          
          <div className="flex space-x-3">
            <button
              onClick={onDiscard}
              className="flex-1 btn btn-outline px-4 py-2"
            >
              Discard Changes
            </button>
            <button
              onClick={onSaveAndContinue}
              className="flex-1 btn btn-primary px-4 py-2"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}