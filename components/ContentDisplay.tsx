
import React, { useState, useEffect } from 'react';
import { ContentItem, ContentType } from '../types';
import { SpinnerIcon, ExclamationTriangleIcon } from './icons/Icons';

interface ContentDisplayProps {
  content: ContentItem;
  isPreview?: boolean;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, isPreview = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    if (content.type === ContentType.YOUTUBE || content.type === ContentType.POWERBI) {
      const timer = setTimeout(() => setIsLoading(false), isPreview ? 1000 : 3000);
      return () => clearTimeout(timer);
    }
  }, [content.id, content.type, isPreview]);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const renderContent = () => {
    switch (content.type) {
      case ContentType.IMAGE:
        return (
          <img
            src={content.src}
            alt={content.title}
            className="w-full h-full object-contain"
            onLoad={handleLoad}
            onError={handleError}
          />
        );
      case ContentType.VIDEO:
        return (
          <video
            key={content.src}
            src={content.src}
            className="w-full h-full object-contain"
            autoPlay
            loop
            muted
            playsInline
            controls={isPreview}
            onLoadedData={handleLoad}
            onError={handleError}
          />
        );
      case ContentType.YOUTUBE:
      case ContentType.POWERBI:
        return (
          <iframe
            src={content.src}
            title={content.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleLoad}
          ></iframe>
        );
      default:
        return null;
    }
  };

  if (hasError && !isPreview) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-white bg-black">
        <ExclamationTriangleIcon className="w-16 h-16 text-red-500" />
        <h2 className="mt-4 text-2xl font-bold">Failed to load content</h2>
        <p className="text-gray-400">{content.title}</p>
      </div>
    );
  }

  return (
    <div key={content.id} className="w-full h-full animate-fade-in flex items-center justify-center bg-black relative">
      {isLoading && !isPreview && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <SpinnerIcon className="w-16 h-16 text-white" />
        </div>
      )}
      <div className={`w-full h-full transition-opacity duration-500 ${isLoading && !isPreview ? 'opacity-0' : 'opacity-100'}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentDisplay;