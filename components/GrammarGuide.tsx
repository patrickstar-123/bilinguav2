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
  Star
} from 'lucide-react';

interface GrammarGuideProps {
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
}

const japaneseN5Grammar: GrammarPoint[] = [
  {
    title: 'は (wa) - Topic Marker',
    explanation: 'は marks the topic of the sentence. It tells us what we are talking about.',
    structure: '[Topic] は [Comment]',
    examples: [
      { 
        sentence: '私は学生です。', 
        reading: 'Watashi wa gakusei desu.', 
        meaning: 'I am a student.' 
      },
      { 
        sentence: 'これは本です。', 
        reading: 'Kore wa hon desu.', 
        meaning: 'This is a book.' 
      },
      { 
        sentence: '田中さんは先生です。', 
        reading: 'Tanaka-san wa sensei desu.', 
        meaning: 'Mr. Tanaka is a teacher.' 
      }
    ],
    tips: [
      'は is written "ha" but pronounced "wa"',
      'Use は to introduce new topics',
      'Only one は per sentence usually'
    ],
    common_mistakes: [
      'Don\'t confuse は (wa) with を (wo) - different particles!',
      'Remember: は = topic, が = subject'
    ]
  },
  {
    title: 'を (wo) - Object Marker',
    explanation: 'を marks the direct object of a verb. It shows what action is being done to.',
    structure: '[Object] を [Verb]',
    examples: [
      { 
        sentence: '本を読みます。', 
        reading: 'Hon wo yomimasu.', 
        meaning: 'I read a book.' 
      },
      { 
        sentence: 'ご飯を食べます。', 
        reading: 'Gohan wo tabemasu.', 
        meaning: 'I eat rice/meal.' 
      },
      { 
        sentence: '水を飲みます。', 
        reading: 'Mizu wo nomimasu.', 
        meaning: 'I drink water.' 
      }
    ],
    tips: [
      'を is written "wo" but pronounced "o"',
      'Always comes before a verb',
      'Shows the direct object being acted upon'
    ]
  },
  {
    title: 'です (desu) - Polite Copula',
    explanation: 'です is the polite form meaning "to be" or "is". It makes sentences polite.',
    structure: '[Noun] です',
    examples: [
      { 
        sentence: '学生です。', 
        reading: 'Gakusei desu.', 
        meaning: 'I am a student.' 
      },
      { 
        sentence: '日本人です。', 
        reading: 'Nihonjin desu.', 
        meaning: 'I am Japanese.' 
      },
      { 
        sentence: '先生です。', 
        reading: 'Sensei desu.', 
        meaning: 'I am a teacher.' 
      }
    ],
    tips: [
      'Always use です in polite conversation',
      'Subject (私は) is often omitted if clear from context',
      'Past tense: でした (deshita)'
    ]
  },
  {
    title: 'ます (masu) - Polite Verb Ending',
    explanation: 'ます is added to verb stems to make them polite. It\'s essential for formal speech.',
    structure: '[Verb stem] + ます',
    examples: [
      { 
        sentence: '行きます。', 
        reading: 'Ikimasu.', 
        meaning: 'I go. / I will go.' 
      },
      { 
        sentence: '食べます。', 
        reading: 'Tabemasu.', 
        meaning: 'I eat. / I will eat.' 
      },
      { 
        sentence: '勉強します。', 
        reading: 'Benkyou shimasu.', 
        meaning: 'I study. / I will study.' 
      }
    ],
    tips: [
      'ます form is used for both present and future',
      'Negative: ません (masen) - e.g., 行きません (ikimasen)',
      'Past: ました (mashita) - e.g., 行きました (ikimashita)'
    ]
  },
  {
    title: 'か (ka) - Question Marker',
    explanation: 'か at the end of a sentence makes it a question. Like a question mark!',
    structure: '[Statement] + か',
    examples: [
      { 
        sentence: 'これは本ですか？', 
        reading: 'Kore wa hon desu ka?', 
        meaning: 'Is this a book?' 
      },
      { 
        sentence: '学生ですか？', 
        reading: 'Gakusei desu ka?', 
        meaning: 'Are you a student?' 
      },
      { 
        sentence: '何を食べますか？', 
        reading: 'Nani wo tabemasu ka?', 
        meaning: 'What will you eat?' 
      }
    ],
    tips: [
      'か turns any statement into a question',
      'Often accompanied by rising intonation',
      'Can be omitted in casual speech with just intonation'
    ]
  },
  {
    title: 'の (no) - Possessive Particle',
    explanation: 'の shows possession or connection between nouns. Like English "\'s" or "of".',
    structure: '[Possessor] の [Possessed]',
    examples: [
      { 
        sentence: '私の本', 
        reading: 'Watashi no hon', 
        meaning: 'My book' 
      },
      { 
        sentence: '日本の車', 
        reading: 'Nihon no kuruma', 
        meaning: 'Japanese car / Car of Japan' 
      },
      { 
        sentence: '先生の名前', 
        reading: 'Sensei no namae', 
        meaning: 'The teacher\'s name' 
      }
    ],
    tips: [
      'の connects two nouns',
      'The order is opposite to English',
      'Can chain multiple の: 友達の母の車 (friend\'s mother\'s car)'
    ]
  },
  {
    title: 'に (ni) - Location/Time/Direction',
    explanation: 'に has many uses: shows location, time, direction, or destination.',
    structure: '[Time/Location] に [Verb]',
    examples: [
      { 
        sentence: '東京に行きます。', 
        reading: 'Toukyou ni ikimasu.', 
        meaning: 'I go to Tokyo.' 
      },
      { 
        sentence: '7時に起きます。', 
        reading: 'Shichi-ji ni okimasu.', 
        meaning: 'I wake up at 7 o\'clock.' 
      },
      { 
        sentence: '学校にいます。', 
        reading: 'Gakkou ni imasu.', 
        meaning: 'I am at school.' 
      }
    ],
    tips: [
      'に marks destination with movement verbs',
      'に marks specific time (not relative time)',
      'に marks location with いる/ある (existence verbs)'
    ]
  },
  {
    title: 'で (de) - Location of Action / Means',
    explanation: 'で shows where an action takes place or the means/method of doing something.',
    structure: '[Location] で [Action] / [Means] で [Action]',
    examples: [
      { 
        sentence: 'レストランで食べます。', 
        reading: 'Resutoran de tabemasu.', 
        meaning: 'I eat at a restaurant.' 
      },
      { 
        sentence: '電車で行きます。', 
        reading: 'Densha de ikimasu.', 
        meaning: 'I go by train.' 
      },
      { 
        sentence: '日本語で話します。', 
        reading: 'Nihongo de hanashimasu.', 
        meaning: 'I speak in Japanese.' 
      }
    ],
    tips: [
      'で = where action happens (not where something exists)',
      'で = method/means of doing something',
      'Compare: 学校にいます (at school, existing) vs 学校で勉強します (study at school, action)'
    ]
  }
];

