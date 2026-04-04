import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, ChevronLeft, ChevronRight, RotateCcw, Star, StarOff,
  Shuffle, Filter, Home, Volume2, Eye, EyeOff, ArrowLeft, Bookmark
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { vocabularyData, getCategories, getByCategory, addToWordbook, removeFromWordbook, isInWordbook, getWordbook } from '../data/vocabularyData';

export default function FlashcardPage() {
  const { lang, t } = useLanguage();
  const [band, setBand] = useState(null); // null = selection, 'bandA', 'bandB', 'wordbook'
  const [category, setCategory] = useState('all');
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPinyin, setShowPinyin] = useState(true);
  const [mode, setMode] = useState('zh-to-id'); // 'zh-to-id' or 'id-to-zh'
  const [knownCards, setKnownCards] = useState(new Set());
  const [sessionComplete, setSessionComplete] = useState(false);

  // 載入卡片
  useEffect(() => {
    if (!band) return;

    let items;
    if (band === 'wordbook') {
      items = getWordbook();
    } else {
      items = getByCategory(band, category);
    }

    // 隨機排序
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards(new Set());
    setSessionComplete(false);
  }, [band, category]);

  const currentCard = cards[currentIndex];
  const categories = band && band !== 'wordbook' ? getCategories(band) : [];

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setSessionComplete(true);
    }
  }, [currentIndex, cards.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleKnown = useCallback(() => {
    if (currentCard) {
      setKnownCards(prev => {
        const next = new Set(prev);
        if (next.has(currentCard.id)) {
          next.delete(currentCard.id);
        } else {
          next.add(currentCard.id);
        }
        return next;
      });
    }
    handleNext();
  }, [currentCard, handleNext]);

  const handleShuffle = useCallback(() => {
    setCards(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionComplete(false);
  }, []);

  const toggleWordbook = useCallback(() => {
    if (!currentCard) return;
    if (isInWordbook(currentCard.id)) {
      removeFromWordbook(currentCard.id);
    } else {
      addToWordbook(currentCard);
    }
    // Force re-render
    setCards(prev => [...prev]);
  }, [currentCard]);

  const handleSpeak = useCallback(() => {
    if (!currentCard) return;
    const utterance = new SpeechSynthesisUtterance(currentCard.chinese);
    utterance.lang = 'zh-TW';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }, [currentCard]);

  const handleRestart = useCallback(() => {
    handleShuffle();
  }, [handleShuffle]);

  const handleRetryUnknown = useCallback(() => {
    const unknownCards = cards.filter(c => !knownCards.has(c.id));
    if (unknownCards.length === 0) return;
    setCards([...unknownCards].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards(new Set());
    setSessionComplete(false);
  }, [cards, knownCards]);

  // 鍵盤快捷鍵
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev]);

  // ===== 選擇畫面 =====
  if (!band) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 pt-8 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-3 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen size={16} />
              {t('flashcard.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-3">
              {t('flashcard.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('flashcard.subtitle')}
            </p>
          </motion.div>

          {/* Band Selection */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Band A */}
            <motion.button
              onClick={() => setBand('bandA')}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200 hover:border-amber-400 transition-all text-left"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-3xl mb-3 block">🥉</span>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Band A</h3>
              <p className="text-sm text-gray-500 mb-3">{t('home.bandA')}</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                  {vocabularyData.bandA.length} {t('flashcard.words')}
                </span>
              </div>
            </motion.button>

            {/* Band B */}
            <motion.button
              onClick={() => setBand('bandB')}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-indigo-200 hover:border-indigo-400 transition-all text-left"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-3xl mb-3 block">🥇</span>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Band B</h3>
              <p className="text-sm text-gray-500 mb-3">{t('home.bandB')}</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                  {vocabularyData.bandB.length} {t('flashcard.words')}
                </span>
              </div>
            </motion.button>

            {/* Band C */}
            <motion.button
              onClick={() => setBand('bandC')}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-200 hover:border-emerald-400 transition-all text-left"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <span className="text-3xl mb-3 block">🏅</span>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Band C</h3>
              <p className="text-sm text-gray-500 mb-3">{lang === 'id' ? 'Tingkat Lanjutan' : '流利精通級'}</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                  {vocabularyData.bandC.length} {t('flashcard.words')}
                </span>
              </div>
            </motion.button>

            {/* Wordbook */}
            <motion.button
              onClick={() => setBand('wordbook')}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-200 hover:border-pink-400 transition-all text-left"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-3xl mb-3 block">📒</span>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{t('flashcard.wordbook')}</h3>
              <p className="text-sm text-gray-500 mb-3">{t('flashcard.wordbookDesc')}</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                  {getWordbook().length} {t('flashcard.words')}
                </span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // ===== 完成畫面 =====
  if (sessionComplete) {
    const unknownCount = cards.length - knownCards.size;
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-cyan-50 flex items-center justify-center px-4">
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('flashcard.sessionComplete')}</h2>
          <p className="text-gray-600 mb-6">
            {t('flashcard.reviewed')} {cards.length} {t('flashcard.words')}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-green-600">{knownCards.size}</p>
              <p className="text-sm text-green-700">{t('flashcard.known')}</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-orange-600">{unknownCount}</p>
              <p className="text-sm text-orange-700">{t('flashcard.needReview')}</p>
            </div>
          </div>

          <div className="space-y-3">
            {unknownCount > 0 && (
              <motion.button
                onClick={handleRetryUnknown}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🔄 {t('flashcard.retryUnknown')} ({unknownCount})
              </motion.button>
            )}
            <motion.button
              onClick={handleRestart}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 rounded-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🔄 {t('flashcard.restart')}
            </motion.button>
            <button
              onClick={() => { setBand(null); setCategory('all'); }}
              className="w-full text-gray-600 hover:text-gray-800 font-medium py-3"
            >
              ← {t('results.backToSelect')}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ===== 空卡片 =====
  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-cyan-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{t('flashcard.noCards')}</h2>
          <button
            onClick={() => { setBand(null); setCategory('all'); }}
            className="mt-4 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold"
          >
            ← {t('results.backToSelect')}
          </button>
        </div>
      </div>
    );
  }

  // ===== 閃卡練習主畫面 =====
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 pt-6 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => { setBand(null); setCategory('all'); }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">{t('results.backToSelect')}</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Category Filter */}
            {categories.length > 0 && (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700"
              >
                <option value="all">{t('flashcard.allCategories')}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}

            {/* Mode Toggle */}
            <button
              onClick={() => setMode(m => m === 'zh-to-id' ? 'id-to-zh' : 'zh-to-id')}
              className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {mode === 'zh-to-id' ? '中→ID' : 'ID→中'}
            </button>

            {/* Shuffle */}
            <button
              onClick={handleShuffle}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-600 hover:bg-gray-50"
              title={t('flashcard.shuffle')}
            >
              <Shuffle size={18} />
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{currentIndex + 1} / {cards.length}</span>
            <span>{t('flashcard.known')}: {knownCards.size}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div
          className="perspective-1000 mb-8 cursor-pointer"
          onClick={handleFlip}
          style={{ perspective: '1000px' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentCard.id}-${isFlipped}`}
              className="relative w-full min-h-[320px] sm:min-h-[360px]"
              initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`w-full min-h-[320px] sm:min-h-[360px] rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center ${
                isFlipped
                  ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white'
                  : 'bg-white text-gray-800'
              }`}>
                {!isFlipped ? (
                  // FRONT
                  <>
                    {mode === 'zh-to-id' ? (
                      <>
                        <p className="text-5xl sm:text-6xl font-bold mb-4">{currentCard.chinese}</p>
                        {showPinyin && (
                          <p className="text-xl text-gray-500 mb-3">{currentCard.pinyin}</p>
                        )}
                        <p className="text-sm text-gray-400">{currentCard.category}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-3xl sm:text-4xl font-bold mb-4">{currentCard.indonesian}</p>
                        <p className="text-sm text-gray-400">{currentCard.category}</p>
                      </>
                    )}
                    <p className="mt-6 text-sm text-gray-400">{t('flashcard.tapToFlip')}</p>
                  </>
                ) : (
                  // BACK
                  <>
                    {mode === 'zh-to-id' ? (
                      <>
                        <p className="text-3xl sm:text-4xl font-bold mb-3">{currentCard.indonesian}</p>
                        <p className="text-lg opacity-80 mb-4">{currentCard.chinese} ({currentCard.pinyin})</p>
                      </>
                    ) : (
                      <>
                        <p className="text-5xl font-bold mb-3">{currentCard.chinese}</p>
                        <p className="text-xl opacity-80 mb-2">{currentCard.pinyin}</p>
                        <p className="text-lg opacity-90 mb-4">{currentCard.indonesian}</p>
                      </>
                    )}
                    {/* Example */}
                    <div className="bg-white/20 rounded-xl p-4 w-full max-w-sm text-center">
                      <p className="text-base font-medium mb-1">{currentCard.example}</p>
                      <p className="text-sm opacity-80">{currentCard.exampleId}</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {/* Prev */}
          <motion.button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Don't know / Need review */}
          <motion.button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-100 text-orange-700 font-semibold hover:bg-orange-200 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={18} />
            {t('flashcard.dontKnow')}
          </motion.button>

          {/* Know it */}
          <motion.button
            onClick={handleKnown}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-100 text-emerald-700 font-semibold hover:bg-emerald-200 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <Star size={18} />
            {t('flashcard.knowIt')}
          </motion.button>

          {/* Next */}
          <motion.button
            onClick={handleNext}
            disabled={currentIndex >= cards.length - 1}
            className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Bottom Tools */}
        <div className="flex items-center justify-center gap-4">
          {/* Speak */}
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
          >
            <Volume2 size={16} /> {t('flashcard.listen')}
          </button>

          {/* Pinyin Toggle */}
          <button
            onClick={() => setShowPinyin(p => !p)}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
          >
            {showPinyin ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPinyin ? t('quiz.hidePinyin') : t('quiz.showPinyin')}
          </button>

          {/* Wordbook Toggle */}
          <button
            onClick={toggleWordbook}
            className={`flex items-center gap-1.5 text-sm ${
              isInWordbook(currentCard?.id) ? 'text-pink-500' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Bookmark size={16} fill={isInWordbook(currentCard?.id) ? 'currentColor' : 'none'} />
            {t('flashcard.addToWordbook')}
          </button>
        </div>
      </div>
    </div>
  );
}
