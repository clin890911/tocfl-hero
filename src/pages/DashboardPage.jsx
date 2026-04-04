import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  BookOpen,
  Headphones,
  Trophy,
  Flame,
  Target,
  TrendingUp,
  Award,
  Star,
  Calendar,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getLevelInfo, achievementsList } from '../data/achievements';

const DashboardPage = () => {
  const { user, userStats } = useAuth();
  const [animateCounters, setAnimateCounters] = useState(false);

  useEffect(() => {
    // Trigger counter animations on mount
    const timer = setTimeout(() => setAnimateCounters(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!user || !userStats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  const levelInfo = getLevelInfo(userStats.level);
  const currentXP = userStats.xp || 0;
  const xpForNextLevel = 1000; // Base XP, could be calculated dynamically
  const xpProgress = (currentXP % xpForNextLevel) / xpForNextLevel;
  const streakDays = userStats.streakDays || 0;
  const quizzesCompleted = userStats.quizzesCompleted || 0;

  // Calculate average accuracy
  const readingAccuracy = userStats.readingStats?.accuracy || 0;
  const listeningAccuracy = userStats.listeningStats?.accuracy || 0;
  const averageAccuracy = (readingAccuracy + listeningAccuracy) / 2;

  // Get progress for bands
  const bandAProgress = userStats.bandAProgress || 0;
  const bandBProgress = userStats.bandBProgress || 0;

  // Get unlocked achievements
  const unlockedAchievements = userStats.achievements || [];

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
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  // Avatar with initials
  const getInitials = () => {
    const name = user.displayName || user.email;
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = () => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-green-500',
      'bg-orange-500',
    ];
    const index = user.uid?.charCodeAt(0) % colors.length;
    return colors[index] || 'bg-blue-500';
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <motion.div
          className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-8 mb-8 border border-purple-700 shadow-2xl"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <motion.div
                className={`${getAvatarColor()} rounded-full w-24 h-24 flex items-center justify-center shadow-lg`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-white text-2xl font-bold">
                  {getInitials()}
                </span>
              </motion.div>

              {/* User Info */}
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                  {user.displayName || '學習者'}
                </h1>
                <p className="text-purple-200 mb-4">{user.email}</p>

                {/* Level Badge */}
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`${levelInfo.color} rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg`}
                    variants={pulseVariants}
                    animate="animate"
                  >
                    <Trophy className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-xs text-white/80 uppercase tracking-wide">
                        Level
                      </p>
                      <p className="text-xl font-bold text-white">
                        {levelInfo.name}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Streak Counter */}
            {streakDays > 0 && (
              <motion.div
                className="flex flex-col items-center gap-2 bg-orange-500/20 rounded-xl p-6 border border-orange-500/40"
                whileHover={{ scale: 1.05 }}
              >
                <Flame className="w-8 h-8 text-orange-400" />
                <div className="text-center">
                  <p className="text-4xl font-bold text-orange-300">
                    {streakDays}
                  </p>
                  <p className="text-sm text-orange-200">連續天數</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* XP Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <p className="text-sm font-medium text-purple-100">
                XP Progress to Next Level
              </p>
              <p className="text-sm font-medium text-purple-200">
                {Math.floor(currentXP % xpForNextLevel)} / {xpForNextLevel}
              </p>
            </div>
            <div className="w-full bg-purple-900/50 rounded-full h-3 overflow-hidden border border-purple-600/50">
              <motion.div
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress * 100}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Total XP */}
          <motion.div
            className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-6 border border-blue-700 shadow-lg"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium mb-2">總 XP</p>
                <p className="text-4xl font-bold text-white">
                  {animateCounters ? currentXP.toLocaleString() : 0}
                </p>
              </div>
              <motion.div
                className="bg-blue-700/50 rounded-lg p-3"
                whileHover={{ rotate: 15 }}
              >
                <TrendingUp className="w-8 h-8 text-blue-300" />
              </motion.div>
            </div>
          </motion.div>

          {/* Streak Days */}
          <motion.div
            className="bg-gradient-to-br from-orange-800 to-orange-900 rounded-xl p-6 border border-orange-700 shadow-lg"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm font-medium mb-2">
                  連續天數
                </p>
                <p className="text-4xl font-bold text-white">{streakDays}</p>
              </div>
              <motion.div
                className="bg-orange-700/50 rounded-lg p-3"
                whileHover={{ rotate: 15 }}
              >
                <Flame className="w-8 h-8 text-orange-300" />
              </motion.div>
            </div>
          </motion.div>

          {/* Quizzes Completed */}
          <motion.div
            className="bg-gradient-to-br from-green-800 to-green-900 rounded-xl p-6 border border-green-700 shadow-lg"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm font-medium mb-2">
                  測驗完成
                </p>
                <p className="text-4xl font-bold text-white">
                  {quizzesCompleted}
                </p>
              </div>
              <motion.div
                className="bg-green-700/50 rounded-lg p-3"
                whileHover={{ rotate: 15 }}
              >
                <Target className="w-8 h-8 text-green-300" />
              </motion.div>
            </div>
          </motion.div>

          {/* Average Accuracy */}
          <motion.div
            className="bg-gradient-to-br from-pink-800 to-pink-900 rounded-xl p-6 border border-pink-700 shadow-lg"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-200 text-sm font-medium mb-2">
                  平均正確率
                </p>
                <p className="text-4xl font-bold text-white">
                  {Math.round(averageAccuracy)}%
                </p>
              </div>
              <motion.div
                className="bg-pink-700/50 rounded-lg p-3"
                whileHover={{ rotate: 15 }}
              >
                <Award className="w-8 h-8 text-pink-300" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Band Progress */}
          <motion.div
            className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
              級別進度
            </h3>

            {/* Band A */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-300">A 級</p>
                <p className="text-sm font-bold text-blue-400">
                  {Math.round(bandAProgress)}%
                </p>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden border border-slate-600">
                <motion.div
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${bandAProgress}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Band B */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-300">B 級</p>
                <p className="text-sm font-bold text-purple-400">
                  {Math.round(bandBProgress)}%
                </p>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden border border-slate-600">
                <motion.div
                  className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${bandBProgress}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Skill Accuracy */}
          <motion.div
            className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-green-400" />
              技能準確度
            </h3>

            {/* Reading Accuracy */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-300" />
                  閱讀
                </p>
                <p className="text-sm font-bold text-blue-400">
                  {Math.round(readingAccuracy)}%
                </p>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden border border-slate-600">
                <motion.div
                  className="bg-gradient-to-r from-blue-400 to-cyan-400 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${readingAccuracy}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Listening Accuracy */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-green-300" />
                  聽力
                </p>
                <p className="text-sm font-bold text-green-400">
                  {Math.round(listeningAccuracy)}%
                </p>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden border border-slate-600">
                <motion.div
                  className="bg-gradient-to-r from-green-400 to-emerald-400 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${listeningAccuracy}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-lg mb-8"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Star className="w-7 h-7 text-yellow-400" />
            成就
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {achievementsList.map((achievement, index) => {
              const isUnlocked = unlockedAchievements.includes(
                achievement.id
              );
              const AchievementIcon = achievement.icon;

              return (
                <motion.div
                  key={achievement.id}
                  className={`rounded-lg p-4 text-center cursor-pointer transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-yellow-700 to-yellow-800 border border-yellow-600 shadow-lg'
                      : 'bg-slate-700 border border-slate-600 opacity-50'
                  }`}
                  variants={itemVariants}
                  whileHover={isUnlocked ? { scale: 1.1, y: -5 } : {}}
                  transition={{ delay: index * 0.05 }}
                >
                  {isUnlocked && (
                    <motion.div
                      className="absolute top-2 right-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity }}
                    >
                      <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                    </motion.div>
                  )}
                  <motion.div
                    animate={
                      isUnlocked
                        ? { scale: [1, 1.1, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <AchievementIcon
                      className={`w-8 h-8 mx-auto mb-2 ${
                        isUnlocked
                          ? 'text-white'
                          : 'text-gray-500'
                      }`}
                    />
                  </motion.div>
                  <p
                    className={`text-xs font-bold mb-1 ${
                      isUnlocked ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    {achievement.name}
                  </p>
                  <p
                    className={`text-xs ${
                      isUnlocked ? 'text-yellow-100' : 'text-gray-500'
                    }`}
                  >
                    {achievement.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Action Buttons */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Continue Reading */}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
            <Link to="/reading">
              <button className="w-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg border border-blue-500/50 flex items-center justify-center gap-3">
                <BookOpen className="w-5 h-5" />
                繼續閱讀測驗
              </button>
            </Link>
          </motion.div>

          {/* Continue Listening */}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
            <Link to="/listening">
              <button className="w-full bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg border border-green-500/50 flex items-center justify-center gap-3">
                <Headphones className="w-5 h-5" />
                繼續聽力測驗
              </button>
            </Link>
          </motion.div>

          {/* Leaderboard */}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
            <Link to="/leaderboard">
              <button className="w-full bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg border border-purple-500/50 flex items-center justify-center gap-3">
                <Trophy className="w-5 h-5" />
                查看排行榜
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
