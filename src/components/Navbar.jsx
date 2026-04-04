import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Home, BookOpen, Headphones, Trophy, User, LogIn, LogOut, Menu, X, Globe, Zap, BookMarked, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/daily', label: t('nav.daily'), icon: Zap },
    { path: '/reading', label: t('nav.reading'), icon: BookOpen },
    { path: '/listening', label: t('nav.listening'), icon: Headphones },
    { path: '/flashcard', label: t('nav.flashcard'), icon: BookMarked },
    { path: '/analytics', label: t('nav.analytics'), icon: BarChart3 },
    { path: '/leaderboard', label: t('nav.leaderboard'), icon: Trophy },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const toggleLang = () => {
    setLang(lang === 'zh' ? 'id' : 'zh');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:opacity-90 transition-opacity"
        >
          🏆 TOCFL Hero
        </Link>

        {/* Center Navigation Links */}
        <div className="flex items-center gap-4">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                  isActive(item.path)
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Side - Language Toggle + User Info */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
            title={t('lang.switch')}
          >
            <Globe size={16} />
            <span>{lang === 'zh' ? '中文' : 'ID'}</span>
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              {/* Avatar & User Info */}
              <Link to="/dashboard" className="flex items-center gap-3 bg-white/20 hover:bg-white/30 rounded-full px-4 py-2 transition-colors">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <User size={20} className="text-purple-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-sm">{user.name}</span>
                  <span className="text-white/80 text-xs">XP: {user.xp || 0}</span>
                </div>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                <LogOut size={18} />
                <span>{t('nav.logout')}</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-white text-purple-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              <LogIn size={18} />
              <span>{t('nav.login')}</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white">
          🏆 TOCFL Hero
        </Link>

        <div className="flex items-center gap-2">
          {/* Language Toggle (Mobile) */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-2.5 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            <Globe size={16} />
            <span>{lang === 'zh' ? '中' : 'ID'}</span>
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-r from-blue-700 to-purple-700 border-t border-white/20"
          >
            <div className="px-4 py-4 space-y-2">
              {/* Navigation Links */}
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-white text-purple-600'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="border-t border-white/20 my-2"></div>

              {/* User Section */}
              {user ? (
                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 bg-white/20 rounded-lg px-4 py-3"
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={18} className="text-purple-600" />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <span className="text-white font-semibold text-sm">{user.name}</span>
                      <span className="text-white/80 text-xs">XP: {user.xp || 0}</span>
                    </div>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    <LogOut size={18} />
                    <span>{t('nav.logout')}</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-white text-purple-600 hover:bg-gray-100 w-full px-4 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  <LogIn size={18} />
                  <span>{t('nav.login')}</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
