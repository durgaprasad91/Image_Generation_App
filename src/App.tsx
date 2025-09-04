import React, { useState, useCallback } from 'react';
import './App.css';
import Upload from './components/Upload';
import PromptInput from './components/PromptInput';
import StyleDropdown from './components/StyleDropdown';
import SummaryPreview from './components/SummaryPreview';
import GenerateButton from './components/GenerateButton';
import HistoryList from './components/HistoryList';
import Spinner from './components/Spinner';
import useImageUpload from './hooks/useImageUpload';
import useMockApi from './hooks/useMockApi';
import useLocalStorage from './hooks/useLocalStorage';
import { fileToDataUrl } from './utils/fileUtils';

function App() {
  const { imageUrl, setImage, clearImage, error: imageUploadError } = useImageUpload();
  const { generateImage, isLoading, error: apiError } = useMockApi();
  const { history, addHistory, getHistory } = useLocalStorage();

  const [prompt, setPrompt] = useState<string>('');
  const [style, setStyle] = useState<string>('editorial');
  const [currentAbortController, setCurrentAbortController] = useState<AbortController | null>(null);

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStyle(event.target.value);
  };

  const handleGenerate = useCallback(async () => {
    if (!imageUrl) {
      alert('Please upload an image first.');
      return;
    }

    const controller = new AbortController();
    setCurrentAbortController(controller);

    try {
      const result = await generateImage({ imageDataUrl: imageUrl, prompt, style }, controller);
      addHistory(result);
      alert('Image generated successfully!');
    } catch (err) {
      if (!(err instanceof Error && err.message === 'Request aborted')) {
        alert(`Generation failed: ${(err as Error).message}`);
      }
    } finally {
      setCurrentAbortController(null);
    }
  }, [imageUrl, prompt, style, generateImage, addHistory]);

  const handleAbort = useCallback(() => {
    if (currentAbortController) {
      currentAbortController.abort();
      setCurrentAbortController(null);
    }
  }, [currentAbortController]);

  const handleSelectHistoryItem = useCallback((item: typeof history[0]) => {
    setPrompt(item.prompt);
    setStyle(item.style);

    if (item.imageUrl) {
      const filename = `history-image-${item.id}.png`;
      const file = fileToDataUrl(item.imageUrl, filename);
      if (file) {
        setImage(file);
      } else {
        console.error("Failed to convert data URL to File for history item:", item.id);
      }
    }
  }, [setImage, history]);

  return (
    <div className="app-container">
      <h1 className="app-title">Image Generation App</h1>

      {/* Main content layout: input section on left, preview and history on right */}
      <div className="content-layout">
        <div className="input-section">
          <Upload imageUrl={imageUrl} setImage={setImage} error={imageUploadError} />
          {imageUploadError && <p className="error-message" role="alert">{imageUploadError}</p>}
          <PromptInput value={prompt} onChange={handlePromptChange} />
          <StyleDropdown value={style} onChange={handleStyleChange} />
          <GenerateButton onClick={handleGenerate} isLoading={isLoading} onAbort={handleAbort} />
          {apiError && <p className="error-message" role="alert">{apiError.message}</p>}
        </div>

        <div className="preview-section">
          <SummaryPreview imageUrl={imageUrl} prompt={prompt} style={style} />
          <HistoryList history={history} onSelectHistoryItem={handleSelectHistoryItem} />
        </div>
      </div>
    </div>
  );
}

export default App;
