import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  BookOpen, 
  Lightbulb, 
  CheckCircle,
  AlertCircle,
  Star,
  Award
} from 'lucide-react';

interface GrammarGuideCompleteProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  onBack: () => void;
}

interface GrammarPoint {
  title: string;
  explanation: string;
  structure: string;
  examples: { sentence: string; reading: string; meaning: string; }[];
  tips: string[];
  common_mistakes?: string[];
  importance: 'essential' | 'important' | 'useful';
}

// ========== JAPANESE GRAMMAR - ALL LEVELS ==========

const japaneseN5Grammar: GrammarPoint[] = [
  {
    title: 'は (wa) - Topic Marker',
    explanation: 'は marks the topic of the sentence - what you are talking about. This is THE most important particle!',
    structure: '[Topic] は [Comment]',
    importance: 'essential',
    examples: [
      { sentence: '私は学生です。', reading: 'Watashi wa gakusei desu.', meaning: 'I am a student.' },
      { sentence: '日本は美しい国です。', reading: 'Nihon wa utsukushii kuni desu.', meaning: 'Japan is a beautiful country.' },
      { sentence: 'これは本です。', reading: 'Kore wa hon desu.', meaning: 'This is a book.' }
    ],
    tips: [
      'は is written "ha" but ALWAYS pronounced "wa"',
      'Use は to introduce new topics or contrast',
      'Every Japanese sentence needs a topic (even if implied)'
    ],
    common_mistakes: [
      '❌ 私が学生です (wrong unless emphasizing "I" specifically)',
      '✅ 私は学生です (correct for stating you are a student)'
    ]
  },
  {
    title: 'を (wo) - Object Marker',
    explanation: 'を marks the direct object - what receives the action of the verb.',
    structure: '[Object] を [Action Verb]',
    importance: 'essential',
    examples: [
      { sentence: '本を読みます。', reading: 'Hon wo yomimasu.', meaning: 'I read a book.' },
      { sentence: 'ご飯を食べます。', reading: 'Gohan wo tabemasu.', meaning: 'I eat rice/a meal.' },
      { sentence: '日本語を勉強します。', reading: 'Nihongo wo benkyou shimasu.', meaning: 'I study Japanese.' }
    ],
    tips: [
      'を is written "wo" but pronounced "o"',
      'Always comes before a verb',
      'Shows what the verb acts upon'
    ]
  },
  {
    title: 'に (ni) - Direction/Time/Location',
    explanation: 'に has many uses: destination, specific time, location of existence.',
    structure: '[Place/Time] に [Verb]',
    importance: 'essential',
    examples: [
      { sentence: '東京に行きます。', reading: 'Toukyou ni ikimasu.', meaning: 'I go to Tokyo.' },
      { sentence: '7時に起きます。', reading: 'Shichi-ji ni okimasu.', meaning: 'I wake up at 7 o\'clock.' },
      { sentence: '机の上に本があります。', reading: 'Tsukue no ue ni hon ga arimasu.', meaning: 'There is a book on the desk.' }
    ],
    tips: [
      'に = destination with movement verbs (行く, 来る)',
      'に = specific time (7時に, 月曜日に)',
      'に = location with existence verbs (ある, いる)'
    ]
  },
  {
    title: 'で (de) - Location of Action / Means',
    explanation: 'で shows where an action happens or how something is done.',
    structure: '[Place] で [Action] / [Tool] で [Action]',
    importance: 'essential',
    examples: [
      { sentence: 'レストランで食べます。', reading: 'Resutoran de tabemasu.', meaning: 'I eat at a restaurant.' },
      { sentence: '電車で行きます。', reading: 'Densha de ikimasu.', meaning: 'I go by train.' },
      { sentence: '日本語で話します。', reading: 'Nihongo de hanashimasu.', meaning: 'I speak in Japanese.' }
    ],
    tips: [
      'で = where action happens (not where something exists!)',
      'で = means/method (how you do something)',
      'Compare: 家にいます (exist at home) vs 家で勉強します (study at home)'
    ]
  },
  {
    title: 'ます (masu) - Polite Present/Future',
    explanation: 'ます makes verbs polite. Essential for all formal situations!',
    structure: '[Verb stem] + ます',
    importance: 'essential',
    examples: [
      { sentence: '行きます', reading: 'ikimasu', meaning: 'I go / I will go' },
      { sentence: '食べます', reading: 'tabemasu', meaning: 'I eat / I will eat' },
      { sentence: '勉強します', reading: 'benkyou shimasu', meaning: 'I study / I will study' }
    ],
    tips: [
      'ます = present AND future (context determines which)',
      'Negative: ません (masen)',
      'Past: ました (mashita)',
      'Past negative: ませんでした (masen deshita)'
    ]
  }
];

