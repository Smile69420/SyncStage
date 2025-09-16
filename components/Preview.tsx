
import React from 'react';
import { usePresentation } from '../context/PresentationContext';
import ContentDisplay from './ContentDisplay';
import { TvIcon } from './icons/Icons';

const Preview: React.FC = () => {
  const { activeContent } = usePresentation();

  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-lg sticky top-8">
      <h2 className="text-xl font-bold text-base-content mb-4">Live Preview</h2>
      <div className="aspect-video bg-dark-100 rounded-md overflow-hidden shadow-inner flex items-center justify-center">
        {activeContent ? (
          <ContentDisplay content={activeContent} isPreview={true} />
        ) : (
          <div className="text-center text-dark-300 p-4">
            <TvIcon className="w-12 h-12 mx-auto" />
            <p className="mt-2 text-sm">Screen is blank</p>
          </div>
        )}
      </div>
      <div className="mt-4 p-3 bg-base-200 rounded-md">
        <p className="text-sm text-gray-500">Currently Displaying:</p>
        <p className="font-semibold text-base-content truncate">
          {activeContent ? activeContent.title : 'None'}
        </p>
      </div>
    </div>
  );
};

export default Preview;
