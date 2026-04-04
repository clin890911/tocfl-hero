import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  RotateCcw,
  Trophy,
  Star,
  ArrowLeft,
  Clock,
  AlertCircle,
  Trash2,
  Grid3X3,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { useLanguage } from '../contexts/LanguageContext';
import { listeningQuestions } from '../data/listeningQuestions';
import { addToSR, reviewItem } from '../data/spacedRepetition';
import { logStudySession } from './AnalyticsPage';

const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const utteranceRef = useRef(null);

  // Play MP3 file
  const playAudio = useCallback((url) => {
    // Stop any current playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    window.speechSynthesis.cancel();
    setIsPlaying(false);

    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);
    audio.onpause = () => setIsPlaying(false);
    audio.play().catch(() => setIsPlaying(false));
  }, []);

  // Fallback TTS
  const speak = useCallback((text, rate = 1) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW';
    utterance.rate = rate;
    const voices = window.speechSynthesis.getVoices();
    const zhVoice = voices.find((v) => v.lang.includes('zh') || v.lang.includes('Mandarin')) || voices[0];
    if (zhVoice) utterance.voice = zhVoice;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  return { isPlaying, playAudio, speak, stop };
};

const AudioWaveform = ({ isPlaying }) => {
  const bars = [0, 1, 2, 3, 4];
  return (
    <div className="flex items-center justify-center gap-2 h-16">
      {bars.map((i) => (
        <motion.div
          key={i}
          animate={isPlaying ? { height: ['20%', '100%', '30%', '100%', '20%'] } : { height: '20%' }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
          className="w-2 bg-gradient-to-t from-blue-400 to-blue-600 rounded-full"
        />
      ))}
    </div>
  );
};

const ListeningPage = () => {
  const { user } = useAuth();
  const { submitQuizResult } = useGame();
  const { lang, t } = useLanguage();

  const [screen, setScreen] = useState('band-select');
  const [selectedBand, setSelectedBand] = useState(null);
  const [numQuestions, setNumQuestions] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);

  const { isPlaying, playAudio, speak, stop } = useAudioPlayer();

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
            audioText: item.audioText,
            audioUrl: item.audioUrl || null,
            question: subQ.question,
            options: subQ.options,
            answer: subQ.answer,
            explanation: subQ.explanation,
            explanationId: subQ.explanationId || null,
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

  const getExplanation = (q) => {
    if (lang === 'id' && q.explanationId) return q.explanationId;
    return q.explanation;
  };

  // Wrong answer bank (localStorage)
  const WRONG_BANK_KEY = 'tocfl_listening_wrong_bank';
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

  const startQuiz = (band, count) => {
    const bandData =
      band === 'A' ? listeningQuestions.bandA : band === 'B' ? listeningQuestions.bandB : listeningQuestions.bandC;
    let selected =
      count === 'all' ? bandData : bandData.slice(0, parseInt(count));
    selected = shuffleArray(selected);
    // Flatten multi-question items so each sub-question is a separate quiz step
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
    setShowTranscript(false);
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
    setShowTranscript(false);
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
    setShowTranscript(true);
  };

  const handleNextQuestion = () => {
    stop();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setShowTranscript(false);
    } else {
      finishQuiz();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      stop();
      const prevIdx = currentQuestionIndex - 1;
      const prevAnswer = answers[prevIdx];
      setCurrentQuestionIndex(prevIdx);
      setSelectedAnswer(prevAnswer ? prevAnswer.selectedAnswer : null);
      setAnswered(!!prevAnswer);
      setShowTranscript(!!prevAnswer);
    }
  };

  const goToQuestion = (idx) => {
    stop();
    const existingAnswer = answers[idx];
    setCurrentQuestionIndex(idx);
    setSelectedAnswer(existingAnswer ? existingAnswer.selectedAnswer : null);
    setAnswered(!!existingAnswer);
    setShowTranscript(!!existingAnswer);
    setShowNavigator(false);
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
    // Remove correctly answered from wrong bank
    answers.forEach((a, idx) => {
      if (a.isCorrect) removeFromWrongBank(questions[idx].id);
    });
    // SR integration: add wrong answers and review correct ones
    answers.forEach((a, idx) => {
      const qId = questions[idx].id;
      if (!a.isCorrect) {
        addToSR(qId, 'listening');
        reviewItem(qId, 1); // answered wrong
      } else {
        reviewItem(qId, 4); // answered correctly
      }
    });
    if (user) {
      await submitQuizResult({
        correct: correctCount,
        total: questions.length,
        band: selectedBand,
        type: 'listening',
        quizId: `listening-${selectedBand}-${Date.now()}`,
      });
    }
    // Log study session for analytics
    logStudySession('listening', correctCount, questions.length, selectedBand);
    setScreen('results');
  };

  const handleRestart = () => {
    stop();
    setScreen('band-select');
    setSelectedBand(null);
    setNumQuestions(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setAnswered(false);
    setStartTime(null);
    setElapsed(0);
    setShowTranscript(false);
  };

  // Band selection
  if (screen === 'band-select') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Headphones className="w-8 h-8 text-purple-600" />
              <h1 className="text-4xl font-bold text-gray-800">{t('quiz.title.listening')}</h1>
            </div>
            <p className="text-gray-600">{t('quiz.selectDifficulty')}</p>
          </div>

          {/* Band cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                band: 'A',
                title: t('quiz.bandA'),
                subtitle: t('quiz.levelA'),
                color: 'from-green-400 to-teal-500',
                count: listeningQuestions.bandA.length,
              },
              {
                band: 'B',
                title: t('quiz.bandB'),
                subtitle: t('quiz.levelB'),
                color: 'from-orange-400 to-red-500',
                count: listeningQuestions.bandB.length,
              },
              {
                band: 'C',
                title: '流利精通級',
                subtitle: 'Level 5-6',
                color: 'from-purple-500 to-pink-600',
                count: listeningQuestions.bandC.length,
              },
            ].map((item) => (
              <motion.div
                key={item.band}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${item.color} rounded-lg p-8 text-white shadow-lg`}>
                  <div className="mb-4">
                    <h2 className="text-3xl font-bold">{item.title}</h2>
                    <p className="text-white/80">{item.subtitle}</p>
                  </div>
                  <p className="mb-6 text-white/90">
                    {t('quiz.totalQuestions').replace('{count}', item.count)}
                  </p>
                  <div className="space-y-3">
                    {[5, 10, 20, 'all'].filter(n => n === 'all' || n <= item.count).map((count) => (
                      <motion.button
                        key={count}
                        whileHover={{ x: 4 }}
                        onClick={() => startQuiz(item.band, count)}
                        className="w-full bg-white/20 hover:bg-white/30 rounded-lg py-3 font-semibold transition-all backdrop-blur-sm border border-white/30 hover:border-white/50"
                      >
                        {count === 'all'
                          ? t('quiz.allQuestions').replace('{count}', item.count)
                          : t('quiz.questionsN').replace('{n}', count)}
                        <ChevronRight className="w-4 h-4 inline-block ml-2" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
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
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 p-6">
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
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-600"
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
              <div className="mb-6 flex items-center gap-2 flex-wrap">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {currentQuestion.category}
                </span>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  {lang === 'id' ? '🎧 Soal resmi TOCFL' : '🎧 TOCFL 官方題庫'}
                </span>
                {currentQuestion._totalSubs && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {t('quiz.subQuestion').replace('{x}', currentQuestion._subIndex + 1).replace('{y}', currentQuestion._totalSubs)}
                  </span>
                )}
              </div>

              <div className="mb-8 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border-2 border-purple-200">
                <div className="text-center">
                  {currentQuestion.audioUrl && (
                    <p className="text-xs text-purple-500 mb-2 font-medium">
                      {lang === 'id' ? '🎧 Audio resmi TOCFL' : '🎧 TOCFL 官方音檔'}
                    </p>
                  )}
                  <AudioWaveform isPlaying={isPlaying} />
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (isPlaying) {
                          stop();
                        } else if (currentQuestion.audioUrl) {
                          playAudio(currentQuestion.audioUrl);
                        } else {
                          speak(currentQuestion.audioText, 1);
                        }
                      }}
                      className={`flex items-center justify-center w-16 h-16 rounded-full font-bold transition-all ${
                        isPlaying
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (currentQuestion.audioUrl) {
                          playAudio(currentQuestion.audioUrl);
                        } else {
                          speak(currentQuestion.audioText, 1);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-purple-50 border-2 border-purple-300 rounded-lg font-medium text-purple-700 transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {t('quiz.playAudio')}
                    </motion.button>

                    {!currentQuestion.audioUrl && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => speak(currentQuestion.audioText, 0.7)}
                        className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-purple-50 border-2 border-purple-300 rounded-lg font-medium text-purple-700 transition-all"
                      >
                        <Volume2 className="w-4 h-4" />
                        {t('quiz.slowAudio')}
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {currentQuestion.question}
              </h2>

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
                {answered && showTranscript && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-blue-50 rounded-lg mb-6 border-l-4 border-blue-500"
                  >
                    <p className="text-sm font-semibold text-blue-700 mb-2">
                      {lang === 'id' ? 'Transkrip Audio:' : '音訊文字稿：'}
                    </p>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {currentQuestion.audioText}
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
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
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

          <div className="bg-white rounded-lg shadow sticky bottom-6">
            <AnimatePresence>
              {showNavigator && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-b border-gray-200"
                >
                  <div className="p-4">
                    <p className="text-sm font-medium text-gray-500 mb-3">
                      {lang === 'id' ? 'Navigasi Soal' : '題目導覽'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {questions.map((_, idx) => {
                        const ans = answers[idx];
                        const isCurrent = idx === currentQuestionIndex;
                        let bg = 'bg-gray-100 text-gray-600 hover:bg-gray-200';
                        if (isCurrent) bg = 'bg-purple-500 text-white ring-2 ring-purple-300';
                        else if (ans?.isCorrect) bg = 'bg-green-100 text-green-700 border border-green-300';
                        else if (ans && !ans.isCorrect) bg = 'bg-red-100 text-red-700 border border-red-300';
                        return (
                          <button
                            key={idx}
                            onClick={() => goToQuestion(idx)}
                            className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${bg}`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setShowNavigator(!showNavigator)}
                  className={`p-2 rounded-lg transition-colors ${showNavigator ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100 text-gray-600'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-gray-800 text-sm">
                  {correctCount}/{answers.length}
                </span>
                {answers.length > 0 && (
                  <span className="text-xs text-gray-500">
                    ({Math.round((correctCount / answers.length) * 100)}%)
                  </span>
                )}
              </div>
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
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 p-6">
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
                    <stop offset="0%" stopColor="#a855f7" />
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
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t('results.accuracy')}</p>
                <p className="text-2xl font-bold text-purple-600">{accuracy}%</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t('results.time')}</p>
                <p className="text-2xl font-bold text-indigo-600">
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
                    <p className="text-red-600 mb-2">{item.question.options[item.selectedAnswer]}</p>
                    <p className="text-green-600 mb-2">✓ {item.question.options[item.question.answer]}</p>
                    <p className="text-gray-700 text-sm mb-3">{getExplanation(item.question)}</p>
                    <p className="text-sm text-gray-600 italic">
                      {lang === 'id' ? 'Transkrip:' : '音訊文字稿：'} {item.question.audioText}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Category Breakdown */}
          {Object.keys(categoryStats).length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-8"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                {lang === 'id' ? 'Analisis per Kategori' : '各題型分析'}
              </h2>
              <div className="space-y-3">
                {Object.entries(categoryStats).map(([cat, stat]) => {
                  const pct = Math.round((stat.correct / stat.total) * 100);
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{cat}</span>
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
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
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

export default ListeningPage;
