import React from 'react';
import '../styles/SummaryPreview.css'; // Updated import for SummaryPreview-specific styles

interface SummaryPreviewProps {
  imageUrl: string | null;
  prompt: string;
  style: string;
}

const SummaryPreview: React.FC<SummaryPreviewProps> = ({ imageUrl, prompt, style }) => {
  return (
    <div className="summary-preview-container">
      <h3 className="summary-preview-title">Summary Preview</h3>
      <div className="summary-preview-content">
        <div className="summary-preview-image-wrapper">
          {imageUrl ? (
            <img src={imageUrl} alt="Selected image preview" className="summary-preview-image" />
          ) : (
            <div className="no-image-placeholder">
              No image selected
            </div>
          )}
        </div>
        <div className="summary-preview-details">
          <div>
            <p className="summary-preview-label">Prompt:</p>
            <p className="summary-preview-text" aria-live="polite">{prompt || 'No prompt entered'}</p>
          </div>
          <div>
            <p className="summary-preview-label">Style:</p>
            <p className="summary-preview-text" aria-live="polite">{style || 'No style chosen'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPreview;
