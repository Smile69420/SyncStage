
import React from 'react';
import ControlPanel from '../components/ControlPanel';
import Preview from '../components/Preview';
import { LogoIcon } from '../components/icons/Icons';

const ControlPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <header className="bg-base-100 shadow-md p-4 flex items-center">
        <LogoIcon className="w-8 h-8 text-brand-primary" />
        <h1 className="text-2xl font-bold text-base-content ml-3">Control Panel</h1>
      </header>
      <main className="flex flex-col lg:flex-row p-4 lg:p-8 gap-8">
        <div className="lg:w-1/2 xl:w-2/3">
          <ControlPanel />
        </div>
        <aside className="lg:w-1/2 xl:w-1/3">
          <Preview />
        </aside>
      </main>
    </div>
  );
};

export default ControlPage;
