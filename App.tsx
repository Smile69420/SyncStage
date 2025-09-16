
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { PresentationProvider } from './context/PresentationContext';
import HomePage from './pages/HomePage';
import DisplayPage from './pages/DisplayPage';
import ControlPage from './pages/ControlPage';

const App: React.FC = () => {
  return (
    <PresentationProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/display" element={<DisplayPage />} />
          <Route path="/control" element={<ControlPage />} />
        </Routes>
      </HashRouter>
    </PresentationProvider>
  );
};

export default App;