const chineseHSK1Grammar: GrammarPoint[] = [
  {
    title: '是 (shì) - "To Be"',
    explanation: '是 is the verb "to be" used to equate nouns (A is B). Very important in Chinese!',
    structure: 'Subject + 是 + Noun',
    examples: [
      { 
        sentence: '我是学生。', 
        reading: 'Wǒ shì xuésheng.', 
        meaning: 'I am a student.' 
      },
      { 
        sentence: '他是老师。', 
        reading: 'Tā shì lǎoshī.', 
        meaning: 'He is a teacher.' 
      },
      { 
        sentence: '这是我的书。', 
        reading: 'Zhè shì wǒ de shū.', 
        meaning: 'This is my book.' 
      }
    ],
    tips: [
      '是 connects two nouns (A is B)',
      'Negative: 不是 (bú shì) - "is not"',
      'Question: add 吗 at the end'
    ]
  },
  {
    title: '的 (de) - Possessive Particle',
    explanation: '的 is THE most common character in Chinese! It shows possession or description.',
    structure: 'Possessor + 的 + Noun',
    examples: [
      { 
        sentence: '我的书', 
        reading: 'Wǒ de shū', 
        meaning: 'My book' 
      },
      { 
        sentence: '他的朋友', 
        reading: 'Tā de péngyou', 
        meaning: 'His friend' 
      },
      { 
        sentence: '很好的老师', 
        reading: 'Hěn hǎo de lǎoshī', 
        meaning: 'A very good teacher' 
      }
    ],
    tips: [
      '的 is like English "\'s" or "of"',
      'Most common character in Chinese - you\'ll see it everywhere!',
      'Can be omitted with close relationships: 我妈妈 (my mom)'
    ]
  },
  {
    title: '吗 (ma) - Question Particle',
    explanation: '吗 turns any statement into a yes/no question. Just add it to the end!',
    structure: 'Statement + 吗？',
    examples: [
      { 
        sentence: '你是学生吗？', 
        reading: 'Nǐ shì xuésheng ma?', 
        meaning: 'Are you a student?' 
      },
      { 
        sentence: '你喝茶吗？', 
        reading: 'Nǐ hē chá ma?', 
        meaning: 'Do you drink tea?' 
      },
      { 
        sentence: '这是你的书吗？', 
        reading: 'Zhè shì nǐ de shū ma?', 
        meaning: 'Is this your book?' 
      }
    ],
    tips: [
      'Easiest way to make a question',
      'Tone is neutral (light, unstressed)',
      'Answer with 是 (yes) or 不是 (no)'
    ]
  },
  {
    title: '不 (bù) - Negation "Not"',
    explanation: '不 is used to negate verbs and adjectives. It means "not" or "no".',
    structure: 'Subject + 不 + Verb/Adjective',
    examples: [
      { 
        sentence: '我不是老师。', 
        reading: 'Wǒ bú shì lǎoshī.', 
        meaning: 'I am not a teacher.' 
      },
      { 
        sentence: '他不喝茶。', 
        reading: 'Tā bù hē chá.', 
        meaning: 'He doesn\'t drink tea.' 
      },
      { 
        sentence: '不好', 
        reading: 'Bù hǎo', 
        meaning: 'Not good' 
      }
    ],
    tips: [
      '不 goes directly before the verb/adjective',
      'Tone change: 不 becomes 2nd tone before 4th tone',
      'Example: 不是 is pronounced "bú shì" not "bù shì"'
    ]
  },
  {
    title: 'Basic Word Order: SVO',
    explanation: 'Chinese follows Subject-Verb-Object order, just like English!',
    structure: 'Subject + Verb + Object',
    examples: [
      { 
        sentence: '我喝水。', 
        reading: 'Wǒ hē shuǐ.', 
        meaning: 'I drink water.' 
      },
      { 
        sentence: '他吃饭。', 
        reading: 'Tā chī fàn.', 
        meaning: 'He eats (a meal).' 
      },
      { 
        sentence: '我爱你。', 
        reading: 'Wǒ ài nǐ.', 
        meaning: 'I love you.' 
      }
    ],
    tips: [
      'Same word order as English: Subject + Verb + Object',
      'No verb conjugation - 我吃, 你吃, 他吃 (all use same 吃)',
      'This makes Chinese grammar simpler than many languages!'
    ]
  },
  {
    title: '很 (hěn) - "Very" with Adjectives',
    explanation: '很 means "very" but is often used before adjectives even without meaning "very".',
    structure: 'Subject + 很 + Adjective',
    examples: [
      { 
        sentence: '我很好。', 
        reading: 'Wǒ hěn hǎo.', 
        meaning: 'I am (very) good/fine.' 
      },
      { 
        sentence: '他很高。', 
        reading: 'Tā hěn gāo.', 
        meaning: 'He is (very) tall.' 
      },
      { 
        sentence: '这个很贵。', 
        reading: 'Zhège hěn guì.', 
        meaning: 'This one is (very) expensive.' 
      }
    ],
    tips: [
      'Adjectives in Chinese need something before them - usually 很',
      'In "我很好", 很 doesn\'t always mean "very" - it\'s just natural',
      'To emphasize "VERY", stress 很 or say 很很好'
    ]
  }
];

