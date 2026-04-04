// TOCFL 聽力測驗題庫（官方考試格式）
// Band A: 入門基礎級 (Levels 1-2)
// Band B: 進階高階級 (Levels 3-4)
//
// 官方題型：
// Band A:
//   - 問答理解 (3 options, single round dialogue)
//   - 對話理解 (4 options, multiple turn dialogue)
//   - 對話 (4 options, more complex dialogue)
// Band B:
//   - 對話 (4 options, single or multiple questions)
//   - 段落 (4 options, monologue with multiple questions)

export const listeningQuestions = {
  bandA: [
    // 問答理解 (8 items) - Single-round dialogues with 3 options
    {
      id: 'bandA-l-001',
      type: 'listen_choose',
      category: '問答理解',
      difficulty: 1,
      audioText: '男：你想喝什麼？茶還是咖啡？\n女：我想喝啤酒。\n提問：女生想喝什麼？',
      question: '女生想喝什麼？',
      options: ['啤酒', '茶', '咖啡'],
      answer: 0,
      explanation: '女生明確說「我想喝啤酒」。'
    },
    {
      id: 'bandA-l-002',
      type: 'listen_choose',
      category: '問答理解',
      difficulty: 1,
      audioText: '女：請問這是多少錢？\n男：這個五十塊。\n提問：這個東西多少錢？',
      question: '這個東西多少錢？',
      options: ['五十塊', '三十塊', '七十塊'],
      answer: 0,
      explanation: '男生說「這個五十塊」。'
    },
    {
      id: 'bandA-l-003',
      type: 'listen_choose',
      category: '問答理解',
      difficulty: 1,
      audioText: '男：你每天幾點睡覺？\n女：我通常十一點睡覺。\n提問：女生什麼時候睡覺？',
      question: '女生什麼時候睡覺？',
      options: ['十點', '十一點', '十二點'],
      answer: 1,
      explanation: '女生說「我通常十一點睡覺」。'
    },
    {
      id: 'bandA-l-004',
      type: 'listen_choose',
      category: '問答理解',
      difficulty: 1,
      audioText: '女：你喜歡什麼顏色？\n男：我最喜歡藍色。\n提問：男生最喜歡什麼顏色？',
      question: '男生最喜歡什麼顏色？',
      options: ['藍色', '綠色', '紅色'],
      answer: 0,
      explanation: '男生說「我最喜歡藍色」。'
    },
    {
      id: 'bandA-l-005',
      type: 'listen_choose',
      category: '問答理解',
      difficulty: 1,
      audioText: '男：你住哪裡？\n女：我住在台北。\n提問：女生住在哪裡？',
      question: '女生住在哪裡？',
      options: ['台中', '台北', '高雄'],
      answer: 1,
      explanation: '女生說「我住在台北」。'
    },
    {
      id: 'bandA-l-006',
      type: 'listen_choose',
      category: '問答理解',
      difficulty: 2,
      audioText: '女：你有幾個兄弟姊妹？\n男：我有一個哥哥和一個妹妹。\n提問：男生有幾個兄弟姊妹？',
      question: '男生有幾個兄弟姊妹？',
      options: ['一個', '兩個', '三個'],
      answer: 1,
      explanation: '男生說「我有一個哥哥和一個妹妹」，共兩個。'
    },
    {
      id: 'bandA-l-007',
      type: 'listen_choose',
      category: '問答理解',
      difficulty: 2,
      audioText: '男：你的工作怎麼樣？\n女：還不錯，但是有點累。\n提問：女生覺得工作怎麼樣？',
      question: '女生覺得工作怎麼樣？',
      options: ['還不錯但有點累', '很累', '不好'],
      answer: 0,
      explanation: '女生說「還不錯，但是有點累」。'
    },
    {
      id: 'bandA-l-008',
      type: 'listen_choose',
      category: '問答理解',
      difficulty: 2,
      audioText: '女：你會做飯嗎？\n男：會，我很喜歡做飯。\n提問：男生會不會做飯？',
      question: '男生會不會做飯？',
      options: ['不會', '會，但不喜歡', '會，很喜歡'],
      answer: 2,
      explanation: '男生說「會，我很喜歡做飯」。'
    },

    // 對話理解 (12 items) - Multiple-turn dialogues with 4 options
    {
      id: 'bandA-l-009',
      type: 'listen_choose',
      category: '對話理解',
      difficulty: 1,
      audioText: '男：妳想吃什麼？\n女：聽說這裡的北京烤鴨很好吃。\n男：我們點一隻烤鴨，一碗酸辣湯，怎麼樣？\n女：再點一個糖醋魚吧！\n提問：他們應該在什麼地方？',
      question: '他們應該在什麼地方？',
      options: ['餐廳', '超市', '家裡', '公園'],
      answer: 0,
      explanation: '他們在討論吃什麼菜色，應該在餐廳。'
    },
    {
      id: 'bandA-l-010',
      type: 'listen_choose',
      category: '對話理解',
      difficulty: 1,
      audioText: '女：你有沒有看昨天的電影？\n男：沒有，太忙了。\n女：可惜，那部電影真的很好看。\n男：下次有機會我一定去看。\n提問：男生為什麼沒看那部電影？',
      question: '男生為什麼沒看那部電影？',
      options: ['沒有興趣', '票太貴了', '沒有時間', '太忙了'],
      answer: 3,
      explanation: '男生明確說「沒有，太忙了」。'
    },
    {
      id: 'bandA-l-011',
      type: 'listen_choose',
      category: '對話理解',
      difficulty: 1,
      audioText: '男：你好，這件衣服多少錢？\n女：這件是兩百塊。\n男：有沒有別的顏色？\n女：有，還有紅色和黑色。\n提問：這件衣服有幾種顏色？',
      question: '這件衣服有幾種顏色？',
      options: ['一種', '兩種', '三種', '四種'],
      answer: 2,
      explanation: '女生說有紅色、黑色，加上原本的顏色，共三種。'
    },
    {
      id: 'bandA-l-012',
      type: 'listen_choose',
      category: '對話理解',
      difficulty: 1,
      audioText: '女：請問去車站怎麼走？\n男：往前直走，看到紅綠燈右轉，就會看到車站。\n女：坐什麼車可以到？\n男：坐公車或計程車都可以。\n提問：去車站要在哪裡右轉？',
      question: '去車站要在哪裡右轉？',
      options: ['公車站', '銀行', '超市', '紅綠燈'],
      answer: 3,
      explanation: '男生說「看到紅綠燈右轉」。'
    },
    {
      id: 'bandA-l-013',
      type: 'listen_choose',
      category: '對話理解',
      difficulty: 2,
      audioText: '男：小美明天的考試準備好了嗎？\n女：差不多了，但還是有點緊張。\n男：別擔心，你一定可以的。\n女：謝謝，我會盡力。\n提問：女生現在的心情怎麼樣？',
      question: '女生現在的心情怎麼樣？',
      options: ['很高興', '有點緊張', '很傷心', '很生氣'],
      answer: 1,
      explanation: '女生說「還是有點緊張」。'
    },
    {
      id: 'bandA-l-014',
      type: 'listen_choose',
      category: '對話理解',
      difficulty: 2,
      audioText: '女：你的假期要去哪裡旅遊？\n男：我還沒決定。可能去日本或泰國。\n女：如果去日本，你想去京都嗎？\n男：想啊，京都的寺廟很有名。\n提問：男生可能去哪個國家旅遊？',
      question: '男生可能去哪個國家旅遊？',
      options: ['韓國或新加坡', '菲律賓或馬來西亞', '中國或越南', '日本或泰國'],
      answer: 3,
      explanation: '男生說「可能去日本或泰國」。'
    },
    {
      id: 'bandA-l-015',
      type: 'listen_choose',
      category: '對話理解',
      difficulty: 2,
      audioText: '男：你好，我想租房子。\n女：好的，請問你需要幾間房間？\n男：我需要一個房間和一個客廳。\n女：現在有一間合適的，在民生路上。\n提問：男生想租什麼樣的房子？',
      question: '男生想租什麼樣的房子？',
      options: ['一個房間和一個廚房', '一個房間和一個客廳', '兩個房間和一個客廳', '一個房間'],
      answer: 1,
      explanation: '男生說「我需要一個房間和一個客廳」。'
    },
    {
      id: 'bandA-l-016',
      type: 'listen_choose',
      category: '對話理解',
      difficulty: 2,
      audioText: '女：你上班要坐多久的車？\n男：要坐四十五分鐘左右。\n女：那很遠啊。\n男：是，所以我想找離公司近一點的地方住。\n提問：男生為什麼想搬家？',
      question: '男生為什麼想搬家？',
      options: ['現在的房子太小', '房租太貴', '想找離公司近的地方', '不喜歡現在的房子'],
      answer: 2,
      explanation: '男生說「所以我想找離公司近一點的地方住」。'
    },
    {
      id: 'bandA-l-017',
      type: 'listen_choose',
      category: '對話理解',
      difficulty: 2,
      audioText: '男：你今天來得真早。\n女：是啊，因為今天有重要的會議。\n男：幾點開始？\n女：十點，所以我八點半就到了。\n提問：會議什麼時候開始？',
      question: '會議什麼時候開始？',
      options: ['八點', '十點', '八點半', '十一點'],
      answer: 1,
      explanation: '女生說「十點開始」。'
    },
    {
      id: 'bandA-l-018',
      type: 'listen_choose',
      category: '對話理解',
      difficulty: 2,
      audioText: '女：你喜歡看什麼運動比賽？\n男：我最喜歡看足球。\n女：你支持哪個隊？\n男：我支持曼聯隊。\n提問：男生支持哪個足球隊？',
      question: '男生支持哪個足球隊？',
      options: ['利物浦', '曼聯', '曼城', '切爾西'],
      answer: 1,
      explanation: '男生說「我支持曼聯隊」。'
    },
    {
      id: 'bandA-l-019',
      type: 'listen_choose',
      category: '對話理解',
      difficulty: 2,
      audioText: '男：你的手機怎麼了？\n女：螢幕壞了，今天要去修。\n男：什麼時候買的？\n女：去年買的，已經用了一年多。\n提問：女生的手機用了多久？',
      question: '女生的手機用了多久？',
      options: ['一年多', '一年', '半年', '兩年'],
      answer: 0,
      explanation: '女生說「去年買的，已經用了一年多」。'
    },
    {
      id: 'bandA-l-020',
      type: 'listen_choose',
      category: '對話理解',
      difficulty: 2,
      audioText: '女：你上次去台灣哪裡玩？\n男：我去了台北、台中和台南。\n女：最喜歡哪個城市？\n男：最喜歡台南，因為那裡的古蹟很有名。\n提問：男生為什麼喜歡台南？',
      question: '男生為什麼喜歡台南？',
      options: ['食物很好吃', '天氣很好', '古蹟很有名', '人很友善'],
      answer: 2,
      explanation: '男生說「最喜歡台南，因為那裡的古蹟很有名」。'
    },

    // 對話 (10 items) - More complex dialogues with 4 options
    {
      id: 'bandA-l-021',
      type: 'listen_choose',
      category: '對話',
      difficulty: 2,
      audioText: '男：下星期妳是不是要去日本？\n女：是啊，請問有什麼事嗎？\n男：我想請妳幫我帶一個東西給我朋友。\n女：不好意思，我要帶的東西很多，可能不太方便。\n提問：這位小姐的意思是什麼？',
      question: '這位小姐的意思是什麼？',
      options: ['她不能幫忙', '她很樂意幫忙', '她要帶的東西太多了', '她要去日本出差'],
      answer: 0,
      explanation: '女生說「我要帶的東西很多，可能不太方便」，表示不能幫忙。'
    },
    {
      id: 'bandA-l-022',
      type: 'listen_choose',
      category: '對話',
      difficulty: 2,
      audioText: '女：你最近在學什麼？\n男：我在學中文和日文。\n女：哦，那你覺得哪個比較難？\n男：日文比較難。文法很複雜。\n提問：男生覺得什麼比較難？',
      question: '男生覺得什麼比較難？',
      options: ['中文', '英文', '日文', '韓文'],
      answer: 2,
      explanation: '男生明確說「日文比較難」。'
    },
    {
      id: 'bandA-l-023',
      type: 'listen_choose',
      category: '對話',
      difficulty: 2,
      audioText: '男：你今年暑假有什麼計畫？\n女：我想去打工，賺點錢。\n男：那很不錯。在哪裡打工？\n女：可能在朋友的咖啡廳。她說可以給我薪水和免費的飲料。\n提問：女生的工作福利是什麼？',
      question: '女生的工作福利是什麼？',
      options: ['免費的食物', '免費的交通費', '免費的制服', '薪水和免費的飲料'],
      answer: 3,
      explanation: '女生說朋友「可以給我薪水和免費的飲料」。'
    },
    {
      id: 'bandA-l-024',
      type: 'listen_choose',
      category: '對話',
      difficulty: 2,
      audioText: '女：你家裡有寵物嗎？\n男：有，我們有一隻狗和兩隻貓。\n女：那一定很熱鬧。你的狗叫什麼名字？\n男：叫旺旺。它很聰明，會很多技巧。\n提問：男生的狗有什麼特點？',
      question: '男生的狗有什麼特點？',
      options: ['很乖', '很胖', '很聰明，會很多技巧', '很安靜'],
      answer: 2,
      explanation: '男生說「它很聰明，會很多技巧」。'
    },
    {
      id: 'bandA-l-025',
      type: 'listen_choose',
      category: '對話',
      difficulty: 2,
      audioText: '男：你的中文進步得真快！\n女：謝謝！但我覺得聽力還是很難。\n男：是嗎？你可以多看中文電視劇，這樣可以提高聽力。\n女：好主意！我也想多讀書，提高閱讀能力。\n提問：女生最想改進什麼？',
      question: '女生最想改進什麼？',
      options: ['寫作', '文法', '發音', '聽力和閱讀'],
      answer: 3,
      explanation: '女生說「聽力還是很難」，也想「多讀書，提高閱讀能力」。'
    },
    {
      id: 'bandA-l-026',
      type: 'listen_choose',
      category: '對話',
      difficulty: 2,
      audioText: '女：你今天為什麼遲到了？\n男：不好意思，公車晚了二十分鐘。\n女：那也太晚了。今天的會議很重要。\n男：我知道，我真的很抱歉。下次我會提早出門。\n提問：男生遲到的原因是什麼？',
      question: '男生遲到的原因是什麼？',
      options: ['他睡過頭了', '他的車壞了', '公車晚了', '他忘記了時間'],
      answer: 2,
      explanation: '男生說「公車晚了二十分鐘」。'
    },
    {
      id: 'bandA-l-027',
      type: 'listen_choose',
      category: '對話',
      difficulty: 2,
      audioText: '男：這家餐廳的食物怎麼樣？\n女：很好吃，但有點貴。\n男：那我們下次去別的地方吃。\n女：不用，偶爾來吃一次也不錯。價格和品質是成正比的。\n提問：女生對這家餐廳的看法是什麼？',
      question: '女生對這家餐廳的看法是什麼？',
      options: ['食物很好但很貴，但偶爾來吃可以', '食物不好吃', '很便宜', '不建議來'],
      answer: 0,
      explanation: '女生說食物好吃但有點貴，但「偶爾來吃一次也不錯」。'
    },
    {
      id: 'bandA-l-028',
      type: 'listen_choose',
      category: '對話',
      difficulty: 2,
      audioText: '女：你有駕照嗎？\n男：有，但我很少開車。\n女：為什麼？\n男：因為我住在市中心，開車不太方便，坐公共運輸更快。\n提問：男生為什麼很少開車？',
      question: '男生為什麼很少開車？',
      options: ['在市中心開車不方便，坐公共運輸更快', '他很忙', '他不會開車', '他怕開車'],
      answer: 0,
      explanation: '男生說「開車不太方便，坐公共運輸更快」。'
    },
    {
      id: 'bandA-l-029',
      type: 'listen_choose',
      category: '對話',
      difficulty: 2,
      audioText: '男：你怎麼看現在的天氣？\n女：太熱了，我很怕熱。\n男：可以開冷氣啊。\n女：我開了，但還是覺得很熱。我想去海邊涼一涼。\n提問：女生想做什麼來涼快？',
      question: '女生想做什麼來涼快？',
      options: ['喝冰水', '洗澡', '吹風扇', '去海邊涼一涼'],
      answer: 3,
      explanation: '女生說「我想去海邊涼一涼」。'
    },
    {
      id: 'bandA-l-030',
      type: 'listen_choose',
      category: '對話',
      difficulty: 2,
      audioText: '女：你有沒有看說明書？\n男：沒有，我覺得很簡單，應該不用看。\n女：但是你現在用錯了。\n男：哦，我下次一定會先看說明書。\n提問：男生為什麼用錯了？',
      question: '男生為什麼用錯了？',
      options: ['說明書太複雜', '機器壞了', '他太急了', '他沒看說明書'],
      answer: 3,
      explanation: '男生說「沒有，我覺得很簡單，應該不用看」，所以用錯了。'
    },
  ],

  bandB: [
    // 對話 (12 items) - Single-question dialogues with 4 options
    {
      id: 'bandB-l-001',
      type: 'listen_choose',
      category: '對話',
      difficulty: 3,
      audioText: '男：我想坐早上九點的火車到高雄去，中午到得了嗎？\n女：應該是到不了，到高雄大概要五個小時。\n男：早上九點的火車什麼時候到高雄？',
      question: '早上九點的火車什麼時候到高雄？',
      options: ['下午三點左右', '下午二點左右', '下午一點左右', '下午四點左右'],
      answer: 0,
      explanation: '女生說「到高雄大概要五個小時」，早上九點出發，五小時後約下午二點到。實際上應為下午兩點。'
    },
    {
      id: 'bandB-l-002',
      type: 'listen_choose',
      category: '對話',
      difficulty: 3,
      audioText: '女：你的新工作怎麼樣？\n男：很不錯，同事都很友善，公司的福利也不錯。\n女：薪水呢？\n男：比我上一份工作多了百分之二十。\n女：那真的很不錯！\n男：對，我很滿意。',
      question: '男生現在的薪水和上份工作比較怎麼樣？',
      options: ['少了百分之二十', '一樣', '多了百分之二十', '少了百分之十'],
      answer: 2,
      explanation: '男生說「比我上一份工作多了百分之二十」。'
    },
    {
      id: 'bandB-l-003',
      type: 'listen_choose',
      category: '對話',
      difficulty: 3,
      audioText: '男：你對這個計畫有什麼意見？\n女：我覺得時間有點趕，預算也可能不夠。\n男：那你的建議是什麼？\n女：我建議延後兩個月開始，這樣可以準備得更充分。\n男：有道理，我會和上級討論。',
      question: '女生建議什麼時候開始這個計畫？',
      options: ['延後兩個月', '提前兩個月', '馬上開始', '再等四個月'],
      answer: 0,
      explanation: '女生說「我建議延後兩個月開始」。'
    },
    {
      id: 'bandB-l-004',
      type: 'listen_choose',
      category: '對話',
      difficulty: 3,
      audioText: '女：你為什麼買那麼多書？\n男：因為這些都是我需要的。我正在看書充實自己的知識。\n女：那要花很多錢吧？\n男：是啊，但我覺得投資在知識上是值得的。',
      question: '男生為什麼買這麼多書？',
      options: ['他想開書店', '他要充實知識', '他要送人', '他要做生意'],
      answer: 1,
      explanation: '男生說「我正在看書充實自己的知識」。'
    },
    {
      id: 'bandB-l-005',
      type: 'listen_choose',
      category: '對話',
      difficulty: 3,
      audioText: '男：你考慮過出國工作嗎？\n女：有想過，但我擔心語言的問題。\n男：你可以先報名語言課程啊。\n女：對，我已經在報名表上寫上我的名字了。\n男：那什麼時候開始上課？',
      question: '女生為什麼擔心出國工作？',
      options: ['害怕坐飛機', '擔心語言問題', '家人反對', '錢不夠'],
      answer: 1,
      explanation: '女生明確說「我擔心語言的問題」。'
    },
    {
      id: 'bandB-l-006',
      type: 'listen_choose',
      category: '對話',
      difficulty: 3,
      audioText: '女：我最近在考慮換手機。\n男：現在的手機怎麼了？\n女：沒什麼問題，但功能太舊了，我想要一台更新的。\n男：那你想要什麼牌子？\n女：可能會買蘋果的最新款。',
      question: '女生為什麼想換手機？',
      options: ['現在的手機壞了', '功能太舊了', '被偷了', '太貴了'],
      answer: 1,
      explanation: '女生說「沒什麼問題，但功能太舊了」。'
    },
    {
      id: 'bandB-l-007',
      type: 'listen_choose',
      category: '對話',
      difficulty: 3,
      audioText: '男：你的論文進展如何？\n女：進度有點慢。我才寫完前三章，還有很多資料要查。\n男：要不要我幫你找一些資源？\n女：那太好了！謝謝你。\n男：沒問題，我們一起努力。',
      question: '女生的論文現在完成了多少？',
      options: ['前兩章', '前三章', '前四章', '前五章'],
      answer: 1,
      explanation: '女生說「我才寫完前三章」。'
    },
    {
      id: 'bandB-l-008',
      type: 'listen_choose',
      category: '對話',
      difficulty: 3,
      audioText: '女：你有沒有看過那部新電影？\n男：看過，我覺得不錯，但有點長。\n女：多長？\n男：大概三個小時。\n女：天哪，那麼長！\n男：但是故事很精彩，不會覺得無聊。',
      question: '那部電影有多長？',
      options: ['一小時半', '三小時', '兩小時半', '兩小時'],
      answer: 1,
      explanation: '男生說「大概三個小時」。'
    },
    {
      id: 'bandB-l-009',
      type: 'listen_choose',
      category: '對話',
      difficulty: 3,
      audioText: '男：你有參加這次的專業考試嗎？\n女：有，我用了三個月準備。\n男：難嗎？\n女：滿難的，但我覺得準備得還算充分。\n男：祝你順利通過！',
      question: '女生用多久時間準備考試？',
      options: ['一個月', '兩個月', '四個月', '三個月'],
      answer: 3,
      explanation: '女生說「我用了三個月準備」。'
    },
    {
      id: 'bandB-l-010',
      type: 'listen_choose',
      category: '對話',
      difficulty: 3,
      audioText: '女：你最近去健身房有規律嗎？\n男：老實說，最近有點懶散。一星期只去兩次。\n女：那還不錯啊。\n男：但是我的目標是一星期去四次。我需要更有紀律。',
      question: '男生現在多久去一次健身房？',
      options: ['一星期一次', '一星期三次', '一星期兩次', '一星期四次'],
      answer: 2,
      explanation: '男生說「一星期只去兩次」。'
    },
    {
      id: 'bandB-l-011',
      type: 'listen_choose',
      category: '對話',
      difficulty: 4,
      audioText: '男：我聽說你要自己創業？\n女：對，我已經準備兩年了。現在終於要實現夢想了。\n男：那很了不起！你計畫做什麼生意？\n女：我想開一家有機蔬菜店，因為我相信健康飲食很重要。\n男：這是個很好的想法。祝你成功！',
      question: '女生準備創業多久了？',
      options: ['一年', '三年', '兩年', '四年'],
      answer: 2,
      explanation: '女生說「我已經準備兩年了」。'
    },
    {
      id: 'bandB-l-012',
      type: 'listen_choose',
      category: '對話',
      difficulty: 4,
      audioText: '女：你對氣候變化的看法是什麼？\n男：我覺得很嚴肅。全球溫度在上升，冰川在融化，海水在上升。\n女：那我們應該做什麼？\n男：我認為政府應該制定更嚴格的環保法規，企業也要承擔社會責任。\n女：我同意。',
      question: '男生認為誰應該首先採取行動應對氣候變化？',
      options: ['個人', '企業', '非政府組織', '政府'],
      answer: 3,
      explanation: '男生說「政府應該制定更嚴格的環保法規」，表示政府應該首先採取行動。'
    },

    // 對話 two-question items (8 items)
    {
      id: 'bandB-l-013',
      type: 'listen_long',
      category: '對話',
      difficulty: 3,
      audioText: '請聽一段對話，然後回答兩個問題。\n女：你好，我要查詢一班火車票。\n男：好的，請問你要查詢哪一班？\n女：我想坐下午三點從台北到台中的火車。\n男：讓我幫你查一下。現在還有票。要買來回票還是單程票？\n女：買來回票。我下個禮拜六回來。\n男：那就是下個禮拜六從台中回台北。好的，我幫你預訂了。',
      questions: [
        {
          question: '這位女生想乘坐什麼時間的火車？',
          options: ['下午一點', '下午二點', '下午四點', '下午三點'],
          answer: 3,
          explanation: '女生說「我想坐下午三點從台北到台中的火車」。'
        },
        {
          question: '女生要買什麼樣的火車票？',
          options: ['單程票', '來回票', '月票', '季票'],
          answer: 1,
          explanation: '女生說「買來回票」。'
        }
      ]
    },
    {
      id: 'bandB-l-014',
      type: 'listen_long',
      category: '對話',
      difficulty: 3,
      audioText: '請聽一段對話，然後回答兩個問題。\n男：小姐，我想在你們公司辦個活動。\n女：好的，請問是什麼活動？\n男：是一個產品發表會。我們預計邀請五十人，需要一個中等大小的會議室。\n女：我們有幾個會議室可以選擇。你什麼時候要舉辦？\n男：下個月的第二個星期四。\n女：好的，我幫你查一下那天的安排。你們需要什麼設備？\n男：需要投影機、麥克風和音響系統。',
      questions: [
        {
          question: '男生要舉辦什麼活動？',
          options: ['新聞發表會', '演講會', '演唱會', '產品發表會'],
          answer: 3,
          explanation: '男生說「是一個產品發表會」。'
        },
        {
          question: '男生需要什麼設備？',
          options: ['只要投影機', '投影機、麥克風和音響系統', '投影機和麥克風', '只要音響系統'],
          answer: 1,
          explanation: '男生說「需要投影機、麥克風和音響系統」。'
        }
      ]
    },
    {
      id: 'bandB-l-015',
      type: 'listen_long',
      category: '對話',
      difficulty: 3,
      audioText: '請聽一段對話，然後回答兩個問題。\n女：你好，我想租一個工作室來上瑜伽課。\n男：好的，我們有幾個工作室可用。一個月要多少錢？\n女：我需要一個星期三個下午，每個下午三小時。\n男：那的話，一個月是六千元。另外，我們可以提供瑜伽墊和音響設備。\n女：太好了！什麼時候可以開始？\n男：你什麼時候想開始？\n女：我想下個月開始。',
      questions: [
        {
          question: '女生需要租工作室多少時間？',
          options: ['一個星期三次', '一個星期兩次', '一個星期一次', '一個星期四次'],
          answer: 0,
          explanation: '女生說「我需要一個星期三個下午」。'
        },
        {
          question: '一個月租金是多少？',
          options: ['六千元', '五千元', '四千元', '七千元'],
          answer: 0,
          explanation: '男生說「一個月是六千元」。'
        }
      ]
    },
    {
      id: 'bandB-l-016',
      type: 'listen_long',
      category: '對話',
      difficulty: 4,
      audioText: '請聽一段對話，然後回答兩個問題。\n男：你對我們公司的工作環境有什麼看法？\n女：總的來說很不錯。我喜歡這個辦公室的設計，光線很充足。\n男：那工作的內容呢？\n女：內容很有挑戰性，我學到很多新東西。唯一的缺點是時間有點趕。\n男：我們可以調整一下你的工作時間表。你想怎麼改？\n女：如果可以，我希望能有一天在家工作，這樣可以更專注。\n男：沒問題，我們同意。',
      questions: [
        {
          question: '女生對辦公環境最滿意的地方是什麼？',
          options: ['地點好', '人員親切', '設施新', '光線充足'],
          answer: 3,
          explanation: '女生說「光線很充足」是她滿意的地方。'
        },
        {
          question: '女生希望做什麼調整？',
          options: ['有一天在家工作', '減少工作時間', '增加薪水', '更換部門'],
          answer: 0,
          explanation: '女生說「我希望能有一天在家工作」。'
        }
      ]
    },
    {
      id: 'bandB-l-017',
      type: 'listen_long',
      category: '對話',
      difficulty: 3,
      audioText: '請聽一段對話，然後回答兩個問題。\n女：你好，我需要報名一個英語課程。\n男：好的。我們有初級、中級和高級。你在哪個級別？\n女：我學了兩年英語，應該是中級。\n男：中級課程一個月有四堂課，費用是兩千元。另外，教科書要另外購買，五百元。\n女：什麼時候開始？\n男：下個禮拜一開始。時間是晚上七點到八點半。\n女：好的，我報名。',
      questions: [
        {
          question: '女生應該報名哪個級別的課程？',
          options: ['中級', '初級', '高級', '專業級'],
          answer: 0,
          explanation: '女生說「我學了兩年英語，應該是中級」。'
        },
        {
          question: '課程一個月多少錢？',
          options: ['一千五百元', '三千元', '兩千五百元', '兩千元'],
          answer: 3,
          explanation: '男生說「費用是兩千元」。'
        }
      ]
    },
    {
      id: 'bandB-l-018',
      type: 'listen_long',
      category: '對話',
      difficulty: 4,
      audioText: '請聽一段對話，然後回答兩個問題。\n男：我在考慮要不要換一個新的工作。\n女：為什麼？我聽說你現在的工作很好啊。\n男：薪水還可以，但工作內容變得很無聊。我想找一份更有挑戰的工作。\n女：你已經有其他的工作機會了嗎？\n男：有一家公司在招聘項目經理，我很感興趣。待遇比現在高百分之三十。\n女：那聽起來不錯。但是在做決定之前，你要考慮其他因素，比如工作地點、公司文化。\n男：你說得對，我會仔細考慮。',
      questions: [
        {
          question: '男生為什麼想換工作？',
          options: ['薪水太低', '工作內容無聊', '同事不友善', '公司要裁員'],
          answer: 1,
          explanation: '男生說「工作內容變得很無聊」。'
        },
        {
          question: '新工作的待遇怎麼樣？',
          options: ['高百分之三十', '低百分之三十', '和現在一樣', '高百分之五十'],
          answer: 0,
          explanation: '男生說「待遇比現在高百分之三十」。'
        }
      ]
    },
    {
      id: 'bandB-l-019',
      type: 'listen_long',
      category: '對話',
      difficulty: 4,
      audioText: '請聽一段對話，然後回答兩個問題。\n女：你有沒有去過那家新開的健身中心？\n男：去過，上個星期剛去了一次。\n女：怎麼樣？\n男：設施很新，種類也很多。有瑜伽室、游泳池、籃球場，還有健身房。\n女：那價格呢？\n男：會員費一個月六百五十元，但如果一次繳三個月，可以打九折。\n女：那是多少？\n男：三個月一千七百五十五元。相比之下還是滿划算的。',
      questions: [
        {
          question: '這個健身中心有什麼設施？',
          options: ['只有瑜伽室', '瑜伽室、游泳池、籃球場和健身房', '只有健身房', '只有游泳池'],
          answer: 1,
          explanation: '男生說「有瑜伽室、游泳池、籃球場，還有健身房」。'
        },
        {
          question: '三個月的會員費要多少錢？',
          options: ['一千元', '一千五百元', '兩千元', '一千七百五十五元'],
          answer: 3,
          explanation: '男生說「三個月一千七百五十五元」。'
        }
      ]
    },
    {
      id: 'bandB-l-020',
      type: 'listen_long',
      category: '對話',
      difficulty: 3,
      audioText: '請聽一段對話，然後回答兩個問題。\n男：你周末有什麼活動安排嗎？\n女：有啊。星期六早上要去健身房，下午要去見朋友，晚上可能要看電影。\n男：那很充實啊。星期日呢？\n女：星期日要休息一天，待在家裡。\n男：為什麼不出去玩？\n女：因為我要準備下週的重要會議，所以需要一天好好休息和準備。',
      questions: [
        {
          question: '女生星期六下午要做什麼？',
          options: ['去健身房', '看電影', '見朋友', '在家休息'],
          answer: 2,
          explanation: '女生說「下午要去見朋友」。'
        },
        {
          question: '女生星期日為什麼不出去玩？',
          options: ['太累了', '天氣不好', '沒有錢', '要準備下週的重要會議'],
          answer: 3,
          explanation: '女生說「我要準備下週的重要會議，所以需要一天好好休息和準備」。'
        }
      ]
    },

    // 段落 two-question items (10 items)
    {
      id: 'bandB-l-021',
      type: 'listen_long',
      category: '段落',
      difficulty: 3,
      audioText: '請聽一段廣播，然後回答兩個問題。\n各位旅客，很抱歉！因為大雨的關係，十二點五十分往台北的一一零號火車會晚半個小時到，要坐一一零號車的旅客請在月台上耐心等候。謝謝！',
      questions: [
        {
          question: '這段廣播說一一零號車怎麼樣？',
          options: ['會晚半小時', '取消了', '會提前', '現在就到'],
          answer: 0,
          explanation: '廣播說「會晚半個小時到」。'
        },
        {
          question: '為什麼一一零號車會晚到？',
          options: ['故障', '乘客太多', '大雨', '交通擁堵'],
          answer: 2,
          explanation: '廣播說「因為大雨的關係」。'
        }
      ]
    },
    {
      id: 'bandB-l-022',
      type: 'listen_long',
      category: '段落',
      difficulty: 3,
      audioText: '請聽一段自我介紹，然後回答兩個問題。\n各位同學大家好，我叫李大華，我原本住在臺南，後來由於父親工作的緣故，搬到高雄跟臺北，之後才從臺北搬到臺中來上課。我的興趣是運動，除了運動還喜歡收藏石頭，對玩電腦遊戲也很有興趣，但數學就讓我很頭痛了。',
      questions: [
        {
          question: '李大華覺得什麼事情對他來說很困難？',
          options: ['運動', '收藏石頭', '電腦遊戲', '數學'],
          answer: 3,
          explanation: '他說「數學就讓我很頭痛了」。'
        },
        {
          question: '下面哪一句話是對的？',
          options: ['他現在住在臺中', '他現在住在臺北', '他一直住在臺南', '他現在住在高雄'],
          answer: 0,
          explanation: '他說「之後才從臺北搬到臺中來上課」，所以現在住在臺中。'
        }
      ]
    },
    {
      id: 'bandB-l-023',
      type: 'listen_long',
      category: '段落',
      difficulty: 3,
      audioText: '請聽一段新聞報導，然後回答兩個問題。\n今天的經濟新聞：根據統計，台灣今年的失業率下降到百分之三點五，創下近十年新低。政府表示，這是由於經濟增長和企業招募增加的結果。不過，許多年輕人仍然面臨就業困難，因為他們缺乏工作經驗。',
      questions: [
        {
          question: '台灣今年的失業率是多少？',
          options: ['百分之二點五', '百分之四點五', '百分之三點五', '百分之五點五'],
          answer: 2,
          explanation: '報導說「失業率下降到百分之三點五」。'
        },
        {
          question: '為什麼許多年輕人仍然面臨就業困難？',
          options: ['沒有教育', '沒有技能', '不願意工作', '經驗不足'],
          answer: 3,
          explanation: '報導說「許多年輕人仍然面臨就業困難，因為他們缺乏工作經驗」。'
        }
      ]
    },
    {
      id: 'bandB-l-024',
      type: 'listen_long',
      category: '段落',
      difficulty: 4,
      audioText: '請聽一段教育專題討論，然後回答兩個問題。\n線上教育在最近幾年發展迅速。許多學校和教育機構開始提供線上課程。線上教育有許多優點：學生可以按自己的進度學習，不受時間和地點的限制。然而，也有一些缺點。線上教育缺少面對面的互動，這對某些學生的學習效果可能有負面影響。',
      questions: [
        {
          question: '線上教育的優點是什麼？',
          options: ['成本低', '學生可以按自己的進度學習，不受時間和地點限制', '老師更好', '教材更豐富'],
          answer: 1,
          explanation: '文章說「學生可以按自己的進度學習，不受時間和地點的限制」。'
        },
        {
          question: '線上教育的缺點是什麼？',
          options: ['費用太高', '技術複雜', '缺少面對面的互動', '老師不專業'],
          answer: 2,
          explanation: '文章說「線上教育缺少面對面的互動」。'
        }
      ]
    },
    {
      id: 'bandB-l-025',
      type: 'listen_long',
      category: '段落',
      difficulty: 3,
      audioText: '請聽一段消費者調查報告，然後回答兩個問題。\n一項新的消費者調查顯示，百分之六十五的消費者表示會根據環保標籤來選擇產品。這些消費者願意為環保產品支付更高的價格。然而，製造商指出，生產環保產品的成本很高，這導致產品價格上升。',
      questions: [
        {
          question: '有多少消費者會根據環保標籤選擇產品？',
          options: ['百分之五十', '百分之六十', '百分之七十', '百分之六十五'],
          answer: 3,
          explanation: '調查顯示「百分之六十五的消費者表示會根據環保標籤來選擇產品」。'
        },
        {
          question: '為什麼環保產品的價格比較高？',
          options: ['生產成本高', '消費者願意付更多錢', '公司要獲利更多', '進口關稅高'],
          answer: 0,
          explanation: '報告說「生產環保產品的成本很高，這導致產品價格上升」。'
        }
      ]
    },
    {
      id: 'bandB-l-026',
      type: 'listen_long',
      category: '段落',
      difficulty: 4,
      audioText: '請聽一段文化評論，然後回答兩個問題。\n傳統手工藝在現代社會中面臨著存亡的危機。隨著工業化和現代化的進展，越來越少的年輕人願意學習傳統手工藝。一些政府和文化機構正在努力保護這些傳統技能，通過提供教育和資金支持。然而，這些努力還不夠。要真正保護傳統手工藝，需要改變人們對手工藝的看法，讓人們認識到它們的價值。',
      questions: [
        {
          question: '為什麼年輕人不願意學習傳統手工藝？',
          options: ['太難了', '工業化和現代化的進展', '沒有前景', '太無聊'],
          answer: 1,
          explanation: '文章說「隨著工業化和現代化的進展，越來越少的年輕人願意學習傳統手工藝」。'
        },
        {
          question: '要保護傳統手工藝，最重要的是什麼？',
          options: ['提供更多資金', '建立更多學校', '改變人們的看法，讓人們認識其價值', '限制工業生產'],
          answer: 2,
          explanation: '文章說「要真正保護傳統手工藝，需要改變人們對手工藝的看法，讓人們認識到它們的價值」。'
        }
      ]
    },
    {
      id: 'bandB-l-027',
      type: 'listen_long',
      category: '段落',
      difficulty: 3,
      audioText: '請聽一段旅遊信息，然後回答兩個問題。\n台灣的秋天是旅遊的最佳季節。溫度適中，既不太熱也不太冷。秋天的天氣通常很穩定，降雨量較少，這為遊客提供了最好的遊覽條件。此外，秋天是台灣許多季節性景點的最好時候。例如，白毫烏龍茶的採摘季節就是秋天。',
      questions: [
        {
          question: '為什麼秋天是台灣旅遊的最佳季節？',
          options: ['溫度適中，天氣穩定，降雨少', '有很多節慶', '飯店便宜', '人少'],
          answer: 0,
          explanation: '文章說「溫度適中，既不太熱也不太冷。秋天的天氣通常很穩定，降雨量較少」。'
        },
        {
          question: '白毫烏龍茶的採摘季節是什麼時候？',
          options: ['春天', '夏天', '秋天', '冬天'],
          answer: 2,
          explanation: '文章說「白毫烏龍茶的採摘季節就是秋天」。'
        }
      ]
    },
    {
      id: 'bandB-l-028',
      type: 'listen_long',
      category: '段落',
      difficulty: 4,
      audioText: '請聽一段健康講座，然後回答兩個問題。\n睡眠對健康至關重要。研究表明，成年人每晚應該睡七到八小時才能保持身體和心理的健康。不足的睡眠會導致許多健康問題，包括肥胖、心臟病和糖尿病。此外，長期睡眠不足還會影響認知功能，使人難以集中注意力和記住信息。因此，建立良好的睡眠習慣對任何年齡的人都很重要。',
      questions: [
        {
          question: '成年人每晚應該睡多少小時？',
          options: ['五到六小時', '六到七小時', '七到八小時', '八到九小時'],
          answer: 2,
          explanation: '講座說「成年人每晚應該睡七到八小時」。'
        },
        {
          question: '睡眠不足會導致什麼？',
          options: ['只是疲勞', '只影響心理健康', '肥胖、心臟病、糖尿病，以及認知功能下降', '沒有嚴重影響'],
          answer: 2,
          explanation: '講座說「不足的睡眠會導致許多健康問題，包括肥胖、心臟病和糖尿病。此外，長期睡眠不足還會影響認知功能」。'
        }
      ]
    },
    {
      id: 'bandB-l-029',
      type: 'listen_long',
      category: '段落',
      difficulty: 3,
      audioText: '請聽一段環保建議，然後回答兩個問題。\n減少一次性用品的使用是保護環境的一個重要方法。一次性用品，比如塑膠袋、塑膠杯和餐具，只被使用一次就被丟棄了。這些用品需要幾百年才能分解，對環境造成了巨大的傷害。為了減少一次性用品的使用，我們可以帶著自己的購物袋、水杯和餐具出門。',
      questions: [
        {
          question: '一次性用品需要多久才能分解？',
          options: ['數十年', '幾年', '幾百年', '一年'],
          answer: 2,
          explanation: '文章說「這些用品需要幾百年才能分解」。'
        },
        {
          question: '我們可以做什麼來減少一次性用品的使用？',
          options: ['不出門', '帶著自己的購物袋、水杯和餐具出門', '只在家裡用品', '購買更多一次性用品'],
          answer: 1,
          explanation: '文章說「我們可以帶著自己的購物袋、水杯和餐具出門」。'
        }
      ]
    },
    {
      id: 'bandB-l-030',
      type: 'listen_long',
      category: '段落',
      difficulty: 4,
      audioText: '請聽一段文學評論，然後回答兩個問題。\n現代文學反映了當代社會的複雜性。今天的作家們不再只是講述簡單的故事，而是探討深層的社會問題和人類的心理。例如，許多現代小說涉及身份認同、文化衝突和社會不公平等主題。通過這些故事，讀者可以更好地理解當今世界的挑戰和機會。因此，閱讀現代文學對於瞭解我們的社會和時代是非常重要的。',
      questions: [
        {
          question: '現代文學的特點是什麼？',
          options: ['探討深層社會問題和人類心理', '只講述簡單故事', '內容不重要', '都是虛構的'],
          answer: 0,
          explanation: '文章說「今天的作家們不再只是講述簡單的故事，而是探討深層的社會問題和人類的心理」。'
        },
        {
          question: '現代小說通常涉及什麼主題？',
          options: ['只有愛情故事', '身份認同、文化衝突和社會不公平', '只有冒險故事', '只有犯罪故事'],
          answer: 1,
          explanation: '文章說「許多現代小說涉及身份認同、文化衝突和社會不公平等主題」。'
        }
      ]
    },
  ]
};

export default listeningQuestions;
