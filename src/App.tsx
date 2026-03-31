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

        {/* Ko-fi 赞助浮窗 */}
        <a
          href="https://ko-fi.com/iceflake0"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-50 flex items-center space-x-2 px-4 py-2.5 bg-[#FF5E5B] text-white rounded-full shadow-lg hover:bg-[#e04e4b] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          <span className="text-lg">☕</span>
          <span className="text-sm font-semibold">Buy me a Coffee</span>
        </a>
      </div>
    </HashRouter>
  );
}

export default App;
