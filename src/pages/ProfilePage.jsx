import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Target, Globe, Bell, Clock, BookOpen, Headphones,
  Trophy, Star, ChevronRight, Save, CheckCircle, Flame,
  BarChart3, Settings, LogIn,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getLevelInfo } from '../data/achievements';
import { getSRStats } from '../data/spacedRepetition';

const GOALS_KEY = 'tocfl_learning_goals';

const loadGoals = () => {
  try {
    return JSON.parse(localStorage.getItem(GOALS_KEY) || '{}');
  } catch {
    return {};
  }
};

const saveGoals = (goals) => {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
};

const ProfilePage = () => {
  const { user, userStats } = useAuth();
  const { lang, setLang } = useLanguage();
  const [goals, setGoals] = useState(loadGoals());
  const [saved, setSaved] = useState(false);
  const [srStats, setSrStats] = useState(null);

  useEffect(() => {
    setSrStats(getSRStats());
  }, []);

  const handleGoalChange = (key, value) => {
    const updated = { ...goals, [key]: value };
    setGoals(updated);
    setSaved(false);
  };

  const handleSave = () => {
    saveGoals(goals);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
  };

  // If not logged in, show guest profile
  const isGuest = !user;
  const displayName = user?.displayName || user?.name || (lang === 'id' ? 'Pelajar' : '學習者');
  const xp = userStats?.xp || userStats?.totalXP || 0;
  const levelInfo = getLevelInfo(xp);
  const streak = userStats?.streakDays || userStats?.streak || 0;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 py-8 px-4 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6"
          variants={itemVariants}
        >
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className="w-full h-full rounded-2xl object-cover" />
              ) : (
                <User className="w-10 h-10 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{displayName}</h1>
              {user?.email && <p className="text-sm text-gray-400">{user.email}</p>}
              <div className="flex items-center gap-3 mt-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                  <Trophy className="w-3.5 h-3.5" /> {levelInfo.name}
                </span>
                {streak > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
                    <Flame className="w-3.5 h-3.5" /> {streak} {lang === 'id' ? 'hari' : '天'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="mt-5">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">{xp} XP</span>
              <span className="text-gray-400">
                {levelInfo.maxXP === Infinity ? '∞' : levelInfo.maxXP} XP
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${levelInfo.progress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div className="grid grid-cols-3 gap-3 mb-6" variants={itemVariants}>
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <BarChart3 className="w-5 h-5 text-cyan-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-800">{srStats?.totalItems || 0}</p>
            <p className="text-xs text-gray-400">{lang === 'id' ? 'Dalam Review' : 'SR 題目'}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <Target className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-800">{srStats?.mastering || 0}</p>
            <p className="text-xs text-gray-400">{lang === 'id' ? 'Hampir Hafal' : '即將掌握'}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <Star className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-800">{userStats?.achievements?.length || 0}</p>
            <p className="text-xs text-gray-400">{lang === 'id' ? 'Pencapaian' : '成就'}</p>
          </div>
        </motion.div>

        {/* Learning Goals */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          variants={itemVariants}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-500" />
            {lang === 'id' ? 'Target Belajar Harian' : '每日學習目標'}
          </h3>

          <div className="space-y-5">
            {/* Daily questions goal */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                {lang === 'id' ? 'Jumlah soal per hari' : '每日答題數量'}
              </label>
              <div className="flex gap-2">
                {[10, 20, 30, 50].map(n => (
                  <button
                    key={n}
                    onClick={() => handleGoalChange('dailyQuestions', n)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      goals.dailyQuestions === n
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {n} {lang === 'id' ? 'soal' : '題'}
                  </button>
                ))}
              </div>
            </div>

            {/* Study time goal */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                {lang === 'id' ? 'Waktu belajar per hari' : '每日學習時間'}
              </label>
              <div className="flex gap-2">
                {[10, 15, 30, 60].map(m => (
                  <button
                    key={m}
                    onClick={() => handleGoalChange('dailyMinutes', m)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      goals.dailyMinutes === m
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {m} {lang === 'id' ? 'mnt' : '分鐘'}
                  </button>
                ))}
              </div>
            </div>

            {/* Target band */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                {lang === 'id' ? 'Target TOCFL' : 'TOCFL 目標等級'}
              </label>
              <div className="flex gap-2">
                {[
                  { val: 'A', label: 'Band A', sub: lang === 'id' ? 'Dasar' : '入門' },
                  { val: 'B', label: 'Band B', sub: lang === 'id' ? 'Lanjutan' : '進階' },
                  { val: 'C', label: 'Band C', sub: lang === 'id' ? 'Mahir' : '精通' },
                ].map(band => (
                  <button
                    key={band.val}
                    onClick={() => handleGoalChange('targetBand', band.val)}
                    className={`flex-1 py-3 rounded-xl text-center transition-all ${
                      goals.targetBand === band.val
                        ? 'bg-purple-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <p className="text-sm font-bold">{band.label}</p>
                    <p className="text-xs opacity-75">{band.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Save button */}
            <motion.button
              onClick={handleSave}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                saved
                  ? 'bg-green-500'
                  : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              {saved ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  {lang === 'id' ? 'Tersimpan!' : '已儲存！'}
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {lang === 'id' ? 'Simpan Target' : '儲存目標'}
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          variants={itemVariants}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-500" />
            {lang === 'id' ? 'Pengaturan' : '設定'}
          </h3>

          <div className="space-y-1">
            {/* Language */}
            <button
              onClick={() => setLang(lang === 'zh' ? 'id' : 'zh')}
              className="w-full flex items-center justify-between px-4 py-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700 font-medium">
                  {lang === 'id' ? 'Bahasa' : '語言'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-sm">{lang === 'zh' ? '中文' : 'Indonesia'}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div className="space-y-3" variants={itemVariants}>
          {user && (
            <Link to="/dashboard">
              <div className="bg-white rounded-xl p-4 shadow flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-purple-500" />
                  <span className="font-medium text-gray-700">{lang === 'id' ? 'Dashboard Lengkap' : '完整儀表板'}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          )}
          <Link to="/analytics">
            <div className="bg-white rounded-xl p-4 shadow flex items-center justify-between hover:bg-gray-50 transition-colors mt-3">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-cyan-500" />
                <span className="font-medium text-gray-700">{lang === 'id' ? 'Analisis Belajar' : '學習數據分析'}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>

          {isGuest && (
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-5 text-center text-white mt-4">
              <LogIn className="w-8 h-8 mx-auto mb-2" />
              <p className="font-bold mb-1">
                {lang === 'id' ? 'Masuk untuk menyimpan kemajuan' : '登入以儲存學習進度'}
              </p>
              <p className="text-sm opacity-80">
                {lang === 'id' ? 'Data tersimpan di perangkat ini saja' : '目前資料僅保存在此裝置'}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
