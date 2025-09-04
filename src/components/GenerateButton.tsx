import React from 'react';
import '../styles/GenerateButton.css'; // Updated import for GenerateButton-specific styles

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  onAbort: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading, onAbort }) => {
  return (
    <div className="generate-button-container">
      {!isLoading ? (
        <button
          onClick={onClick}
          className="generate-button"
          aria-label="Generate image"
        >
          Generate
        </button>
      ) : (
        <div className="loading-state">
          <button
            onClick={onAbort}
            className="abort-button"
            aria-label="Abort image generation"
          >
            Abort
          </button>
          <div className="spinner-wrapper">
            <svg className="spinner-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="generating-text">Generating...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateButton;
