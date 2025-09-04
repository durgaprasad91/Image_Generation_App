import React from 'react';
import '../styles/StyleDropdown.css'; // Updated import for StyleDropdown-specific styles

interface StyleDropdownProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StyleDropdown: React.FC<StyleDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="style-dropdown-container">
      <label htmlFor="style-select" className="sr-only">Choose an image style</label>
      <select
        id="style-select"
        value={value}
        onChange={onChange}
        className="style-dropdown-field"
        aria-label="Image style selection"
      >
        <option value="editorial">Editorial</option>
        <option value="streetwear">Streetwear</option>
        <option value="vintage">Vintage</option>
        <option value="">Other (Optional)</option>
      </select>
      <div className="style-dropdown-arrow">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  );
};

export default StyleDropdown;