export function GrammarGuide({ level, language, onBack }: GrammarGuideProps) {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  
  const grammarPoints = language === 'japanese' 
    ? (level === 'n5' || level === 'hiragana' || level === 'katakana' ? japaneseN5Grammar : [])
    : (level === 1 || level === 'hsk1' ? chineseHSK1Grammar : []);

  const getLevelName = () => {
    if (language === 'japanese') {
      if (level === 'hiragana' || level === 'katakana') return 'Hiragana/Katakana';
      return `JLPT ${level}`;
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
              <BookOpen className="w-8 h-8" />
              <CardTitle className="text-3xl">Grammar Guide</CardTitle>
            </div>
            <CardDescription className="text-white/90 text-lg">
              {getLevelName()} - Essential grammar patterns explained simply
            </CardDescription>
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
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Pattern {index + 1}</Badge>
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
                    <code className="text-purple-900 dark:text-purple-300">{point.structure}</code>
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
                          <li key={idx} className="flex gap-2 text-sm">
                            <span>⚠️</span>
                            <span>{mistake}</span>
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
              <Lightbulb className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <p className="mb-2">
                  <strong>Study Tip:</strong> Don't try to memorize everything at once! 
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Focus on one grammar pattern at a time. Read the examples, understand the structure, 
                  and then try making your own sentences. Grammar becomes natural with practice! 📚
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
