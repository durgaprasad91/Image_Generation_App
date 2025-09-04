import React from 'react';
import '../styles/PromptInput.css'; // Updated import for PromptInput-specific styles

interface PromptInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  return (
    <div className="prompt-input-container">
      <label htmlFor="prompt-input" className="sr-only">Enter your prompt</label>
      <input
        id="prompt-input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter your prompt here..."
        className="prompt-input-field"
        aria-label="User prompt input"
      />
    </div>
  );
};

export default PromptInput;
