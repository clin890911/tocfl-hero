import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronRight,
  Check,
  X,
  RotateCcw,
  Trophy,
  Star,
  ArrowLeft,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { listeningQuestions } from '../data/listeningQuestions';

// Custom hook for speech synthesis
const useSpeechSynthesis = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef(null);

  const speak = useCallback((text, rate = 1) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    setIsPlaying(false);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW';
    utterance.rate = rate;

    // Try to find a Chinese voice
    const voices = window.speechSynthesis.getVoices();
    const zhVoice = voices.find(
      (v) => v.lang.includes('zh') || v.lang.includes('Mandarin')
    ) || voices[0];
    if (zhVoice) utterance.voice = zhVoice;

    // Set up event handlers
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  return { isPlaying, speak, stop };
};

// Audio Waveform Animation Component
const AudioWaveform = ({ isPlaying }) => {
  const bars = [0, 1, 2, 3, 4];

  return (
    <div className="flex items-center justify-center gap-2 h-16">
      {bars.map((i) => (
        <motion.div
          key={i}
          animate={
            isPlaying
              ? {
                  height: ['20%', '100%', '30%', '100%', '20%'],
                }
              : { height: '20%' }
          }
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          className="w-2 bg-gradient-to-t from-blue-400 to-blue-600 rounded-full"
        />
      ))}
    </div>
  );
};

