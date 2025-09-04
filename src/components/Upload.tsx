import React, { useState, useEffect } from 'react';
import '../styles/Upload.css'; 

interface UploadProps {
  imageUrl: string | null;
  setImage: (file: File | null) => void;
  error: string | null;
}

const Upload: React.FC<UploadProps> = ({ imageUrl, setImage, error }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setFileName(file.name);
    } else {
      setImage(null);
      setFileName(null);
    }
  };

  useEffect(() => {
    if (!imageUrl) {
      setFileName(null);
    }
  }, [imageUrl]);

  return (
    <div className="upload-container card-style">
      <h2 className="upload-title">Upload Image</h2>
      <div className="upload-input-wrapper">
        <label htmlFor="file-upload" className="upload-input-label">Choose Image</label>
        <input
          id="file-upload"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="upload-input"
        />
        {fileName && <span className="upload-file-name">{fileName}</span>}
      </div>
      {error && <p className="error-message" role="alert">{error}</p>}
      {imageUrl && (
        <div className="upload-preview-wrapper">
          <img 
            id="preview-image" 
            src={imageUrl} 
            alt="Preview of selected image" 
            className="upload-preview-image" 
            aria-live="polite" 
            title={fileName ? `Selected image: ${fileName}` : "No image selected"} 
          />
        </div>
      )}
    </div>
  );
};

export default Upload;
