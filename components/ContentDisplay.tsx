
import React from 'react';
import { ContentItem, ContentType } from '../types';
// Note: framer-motion is not a standard library, so we will implement a simple CSS animation instead.
// For a real app, you would install framer-motion.

interface ContentDisplayProps {
  content: ContentItem;
  isPreview?: boolean;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, isPreview = false }) => {
  const renderContent = () => {
    switch (content.type) {
      case ContentType.IMAGE:
        return (
          <img
            src={content.src}
            alt={content.title}
            className="w-full h-full object-contain"
          />
        );
      case ContentType.VIDEO:
        return (
          <video
            src={content.src}
            className="w-full h-full object-contain"
            autoPlay
            loop
            muted
            playsInline
            controls={!isPreview}
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
          ></iframe>
        );
      default:
        return null;
    }
  };

  return (
    <div key={content.id} className="w-full h-full animate-fade-in flex items-center justify-center">
        {renderContent()}
    </div>
  );
};

export default ContentDisplay;
