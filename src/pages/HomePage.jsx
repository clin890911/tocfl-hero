import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Zap, BookOpen, Headphones, Award, Users, MessageSquare, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getLevelInfo } from '../data/achievements';

export default function HomePage() {
  const { user, userData, loading, signInWithGoogle } = useAuth();
  const { lang, t } = useLanguage();
  const [levelInfo, setLevelInfo] = useState(null);
  const [readingWrongCount, setReadingWrongCount] = useState(0);
  const [listeningWrongCount, setListeningWrongCount] = useState(0);

  useEffect(() => {
    if (userData?.totalXP !== undefined) {
      setLevelInfo(getLevelInfo(userData.totalXP));
    }
  }, [userData]);

  useEffect(() => {
    try {
      const rw = JSON.parse(localStorage.getItem('tocfl_reading_wrong_bank') || '[]');
      const lw = JSON.parse(localStorage.getItem('tocfl_listening_wrong_bank') || '[]');
      setReadingWrongCount(rw.length);
      setListeningWrongCount(lw.length);
    } catch {}
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      transition: { duration: 0.3 },
    },
  };

  const buttonHoverVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden pt-16 pb-24"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full" style={{ opacity: 0.1, transform: 'translate(-50%, -50%)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full" style={{ opacity: 0.1, transform: 'translate(33%, 33%)' }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Title */}
          <div className="text-center mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              {t('home.title')}
            </h1>
            <p className="text-2xl sm:text-3xl font-semibold text-white mb-4" style={{ opacity: 0.9 }}>
              {t('home.subtitle')}
            </p>
            <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed" style={{ opacity: 0.8 }}>
              {t('home.description')}
            </p>
          </div>

          {/* User Stats Bar (if logged in) */}
          {user && userData && levelInfo && (
            <div
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-12 border border-white/30"
            >
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                {/* XP Display */}
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full p-3">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t('dashboard.totalXP')}</p>
                    <p className="text-2xl font-bold text-gray-800">{levelInfo.totalXP}</p>
                  </div>
                </div>

                {/* Streak Display */}
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-red-400 to-orange-400 rounded-full p-3">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t('dashboard.streak')}</p>
                    <p className="text-2xl font-bold text-gray-800">{userData.streak || 0}</p>
                  </div>
                </div>

                {/* Level Display */}
                <div className="flex items-center gap-3">
                  <div
                    className="rounded-full p-3"
                    style={{ backgroundColor: levelInfo.color + '33' }}
                  >
                    <Award className="w-6 h-6" style={{ color: levelInfo.color }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t('dashboard.levelProgress')}</p>
                    <p className="text-2xl font-bold text-gray-800">{levelInfo.name}</p>
                  </div>
                </div>

                {/* Level Progress Bar */}
                <div className="w-full sm:w-48">
                  <p className="text-sm text-gray-600 font-medium mb-2">{t('dashboard.levelProgress')}</p>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: levelInfo.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${levelInfo.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{levelInfo.progress}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Practice Mode Selection */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-4"
            variants={itemVariants}
          >
            {t('home.chooseMode')}
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 mb-12"
            variants={itemVariants}
          >
            {t('home.loginToTrack')}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Reading Card */}
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              className="group"
            >
              <Link to="/reading" className="block h-full">
                <motion.div
                  className="h-full bg-white rounded-3xl shadow-lg p-8 border-2 border-blue-200 hover:border-blue-400 transition-colors cursor-pointer"
                  variants={cardHoverVariants}
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-3xl font-bold text-gray-800 mb-3">
                    📖 {t('home.readingTest')}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {t('home.readingDesc')}
                  </p>

                  <div className="flex items-center gap-2 text-blue-600 mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('home.feature1Title')}</span>
                  </div>

                  {readingWrongCount > 0 && (
                    <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-red-50 rounded-lg border border-red-200">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-red-600">
                        {lang === 'id' ? `${readingWrongCount} soal salah perlu diulangi` : `${readingWrongCount} 道錯題待複習`}
                      </span>
                    </div>
                  )}

                  <motion.button
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-shadow"
                    variants={buttonHoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {t('home.startPractice')} →
                  </motion.button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Listening Card */}
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              className="group"
            >
              <Link to="/listening" className="block h-full">
                <motion.div
                  className="h-full bg-white rounded-3xl shadow-lg p-8 border-2 border-purple-200 hover:border-purple-400 transition-colors cursor-pointer"
                  variants={cardHoverVariants}
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                    <Headphones className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-3xl font-bold text-gray-800 mb-3">
                    🎧 {t('home.listeningTest')}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {t('home.listeningDesc')}
                  </p>

                  <div className="flex items-center gap-2 text-purple-600 mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('home.feature3Title')}</span>
                  </div>

                  {listeningWrongCount > 0 && (
                    <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-red-50 rounded-lg border border-red-200">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-red-600">
                        {lang === 'id' ? `${listeningWrongCount} soal salah perlu diulangi` : `${listeningWrongCount} 道錯題待複習`}
                      </span>
                    </div>
                  )}

                  <motion.button
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-shadow"
                    variants={buttonHoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {t('home.startPractice')} →
                  </motion.button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Level Selection */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-4"
            variants={itemVariants}
          >
            {t('home.chooseLevel')}
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 mb-12"
            variants={itemVariants}
          >
            {t('quiz.selectDifficulty')}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Band A */}
            <motion.div
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🥉</span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Band A</h3>
                  <p className="text-sm text-gray-600">{t('home.bandA')}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                {t('home.readingDesc')}
              </p>

              {user && userData && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">{t('dashboard.levelProgress')}</span>
                    <span className="text-sm font-bold text-amber-600">
                      {userData.bandAProgress || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${userData.bandAProgress || 0}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )}

              <motion.button
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={!user}
              >
                {user ? t('home.startPractice') : t('home.loginToTrack')}
              </motion.button>
            </motion.div>

            {/* Band B */}
            <motion.div
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-200"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🥇</span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Band B</h3>
                  <p className="text-sm text-gray-600">{t('home.bandB')}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                {t('home.listeningDesc')}
              </p>

              {user && userData && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">{t('dashboard.levelProgress')}</span>
                    <span className="text-sm font-bold text-indigo-600">
                      {userData.bandBProgress || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-400 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${userData.bandBProgress || 0}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )}

              <motion.button
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={!user}
              >
                {user ? t('home.startPractice') : t('home.loginToTrack')}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Feature Highlights */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            variants={itemVariants}
          >
            {t('home.whyChoose')}
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 text-center hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('home.feature2Title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('home.feature2Desc')}
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500 text-center hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-full p-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('home.feature1Title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('home.feature1Desc')}
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-orange-500 text-center hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-full p-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('home.feature3Title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('home.feature3Desc')}
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-pink-500 text-center hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-full p-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('home.feature4Title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('home.feature4Desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section (if not logged in) */}
      {!loading && !user && (
        <motion.section
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              {t('home.startPractice')}
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {t('home.loginToTrack')}
            </motion.p>

            <motion.button
              onClick={signInWithGoogle}
              className="inline-flex items-center gap-3 bg-white text-indigo-600 font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {t('nav.login')} Google
            </motion.button>
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2">
            TOCFL Hero - {t('home.subtitle')}
          </p>
          <p className="text-sm">
            © 2024-2026 TOCFL Hero. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
