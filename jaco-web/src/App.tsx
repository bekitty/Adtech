import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar } from './components';
import { Home, Browse, StreamRoom } from './pages';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-jaco-dark text-white">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="flex">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} />

          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main
            className={`flex-1 transition-all duration-300 ${
              sidebarOpen ? 'lg:ml-60' : 'lg:ml-16'
            }`}
          >
            <div className="p-4 lg:p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/stream/:id" element={<StreamRoom />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
