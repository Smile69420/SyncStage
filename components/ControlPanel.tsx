
import React from 'react';
import { CONTENT_ITEMS } from '../constants';
import { usePresentation } from '../context/PresentationContext';
import { ContentItem, ContentType } from '../types';
import { ImageIcon, VideoIcon, ChartBarIcon, YoutubeIcon, XCircleIcon, PlayIcon } from './icons/Icons';

const ContentTypeIcon: React.FC<{ type: ContentType }> = ({ type }) => {
    switch (type) {
        case ContentType.IMAGE: return <ImageIcon className="w-6 h-6 text-indigo-500" />;
        case ContentType.VIDEO: return <VideoIcon className="w-6 h-6 text-rose-500" />;
        case ContentType.YOUTUBE: return <YoutubeIcon className="w-6 h-6 text-red-600" />;
        case ContentType.POWERBI: return <ChartBarIcon className="w-6 h-6 text-yellow-500" />;
        default: return null;
    }
};

const ControlPanel: React.FC = () => {
  const { setActiveContent, activeContent } = usePresentation();

  const handleDisplay = (item: ContentItem) => {
    setActiveContent(item);
  };

  const handleBlankScreen = () => {
    setActiveContent(null);
  };

  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-base-content">Content Playlist</h2>
        <button
          onClick={handleBlankScreen}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          <XCircleIcon className="w-5 h-5" />
          Blank Screen
        </button>
      </div>
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {CONTENT_ITEMS.map((item) => {
          const isActive = activeContent?.id === item.id;
          return (
            <div
              key={item.id}
              className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                isActive ? 'bg-brand-primary/10 ring-2 ring-brand-primary' : 'bg-base-200 hover:bg-base-300'
              }`}
            >
              <div className="flex-shrink-0 mr-4">
                <ContentTypeIcon type={item.type} />
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-base-content">{item.title}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <button
                onClick={() => handleDisplay(item)}
                disabled={isActive}
                className="flex items-center gap-2 ml-4 px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <PlayIcon className="w-5 h-5" />
                Display
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ControlPanel;
