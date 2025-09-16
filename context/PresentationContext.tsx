import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { ContentItem, PresentationState, ServerToClientEvents, ClientToServerEvents } from '../types';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

interface PresentationContextType {
  activeContent: ContentItem | null;
  isConnected: boolean;
  setActiveContent: (content: ContentItem | null) => void;
  navigatePresentation: (direction: 'next' | 'previous') => void;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

export const PresentationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeContent, setActiveContentState] = useState<ContentItem | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // This effect runs only once on the client to initialize the socket connection.
    const initializeSocket = async () => {
      // We explicitly call the socket API endpoint to establish the connection.
      await fetch('/api/socket');
      socket = io({ transports: ['websocket'] });

      socket.on('connect', () => {
        console.log('Socket connected!');
        setIsConnected(true);
        // Request the latest state from the server upon connecting
        socket.emit('sync-request');
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected!');
        setIsConnected(false);
      });

      // Listen for state updates from the server
      socket.on('display-update', (state: PresentationState) => {
        console.log('Received display-update:', state);
        setActiveContentState(state.activeContent);
      });
    };

    initializeSocket();

    // Cleanup on component unmount
    return () => {
      if (socket) {
        console.log('Disconnecting socket...');
        socket.disconnect();
      }
    };
  }, []);

  const setActiveContent = (content: ContentItem | null) => {
    if (socket) {
      socket.emit('content-change', content);
    }
  };
  
  const navigatePresentation = (direction: 'next' | 'previous') => {
    if (socket) {
      socket.emit('navigate', direction);
    }
  };

  return (
    <PresentationContext.Provider value={{ activeContent, isConnected, setActiveContent, navigatePresentation }}>
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
