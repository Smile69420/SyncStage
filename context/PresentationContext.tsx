
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { ContentItem } from '../types';

interface PresentationContextType {
  activeContent: ContentItem | null;
  setActiveContent: (content: ContentItem | null) => void;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

export const PresentationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeContent, setActiveContentState] = useState<ContentItem | null>(null);

  // In a real application, this function would emit a socket event.
  // The component would also listen for socket events to update its state.
  const setActiveContent = useCallback((content: ContentItem | null) => {
    // e.g., socket.emit('content-change', content);
    setActiveContentState(content);
  }, []);

  return (
    <PresentationContext.Provider value={{ activeContent, setActiveContent }}>
      {children}
    </PresentationContext.Provider>
  );
};

export const usePresentation = (): PresentationContextType => {
  const context = useContext(PresentationContext);
  if (context === undefined) {
    throw new Error('usePresentation must be used within a PresentationProvider');
  }
  return context;
};