const japaneseN4Grammar: GrammarPoint[] = [
  {
    title: 'て-form Verbs',
    explanation: 'て-form is one of the most versatile verb forms. Used for connecting actions, requests, and more.',
    structure: '[Verb te-form] + [continuation]',
    importance: 'essential',
    examples: [
      { sentence: '起きて、顔を洗います。', reading: 'Okite, kao wo araimasu.', meaning: 'I wake up and wash my face.' },
      { sentence: '窓を開けてください。', reading: 'Mado wo akete kudasai.', meaning: 'Please open the window.' },
      { sentence: '本を読んでいます。', reading: 'Hon wo yonde imasu.', meaning: 'I am reading a book.' }
    ],
    tips: [
      'て-form + ください = polite request',
      'て-form + います = continuous action',
      'て-form + も = "even if"',
      'Connect multiple actions with て-form'
    ],
    common_mistakes: [
      '❌ 食べますて (wrong conjugation)',
      '✅ 食べて (correct te-form)'
    ]
  },
  {
    title: 'た-form (Past Tense)',
    explanation: 'た-form creates past tense. Similar conjugation to て-form.',
    structure: '[Verb ta-form]',
    importance: 'essential',
    examples: [
      { sentence: '昨日、映画を見ました。', reading: 'Kinou, eiga wo mimashita.', meaning: 'I watched a movie yesterday.' },
      { sentence: 'ご飯を食べた後で、寝ました。', reading: 'Gohan wo tabeta ato de, nemashita.', meaning: 'After eating, I slept.' },
      { sentence: '日本に行ったことがあります。', reading: 'Nihon ni itta koto ga arimasu.', meaning: 'I have been to Japan.' }
    ],
    tips: [
      'た-form is informal past',
      'ました is polite past',
      'た-form + ことがある = "have experience of"'
    ]
  }
];

// ========== CHINESE GRAMMAR - ALL LEVELS ==========

