import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-xl">🔓</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">SourceMap 安全指南</h1>
              <p className="text-xs text-purple-300">漏洞科普与防护指南</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-orange-400' : 'text-gray-300 hover:text-white'}`}
            >
              首页
            </Link>
            <Link 
              to="/beginner" 
              className={`text-sm font-medium transition-colors ${location.pathname === '/beginner' ? 'text-orange-400' : 'text-gray-300 hover:text-white'}`}
            >
              新手入门
            </Link>
            <Link 
              to="/developer" 
              className={`text-sm font-medium transition-colors ${location.pathname === '/developer' ? 'text-orange-400' : 'text-gray-300 hover:text-white'}`}
            >
              开发者
            </Link>
            <Link 
              to="/hunter" 
              className={`text-sm font-medium transition-colors ${location.pathname === '/hunter' ? 'text-orange-400' : 'text-gray-300 hover:text-white'}`}
            >
              赏金猎人
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
