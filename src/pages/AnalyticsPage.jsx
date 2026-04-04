import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Target,
  BookOpen,
  Headphones,
  Brain,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Zap,
  RotateCcw,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getSRStats, loadSRData } from '../data/spacedRepetition';

const STUDY_LOG_KEY = 'tocfl_study_log';

// Helper: load study log from localStorage
const loadStudyLog = () => {
  try {
    return JSON.parse(localStorage.getItem(STUDY_LOG_KEY) || '[]');
  } catch {
    return [];
  }
};

// Helper: log a study session (called externally)
export const logStudySession = (type, correct, total, band) => {
  const log = loadStudyLog();
  log.push({
    date: new Date().toISOString(),
    type,
    correct,
    total,
    band,
    timestamp: Date.now(),
  });
  // Keep only last 100 entries
  if (log.length > 100) log.splice(0, log.length - 100);
  localStorage.setItem(STUDY_LOG_KEY, JSON.stringify(log));
};

const AnalyticsPage = () => {
  const { user, userStats } = useAuth();
  const { lang, t } = useLanguage();
  const [srStats, setSrStats] = useState(null);
  const [studyLog, setStudyLog] = useState([]);
  const [readingWrong, setReadingWrong] = useState([]);
  const [listeningWrong, setListeningWrong] = useState([]);

  useEffect(() => {
    setSrStats(getSRStats());
    setStudyLog(loadStudyLog());
    try {
      setReadingWrong(JSON.parse(localStorage.getItem('tocfl_reading_wrong_bank') || '[]'));
      setListeningWrong(JSON.parse(localStorage.getItem('tocfl_listening_wrong_bank') || '[]'));
    } catch {}
  }, []);

  // Calculate weekly stats (last 7 days)
  const weeklyData = useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'zh-TW', { weekday: 'short' });
      const dayLogs = studyLog.filter(l => l.date.startsWith(dateStr));
      const total = dayLogs.reduce((s, l) => s + l.total, 0);
      const correct = dayLogs.reduce((s, l) => s + l.correct, 0);
      days.push({
        label: dayLabel,
        date: dateStr,
        total,
        correct,
        sessions: dayLogs.length,
        accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
      });
    }
    return days;
  }, [studyLog, lang]);

  const maxDayTotal = Math.max(...weeklyData.map(d => d.total), 1);

  // Category accuracy from wrong bank
  const categoryBreakdown = useMemo(() => {
    const cats = {};
    [...readingWrong, ...listeningWrong].forEach(q => {
      const cat = q.category || (q.type === 'listening' ? '聽力' : '閱讀');
      if (!cats[cat]) cats[cat] = { wrong: 0, label: cat };
      cats[cat].wrong++;
    });
    return Object.values(cats).sort((a, b) => b.wrong - a.wrong).slice(0, 6);
  }, [readingWrong, listeningWrong]);

  // SR data analysis
  const srData = useMemo(() => {
    const data = loadSRData();
    const items = Object.values(data);
    const reading = items.filter(i => i.questionType === 'reading');
    const listening = items.filter(i => i.questionType === 'listening');
    const avgEase = items.length > 0
      ? (items.reduce((s, i) => s + i.easeFactor, 0) / items.length).toFixed(2)
      : 0;
    return { reading: reading.length, listening: listening.length, total: items.length, avgEase };
  }, []);

  // Overall stats
  const readingAcc = userStats?.readingStats?.accuracy || 0;
  const listeningAcc = userStats?.listeningStats?.accuracy || 0;
  const totalSessions = studyLog.length;
  const totalQuestionsAnswered = studyLog.reduce((s, l) => s + l.total, 0);
  const totalCorrect = studyLog.reduce((s, l) => s + l.correct, 0);
  const overallAccuracy = totalQuestionsAnswered > 0 ? Math.round((totalCorrect / totalQuestionsAnswered) * 100) : 0;

  // Weakness analysis
  const weaknesses = useMemo(() => {
    const items = [];
    if (readingAcc < listeningAcc && readingAcc > 0) {
      items.push({
        type: 'reading',
        icon: BookOpen,
        color: 'blue',
        label: lang === 'id' ? 'Kemampuan membaca perlu ditingkatkan' : '閱讀能力需要加強',
        suggestion: lang === 'id' ? 'Coba latihan membaca lebih banyak, fokus pada pemahaman konteks.' : '建議多做閱讀練習，注重上下文理解。',
      });
    }
    if (listeningAcc < readingAcc && listeningAcc > 0) {
      items.push({
        type: 'listening',
        icon: Headphones,
        color: 'green',
        label: lang === 'id' ? 'Kemampuan mendengar perlu ditingkatkan' : '聽力能力需要加強',
        suggestion: lang === 'id' ? 'Dengarkan lebih banyak audio bahasa Mandarin dan latih kecepatan pemahaman.' : '建議多聽中文音訊，訓練理解速度。',
      });
    }
    if (srStats && srStats.dueNow > 5) {
      items.push({
        type: 'review',
        icon: RotateCcw,
        color: 'red',
        label: lang === 'id' ? `${srStats.dueNow} soal perlu diulang` : `${srStats.dueNow} 道題目需要複習`,
        suggestion: lang === 'id' ? 'Selesaikan review yang tertunda untuk memperkuat ingatan.' : '完成待複習的題目，鞏固記憶。',
      });
    }
    if (readingWrong.length + listeningWrong.length > 10) {
      items.push({
        type: 'wrong',
        icon: AlertTriangle,
        color: 'orange',
        label: lang === 'id' ? `${readingWrong.length + listeningWrong.length} soal salah tersimpan` : `${readingWrong.length + listeningWrong.length} 道錯題待練習`,
        suggestion: lang === 'id' ? 'Gunakan mode latihan salah untuk mengurangi kelemahan.' : '使用錯題練習模式來改善弱點。',
      });
    }
    return items;
  }, [readingAcc, listeningAcc, srStats, readingWrong, listeningWrong, lang]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-8 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold text-white">
              {lang === 'id' ? 'Analisis Belajar' : '學習數據分析'}
            </h1>
          </div>
          <p className="text-slate-400">
            {lang === 'id' ? 'Pantau kemajuan dan temukan area yang perlu ditingkatkan' : '追蹤學習進度，發現需要加強的領域'}
          </p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8" variants={containerVariants}>
          <motion.div className="bg-slate-800 rounded-xl p-5 border border-slate-700" variants={itemVariants}>
            <Target className="w-6 h-6 text-cyan-400 mb-2" />
            <p className="text-2xl font-bold text-white">{overallAccuracy}%</p>
            <p className="text-xs text-slate-400">{lang === 'id' ? 'Akurasi Keseluruhan' : '總體正確率'}</p>
          </motion.div>
          <motion.div className="bg-slate-800 rounded-xl p-5 border border-slate-700" variants={itemVariants}>
            <Calendar className="w-6 h-6 text-purple-400 mb-2" />
            <p className="text-2xl font-bold text-white">{totalSessions}</p>
            <p className="text-xs text-slate-400">{lang === 'id' ? 'Sesi Latihan' : '練習次數'}</p>
          </motion.div>
          <motion.div className="bg-slate-800 rounded-xl p-5 border border-slate-700" variants={itemVariants}>
            <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-2xl font-bold text-white">{totalCorrect}/{totalQuestionsAnswered}</p>
            <p className="text-xs text-slate-400">{lang === 'id' ? 'Jawaban Benar' : '答對題數'}</p>
          </motion.div>
          <motion.div className="bg-slate-800 rounded-xl p-5 border border-slate-700" variants={itemVariants}>
            <Brain className="w-6 h-6 text-red-400 mb-2" />
            <p className="text-2xl font-bold text-white">{srData.total}</p>
            <p className="text-xs text-slate-400">{lang === 'id' ? 'Dalam Sistem Review' : 'SR 系統中的題目'}</p>
          </motion.div>
        </motion.div>

        {/* Weekly Activity Chart */}
        <motion.div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            {lang === 'id' ? 'Aktivitas 7 Hari Terakhir' : '最近 7 天活動'}
          </h3>
          <div className="flex items-end gap-3 h-40">
            {weeklyData.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center justify-end h-28">
                  {day.total > 0 && (
                    <span className="text-xs text-cyan-300 mb-1">{day.total}</span>
                  )}
                  <motion.div
                    className="w-full max-w-10 rounded-t-lg bg-gradient-to-t from-cyan-600 to-cyan-400"
                    initial={{ height: 0 }}
                    animate={{ height: day.total > 0 ? `${Math.max((day.total / maxDayTotal) * 100, 8)}%` : '4px' }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    style={{ minHeight: day.total > 0 ? '12px' : '4px' }}
                  />
                </div>
                <span className="text-xs text-slate-400">{day.label}</span>
              </div>
            ))}
          </div>
          {totalSessions === 0 && (
            <p className="text-center text-slate-500 mt-4">
              {lang === 'id' ? 'Belum ada data. Mulai latihan untuk melihat statistik!' : '尚無數據，開始練習即可查看統計！'}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Skill Comparison */}
          <motion.div className="bg-slate-800 rounded-xl p-6 border border-slate-700" variants={itemVariants}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-green-400" />
              {lang === 'id' ? 'Perbandingan Kemampuan' : '能力對比'}
            </h3>
            <div className="space-y-6">
              {/* Reading */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    {lang === 'id' ? 'Membaca' : '閱讀'}
                  </span>
                  <span className="text-sm font-bold text-blue-400">{Math.round(readingAcc)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${readingAcc}%` }}
                    transition={{ duration: 1.2 }}
                  />
                </div>
              </div>
              {/* Listening */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300 flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-green-400" />
                    {lang === 'id' ? 'Mendengar' : '聽力'}
                  </span>
                  <span className="text-sm font-bold text-green-400">{Math.round(listeningAcc)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${listeningAcc}%` }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                  />
                </div>
              </div>
            </div>

            {/* SR Breakdown */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <h4 className="text-sm font-semibold text-slate-300 mb-3">
                {lang === 'id' ? 'Sistem Review Cerdas' : '智慧複習系統'}
              </h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <p className="text-lg font-bold text-red-400">{srStats?.dueNow || 0}</p>
                  <p className="text-xs text-slate-400">{lang === 'id' ? 'Perlu Diulang' : '待複習'}</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <p className="text-lg font-bold text-amber-400">{srStats?.dueTomorrow || 0}</p>
                  <p className="text-xs text-slate-400">{lang === 'id' ? 'Besok' : '明日到期'}</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <p className="text-lg font-bold text-green-400">{srStats?.mastering || 0}</p>
                  <p className="text-xs text-slate-400">{lang === 'id' ? 'Hampir Hafal' : '即將掌握'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Weak Areas */}
          <motion.div className="bg-slate-800 rounded-xl p-6 border border-slate-700" variants={itemVariants}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              {lang === 'id' ? 'Area yang Perlu Ditingkatkan' : '需要加強的領域'}
            </h3>

            {categoryBreakdown.length > 0 ? (
              <div className="space-y-3 mb-6">
                <p className="text-sm text-slate-400 mb-3">
                  {lang === 'id' ? 'Kategori soal paling sering salah:' : '最常答錯的題目類別：'}
                </p>
                {categoryBreakdown.map((cat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-slate-300">{cat.label}</span>
                        <span className="text-xs text-red-400">{cat.wrong} {lang === 'id' ? 'salah' : '錯'}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-red-500 to-orange-400 h-full rounded-full"
                          style={{ width: `${Math.min((cat.wrong / (categoryBreakdown[0]?.wrong || 1)) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm mb-6">
                {lang === 'id' ? 'Belum ada data kesalahan. Terus latihan!' : '尚無錯題數據，繼續練習！'}
              </p>
            )}

            {/* Personalized Recommendations */}
            {weaknesses.length > 0 && (
              <div className="space-y-3 border-t border-slate-700 pt-4">
                <p className="text-sm font-semibold text-slate-300">
                  {lang === 'id' ? 'Rekomendasi:' : '個人化建議：'}
                </p>
                {weaknesses.map((w, i) => {
                  const Icon = w.icon;
                  return (
                    <div key={i} className="flex gap-3 bg-slate-700/30 rounded-lg p-3">
                      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 text-${w.color}-400`} />
                      <div>
                        <p className="text-sm font-medium text-white">{w.label}</p>
                        <p className="text-xs text-slate-400">{w.suggestion}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {weaknesses.length === 0 && categoryBreakdown.length === 0 && (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="text-white font-medium">
                  {lang === 'id' ? 'Hebat! Tidak ada kelemahan yang terdeteksi.' : '太棒了！目前沒有明顯的弱點。'}
                </p>
                <p className="text-sm text-slate-400">
                  {lang === 'id' ? 'Terus latihan untuk menjaga kemampuan!' : '繼續練習保持水準！'}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4" variants={containerVariants}>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }}>
            <Link to="/reading">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl p-5 text-center text-white font-bold shadow-lg border border-blue-500/50 flex items-center justify-center gap-3">
                <BookOpen className="w-5 h-5" />
                {lang === 'id' ? 'Latihan Membaca' : '閱讀練習'}
              </div>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }}>
            <Link to="/listening">
              <div className="bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-xl p-5 text-center text-white font-bold shadow-lg border border-green-500/50 flex items-center justify-center gap-3">
                <Headphones className="w-5 h-5" />
                {lang === 'id' ? 'Latihan Mendengar' : '聽力練習'}
              </div>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }}>
            <Link to="/daily">
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 rounded-xl p-5 text-center text-white font-bold shadow-lg border border-amber-500/50 flex items-center justify-center gap-3">
                <Zap className="w-5 h-5" />
                {lang === 'id' ? 'Tantangan Harian' : '每日挑戰'}
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