const chineseHSK1Grammar: GrammarPoint[] = [
  {
    title: '是 (shì) - "To Be"',
    explanation: '是 is the verb "to be" for equating nouns. Most important verb in Chinese!',
    structure: 'A + 是 + B',
    importance: 'essential',
    examples: [
      { sentence: '我是学生。', reading: 'Wǒ shì xuésheng.', meaning: 'I am a student.' },
      { sentence: '他是医生。', reading: 'Tā shì yīshēng.', meaning: 'He is a doctor.' },
      { sentence: '这是我的书。', reading: 'Zhè shì wǒ de shū.', meaning: 'This is my book.' }
    ],
    tips: [
      '是 connects two nouns (A is B)',
      'Negative: 不是 (bú shì)',
      'Question: add 吗 at the end',
      'Don\'t use 是 with adjectives! (Say: 我很好, not 我是好)'
    ],
    common_mistakes: [
      '❌ 我是很好 (wrong - don\'t use 是 with adjectives)',
      '✅ 我很好 (correct - just use adjective with 很)'
    ]
  },
  {
    title: '的 (de) - Possessive Particle',
    explanation: '的 shows possession or description. The MOST COMMON character in Chinese!',
    structure: 'Possessor + 的 + Noun',
    importance: 'essential',
    examples: [
      { sentence: '我的书', reading: 'wǒ de shū', meaning: 'my book' },
      { sentence: '很好的老师', reading: 'hěn hǎo de lǎoshī', meaning: 'a very good teacher' },
      { sentence: '中国的文化', reading: 'Zhōngguó de wénhuà', meaning: 'Chinese culture' }
    ],
    tips: [
      '的 is like English "\'s" or "of"',
      'Most frequently used character in ALL of Chinese!',
      'Can be omitted with close relationships: 我妈妈 (my mom)',
      'Use for description: 红色的车 (red car)'
    ]
  },
  {
    title: '吗 (ma) - Question Particle',
    explanation: 'Add 吗 to the end of any statement to make it a yes/no question!',
    structure: '[Statement] + 吗？',
    importance: 'essential',
    examples: [
      { sentence: '你是学生吗？', reading: 'Nǐ shì xuésheng ma?', meaning: 'Are you a student?' },
      { sentence: '你喜欢中国菜吗？', reading: 'Nǐ xǐhuan Zhōngguó cài ma?', meaning: 'Do you like Chinese food?' },
      { sentence: '你累吗？', reading: 'Nǐ lèi ma?', meaning: 'Are you tired?' }
    ],
    tips: [
      'Easiest way to ask yes/no questions',
      '吗 has a neutral tone (light, no stress)',
      'Answer: 是 (yes) or 不是 (no)',
      'Or answer: 对 (yes) or 不对 (no)'
    ]
  },
  {
    title: '不 (bù) - Negation',
    explanation: '不 negates verbs and adjectives. Essential for saying "not"!',
    structure: 'Subject + 不 + Verb/Adjective',
    importance: 'essential',
    examples: [
      { sentence: '我不是老师。', reading: 'Wǒ bú shì lǎoshī.', meaning: 'I am not a teacher.' },
      { sentence: '我不喜欢。', reading: 'Wǒ bù xǐhuan.', meaning: 'I don\'t like it.' },
      { sentence: '不好', reading: 'bù hǎo', meaning: 'not good' }
    ],
    tips: [
      '不 goes directly before verb/adjective',
      'Tone change: 不 + 4th tone = 不 becomes 2nd tone',
      'Example: 不是 pronounced "bú shì"',
      'For "have not": use 没有 (méi yǒu) instead of 不有'
    ],
    common_mistakes: [
      '❌ 我不有书 (wrong)',
      '✅ 我没有书 (correct - "I don\'t have books")'
    ]
  },
  {
    title: 'Basic Word Order: SVO',
    explanation: 'Chinese uses Subject-Verb-Object order, just like English!',
    structure: 'Subject + Verb + Object',
    importance: 'essential',
    examples: [
      { sentence: '我喝茶。', reading: 'Wǒ hē chá.', meaning: 'I drink tea.' },
      { sentence: '他吃饭。', reading: 'Tā chī fàn.', meaning: 'He eats (a meal).' },
      { sentence: '我们学习汉语。', reading: 'Wǒmen xuéxí Hànyǔ.', meaning: 'We study Chinese.' }
    ],
    tips: [
      'Same basic order as English!',
      'No verb conjugation - 我吃, 你吃, 他吃 (all same)',
      'Time expressions usually go at the start',
      'Place comes before time: 我在学校学习 (I study at school)'
    ]
  }
];

const chineseHSK2Grammar: GrammarPoint[] = [
  {
    title: '了 (le) - Completed Action',
    explanation: '了 indicates a completed action or change of state.',
    structure: 'Subject + Verb + 了 + Object',
    importance: 'essential',
    examples: [
      { sentence: '我吃了饭。', reading: 'Wǒ chī le fàn.', meaning: 'I ate (a meal).' },
      { sentence: '他买了一本书。', reading: 'Tā mǎi le yī běn shū.', meaning: 'He bought a book.' },
      { sentence: '下雨了。', reading: 'Xià yǔ le.', meaning: 'It\'s raining (change of state).' }
    ],
    tips: [
      '了 shows completion, not necessarily past tense',
      'Can indicate change: 我饿了 (I\'m hungry now)',
      'Negative: use 没(有), not 不了',
      'Question: 了吗?'
    ]
  },
  {
    title: '在 (zài) - Progressive Aspect',
    explanation: '在 + Verb shows an ongoing action (like English "-ing").',
    structure: 'Subject + 在 + Verb + Object',
    importance: 'important',
    examples: [
      { sentence: '我在看书。', reading: 'Wǒ zài kàn shū.', meaning: 'I am reading.' },
      { sentence: '他在吃饭。', reading: 'Tā zài chī fàn.', meaning: 'He is eating.' },
      { sentence: '你在做什么？', reading: 'Nǐ zài zuò shénme?', meaning: 'What are you doing?' }
    ],
    tips: [
      'Similar to English "be + -ing"',
      'Shows action happening RIGHT NOW',
      'Can also add 着: 在...着',
      'Negative: 没在 or 不在'
    ]
  }
];

