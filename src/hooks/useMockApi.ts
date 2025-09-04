import { useState, useCallback } from 'react';
import { retry } from '../utils/retry';

interface MockApiResponse {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: string;
}

interface MockApiError {
  message: string;
}

interface GenerateParams {
  imageDataUrl: string;
  prompt: string;
  style: string;
}

const useMockApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<MockApiError | null>(null);

  const generateImage = useCallback(async (
    { imageDataUrl, prompt, style }: GenerateParams,
    controller?: AbortController,
  ): Promise<MockApiResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await retry(async (signal) => {
        if (signal?.aborted) {
          throw new Error('Request aborted');
        }

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));

        // Simulate 20% chance of failure
        if (Math.random() < 0.20) {
          throw new Error('Model overloaded');
        }

        const response: MockApiResponse = {
          id: `gen-${Date.now()}`,
          imageUrl: imageDataUrl, // In a real API, this would be a generated image URL
          prompt,
          style,
          createdAt: new Date().toISOString(),
        };
        return response;
      }, { signal: controller?.signal });

      setIsLoading(false);
      return result;
    } catch (err) {
      if (err instanceof Error && err.message === 'Request aborted') {
        setError({ message: 'Image generation aborted.' });
      } else {
        const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred.';
        setError({ message: `Failed to generate image: ${errorMessage}` });
      }
      setIsLoading(false);
      throw err; // Re-throw the error for the caller to handle
    }
  }, []);

  return {
    generateImage,
    isLoading,
    error,
  };
};

export default useMockApi;
