import { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { updateUserData } from '../firebase';

const GameContext = createContext();

export function GameProvider({ children }) {
  const { user, userData, refreshUserData } = useAuth();
  const [currentXPGain, setCurrentXPGain] = useState(0);
  const [showXPAnimation, setShowXPAnimation] = useState(false);

  const calculateXP = (correct, total, band, isListening) => {
    const baseXP = band === 'A' ? 10 : 15;
    const accuracy = correct / total;
    let xp = Math.round(correct * baseXP * (1 + accuracy * 0.5));
    if (isListening) xp = Math.round(xp * 1.2); // listening bonus
    if (accuracy === 1) xp = Math.round(xp * 1.5); // perfect bonus
    return xp;
  };

  const submitQuizResult = useCallback(async (result) => {
    if (!user || !userData) return;

    const { correct, total, band, type, quizId } = result;
    const isListening = type === 'listening';
    const xpGained = calculateXP(correct, total, band, isListening);

    const statsKey = isListening ? 'listeningStats' : 'readingStats';
    const currentStats = userData[statsKey] || { correct: 0, total: 0 };
    const bandProgressKey = band === 'A' ? 'bandAProgress' : 'bandBProgress';

    const completedQuizzes = userData.completedQuizzes || [];
    if (!completedQuizzes.includes(quizId)) {
      completedQuizzes.push(quizId);
    }

    // Calculate band progress
    const bandQuizzes = completedQuizzes.filter(id => id.startsWith(`band${band}`));
    const totalBandQuizzes = band === 'A' ? 20 : 20; // total available quizzes per band
    const progress = Math.min(100, Math.round((bandQuizzes.length / totalBandQuizzes) * 100));

    // Check achievements
    const achievements = [...(userData.achievements || [])];
    // First quiz
    if (!achievements.includes('first_quiz')) achievements.push('first_quiz');
    if (xpGained >= 50 && !achievements.includes('xp_master')) achievements.push('xp_master');
    if (correct === total && !achievements.includes('perfect_score')) achievements.push('perfect_score');
    if ((userData.streak || 0) >= 7 && !achievements.includes('week_streak')) achievements.push('week_streak');
    if (completedQuizzes.length >= 10 && !achievements.includes('quiz_10')) achievements.push('quiz_10');
    if (completedQuizzes.length >= 50 && !achievements.includes('quiz_50')) achievements.push('quiz_50');
    // Reading/Listening master: 90%+ accuracy with at least 20 total questions
    const newReadingStats = type === 'reading'
      ? { correct: currentStats.correct + correct, total: currentStats.total + total }
      : (userData.readingStats || { correct: 0, total: 0 });
    const newListeningStats = type === 'listening'
      ? { correct: currentStats.correct + correct, total: currentStats.total + total }
      : (userData.listeningStats || { correct: 0, total: 0 });
    if (newReadingStats.total >= 20 && (newReadingStats.correct / newReadingStats.total) >= 0.9 && !achievements.includes('reading_master')) {
      achievements.push('reading_master');
    }
    if (newListeningStats.total >= 20 && (newListeningStats.correct / newListeningStats.total) >= 0.9 && !achievements.includes('listening_master')) {
      achievements.push('listening_master');
    }
    // Band completion: progress reaches 100%
    if (progress >= 100 && band === 'A' && !achievements.includes('band_a_complete')) {
      achievements.push('band_a_complete');
    }
    if (progress >= 100 && band === 'B' && !achievements.includes('band_b_complete')) {
      achievements.push('band_b_complete');
    }

    await updateUserData(user.uid, {
      totalXP: (userData.totalXP || 0) + xpGained,
      [statsKey]: {
        correct: currentStats.correct + correct,
        total: currentStats.total + total,
      },
      [bandProgressKey]: progress,
      completedQuizzes,
      achievements,
    });

    setCurrentXPGain(xpGained);
    setShowXPAnimation(true);
    setTimeout(() => setShowXPAnimation(false), 2000);
    await refreshUserData();

    return xpGained;
  }, [user, userData, refreshUserData]);

  return (
    <GameContext.Provider value={{
      submitQuizResult,
      currentXPGain,
      showXPAnimation,
      calculateXP,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
