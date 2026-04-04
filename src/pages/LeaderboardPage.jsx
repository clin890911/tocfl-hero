import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Star, Crown, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getLeaderboard } from '../firebase';
import { getLevelInfo } from '../data/achievements';

// Mock data for demo/development
const mockLeaderboard = [
  { id: '1', displayName: 'Adi Pratama', photoURL: null, totalXP: 2450, streak: 15 },
  { id: '2', displayName: 'Siti Rahayu', photoURL: null, totalXP: 2100, streak: 12 },
  { id: '3', displayName: 'Budi Santoso', photoURL: null, totalXP: 1890, streak: 8 },
  { id: '4', displayName: 'Dewi Lestari', photoURL: null, totalXP: 1750, streak: 10 },
  { id: '5', displayName: 'Raka Wijaya', photoURL: null, totalXP: 1620, streak: 9 },
  { id: '6', displayName: 'Indah Kusuma', photoURL: null, totalXP: 1480, streak: 7 },
  { id: '7', displayName: 'Ahmad Rizki', photoURL: null, totalXP: 1340, streak: 6 },
  { id: '8', displayName: 'Maya Handini', photoURL: null, totalXP: 1210, streak: 5 },
  { id: '9', displayName: 'Fajar Cahyo', photoURL: null, totalXP: 1050, streak: 4 },
  { id: '10', displayName: 'Lisa Wahyu', photoURL: null, totalXP: 890, streak: 3 },
];

const Avatar = ({ src, name, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-2xl',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white`}
      />
    );
  }

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold border-2 border-white`}
    >
      {initials}
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
    ))}
  </div>
);

const TopThreePodium = ({ leaderboard, currentUserId, t }) => {
  const top3 = leaderboard.slice(0, 3);

  // Podium layout: 2nd | 1st | 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]];
  const podiumHeights = ['h-32', 'h-40', 'h-24'];
  const medals = [
    { icon: Medal, color: 'text-gray-400', bg: 'bg-gray-500/20' },
    { icon: Crown, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
    { icon: Medal, color: 'text-orange-400', bg: 'bg-orange-500/20' },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Trophy className="text-yellow-400" />
        {t('leaderboard.top3')}
      </h2>
      <div className="flex items-end justify-center gap-4 h-80">
        {podiumOrder.map((player, idx) => {
          const MedalIcon = medals[idx].icon;
          const isCurrentUser = player?.id === currentUserId;
          const level = player?.totalXP ? getLevelInfo(player.totalXP)?.level || 1 : 1;

          return (
            <motion.div
              key={player?.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Podium box */}
              <motion.div
                className={`${podiumHeights[idx]} ${medals[idx].bg} rounded-t-lg w-24 flex flex-col items-center justify-end pb-4 border-2 border-white/30 backdrop-blur-sm relative`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Medal Icon */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4"
                >
                  <MedalIcon className={`${medals[idx].color} w-8 h-8`} />
                </motion.div>

                {/* Player Info */}
                <div className="text-center">
                  <Avatar src={player?.photoURL} name={player?.displayName || '?'} size="lg" />
                  <p className="mt-2 text-white font-bold text-sm truncate w-full px-1">
                    {player?.displayName || 'Unknown'}
                  </p>
                  <p className="text-xs text-gray-200">Level {level}</p>
                  <p className="text-white font-bold text-sm mt-1">{player?.totalXP || 0} XP</p>
                </div>
              </motion.div>

              {/* Rank Badge */}
              <div className={`text-white font-bold text-2xl mt-2 ${medals[idx].color}`}>
                #{idx === 0 ? 2 : idx === 1 ? 1 : 3}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const LeaderboardTable = ({ leaderboard, currentUserId, isLoading, t }) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }

  const tableRows = leaderboard.slice(3); // 4th place onwards

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Users className="text-blue-400" />
        {t('leaderboard.rest')}
      </h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {tableRows.map((player, idx) => {
            const isCurrentUser = player.id === currentUserId;
            const level = player.totalXP ? getLevelInfo(player.totalXP)?.level || 1 : 1;
            const rank = idx + 4;

            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                  isCurrentUser
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-blue-400 shadow-lg shadow-blue-500/50'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02, x: 4 }}
              >
                {/* Rank */}
                <div className="flex-shrink-0 text-center w-12">
                  <motion.div
                    className={`text-2xl font-bold ${
                      rank <= 10 ? 'text-yellow-400' : 'text-gray-400'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                  >
                    #{rank}
                  </motion.div>
                </div>

                {/* Avatar */}
                <Avatar src={player.photoURL} name={player.displayName} size="md" />

                {/* Player Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate flex items-center gap-2">
                    {player.displayName}
                    {isCurrentUser && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {t('leaderboard.you')}
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Star className="w-4 h-4" />
                    Level {level}
                  </div>
                </div>

                {/* XP and Trend */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-white font-bold">{player.totalXP} XP</p>
                  {player.streak > 0 && (
                    <motion.div
                      className="flex items-center gap-1 text-orange-400 text-sm"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <TrendingUp className="w-4 h-4" />
                      {player.streak} {t('leaderboard.dayStreak')}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

const LoginCTA = ({ t }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-center mt-8"
  >
    <h3 className="text-white font-bold text-lg mb-2">
      {t('leaderboard.loginToCompete')}
    </h3>
    <p className="text-gray-100 mb-4">
      {t('leaderboard.loginToCompete')}
    </p>
    <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors">
      {t('nav.login')}
    </button>
  </motion.div>
);

export default function LeaderboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const data = await getLeaderboard();
        setLeaderboard(data || mockLeaderboard);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        // Fall back to mock data on error
        setLeaderboard(mockLeaderboard);
        setError('Using demo data. Real leaderboard unavailable.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative pt-8 pb-12 bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-b-2 border-white/20 backdrop-blur-sm"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-2 flex items-center gap-3">
            {t('leaderboard.title')}
          </h1>
          <p className="text-gray-200 text-lg">
            {t('leaderboard.loginToCompete')}
          </p>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 bg-yellow-500/20 border border-yellow-500 text-yellow-200 px-4 py-2 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {isLoading ? (
          <SkeletonLoader />
        ) : leaderboard && leaderboard.length > 0 ? (
          <>
            {/* Top 3 Podium */}
            <TopThreePodium
              leaderboard={leaderboard}
              currentUserId={user?.uid}
              t={t}
            />

            {/* Leaderboard Table */}
            <LeaderboardTable
              leaderboard={leaderboard}
              currentUserId={user?.uid}
              isLoading={isLoading}
              t={t}
            />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-white text-xl font-bold mb-2">{t('leaderboard.noData')}</h3>
            <p className="text-gray-300">
              {t('leaderboard.noData')}
            </p>
          </motion.div>
        )}

        {/* Login CTA - Only show if user is not logged in */}
        {!user && <LoginCTA t={t} />}
      </div>
    </div>
  );
}
