
import React from 'react';
import { Link } from 'react-router-dom';
import { TvIcon, TabletIcon } from '../components/icons/Icons';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-base-content">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-brand-primary">SyncStage</h1>
        <p className="text-xl mt-2 text-gray-600">Wireless Presentation Control</p>
      </header>
      
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-8">
        <Link to="/display" className="group block p-8 bg-base-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center hover:scale-105 transform">
          <div className="flex justify-center mb-4">
            <TvIcon className="w-16 h-16 text-brand-primary group-hover:text-brand-secondary transition-colors" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Display Mode</h2>
          <p className="text-gray-500">Launch the full-screen presentation view for your TV or projector.</p>
        </Link>
        
        <Link to="/control" className="group block p-8 bg-base-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center hover:scale-105 transform">
          <div className="flex justify-center mb-4">
            <TabletIcon className="w-16 h-16 text-brand-primary group-hover:text-brand-secondary transition-colors" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Control Panel</h2>
          <p className="text-gray-500">Open the control interface on your tablet or laptop to manage the presentation.</p>
        </Link>
      </main>
      
      <footer className="mt-16 text-center text-gray-500">
        <p>Open Display Mode in one window/device and Control Panel in another to see them sync.</p>
      </footer>
    </div>
  );
};

export default HomePage;
