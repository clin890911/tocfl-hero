import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw, CheckCircle, XCircle, ArrowRight, Brain, Home,
  BookOpen, Headphones, Volume2, Trophy, Zap, ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getDueReviews, reviewItem, getSRStats, loadSRData } from '../data/spacedRepetition';
import { readingQuestions } from '../data/readingQuestions';
import { listeningQuestions } from '../data/listeningQuestions';
import { logStudySession } from './AnalyticsPage';

// Build a flat lookup map: questionId → question object
const buildQuestionMap = () => {
  const map = {};
  const addQuestions = (source, type) => {
    Object.values(source).forEach(bandArr => {
      if (!Array.isArray(bandArr)) return;
      bandArr.forEach(q => {
        map[q.id] = { ...q, _type: type };
        // Handle sub-questions (reading comprehension passages)
        if (q.questions && Array.isArray(q.questions)) {
          q.questions.forEach((subQ, idx) => {
            const subId = `${q.id}-sub${idx + 1}`;
            map[subId] = {
              id: subId,
              type: q.type,
              category: q.category,
              difficulty: q.difficulty,
              passage: q.passage || null,
              audioText: q.audioText || null,
              question: subQ.question,
              options: subQ.options,
              answer: subQ.answer,
              explanation: subQ.explanation,
              pinyin: q.pinyin || null,
              _type: type,
              _parentId: q.id,
            };
          });
        }
      });
    });
  };
  addQuestions(readingQuestions, 'reading');
  addQuestions(listeningQuestions, 'listening');
  return map;
};

const questionMap = buildQuestionMap();

// TTS helper
const speakText = (text, rate = 1) => {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-TW';
  utterance.rate = rate;
  const voices = window.speechSynthesis.getVoices();
  const zhVoice = voices.find(v => v.lang.includes('zh')) || voices[0];
  if (zhVoice) utterance.voice = zhVoice;
  window.speechSynthesis.speak(utterance);
};

