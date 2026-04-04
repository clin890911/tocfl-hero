/**
 * 智慧複習系統 - 基於 SM-2 間隔重複演算法
 * Spaced Repetition System based on SM-2 algorithm
 *
 * 每道錯題都有一個複習排程，根據學生的掌握程度動態調整複習間隔
 */

const SR_STORAGE_KEY = 'tocfl_sr_data';

// 預設的 SR 項目
const createSRItem = (questionId, questionType) => ({
  questionId,
  questionType, // 'reading' or 'listening'
  easeFactor: 2.5, // SM-2 的初始難度因子
  interval: 0, // 天數間隔
  repetitions: 0, // 成功複習次數
  nextReview: Date.now(), // 下次複習時間
  lastReview: null,
  consecutiveCorrect: 0,
  totalAttempts: 0,
  totalCorrect: 0,
});

// 載入所有 SR 資料
export const loadSRData = () => {
  try {
    const data = JSON.parse(localStorage.getItem(SR_STORAGE_KEY) || '{}');
    return data;
  } catch {
    return {};
  }
};

// 儲存 SR 資料
export const saveSRData = (data) => {
  localStorage.setItem(SR_STORAGE_KEY, JSON.stringify(data));
};

// 加入新的錯題到 SR 系統
export const addToSR = (questionId, questionType) => {
  const data = loadSRData();
  if (!data[questionId]) {
    data[questionId] = createSRItem(questionId, questionType);
  }
  saveSRData(data);
  return data[questionId];
};

// 從 SR 系統移除（答對後且掌握度足夠時）
export const removeFromSR = (questionId) => {
  const data = loadSRData();
  delete data[questionId];
  saveSRData(data);
};

/**
 * SM-2 演算法核心
 * quality: 0-5 的評分
 *   0 = 完全忘記
 *   1 = 答錯，看了答案後記起
 *   2 = 答錯，但接近正確
 *   3 = 答對，但很猶豫
 *   4 = 答對，略有遲疑
 *   5 = 答對，完全掌握
 */
export const reviewItem = (questionId, quality) => {
  const data = loadSRData();
  const item = data[questionId];
  if (!item) return null;

  item.totalAttempts += 1;
  item.lastReview = Date.now();

  if (quality >= 3) {
    // 答對
    item.totalCorrect += 1;
    item.consecutiveCorrect += 1;

    if (item.repetitions === 0) {
      item.interval = 1; // 第一次答對：1天後複習
    } else if (item.repetitions === 1) {
      item.interval = 3; // 第二次答對：3天後複習
    } else {
      item.interval = Math.round(item.interval * item.easeFactor);
    }
    item.repetitions += 1;
  } else {
    // 答錯
    item.consecutiveCorrect = 0;
    item.repetitions = 0;
    item.interval = 0; // 重新開始
  }

  // 更新 ease factor
  item.easeFactor = Math.max(
    1.3,
    item.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // 設定下次複習時間
  item.nextReview = Date.now() + item.interval * 24 * 60 * 60 * 1000;

  data[questionId] = item;
  saveSRData(data);

  // 如果已連續答對5次以上且 interval > 30天，視為已掌握
  if (item.consecutiveCorrect >= 5 && item.interval > 30) {
    removeFromSR(questionId);
    return { mastered: true, item };
  }

  return { mastered: false, item };
};

// 取得今天需要複習的題目
export const getDueReviews = (questionType = null) => {
  const data = loadSRData();
  const now = Date.now();

  return Object.values(data)
    .filter(item => {
      if (questionType && item.questionType !== questionType) return false;
      return item.nextReview <= now;
    })
    .sort((a, b) => a.nextReview - b.nextReview);
};

// 取得所有 SR 項目的統計
export const getSRStats = () => {
  const data = loadSRData();
  const items = Object.values(data);
  const now = Date.now();

  const due = items.filter(i => i.nextReview <= now);
  const upcoming = items.filter(i => i.nextReview > now && i.nextReview <= now + 24 * 60 * 60 * 1000);
  const mastering = items.filter(i => i.consecutiveCorrect >= 3);

  return {
    totalItems: items.length,
    dueNow: due.length,
    dueTomorrow: upcoming.length,
    mastering: mastering.length,
    readingItems: items.filter(i => i.questionType === 'reading').length,
    listeningItems: items.filter(i => i.questionType === 'listening').length,
  };
};

// 取得學習建議
export const getStudyRecommendation = (userData) => {
  const srStats = getSRStats();
  const recommendations = [];

  // 有到期複習題
  if (srStats.dueNow > 0) {
    recommendations.push({
      type: 'review',
      priority: 'high',
      icon: '🔄',
      count: srStats.dueNow,
    });
  }

  // 根據弱項推薦
  if (userData) {
    const readingAcc = userData.readingStats?.total > 0
      ? userData.readingStats.correct / userData.readingStats.total
      : null;
    const listeningAcc = userData.listeningStats?.total > 0
      ? userData.listeningStats.correct / userData.listeningStats.total
      : null;

    if (readingAcc !== null && listeningAcc !== null) {
      if (readingAcc < listeningAcc - 0.1) {
        recommendations.push({
          type: 'weak_reading',
          priority: 'medium',
          icon: '📖',
          accuracy: Math.round(readingAcc * 100),
        });
      } else if (listeningAcc < readingAcc - 0.1) {
        recommendations.push({
          type: 'weak_listening',
          priority: 'medium',
          icon: '🎧',
          accuracy: Math.round(listeningAcc * 100),
        });
      }
    }

    // 推薦每日挑戰
    const lastChallenge = localStorage.getItem('tocfl_last_daily_challenge');
    const today = new Date().toDateString();
    if (lastChallenge !== today) {
      recommendations.push({
        type: 'daily_challenge',
        priority: 'medium',
        icon: '⚡',
      });
    }
  }

  return recommendations;
};

export default {
  loadSRData,
  saveSRData,
  addToSR,
  removeFromSR,
  reviewItem,
  getDueReviews,
  getSRStats,
  getStudyRecommendation,
};
