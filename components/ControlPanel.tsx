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

const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);


const ControlPanel: React.FC = () => {
  const { setActiveContent, activeContent, navigatePresentation, isConnected } = usePresentation();

  const handleDisplay = (item: ContentItem) => {
    setActiveContent(item);
  };

  const handleBlankScreen = () => {
    setActiveContent(null);
  };

  const activeIndex = activeContent ? CONTENT_ITEMS.findIndex(item => item.id === activeContent.id) : -1;

  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4 border-b pb-4">
        <div>
            <h2 className="text-xl font-bold text-base-content">Content Playlist</h2>
            <div className={`mt-1 text-sm ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
                {isConnected ? '● Connected' : '● Disconnected'}
            </div>
        </div>
        <div className="flex items-center gap-2">
           <button
            onClick={() => navigatePresentation('previous')}
            disabled={!isConnected || activeIndex === 0}
            className="p-2 bg-base-200 text-base-content rounded-md hover:bg-base-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous Item"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigatePresentation('next')}
            disabled={!isConnected || activeIndex === CONTENT_ITEMS.length - 1}
            className="p-2 bg-base-200 text-base-content rounded-md hover:bg-base-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next Item"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleBlankScreen}
            disabled={!isConnected}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <XCircleIcon className="w-5 h-5" />
            Blank
          </button>
        </div>
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
                disabled={isActive || !isConnected}
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
