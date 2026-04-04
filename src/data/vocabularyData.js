/**
 * TOCFL 詞彙閃卡資料庫
 * 按 Band A (入門基礎) 和 Band B (進階高階) 分類
 * 每個詞彙包含：中文、拼音、印尼語翻譯、例句、分類
 */

export const vocabularyData = {
  bandA: [
    // ===== 日常生活 =====
    { id: 'v-a-001', chinese: '你好', pinyin: 'nǐ hǎo', indonesian: 'Halo', category: '打招呼', example: '你好，我叫小明。', exampleId: 'Halo, nama saya Xiao Ming.' },
    { id: 'v-a-002', chinese: '謝謝', pinyin: 'xiè xie', indonesian: 'Terima kasih', category: '打招呼', example: '謝謝你的幫忙。', exampleId: 'Terima kasih atas bantuanmu.' },
    { id: 'v-a-003', chinese: '對不起', pinyin: 'duì bu qǐ', indonesian: 'Maaf', category: '打招呼', example: '對不起，我遲到了。', exampleId: 'Maaf, saya terlambat.' },
    { id: 'v-a-004', chinese: '再見', pinyin: 'zài jiàn', indonesian: 'Sampai jumpa', category: '打招呼', example: '明天見，再見！', exampleId: 'Sampai besok, sampai jumpa!' },
    { id: 'v-a-005', chinese: '請', pinyin: 'qǐng', indonesian: 'Silakan / Tolong', category: '打招呼', example: '請坐。', exampleId: 'Silakan duduk.' },
    { id: 'v-a-006', chinese: '不客氣', pinyin: 'bú kè qi', indonesian: 'Sama-sama', category: '打招呼', example: '不客氣，這是我應該做的。', exampleId: 'Sama-sama, ini memang sudah seharusnya.' },

    // ===== 數字與時間 =====
    { id: 'v-a-007', chinese: '今天', pinyin: 'jīn tiān', indonesian: 'Hari ini', category: '時間', example: '今天天氣很好。', exampleId: 'Cuaca hari ini sangat bagus.' },
    { id: 'v-a-008', chinese: '明天', pinyin: 'míng tiān', indonesian: 'Besok', category: '時間', example: '明天我們去看電影。', exampleId: 'Besok kita pergi nonton film.' },
    { id: 'v-a-009', chinese: '昨天', pinyin: 'zuó tiān', indonesian: 'Kemarin', category: '時間', example: '昨天我很忙。', exampleId: 'Kemarin saya sangat sibuk.' },
    { id: 'v-a-010', chinese: '現在', pinyin: 'xiàn zài', indonesian: 'Sekarang', category: '時間', example: '現在幾點？', exampleId: 'Sekarang jam berapa?' },
    { id: 'v-a-011', chinese: '星期', pinyin: 'xīng qī', indonesian: 'Minggu (hari)', category: '時間', example: '今天星期幾？', exampleId: 'Hari ini hari apa?' },
    { id: 'v-a-012', chinese: '小時', pinyin: 'xiǎo shí', indonesian: 'Jam (durasi)', category: '時間', example: '我學了兩個小時。', exampleId: 'Saya belajar selama dua jam.' },

    // ===== 食物 =====
    { id: 'v-a-013', chinese: '吃', pinyin: 'chī', indonesian: 'Makan', category: '食物', example: '你想吃什麼？', exampleId: 'Kamu mau makan apa?' },
    { id: 'v-a-014', chinese: '喝', pinyin: 'hē', indonesian: 'Minum', category: '食物', example: '我想喝茶。', exampleId: 'Saya ingin minum teh.' },
    { id: 'v-a-015', chinese: '飯', pinyin: 'fàn', indonesian: 'Nasi', category: '食物', example: '我們去吃飯吧。', exampleId: 'Ayo kita makan.' },
    { id: 'v-a-016', chinese: '水', pinyin: 'shuǐ', indonesian: 'Air', category: '食物', example: '請給我一杯水。', exampleId: 'Tolong berikan saya segelas air.' },
    { id: 'v-a-017', chinese: '好吃', pinyin: 'hǎo chī', indonesian: 'Enak', category: '食物', example: '這個很好吃！', exampleId: 'Ini sangat enak!' },
    { id: 'v-a-018', chinese: '餐廳', pinyin: 'cān tīng', indonesian: 'Restoran', category: '食物', example: '我們去餐廳吃飯。', exampleId: 'Kita pergi makan di restoran.' },

    // ===== 交通 =====
    { id: 'v-a-019', chinese: '車', pinyin: 'chē', indonesian: 'Mobil / Kendaraan', category: '交通', example: '我坐公車上學。', exampleId: 'Saya naik bus ke sekolah.' },
    { id: 'v-a-020', chinese: '走路', pinyin: 'zǒu lù', indonesian: 'Jalan kaki', category: '交通', example: '學校很近，走路就可以了。', exampleId: 'Sekolah sangat dekat, jalan kaki saja.' },
    { id: 'v-a-021', chinese: '飛機', pinyin: 'fēi jī', indonesian: 'Pesawat', category: '交通', example: '我坐飛機來臺灣。', exampleId: 'Saya naik pesawat ke Taiwan.' },
    { id: 'v-a-022', chinese: '火車', pinyin: 'huǒ chē', indonesian: 'Kereta api', category: '交通', example: '火車票多少錢？', exampleId: 'Berapa harga tiket kereta api?' },

    // ===== 學校 =====
    { id: 'v-a-023', chinese: '學生', pinyin: 'xué shēng', indonesian: 'Murid / Pelajar', category: '學校', example: '我是大學生。', exampleId: 'Saya mahasiswa.' },
    { id: 'v-a-024', chinese: '老師', pinyin: 'lǎo shī', indonesian: 'Guru', category: '學校', example: '老師教得很好。', exampleId: 'Guru mengajar dengan sangat baik.' },
    { id: 'v-a-025', chinese: '上課', pinyin: 'shàng kè', indonesian: 'Masuk kelas', category: '學校', example: '我九點上課。', exampleId: 'Saya masuk kelas jam 9.' },
    { id: 'v-a-026', chinese: '考試', pinyin: 'kǎo shì', indonesian: 'Ujian', category: '學校', example: '明天有考試。', exampleId: 'Besok ada ujian.' },
    { id: 'v-a-027', chinese: '功課', pinyin: 'gōng kè', indonesian: 'PR / Tugas', category: '學校', example: '我還沒寫功課。', exampleId: 'Saya belum mengerjakan PR.' },
    { id: 'v-a-028', chinese: '圖書館', pinyin: 'tú shū guǎn', indonesian: 'Perpustakaan', category: '學校', example: '我在圖書館看書。', exampleId: 'Saya membaca buku di perpustakaan.' },

    // ===== 家庭 =====
    { id: 'v-a-029', chinese: '家', pinyin: 'jiā', indonesian: 'Rumah / Keluarga', category: '家庭', example: '我家有四個人。', exampleId: 'Keluarga saya ada empat orang.' },
    { id: 'v-a-030', chinese: '爸爸', pinyin: 'bà ba', indonesian: 'Ayah', category: '家庭', example: '我爸爸是老師。', exampleId: 'Ayah saya adalah guru.' },
    { id: 'v-a-031', chinese: '媽媽', pinyin: 'mā ma', indonesian: 'Ibu', category: '家庭', example: '媽媽做的菜很好吃。', exampleId: 'Masakan ibu sangat enak.' },
    { id: 'v-a-032', chinese: '朋友', pinyin: 'péng yǒu', indonesian: 'Teman', category: '家庭', example: '他是我最好的朋友。', exampleId: 'Dia adalah teman terbaik saya.' },

    // ===== 動詞 =====
    { id: 'v-a-033', chinese: '看', pinyin: 'kàn', indonesian: 'Melihat / Menonton', category: '動作', example: '我喜歡看電影。', exampleId: 'Saya suka menonton film.' },
    { id: 'v-a-034', chinese: '聽', pinyin: 'tīng', indonesian: 'Mendengar', category: '動作', example: '我喜歡聽音樂。', exampleId: 'Saya suka mendengarkan musik.' },
    { id: 'v-a-035', chinese: '說', pinyin: 'shuō', indonesian: 'Berbicara', category: '動作', example: '你會說中文嗎？', exampleId: 'Apakah kamu bisa berbicara bahasa Mandarin?' },
    { id: 'v-a-036', chinese: '寫', pinyin: 'xiě', indonesian: 'Menulis', category: '動作', example: '請寫你的名字。', exampleId: 'Tolong tulis namamu.' },
    { id: 'v-a-037', chinese: '讀', pinyin: 'dú', indonesian: 'Membaca', category: '動作', example: '我每天讀書。', exampleId: 'Saya membaca setiap hari.' },
    { id: 'v-a-038', chinese: '買', pinyin: 'mǎi', indonesian: 'Membeli', category: '動作', example: '我要買一本書。', exampleId: 'Saya mau membeli sebuah buku.' },
    { id: 'v-a-039', chinese: '學', pinyin: 'xué', indonesian: 'Belajar', category: '動作', example: '我在學中文。', exampleId: 'Saya sedang belajar bahasa Mandarin.' },
    { id: 'v-a-040', chinese: '工作', pinyin: 'gōng zuò', indonesian: 'Bekerja', category: '動作', example: '他在銀行工作。', exampleId: 'Dia bekerja di bank.' },

    // ===== 形容詞 =====
    { id: 'v-a-041', chinese: '大', pinyin: 'dà', indonesian: 'Besar', category: '形容詞', example: '這個房間很大。', exampleId: 'Ruangan ini sangat besar.' },
    { id: 'v-a-042', chinese: '小', pinyin: 'xiǎo', indonesian: 'Kecil', category: '形容詞', example: '我有一隻小狗。', exampleId: 'Saya punya seekor anjing kecil.' },
    { id: 'v-a-043', chinese: '多', pinyin: 'duō', indonesian: 'Banyak', category: '形容詞', example: '那裡的人很多。', exampleId: 'Di sana orangnya banyak sekali.' },
    { id: 'v-a-044', chinese: '少', pinyin: 'shǎo', indonesian: 'Sedikit', category: '形容詞', example: '這裡的人很少。', exampleId: 'Di sini orangnya sangat sedikit.' },
    { id: 'v-a-045', chinese: '快', pinyin: 'kuài', indonesian: 'Cepat', category: '形容詞', example: '他跑得很快。', exampleId: 'Dia berlari sangat cepat.' },
    { id: 'v-a-046', chinese: '慢', pinyin: 'màn', indonesian: 'Lambat', category: '形容詞', example: '請說慢一點。', exampleId: 'Tolong bicara lebih lambat.' },
    { id: 'v-a-047', chinese: '高興', pinyin: 'gāo xìng', indonesian: 'Senang', category: '形容詞', example: '我很高興認識你。', exampleId: 'Saya senang berkenalan denganmu.' },
    { id: 'v-a-048', chinese: '漂亮', pinyin: 'piào liang', indonesian: 'Cantik', category: '形容詞', example: '這朵花很漂亮。', exampleId: 'Bunga ini sangat cantik.' },

    // ===== 場所 =====
    { id: 'v-a-049', chinese: '醫院', pinyin: 'yī yuàn', indonesian: 'Rumah sakit', category: '場所', example: '他在醫院工作。', exampleId: 'Dia bekerja di rumah sakit.' },
    { id: 'v-a-050', chinese: '超市', pinyin: 'chāo shì', indonesian: 'Supermarket', category: '場所', example: '我去超市買東西。', exampleId: 'Saya pergi ke supermarket beli barang.' },
  ],
  bandB: [
    // ===== 社交與情感 =====
    { id: 'v-b-001', chinese: '熱情', pinyin: 'rè qíng', indonesian: 'Antusias / Ramah', category: '情感', example: '臺灣人很熱情。', exampleId: 'Orang Taiwan sangat ramah.' },
    { id: 'v-b-002', chinese: '緊張', pinyin: 'jǐn zhāng', indonesian: 'Gugup / Tegang', category: '情感', example: '考試前我很緊張。', exampleId: 'Saya sangat gugup sebelum ujian.' },
    { id: 'v-b-003', chinese: '失望', pinyin: 'shī wàng', indonesian: 'Kecewa', category: '情感', example: '結果讓我很失望。', exampleId: 'Hasilnya membuat saya sangat kecewa.' },
    { id: 'v-b-004', chinese: '驚訝', pinyin: 'jīng yà', indonesian: 'Terkejut', category: '情感', example: '他的表現讓大家很驚訝。', exampleId: 'Penampilannya membuat semua orang terkejut.' },
    { id: 'v-b-005', chinese: '感動', pinyin: 'gǎn dòng', indonesian: 'Terharu', category: '情感', example: '這部電影很感動。', exampleId: 'Film ini sangat mengharukan.' },

    // ===== 職場 =====
    { id: 'v-b-006', chinese: '經驗', pinyin: 'jīng yàn', indonesian: 'Pengalaman', category: '職場', example: '他有很多工作經驗。', exampleId: 'Dia memiliki banyak pengalaman kerja.' },
    { id: 'v-b-007', chinese: '薪水', pinyin: 'xīn shuǐ', indonesian: 'Gaji', category: '職場', example: '這份工作的薪水不錯。', exampleId: 'Gaji pekerjaan ini cukup bagus.' },
    { id: 'v-b-008', chinese: '面試', pinyin: 'miàn shì', indonesian: 'Wawancara kerja', category: '職場', example: '明天我要去面試。', exampleId: 'Besok saya ada wawancara kerja.' },
    { id: 'v-b-009', chinese: '辭職', pinyin: 'cí zhí', indonesian: 'Mengundurkan diri', category: '職場', example: '他決定辭職了。', exampleId: 'Dia memutuskan untuk mengundurkan diri.' },
    { id: 'v-b-010', chinese: '加班', pinyin: 'jiā bān', indonesian: 'Lembur', category: '職場', example: '他常常加班到很晚。', exampleId: 'Dia sering lembur sampai larut malam.' },

    // ===== 健康 =====
    { id: 'v-b-011', chinese: '運動', pinyin: 'yùn dòng', indonesian: 'Olahraga', category: '健康', example: '每天運動對身體好。', exampleId: 'Olahraga setiap hari baik untuk tubuh.' },
    { id: 'v-b-012', chinese: '感冒', pinyin: 'gǎn mào', indonesian: 'Masuk angin / Flu', category: '健康', example: '我感冒了，頭很痛。', exampleId: 'Saya flu, kepala sangat sakit.' },
    { id: 'v-b-013', chinese: '健康', pinyin: 'jiàn kāng', indonesian: 'Sehat', category: '健康', example: '祝你身體健康！', exampleId: 'Semoga kamu selalu sehat!' },
    { id: 'v-b-014', chinese: '習慣', pinyin: 'xí guàn', indonesian: 'Kebiasaan', category: '健康', example: '早睡早起是好習慣。', exampleId: 'Tidur dan bangun pagi adalah kebiasaan baik.' },
    { id: 'v-b-015', chinese: '壓力', pinyin: 'yā lì', indonesian: 'Tekanan / Stres', category: '健康', example: '工作壓力很大。', exampleId: 'Tekanan kerja sangat besar.' },

    // ===== 文化 =====
    { id: 'v-b-016', chinese: '傳統', pinyin: 'chuán tǒng', indonesian: 'Tradisi', category: '文化', example: '這是臺灣的傳統文化。', exampleId: 'Ini adalah budaya tradisional Taiwan.' },
    { id: 'v-b-017', chinese: '節日', pinyin: 'jié rì', indonesian: 'Hari raya / Festival', category: '文化', example: '春節是最重要的節日。', exampleId: 'Imlek adalah hari raya terpenting.' },
    { id: 'v-b-018', chinese: '風俗', pinyin: 'fēng sú', indonesian: 'Adat istiadat', category: '文化', example: '每個地方都有不同的風俗。', exampleId: 'Setiap tempat memiliki adat istiadat yang berbeda.' },
    { id: 'v-b-019', chinese: '尊重', pinyin: 'zūn zhòng', indonesian: 'Menghormati', category: '文化', example: '我們應該尊重別人。', exampleId: 'Kita harus menghormati orang lain.' },
    { id: 'v-b-020', chinese: '禮貌', pinyin: 'lǐ mào', indonesian: 'Sopan', category: '文化', example: '說話要有禮貌。', exampleId: 'Berbicara harus sopan.' },

    // ===== 環境 =====
    { id: 'v-b-021', chinese: '環境', pinyin: 'huán jìng', indonesian: 'Lingkungan', category: '環境', example: '我們要保護環境。', exampleId: 'Kita harus melindungi lingkungan.' },
    { id: 'v-b-022', chinese: '污染', pinyin: 'wū rǎn', indonesian: 'Polusi', category: '環境', example: '空氣污染越來越嚴重。', exampleId: 'Polusi udara semakin parah.' },
    { id: 'v-b-023', chinese: '節約', pinyin: 'jié yuē', indonesian: 'Hemat', category: '環境', example: '我們要節約用水。', exampleId: 'Kita harus hemat air.' },
    { id: 'v-b-024', chinese: '資源', pinyin: 'zī yuán', indonesian: 'Sumber daya', category: '環境', example: '地球的資源是有限的。', exampleId: 'Sumber daya bumi itu terbatas.' },
    { id: 'v-b-025', chinese: '影響', pinyin: 'yǐng xiǎng', indonesian: 'Pengaruh / Mempengaruhi', category: '環境', example: '天氣會影響我們的心情。', exampleId: 'Cuaca bisa mempengaruhi suasana hati kita.' },

    // ===== 科技 =====
    { id: 'v-b-026', chinese: '網路', pinyin: 'wǎng lù', indonesian: 'Internet', category: '科技', example: '現在沒有網路很不方便。', exampleId: 'Sekarang tanpa internet sangat tidak nyaman.' },
    { id: 'v-b-027', chinese: '手機', pinyin: 'shǒu jī', indonesian: 'HP / Ponsel', category: '科技', example: '我的手機沒電了。', exampleId: 'HP saya kehabisan baterai.' },
    { id: 'v-b-028', chinese: '軟體', pinyin: 'ruǎn tǐ', indonesian: 'Perangkat lunak', category: '科技', example: '這個軟體很好用。', exampleId: 'Perangkat lunak ini sangat berguna.' },
    { id: 'v-b-029', chinese: '資料', pinyin: 'zī liào', indonesian: 'Data / Informasi', category: '科技', example: '請你把資料寄給我。', exampleId: 'Tolong kirimkan datanya ke saya.' },
    { id: 'v-b-030', chinese: '人工智慧', pinyin: 'rén gōng zhì huì', indonesian: 'Kecerdasan buatan (AI)', category: '科技', example: '人工智慧改變了我們的生活。', exampleId: 'AI telah mengubah kehidupan kita.' },

    // ===== 學術 =====
    { id: 'v-b-031', chinese: '研究', pinyin: 'yán jiū', indonesian: 'Penelitian', category: '學術', example: '他在研究中文教學。', exampleId: 'Dia sedang meneliti pengajaran bahasa Mandarin.' },
    { id: 'v-b-032', chinese: '報告', pinyin: 'bào gào', indonesian: 'Laporan / Presentasi', category: '學術', example: '下週要交報告。', exampleId: 'Minggu depan harus mengumpulkan laporan.' },
    { id: 'v-b-033', chinese: '討論', pinyin: 'tǎo lùn', indonesian: 'Diskusi', category: '學術', example: '我們來討論這個問題。', exampleId: 'Ayo kita diskusikan masalah ini.' },
    { id: 'v-b-034', chinese: '內容', pinyin: 'nèi róng', indonesian: 'Isi / Konten', category: '學術', example: '這本書的內容很豐富。', exampleId: 'Isi buku ini sangat kaya.' },
    { id: 'v-b-035', chinese: '原因', pinyin: 'yuán yīn', indonesian: 'Alasan / Penyebab', category: '學術', example: '你知道原因嗎？', exampleId: 'Apakah kamu tahu alasannya?' },
  ],
};

// 取得所有分類
export const getCategories = (band) => {
  const items = vocabularyData[band] || [];
  return [...new Set(items.map(item => item.category))];
};

// 依分類篩選
export const getByCategory = (band, category) => {
  const items = vocabularyData[band] || [];
  if (!category || category === 'all') return items;
  return items.filter(item => item.category === category);
};

// 生詞本（localStorage）
const WORDBOOK_KEY = 'tocfl_wordbook';

export const getWordbook = () => {
  try {
    return JSON.parse(localStorage.getItem(WORDBOOK_KEY) || '[]');
  } catch {
    return [];
  }
};

export const addToWordbook = (vocab) => {
  const wordbook = getWordbook();
  if (!wordbook.find(w => w.id === vocab.id)) {
    wordbook.push({ ...vocab, addedAt: Date.now() });
    localStorage.setItem(WORDBOOK_KEY, JSON.stringify(wordbook));
  }
};

export const removeFromWordbook = (vocabId) => {
  const wordbook = getWordbook().filter(w => w.id !== vocabId);
  localStorage.setItem(WORDBOOK_KEY, JSON.stringify(wordbook));
};

export const isInWordbook = (vocabId) => {
  return getWordbook().some(w => w.id === vocabId);
};

export default vocabularyData;