const ListeningPage = () => {
  const { user } = useAuth();
  const { submitQuizResult } = useGame();

  const [screen, setScreen] = useState('band-select'); // 'band-select', 'quiz', 'results'
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

  const { isPlaying, speak, stop } = useSpeechSynthesis();

  // Timer effect
  useEffect(() => {
    if (screen !== 'quiz' || !startTime) return;

    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, startTime]);

  // Shuffle array
  const shuffleArray = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Flatten multi-question items into individual questions
  const flattenQuestions = (items) => {
    const result = [];
    items.forEach((item) => {
      if (item.questions && Array.isArray(item.questions)) {
        // Multi-question item: create individual entries that inherit parent props
        item.questions.forEach((subQ, idx) => {
          result.push({
            id: `${item.id}-sub${idx + 1}`,
            type: item.type,
            category: item.category,
            difficulty: item.difficulty,
            audioText: item.audioText,
            question: subQ.question,
            options: subQ.options,
            answer: subQ.answer,
            explanation: subQ.explanation,
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

  // Start quiz
  const startQuiz = (band, count) => {
    const bandData =
      band === 'A' ? listeningQuestions.bandA : listeningQuestions.bandB;
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

  // Handle answer selection
  const handleAnswerSelect = (optionIndex) => {
    if (answered) return;

    setSelectedAnswer(optionIndex);
    setAnswered(true);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.answer;

    setAnswers([
      ...answers,
      {
        questionId: currentQuestion.id,
        selectedAnswer: optionIndex,
        isCorrect,
      },
    ]);

    // Show transcript after answering
    setShowTranscript(true);
  };

  // Go to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setShowTranscript(false);
    } else {
      // Quiz complete
      finishQuiz();
    }
  };

  // Finish quiz and show results
  const finishQuiz = async () => {
    const correctCount = answers.filter((a) => a.isCorrect).length;

    if (user) {
      await submitQuizResult({
        correct: correctCount,
        total: questions.length,
        band: selectedBand,
        type: 'listening',
        quizId: `listening-${selectedBand}-${Date.now()}`,
      });
    }

    setScreen('results');
  };

  // Reset and go back to band select
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

  // Render band selection screen
  if (screen === 'band-select') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Headphones className="w-8 h-8 text-purple-600" />
              <h1 className="text-4xl font-bold text-gray-800">聽力測驗</h1>
            </div>
            <p className="text-gray-600">選擇難度等級開始測驗</p>
          </div>

          {/* Band cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {[
              {
                band: 'A',
                title: '入門基礎級',
                subtitle: 'Level 1-2',
                color: 'from-green-400 to-teal-500',
                count: listeningQuestions.bandA.length,
              },
              {
                band: 'B',
                title: '進階高階級',
                subtitle: 'Level 3-4',
                color: 'from-orange-400 to-red-500',
                count: listeningQuestions.bandB.length,
              },
            ].map((item) => (
              <motion.div
                key={item.band}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
              >
                <div
                  className={`bg-gradient-to-br ${item.color} rounded-lg p-8 text-white shadow-lg`}
                >
                  <div className="mb-4">
                    <h2 className="text-3xl font-bold">{item.title}</h2>
                    <p className="text-white/80">{item.subtitle}</p>
                  </div>
                  <p className="mb-6 text-white/90">共 {item.count} 題</p>

                  {/* Question count selector */}
                  <div className="space-y-3">
                    {[5, 10, 'all'].map((count) => (
                      <motion.button
                        key={count}
                        whileHover={{ x: 4 }}
                        onClick={() => startQuiz(item.band, count)}
                        className="w-full bg-white/20 hover:bg-white/30 rounded-lg py-3 font-semibold transition-all backdrop-blur-sm border border-white/30 hover:border-white/50"
                      >
                        {count === 'all'
                          ? `全部 ${item.count} 題`
                          : `${count} 題`}
                        <ChevronRight className="w-4 h-4 inline-block ml-2" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            回首頁
          </Link>
        </div>
      </div>
    );
  }

  // Render quiz screen
  if (screen === 'quiz' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctCount = answers.filter((a) => a.isCorrect).length;

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600 font-medium">
                  {Math.floor(elapsed / 60)}分{elapsed % 60}秒
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
                animate={{
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-8 mb-8"
            >
              {/* Category badge */}
              <div className="mb-6 flex items-center gap-2 flex-wrap">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {currentQuestion.category}
                </span>
                {currentQuestion._totalSubs && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    第 {currentQuestion._subIndex + 1} / {currentQuestion._totalSubs} 題
                  </span>
                )}
              </div>

              {/* Audio Player Section */}
              <div className="mb-8 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border-2 border-purple-200">
                <div className="text-center">
                  {/* Waveform Animation */}
                  <AudioWaveform isPlaying={isPlaying} />

                  {/* Play/Pause and Replay buttons */}
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        isPlaying ? stop() : speak(currentQuestion.audioText, 1)
                      }
                      className={`flex items-center justify-center w-16 h-16 rounded-full font-bold transition-all ${
                        isPlaying
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white'
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </motion.button>

                    {/* Play at normal speed */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => speak(currentQuestion.audioText, 1)}
                      className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-purple-50 border-2 border-purple-300 rounded-lg font-medium text-purple-700 transition-all"
                    >
                      <Volume2 className="w-4 h-4" />
                      播放音訊
                    </motion.button>

                    {/* Play at slow speed */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => speak(currentQuestion.audioText, 0.7)}
                      className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-purple-50 border-2 border-purple-300 rounded-lg font-medium text-purple-700 transition-all"
                    >
                      <Volume2 className="w-4 h-4" />
                      再聽一次 (慢速)
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Question */}
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuestion.answer;
                  const isWrong = isSelected && !isCorrect;
                  let bgColor = 'bg-white hover:bg-indigo-50 border-gray-200';

                  if (!answered) {
                    // Not answered yet
                    if (isSelected) {
                      bgColor = 'bg-indigo-50 border-indigo-500';
                    }
                  } else {
                    // Answered
                    if (isCorrect) {
                      bgColor = 'bg-green-50 border-green-500';
                    } else if (isWrong) {
                      bgColor = 'bg-red-50 border-red-500';
                    } else {
                      bgColor = 'bg-white border-gray-200';
                    }
                  }

                  return (
                    <motion.button
                      key={index}
                      whileHover={!answered ? { x: 4 } : {}}
                      whileTap={!answered ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={answered}
                      className={`w-full p-4 rounded-lg border-2 text-left font-medium transition-all ${bgColor} ${
                        answered ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {answered && isCorrect && (
                          <Check className="w-5 h-5 text-green-500" />
                        )}
                        {answered && isWrong && (
                          <X className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation and feedback */}
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
                        <span className="font-bold text-green-600">正確！</span>
                      </div>
                    )}
                    {selectedAnswer !== currentQuestion.answer && (
                      <div>
                        <div className="flex items-start gap-3 mb-2">
                          <X className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span className="font-bold text-amber-600">
                            正確答案是：{currentQuestion.options[currentQuestion.answer]}
                          </span>
                        </div>
                      </div>
                    )}
                    <p className="text-gray-700 mt-3">{currentQuestion.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Transcript */}
              <AnimatePresence>
                {answered && showTranscript && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-blue-50 rounded-lg mb-6 border-l-4 border-blue-500"
                  >
                    <p className="text-sm font-semibold text-blue-700 mb-2">
                      音訊文字稿：
                    </p>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {currentQuestion.audioText}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next button */}
              <AnimatePresence>
                {answered && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleNextQuestion}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    {currentQuestionIndex < questions.length - 1 ? (
                      <>
                        下一題
                        <ChevronRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        完成
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Score tracker on the side */}
          <div className="bg-white rounded-lg shadow p-4 sticky bottom-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-gray-800">
                  正確: {correctCount} / {answers.length}
                </span>
              </div>
              {answers.length > 0 && (
                <span className="text-sm text-gray-600">
                  正確率: {Math.round((correctCount / answers.length) * 100)}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render results screen
  if (screen === 'results' && questions.length > 0) {
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const accuracy = Math.round((correctCount / questions.length) * 100);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const wrongAnswers = answers
      .map((a, idx) => ({
        ...a,
        question: questions[idx],
      }))
      .filter((a) => !a.isCorrect);

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Trophy animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="text-center mb-8"
          >
            <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">測驗完成</h1>
          </motion.div>

          {/* Score circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: 351.86, strokeDashoffset: 351.86 }}
                  animate={{
                    strokeDashoffset:
                      351.86 - (correctCount / questions.length) * 351.86,
                  }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <p className="text-4xl font-bold text-indigo-600">
                    {correctCount}
                  </p>
                  <p className="text-sm text-gray-600">/ {questions.length}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">正確率</p>
                <p className="text-2xl font-bold text-purple-600">{accuracy}%</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">花費時間</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {minutes}分{seconds}秒
                </p>
              </div>
            </div>

            {/* Performance message */}
            <p className="text-lg font-medium text-gray-700">
              {accuracy === 100
                ? '完美！你是TOCFL大師！'
                : accuracy >= 80
                ? '很好！繼續加油！'
                : accuracy >= 60
                ? '不錯！再練習一下吧！'
                : '加油！多做練習會進步！'}
            </p>
          </motion.div>

          {/* Wrong answers */}
          {wrongAnswers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <X className="w-6 h-6 text-red-500" />
                錯誤題目 ({wrongAnswers.length})
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
                    <p className="font-bold text-gray-800 mb-2">
                      {item.question.question}
                    </p>
                    <p className="text-red-600 mb-2">
                      你的回答：{item.question.options[item.selectedAnswer]}
                    </p>
                    <p className="text-green-600 mb-2">
                      正確答案：
                      {item.question.options[item.question.answer]}
                    </p>
                    <p className="text-gray-700 text-sm mb-3">
                      {item.question.explanation}
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      音訊文字稿：{item.question.audioText}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              再試一次
            </button>
            <Link
              to="/"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              回首頁
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
};

export default ListeningPage;
