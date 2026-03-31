import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', label: '首页' },
  { to: '/beginner', label: '新手入门' },
  { to: '/developer', label: '开发者' },
  { to: '/hunter', label: '赏金猎人' },
];

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3" onClick={() => setMenuOpen(false)}>
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-xl">🔓</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">SourceMap 安全指南</h1>
              <p className="text-xs text-purple-300 hidden sm:block">漏洞科普与防护指南</p>
            </div>
          </Link>
          
          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-colors ${location.pathname === item.to ? 'text-orange-400' : 'text-gray-300 hover:text-white'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 移动端汉堡按钮 */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            aria-label="菜单"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 移动端下拉菜单 */}
      {menuOpen && (
        <nav className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur">
          <div className="px-4 py-3 space-y-1">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.to
                    ? 'bg-purple-800/50 text-orange-400'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