export function GrammarGuideComplete({ level, language, onBack }: GrammarGuideCompleteProps) {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  
  // Get grammar for current level
  const getGrammarForLevel = (): GrammarPoint[] => {
    if (language === 'japanese') {
      const levelStr = typeof level === 'string' ? level.toLowerCase() : `n${level}`;
      if (levelStr === 'n5' || levelStr === 'hiragana' || levelStr === 'katakana') return japaneseN5Grammar;
      if (levelStr === 'n4') return japaneseN4Grammar;
    } else {
      const levelNum = typeof level === 'number' ? level : parseInt(level.toString());
      if (levelNum === 1) return chineseHSK1Grammar;
      if (levelNum === 2) return chineseHSK2Grammar;
    }
    return [];
  };

  const grammarPoints = getGrammarForLevel();

  const getLevelName = () => {
    if (language === 'japanese') {
      if (level === 'hiragana' || level === 'katakana') return 'Hiragana/Katakana';
      return `JLPT ${level.toString().toUpperCase()}`;
    }
    return `HSK ${level}`;
  };

  if (grammarPoints.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <Button onClick={onBack} variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle>Grammar Guide Coming Soon!</CardTitle>
              <CardDescription>
                Grammar explanations for {getLevelName()} are being prepared. Check back soon!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  // Count essential vs other grammar points
  const essentialCount = grammarPoints.filter(p => p.importance === 'essential').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <Button onClick={onBack} variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-8 h-8" />
              <CardTitle className="text-3xl">Grammar Guide - {getLevelName()}</CardTitle>
            </div>
            <CardDescription className="text-white/90 text-lg">
              Real {language === 'japanese' ? 'JLPT' : 'HSK'} exam grammar - Master these patterns!
            </CardDescription>
            <div className="flex gap-2 mt-2">
              <Badge className="bg-white/20 hover:bg-white/30">
                {grammarPoints.length} Patterns
              </Badge>
              <Badge className="bg-white/20 hover:bg-white/30">
                {essentialCount} Essential
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Grammar Points List */}
        <div className="space-y-4">
          {grammarPoints.map((point, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setSelectedPoint(selectedPoint === index ? null : index)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant={point.importance === 'essential' ? 'default' : 'secondary'} 
                        className={point.importance === 'essential' ? 'bg-red-600' : ''}>
                        {point.importance === 'essential' ? '⭐ ESSENTIAL' : point.importance.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">Pattern {index + 1}</Badge>
                      {selectedPoint === index && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <CardTitle className="text-xl mb-2">{point.title}</CardTitle>
                    <CardDescription>{point.explanation}</CardDescription>
                  </div>
                  <CheckCircle className={`w-6 h-6 flex-shrink-0 transition-all ${selectedPoint === index ? 'text-green-500 rotate-0' : 'text-gray-300 rotate-90'}`} />
                </div>
              </CardHeader>

              {selectedPoint === index && (
                <CardContent className="space-y-6 border-t pt-6">
                  {/* Structure */}
                  <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-4 border border-purple-200 dark:border-purple-900">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Structure:</span>
                    </div>
                    <code className="text-lg text-purple-900 dark:text-purple-300">{point.structure}</code>
                  </div>

                  {/* Examples */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span>Examples:</span>
                    </h4>
                    <div className="space-y-3">
                      {point.examples.map((example, idx) => (
                        <div key={idx} className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-900">
                          <div className="space-y-1">
                            <p className="text-lg">{example.sentence}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{example.reading}</p>
                            <p className="text-sm text-blue-700 dark:text-blue-400">→ {example.meaning}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-200 dark:border-green-900">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-green-500" />
                      <span>Tips:</span>
                    </div>
                    <ul className="space-y-2">
                      {point.tips.map((tip, idx) => (
                        <li key={idx} className="flex gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Common Mistakes */}
                  {point.common_mistakes && (
                    <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-lg p-4 border border-yellow-200 dark:border-yellow-900">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span>Common Mistakes:</span>
                      </div>
                      <ul className="space-y-2">
                        {point.common_mistakes.map((mistake, idx) => (
                          <li key={idx} className="text-sm font-mono">
                            {mistake}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="mt-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 border-green-200 dark:border-green-900">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Award className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <p className="mb-2">
                  <strong>🎯 For Real {language === 'japanese' ? 'JLPT' : 'HSK'} Success:</strong>
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  These patterns appear in REAL exams! Focus on <Badge className="bg-red-600 text-white text-xs">⭐ ESSENTIAL</Badge> patterns first.
                  Master one pattern at a time with examples, then practice making your own sentences.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  💡 <strong>Pro Tip:</strong> Write 5 sentences using each pattern. Say them out loud. This is how you truly master grammar! 📝
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
