import React from 'react';
import '../styles/HistoryList.css'; // Updated import for HistoryList-specific styles

interface HistoryItem {
  id: string;
  imageUrl: string | null;
  prompt: string;
  style: string;
  createdAt: string;
}

interface HistoryListProps {
  history: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelectHistoryItem }) => {
  return (
    <div className="history-list-container">
      <h3 className="history-list-title">Generation History</h3>
      {history.length === 0 ? (
        <p className="no-history-message">No history items yet.</p>
      ) : (
        <div className="history-items-wrapper">
          {history.map((item) => (
            <div
              key={item.id}
              className="history-item"
              onClick={() => onSelectHistoryItem(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectHistoryItem(item);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Select history item: ${item.prompt} in ${item.style} style`}
            >
              <div className="history-item-image-wrapper">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt="History item preview" className="history-item-image" />
                ) : (
                  <div className="history-item-no-image">No Image</div>
                )}
              </div>
              <div className="history-item-details">
                <p className="history-item-prompt">{item.prompt}</p>
                <p className="history-item-style">Style: {item.style}</p>
                <p className="history-item-timestamp">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
