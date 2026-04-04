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
    { id: 'v-a-051', chinese: '銀行', pinyin: 'yín háng', indonesian: 'Bank', category: '場所', example: '我要去銀行換錢。', exampleId: 'Saya mau pergi ke bank tukar uang.' },
    { id: 'v-a-052', chinese: '郵局', pinyin: 'yóu jú', indonesian: 'Kantor pos', category: '場所', example: '我去郵局寄信。', exampleId: 'Saya pergi ke kantor pos mengirim surat.' },

    // ===== 天氣 =====
    { id: 'v-a-053', chinese: '天氣', pinyin: 'tiān qì', indonesian: 'Cuaca', category: '天氣', example: '今天天氣怎麼樣？', exampleId: 'Bagaimana cuaca hari ini?' },
    { id: 'v-a-054', chinese: '熱', pinyin: 'rè', indonesian: 'Panas', category: '天氣', example: '夏天很熱。', exampleId: 'Musim panas sangat panas.' },
    { id: 'v-a-055', chinese: '冷', pinyin: 'lěng', indonesian: 'Dingin', category: '天氣', example: '冬天很冷。', exampleId: 'Musim dingin sangat dingin.' },
    { id: 'v-a-056', chinese: '下雨', pinyin: 'xià yǔ', indonesian: 'Hujan', category: '天氣', example: '外面下雨了。', exampleId: 'Di luar sedang hujan.' },
    { id: 'v-a-057', chinese: '晴天', pinyin: 'qíng tiān', indonesian: 'Cerah', category: '天氣', example: '今天是晴天。', exampleId: 'Hari ini cerah.' },

    // ===== 身體 =====
    { id: 'v-a-058', chinese: '頭', pinyin: 'tóu', indonesian: 'Kepala', category: '身體', example: '我頭很痛。', exampleId: 'Kepala saya sangat sakit.' },
    { id: 'v-a-059', chinese: '手', pinyin: 'shǒu', indonesian: 'Tangan', category: '身體', example: '請洗手。', exampleId: 'Tolong cuci tangan.' },
    { id: 'v-a-060', chinese: '腳', pinyin: 'jiǎo', indonesian: 'Kaki', category: '身體', example: '我的腳很痠。', exampleId: 'Kaki saya sangat pegal.' },
    { id: 'v-a-061', chinese: '眼睛', pinyin: 'yǎn jīng', indonesian: 'Mata', category: '身體', example: '她的眼睛很大。', exampleId: 'Matanya sangat besar.' },
    { id: 'v-a-062', chinese: '嘴巴', pinyin: 'zuǐ ba', indonesian: 'Mulut', category: '身體', example: '嘴巴不舒服。', exampleId: 'Mulut tidak nyaman.' },

    // ===== 顏色 =====
    { id: 'v-a-063', chinese: '紅色', pinyin: 'hóng sè', indonesian: 'Merah', category: '顏色', example: '她穿紅色的衣服。', exampleId: 'Dia memakai baju merah.' },
    { id: 'v-a-064', chinese: '藍色', pinyin: 'lán sè', indonesian: 'Biru', category: '顏色', example: '天空是藍色的。', exampleId: 'Langit berwarna biru.' },
    { id: 'v-a-065', chinese: '白色', pinyin: 'bái sè', indonesian: 'Putih', category: '顏色', example: '我喜歡白色。', exampleId: 'Saya suka warna putih.' },
    { id: 'v-a-066', chinese: '黑色', pinyin: 'hēi sè', indonesian: 'Hitam', category: '顏色', example: '他的頭髮是黑色的。', exampleId: 'Rambutnya berwarna hitam.' },
    { id: 'v-a-067', chinese: '綠色', pinyin: 'lǜ sè', indonesian: 'Hijau', category: '顏色', example: '樹葉是綠色的。', exampleId: 'Daun berwarna hijau.' },

    // ===== 數量 =====
    { id: 'v-a-068', chinese: '一', pinyin: 'yī', indonesian: 'Satu', category: '數字', example: '我要一杯咖啡。', exampleId: 'Saya mau satu gelas kopi.' },
    { id: 'v-a-069', chinese: '百', pinyin: 'bǎi', indonesian: 'Seratus', category: '數字', example: '這本書一百塊。', exampleId: 'Buku ini seratus dolar.' },
    { id: 'v-a-070', chinese: '千', pinyin: 'qiān', indonesian: 'Seribu', category: '數字', example: '一千塊太貴了。', exampleId: 'Seribu dolar terlalu mahal.' },
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

    // ===== 旅遊 =====
    { id: 'v-b-036', chinese: '旅遊', pinyin: 'lǚ yóu', indonesian: 'Berwisata', category: '旅遊', example: '我喜歡去國外旅遊。', exampleId: 'Saya suka berwisata ke luar negeri.' },
    { id: 'v-b-037', chinese: '護照', pinyin: 'hù zhào', indonesian: 'Paspor', category: '旅遊', example: '出國要帶護照。', exampleId: 'Pergi ke luar negeri harus bawa paspor.' },
    { id: 'v-b-038', chinese: '簽證', pinyin: 'qiān zhèng', indonesian: 'Visa', category: '旅遊', example: '我需要申請簽證。', exampleId: 'Saya perlu mengajukan visa.' },
    { id: 'v-b-039', chinese: '行李', pinyin: 'xíng lǐ', indonesian: 'Bagasi', category: '旅遊', example: '我的行李太重了。', exampleId: 'Bagasi saya terlalu berat.' },
    { id: 'v-b-040', chinese: '訂房', pinyin: 'dìng fáng', indonesian: 'Pesan kamar', category: '旅遊', example: '我已經訂好房間了。', exampleId: 'Saya sudah memesan kamar.' },

    // ===== 購物 =====
    { id: 'v-b-041', chinese: '打折', pinyin: 'dǎ zhé', indonesian: 'Diskon', category: '購物', example: '這件衣服打八折。', exampleId: 'Baju ini diskon 20%.' },
    { id: 'v-b-042', chinese: '便宜', pinyin: 'pián yi', indonesian: 'Murah', category: '購物', example: '這個很便宜。', exampleId: 'Ini sangat murah.' },
    { id: 'v-b-043', chinese: '貴', pinyin: 'guì', indonesian: 'Mahal', category: '購物', example: '這個太貴了。', exampleId: 'Ini terlalu mahal.' },
    { id: 'v-b-044', chinese: '付錢', pinyin: 'fù qián', indonesian: 'Membayar', category: '購物', example: '可以用信用卡付錢嗎？', exampleId: 'Bisa bayar pakai kartu kredit?' },
    { id: 'v-b-045', chinese: '退貨', pinyin: 'tuì huò', indonesian: 'Mengembalikan barang', category: '購物', example: '這件衣服可以退貨嗎？', exampleId: 'Baju ini bisa dikembalikan?' },

    // ===== 醫療 =====
    { id: 'v-b-046', chinese: '看病', pinyin: 'kàn bìng', indonesian: 'Periksa ke dokter', category: '醫療', example: '我要去看病。', exampleId: 'Saya mau pergi ke dokter.' },
    { id: 'v-b-047', chinese: '藥', pinyin: 'yào', indonesian: 'Obat', category: '醫療', example: '你吃藥了嗎？', exampleId: 'Sudah minum obat belum?' },
    { id: 'v-b-048', chinese: '發燒', pinyin: 'fā shāo', indonesian: 'Demam', category: '醫療', example: '我發燒了。', exampleId: 'Saya demam.' },
    { id: 'v-b-049', chinese: '過敏', pinyin: 'guò mǐn', indonesian: 'Alergi', category: '醫療', example: '我對花生過敏。', exampleId: 'Saya alergi kacang tanah.' },
    { id: 'v-b-050', chinese: '保險', pinyin: 'bǎo xiǎn', indonesian: 'Asuransi', category: '醫療', example: '你有買健康保險嗎？', exampleId: 'Apakah kamu punya asuransi kesehatan?' },

    // ===== 節慶 =====
    { id: 'v-b-051', chinese: '春節', pinyin: 'chūn jié', indonesian: 'Tahun Baru Imlek', category: '節慶', example: '春節是臺灣最重要的節日。', exampleId: 'Imlek adalah hari raya terpenting di Taiwan.' },
    { id: 'v-b-052', chinese: '中秋節', pinyin: 'zhōng qiū jié', indonesian: 'Festival Pertengahan Musim Gugur', category: '節慶', example: '中秋節要吃月餅。', exampleId: 'Saat Festival Musim Gugur harus makan kue bulan.' },
    { id: 'v-b-053', chinese: '紅包', pinyin: 'hóng bāo', indonesian: 'Angpao', category: '節慶', example: '過年小孩會收到紅包。', exampleId: 'Saat Imlek anak-anak menerima angpao.' },
    { id: 'v-b-054', chinese: '放假', pinyin: 'fàng jià', indonesian: 'Libur', category: '節慶', example: '明天放假一天。', exampleId: 'Besok libur satu hari.' },
    { id: 'v-b-055', chinese: '慶祝', pinyin: 'qìng zhù', indonesian: 'Merayakan', category: '節慶', example: '我們一起慶祝生日。', exampleId: 'Kita merayakan ulang tahun bersama.' },

    // ===== 交際用語 =====
    { id: 'v-b-056', chinese: '介紹', pinyin: 'jiè shào', indonesian: 'Memperkenalkan', category: '交際', example: '讓我介紹一下自己。', exampleId: 'Izinkan saya memperkenalkan diri.' },
    { id: 'v-b-057', chinese: '聯絡', pinyin: 'lián luò', indonesian: 'Menghubungi', category: '交際', example: '我們保持聯絡。', exampleId: 'Kita tetap berhubungan.' },
    { id: 'v-b-058', chinese: '邀請', pinyin: 'yāo qǐng', indonesian: 'Mengundang', category: '交際', example: '我邀請你來我家。', exampleId: 'Saya mengundangmu ke rumah saya.' },
    { id: 'v-b-059', chinese: '拒絕', pinyin: 'jù jué', indonesian: 'Menolak', category: '交際', example: '他拒絕了我的邀請。', exampleId: 'Dia menolak undangan saya.' },
    { id: 'v-b-060', chinese: '同意', pinyin: 'tóng yì', indonesian: 'Setuju', category: '交際', example: '我同意你的看法。', exampleId: 'Saya setuju dengan pendapatmu.' },

    // ===== 住房 =====
    { id: 'v-b-061', chinese: '租房', pinyin: 'zū fáng', indonesian: 'Menyewa rumah', category: '住房', example: '我在找房子租。', exampleId: 'Saya sedang mencari rumah untuk disewa.' },
    { id: 'v-b-062', chinese: '房租', pinyin: 'fáng zū', indonesian: 'Uang sewa', category: '住房', example: '這裡的房租很貴。', exampleId: 'Uang sewa di sini sangat mahal.' },
    { id: 'v-b-063', chinese: '搬家', pinyin: 'bān jiā', indonesian: 'Pindah rumah', category: '住房', example: '下個月我要搬家。', exampleId: 'Bulan depan saya mau pindah rumah.' },
    { id: 'v-b-064', chinese: '鄰居', pinyin: 'lín jū', indonesian: 'Tetangga', category: '住房', example: '我的鄰居很友善。', exampleId: 'Tetangga saya sangat ramah.' },
    { id: 'v-b-065', chinese: '公寓', pinyin: 'gōng yù', indonesian: 'Apartemen', category: '住房', example: '我住在公寓裡。', exampleId: 'Saya tinggal di apartemen.' },
  ],
  bandC: [
    // ===== 成語與慣用語 =====
    { id: 'v-c-001', chinese: '一舉兩得', pinyin: 'yī jǔ liǎng dé', indonesian: 'Sekali dayung dua pulau terlampaui', category: '成語', example: '學中文又能交朋友，一舉兩得。', exampleId: 'Belajar bahasa Mandarin sekaligus berteman, sekali dayung dua pulau terlampaui.' },
    { id: 'v-c-002', chinese: '半途而廢', pinyin: 'bàn tú ér fèi', indonesian: 'Menyerah di tengah jalan', category: '成語', example: '做事不能半途而廢。', exampleId: 'Melakukan sesuatu tidak boleh menyerah di tengah jalan.' },
    { id: 'v-c-003', chinese: '入境隨俗', pinyin: 'rù jìng suí sú', indonesian: 'Di mana bumi dipijak, di situ langit dijunjung', category: '成語', example: '到了新的國家要入境隨俗。', exampleId: 'Di negara baru harus mengikuti adat setempat.' },
    { id: 'v-c-004', chinese: '自言自語', pinyin: 'zì yán zì yǔ', indonesian: 'Berbicara sendiri', category: '成語', example: '他常常自言自語。', exampleId: 'Dia sering berbicara sendiri.' },
    { id: 'v-c-005', chinese: '異口同聲', pinyin: 'yì kǒu tóng shēng', indonesian: 'Serentak / Satu suara', category: '成語', example: '大家異口同聲地說好。', exampleId: 'Semua orang serentak berkata setuju.' },
    { id: 'v-c-006', chinese: '脫穎而出', pinyin: 'tuō yǐng ér chū', indonesian: 'Menonjol / Unggul', category: '成語', example: '她在比賽中脫穎而出。', exampleId: 'Dia menonjol dalam kompetisi.' },
    { id: 'v-c-007', chinese: '愛不釋手', pinyin: 'ài bú shì shǒu', indonesian: 'Sangat menyukai hingga tak mau melepaskan', category: '成語', example: '這本書讓我愛不釋手。', exampleId: 'Buku ini membuat saya sangat menyukainya.' },
    { id: 'v-c-008', chinese: '刻骨銘心', pinyin: 'kè gǔ míng xīn', indonesian: 'Sangat berkesan / Tak terlupakan', category: '成語', example: '那次旅行讓我刻骨銘心。', exampleId: 'Perjalanan itu sangat berkesan bagi saya.' },

    // ===== 政治經濟 =====
    { id: 'v-c-009', chinese: '政策', pinyin: 'zhèng cè', indonesian: 'Kebijakan', category: '政經', example: '政府推出新的教育政策。', exampleId: 'Pemerintah meluncurkan kebijakan pendidikan baru.' },
    { id: 'v-c-010', chinese: '經濟', pinyin: 'jīng jì', indonesian: 'Ekonomi', category: '政經', example: '臺灣的經濟發展很快。', exampleId: 'Perkembangan ekonomi Taiwan sangat cepat.' },
    { id: 'v-c-011', chinese: '投資', pinyin: 'tóu zī', indonesian: 'Investasi', category: '政經', example: '他投資了一家公司。', exampleId: 'Dia berinvestasi di sebuah perusahaan.' },
    { id: 'v-c-012', chinese: '競爭', pinyin: 'jìng zhēng', indonesian: 'Persaingan', category: '政經', example: '市場競爭很激烈。', exampleId: 'Persaingan pasar sangat ketat.' },
    { id: 'v-c-013', chinese: '趨勢', pinyin: 'qū shì', indonesian: 'Tren', category: '政經', example: '這是未來的趨勢。', exampleId: 'Ini adalah tren masa depan.' },
    { id: 'v-c-014', chinese: '消費', pinyin: 'xiāo fèi', indonesian: 'Konsumsi', category: '政經', example: '年輕人的消費習慣改變了。', exampleId: 'Kebiasaan konsumsi anak muda telah berubah.' },
    { id: 'v-c-015', chinese: '國際', pinyin: 'guó jì', indonesian: 'Internasional', category: '政經', example: '這是一個國際會議。', exampleId: 'Ini adalah konferensi internasional.' },

    // ===== 抽象概念 =====
    { id: 'v-c-016', chinese: '價值', pinyin: 'jià zhí', indonesian: 'Nilai', category: '抽象', example: '教育有很大的價值。', exampleId: 'Pendidikan memiliki nilai yang besar.' },
    { id: 'v-c-017', chinese: '觀念', pinyin: 'guān niàn', indonesian: 'Konsep / Pandangan', category: '抽象', example: '每個人的觀念不同。', exampleId: 'Pandangan setiap orang berbeda.' },
    { id: 'v-c-018', chinese: '態度', pinyin: 'tài dù', indonesian: 'Sikap', category: '抽象', example: '態度決定一切。', exampleId: 'Sikap menentukan segalanya.' },
    { id: 'v-c-019', chinese: '道理', pinyin: 'dào lǐ', indonesian: 'Kebenaran / Logika', category: '抽象', example: '你說的很有道理。', exampleId: 'Yang kamu katakan sangat masuk akal.' },
    { id: 'v-c-020', chinese: '立場', pinyin: 'lì chǎng', indonesian: 'Posisi / Pendirian', category: '抽象', example: '我能理解你的立場。', exampleId: 'Saya bisa memahami pendirianmu.' },
    { id: 'v-c-021', chinese: '現象', pinyin: 'xiàn xiàng', indonesian: 'Fenomena', category: '抽象', example: '這是一種社會現象。', exampleId: 'Ini adalah sebuah fenomena sosial.' },
    { id: 'v-c-022', chinese: '程度', pinyin: 'chéng dù', indonesian: 'Tingkat / Derajat', category: '抽象', example: '你的中文程度很好。', exampleId: 'Tingkat bahasa Mandarinmu sangat bagus.' },

    // ===== 學術寫作 =====
    { id: 'v-c-023', chinese: '論文', pinyin: 'lùn wén', indonesian: 'Tesis / Makalah', category: '學術寫作', example: '我在寫畢業論文。', exampleId: 'Saya sedang menulis tesis kelulusan.' },
    { id: 'v-c-024', chinese: '摘要', pinyin: 'zhāi yào', indonesian: 'Abstrak / Ringkasan', category: '學術寫作', example: '請先看這篇文章的摘要。', exampleId: 'Tolong baca abstrak artikel ini dulu.' },
    { id: 'v-c-025', chinese: '結論', pinyin: 'jié lùn', indonesian: 'Kesimpulan', category: '學術寫作', example: '你的結論是什麼？', exampleId: 'Apa kesimpulanmu?' },
    { id: 'v-c-026', chinese: '分析', pinyin: 'fēn xī', indonesian: 'Analisis', category: '學術寫作', example: '我們需要分析這個問題。', exampleId: 'Kita perlu menganalisis masalah ini.' },
    { id: 'v-c-027', chinese: '證據', pinyin: 'zhèng jù', indonesian: 'Bukti', category: '學術寫作', example: '你有什麼證據？', exampleId: 'Apa buktimu?' },
    { id: 'v-c-028', chinese: '假設', pinyin: 'jiǎ shè', indonesian: 'Hipotesis / Asumsi', category: '學術寫作', example: '這個假設需要驗證。', exampleId: 'Hipotesis ini perlu diverifikasi.' },
    { id: 'v-c-029', chinese: '引用', pinyin: 'yǐn yòng', indonesian: 'Mengutip', category: '學術寫作', example: '寫論文要引用參考資料。', exampleId: 'Menulis makalah harus mengutip referensi.' },

    // ===== 媒體傳播 =====
    { id: 'v-c-030', chinese: '媒體', pinyin: 'méi tǐ', indonesian: 'Media', category: '媒體', example: '媒體報導了這個消息。', exampleId: 'Media memberitakan berita ini.' },
    { id: 'v-c-031', chinese: '輿論', pinyin: 'yú lùn', indonesian: 'Opini publik', category: '媒體', example: '輿論對他很不利。', exampleId: 'Opini publik sangat tidak menguntungkan baginya.' },
    { id: 'v-c-032', chinese: '報導', pinyin: 'bào dǎo', indonesian: 'Laporan berita', category: '媒體', example: '新聞報導說明天會下雨。', exampleId: 'Berita melaporkan besok akan hujan.' },
    { id: 'v-c-033', chinese: '廣告', pinyin: 'guǎng gào', indonesian: 'Iklan', category: '媒體', example: '這個廣告很有創意。', exampleId: 'Iklan ini sangat kreatif.' },
    { id: 'v-c-034', chinese: '社群', pinyin: 'shè qún', indonesian: 'Komunitas / Media sosial', category: '媒體', example: '社群媒體改變了我們的生活。', exampleId: 'Media sosial telah mengubah kehidupan kita.' },

    // ===== 法律 =====
    { id: 'v-c-035', chinese: '法律', pinyin: 'fǎ lǜ', indonesian: 'Hukum', category: '法律', example: '每個人都要遵守法律。', exampleId: 'Setiap orang harus mematuhi hukum.' },
    { id: 'v-c-036', chinese: '權利', pinyin: 'quán lì', indonesian: 'Hak', category: '法律', example: '每個人都有受教育的權利。', exampleId: 'Setiap orang berhak mendapat pendidikan.' },
    { id: 'v-c-037', chinese: '義務', pinyin: 'yì wù', indonesian: 'Kewajiban', category: '法律', example: '納稅是公民的義務。', exampleId: 'Membayar pajak adalah kewajiban warga negara.' },
    { id: 'v-c-038', chinese: '合約', pinyin: 'hé yuē', indonesian: 'Kontrak', category: '法律', example: '請你簽這份合約。', exampleId: 'Tolong tandatangani kontrak ini.' },
    { id: 'v-c-039', chinese: '規定', pinyin: 'guī dìng', indonesian: 'Peraturan', category: '法律', example: '學校有很多規定。', exampleId: 'Sekolah punya banyak peraturan.' },

    // ===== 心理情緒 =====
    { id: 'v-c-040', chinese: '焦慮', pinyin: 'jiāo lǜ', indonesian: 'Cemas', category: '心理', example: '考試前我很焦慮。', exampleId: 'Saya sangat cemas sebelum ujian.' },
    { id: 'v-c-041', chinese: '沮喪', pinyin: 'jǔ sàng', indonesian: 'Depresi / Murung', category: '心理', example: '失敗後他很沮喪。', exampleId: 'Setelah gagal dia sangat murung.' },
    { id: 'v-c-042', chinese: '滿足', pinyin: 'mǎn zú', indonesian: 'Puas', category: '心理', example: '我對現在的生活很滿足。', exampleId: 'Saya sangat puas dengan kehidupan sekarang.' },
    { id: 'v-c-043', chinese: '自信', pinyin: 'zì xìn', indonesian: 'Percaya diri', category: '心理', example: '她是一個很有自信的人。', exampleId: 'Dia adalah orang yang sangat percaya diri.' },
    { id: 'v-c-044', chinese: '勇氣', pinyin: 'yǒng qì', indonesian: 'Keberanian', category: '心理', example: '你要有勇氣面對困難。', exampleId: 'Kamu harus punya keberanian menghadapi kesulitan.' },
    { id: 'v-c-045', chinese: '耐心', pinyin: 'nài xīn', indonesian: 'Kesabaran', category: '心理', example: '學語言需要耐心。', exampleId: 'Belajar bahasa butuh kesabaran.' },

    // ===== 自然科學 =====
    { id: 'v-c-046', chinese: '實驗', pinyin: 'shí yàn', indonesian: 'Eksperimen', category: '科學', example: '我們做了一個實驗。', exampleId: 'Kami melakukan sebuah eksperimen.' },
    { id: 'v-c-047', chinese: '理論', pinyin: 'lǐ lùn', indonesian: 'Teori', category: '科學', example: '這個理論還需要證明。', exampleId: 'Teori ini masih perlu dibuktikan.' },
    { id: 'v-c-048', chinese: '數據', pinyin: 'shù jù', indonesian: 'Data', category: '科學', example: '我們需要更多的數據。', exampleId: 'Kita membutuhkan lebih banyak data.' },
    { id: 'v-c-049', chinese: '技術', pinyin: 'jì shù', indonesian: 'Teknologi / Teknik', category: '科學', example: '新技術發展很快。', exampleId: 'Teknologi baru berkembang sangat cepat.' },
    { id: 'v-c-050', chinese: '方法', pinyin: 'fāng fǎ', indonesian: 'Metode / Cara', category: '科學', example: '這個方法很有效。', exampleId: 'Metode ini sangat efektif.' },

    // ===== 社會議題 =====
    { id: 'v-c-051', chinese: '平等', pinyin: 'píng děng', indonesian: 'Kesetaraan', category: '社會', example: '男女應該平等。', exampleId: 'Pria dan wanita harus setara.' },
    { id: 'v-c-052', chinese: '歧視', pinyin: 'qí shì', indonesian: 'Diskriminasi', category: '社會', example: '我們不應該歧視別人。', exampleId: 'Kita tidak boleh mendiskriminasi orang lain.' },
    { id: 'v-c-053', chinese: '志工', pinyin: 'zhì gōng', indonesian: 'Relawan', category: '社會', example: '他是一名志工。', exampleId: 'Dia adalah seorang relawan.' },
    { id: 'v-c-054', chinese: '公益', pinyin: 'gōng yì', indonesian: 'Kepentingan publik', category: '社會', example: '這是一個公益活動。', exampleId: 'Ini adalah kegiatan sosial.' },
    { id: 'v-c-055', chinese: '人口', pinyin: 'rén kǒu', indonesian: 'Populasi', category: '社會', example: '臺灣的人口大約兩千三百萬。', exampleId: 'Populasi Taiwan sekitar 23 juta.' },

    // ===== 臺灣文化 =====
    { id: 'v-c-056', chinese: '夜市', pinyin: 'yè shì', indonesian: 'Pasar malam', category: '臺灣', example: '臺灣的夜市很有名。', exampleId: 'Pasar malam Taiwan sangat terkenal.' },
    { id: 'v-c-057', chinese: '珍珠奶茶', pinyin: 'zhēn zhū nǎi chá', indonesian: 'Bubble tea', category: '臺灣', example: '珍珠奶茶是臺灣最有名的飲料。', exampleId: 'Bubble tea adalah minuman paling terkenal di Taiwan.' },
    { id: 'v-c-058', chinese: '捷運', pinyin: 'jié yùn', indonesian: 'MRT', category: '臺灣', example: '臺北的捷運很方便。', exampleId: 'MRT Taipei sangat nyaman.' },
    { id: 'v-c-059', chinese: '悠遊卡', pinyin: 'yōu yóu kǎ', indonesian: 'Kartu EasyCard', category: '臺灣', example: '搭捷運可以用悠遊卡。', exampleId: 'Naik MRT bisa pakai kartu EasyCard.' },
    { id: 'v-c-060', chinese: '小籠包', pinyin: 'xiǎo lóng bāo', indonesian: 'Xiao long bao (dimsum kukus)', category: '臺灣', example: '鼎泰豐的小籠包很有名。', exampleId: 'Xiao long bao Din Tai Fung sangat terkenal.' },
    { id: 'v-c-061', chinese: '廟', pinyin: 'miào', indonesian: 'Kuil', category: '臺灣', example: '臺灣有很多廟。', exampleId: 'Taiwan punya banyak kuil.' },
    { id: 'v-c-062', chinese: '臺語', pinyin: 'tái yǔ', indonesian: 'Bahasa Hokkien Taiwan', category: '臺灣', example: '有些老人只會說臺語。', exampleId: 'Beberapa orang tua hanya bisa berbicara bahasa Hokkien.' },

    // ===== 進階動詞 =====
    { id: 'v-c-063', chinese: '克服', pinyin: 'kè fú', indonesian: 'Mengatasi', category: '進階動詞', example: '你要克服這個困難。', exampleId: 'Kamu harus mengatasi kesulitan ini.' },
    { id: 'v-c-064', chinese: '適應', pinyin: 'shì yìng', indonesian: 'Beradaptasi', category: '進階動詞', example: '我已經適應了臺灣的生活。', exampleId: 'Saya sudah beradaptasi dengan kehidupan di Taiwan.' },
    { id: 'v-c-065', chinese: '溝通', pinyin: 'gōu tōng', indonesian: 'Berkomunikasi', category: '進階動詞', example: '溝通是很重要的。', exampleId: 'Komunikasi sangat penting.' },
    { id: 'v-c-066', chinese: '挑戰', pinyin: 'tiǎo zhàn', indonesian: 'Tantangan', category: '進階動詞', example: '學中文是一個挑戰。', exampleId: 'Belajar bahasa Mandarin adalah sebuah tantangan.' },
    { id: 'v-c-067', chinese: '堅持', pinyin: 'jiān chí', indonesian: 'Bertahan / Konsisten', category: '進階動詞', example: '只要堅持就會成功。', exampleId: 'Asal bertahan pasti akan berhasil.' },
    { id: 'v-c-068', chinese: '犧牲', pinyin: 'xī shēng', indonesian: 'Berkorban', category: '進階動詞', example: '父母為孩子犧牲了很多。', exampleId: 'Orang tua berkorban banyak untuk anak-anak.' },
    { id: 'v-c-069', chinese: '反省', pinyin: 'fǎn xǐng', indonesian: 'Introspeksi', category: '進階動詞', example: '我們應該時常反省自己。', exampleId: 'Kita harus sering introspeksi diri.' },
    { id: 'v-c-070', chinese: '貢獻', pinyin: 'gòng xiàn', indonesian: 'Kontribusi', category: '進階動詞', example: '他對社會有很大的貢獻。', exampleId: 'Dia memiliki kontribusi besar terhadap masyarakat.' },
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
