
import React from 'react';
import { usePresentation } from '../context/PresentationContext';
import ContentDisplay from '../components/ContentDisplay';
import { LogoIcon } from '../components/icons/Icons';

const DisplayPage: React.FC = () => {
  const { activeContent } = usePresentation();

  return (
    <div className="w-screen h-screen bg-dark-100 text-dark-content flex items-center justify-center overflow-hidden">
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
