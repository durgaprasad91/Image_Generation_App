import { useState, useEffect, useCallback } from 'react';

interface HistoryItem {
  id: string;
  imageUrl: string | null;
  prompt: string;
  style: string;
  createdAt: string;
}

const LOCAL_STORAGE_KEY = 'imageGenerationHistory';
const MAX_HISTORY_ITEMS = 5;

const useLocalStorage = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Error reading from local storage:", error);
    }
  }, []);

  const addHistory = useCallback((item: HistoryItem) => {
    setHistory((prevHistory) => {
      const newHistory = [item, ...prevHistory].slice(0, MAX_HISTORY_ITEMS);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error("Error writing to local storage:", error);
      }
      return newHistory;
    });
  }, []);

  const getHistory = useCallback((): HistoryItem[] => {
    return history;
  }, [history]);

  return {
    history,
    addHistory,
    getHistory,
  };
};

export default useLocalStorage;
