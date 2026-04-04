import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ChevronRight,
  Check,
  X,
  RotateCcw,
  Trophy,
  Star,
  ArrowLeft,
  Clock,
  Filter,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { useLanguage } from '../contexts/LanguageContext';
import { readingQuestions } from '../data/readingQuestions';

const ReadingPage = () => {
  const { user } = useAuth();
  const { submitQuizResult } = useGame();
  const { lang, t } = useLanguage();

  const [screen, setScreen] = useState('band-select');
  const [selectedBand, setSelectedBand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | '選詞填空' | '閱讀理解'
  const [numQuestions, setNumQuestions] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [showPinyin, setShowPinyin] = useState(false);

  useEffect(() => {
    if (screen !== 'quiz' || !startTime) return;
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [screen, startTime]);

  const shuffleArray = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const flattenQuestions = (items) => {
    const result = [];
    items.forEach((item) => {
      if (item.questions && Array.isArray(item.questions)) {
        item.questions.forEach((subQ, idx) => {
          result.push({
            id: `${item.id}-sub${idx + 1}`,
            type: item.type,
            category: item.category,
            difficulty: item.difficulty,
            passage: item.passage || null,
            audioText: item.audioText || null,
            question: subQ.question,
            options: subQ.options,
            answer: subQ.answer,
            explanation: subQ.explanation,
            explanationId: subQ.explanationId || null,
            pinyin: item.pinyin || null,
            _parentId: item.id,
            _subIndex: idx,
            _totalSubs: item.questions.length,
          });
        });
      } else {
        result.push(item);
      }
    });
    return result;
  };

  // Get explanation based on current language
  const getExplanation = (q) => {
    if (lang === 'id' && q.explanationId) return q.explanationId;
    return q.explanation;
  };

  // Wrong answer bank (localStorage)
  const WRONG_BANK_KEY = 'tocfl_reading_wrong_bank';
  const getWrongBank = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem(WRONG_BANK_KEY) || '[]');
    } catch { return []; }
  }, []);

  const saveToWrongBank = useCallback((wrongItems) => {
    const existing = getWrongBank();
    const existingIds = new Set(existing.map(q => q.id));
    const newItems = wrongItems.filter(q => !existingIds.has(q.id));
    const merged = [...existing, ...newItems];
    localStorage.setItem(WRONG_BANK_KEY, JSON.stringify(merged));
  }, [getWrongBank]);

  const removeFromWrongBank = useCallback((questionId) => {
    const existing = getWrongBank();
    const updated = existing.filter(q => q.id !== questionId);
    localStorage.setItem(WRONG_BANK_KEY, JSON.stringify(updated));
  }, [getWrongBank]);

  const clearWrongBank = useCallback(() => {
    localStorage.removeItem(WRONG_BANK_KEY);
  }, []);

  const [wrongBankCount, setWrongBankCount] = useState(0);
  useEffect(() => {
    setWrongBankCount(getWrongBank().length);
  }, [screen, getWrongBank]);

  // Computed counts for Band B categories
  const bandBCounts = useMemo(() => {
    const cloze = readingQuestions.bandB.filter(q => q.category === '選詞填空');
    const reading = readingQuestions.bandB.filter(q => q.category === '閱讀理解');
    return {
      cloze: cloze.length,
      reading: reading.length,
      all: readingQuestions.bandB.length,
    };
  }, []);

  const startQuiz = (band, count, category = 'all') => {
    let bandData = band === 'A' ? readingQuestions.bandA : readingQuestions.bandB;
    // Apply category filter for Band B
    if (band === 'B' && category !== 'all') {
      bandData = bandData.filter(q => q.category === category);
    }
    let shuffled = shuffleArray(bandData);
    let selected = count === 'all' ? shuffled : shuffled.slice(0, parseInt(count));
    selected = flattenQuestions(selected);

    setSelectedBand(band);
    setNumQuestions(count);
    setQuestions(selected);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setAnswered(false);
    setStartTime(Date.now());
    setElapsed(0);
    setShowPinyin(false);
    setScreen('quiz');
  };

  const startWrongBankQuiz = () => {
    const wrongBank = getWrongBank();
    if (wrongBank.length === 0) return;
    const shuffled = shuffleArray(wrongBank);
    setSelectedBand('wrong');
    setNumQuestions(shuffled.length);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setAnswered(false);
    setStartTime(Date.now());
    setElapsed(0);
    setShowPinyin(false);
    setScreen('quiz');
  };

  const handleAnswerSelect = (optionIndex) => {
    if (answered) return;
    setSelectedAnswer(optionIndex);
    setAnswered(true);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.answer;
    setAnswers([
      ...answers,
      { questionId: currentQuestion.id, selectedAnswer: optionIndex, isCorrect },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setShowPinyin(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    const correctCount = answers.filter((a) => a.isCorrect).length;
    // Save wrong answers to wrong bank
    const wrongItems = answers
      .map((a, idx) => ({ ...a, question: questions[idx] }))
      .filter((a) => !a.isCorrect)
      .map((a) => a.question);
    if (wrongItems.length > 0) {
      saveToWrongBank(wrongItems);
    }
    // Remove correctly answered questions from wrong bank
    answers.forEach((a, idx) => {
      if (a.isCorrect) removeFromWrongBank(questions[idx].id);
    });
    if (user) {
      await submitQuizResult({
        correct: correctCount,
        total: questions.length,
        band: selectedBand,
        type: 'reading',
        quizId: `reading-${selectedBand}-${Date.now()}`,
      });
    }
    setScreen('results');
  };

  const handleRestart = () => {
    setScreen('band-select');
    setSelectedBand(null);
    setSelectedCategory('all');
    setNumQuestions(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setAnswered(false);
    setStartTime(null);
    setElapsed(0);
    setShowPinyin(false);
  };

  // Band selection screen
  if (screen === 'band-select') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <h1 className="text-4xl font-bold text-gray-800">{t('quiz.title.reading')}</h1>
            </div>
            <p className="text-gray-600">{t('quiz.selectDifficulty')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Band A Card */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="cursor-pointer">
              <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-lg p-8 text-white shadow-lg">
                <div className="mb-4">
                  <h2 className="text-3xl font-bold">{t('quiz.bandA')}</h2>
                  <p className="text-white/80">{t('quiz.levelA')}</p>
                </div>
                <p className="mb-6 text-white/90">
                  {t('quiz.totalQuestions').replace('{count}', readingQuestions.bandA.length)}
                </p>
                <div className="space-y-3">
                  {[5, 10, 20, 'all'].map((count) => (
                    <motion.button
                      key={count}
                      whileHover={{ x: 4 }}
                      onClick={() => startQuiz('A', count)}
                      className="w-full bg-white/20 hover:bg-white/30 rounded-lg py-3 font-semibold transition-all backdrop-blur-sm border border-white/30 hover:border-white/50"
                    >
                      {count === 'all'
                        ? t('quiz.allQuestions').replace('{count}', readingQuestions.bandA.length)
                        : t('quiz.questionsN').replace('{n}', count)}
                      <ChevronRight className="w-4 h-4 inline-block ml-2" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Band B Card with Category Filter */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="cursor-pointer">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-lg p-8 text-white shadow-lg">
                <div className="mb-4">
                  <h2 className="text-3xl font-bold">{t('quiz.bandB')}</h2>
                  <p className="text-white/80">{t('quiz.levelB')}</p>
                </div>

                {/* Category Filter Tabs */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Filter className="w-4 h-4 text-white/80" />
                    <span className="text-sm text-white/80 font-medium">
                      {lang === 'id' ? 'Kategori:' : '題型篩選：'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[
                      { key: 'all', label: lang === 'id' ? 'Semua' : '全部', count: bandBCounts.all },
                      { key: '選詞填空', label: lang === 'id' ? 'Isi Kata' : '選詞填空', count: bandBCounts.cloze },
                      { key: '閱讀理解', label: lang === 'id' ? 'Bacaan' : '閱讀理解', count: bandBCounts.reading },
                    ].map((cat) => (
                      <button
                        key={cat.key}
                        onClick={(e) => { e.stopPropagation(); setSelectedCategory(cat.key); }}
                        className={`flex-1 py-2 px-2 rounded-lg text-sm font-semibold transition-all border ${
                          selectedCategory === cat.key
                            ? 'bg-white text-orange-600 border-white shadow-md'
                            : 'bg-white/15 text-white border-white/30 hover:bg-white/25'
                        }`}
                      >
                        {cat.label}
                        <span className={`block text-xs mt-0.5 ${selectedCategory === cat.key ? 'text-orange-400' : 'text-white/70'}`}>
                          {cat.count} {lang === 'id' ? 'soal' : '題'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {(() => {
                    const currentCount = selectedCategory === 'all' ? bandBCounts.all
                      : selectedCategory === '選詞填空' ? bandBCounts.cloze : bandBCounts.reading;
                    return [5, 10, 20, 'all'].filter(n => n === 'all' || n <= currentCount).map((count) => (
                      <motion.button
                        key={count}
                        whileHover={{ x: 4 }}
                        onClick={() => startQuiz('B', count, selectedCategory)}
                        className="w-full bg-white/20 hover:bg-white/30 rounded-lg py-3 font-semibold transition-all backdrop-blur-sm border border-white/30 hover:border-white/50"
                      >
                        {count === 'all'
                          ? t('quiz.allQuestions').replace('{count}', currentCount)
                          : t('quiz.questionsN').replace('{n}', count)}
                        <ChevronRight className="w-4 h-4 inline-block ml-2" />
                      </motion.button>
                    ));
                  })()}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Wrong Answer Bank */}
          {wrongBankCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-white rounded-lg shadow-lg border-2 border-red-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{t('results.wrongBank')}</h3>
                      <p className="text-sm text-gray-500">{t('results.wrongBankDesc')}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { clearWrongBank(); setWrongBankCount(0); }}
                    className="text-sm text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {t('results.clearWrongBank')}
                  </button>
                </div>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={startWrongBankQuiz}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg py-3 font-semibold transition-all flex items-center justify-center gap-2"
                >
                  {t('results.retryWrongCount').replace('{count}', wrongBankCount)}
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium">
            <ArrowLeft className="w-4 h-4" />
            {t('quiz.backHome')}
          </Link>
        </div>
      </div>
    );
  }

  // Quiz screen
  if (screen === 'quiz' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctCount = answers.filter((a) => a.isCorrect).length;

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600 font-medium">
                  {Math.floor(elapsed / 60)}{t('quiz.time')}{elapsed % 60}{t('quiz.seconds')}
                </span>
              </div>
              <span className="text-gray-600 font-medium">
                {currentQuestionIndex + 1} / {questions.length}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-8 mb-8"
            >
              {(currentQuestion.type === 'reading' || currentQuestion.type === 'cloze') && currentQuestion.passage && (
                <div className={`mb-6 p-6 rounded-lg border-l-4 ${currentQuestion.type === 'cloze' ? 'bg-amber-50 border-amber-400' : 'bg-gray-50 border-blue-500'}`}>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {currentQuestion.type === 'cloze'
                      ? currentQuestion.passage.split(/(\(\s*\d+\s*\))/).map((part, i) => {
                          const blankMatch = part.match(/^\(\s*(\d+)\s*\)$/);
                          if (blankMatch) {
                            const isCurrentBlank = blankMatch[1] === currentQuestion.question?.toString();
                            return (
                              <span
                                key={i}
                                className={`inline-block mx-1 px-2 py-0.5 rounded font-bold ${
                                  isCurrentBlank
                                    ? 'bg-orange-500 text-white ring-2 ring-orange-300 animate-pulse'
                                    : 'bg-gray-300 text-gray-700'
                                }`}
                              >
                                ({blankMatch[1]})
                              </span>
                            );
                          }
                          return <span key={i}>{part}</span>;
                        })
                      : currentQuestion.passage}
                  </p>
                </div>
              )}

              <div className="mb-4 flex items-center gap-2 flex-wrap">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  {currentQuestion.category}
                </span>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  {lang === 'id' ? '📝 Soal resmi TOCFL' : '📝 TOCFL 官方題庫'}
                </span>
                {currentQuestion._totalSubs && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {t('quiz.subQuestion').replace('{x}', currentQuestion._subIndex + 1).replace('{y}', currentQuestion._totalSubs)}
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {currentQuestion.category === '選詞填空'
                  ? `${lang === 'id' ? 'Isi bagian kosong' : '請選擇適當的詞語填入空格'} ${currentQuestion.question}`
                  : currentQuestion.question}
              </h2>

              {currentQuestion.pinyin && (
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => setShowPinyin(!showPinyin)}
                  className="mb-6 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                >
                  <span>{showPinyin ? t('quiz.hidePinyin') : t('quiz.showPinyin')}</span>
                  <motion.span animate={{ rotate: showPinyin ? 180 : 0 }} transition={{ duration: 0.2 }}>▼</motion.span>
                </motion.button>
              )}

              <AnimatePresence>
                {showPinyin && currentQuestion.pinyin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-blue-50 rounded-lg"
                  >
                    <p className="text-blue-700 italic">{currentQuestion.pinyin}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuestion.answer;
                  const isWrong = isSelected && !isCorrect;
                  let bgColor = 'bg-white hover:bg-indigo-50 border-gray-200';
                  if (!answered) {
                    if (isSelected) bgColor = 'bg-indigo-50 border-indigo-500';
                  } else {
                    if (isCorrect) bgColor = 'bg-green-50 border-green-500';
                    else if (isWrong) bgColor = 'bg-red-50 border-red-500';
                    else bgColor = 'bg-white border-gray-200';
                  }
                  return (
                    <motion.button
                      key={index}
                      whileHover={!answered ? { x: 4 } : {}}
                      whileTap={!answered ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={answered}
                      className={`w-full p-4 rounded-lg border-2 text-left font-medium transition-all ${bgColor} ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {answered && isCorrect && <Check className="w-5 h-5 text-green-500" />}
                        {answered && isWrong && <X className="w-5 h-5 text-red-500" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg mb-6 ${
                      selectedAnswer === currentQuestion.answer
                        ? 'bg-green-50 border-l-4 border-green-500'
                        : 'bg-amber-50 border-l-4 border-amber-500'
                    }`}
                  >
                    {selectedAnswer === currentQuestion.answer && (
                      <div className="flex items-start gap-3 mb-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="font-bold text-green-600">{t('quiz.correct')}</span>
                      </div>
                    )}
                    {selectedAnswer !== currentQuestion.answer && (
                      <div className="flex items-start gap-3 mb-2">
                        <X className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="font-bold text-amber-600">
                          {t('quiz.wrong')} — {currentQuestion.options[currentQuestion.answer]}
                        </span>
                      </div>
                    )}
                    <p className="text-gray-700 mt-3">
                      <span className="font-semibold text-gray-800">{t('quiz.explanation')}:</span>{' '}
                      {getExplanation(currentQuestion)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {answered && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleNextQuestion}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    {currentQuestionIndex < questions.length - 1 ? (
                      <>{t('quiz.next')} <ChevronRight className="w-4 h-4" /></>
                    ) : (
                      <>{t('quiz.finish')} <Check className="w-4 h-4" /></>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          <div className="bg-white rounded-lg shadow p-4 sticky bottom-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-gray-800">
                  {t('quiz.score')} {correctCount} / {answers.length}
                </span>
              </div>
              {answers.length > 0 && (
                <span className="text-sm text-gray-600">
                  {t('results.accuracy')}: {Math.round((correctCount / answers.length) * 100)}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (screen === 'results' && questions.length > 0) {
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const accuracy = Math.round((correctCount / questions.length) * 100);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const wrongAnswers = answers
      .map((a, idx) => ({ ...a, question: questions[idx] }))
      .filter((a) => !a.isCorrect);

    // Category breakdown
    const categoryStats = {};
    answers.forEach((a, idx) => {
      const cat = questions[idx].category || '其他';
      if (!categoryStats[cat]) categoryStats[cat] = { correct: 0, total: 0 };
      categoryStats[cat].total++;
      if (a.isCorrect) categoryStats[cat].correct++;
    });

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="text-center mb-8"
          >
            <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{t('results.title')}</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <motion.circle
                  cx="64" cy="64" r="56" fill="none" stroke="url(#gradient)" strokeWidth="8" strokeLinecap="round"
                  initial={{ strokeDasharray: 351.86, strokeDashoffset: 351.86 }}
                  animate={{ strokeDashoffset: 351.86 - (correctCount / questions.length) * 351.86 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <p className="text-4xl font-bold text-indigo-600">{correctCount}</p>
                  <p className="text-sm text-gray-600">/ {questions.length}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t('results.accuracy')}</p>
                <p className="text-2xl font-bold text-blue-600">{accuracy}%</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t('results.time')}</p>
                <p className="text-2xl font-bold text-purple-600">
                  {minutes}{t('quiz.time')}{seconds}{t('quiz.seconds')}
                </p>
              </div>
            </div>

            <p className="text-lg font-medium text-gray-700">
              {accuracy === 100
                ? t('results.perfect')
                : accuracy >= 80
                ? t('results.great')
                : accuracy >= 60
                ? t('results.good')
                : t('results.keepGoing')}
            </p>
          </motion.div>

          {/* Category Breakdown */}
          {Object.keys(categoryStats).length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-8"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-indigo-500" />
                {lang === 'id' ? 'Analisis per Kategori' : '各題型分析'}
              </h2>
              <div className="space-y-3">
                {Object.entries(categoryStats).map(([cat, stat]) => {
                  const pct = Math.round((stat.correct / stat.total) * 100);
                  const catLabel = lang === 'id'
                    ? (cat === '選詞填空' ? 'Isi Kata' : cat === '閱讀理解' ? 'Bacaan' : cat)
                    : cat;
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{catLabel}</span>
                        <span className="text-sm text-gray-500">{stat.correct}/{stat.total} ({pct}%)</span>
                      </div>
                      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          initial={{ width: '0%' }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {wrongAnswers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <X className="w-6 h-6 text-red-500" />
                {t('quiz.wrong')} ({wrongAnswers.length})
              </h2>

              <div className="space-y-6">
                {wrongAnswers.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg"
                  >
                    <p className="font-bold text-gray-800 mb-2">{item.question.question}</p>
                    <p className="text-red-600 mb-2">
                      {item.question.options[item.selectedAnswer]}
                    </p>
                    <p className="text-green-600 mb-2">
                      ✓ {item.question.options[item.question.answer]}
                    </p>
                    <p className="text-gray-700 text-sm">{getExplanation(item.question)}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-3 mb-8"
          >
            {wrongAnswers.length > 0 && (
              <button
                onClick={startWrongBankQuiz}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {t('results.retryWrong')} ({wrongAnswers.length})
              </button>
            )}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleRestart}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                {t('results.tryAgain')}
              </button>
              <Link
                to="/"
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('quiz.backHome')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
};

export default ReadingPage;
