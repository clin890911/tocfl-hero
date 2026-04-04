import { Target, Award, Star, Flame, BookOpen, Trophy, Headphones, Medal, Crown, Zap } from 'lucide-react';

export const achievementsList = [
  { id: 'first_quiz', name: '初試身手', description: '完成第一次測驗', icon: Target, xpReward: 20 },
  { id: 'perfect_score', name: '滿分達人', description: '測驗中全部答對', icon: Award, xpReward: 50 },
  { id: 'xp_master', name: '經驗大師', description: '單次測驗獲得50XP以上', icon: Star, xpReward: 30 },
  { id: 'week_streak', name: '連續七天', description: '連續登入練習7天', icon: Flame, xpReward: 100 },
  { id: 'quiz_10', name: '學習達人', description: '完成10次測驗', icon: BookOpen, xpReward: 50 },
  { id: 'quiz_50', name: '華語英雄', description: '完成50次測驗', icon: Trophy, xpReward: 200 },
  { id: 'reading_master', name: '閱讀高手', description: '閱讀測驗正確率達90%以上', icon: BookOpen, xpReward: 80 },
  { id: 'listening_master', name: '聽力高手', description: '聽力測驗正確率達90%以上', icon: Headphones, xpReward: 80 },
  { id: 'band_a_complete', name: 'Band A 完成', description: '完成所有入門基礎級題目', icon: Medal, xpReward: 150 },
  { id: 'band_b_complete', name: 'Band B 完成', description: '完成所有進階高階級題目', icon: Crown, xpReward: 300 },
];

export const getLevelInfo = (totalXP) => {
  const levels = [
    { level: 1, name: '華語新手', minXP: 0, maxXP: 100, color: '#94a3b8' },
    { level: 2, name: '詞彙學徒', minXP: 100, maxXP: 300, color: '#22c55e' },
    { level: 3, name: '語法探索者', minXP: 300, maxXP: 600, color: '#3b82f6' },
    { level: 4, name: '閱讀達人', minXP: 600, maxXP: 1000, color: '#8b5cf6' },
    { level: 5, name: '聽力高手', minXP: 1000, maxXP: 1500, color: '#f59e0b' },
    { level: 6, name: '華語戰士', minXP: 1500, maxXP: 2200, color: '#ef4444' },
    { level: 7, name: '考試勇者', minXP: 2200, maxXP: 3000, color: '#ec4899' },
    { level: 8, name: '華語英雄', minXP: 3000, maxXP: 4000, color: '#f97316' },
    { level: 9, name: 'TOCFL 大師', minXP: 4000, maxXP: 5500, color: '#14b8a6' },
    { level: 10, name: '華語傳奇', minXP: 5500, maxXP: Infinity, color: '#fbbf24' },
  ];

  const current = levels.find(l => totalXP >= l.minXP && totalXP < l.maxXP) || levels[levels.length - 1];
  const progress = current.maxXP === Infinity
    ? 100
    : Math.round(((totalXP - current.minXP) / (current.maxXP - current.minXP)) * 100);

  return { ...current, progress, totalXP };
};

export default achievementsList;
