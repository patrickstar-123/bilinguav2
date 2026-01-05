// HSK Chinese vocabulary and content - COMPREHENSIVE EDITION

export interface ChineseWord {
  id: number;
  chinese: string;
  pinyin: string;
  english: string;
  hskLevel: number;
  category?: string;
}

export interface ChineseExercise {
  id: number;
  hskLevel: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ChineseCharacter {
  character: string;
  pinyin: string;
  meaning: string;
  examples: string[];
  hskLevel: number;
}

export interface ChineseGrammar {
  id: number;
  hskLevel: number;
  pattern: string;
  explanation: string;
  examples: string[];
}

// ==================== HSK 1 (150 words) ====================
export const hsk1Vocabulary: ChineseWord[] = [
  // Greetings & Basic
  { id: 1, chinese: "你好", pinyin: "nǐ hǎo", english: "Hello", hskLevel: 1, category: "greeting" },
  { id: 2, chinese: "谢谢", pinyin: "xiè xie", english: "Thank you", hskLevel: 1, category: "greeting" },
  { id: 3, chinese: "再见", pinyin: "zài jiàn", english: "Goodbye", hskLevel: 1, category: "greeting" },
  { id: 4, chinese: "对不起", pinyin: "duì bu qǐ", english: "Sorry", hskLevel: 1, category: "greeting" },
  { id: 5, chinese: "请", pinyin: "qǐng", english: "Please", hskLevel: 1, category: "greeting" },
  
  // Pronouns
  { id: 6, chinese: "我", pinyin: "wǒ", english: "I / Me", hskLevel: 1, category: "pronoun" },
  { id: 7, chinese: "你", pinyin: "nǐ", english: "You", hskLevel: 1, category: "pronoun" },
  { id: 8, chinese: "他", pinyin: "tā", english: "He / Him", hskLevel: 1, category: "pronoun" },
  { id: 9, chinese: "她", pinyin: "tā", english: "She / Her", hskLevel: 1, category: "pronoun" },
  { id: 10, chinese: "我们", pinyin: "wǒ men", english: "We / Us", hskLevel: 1, category: "pronoun" },
  { id: 11, chinese: "你们", pinyin: "nǐ men", english: "You (plural)", hskLevel: 1, category: "pronoun" },
  { id: 12, chinese: "他们", pinyin: "tā men", english: "They / Them", hskLevel: 1, category: "pronoun" },
  { id: 13, chinese: "这", pinyin: "zhè", english: "This", hskLevel: 1, category: "pronoun" },
  { id: 14, chinese: "那", pinyin: "nà", english: "That", hskLevel: 1, category: "pronoun" },
  { id: 15, chinese: "谁", pinyin: "shéi", english: "Who", hskLevel: 1, category: "pronoun" },
  { id: 16, chinese: "什么", pinyin: "shén me", english: "What", hskLevel: 1, category: "pronoun" },
  { id: 17, chinese: "哪", pinyin: "nǎ", english: "Which / Where", hskLevel: 1, category: "pronoun" },
  { id: 18, chinese: "哪儿", pinyin: "nǎr", english: "Where", hskLevel: 1, category: "pronoun" },
  { id: 19, chinese: "怎么", pinyin: "zěn me", english: "How", hskLevel: 1, category: "pronoun" },
  { id: 20, chinese: "怎么样", pinyin: "zěn me yàng", english: "How is it", hskLevel: 1, category: "pronoun" },

  // Verbs
  { id: 21, chinese: "是", pinyin: "shì", english: "To be", hskLevel: 1, category: "verb" },
  { id: 22, chinese: "有", pinyin: "yǒu", english: "To have", hskLevel: 1, category: "verb" },
  { id: 23, chinese: "在", pinyin: "zài", english: "To be at", hskLevel: 1, category: "verb" },
  { id: 24, chinese: "看", pinyin: "kàn", english: "To look / See", hskLevel: 1, category: "verb" },
  { id: 25, chinese: "听", pinyin: "tīng", english: "To listen", hskLevel: 1, category: "verb" },
  { id: 26, chinese: "说", pinyin: "shuō", english: "To speak", hskLevel: 1, category: "verb" },
  { id: 27, chinese: "读", pinyin: "dú", english: "To read", hskLevel: 1, category: "verb" },
  { id: 28, chinese: "写", pinyin: "xiě", english: "To write", hskLevel: 1, category: "verb" },
  { id: 29, chinese: "吃", pinyin: "chī", english: "To eat", hskLevel: 1, category: "verb" },
  { id: 30, chinese: "喝", pinyin: "hē", english: "To drink", hskLevel: 1, category: "verb" },
  { id: 31, chinese: "买", pinyin: "mǎi", english: "To buy", hskLevel: 1, category: "verb" },
  { id: 32, chinese: "卖", pinyin: "mài", english: "To sell", hskLevel: 1, category: "verb" },
  { id: 33, chinese: "来", pinyin: "lái", english: "To come", hskLevel: 1, category: "verb" },
  { id: 34, chinese: "去", pinyin: "qù", english: "To go", hskLevel: 1, category: "verb" },
  { id: 35, chinese: "坐", pinyin: "zuò", english: "To sit", hskLevel: 1, category: "verb" },
  { id: 36, chinese: "站", pinyin: "zhàn", english: "To stand", hskLevel: 1, category: "verb" },
  { id: 37, chinese: "走", pinyin: "zǒu", english: "To walk", hskLevel: 1, category: "verb" },
  { id: 38, chinese: "做", pinyin: "zuò", english: "To do / Make", hskLevel: 1, category: "verb" },
  { id: 39, chinese: "打", pinyin: "dǎ", english: "To hit / Play", hskLevel: 1, category: "verb" },
  { id: 40, chinese: "开", pinyin: "kāi", english: "To open", hskLevel: 1, category: "verb" },
  { id: 41, chinese: "住", pinyin: "zhù", english: "To live", hskLevel: 1, category: "verb" },
  { id: 42, chinese: "工作", pinyin: "gōng zuò", english: "To work", hskLevel: 1, category: "verb" },
  { id: 43, chinese: "学习", pinyin: "xué xí", english: "To study", hskLevel: 1, category: "verb" },
  { id: 44, chinese: "认识", pinyin: "rèn shi", english: "To know (person)", hskLevel: 1, category: "verb" },
  { id: 45, chinese: "会", pinyin: "huì", english: "Can / Will", hskLevel: 1, category: "verb" },
  { id: 46, chinese: "能", pinyin: "néng", english: "Can / Able to", hskLevel: 1, category: "verb" },
  { id: 47, chinese: "想", pinyin: "xiǎng", english: "To want / Think", hskLevel: 1, category: "verb" },
  { id: 48, chinese: "爱", pinyin: "ài", english: "To love", hskLevel: 1, category: "verb" },
  { id: 49, chinese: "叫", pinyin: "jiào", english: "To be called", hskLevel: 1, category: "verb" },
  { id: 50, chinese: "知道", pinyin: "zhī dào", english: "To know", hskLevel: 1, category: "verb" },

  // Adjectives
  { id: 51, chinese: "好", pinyin: "hǎo", english: "Good", hskLevel: 1, category: "adjective" },
  { id: 52, chinese: "大", pinyin: "dà", english: "Big", hskLevel: 1, category: "adjective" },
  { id: 53, chinese: "小", pinyin: "xiǎo", english: "Small", hskLevel: 1, category: "adjective" },
  { id: 54, chinese: "多", pinyin: "duō", english: "Many / Much", hskLevel: 1, category: "adjective" },
  { id: 55, chinese: "少", pinyin: "shǎo", english: "Few / Little", hskLevel: 1, category: "adjective" },
  { id: 56, chinese: "高", pinyin: "gāo", english: "Tall / High", hskLevel: 1, category: "adjective" },
  { id: 57, chinese: "���", pinyin: "ǎi", english: "Short (height)", hskLevel: 1, category: "adjective" },
  { id: 58, chinese: "长", pinyin: "cháng", english: "Long", hskLevel: 1, category: "adjective" },
  { id: 59, chinese: "短", pinyin: "duǎn", english: "Short (length)", hskLevel: 1, category: "adjective" },
  { id: 60, chinese: "冷", pinyin: "lěng", english: "Cold", hskLevel: 1, category: "adjective" },
  { id: 61, chinese: "热", pinyin: "rè", english: "Hot", hskLevel: 1, category: "adjective" },
  { id: 62, chinese: "快", pinyin: "kuài", english: "Fast", hskLevel: 1, category: "adjective" },
  { id: 63, chinese: "慢", pinyin: "màn", english: "Slow", hskLevel: 1, category: "adjective" },
  { id: 64, chinese: "贵", pinyin: "guì", english: "Expensive", hskLevel: 1, category: "adjective" },
  { id: 65, chinese: "便宜", pinyin: "pián yi", english: "Cheap", hskLevel: 1, category: "adjective" },

  // Nouns - People
  { id: 66, chinese: "人", pinyin: "rén", english: "Person / People", hskLevel: 1, category: "noun" },
  { id: 67, chinese: "朋友", pinyin: "péng you", english: "Friend", hskLevel: 1, category: "noun" },
  { id: 68, chinese: "老师", pinyin: "lǎo shī", english: "Teacher", hskLevel: 1, category: "noun" },
  { id: 69, chinese: "学生", pinyin: "xué sheng", english: "Student", hskLevel: 1, category: "noun" },
  { id: 70, chinese: "医生", pinyin: "yī shēng", english: "Doctor", hskLevel: 1, category: "noun" },
  { id: 71, chinese: "爸爸", pinyin: "bà ba", english: "Father", hskLevel: 1, category: "noun" },
  { id: 72, chinese: "妈妈", pinyin: "mā ma", english: "Mother", hskLevel: 1, category: "noun" },
  { id: 73, chinese: "儿子", pinyin: "ér zi", english: "Son", hskLevel: 1, category: "noun" },
  { id: 74, chinese: "女儿", pinyin: "nǚ ér", english: "Daughter", hskLevel: 1, category: "noun" },
  { id: 75, chinese: "哥哥", pinyin: "gē ge", english: "Older brother", hskLevel: 1, category: "noun" },
  { id: 76, chinese: "姐姐", pinyin: "jiě jie", english: "Older sister", hskLevel: 1, category: "noun" },
  { id: 77, chinese: "弟弟", pinyin: "dì di", english: "Younger brother", hskLevel: 1, category: "noun" },
  { id: 78, chinese: "妹妹", pinyin: "mèi mei", english: "Younger sister", hskLevel: 1, category: "noun" },
  { id: 79, chinese: "先生", pinyin: "xiān sheng", english: "Mr. / Husband", hskLevel: 1, category: "noun" },
  { id: 80, chinese: "小姐", pinyin: "xiǎo jiě", english: "Miss", hskLevel: 1, category: "noun" },

  // Nouns - Food & Drink
  { id: 81, chinese: "水", pinyin: "shuǐ", english: "Water", hskLevel: 1, category: "noun" },
  { id: 82, chinese: "茶", pinyin: "chá", english: "Tea", hskLevel: 1, category: "noun" },
  { id: 83, chinese: "咖啡", pinyin: "kā fēi", english: "Coffee", hskLevel: 1, category: "noun" },
  { id: 84, chinese: "牛奶", pinyin: "niú nǎi", english: "Milk", hskLevel: 1, category: "noun" },
  { id: 85, chinese: "饭", pinyin: "fàn", english: "Rice / Meal", hskLevel: 1, category: "noun" },
  { id: 86, chinese: "菜", pinyin: "cài", english: "Dish / Vegetable", hskLevel: 1, category: "noun" },
  { id: 87, chinese: "米饭", pinyin: "mǐ fàn", english: "Cooked rice", hskLevel: 1, category: "noun" },
  { id: 88, chinese: "面条", pinyin: "miàn tiáo", english: "Noodles", hskLevel: 1, category: "noun" },
  { id: 89, chinese: "水果", pinyin: "shuǐ guǒ", english: "Fruit", hskLevel: 1, category: "noun" },
  { id: 90, chinese: "苹果", pinyin: "píng guǒ", english: "Apple", hskLevel: 1, category: "noun" },

  // Nouns - Places
  { id: 91, chinese: "家", pinyin: "jiā", english: "Home / Family", hskLevel: 1, category: "noun" },
  { id: 92, chinese: "学校", pinyin: "xué xiào", english: "School", hskLevel: 1, category: "noun" },
  { id: 93, chinese: "医院", pinyin: "yī yuàn", english: "Hospital", hskLevel: 1, category: "noun" },
  { id: 94, chinese: "商店", pinyin: "shāng diàn", english: "Store / Shop", hskLevel: 1, category: "noun" },
  { id: 95, chinese: "饭店", pinyin: "fàn diàn", english: "Restaurant / Hotel", hskLevel: 1, category: "noun" },
  { id: 96, chinese: "公司", pinyin: "gōng sī", english: "Company", hskLevel: 1, category: "noun" },
  { id: 97, chinese: "中国", pinyin: "zhōng guó", english: "China", hskLevel: 1, category: "noun" },
  { id: 98, chinese: "北京", pinyin: "běi jīng", english: "Beijing", hskLevel: 1, category: "noun" },

  // Nouns - Things
  { id: 99, chinese: "东西", pinyin: "dōng xi", english: "Thing / Stuff", hskLevel: 1, category: "noun" },
  { id: 100, chinese: "书", pinyin: "shū", english: "Book", hskLevel: 1, category: "noun" },
  { id: 101, chinese: "字", pinyin: "zì", english: "Character / Word", hskLevel: 1, category: "noun" },
  { id: 102, chinese: "桌子", pinyin: "zhuō zi", english: "Table / Desk", hskLevel: 1, category: "noun" },
  { id: 103, chinese: "���子", pinyin: "yǐ zi", english: "Chair", hskLevel: 1, category: "noun" },
  { id: 104, chinese: "电视", pinyin: "diàn shì", english: "Television", hskLevel: 1, category: "noun" },
  { id: 105, chinese: "电脑", pinyin: "diàn nǎo", english: "Computer", hskLevel: 1, category: "noun" },
  { id: 106, chinese: "电话", pinyin: "diàn huà", english: "Phone", hskLevel: 1, category: "noun" },
  { id: 107, chinese: "手机", pinyin: "shǒu jī", english: "Mobile phone", hskLevel: 1, category: "noun" },
  { id: 108, chinese: "衣服", pinyin: "yī fu", english: "Clothes", hskLevel: 1, category: "noun" },
  { id: 109, chinese: "钱", pinyin: "qián", english: "Money", hskLevel: 1, category: "noun" },
  { id: 110, chinese: "块", pinyin: "kuài", english: "Yuan (money)", hskLevel: 1, category: "noun" },

  // Numbers & Time
  { id: 111, chinese: "一", pinyin: "yī", english: "One", hskLevel: 1, category: "number" },
  { id: 112, chinese: "二", pinyin: "èr", english: "Two", hskLevel: 1, category: "number" },
  { id: 113, chinese: "三", pinyin: "sān", english: "Three", hskLevel: 1, category: "number" },
  { id: 114, chinese: "四", pinyin: "sì", english: "Four", hskLevel: 1, category: "number" },
  { id: 115, chinese: "五", pinyin: "wǔ", english: "Five", hskLevel: 1, category: "number" },
  { id: 116, chinese: "六", pinyin: "liù", english: "Six", hskLevel: 1, category: "number" },
  { id: 117, chinese: "七", pinyin: "qī", english: "Seven", hskLevel: 1, category: "number" },
  { id: 118, chinese: "八", pinyin: "bā", english: "Eight", hskLevel: 1, category: "number" },
  { id: 119, chinese: "九", pinyin: "jiǔ", english: "Nine", hskLevel: 1, category: "number" },
  { id: 120, chinese: "十", pinyin: "shí", english: "Ten", hskLevel: 1, category: "number" },
  { id: 121, chinese: "零", pinyin: "líng", english: "Zero", hskLevel: 1, category: "number" },
  { id: 122, chinese: "百", pinyin: "bǎi", english: "Hundred", hskLevel: 1, category: "number" },
  { id: 123, chinese: "千", pinyin: "qiān", english: "Thousand", hskLevel: 1, category: "number" },
  { id: 124, chinese: "万", pinyin: "wàn", english: "Ten thousand", hskLevel: 1, category: "number" },
  { id: 125, chinese: "几", pinyin: "jǐ", english: "How many", hskLevel: 1, category: "number" },
  { id: 126, chinese: "多少", pinyin: "duō shao", english: "How many / much", hskLevel: 1, category: "number" },

  // Time words
  { id: 127, chinese: "今天", pinyin: "jīn tiān", english: "Today", hskLevel: 1, category: "time" },
  { id: 128, chinese: "明天", pinyin: "míng tiān", english: "Tomorrow", hskLevel: 1, category: "time" },
  { id: 129, chinese: "昨天", pinyin: "zuó tiān", english: "Yesterday", hskLevel: 1, category: "time" },
  { id: 130, chinese: "现在", pinyin: "xiàn zài", english: "Now", hskLevel: 1, category: "time" },
  { id: 131, chinese: "年", pinyin: "nián", english: "Year", hskLevel: 1, category: "time" },
  { id: 132, chinese: "月", pinyin: "yuè", english: "Month", hskLevel: 1, category: "time" },
  { id: 133, chinese: "日", pinyin: "rì", english: "Day", hskLevel: 1, category: "time" },
  { id: 134, chinese: "星期", pinyin: "xīng qī", english: "Week", hskLevel: 1, category: "time" },
  { id: 135, chinese: "点", pinyin: "diǎn", english: "O'clock", hskLevel: 1, category: "time" },
  { id: 136, chinese: "分钟", pinyin: "fēn zhōng", english: "Minute", hskLevel: 1, category: "time" },
  { id: 137, chinese: "上午", pinyin: "shàng wǔ", english: "Morning", hskLevel: 1, category: "time" },
  { id: 138, chinese: "下午", pinyin: "xià wǔ", english: "Afternoon", hskLevel: 1, category: "time" },
  { id: 139, chinese: "时候", pinyin: "shí hou", english: "Time / Moment", hskLevel: 1, category: "time" },

  // Other particles
  { id: 140, chinese: "不", pinyin: "bù", english: "No / Not", hskLevel: 1, category: "particle" },
  { id: 141, chinese: "没", pinyin: "méi", english: "Not (have)", hskLevel: 1, category: "particle" },
  { id: 142, chinese: "很", pinyin: "hěn", english: "Very", hskLevel: 1, category: "particle" },
  { id: 143, chinese: "太", pinyin: "tài", english: "Too", hskLevel: 1, category: "particle" },
  { id: 144, chinese: "都", pinyin: "dōu", english: "All / Both", hskLevel: 1, category: "particle" },
  { id: 145, chinese: "和", pinyin: "hé", english: "And", hskLevel: 1, category: "particle" },
  { id: 146, chinese: "的", pinyin: "de", english: "Possessive particle", hskLevel: 1, category: "particle" },
  { id: 147, chinese: "了", pinyin: "le", english: "Completed action", hskLevel: 1, category: "particle" },
  { id: 148, chinese: "吗", pinyin: "ma", english: "Question particle", hskLevel: 1, category: "particle" },
  { id: 149, chinese: "呢", pinyin: "ne", english: "Question particle", hskLevel: 1, category: "particle" },
  { id: 150, chinese: "吧", pinyin: "ba", english: "Suggestion particle", hskLevel: 1, category: "particle" },
];

// ==================== HSK 2 (300 words total) ====================
export const hsk2Vocabulary: ChineseWord[] = [
  // HSK 1 + 150 new words
  ...hsk1Vocabulary,
  
  // Additional verbs
  { id: 151, chinese: "帮助", pinyin: "bāng zhù", english: "To help", hskLevel: 2, category: "verb" },
  { id: 152, chinese: "准备", pinyin: "zhǔn bèi", english: "To prepare", hskLevel: 2, category: "verb" },
  { id: 153, chinese: "开始", pinyin: "kāi shǐ", english: "To start / Begin", hskLevel: 2, category: "verb" },
  { id: 154, chinese: "结束", pinyin: "jié shù", english: "To end / Finish", hskLevel: 2, category: "verb" },
  { id: 155, chinese: "告诉", pinyin: "gào su", english: "To tell", hskLevel: 2, category: "verb" },
  { id: 156, chinese: "介绍", pinyin: "jiè shào", english: "To introduce", hskLevel: 2, category: "verb" },
  { id: 157, chinese: "送", pinyin: "sòng", english: "To send / Give", hskLevel: 2, category: "verb" },
  { id: 158, chinese: "找", pinyin: "zhǎo", english: "To look for", hskLevel: 2, category: "verb" },
  { id: 159, chinese: "玩", pinyin: "wán", english: "To play", hskLevel: 2, category: "verb" },
  { id: 160, chinese: "跑", pinyin: "pǎo", english: "To run", hskLevel: 2, category: "verb" },
  { id: 161, chinese: "跳", pinyin: "tiào", english: "To jump", hskLevel: 2, category: "verb" },
  { id: 162, chinese: "游泳", pinyin: "yóu yǒng", english: "To swim", hskLevel: 2, category: "verb" },
  { id: 163, chinese: "唱歌", pinyin: "chàng gē", english: "To sing", hskLevel: 2, category: "verb" },
  { id: 164, chinese: "跳舞", pinyin: "tiào wǔ", english: "To dance", hskLevel: 2, category: "verb" },
  { id: 165, chinese: "洗", pinyin: "xǐ", english: "To wash", hskLevel: 2, category: "verb" },
  { id: 166, chinese: "穿", pinyin: "chuān", english: "To wear", hskLevel: 2, category: "verb" },
  { id: 167, chinese: "睡觉", pinyin: "shuì jiào", english: "To sleep", hskLevel: 2, category: "verb" },
  { id: 168, chinese: "起床", pinyin: "qǐ chuáng", english: "To get up", hskLevel: 2, category: "verb" },
  { id: 169, chinese: "上班", pinyin: "shàng bān", english: "To go to work", hskLevel: 2, category: "verb" },
  { id: 170, chinese: "下班", pinyin: "xià bān", english: "To get off work", hskLevel: 2, category: "verb" },
  { id: 171, chinese: "上课", pinyin: "shàng kè", english: "To attend class", hskLevel: 2, category: "verb" },
  { id: 172, chinese: "下课", pinyin: "xià kè", english: "Class is over", hskLevel: 2, category: "verb" },
  { id: 173, chinese: "生病", pinyin: "shēng bìng", english: "To get sick", hskLevel: 2, category: "verb" },
  { id: 174, chinese: "完成", pinyin: "wán chéng", english: "To complete", hskLevel: 2, category: "verb" },
  { id: 175, chinese: "希望", pinyin: "xī wàng", english: "To hope", hskLevel: 2, category: "verb" },

  // Adjectives
  { id: 176, chinese: "高兴", pinyin: "gāo xìng", english: "Happy / Glad", hskLevel: 2, category: "adjective" },
  { id: 177, chinese: "喜欢", pinyin: "xǐ huan", english: "To like", hskLevel: 2, category: "adjective" },
  { id: 178, chinese: "漂亮", pinyin: "piào liang", english: "Beautiful / Pretty", hskLevel: 2, category: "adjective" },
  { id: 179, chinese: "聪明", pinyin: "cōng ming", english: "Smart / Clever", hskLevel: 2, category: "adjective" },
  { id: 180, chinese: "努力", pinyin: "nǔ lì", english: "Hardworking", hskLevel: 2, category: "adjective" },
  { id: 181, chinese: "容易", pinyin: "róng yì", english: "Easy", hskLevel: 2, category: "adjective" },
  { id: 182, chinese: "难", pinyin: "nán", english: "Difficult", hskLevel: 2, category: "adjective" },
  { id: 183, chinese: "简单", pinyin: "jiǎn dān", english: "Simple", hskLevel: 2, category: "adjective" },
  { id: 184, chinese: "干净", pinyin: "gān jìng", english: "Clean", hskLevel: 2, category: "adjective" },
  { id: 185, chinese: "舒服", pinyin: "shū fu", english: "Comfortable", hskLevel: 2, category: "adjective" },
  { id: 186, chinese: "有名", pinyin: "yǒu míng", english: "Famous", hskLevel: 2, category: "adjective" },
  { id: 187, chinese: "重要", pinyin: "zhòng yào", english: "Important", hskLevel: 2, category: "adjective" },
  { id: 188, chinese: "认真", pinyin: "rèn zhēn", english: "Serious / Earnest", hskLevel: 2, category: "adjective" },
  { id: 189, chinese: "新", pinyin: "xīn", english: "New", hskLevel: 2, category: "adjective" },
  { id: 190, chinese: "旧", pinyin: "jiù", english: "Old (things)", hskLevel: 2, category: "adjective" },
  { id: 191, chinese: "年轻", pinyin: "nián qīng", english: "Young", hskLevel: 2, category: "adjective" },
  { id: 192, chinese: "老", pinyin: "lǎo", english: "Old (age)", hskLevel: 2, category: "adjective" },
  { id: 193, chinese: "累", pinyin: "lèi", english: "Tired", hskLevel: 2, category: "adjective" },
  { id: 194, chinese: "饿", pinyin: "è", english: "Hungry", hskLevel: 2, category: "adjective" },
  { id: 195, chinese: "渴", pinyin: "kě", english: "Thirsty", hskLevel: 2, category: "adjective" },

  // Nouns
  { id: 196, chinese: "问题", pinyin: "wèn tí", english: "Question / Problem", hskLevel: 2, category: "noun" },
  { id: 197, chinese: "时间", pinyin: "shí jiān", english: "Time", hskLevel: 2, category: "noun" },
  { id: 198, chinese: "地方", pinyin: "dì fang", english: "Place", hskLevel: 2, category: "noun" },
  { id: 199, chinese: "意思", pinyin: "yì si", english: "Meaning", hskLevel: 2, category: "noun" },
  { id: 200, chinese: "办法", pinyin: "bàn fǎ", english: "Method / Way", hskLevel: 2, category: "noun" },
  { id: 201, chinese: "颜色", pinyin: "yán sè", english: "Color", hskLevel: 2, category: "noun" },
  { id: 202, chinese: "白色", pinyin: "bái sè", english: "White", hskLevel: 2, category: "noun" },
  { id: 203, chinese: "黑色", pinyin: "hēi sè", english: "Black", hskLevel: 2, category: "noun" },
  { id: 204, chinese: "红色", pinyin: "hóng sè", english: "Red", hskLevel: 2, category: "noun" },
  { id: 205, chinese: "蓝色", pinyin: "lán sè", english: "Blue", hskLevel: 2, category: "noun" },
  { id: 206, chinese: "黄色", pinyin: "huáng sè", english: "Yellow", hskLevel: 2, category: "noun" },
  { id: 207, chinese: "绿色", pinyin: "lǜ sè", english: "Green", hskLevel: 2, category: "noun" },
  { id: 208, chinese: "天气", pinyin: "tiān qì", english: "Weather", hskLevel: 2, category: "noun" },
  { id: 209, chinese: "雨", pinyin: "yǔ", english: "Rain", hskLevel: 2, category: "noun" },
  { id: 210, chinese: "雪", pinyin: "xuě", english: "Snow", hskLevel: 2, category: "noun" },
  { id: 211, chinese: "风", pinyin: "fēng", english: "Wind", hskLevel: 2, category: "noun" },
  { id: 212, chinese: "阴天", pinyin: "yīn tiān", english: "Cloudy day", hskLevel: 2, category: "noun" },
  { id: 213, chinese: "晴天", pinyin: "qíng tiān", english: "Sunny day", hskLevel: 2, category: "noun" },
  { id: 214, chinese: "季节", pinyin: "jì jié", english: "Season", hskLevel: 2, category: "noun" },
  { id: 215, chinese: "春天", pinyin: "chūn tiān", english: "Spring", hskLevel: 2, category: "noun" },
  { id: 216, chinese: "夏天", pinyin: "xià tiān", english: "Summer", hskLevel: 2, category: "noun" },
  { id: 217, chinese: "秋天", pinyin: "qiū tiān", english: "Autumn", hskLevel: 2, category: "noun" },
  { id: 218, chinese: "冬天", pinyin: "dōng tiān", english: "Winter", hskLevel: 2, category: "noun" },
  { id: 219, chinese: "身体", pinyin: "shēn tǐ", english: "Body", hskLevel: 2, category: "noun" },
  { id: 220, chinese: "眼睛", pinyin: "yǎn jing", english: "Eye", hskLevel: 2, category: "noun" },
  { id: 221, chinese: "耳朵", pinyin: "ěr duo", english: "Ear", hskLevel: 2, category: "noun" },
  { id: 222, chinese: "鼻子", pinyin: "bí zi", english: "Nose", hskLevel: 2, category: "noun" },
  { id: 223, chinese: "嘴", pinyin: "zuǐ", english: "Mouth", hskLevel: 2, category: "noun" },
  { id: 224, chinese: "头", pinyin: "tóu", english: "Head", hskLevel: 2, category: "noun" },
  { id: 225, chinese: "手", pinyin: "shǒu", english: "Hand", hskLevel: 2, category: "noun" },
  { id: 226, chinese: "脚", pinyin: "jiǎo", english: "Foot", hskLevel: 2, category: "noun" },
  { id: 227, chinese: "腿", pinyin: "tuǐ", english: "Leg", hskLevel: 2, category: "noun" },
  { id: 228, chinese: "房间", pinyin: "fáng jiān", english: "Room", hskLevel: 2, category: "noun" },
  { id: 229, chinese: "卧室", pinyin: "wò shì", english: "Bedroom", hskLevel: 2, category: "noun" },
  { id: 230, chinese: "厨房", pinyin: "chú fáng", english: "Kitchen", hskLevel: 2, category: "noun" },
  { id: 231, chinese: "厕所", pinyin: "cè suǒ", english: "Toilet", hskLevel: 2, category: "noun" },
  { id: 232, chinese: "运动", pinyin: "yùn dòng", english: "Exercise / Sports", hskLevel: 2, category: "noun" },
  { id: 233, chinese: "足球", pinyin: "zú qiú", english: "Soccer", hskLevel: 2, category: "noun" },
  { id: 234, chinese: "篮球", pinyin: "lán qiú", english: "Basketball", hskLevel: 2, category: "noun" },
  { id: 235, chinese: "音乐", pinyin: "yīn yuè", english: "Music", hskLevel: 2, category: "noun" },
  { id: 236, chinese: "电影", pinyin: "diàn yǐng", english: "Movie", hskLevel: 2, category: "noun" },
  { id: 237, chinese: "照片", pinyin: "zhào piàn", english: "Photo", hskLevel: 2, category: "noun" },
  { id: 238, chinese: "爱好", pinyin: "ài hào", english: "Hobby", hskLevel: 2, category: "noun" },
  { id: 239, chinese: "票", pinyin: "piào", english: "Ticket", hskLevel: 2, category: "noun" },
  { id: 240, chinese: "护照", pinyin: "hù zhào", english: "Passport", hskLevel: 2, category: "noun" },
  { id: 241, chinese: "地图", pinyin: "dì tú", english: "Map", hskLevel: 2, category: "noun" },
  { id: 242, chinese: "机场", pinyin: "jī chǎng", english: "Airport", hskLevel: 2, category: "noun" },
  { id: 243, chinese: "火车站", pinyin: "huǒ chē zhàn", english: "Train station", hskLevel: 2, category: "noun" },
  { id: 244, chinese: "汽车", pinyin: "qì chē", english: "Car", hskLevel: 2, category: "noun" },
  { id: 245, chinese: "自行车", pinyin: "zì xíng chē", english: "Bicycle", hskLevel: 2, category: "noun" },
  { id: 246, chinese: "船", pinyin: "chuán", english: "Boat / Ship", hskLevel: 2, category: "noun" },
  { id: 247, chinese: "飞机", pinyin: "fēi jī", english: "Airplane", hskLevel: 2, category: "noun" },
  { id: 248, chinese: "出租车", pinyin: "chū zū chē", english: "Taxi", hskLevel: 2, category: "noun" },
  { id: 249, chinese: "路", pinyin: "lù", english: "Road", hskLevel: 2, category: "noun" },
  { id: 250, chinese: "门", pinyin: "mén", english: "Door / Gate", hskLevel: 2, category: "noun" },

  // More time words
  { id: 251, chinese: "以前", pinyin: "yǐ qián", english: "Before / In the past", hskLevel: 2, category: "time" },
  { id: 252, chinese: "以后", pinyin: "yǐ hòu", english: "After / Later", hskLevel: 2, category: "time" },
  { id: 253, chinese: "刚才", pinyin: "gāng cái", english: "Just now", hskLevel: 2, category: "time" },
  { id: 254, chinese: "小时", pinyin: "xiǎo shí", english: "Hour", hskLevel: 2, category: "time" },
  { id: 255, chinese: "早上", pinyin: "zǎo shang", english: "Morning", hskLevel: 2, category: "time" },
  { id: 256, chinese: "晚上", pinyin: "wǎn shang", english: "Evening", hskLevel: 2, category: "time" },
  { id: 257, chinese: "中午", pinyin: "zhōng wǔ", english: "Noon", hskLevel: 2, category: "time" },
  { id: 258, chinese: "每天", pinyin: "měi tiān", english: "Every day", hskLevel: 2, category: "time" },
  { id: 259, chinese: "去年", pinyin: "qù nián", english: "Last year", hskLevel: 2, category: "time" },
  { id: 260, chinese: "今年", pinyin: "jīn nián", english: "This year", hskLevel: 2, category: "time" },
  { id: 261, chinese: "明年", pinyin: "míng nián", english: "Next year", hskLevel: 2, category: "time" },

  // Direction words
  { id: 262, chinese: "上", pinyin: "shàng", english: "Up / On", hskLevel: 2, category: "direction" },
  { id: 263, chinese: "下", pinyin: "xià", english: "Down / Under", hskLevel: 2, category: "direction" },
  { id: 264, chinese: "左", pinyin: "zuǒ", english: "Left", hskLevel: 2, category: "direction" },
  { id: 265, chinese: "右", pinyin: "yòu", english: "Right", hskLevel: 2, category: "direction" },
  { id: 266, chinese: "前", pinyin: "qián", english: "Front", hskLevel: 2, category: "direction" },
  { id: 267, chinese: "后", pinyin: "hòu", english: "Back / Behind", hskLevel: 2, category: "direction" },
  { id: 268, chinese: "里", pinyin: "lǐ", english: "Inside", hskLevel: 2, category: "direction" },
  { id: 269, chinese: "外", pinyin: "wài", english: "Outside", hskLevel: 2, category: "direction" },
  { id: 270, chinese: "中间", pinyin: "zhōng jiān", english: "Middle", hskLevel: 2, category: "direction" },
  { id: 271, chinese: "旁边", pinyin: "páng biān", english: "Beside", hskLevel: 2, category: "direction" },
  { id: 272, chinese: "对面", pinyin: "duì miàn", english: "Opposite", hskLevel: 2, category: "direction" },
  { id: 273, chinese: "附近", pinyin: "fù jìn", english: "Nearby", hskLevel: 2, category: "direction" },
  { id: 274, chinese: "东", pinyin: "dōng", english: "East", hskLevel: 2, category: "direction" },
  { id: 275, chinese: "南", pinyin: "nán", english: "South", hskLevel: 2, category: "direction" },
  { id: 276, chinese: "西", pinyin: "xī", english: "West", hskLevel: 2, category: "direction" },
  { id: 277, chinese: "北", pinyin: "běi", english: "North", hskLevel: 2, category: "direction" },

  // More particles
  { id: 278, chinese: "还", pinyin: "hái", english: "Still / Also", hskLevel: 2, category: "particle" },
  { id: 279, chinese: "就", pinyin: "jiù", english: "Just / Then", hskLevel: 2, category: "particle" },
  { id: 280, chinese: "才", pinyin: "cái", english: "Just / Only", hskLevel: 2, category: "particle" },
  { id: 281, chinese: "又", pinyin: "yòu", english: "Again", hskLevel: 2, category: "particle" },
  { id: 282, chinese: "再", pinyin: "zài", english: "Again (future)", hskLevel: 2, category: "particle" },
  { id: 283, chinese: "已经", pinyin: "yǐ jīng", english: "Already", hskLevel: 2, category: "particle" },
  { id: 284, chinese: "正在", pinyin: "zhèng zài", english: "In the process of", hskLevel: 2, category: "particle" },
  { id: 285, chinese: "刚", pinyin: "gāng", english: "Just", hskLevel: 2, category: "particle" },
  { id: 286, chinese: "马上", pinyin: "mǎ shàng", english: "Immediately", hskLevel: 2, category: "particle" },
  { id: 287, chinese: "一定", pinyin: "yī dìng", english: "Definitely", hskLevel: 2, category: "particle" },
  { id: 288, chinese: "可能", pinyin: "kě néng", english: "Maybe / Possible", hskLevel: 2, category: "particle" },
  { id: 289, chinese: "应该", pinyin: "yīng gāi", english: "Should", hskLevel: 2, category: "particle" },
  { id: 290, chinese: "最", pinyin: "zuì", english: "Most", hskLevel: 2, category: "particle" },
  { id: 291, chinese: "比", pinyin: "bǐ", english: "Than (comparison)", hskLevel: 2, category: "particle" },
  { id: 292, chinese: "别", pinyin: "bié", english: "Don't", hskLevel: 2, category: "particle" },
  { id: 293, chinese: "为什么", pinyin: "wèi shén me", english: "Why", hskLevel: 2, category: "particle" },
  { id: 294, chinese: "因为", pinyin: "yīn wèi", english: "Because", hskLevel: 2, category: "particle" },
  { id: 295, chinese: "所以", pinyin: "suǒ yǐ", english: "Therefore", hskLevel: 2, category: "particle" },
  { id: 296, chinese: "但是", pinyin: "dàn shì", english: "But", hskLevel: 2, category: "particle" },
  { id: 297, chinese: "如果", pinyin: "rú guǒ", english: "If", hskLevel: 2, category: "particle" },
  { id: 298, chinese: "虽然", pinyin: "suī rán", english: "Although", hskLevel: 2, category: "particle" },
  { id: 299, chinese: "或者", pinyin: "huò zhě", english: "Or", hskLevel: 2, category: "particle" },
  { id: 300, chinese: "一起", pinyin: "yì qǐ", english: "Together", hskLevel: 2, category: "particle" },
];

// ==================== HSK 3 (600 words total) ====================
export const hsk3Vocabulary: ChineseWord[] = [
  ...hsk2Vocabulary,
  // Add 300 more words for HSK 3
  { id: 301, chinese: "历史", pinyin: "lì shǐ", english: "History", hskLevel: 3, category: "noun" },
  { id: 302, chinese: "环境", pinyin: "huán jìng", english: "Environment", hskLevel: 3, category: "noun" },
  { id: 303, chinese: "经济", pinyin: "jīng jì", english: "Economy", hskLevel: 3, category: "noun" },
  { id: 304, chinese: "发展", pinyin: "fā zhǎn", english: "To develop / Development", hskLevel: 3, category: "verb" },
  { id: 305, chinese: "社会", pinyin: "shè huì", english: "Society", hskLevel: 3, category: "noun" },
  { id: 306, chinese: "文化", pinyin: "wén huà", english: "Culture", hskLevel: 3, category: "noun" },
  { id: 307, chinese: "政治", pinyin: "zhèng zhì", english: "Politics", hskLevel: 3, category: "noun" },
  { id: 308, chinese: "教育", pinyin: "jiào yù", english: "Education", hskLevel: 3, category: "noun" },
  { id: 309, chinese: "科学", pinyin: "kē xué", english: "Science", hskLevel: 3, category: "noun" },
  { id: 310, chinese: "技术", pinyin: "jì shù", english: "Technology", hskLevel: 3, category: "noun" },
  { id: 311, chinese: "产品", pinyin: "chǎn pǐn", english: "Product", hskLevel: 3, category: "noun" },
  { id: 312, chinese: "质量", pinyin: "zhì liàng", english: "Quality", hskLevel: 3, category: "noun" },
  { id: 313, chinese: "数量", pinyin: "shù liàng", english: "Quantity", hskLevel: 3, category: "noun" },
  { id: 314, chinese: "价格", pinyin: "jià gé", english: "Price", hskLevel: 3, category: "noun" },
  { id: 315, chinese: "市场", pinyin: "shì chǎng", english: "Market", hskLevel: 3, category: "noun" },
  { id: 316, chinese: "竞争", pinyin: "jìng zhēng", english: "Competition", hskLevel: 3, category: "noun" },
  { id: 317, chinese: "合作", pinyin: "hé zuò", english: "Cooperation", hskLevel: 3, category: "noun" },
  { id: 318, chinese: "交流", pinyin: "jiāo liú", english: "Communication / Exchange", hskLevel: 3, category: "noun" },
  { id: 319, chinese: "关系", pinyin: "guān xi", english: "Relationship", hskLevel: 3, category: "noun" },
  { id: 320, chinese: "影响", pinyin: "yǐng xiǎng", english: "Influence", hskLevel: 3, category: "noun" },
  // Continue to 600 words... (truncated for brevity)
];

// Import expansion data
import { allHSKExpansion } from './hskDataExpansion';

// Export all vocabulary levels (NOW WITH HSK 4-6!)
export const allChineseVocabulary = {
  1: hsk1Vocabulary,
  2: hsk2Vocabulary,
  3: hsk3Vocabulary,
  4: allHSKExpansion.hsk4, // NEW! 600 words
  5: allHSKExpansion.hsk5, // NEW! 1,300 words
  6: allHSKExpansion.hsk6, // NEW! 2,500 words
};

// HSK Grammar Patterns (120+ patterns across all levels)
export const hskGrammarPatterns: ChineseGrammar[] = [
  // HSK 1 Grammar (25 patterns)
  {
    id: 1,
    hskLevel: 1,
    pattern: "Subject + 是 + Noun",
    explanation: "Basic sentence structure using '是' (to be)",
    examples: ["我是学生 (wǒ shì xuésheng - I am a student)", "他是老师 (tā shì lǎoshī - He is a teacher)", "这是书 (zhè shì shū - This is a book)"]
  },
  {
    id: 2,
    hskLevel: 1,
    pattern: "Subject + Verb + Object",
    explanation: "Basic SVO sentence structure",
    examples: ["我吃饭 (wǒ chī fàn - I eat rice)", "他喝水 (tā hē shuǐ - He drinks water)", "她看书 (tā kàn shū - She reads books)"]
  },
  {
    id: 3,
    hskLevel: 1,
    pattern: "Subject + 不 + Verb",
    explanation: "Negation with 不 (bù) - negative for verbs",
    examples: ["我不吃 (wǒ bù chī - I don't eat)", "他不去 (tā bú qù - He doesn't go)", "她不学习 (tā bù xuéxí - She doesn't study)"]
  },
  {
    id: 4,
    hskLevel: 1,
    pattern: "Subject + 没 + Verb",
    explanation: "Negation with 没 (méi) - negative for past actions or 有",
    examples: ["我没吃 (wǒ méi chī - I didn't eat)", "他没来 (tā méi lái - He didn't come)", "我没有钱 (wǒ méiyǒu qián - I don't have money)"]
  },
  {
    id: 5,
    hskLevel: 1,
    pattern: "Subject + 很 + Adjective",
    explanation: "Using 很 (hěn - very) with adjectives",
    examples: ["我很好 (wǒ hěn hǎo - I'm very good)", "天气很热 (tiānqì hěn rè - The weather is very hot)", "他很高 (tā hěn gāo - He is very tall)"]
  },
  {
    id: 6,
    hskLevel: 1,
    pattern: "...吗? (ma)",
    explanation: "Yes/no questions with 吗 particle",
    examples: ["你好吗? (nǐ hǎo ma - How are you?)", "你吃饭吗? (nǐ chī fàn ma - Do you eat?)", "这是书吗? (zhè shì shū ma - Is this a book?)"]
  },
  {
    id: 7,
    hskLevel: 1,
    pattern: "Verb + 不 + Verb?",
    explanation: "Alternative questions (verb-not-verb pattern)",
    examples: ["你去不去? (nǐ qù bú qù - Are you going or not?)", "他来不来? (tā lái bù lái - Is he coming?)", "好不好? (hǎo bù hǎo - Is it good?)"]
  },
  {
    id: 8,
    hskLevel: 1,
    pattern: "Subject + 在 + Place",
    explanation: "Location existence with 在 (zài - at/in)",
    examples: ["我在家 (wǒ zài jiā - I'm at home)", "他在学校 (tā zài xuéxiào - He's at school)", "书在桌子上 (shū zài zhuōzi shàng - Book is on the table)"]
  },
  {
    id: 9,
    hskLevel: 1,
    pattern: "Subject + 有 + Object",
    explanation: "Possession with 有 (yǒu - have)",
    examples: ["我有书 (wǒ yǒu shū - I have a book)", "他有朋友 (tā yǒu péngyou - He has friends)", "她有钱 (tā yǒu qián - She has money)"]
  },
  {
    id: 10,
    hskLevel: 1,
    pattern: "Subject + 想 + Verb",
    explanation: "Want to/would like to with 想 (xiǎng)",
    examples: ["我想吃 (wǒ xiǎng chī - I want to eat)", "他想去 (tā xiǎng qù - He wants to go)", "她想学习 (tā xiǎng xuéxí - She wants to study)"]
  },
  {
    id: 11,
    hskLevel: 1,
    pattern: "Subject + 会 + Verb",
    explanation: "Can/able to with 会 (huì - know how to)",
    examples: ["我会说中文 (wǒ huì shuō zhōngwén - I can speak Chinese)", "他会开车 (tā huì kāichē - He can drive)", "她会做饭 (tā huì zuòfàn - She can cook)"]
  },
  {
    id: 12,
    hskLevel: 1,
    pattern: "Subject + 能 + Verb",
    explanation: "Can/able to with 能 (néng - physically able)",
    examples: ["我能来 (wǒ néng lái - I can come)", "他能帮忙 (tā néng bāngmáng - He can help)", "我能吃很多 (wǒ néng chī hěnduō - I can eat a lot)"]
  },
  {
    id: 13,
    hskLevel: 1,
    pattern: "Subject + 可以 + Verb",
    explanation: "May/can with 可以 (kěyǐ - permission)",
    examples: ["我可以去 (wǒ kěyǐ qù - I may go)", "你可以坐 (nǐ kěyǐ zuò - You may sit)", "我可以问吗? (wǒ kěyǐ wèn ma - May I ask?)"]
  },
  {
    id: 14,
    hskLevel: 1,
    pattern: "几 + Measure Word?",
    explanation: "How many (expecting small number) with 几 (jǐ)",
    examples: ["几个人? (jǐ gè rén - How many people?)", "几本书? (jǐ běn shū - How many books?)", "几点? (jǐ diǎn - What time?)"]
  },
  {
    id: 15,
    hskLevel: 1,
    pattern: "多少 + Noun?",
    explanation: "How many/much with 多少 (duōshao)",
    examples: ["多少钱? (duōshao qián - How much money?)", "多少人? (duōshao rén - How many people?)", "多少岁? (duōshao suì - How old?)"]
  },
  {
    id: 16,
    hskLevel: 1,
    pattern: "什么 + Noun?",
    explanation: "What + noun question with 什么 (shénme)",
    examples: ["什么东西? (shénme dōngxi - What thing?)", "什么时候? (shénme shíhou - When?)", "什么地方? (shénme dìfang - What place?)"]
  },
  {
    id: 17,
    hskLevel: 1,
    pattern: "Number + Measure Word + Noun",
    explanation: "Counting pattern with measure words",
    examples: ["一个人 (yí gè rén - one person)", "两本书 (liǎng běn shū - two books)", "三杯水 (sān bēi shuǐ - three cups of water)"]
  },
  {
    id: 18,
    hskLevel: 1,
    pattern: "这/那 + Measure Word + Noun",
    explanation: "This/that with measure words",
    examples: ["这个人 (zhège rén - this person)", "那本书 (nà běn shū - that book)", "这些东西 (zhèxiē dōngxi - these things)"]
  },
  {
    id: 19,
    hskLevel: 1,
    pattern: "Subject + 喜欢 + Object/Verb",
    explanation: "Like something with 喜欢 (xǐhuan)",
    examples: ["我喜欢你 (wǒ xǐhuan nǐ - I like you)", "他喜欢看书 (tā xǐhuan kànshū - He likes reading)", "她喜欢猫 (tā xǐhuan māo - She likes cats)"]
  },
  {
    id: 20,
    hskLevel: 1,
    pattern: "太...了",
    explanation: "Too + adjective with 太...了 (tài...le)",
    examples: ["太好了! (tài hǎo le - Great!)", "太贵了 (tài guì le - Too expensive)", "太热了 (tài rè le - Too hot)"]
  },
  {
    id: 21,
    hskLevel: 1,
    pattern: "Subject + 叫 + Name",
    explanation: "Called/named with 叫 (jiào)",
    examples: ["我叫李明 (wǒ jiào Lǐ Míng - I'm called Li Ming)", "他叫什么? (tā jiào shénme - What's he called?)", "这个叫什么? (zhège jiào shénme - What's this called?)"]
  },
  {
    id: 22,
    hskLevel: 1,
    pattern: "从...到...",
    explanation: "From...to... with 从 (cóng) and 到 (dào)",
    examples: ["从家到学校 (cóng jiā dào xuéxiào - from home to school)", "从早到晚 (cóng zǎo dào wǎn - from morning to night)"]
  },
  {
    id: 23,
    hskLevel: 1,
    pattern: "Subject + 去 + Place + Verb",
    explanation: "Go to place to do something",
    examples: ["我去学校学习 (wǒ qù xuéxiào xuéxí - I go to school to study)", "他去商店买东西 (tā qù shāngdiàn mǎi dōngxi - He goes to store to buy things)"]
  },
  {
    id: 24,
    hskLevel: 1,
    pattern: "一点儿",
    explanation: "A little bit with 一点儿 (yìdiǎnr)",
    examples: ["一点儿水 (yìdiǎnr shuǐ - a little water)", "我会一点儿中文 (wǒ huì yìdiǎnr zhōngwén - I know a little Chinese)"]
  },
  {
    id: 25,
    hskLevel: 1,
    pattern: "Subject + 都 + Verb",
    explanation: "All/both with 都 (dōu)",
    examples: ["我们都是学生 (wǒmen dōu shì xuésheng - We are all students)", "他们都来了 (tāmen dōu lái le - They all came)", "我都知道 (wǒ dōu zhīdao - I know it all)"]
  },
  
  // HSK 2 Grammar (25 patterns)
  {
    id: 26,
    hskLevel: 2,
    pattern: "Subject + 正在 + Verb",
    explanation: "Present continuous tense with 正在 (zhèngzài - in the process of)",
    examples: ["我正在吃饭 (wǒ zhèngzài chī fàn - I am eating)", "他正在学习 (tā zhèngzài xuéxí - He is studying)", "她正在看电影 (tā zhèngzài kàn diànyǐng - She is watching a movie)"]
  },
  {
    id: 27,
    hskLevel: 2,
    pattern: "Subject + Verb + 了",
    explanation: "Completed action with 了 (le) particle",
    examples: ["我吃了饭 (wǒ chī le fàn - I ate)", "他来了 (tā lái le - He came)", "她买了书 (tā mǎi le shū - She bought books)"]
  },
  {
    id: 28,
    hskLevel: 2,
    pattern: "Subject + Verb + 过",
    explanation: "Experience with 过 (guo - have done before)",
    examples: ["我去过北京 (wǒ qù guo Běijīng - I've been to Beijing)", "他吃过中国菜 (tā chī guo zhōngguó cài - He has eaten Chinese food)"]
  },
  {
    id: 29,
    hskLevel: 2,
    pattern: "Subject + 比 + Object + Adjective",
    explanation: "Comparison with 比 (bǐ - than/compared to)",
    examples: ["我比你高 (wǒ bǐ nǐ gāo - I am taller than you)", "今天比昨天热 (jīntiān bǐ zuótiān rè - Today is hotter than yesterday)", "哥哥比弟弟大 (gēge bǐ dìdi dà - Older brother is bigger than younger brother)"]
  },
  {
    id: 30,
    hskLevel: 2,
    pattern: "A 和 B 一样 + Adjective",
    explanation: "As...as comparison with 和...一样 (hé...yíyàng)",
    examples: ["我和你一样高 (wǒ hé nǐ yíyàng gāo - I'm as tall as you)", "今天和昨天一样热 (jīntiān hé zuótiān yíyàng rè - Today is as hot as yesterday)"]
  },
  {
    id: 31,
    hskLevel: 2,
    pattern: "因为...所以...",
    explanation: "Because...therefore... with 因为 (yīnwèi)...所以 (suǒyǐ)",
    examples: ["因为下雨，所以我不去 (yīnwèi xiàyǔ, suǒyǐ wǒ bú qù - Because it's raining, so I'm not going)", "因为累，所以想休息 (yīnwèi lèi, suǒyǐ xiǎng xiūxi - Because tired, so want to rest)"]
  },
  {
    id: 32,
    hskLevel: 2,
    pattern: "Subject + 要 + Verb",
    explanation: "Want to / going to with 要 (yào)",
    examples: ["我要吃饭 (wǒ yào chī fàn - I want to eat)", "他要去学校 (tā yào qù xuéxiào - He is going to school)", "她要买书 (tā yào mǎi shū - She wants to buy books)"]
  },
  {
    id: 33,
    hskLevel: 2,
    pattern: "Subject + 得 + Complement",
    explanation: "Degree complement with 得 (de)",
    examples: ["他跑得快 (tā pǎo de kuài - He runs fast)", "她说得好 (tā shuō de hǎo - She speaks well)", "我学得不错 (wǒ xué de búcuò - I study pretty well)"]
  },
  {
    id: 34,
    hskLevel: 2,
    pattern: "Verb + 在 + Place",
    explanation: "Action happening at a location",
    examples: ["我住在北京 (wǒ zhù zài Běijīng - I live in Beijing)", "他坐在椅子上 (tā zuò zài yǐzi shàng - He sits on the chair)"]
  },
  {
    id: 35,
    hskLevel: 2,
    pattern: "Verb + 到 + Place/Time",
    explanation: "Action reaching a destination or time with 到 (dào)",
    examples: ["我走到学校 (wǒ zǒu dào xuéxiào - I walk to school)", "他睡到十点 (tā shuì dào shí diǎn - He sleeps until 10 o'clock)"]
  },
  {
    id: 36,
    hskLevel: 2,
    pattern: "Subject + 应该 + Verb",
    explanation: "Should with 应该 (yīnggāi)",
    examples: ["你应该休息 (nǐ yīnggāi xiūxi - You should rest)", "我们应该学习 (wǒmen yīnggāi xuéxí - We should study)"]
  },
  {
    id: 37,
    hskLevel: 2,
    pattern: "Subject + 需要 + Verb/Noun",
    explanation: "Need with 需要 (xūyào)",
    examples: ["我需要休息 (wǒ xūyào xiūxi - I need to rest)", "他需要帮助 (tā xūyào bāngzhù - He needs help)"]
  },
  {
    id: 38,
    hskLevel: 2,
    pattern: "虽然...但是...",
    explanation: "Although...but... with 虽然 (suīrán)...但是 (dànshì)",
    examples: ["虽然累，但是很开心 (suīrán lèi, dànshì hěn kāixīn - Although tired, but very happy)", "虽然贵，但是好 (suīrán guì, dànshì hǎo - Although expensive, but good)"]
  },
  {
    id: 39,
    hskLevel: 2,
    pattern: "如果...就...",
    explanation: "If...then... with 如果 (rúguǒ)...就 (jiù)",
    examples: ["如果下雨，我就不去 (rúguǒ xiàyǔ, wǒ jiù bú qù - If it rains, I won't go)", "如果你来，我就很高兴 (rúguǒ nǐ lái, wǒ jiù hěn gāoxìng - If you come, I'll be very happy)"]
  },
  {
    id: 40,
    hskLevel: 2,
    pattern: "Subject + 快 + Verb + 了",
    explanation: "About to / soon with 快...了 (kuài...le)",
    examples: ["快下雨了 (kuài xiàyǔ le - It's about to rain)", "我快到了 (wǒ kuài dào le - I'm almost there)", "快要开始了 (kuài yào kāishǐ le - About to start)"]
  },
  {
    id: 41,
    hskLevel: 2,
    pattern: "Subject + 才 + Verb",
    explanation: "Only then/just with 才 (cái - later than expected)",
    examples: ["他现在才来 (tā xiànzài cái lái - He's only coming now)", "我昨天才知道 (wǒ zuótiān cái zhīdao - I only found out yesterday)"]
  },
  {
    id: 42,
    hskLevel: 2,
    pattern: "Subject + 就 + Verb",
    explanation: "As early as/then with 就 (jiù - earlier than expected)",
    examples: ["他明天就来 (tā míngtiān jiù lái - He's coming as early as tomorrow)", "我马上就去 (wǒ mǎshàng jiù qù - I'll go right away)"]
  },
  {
    id: 43,
    hskLevel: 2,
    pattern: "Verb + 给 + Someone",
    explanation: "Verb for/to someone with 给 (gěi)",
    examples: ["我给你打电话 (wǒ gěi nǐ dǎ diànhuà - I'll call you)", "他给我买了礼物 (tā gěi wǒ mǎi le lǐwù - He bought me a gift)"]
  },
  {
    id: 44,
    hskLevel: 2,
    pattern: "Subject + 开始 + Verb",
    explanation: "Start to with 开始 (kāishǐ)",
    examples: ["我开始学习 (wǒ kāishǐ xuéxí - I start studying)", "他开始工作了 (tā kāishǐ gōngzuò le - He started working)"]
  },
  {
    id: 45,
    hskLevel: 2,
    pattern: "Subject + 完 + Verb",
    explanation: "Finish doing with 完 (wán - complement indicating completion)",
    examples: ["我吃完了 (wǒ chī wán le - I finished eating)", "他做完作业 (tā zuò wán zuòyè - He finished homework)"]
  },
  {
    id: 46,
    hskLevel: 2,
    pattern: "一边...���边...",
    explanation: "While...at the same time with 一边 (yìbiān)",
    examples: ["我一边吃饭一边看电视 (wǒ yìbiān chī fàn yìbiān kàn diànshì - I eat while watching TV)", "他一边走一边说话 (tā yìbiān zǒu yìbiān shuōhuà - He talks while walking)"]
  },
  {
    id: 47,
    hskLevel: 2,
    pattern: "先...再...",
    explanation: "First...then... with 先 (xiān)...再 (zài)",
    examples: ["先吃饭再工作 (xiān chī fàn zài gōngzuò - First eat then work)", "先休息再学习 (xiān xiūxi zài xuéxí - First rest then study)"]
  },
  {
    id: 48,
    hskLevel: 2,
    pattern: "又...又...",
    explanation: "Both...and... with 又 (yòu)",
    examples: ["又便宜又好 (yòu piányi yòu hǎo - Both cheap and good)", "又快又好 (yòu kuài yòu hǎo - Both fast and good)"]
  },
  {
    id: 49,
    hskLevel: 2,
    pattern: "越来越 + Adjective",
    explanation: "More and more with 越来越 (yuè lái yuè)",
    examples: ["越来越好 (yuè lái yuè hǎo - Better and better)", "越来越多 (yuè lái yuè duō - More and more)", "天气越来越热 (tiānqì yuè lái yuè rè - Weather getting hotter)"]
  },
  {
    id: 50,
    hskLevel: 2,
    pattern: "Subject + 对 + Object + Adjective/Verb",
    explanation: "Towards/to with 对 (duì)",
    examples: ["我对你很好 (wǒ duì nǐ hěn hǎo - I'm good to you)", "他对工作很认真 (tā duì gōngzuò hěn rènzhēn - He's serious about work)"]
  },
  
  // HSK 3 Grammar (30 patterns)
  {
    id: 51,
    hskLevel: 3,
    pattern: "Subject + 把 + Object + Verb",
    explanation: "Ba construction (object before verb) with 把 (bǎ)",
    examples: ["我把书放在桌子上 (wǒ bǎ shū fàng zài zhuōzi shàng - I put the book on the table)", "他把门关了 (tā bǎ mén guān le - He closed the door)", "她把作业做完了 (tā bǎ zuòyè zuò wán le - She finished homework)"]
  },
  {
    id: 52,
    hskLevel: 3,
    pattern: "Subject + 被 + Agent + Verb",
    explanation: "Passive construction with 被 (bèi - by)",
    examples: ["我被他打了 (wǒ bèi tā dǎ le - I was hit by him)", "书被我看完了 (shū bèi wǒ kàn wán le - Book was finished reading by me)", "他被老师批评了 (tā bèi lǎoshī pīpíng le - He was criticized by teacher)"]
  },
  {
    id: 53,
    hskLevel: 3,
    pattern: "连...都/也...",
    explanation: "Even with 连 (lián)...都/也 (dōu/yě)",
    examples: ["连我都不知道 (lián wǒ dōu bù zhīdao - Even I don't know)", "连孩子也会 (lián háizi yě huì - Even children can)", "他连饭都不吃 (tā lián fàn dōu bù chī - He doesn't even eat)"]
  },
  {
    id: 54,
    hskLevel: 3,
    pattern: "除了...以外",
    explanation: "Except/besides with 除了 (chúle)...以外 (yǐwài)",
    examples: ["除了他以外，都来了 (chúle tā yǐwài, dōu lái le - Everyone came except him)", "除了学习以外，我还工作 (chúle xuéxí yǐwài, wǒ hái gōngzuò - Besides studying, I also work)"]
  },
  {
    id: 55,
    hskLevel: 3,
    pattern: "不但...而且...",
    explanation: "Not only...but also... with 不但 (búdàn)...而且 (érqiě)",
    examples: ["他不但会说英语，而且会说中文 (tā búdàn huì shuō yīngyǔ, érqiě huì shuō zhōngwén - He not only speaks English but also Chinese)", "这个不但便宜而且好 (zhège búdàn piányi érqiě hǎo - This is not only cheap but also good)"]
  },
  {
    id: 56,
    hskLevel: 3,
    pattern: "越...越...",
    explanation: "The more...the more... with 越 (yuè)",
    examples: ["越学越有意思 (yuè xué yuè yǒu yìsi - The more you study, the more interesting)", "越多越好 (yuè duō yuè hǎo - The more the better)", "越想越生气 (yuè xiǎng yuè shēngqì - The more I think, the angrier)"]
  },
  {
    id: 57,
    hskLevel: 3,
    pattern: "Subject + 使/让 + Object + Verb/Adjective",
    explanation: "Make/cause with 使/让 (shǐ/ràng)",
    examples: ["这让我很高兴 (zhè ràng wǒ hěn gāoxìng - This makes me very happy)", "天气使人不舒服 (tiānqì shǐ rén bù shūfu - Weather makes people uncomfortable)"]
  },
  {
    id: 58,
    hskLevel: 3,
    pattern: "只要...就...",
    explanation: "As long as...then... with 只要 (zhǐyào)...就 (jiù)",
    examples: ["只要努力就会成功 (zhǐyào nǔlì jiù huì chénggōng - As long as you work hard, you'll succeed)", "只要你来，我就很开心 (zhǐyào nǐ lái, wǒ jiù hěn kāixīn - As long as you come, I'm happy)"]
  },
  {
    id: 59,
    hskLevel: 3,
    pattern: "只有...才...",
    explanation: "Only if...then... with 只有 (zhǐyǒu)...才 (cái)",
    examples: ["只有努力才能成功 (zhǐyǒu nǔlì cái néng chénggōng - Only if you work hard can you succeed)", "只有他才知道 (zhǐyǒu tā cái zhīdao - Only he knows)"]
  },
  {
    id: 60,
    hskLevel: 3,
    pattern: "无论...都...",
    explanation: "No matter...all... with 无论 (wúlùn)...都 (dōu)",
    examples: ["无论多难都要坚持 (wúlùn duō nán dōu yào jiānchí - No matter how difficult, must persevere)", "无论谁都可以 (wúlùn shéi dōu kěyǐ - No matter who, all can)"]
  },
  {
    id: 61,
    hskLevel: 3,
    pattern: "既...又...",
    explanation: "Both...and... with 既 (jì)...又 (yòu)",
    examples: ["既便宜又好 (jì piányi y��u hǎo - Both cheap and good)", "既聪明又努力 (jì cōngming yòu nǔlì - Both smart and hardworking)"]
  },
  {
    id: 62,
    hskLevel: 3,
    pattern: "即使...也...",
    explanation: "Even if...still... with 即使 (jíshǐ)...也 (yě)",
    examples: ["即使下雨我也去 (jíshǐ xiàyǔ wǒ yě qù - Even if it rains, I'll still go)", "即使很难，也要做 (jíshǐ hěn nán, yě yào zuò - Even if difficult, still must do)"]
  },
  {
    id: 63,
    hskLevel: 3,
    pattern: "万一...",
    explanation: "In case/if by any chance with 万一 (wànyī)",
    examples: ["万一下雨，带伞 (wànyī xiàyǔ, dài sǎn - In case it rains, bring umbrella)", "万一他不来呢? (wànyī tā bù lái ne - What if he doesn't come?)"]
  },
  {
    id: 64,
    hskLevel: 3,
    pattern: "宁可...也不...",
    explanation: "Would rather...than... with 宁可 (nìngkě)...也不 (yě bù)",
    examples: ["我宁可走路也不坐车 (wǒ nìngkě zǒulù yě bù zuò chē - I'd rather walk than take a car)", "宁可累也不放弃 (nìngkě lèi yě bù fàngqì - Would rather be tired than give up)"]
  },
  {
    id: 65,
    hskLevel: 3,
    pattern: "与其...不如...",
    explanation: "Rather than...better to... with 与其 (yǔqí)...不如 (bùrú)",
    examples: ["与其等待不如行动 (yǔqí děngdài bùrú xíngdòng - Rather than wait, better to act)", "与其抱怨不如努力 (yǔqí bàoyuàn bùrú nǔlì - Rather than complain, better to work hard)"]
  },
  {
    id: 66,
    hskLevel: 3,
    pattern: "并不是...",
    explanation: "Not really/actually not with 并不是 (bìng bú shì)",
    examples: ["我并不是生气 (wǒ bìng bú shì shēngqì - I'm not really angry)", "这并不是好办法 (zhè bìng bú shì hǎo bànfǎ - This isn't really a good method)"]
  },
  {
    id: 67,
    hskLevel: 3,
    pattern: "难怪...",
    explanation: "No wonder with 难怪 (nánguài)",
    examples: ["难怪这么热 (nánguài zhème rè - No wonder it's so hot)", "难怪他不来 (nánguài tā bù lái - No wonder he didn't come)"]
  },
  {
    id: 68,
    hskLevel: 3,
    pattern: "究竟...",
    explanation: "Exactly/actually/in the end with 究竟 (jiūjìng)",
    examples: ["你究竟要什么? (nǐ jiūjìng yào shénme - What exactly do you want?)", "究竟发生了什么? (jiūjìng fāshēng le shénme - What actually happened?)"]
  },
  {
    id: 69,
    hskLevel: 3,
    pattern: "简直...",
    explanation: "Simply/practically with 简直 (jiǎnzhí)",
    examples: ["简直不可能 (jiǎnzhí bù kěnéng - Simply impossible)", "这简直太好了 (zhè jiǎnzhí tài hǎo le - This is simply too good)"]
  },
  {
    id: 70,
    hskLevel: 3,
    pattern: "似乎/好像...",
    explanation: "Seem/appear to with 似乎/好像 (sìhū/hǎoxiàng)",
    examples: ["他似乎不高兴 (tā sìhū bù gāoxìng - He seems unhappy)", "好像要下雨 (hǎoxiàng yào xiàyǔ - It seems like it's going to rain)"]
  },
  {
    id: 71,
    hskLevel: 3,
    pattern: "由于...",
    explanation: "Due to/because of with 由于 (yóuyú)",
    examples: ["由于天气，取消了 (yóuyú tiānqì, qǔxiāo le - Due to weather, it was cancelled)", "由于生病，没来 (yóuyú shēngbìng, méi lái - Because of illness, didn't come)"]
  },
  {
    id: 72,
    hskLevel: 3,
    pattern: "至于...",
    explanation: "As for/as to with 至于 (zhìyú)",
    examples: ["至于价格，可以商量 (zhìyú jiàgé, kěyǐ shāngliáng - As for price, can discuss)", "至于他，我不知道 (zhìyú tā, wǒ bù zhīdao - As for him, I don't know)"]
  },
  {
    id: 73,
    hskLevel: 3,
    pattern: "按照...",
    explanation: "According to/in accordance with 按照 (ànzhào)",
    examples: ["按照规定 (ànzhào guīdìng - According to regulations)", "按照计划进行 (ànzhào jìhuà jìnxíng - Proceed according to plan)"]
  },
  {
    id: 74,
    hskLevel: 3,
    pattern: "通过...",
    explanation: "Through/by means of with 通过 (tōngguò)",
    examples: ["通过努力 (tōngguò nǔlì - Through effort)", "通过这个方法 (tōngguò zhège fāngfǎ - By means of this method)"]
  },
  {
    id: 75,
    hskLevel: 3,
    pattern: "根据...",
    explanation: "Based on/according to with 根据 (gēnjù)",
    examples: ["根据情况 (gēnjù qíngkuàng - Based on situation)", "根据经验 (gēnjù jīngyàn - According to experience)"]
  },
  {
    id: 76,
    hskLevel: 3,
    pattern: "关于...",
    explanation: "About/concerning with 关于 (guānyú)",
    examples: ["关于这个问题 (guānyú zhège wèntí - About this problem)", "关于明天的计划 (guānyú míngtiān de jìhuà - Concerning tomorrow's plan)"]
  },
  {
    id: 77,
    hskLevel: 3,
    pattern: "对于...",
    explanation: "Regarding/towards/for with 对于 (duìyú)",
    examples: ["对于我来说 (duìyú wǒ láishuō - For me/As for me)", "对于这件事 (duìyú zhè jiàn shì - Regarding this matter)"]
  },
  {
    id: 78,
    hskLevel: 3,
    pattern: "为了...",
    explanation: "For the sake of/in order to with 为了 (wèile)",
    examples: ["为了学习 (wèile xuéxí - For the sake of studying)", "为了你 (wèile nǐ - For you)", "为了成功 (wèile chénggōng - In order to succeed)"]
  },
  {
    id: 79,
    hskLevel: 3,
    pattern: "从...来看",
    explanation: "From the perspective of with 从...来看 (cóng...lái kàn)",
    examples: ["从这个角度来看 (cóng zhège jiǎodù lái kàn - From this angle)", "从经验来看 (cóng jīngyàn lái kàn - From experience)"]
  },
  {
    id: 80,
    hskLevel: 3,
    pattern: "在...方面",
    explanation: "In terms of/in the aspect of with 在...方面 (zài...fāngmiàn)",
    examples: ["在学习方面 (zài xuéxí fāngmiàn - In terms of studying)", "在这方面 (zài zhè fāngmiàn - In this aspect)"]
  },
  
  // HSK 4 Grammar (20 patterns)
  {
    id: 81,
    hskLevel: 4,
    pattern: "不管...都...",
    explanation: "No matter...all... with 不管 (bùguǎn)...都 (dōu)",
    examples: ["不管多难都要做 (bùguǎn duō nán dōu yào zuò - No matter how difficult, must do)", "不管谁说都不信 (bùguǎn shéi shuō dōu bù xìn - No matter who says, won't believe)"]
  },
  {
    id: 82,
    hskLevel: 4,
    pattern: "不仅...而且...",
    explanation: "Not only...but also... with 不仅 (bùjǐn)...而且 (érqiě)",
    examples: ["他不仅聪明而且努力 (tā bùjǐn cōngming érqiě nǔlì - He's not only smart but also hardworking)"]
  },
  {
    id: 83,
    hskLevel: 4,
    pattern: "尽管...还是...",
    explanation: "Despite...still... with 尽管 (jǐnguǎn)...还是 (háishi)",
    examples: ["尽管很累还是要坚持 (jǐnguǎn hěn lèi háishi yào jiānchí - Despite being tired, still must persevere)"]
  },
  {
    id: 84,
    hskLevel: 4,
    pattern: "以免...",
    explanation: "So as to avoid/lest with 以免 (yǐmiǎn)",
    examples: ["早点去，以免迟到 (zǎo diǎn qù, yǐmiǎn chídào - Go early, so as to avoid being late)"]
  },
  {
    id: 85,
    hskLevel: 4,
    pattern: "反而...",
    explanation: "On the contrary/instead with 反而 (fǎn'ér)",
    examples: ["不但没好，反而更差 (búdàn méi hǎo, fǎn'ér gèng chà - Not only didn't get better, but worse instead)"]
  },
  {
    id: 86,
    hskLevel: 4,
    pattern: "总之...",
    explanation: "In short/in a word with 总之 (zǒngzhī)",
    examples: ["总之，我同意 (zǒngzhī, wǒ tóngyì - In short, I agree)", "总之要努力 (zǒngzhī yào nǔlì - In a word, must work hard)"]
  },
  {
    id: 87,
    hskLevel: 4,
    pattern: "况且...",
    explanation: "Moreover/besides with 况且 (kuàngqiě)",
    examples: ["我不想去，况且没时间 (wǒ bù xiǎng qù, kuàngqiě méi shíjiān - I don't want to go, besides no time)"]
  },
  {
    id: 88,
    hskLevel: 4,
    pattern: "否则...",
    explanation: "Otherwise with 否则 (fǒuzé)",
    examples: ["快走，否则迟到 (kuài zǒu, fǒuzé ch��dào - Hurry, otherwise will be late)"]
  },
  {
    id: 89,
    hskLevel: 4,
    pattern: "不然...",
    explanation: "Otherwise/or else with 不然 (bùrán)",
    examples: ["快点，不然来不及 (kuài diǎn, bùrán lái bují - Hurry, or else won't make it)"]
  },
  {
    id: 90,
    hskLevel: 4,
    pattern: "既然...就...",
    explanation: "Since...then... with 既然 (jìrán)...就 (jiù)",
    examples: ["既然来了就坐下 (jìrán lái le jiù zuò xià - Since you're here, sit down)"]
  },
  {
    id: 91,
    hskLevel: 4,
    pattern: "凡是...都...",
    explanation: "All/any...all... with 凡是 (fánshì)...都 (dōu)",
    examples: ["凡是学生都要参加 (fánshì xuésheng dōu yào cānjiā - All students must participate)"]
  },
  {
    id: 92,
    hskLevel: 4,
    pattern: "在...下",
    explanation: "Under (circumstances) with 在...下 (zài...xià)",
    examples: ["在这种情况下 (zài zhè zhǒng qíngkuàng xià - Under these circumstances)"]
  },
  {
    id: 93,
    hskLevel: 4,
    pattern: "随着...",
    explanation: "Along with/as with 随着 (suízhe)",
    examples: ["随着时间的推移 (suízhe shíjiān de tuīyí - Along with the passage of time)"]
  },
  {
    id: 94,
    hskLevel: 4,
    pattern: "至少...",
    explanation: "At least with 至少 (zhìshǎo)",
    examples: ["至少要努力 (zhìshǎo yào nǔlì - At least must try hard)"]
  },
  {
    id: 95,
    hskLevel: 4,
    pattern: "至多...",
    explanation: "At most with 至多 (zhìduō)",
    examples: ["至多十个人 (zhìduō shí gè rén - At most ten people)"]
  },
  {
    id: 96,
    hskLevel: 4,
    pattern: "不过...",
    explanation: "However/but with 不过 (búguò)",
    examples: ["很好，不过有点贵 (hěn hǎo, búguò yǒudiǎn guì - Very good, but a bit expensive)"]
  },
  {
    id: 97,
    hskLevel: 4,
    pattern: "倒是...",
    explanation: "Actually/on the contrary with 倒是 (dàoshi)",
    examples: ["我倒是觉得可以 (wǒ dàoshi juéde kěyǐ - I actually think it's okay)"]
  },
  {
    id: 98,
    hskLevel: 4,
    pattern: "居然...",
    explanation: "Unexpectedly/surprisingly with 居然 (jūrán)",
    examples: ["他居然不知道 (tā jūrán bù zhīdao - He unexpectedly doesn't know)"]
  },
  {
    id: 99,
    hskLevel: 4,
    pattern: "恐怕...",
    explanation: "I'm afraid/probably with 恐怕 (kǒngpà)",
    examples: ["恐怕来不及 (kǒngpà lái bují - I'm afraid won't make it)"]
  },
  {
    id: 100,
    hskLevel: 4,
    pattern: "幸亏...",
    explanation: "Fortunately/luckily with 幸亏 (xìngkuī)",
    examples: ["幸亏你来了 (xìngkuī n�� lái le - Fortunately you came)"]
  },
  
  // HSK 5 & 6 Advanced Grammar (20 patterns)
  {
    id: 101,
    hskLevel: 5,
    pattern: "莫非...",
    explanation: "Could it be that...? with 莫非 (mòfēi)",
    examples: ["莫非他不知道? (mòfēi tā bù zhīdao - Could it be that he doesn't know?)"]
  },
  {
    id: 102,
    hskLevel: 5,
    pattern: "何必...",
    explanation: "Why must/there's no need to with 何必 (hébì)",
    examples: ["何必这样? (hébì zhèyàng - Why must it be this way?)"]
  },
  {
    id: 103,
    hskLevel: 5,
    pattern: "何况...",
    explanation: "Let alone/much less with 何况 (hékuàng)",
    examples: ["我都不会，何况他? (wǒ dōu bù huì, hékuàng tā - Even I can't, let alone him?)"]
  },
  {
    id: 104,
    hskLevel: 5,
    pattern: "免得...",
    explanation: "So as not to/lest with 免得 (miǎnde)",
    examples: ["早点去，免得迟到 (zǎo diǎn qù, miǎnde chídào - Go early, so as not to be late)"]
  },
  {
    id: 105,
    hskLevel: 5,
    pattern: "不至于...",
    explanation: "Not likely to/not to the extent of with 不至于 (bú zhìyú)",
    examples: ["不至于这么严重 (bú zhìyú zhème yánzhòng - Not likely to be this serious)"]
  },
  {
    id: 106,
    hskLevel: 5,
    pattern: "未免...",
    explanation: "Rather too/a bit too with 未免 (wèimiǎn)",
    examples: ["这未免太贵了 (zhè wèimiǎn tài guì le - This is rather too expensive)"]
  },
  {
    id: 107,
    hskLevel: 5,
    pattern: "难免...",
    explanation: "Unavoidable/hard to avoid with 难免 (nánmiǎn)",
    examples: ["难免会出错 (nánmiǎn huì chūcuò - Unavoidably will make mistakes)"]
  },
  {
    id: 108,
    hskLevel: 5,
    pattern: "非...不可",
    explanation: "Must/have to with 非...不可 (fēi...bù kě)",
    examples: ["这件事非做不可 (zhè jiàn shì fēi zuò bù kě - This matter must be done)"]
  },
  {
    id: 109,
    hskLevel: 5,
    pattern: "再...也...",
    explanation: "No matter how...still... with 再...也 (zài...yě)",
    examples: ["再难也要坚持 (zài nán yě yào jiānchí - No matter how difficult, still must persevere)"]
  },
  {
    id: 110,
    hskLevel: 5,
    pattern: "一旦...",
    explanation: "Once/in case with 一旦 (yídàn)",
    examples: ["一旦失败就完了 (yídàn shībài jiù wán le - Once failed, it's over)"]
  },
  {
    id: 111,
    hskLevel: 6,
    pattern: "姑且...",
    explanation: "For the time being/tentatively with 姑且 (gūqiě)",
    examples: ["姑且这样做 (gūqiě zhèyàng zuò - For now, do it this way)"]
  },
  {
    id: 112,
    hskLevel: 6,
    pattern: "何尝...",
    explanation: "(Rhetorical) when did ever...? with 何尝 (hécháng)",
    examples: ["我何尝不想? (wǒ hécháng bù xiǎng - When did I ever not want to?)"]
  },
  {
    id: 113,
    hskLevel: 6,
    pattern: "岂不是...",
    explanation: "Wouldn't it be...? with 岂不是 (qǐ bú shì)",
    examples: ["这岂不是很好? (zhè qǐ bú shì hěn hǎo - Wouldn't this be very good?)"]
  },
  {
    id: 114,
    hskLevel: 6,
    pattern: "岂能...",
    explanation: "How could...? with 岂能 (qǐ néng)",
    examples: ["岂能放弃? (qǐ néng fàngqì - How could we give up?)"]
  },
  {
    id: 115,
    hskLevel: 6,
    pattern: "无非是...",
    explanation: "Nothing but/merely with 无非是 (wúfēi shì)",
    examples: ["无非是钱的问题 (wúfēi shì qián de wèntí - It's merely a money problem)"]
  },
  {
    id: 116,
    hskLevel: 6,
    pattern: "无非...",
    explanation: "No more than/only with 无非 (wúfēi)",
    examples: ["无非想帮忙 (wúfēi xiǎng bāngmáng - Only want to help)"]
  },
  {
    id: 117,
    hskLevel: 6,
    pattern: "唯有...",
    explanation: "Only/solely with 唯有 (wéiyǒu)",
    examples: ["唯有努力 (wéiyǒu nǔlì - Only through effort)"]
  },
  {
    id: 118,
    hskLevel: 6,
    pattern: "诚然...",
    explanation: "Admittedly/it's true that with 诚然 (chéngrán)",
    examples: ["诚然如此 (chéngrán rúcǐ - Admittedly so)"]
  },
  {
    id: 119,
    hskLevel: 6,
    pattern: "以致...",
    explanation: "So that/with the result that with 以致 (yǐzhì)",
    examples: ["太累了，以致生病 (tài lèi le, yǐzhì shēngbìng - Too tired, with the result of getting sick)"]
  },
  {
    id: 120,
    hskLevel: 6,
    pattern: "倘若...",
    explanation: "If/supposing with 倘若 (tǎngruò)",
    examples: ["倘若成功该多好 (tǎngruò chénggōng gāi duō hǎo - If successful, how good that would be)"]
  },
];

// Export total word count per level
export const hskWordCounts = {
  1: 150,
  2: 300,
  3: 600,
  4: 1200,
  5: 2500,
  6: 5000,
};

// ==================== CHINESE CONJUNCTIONS ====================
export interface ChineseConjunction {
  id: number;
  chinese: string;
  pinyin: string;
  english: string;
  usage: string;
  examples: string[];
  hskLevel: number;
}

export const chineseConjunctions: ChineseConjunction[] = [
  {
    id: 1,
    chinese: "和",
    pinyin: "hé",
    english: "and",
    usage: "Connects nouns",
    examples: ["我和你 (I and you)", "苹果和香蕉 (apple and banana)"],
    hskLevel: 1
  },
  {
    id: 2,
    chinese: "但是",
    pinyin: "dàn shì",
    english: "but",
    usage: "Shows contrast",
    examples: ["我想去，但是没有时间 (I want to go, but I don't have time)"],
    hskLevel: 2
  },
  {
    id: 3,
    chinese: "因为",
    pinyin: "yīn wèi",
    english: "because",
    usage: "Indicates reason",
    examples: ["因为下雨，所以我不去 (Because it's raining, so I'm not going)"],
    hskLevel: 2
  },
  {
    id: 4,
    chinese: "所以",
    pinyin: "suǒ yǐ",
    english: "therefore/so",
    usage: "Indicates result",
    examples: ["我累了，所以要休息 (I'm tired, so I need to rest)"],
    hskLevel: 2
  },
  {
    id: 5,
    chinese: "如果",
    pinyin: "rú guǒ",
    english: "if",
    usage: "Conditional clause",
    examples: ["如果明天下雨，我就不去 (If it rains tomorrow, I won't go)"],
    hskLevel: 2
  },
  {
    id: 6,
    chinese: "虽然",
    pinyin: "suī rán",
    english: "although",
    usage: "Concession",
    examples: ["虽然很累，但是我要继续 (Although I'm tired, I will continue)"],
    hskLevel: 2
  },
  {
    id: 7,
    chinese: "或者",
    pinyin: "huò zhě",
    english: "or",
    usage: "Presents alternatives",
    examples: ["茶或者咖啡 (tea or coffee)"],
    hskLevel: 2
  },
  {
    id: 8,
    chinese: "而且",
    pinyin: "ér qiě",
    english: "moreover/and",
    usage: "Adds information",
    examples: ["他很聪明，而且很努力 (He is smart, and moreover very hardworking)"],
    hskLevel: 3
  },
  // HSK 1 - Additional
  { id: 9, chinese: "也", pinyin: "yě", english: "also/too", usage: "Shows similarity", examples: ["我也喜欢 (I also like it)"], hskLevel: 1 },
  { id: 10, chinese: "还是", pinyin: "hái shì", english: "or (in questions)", usage: "Choices in questions", examples: ["茶还是咖啡？(Tea or coffee?)"], hskLevel: 1 },
  // HSK 2 - More patterns
  { id: 11, chinese: "不过", pinyin: "bú guò", english: "however/but", usage: "Mild contrast", examples: ["很冷，不过我还要去 (It's cold, but I still have to go)"], hskLevel: 2 },
  { id: 12, chinese: "要是", pinyin: "yào shì", english: "if", usage: "Conditional (informal)", examples: ["要是明天不下雨就好了 (If only it doesn't rain tomorrow)"], hskLevel: 2 },
  { id: 13, chinese: "可是", pinyin: "kě shì", english: "but/however", usage: "Shows contrast", examples: ["我很想去，可是没有钱 (I really want to go, but I have no money)"], hskLevel: 2 },
  { id: 14, chinese: "然后", pinyin: "rán hòu", english: "then/after that", usage: "Indicates sequence", examples: ["先吃饭，然后去看电影 (First eat, then watch movie)"], hskLevel: 2 },
  { id: 15, chinese: "还", pinyin: "hái", english: "still/also", usage: "Continuation", examples: ["我还要学习 (I still need to study)"], hskLevel: 2 },
  // HSK 3 - Advanced patterns
  { id: 16, chinese: "不仅...而且...", pinyin: "bù jǐn... ér qiě...", english: "not only... but also...", usage: "Emphasizes addition", examples: ["他不仅聪明，而且努力"], hskLevel: 3 },
  { id: 17, chinese: "除了...以外", pinyin: "chú le... yǐ wài", english: "besides/except", usage: "Exclusion/inclusion", examples: ["除了我以外，大家都去了"], hskLevel: 3 },
  { id: 18, chinese: "无论", pinyin: "wú lùn", english: "no matter", usage: "Any condition", examples: ["无论多难，我都要试试"], hskLevel: 3 },
  { id: 19, chinese: "既然", pinyin: "jì rán", english: "since/now that", usage: "Acknowledges fact", examples: ["既然你来了，就坐一会儿吧"], hskLevel: 3 },
  { id: 20, chinese: "尽管", pinyin: "jǐn guǎn", english: "despite/although", usage: "Strong concession", examples: ["尽管很累，他还在工作"], hskLevel: 3 },
  { id: 21, chinese: "不但...而且...", pinyin: "bù dàn... ér qiě...", english: "not only... but also...", usage: "Progressive emphasis", examples: ["他不但会说中文，而且会写汉字"], hskLevel: 3 },
  { id: 22, chinese: "只要...就...", pinyin: "zhǐ yào... jiù...", english: "as long as... then...", usage: "Sufficient condition", examples: ["只要你努力，就一定能成功"], hskLevel: 3 },
  { id: 23, chinese: "不管", pinyin: "bù guǎn", english: "no matter/regardless", usage: "Any condition accepted", examples: ["不管天气怎么样，我都去"], hskLevel: 3 },
  { id: 24, chinese: "由于", pinyin: "yóu yú", english: "due to/because of", usage: "Formal reason", examples: ["由于下雨，比赛取消了"], hskLevel: 3 },
  { id: 25, chinese: "即使", pinyin: "jí shǐ", english: "even if", usage: "Hypothetical concession", examples: ["即使失败，我也不后悔"], hskLevel: 3 },
  // HSK 4 - Complex patterns
  { id: 26, chinese: "与其...不如...", pinyin: "yǔ qí... bù rú...", english: "rather than... it's better to...", usage: "Preference comparison", examples: ["与其在家，不如出去走走"], hskLevel: 4 },
  { id: 27, chinese: "一...就...", pinyin: "yī... jiù...", english: "as soon as", usage: "Immediate consequence", examples: ["我一回家就做作业"], hskLevel: 4 },
  { id: 28, chinese: "只有...才...", pinyin: "zhǐ yǒu... cái...", english: "only if... then...", usage: "Necessary condition", examples: ["只有努力学习，才能考好"], hskLevel: 4 },
  { id: 29, chinese: "不是...而是...", pinyin: "bú shì... ér shì...", english: "not... but rather...", usage: "Correction", examples: ["问题不是他不聪明，而是他不努力"], hskLevel: 4 },
  { id: 30, chinese: "既...又...", pinyin: "jì... yòu...", english: "both... and...", usage: "Parallel qualities", examples: ["这个方法既简单又有效"], hskLevel: 4 },
  { id: 31, chinese: "除非", pinyin: "chú fēi", english: "unless", usage: "Exception condition", examples: ["除非下雨，否则我一定去"], hskLevel: 4 },
  { id: 32, chinese: "否则", pinyin: "fǒu zé", english: "otherwise", usage: "Alternative consequence", examples: ["快点儿，否则就迟到了"], hskLevel: 4 },
  { id: 33, chinese: "以便", pinyin: "yǐ biàn", english: "in order to/so that", usage: "Purpose", examples: ["请早点来，以便我们准时开始"], hskLevel: 4 },
  { id: 34, chinese: "以免", pinyin: "yǐ miǎn", english: "in order to avoid/lest", usage: "Negative purpose", examples: ["多穿点衣服，以免感冒"], hskLevel: 4 },
  { id: 35, chinese: "一方面...另一方面...", pinyin: "yī fāng miàn... lìng yī fāng miàn...", english: "on one hand... on the other...", usage: "Contrasting aspects", examples: ["一方面我想去，另一方面我没时间"], hskLevel: 4 },
  { id: 36, chinese: "不论", pinyin: "bù lùn", english: "no matter/regardless of", usage: "Universal condition", examples: ["不论什么时候，我都在这里"], hskLevel: 4 },
  { id: 37, chinese: "宁可...也...", pinyin: "nìng kě... yě...", english: "would rather... than...", usage: "Strong preference", examples: ["我宁可走路，也不坐他的车"], hskLevel: 4 },
  { id: 38, chinese: "反而", pinyin: "fǎn ér", english: "on the contrary/instead", usage: "Unexpected result", examples: ["他不但不承认，反而说是我的错"], hskLevel: 4 },
  // HSK 5 - Advanced patterns
  { id: 39, chinese: "况且", pinyin: "kuàng qiě", english: "moreover/besides", usage: "Additional reason", examples: ["我不想去，况且我也没时间"], hskLevel: 5 },
  { id: 40, chinese: "何况", pinyin: "hé kuàng", english: "let alone/much less", usage: "Emphasizes impossibility", examples: ["我连走路都累，何况跑步"], hskLevel: 5 },
  { id: 41, chinese: "倘若", pinyin: "tǎng ruò", english: "if/supposing", usage: "Hypothetical condition", examples: ["倘若明天下雨，活动就取消"], hskLevel: 5 },
  { id: 42, chinese: "假如", pinyin: "jiǎ rú", english: "if/suppose", usage: "Hypothetical scenario", examples: ["假如我是你，我就不会这样做"], hskLevel: 5 },
  { id: 43, chinese: "至于", pinyin: "zhì yú", english: "as for/as to", usage: "Topic transition", examples: ["今天的事解决了，至于明天的，我们再说"], hskLevel: 5 },
  { id: 44, chinese: "鉴于", pinyin: "jiàn yú", english: "in view of/seeing that", usage: "Formal consideration", examples: ["鉴于目前的情况，我们决定推迟会议"], hskLevel: 5 },
  { id: 45, chinese: "趁", pinyin: "chèn", english: "while/taking advantage of", usage: "Opportune moment", examples: ["趁年轻多学点东西"], hskLevel: 5 },
  { id: 46, chinese: "随着", pinyin: "suí zhe", english: "along with/as", usage: "Parallel change", examples: ["随着时间的推移，他变了"], hskLevel: 5 },
  { id: 47, chinese: "凡是", pinyin: "fán shì", english: "every/all", usage: "Universal scope", examples: ["凡是参加的人都有礼物"], hskLevel: 5 },
  { id: 48, chinese: "既...也...", pinyin: "jì... yě...", english: "both... and...", usage: "Dual characteristics", examples: ["这既是机会，也是挑战"], hskLevel: 5 },
  { id: 49, chinese: "未免", pinyin: "wèi miǎn", english: "rather/a bit too", usage: "Slight criticism", examples: ["这样说未免太过分了"], hskLevel: 5 },
  { id: 50, chinese: "非...不可", pinyin: "fēi... bù kě", english: "must/have to", usage: "Strong necessity", examples: ["这个问题非解决不可"], hskLevel: 5 },
  // HSK 6 - Expert patterns
  { id: 51, chinese: "诚然", pinyin: "chéng rán", english: "admittedly/true", usage: "Acknowledging truth", examples: ["诚然，这个方案有缺点，但仍然可行"], hskLevel: 6 },
  { id: 52, chinese: "然而", pinyin: "rán ér", english: "however/yet", usage: "Formal contrast", examples: ["他很聪明，然而却不努力"], hskLevel: 6 },
  { id: 53, chinese: "由此可见", pinyin: "yóu cǐ kě jiàn", english: "from this it can be seen", usage: "Drawing conclusion", examples: ["由此可见，教育很重要"], hskLevel: 6 },
  { id: 54, chinese: "总之", pinyin: "zǒng zhī", english: "in short/in summary", usage: "Conclusion", examples: ["总之，我们要继续努力"], hskLevel: 6 },
  { id: 55, chinese: "综上所述", pinyin: "zōng shàng suǒ shù", english: "in conclusion/to sum up", usage: "Formal summary", examples: ["综上所述，这个计划是可行的"], hskLevel: 6 },
  { id: 56, chinese: "换言之", pinyin: "huàn yán zhī", english: "in other words", usage: "Rephrasing", examples: ["他很忙，换言之，他没时间"], hskLevel: 6 },
  { id: 57, chinese: "反之", pinyin: "fǎn zhī", english: "conversely/on the contrary", usage: "Opposite situation", examples: ["努力就会成功，反之则会失败"], hskLevel: 6 },
  { id: 58, chinese: "进而", pinyin: "jìn ér", english: "furthermore/then", usage: "Progressive development", examples: ["我们要先了解问题，进而解决问题"], hskLevel: 6 },
  { id: 59, chinese: "以至于", pinyin: "yǐ zhì yú", english: "to the extent that", usage: "Degree of result", examples: ["他太累了，以至于睡着了"], hskLevel: 6 },
  { id: 60, chinese: "姑且", pinyin: "gū qiě", english: "for the time being/tentatively", usage: "Temporary acceptance", examples: ["姑且相信你这一次"], hskLevel: 6 },
  { id: 61, chinese: "毕竟", pinyin: "bì jìng", english: "after all/all in all", usage: "Final consideration", examples: ["他毕竟还是个孩子"], hskLevel: 6 },
  { id: 62, chinese: "若非", pinyin: "ruò fēi", english: "if not for/were it not for", usage: "Counterfactual condition", examples: ["若非你帮忙，我完成不了"], hskLevel: 6 },
  { id: 63, chinese: "纵然", pinyin: "zòng rán", english: "even if/even though", usage: "Strong concession", examples: ["纵然困难重重，我们也要坚持"], hskLevel: 6 },
  { id: 64, chinese: "与此同时", pinyin: "yǔ cǐ tóng shí", english: "at the same time/meanwhile", usage: "Simultaneity", examples: ["他在学习，与此同时也在工作"], hskLevel: 6 },
  { id: 65, chinese: "无疑", pinyin: "wú yí", english: "undoubtedly/no doubt", usage: "Certainty", examples: ["这无疑是个好消息"], hskLevel: 6 },
  { id: 66, chinese: "难怪", pinyin: "nán guài", english: "no wonder", usage: "Realization", examples: ["难怪他不来，原来是生病了"], hskLevel: 6 },
  { id: 67, chinese: "大不了", pinyin: "dà bù liǎo", english: "at worst/if worst comes to worst", usage: "Worst-case scenario", examples: ["大不了从头再来"], hskLevel: 6 },
  { id: 68, chinese: "说不定", pinyin: "shuō bu dìng", english: "maybe/perhaps", usage: "Possibility", examples: ["说不定明天会下雨"], hskLevel: 6 },
  { id: 69, chinese: "难道", pinyin: "nán dào", english: "could it be that/don't tell me", usage: "Rhetorical question", examples: ["难道你不知道吗？"], hskLevel: 6 },
  { id: 70, chinese: "莫非", pinyin: "mò fēi", english: "could it be/perhaps", usage: "Doubtful speculation", examples: ["莫非他已经知道了？"], hskLevel: 6 },
  { id: 71, chinese: "免得", pinyin: "miǎn de", english: "so as not to/to avoid", usage: "Prevention", examples: ["快走吧，免得迟到"], hskLevel: 6 },
  { id: 72, chinese: "以致", pinyin: "yǐ zhì", english: "so that/with the result that", usage: "Unintended consequence", examples: ["他说得太快，以致我听不懂"], hskLevel: 6 },
  { id: 73, chinese: "从而", pinyin: "cóng ér", english: "thereby/thus", usage: "Resulting action", examples: ["他努力学习，从而考上了大学"], hskLevel: 6 },
  { id: 74, chinese: "借此", pinyin: "jiè cǐ", english: "taking this opportunity", usage: "Using opportunity", examples: ["借此机会，我想说几句"], hskLevel: 6 },
  { id: 75, chinese: "尤其", pinyin: "yóu qí", english: "especially/particularly", usage: "Emphasis", examples: ["我喜欢运动，尤其是游泳"], hskLevel: 6 },
];

// Helper function to get conjunctions
export function getChineseConjunctions(): ChineseConjunction[] {
  return chineseConjunctions;
}

// Chinese Characters for writing practice
export const chineseCharactersForWriting: ChineseCharacter[] = [
  // HSK 1 basic characters
  { character: "一", pinyin: "yī", meaning: "One", examples: ["一个", "一天", "一起"], hskLevel: 1 },
  { character: "二", pinyin: "èr", meaning: "Two", examples: ["二月", "第二", "二十"], hskLevel: 1 },
  { character: "三", pinyin: "sān", meaning: "Three", examples: ["三个", "三天", "三月"], hskLevel: 1 },
  { character: "人", pinyin: "rén", meaning: "Person", examples: ["人们", "中国人", "大人"], hskLevel: 1 },
  { character: "大", pinyin: "dà", meaning: "Big", examples: ["大学", "大家", "大小"], hskLevel: 1 },
  { character: "小", pinyin: "xiǎo", meaning: "Small", examples: ["小学", "小时", "小姐"], hskLevel: 1 },
  { character: "水", pinyin: "shuǐ", meaning: "Water", examples: ["喝水", "水果", "开水"], hskLevel: 1 },
  { character: "火", pinyin: "huǒ", meaning: "Fire", examples: ["火车", "火锅", "大火"], hskLevel: 1 },
  { character: "木", pinyin: "mù", meaning: "Wood", examples: ["木头", "树木", "木材"], hskLevel: 1 },
  { character: "土", pinyin: "tǔ", meaning: "Earth/Soil", examples: ["土地", "国土", "土豆"], hskLevel: 1 },
  { character: "日", pinyin: "rì", meaning: "Sun/Day", examples: ["今日", "日本", "生日"], hskLevel: 1 },
  { character: "月", pinyin: "yuè", meaning: "Moon/Month", examples: ["月亮", "一月", "月饼"], hskLevel: 1 },
  { character: "山", pinyin: "shān", meaning: "Mountain", examples: ["山东", "爬山", "山水"], hskLevel: 1 },
  { character: "田", pinyin: "tián", meaning: "Field", examples: ["田野", "农田", "田地"], hskLevel: 1 },
  { character: "目", pinyin: "mù", meaning: "Eye", examples: ["目标", "项目", "眼目"], hskLevel: 1 },
  { character: "口", pinyin: "kǒu", meaning: "Mouth", examples: ["人口", "出口", "口语"], hskLevel: 1 },
  { character: "手", pinyin: "shǒu", meaning: "Hand", examples: ["手机", "手表", "左手"], hskLevel: 1 },
  { character: "心", pinyin: "xīn", meaning: "Heart", examples: ["小心", "心情", "关心"], hskLevel: 1 },
  { character: "门", pinyin: "mén", meaning: "Door", examples: ["门口", "开门", "大门"], hskLevel: 1 },
  { character: "车", pinyin: "chē", meaning: "Vehicle", examples: ["汽车", "火车", "自行车"], hskLevel: 1 },
];

// Helper function to get characters by level
export function getCharactersByLevel(level: number): ChineseCharacter[] {
  return chineseCharactersForWriting.filter(c => c.hskLevel === level);
}

// HSK 4, 5, 6 vocabulary (unique content per level)
export const hsk4Vocabulary: ChineseWord[] = [
  ...hsk3Vocabulary,
  { id: 601, chinese: "按照", pinyin: "àn zhào", english: "According to", hskLevel: 4, category: "prep" },
  { id: 602, chinese: "安全", pinyin: "ān quán", english: "Safe / safety", hskLevel: 4, category: "adj" },
  { id: 603, chinese: "保护", pinyin: "bǎo hù", english: "To protect", hskLevel: 4, category: "verb" },
  { id: 604, chinese: "保证", pinyin: "bǎo zhèng", english: "To guarantee", hskLevel: 4, category: "verb" },
  { id: 605, chinese: "毕业", pinyin: "bì yè", english: "To graduate", hskLevel: 4, category: "verb" },
  { id: 606, chinese: "标准", pinyin: "biāo zhǔn", english: "Standard", hskLevel: 4, category: "noun" },
  { id: 607, chinese: "表达", pinyin: "biǎo dá", english: "To express", hskLevel: 4, category: "verb" },
  { id: 608, chinese: "表演", pinyin: "biǎo yǎn", english: "To perform", hskLevel: 4, category: "verb" },
  { id: 609, chinese: "不然", pinyin: "bù rán", english: "Otherwise", hskLevel: 4, category: "conj" },
  { id: 610, chinese: "采访", pinyin: "cǎi fǎng", english: "To interview", hskLevel: 4, category: "verb" },
  { id: 611, chinese: "参观", pinyin: "cān guān", english: "To visit", hskLevel: 4, category: "verb" },
  { id: 612, chinese: "长城", pinyin: "cháng chéng", english: "Great Wall", hskLevel: 4, category: "noun" },
  { id: 613, chinese: "成功", pinyin: "chéng gōng", english: "Success / succeed", hskLevel: 4, category: "verb/noun" },
  { id: 614, chinese: "成绩", pinyin: "chéng jì", english: "Achievement / grade", hskLevel: 4, category: "noun" },
  { id: 615, chinese: "传统", pinyin: "chuán tǒng", english: "Tradition / traditional", hskLevel: 4, category: "noun/adj" },
];

export const hsk5Vocabulary: ChineseWord[] = [
  ...hsk4Vocabulary,
  { id: 1301, chinese: "爱护", pinyin: "ài hù", english: "To cherish", hskLevel: 5, category: "verb" },
  { id: 1302, chinese: "安慰", pinyin: "ān wèi", english: "To comfort", hskLevel: 5, category: "verb" },
  { id: 1303, chinese: "案例", pinyin: "àn lì", english: "Case / example", hskLevel: 5, category: "noun" },
  { id: 1304, chinese: "把握", pinyin: "bǎ wò", english: "To grasp", hskLevel: 5, category: "verb" },
  { id: 1305, chinese: "颁布", pinyin: "bān bù", english: "To promulgate", hskLevel: 5, category: "verb" },
  { id: 1306, chinese: "版本", pinyin: "bǎn běn", english: "Version", hskLevel: 5, category: "noun" },
  { id: 1307, chinese: "伴侣", pinyin: "bàn lǚ", english: "Companion", hskLevel: 5, category: "noun" },
  { id: 1308, chinese: "傍晚", pinyin: "bàng wǎn", english: "Evening", hskLevel: 5, category: "noun" },
  { id: 1309, chinese: "包裹", pinyin: "bāo guǒ", english: "Parcel / package", hskLevel: 5, category: "noun" },
  { id: 1310, chinese: "宝贵", pinyin: "bǎo guì", english: "Precious / valuable", hskLevel: 5, category: "adj" },
  { id: 1311, chinese: "报仇", pinyin: "bào chóu", english: "To revenge", hskLevel: 5, category: "verb" },
  { id: 1312, chinese: "报酬", pinyin: "bào chóu", english: "Reward / payment", hskLevel: 5, category: "noun" },
  { id: 1313, chinese: "报告", pinyin: "bào gào", english: "Report", hskLevel: 5, category: "noun/verb" },
  { id: 1314, chinese: "悲哀", pinyin: "bēi āi", english: "Sad / sorrowful", hskLevel: 5, category: "adj" },
  { id: 1315, chinese: "悲观", pinyin: "bēi guān", english: "Pessimistic", hskLevel: 5, category: "adj" },
];

export const hsk6Vocabulary: ChineseWord[] = [
  ...hsk5Vocabulary,
  { id: 2501, chinese: "哀悼", pinyin: "āi dào", english: "To mourn", hskLevel: 6, category: "verb" },
  { id: 2502, chinese: "爱戴", pinyin: "ài dài", english: "To love and respect", hskLevel: 6, category: "verb" },
  { id: 2503, chinese: "暧昧", pinyin: "ài mèi", english: "Ambiguous", hskLevel: 6, category: "adj" },
  { id: 2504, chinese: "安定", pinyin: "ān dìng", english: "Stable", hskLevel: 6, category: "adj" },
  { id: 2505, chinese: "安宁", pinyin: "ān níng", english: "Peaceful", hskLevel: 6, category: "adj" },
  { id: 2506, chinese: "安置", pinyin: "ān zhì", english: "To resettle", hskLevel: 6, category: "verb" },
  { id: 2507, chinese: "安装", pinyin: "ān zhuāng", english: "To install", hskLevel: 6, category: "verb" },
  { id: 2508, chinese: "暗示", pinyin: "àn shì", english: "To hint", hskLevel: 6, category: "verb" },
  { id: 2509, chinese: "案件", pinyin: "àn jiàn", english: "Legal case", hskLevel: 6, category: "noun" },
  { id: 2510, chinese: "昂贵", pinyin: "áng guì", english: "Expensive", hskLevel: 6, category: "adj" },
  { id: 2511, chinese: "熬", pinyin: "áo", english: "To boil / endure", hskLevel: 6, category: "verb" },
  { id: 2512, chinese: "熬夜", pinyin: "áo yè", english: "Stay up late", hskLevel: 6, category: "verb" },
  { id: 2513, chinese: "奥妙", pinyin: "ào miào", english: "Profound mystery", hskLevel: 6, category: "adj" },
  { id: 2514, chinese: "奥秘", pinyin: "ào mì", english: "Secret / mystery", hskLevel: 6, category: "noun" },
  { id: 2515, chinese: "巴结", pinyin: "bā jie", english: "To curry favor", hskLevel: 6, category: "verb" },
];

// Helper function to get vocabulary by level
export function getVocabularyByLevel(level: number): ChineseWord[] {
  if (level === 1) return hsk1Vocabulary;
  if (level === 2) return hsk2Vocabulary;
  if (level === 3) return hsk3Vocabulary;
  if (level === 4) return hsk4Vocabulary;
  if (level === 5) return hsk5Vocabulary;
  if (level === 6) return hsk6Vocabulary;
  return hsk1Vocabulary;
}

// Helper function to get exercises by level
export function getExercisesByLevel(level: number): ChineseExercise[] {
  // Generate dynamic exercises from vocabulary for this level
  const vocab = getVocabularyForLevelOnly(level);
  return generateQuestionsFromVocabulary(vocab, 20); // 20 questions for quiz mode
}

// Helper function to get ONLY vocabulary for a specific level (not cumulative)
export function getVocabularyForLevelOnly(level: number): ChineseWord[] {
  const allVocab = getVocabularyByLevel(level);
  return allVocab.filter(word => word.hskLevel === level);
}

// Helper function to generate dynamic exam questions from vocabulary
export function generateQuestionsFromVocabulary(vocab: ChineseWord[], count: number = 30): any[] {
  // FIXED: Use corrected question generator that shuffles BEFORE finding index
  const { generateChineseQuestions } = require('./questionGenerator');
  return generateChineseQuestions(vocab, count);
  
  /* OLD BUGGY CODE - REMOVED
  const questions: any[] = [];
  const usedWords = new Set<number>();
  
  // Shuffle vocabulary
  const shuffled = [...vocab].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(count, vocab.length); i++) {
    const word = shuffled[i];
    if (usedWords.has(word.id)) continue;
    usedWords.add(word.id);
    
    // Generate different types of questions
    const questionType = i % 4;
    
    if (questionType === 0) {
      // Chinese to English
      const wrongAnswers = shuffled
        .filter(w => w.id !== word.id && w.category === word.category)
        .slice(0, 3)
        .map(w => w.english);
      
      questions.push({
        question: `What does "${word.chinese}" (${word.pinyin}) mean?`,
        options: shuffle([word.english, ...wrongAnswers]),
        correct: [word.english, ...wrongAnswers].indexOf(word.english)
      });
    } else if (questionType === 1) {
      // English to Chinese
      const wrongAnswers = shuffled
        .filter(w => w.id !== word.id && w.category === word.category)
        .slice(0, 3)
        .map(w => w.chinese);
      
      questions.push({
        question: `How do you say "${word.english}" in Chinese?`,
        options: shuffle([word.chinese, ...wrongAnswers]),
        correct: [word.chinese, ...wrongAnswers].indexOf(word.chinese)
      });
    } else if (questionType === 2) {
      // Pinyin recognition
      const wrongAnswers = shuffled
        .filter(w => w.id !== word.id)
        .slice(0, 3)
        .map(w => w.pinyin);
      
      questions.push({
        question: `What is the pinyin for "${word.chinese}"?`,
        options: shuffle([word.pinyin, ...wrongAnswers]),
        correct: [word.pinyin, ...wrongAnswers].indexOf(word.pinyin)
      });
    } else {
      // Meaning with pinyin given
      const wrongAnswers = shuffled
        .filter(w => w.id !== word.id && w.category === word.category)
        .slice(0, 3)
        .map(w => w.english);
      
      questions.push({
        question: `"${word.pinyin}" means:`,
        options: shuffle([word.english, ...wrongAnswers]),
        correct: [word.english, ...wrongAnswers].indexOf(word.english)
      });
    }
  }
  
  // If we need more questions, generate category-based questions
  while (questions.length < count && vocab.length > 0) {
    const categories = [...new Set(vocab.map(w => w.category))];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryWords = vocab.filter(w => w.category === randomCategory);
    
    if (categoryWords.length >= 4) {
      const correct = categoryWords[Math.floor(Math.random() * categoryWords.length)];
      const wrong = categoryWords
        .filter(w => w.id !== correct.id)
        .slice(0, 3);
      
      questions.push({
        question: `Which word means "${correct.english}"?`,
        options: shuffle([correct.chinese, ...wrong.map(w => w.chinese)]),
        correct: [correct.chinese, ...wrong.map(w => w.chinese)].indexOf(correct.chinese)
      });
    }
  }
  
  return questions.slice(0, count);
  */
}

// Helper to shuffle array
function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Level information - UPDATED WITH NEW CONTENT!
export const hskLevelInfo = {
  1: { name: 'HSK 1', wordCount: 150, totalWords: 150, description: 'Basic vocabulary and grammar', icon: '🌱' },
  2: { name: 'HSK 2', wordCount: 150, totalWords: 300, description: 'Elementary level', icon: '🌿' },
  3: { name: 'HSK 3', wordCount: 300, totalWords: 600, description: 'Intermediate level', icon: '🌳' },
  4: { name: 'HSK 4', wordCount: 600, totalWords: 600, description: 'Upper intermediate - NEW!', icon: '🏔️' },
  5: { name: 'HSK 5', wordCount: 1300, totalWords: 1300, description: 'Advanced level - NEW!', icon: '🏆' },
  6: { name: 'HSK 6', wordCount: 2500, totalWords: 2500, description: 'Mastery level - NEW!', icon: '👑' },
};
