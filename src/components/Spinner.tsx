import React from 'react';
import '../styles/Spinner.css'; // Updated import for Spinner-specific styles

const Spinner: React.FC = () => {
  return (
    <div className="spinner-container" role="status">
      <div className="spinner-animation"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
