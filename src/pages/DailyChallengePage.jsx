import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, CheckCircle, XCircle, ArrowRight, Trophy, Flame, Home, RotateCcw, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { useLanguage } from '../contexts/LanguageContext';
import { readingQuestions } from '../data/readingQuestions';
import { listeningQuestions } from '../data/listeningQuestions';
import { addToSR } from '../data/spacedRepetition';
import { logStudySession } from './AnalyticsPage';

const DAILY_KEY = 'tocfl_daily_challenge';
const DAILY_RESULT_KEY = 'tocfl_daily_result';

// 根據日期產生固定的隨機種子
const seededRandom = (seed) => {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// 每日隨機選題（同一天每人看到一樣的題目）
const getDailyQuestions = () => {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  const allReading = [
    ...(readingQuestions.bandA || []),
    ...(readingQuestions.bandB || []),
  ].filter(q => !q.subQuestions); // 只取單題

  const allListening = [
    ...(listeningQuestions.bandA || []),
    ...(listeningQuestions.bandB || []),
  ].filter(q => !q.subQuestions);

  // 用 seed 排序
  const sortedReading = [...allReading].sort((a, b) => seededRandom(seed + a.id.length) - seededRandom(seed + b.id.length));
  const sortedListening = [...allListening].sort((a, b) => seededRandom(seed + a.id.length + 1000) - seededRandom(seed + b.id.length + 1000));

  // 選 5 道閱讀 + 5 道聽力
  const readingPicks = sortedReading.slice(0, 5).map(q => ({ ...q, dailyType: 'reading' }));
  const listeningPicks = sortedListening.slice(0, 5).map(q => ({ ...q, dailyType: 'listening' }));

  // 交錯排列
  const mixed = [];
  for (let i = 0; i < 5; i++) {
    if (readingPicks[i]) mixed.push(readingPicks[i]);
    if (listeningPicks[i]) mixed.push(listeningPicks[i]);
  }

  return mixed;
};

// 檢查今天是否已完成
const getTodayResult = () => {
  try {
    const data = JSON.parse(localStorage.getItem(DAILY_RESULT_KEY) || '{}');
    const today = new Date().toDateString();
    if (data.date === today) return data;
    return null;
  } catch {
    return null;
  }
};

export default function DailyChallengePage() {
  const { user, userData } = useAuth();
  const { submitQuizResult } = useGame();
  const { lang, t } = useLanguage();
  const [phase, setPhase] = useState('intro'); // 'intro', 'quiz', 'result'
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [todayResult, setTodayResult] = useState(null);

  useEffect(() => {
    const result = getTodayResult();
    if (result) {
      setTodayResult(result);
    }
    setQuestions(getDailyQuestions());
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleStart = () => {
    setPhase('quiz');
    setStartTime(Date.now());
    setCurrentIndex(0);
    setAnswers({});
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswer = useCallback((optionIndex) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    const isCorrect = optionIndex === currentQuestion.answer;
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: { selected: optionIndex, correct: isCorrect }
    }));

    // 答錯加入 SR 系統
    if (!isCorrect) {
      addToSR(currentQuestion.id, currentQuestion.dailyType || 'reading');
    }
  }, [selectedAnswer, currentQuestion, currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // 完成
      const end = Date.now();
      setEndTime(end);

      const correctCount = Object.values(answers).filter(a => a.correct).length +
        (selectedAnswer === currentQuestion?.answer ? 1 : 0);
      // Recount properly
      const allAnswers = { ...answers, [currentIndex]: { selected: selectedAnswer, correct: selectedAnswer === currentQuestion?.answer } };
      const finalCorrect = Object.values(allAnswers).filter(a => a.correct).length;

      const result = {
        date: new Date().toDateString(),
        correct: finalCorrect,
        total: questions.length,
        time: Math.round((end - startTime) / 1000),
        accuracy: Math.round((finalCorrect / questions.length) * 100),
      };

      localStorage.setItem(DAILY_RESULT_KEY, JSON.stringify(result));
      setTodayResult(result);

      // 提交 XP
      if (user && userData) {
        submitQuizResult({
          correct: finalCorrect,
          total: questions.length,
          band: 'A',
          type: 'reading',
          quizId: `daily-${new Date().toISOString().slice(0, 10)}`,
        });
      }

      // Log for analytics
      logStudySession('daily', finalCorrect, questions.length, 'A');
      setPhase('result');
    }
  }, [currentIndex, questions, answers, selectedAnswer, currentQuestion, startTime, user, userData, submitQuizResult]);

  // ===== 已完成今日挑戰 =====
  if (todayResult && phase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 flex items-center justify-center px-4">
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('daily.alreadyDone')}</h2>
          <p className="text-gray-600 mb-6">{t('daily.comeBackTomorrow')}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-2xl font-bold text-green-600">{todayResult.correct}/{todayResult.total}</p>
              <p className="text-xs text-green-700">{t('results.score')}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-2xl font-bold text-blue-600">{todayResult.accuracy}%</p>
              <p className="text-xs text-blue-700">{t('results.accuracy')}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3">
              <p className="text-2xl font-bold text-purple-600">{todayResult.time}s</p>
              <p className="text-xs text-purple-700">{t('results.time')}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              to="/reading"
              className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-xl text-center"
            >
              📖 {t('daily.practiceMore')}
            </Link>
            <Link
              to="/"
              className="block w-full text-gray-600 hover:text-gray-800 font-medium py-3 text-center"
            >
              ← {t('quiz.backHome')}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ===== Intro 畫面 =====
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 flex items-center justify-center px-4">
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="text-7xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            ⚡
          </motion.div>

          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{t('daily.title')}</h1>
          <p className="text-gray-600 mb-6">{t('daily.description')}</p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-blue-600">10</p>
              <p className="text-xs text-blue-700">{t('daily.questions')}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-purple-600">5+5</p>
              <p className="text-xs text-purple-700">{t('daily.readListen')}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-amber-600">2x</p>
              <p className="text-xs text-amber-700">XP Bonus</p>
            </div>
          </div>

          <motion.button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg"
            whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(245,158,11,0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            🚀 {t('daily.startChallenge')}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // ===== 結果畫面 =====
  if (phase === 'result' && todayResult) {
    const emoji = todayResult.accuracy === 100 ? '🏆' : todayResult.accuracy >= 80 ? '🌟' : todayResult.accuracy >= 60 ? '💪' : '📚';
    const message = todayResult.accuracy === 100
      ? t('results.perfect')
      : todayResult.accuracy >= 80
      ? t('results.great')
      : todayResult.accuracy >= 60
      ? t('results.good')
      : t('results.keepGoing');

    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 flex items-center justify-center px-4">
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="text-7xl mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {emoji}
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('daily.challengeComplete')}</h2>
          <p className="text-gray-600 mb-6">{message}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-green-600">{todayResult.correct}</p>
              <p className="text-xs text-green-700">/ {todayResult.total} {t('quiz.correct')}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-blue-600">{todayResult.accuracy}%</p>
              <p className="text-xs text-blue-700">{t('results.accuracy')}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-purple-600">{todayResult.time}s</p>
              <p className="text-xs text-purple-700">{t('results.time')}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              to="/flashcard"
              className="block w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 rounded-xl text-center"
            >
              📝 {t('daily.studyVocab')}
            </Link>
            <Link
              to="/"
              className="block w-full text-gray-600 hover:text-gray-800 font-medium py-3 text-center"
            >
              ← {t('quiz.backHome')}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ===== Quiz 畫面 =====
  if (!currentQuestion) return null;

  const isReading = currentQuestion.dailyType === 'reading';

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 pt-6 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Zap className="text-amber-500" size={20} />
            <span className="font-bold text-gray-800">{t('daily.title')}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              isReading ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
            }`}>
              {isReading ? '📖' : '🎧'} {isReading ? t('nav.reading') : t('nav.listening')}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Question Card */}
        <motion.div
          key={currentIndex}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Audio text for listening */}
          {!isReading && currentQuestion.audioText && (
            <div className="bg-purple-50 rounded-xl p-4 mb-4 border border-purple-100">
              <p className="text-sm text-purple-600 font-medium mb-1">🎧 {t('daily.listenText')}</p>
              <p className="text-gray-800">{currentQuestion.audioText}</p>
            </div>
          )}

          {/* Passage for reading */}
          {isReading && currentQuestion.passage && (
            <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
              <p className="text-gray-800 leading-relaxed">{currentQuestion.passage}</p>
            </div>
          )}

          {/* Question */}
          <h3 className="text-lg font-bold text-gray-800 mb-6">{currentQuestion.question}</h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQuestion.answer;
              const showResult = selectedAnswer !== null;

              let bgClass = 'bg-gray-50 hover:bg-gray-100 border-gray-200';
              if (showResult) {
                if (isCorrect) bgClass = 'bg-green-50 border-green-400';
                else if (isSelected && !isCorrect) bgClass = 'bg-red-50 border-red-400';
                else bgClass = 'bg-gray-50 border-gray-200 opacity-60';
              }

              return (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${bgClass}`}
                  whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      showResult && isCorrect ? 'bg-green-500 text-white' :
                      showResult && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {showResult && isCorrect ? '✓' : showResult && isSelected && !isCorrect ? '✗' : String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-gray-800">{option}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && currentQuestion.explanation && (
              <motion.div
                className="mt-6 bg-amber-50 rounded-xl p-4 border border-amber-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p className="text-sm font-semibold text-amber-700 mb-1">💡 {t('quiz.explanation')}</p>
                <p className="text-gray-700 text-sm">{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Next Button */}
        {selectedAnswer !== null && (
          <motion.button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {currentIndex < questions.length - 1 ? (
              <span className="flex items-center justify-center gap-2">
                {t('quiz.next')} <ArrowRight size={20} />
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                {t('daily.seeResults')} <Trophy size={20} />
              </span>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