const SmartReviewPage = () => {
  const { lang } = useLanguage();
  const [phase, setPhase] = useState('intro'); // intro | quiz | result
  const [reviewQueue, setReviewQueue] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState([]); // { questionId, correct, quality }
  const [srStats, setSrStats] = useState(null);

  useEffect(() => {
    setSrStats(getSRStats());
  }, []);

  // Build review queue from due SR items
  const startReview = useCallback(() => {
    const dueItems = getDueReviews();
    const queue = dueItems
      .map(item => {
        const q = questionMap[item.questionId];
        if (!q) return null;
        return { ...q, srItem: item };
      })
      .filter(Boolean);

    if (queue.length === 0) return;
    setReviewQueue(queue);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setResults([]);
    setPhase('quiz');
  }, []);

  const currentQuestion = reviewQueue[currentIdx];

  const handleAnswer = (optionIndex) => {
    if (answered) return;
    setSelectedAnswer(optionIndex);
    setAnswered(true);

    const isCorrect = optionIndex === currentQuestion.answer;
    const quality = isCorrect ? 4 : 1;

    // Update SM-2
    reviewItem(currentQuestion.id, quality);

    setResults(prev => [...prev, {
      questionId: currentQuestion.id,
      correct: isCorrect,
      quality,
    }]);
  };

  const handleNext = () => {
    window.speechSynthesis.cancel();
    if (currentIdx < reviewQueue.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      // Finish
      const correctCount = results.length > 0
        ? results.filter(r => r.correct).length + (selectedAnswer === currentQuestion?.answer ? 1 : 0)
        : (selectedAnswer === currentQuestion?.answer ? 1 : 0);
      logStudySession('review', correctCount, reviewQueue.length, 'SR');
      setSrStats(getSRStats());
      setPhase('result');
    }
  };

  const correctCount = results.filter(r => r.correct).length;
  const totalCount = results.length;

  // ===== INTRO SCREEN =====
  if (phase === 'intro') {
    const dueCount = srStats?.dueNow || 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto pt-8">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl shadow-xl mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              {lang === 'id' ? 'Review Cerdas' : '智慧複習'}
            </h1>
            <p className="text-gray-500 text-lg">
              {lang === 'id'
                ? 'Sistem SM-2 memilih soal yang paling perlu kamu ulangi'
                : 'SM-2 演算法自動挑選最需要複習的題目'}
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white rounded-xl p-5 shadow-lg text-center border-2 border-rose-200">
              <p className="text-3xl font-bold text-rose-600">{dueCount}</p>
              <p className="text-sm text-gray-500 mt-1">{lang === 'id' ? 'Perlu Review' : '待複習'}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-lg text-center border-2 border-amber-200">
              <p className="text-3xl font-bold text-amber-600">{srStats?.dueTomorrow || 0}</p>
              <p className="text-sm text-gray-500 mt-1">{lang === 'id' ? 'Besok' : '明日到期'}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-lg text-center border-2 border-green-200">
              <p className="text-3xl font-bold text-green-600">{srStats?.mastering || 0}</p>
              <p className="text-sm text-gray-500 mt-1">{lang === 'id' ? 'Hampir Hafal' : '即將掌握'}</p>
            </div>
          </motion.div>

          {/* Breakdown */}
          {srStats && srStats.totalItems > 0 && (
            <motion.div
              className="bg-white rounded-xl p-5 shadow-lg mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  {lang === 'id' ? 'Membaca' : '閱讀'}
                </span>
                <span className="text-sm font-bold text-blue-600">{srStats.readingItems}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-green-500" />
                  {lang === 'id' ? 'Mendengar' : '聽力'}
                </span>
                <span className="text-sm font-bold text-green-600">{srStats.listeningItems}</span>
              </div>
            </motion.div>
          )}

          {/* Start Button */}
          {dueCount > 0 ? (
            <motion.button
              onClick={startReview}
              className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-xl py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {lang === 'id' ? `Mulai Review (${dueCount} soal)` : `開始複習 (${dueCount} 題)`}
            </motion.button>
          ) : (
            <motion.div
              className="text-center bg-green-50 border-2 border-green-200 rounded-2xl p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-700 mb-2">
                {lang === 'id' ? 'Semua Selesai!' : '全部完成！'}
              </h3>
              <p className="text-green-600">
                {lang === 'id'
                  ? 'Tidak ada soal yang perlu direview saat ini. Kembali nanti!'
                  : '目前沒有需要複習的題目，晚點再來！'}
              </p>
              <Link to="/" className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors">
                <Home className="w-5 h-5" />
                {lang === 'id' ? 'Kembali' : '回首頁'}
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // ===== QUIZ SCREEN =====
  if (phase === 'quiz' && currentQuestion) {
    const isListening = currentQuestion._type === 'listening';
    const progress = ((currentIdx + 1) / reviewQueue.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-500" />
                {lang === 'id' ? 'Review Cerdas' : '智慧複習'}
              </span>
              <span className="text-sm font-medium text-gray-500">
                {currentIdx + 1} / {reviewQueue.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div
                className="bg-gradient-to-r from-rose-500 to-purple-500 h-2.5 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Type Badge */}
          <div className="flex items-center gap-2 mb-4">
            {isListening ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <Headphones className="w-4 h-4" /> {lang === 'id' ? 'Mendengar' : '聽力'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <BookOpen className="w-4 h-4" /> {lang === 'id' ? 'Membaca' : '閱讀'}
              </span>
            )}
            <span className="text-xs text-gray-400">
              {currentQuestion.category}
            </span>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentIdx}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Listening: Audio Button */}
            {isListening && currentQuestion.audioText && (
              <div className="mb-5">
                <button
                  onClick={() => speakText(currentQuestion.audioText.replace(/\n/g, '。'))}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all shadow-md"
                >
                  <Volume2 className="w-5 h-5" />
                  {lang === 'id' ? 'Putar Audio' : '播放音訊'}
                </button>
                {answered && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 whitespace-pre-line">
                    {currentQuestion.audioText}
                  </div>
                )}
              </div>
            )}

            {/* Reading: Passage */}
            {currentQuestion.passage && (
              <div className="mb-5 p-4 bg-blue-50 rounded-xl border border-blue-100 text-gray-700 leading-relaxed whitespace-pre-line">
                {currentQuestion.passage}
              </div>
            )}

            {/* Question Text */}
            <h2 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                let classes = 'border-2 border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50';
                if (answered) {
                  if (idx === currentQuestion.answer) {
                    classes = 'border-2 border-green-500 bg-green-50';
                  } else if (idx === selectedAnswer && idx !== currentQuestion.answer) {
                    classes = 'border-2 border-red-400 bg-red-50';
                  } else {
                    classes = 'border-2 border-gray-100 bg-gray-50 opacity-60';
                  }
                } else if (idx === selectedAnswer) {
                  classes = 'border-2 border-purple-500 bg-purple-50';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={answered}
                    className={`w-full text-left px-5 py-4 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${classes}`}
                  >
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      answered && idx === currentQuestion.answer
                        ? 'bg-green-500 text-white'
                        : answered && idx === selectedAnswer
                        ? 'bg-red-400 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-gray-700">{option}</span>
                    {answered && idx === currentQuestion.answer && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                    {answered && idx === selectedAnswer && idx !== currentQuestion.answer && (
                      <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {answered && currentQuestion.explanation && (
              <motion.div
                className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-sm font-semibold text-amber-700 mb-1">
                  {lang === 'id' ? 'Penjelasan' : '解析'}
                </p>
                <p className="text-sm text-amber-800">{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Next Button */}
          {answered && (
            <motion.button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
            >
              {currentIdx < reviewQueue.length - 1 ? (
                <>
                  {lang === 'id' ? 'Soal Berikutnya' : '下一題'}
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  {lang === 'id' ? 'Lihat Hasil' : '查看結果'}
                  <Trophy className="w-5 h-5" />
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    );
  }

  // ===== RESULT SCREEN =====
  if (phase === 'result') {
    const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const newStats = srStats;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-6">
        <div className="max-w-2xl mx-auto pt-8">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {accuracy >= 80 ? '🎉' : accuracy >= 50 ? '💪' : '📖'}
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {lang === 'id' ? 'Review Selesai!' : '複習完成！'}
            </h1>
            <p className="text-gray-500">
              {accuracy >= 80
                ? (lang === 'id' ? 'Luar biasa! Kamu menguasai materi ini!' : '太棒了！你掌握了這些內容！')
                : accuracy >= 50
                ? (lang === 'id' ? 'Bagus! Terus latihan untuk lebih baik!' : '不錯！繼續練習會更好！')
                : (lang === 'id' ? 'Jangan menyerah! Latihan membuat sempurna!' : '別放棄！練習使完美！')
              }
            </p>
          </motion.div>

          {/* Score Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-4xl font-bold text-purple-600">{correctCount}</p>
                <p className="text-sm text-gray-400 mt-1">{lang === 'id' ? 'Benar' : '答對'}</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-800">{totalCount}</p>
                <p className="text-sm text-gray-400 mt-1">{lang === 'id' ? 'Total' : '總題數'}</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-green-600">{accuracy}%</p>
                <p className="text-sm text-gray-400 mt-1">{lang === 'id' ? 'Akurasi' : '正確率'}</p>
              </div>
            </div>

            {/* Remaining */}
            {newStats && newStats.dueNow > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-amber-600 font-medium">
                  {lang === 'id'
                    ? `Masih ada ${newStats.dueNow} soal yang perlu direview`
                    : `還有 ${newStats.dueNow} 題待複習`}
                </p>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(newStats?.dueNow || 0) > 0 && (
              <motion.button
                onClick={startReview}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <RotateCcw className="w-5 h-5" />
                {lang === 'id' ? 'Lanjut Review' : '繼續複習'}
              </motion.button>
            )}
            <Link to="/">
              <motion.div
                className="flex items-center justify-center gap-2 bg-white text-gray-700 border-2 border-gray-200 font-bold py-4 rounded-xl hover:border-purple-300 transition-all"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Home className="w-5 h-5" />
                {lang === 'id' ? 'Kembali' : '回首頁'}
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SmartReviewPage;
