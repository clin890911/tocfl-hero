import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Headphones, Zap, Brain, User, BarChart3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const BottomNav = () => {
  const location = useLocation();
  const { lang } = useLanguage();
  const { user } = useAuth();
  const isActive = (path) => location.pathname === path;

  const tabs = [
    { path: '/', icon: Home, label: lang === 'id' ? 'Beranda' : '首頁' },
    { path: '/reading', icon: BookOpen, label: lang === 'id' ? 'Baca' : '閱讀' },
    { path: '/daily', icon: Zap, label: lang === 'id' ? 'Harian' : '每日' },
    { path: '/review', icon: Brain, label: lang === 'id' ? 'Review' : '複習' },
    { path: user ? '/dashboard' : '/analytics', icon: user ? User : BarChart3, label: user ? (lang === 'id' ? 'Profil' : '我的') : (lang === 'id' ? 'Analisis' : '分析') },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around px-1 py-1.5 safe-area-bottom">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 rounded-xl transition-all duration-200 ${
                active
                  ? 'text-purple-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-200 ${
                active ? 'bg-purple-100' : ''
              }`}>
                <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] mt-0.5 font-medium ${
                active ? 'text-purple-600' : 'text-gray-400'
              }`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
