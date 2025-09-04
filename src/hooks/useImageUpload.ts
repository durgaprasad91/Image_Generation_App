import { useState, useEffect, useCallback } from 'react';
import { downscaleImage } from '../utils/imageUtils';
import { fileToDataUrl } from '../utils/fileUtils';

interface UseImageUploadResult {
  imageUrl: string | null; // This will now store a Data URL
  setImage: (file: File | null) => void;
  clearImage: () => void;
  error: string | null;
}

const useImageUpload = (): UseImageUploadResult => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setImage = useCallback(async (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setImageUrl(null);
      setError(null);
      return;
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only PNG and JPG are allowed.');
      setSelectedFile(null);
      setImageUrl(null);
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setError('File size exceeds 10MB limit.');
      setSelectedFile(null);
      setImageUrl(null);
      return;
    }

    setError(null);
    setSelectedFile(file);

    try {
      const img = new Image();
      img.src = URL.createObjectURL(file); // Temporary Blob URL for initial loading

      img.onload = async () => {
        URL.revokeObjectURL(img.src); // Revoke temporary Blob URL
        let finalImageUrl: string;

        if (img.width > 1920 || img.height > 1920) {
          // downscaleImage already returns a Blob URL, convert it to Data URL
          const downscaledBlobUrl = await downscaleImage(file);
          const response = await fetch(downscaledBlobUrl);
          const blob = await response.blob();
          finalImageUrl = await fileToDataUrl(blob);
          URL.revokeObjectURL(downscaledBlobUrl);
        } else {
          finalImageUrl = await fileToDataUrl(file);
        }
        setImageUrl(finalImageUrl);
      };
      img.onerror = () => {
        setError('Failed to load image.');
        setSelectedFile(null);
        setImageUrl(null);
        URL.revokeObjectURL(img.src); // Revoke temporary Blob URL
      };
    } catch (conversionError) {
      console.error("Error during image processing:", conversionError);
      setError('Failed to process image.');
      setSelectedFile(null);
      setImageUrl(null);
    }
  }, []);

  const clearImage = useCallback(() => {
    setSelectedFile(null);
    setImageUrl(null);
    setError(null);
  }, []);

  return {
    imageUrl,
    setImage,
    clearImage,
    error,
  };
};

export default useImageUpload;
