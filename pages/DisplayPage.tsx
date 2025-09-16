
import React from 'react';
import { usePresentation } from '../context/PresentationContext';
import ContentDisplay from '../components/ContentDisplay';
import { LogoIcon, WifiOffIcon } from '../components/icons/Icons';

const DisplayPage: React.FC = () => {
  const { activeContent, isConnected } = usePresentation();

  return (
    <div className="w-screen h-screen bg-black text-dark-content flex items-center justify-center overflow-hidden relative">
      {!isConnected && (
         <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50 text-white animate-fade-in">
            <WifiOffIcon className="w-20 h-20 text-gray-400" />
            <h2 className="text-2xl font-semibold mt-4">Connection Lost</h2>
            <p className="text-gray-400">Attempting to reconnect...</p>
        </div>
      )}

      {activeContent ? (
        <ContentDisplay content={activeContent} />
      ) : (
        <div className="text-center animate-fade-in">
          <LogoIcon className="w-24 h-24 mx-auto text-dark-300" />
          <h1 className="text-4xl font-bold mt-4 text-dark-300">SyncStage</h1>
          <p className="text-xl text-gray-500 mt-2">Waiting for content from control panel...</p>
        </div>
      )}
    </div>
  );
};

export default DisplayPage;