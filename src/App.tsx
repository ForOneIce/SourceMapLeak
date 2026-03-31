import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BeginnerPage from './pages/BeginnerPage';
import DeveloperPage from './pages/DeveloperPage';
import HunterPage from './pages/HunterPage';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/beginner" element={<BeginnerPage />} />
            <Route path="/developer" element={<DeveloperPage />} />
            <Route path="/hunter" element={<HunterPage />} />
          </Routes>
        </main>
        <Footer />

        {/* 左下角浮窗 */}
        <div className="fixed bottom-6 left-6 z-50 flex flex-col space-y-3">
          <a
            href="https://github.com/ForOneIce/SourceMapLeak"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="w-11 h-11 flex items-center justify-center bg-[#24292f] text-white rounded-full shadow-lg hover:bg-[#1b1f23] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a
            href="https://ko-fi.com/iceflake0"
            target="_blank"
            rel="noopener noreferrer"
            title="Buy me a Coffee"
            className="w-11 h-11 flex items-center justify-center bg-[#FF5E5B] text-white rounded-full shadow-lg hover:bg-[#e04e4b] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-lg">☕</span>
          </a>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
