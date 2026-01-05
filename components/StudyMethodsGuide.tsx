import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {  ArrowLeft, BookOpen, Brain, Repeat, Lightbulb, Target, Clock, Sparkles, CheckCircle } from 'lucide-react';

interface StudyMethodsGuideProps {
  onBack: () => void;
  language: 'chinese' | 'japanese';
}

export function StudyMethodsGuide({ onBack, language }: StudyMethodsGuideProps) {
  const studyMethods = [
    {
      title: "📚 Spaced Repetition (SRS)",
      icon: <Repeat className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      description: "Review words at increasing intervals",
      steps: [
        "Day 1: Learn new words",
        "Day 2: Review",
        "Day 4: Review again",
        "Day 7: Review again",
        "Day 14: Review again",
        "Day 30: Final review"
      ],
      tips: [
        "Focus on words you forget more frequently",
        "Use flashcards for daily practice",
        "Review before sleeping for better retention",
        "Combine with active recall"
      ],
      effectiveness: "95% retention rate after 30 days"
    },
    {
      title: "🎯 Active Recall",
      icon: <Target className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      description: "Test yourself instead of passive reading",
      steps: [
        "Hide the meaning of a word",
        "Try to recall it from memory",
        "Check your answer",
        "Mark if correct or incorrect",
        "Review incorrect answers more",
        "Repeat until mastered"
      ],
      tips: [
        "Don't look at answers immediately",
        "Write down your answers",
        "Say words out loud",
        "Create mental associations"
      ],
      effectiveness: "50% better than passive review"
    },
    {
      title: "🧠 Memory Palace Technique",
      icon: <Brain className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      description: "Associate words with familiar places",
      steps: [
        "Choose a familiar place (your home)",
        "Create a mental path through it",
        "Assign words to specific locations",
        "Create vivid visual associations",
        "Walk the path mentally",
        "Retrieve words by location"
      ],
      tips: [
        "Use bizarre or funny images",
        "Engage all senses in your visualization",
        "Make associations emotional",
        "Practice the same route daily"
      ],
      effectiveness: "Ancient technique, proven for 2000+ years"
    },
    {
      title: "⏰ Pomodoro Technique",
      icon: <Clock className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      description: "Study in focused 25-minute intervals",
      steps: [
        "Set timer for 25 minutes",
        "Study with full focus (no distractions)",
        "Take a 5-minute break",
        "Repeat 4 times",
        "Take a longer 15-30 minute break",
        "Track your completed sessions"
      ],
      tips: [
        "Turn off phone notifications",
        "Use the break for physical movement",
        "Don't study for more than 2 hours straight",
        "Reward yourself after completing cycles"
      ],
      effectiveness: "Maintains 90% focus throughout study session"
    },
    {
      title: "🎨 Visualization & Storytelling",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      description: "Create memorable stories with new words",
      steps: [
        "Take 5-10 new words",
        "Create a short story using all of them",
        "Make it funny or absurd",
        "Draw simple pictures if possible",
        "Tell the story out loud",
        "Repeat daily for a week"
      ],
      tips: [
        "The weirder the story, the better",
        "Connect to personal experiences",
        "Use characters and emotions",
        "Share stories with study partners"
      ],
      effectiveness: "Stories are 22x more memorable than facts"
    },
    {
      title: "✍️ Writing Practice",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      description: "Write to reinforce learning",
      steps: [
        "Write each word 10 times",
        "Write sentences using new words",
        "Keep a daily journal in target language",
        "Describe your day using studied vocabulary",
        "Write short essays (100-200 words)",
        "Have a teacher or AI correct your writing"
      ],
      tips: [
        language === 'chinese' ? "Practice stroke order carefully" : "Practice proper kana/kanji forms",
        "Start with simple sentences",
        "Gradually increase complexity",
        "Review and correct mistakes daily"
      ],
      effectiveness: "4x better retention than reading alone"
    }
  ];

  const languageSpecificTips = language === 'chinese' ? [
    {
      title: "🎵 Tone Practice",
      tips: [
        "Record yourself and compare with native speakers",
        "Use tone pair drills (all combinations)",
        "Exaggerate tones when learning",
        "Practice with tongue twisters",
        "Listen to podcasts at 0.75x speed"
      ]
    },
    {
      title: "📝 Character Learning",
      tips: [
        "Learn radicals first (building blocks)",
        "Understand character components",
        "Practice stroke order from day 1",
        "Use mnemonics for each character",
        "Write characters in the air"
      ]
    },
    {
      title: "🗣️ Speaking Practice",
      tips: [
        "Shadow native speakers (repeat after them)",
        "Record and compare your pronunciation",
        "Practice with language exchange partners",
        "Use AI chat for conversation practice",
        "Speak to yourself in Chinese daily"
      ]
    }
  ] : [
    {
      title: "🔤 Kana Mastery",
      tips: [
        "Master hiragana before katakana",
        "Learn dakuten and yōon systematically",
        "Read children's books in kana only",
        "Practice writing kana daily",
        "Use mnemonics for each character"
      ]
    },
    {
      title: "📝 Kanji Learning",
      tips: [
        "Learn radicals (部首 bushu) first",
        "Study stroke order carefully",
        "Learn multiple readings (音読み & 訓読み)",
        "See kanji in context (compounds)",
        "Use Anki or similar SRS apps"
      ]
    },
    {
      title: "⚙️ Particle Mastery",
      tips: [
        "は vs が: Practice with many examples",
        "を, に, へ: Location and direction practice",
        "Create sentence templates",
        "Learn particle combinations",
        "Read native content and analyze particles"
      ]
    }
  ];

  const dailyStudyPlan = {
    beginner: [
      "⏰ Morning (30 min): Review flashcards with SRS",
      "☕ Break: Listen to target language music",
      "📚 Afternoon (45 min): Study new lesson materials",
      "✍️ Afternoon (30 min): Writing practice",
      "🎧 Evening (30 min): Listening practice / videos",
      "🌙 Before bed (15 min): Quick flashcard review"
    ],
    intermediate: [
      "⏰ Morning (45 min): Intensive reading practice",
      "☕ Break: Watch news in target language",
      "📚 Midday (1 hour): Grammar + new vocabulary",
      "✍️ Afternoon (45 min): Writing essays",
      "🗣️ Evening (30 min): Speaking with native/AI",
      "🎧 Evening (45 min): Listening to podcasts",
      "🌙 Before bed (20 min): Review + SRS"
    ],
    advanced: [
      "⏰ Morning (1 hour): Read authentic materials",
      "☕ Throughout day: Think in target language",
      "📚 Afternoon (1 hour): Advanced grammar/vocabulary",
      "✍️ Afternoon (1 hour): Write articles/essays",
      "🗣️ Evening (45 min): Conversation practice",
      "🎬 Evening (1 hour): Watch native content",
      "🌙 Before bed (30 min): Review weak points"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
      <div className="max-w-6xl mx-auto pt-8">
        <Button onClick={onBack} variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white border-none">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Brain className="w-10 h-10" />
              Study Methods & Learning Techniques
            </CardTitle>
            <CardDescription className="text-white/90 text-lg">
              🎯 Proven strategies to accelerate your {language === 'chinese' ? 'Chinese (汉语)' : 'Japanese (日本語)'} learning
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="methods" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="methods">Study Methods</TabsTrigger>
            <TabsTrigger value="tips">Language Tips</TabsTrigger>
            <TabsTrigger value="schedule">Daily Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="methods" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {studyMethods.map((method, index) => (
                <Card key={index} className="hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-3 shadow-lg`}>
                      {method.icon}
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">📋 Steps:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        {method.steps.map((step, i) => (
                          <li key={i} className="text-gray-700 dark:text-gray-300">{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">💡 Pro Tips:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {method.tips.map((tip, i) => (
                          <li key={i} className="text-gray-700 dark:text-gray-300">{tip}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950 rounded-lg p-3 border-2 border-green-300 dark:border-green-700">
                      <p className="text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <strong>Effectiveness:</strong> {method.effectiveness}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {languageSpecificTips.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-300 dark:border-blue-700">
              <CardHeader>
                <CardTitle>🎯 Golden Rules for Language Learning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="flex items-center gap-2">
                  <Badge>1</Badge> <strong>Consistency beats intensity</strong> - 30 minutes daily is better than 5 hours once a week
                </p>
                <p className="flex items-center gap-2">
                  <Badge>2</Badge> <strong>Use it or lose it</strong> - Apply what you learn immediately in conversations
                </p>
                <p className="flex items-center gap-2">
                  <Badge>3</Badge> <strong>Mistakes are learning</strong> - Don't fear making errors, embrace them
                </p>
                <p className="flex items-center gap-2">
                  <Badge>4</Badge> <strong>Immerse yourself</strong> - Surround yourself with the language daily
                </p>
                <p className="flex items-center gap-2">
                  <Badge>5</Badge> <strong>Be patient</strong> - Language learning takes time (2000+ hours for fluency)
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-green-300 dark:border-green-700">
                <CardHeader>
                  <Badge className="w-fit mb-2">Beginner</Badge>
                  <CardTitle>2-3 Hours/Day</CardTitle>
                  <CardDescription>Building foundations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {dailyStudyPlan.beginner.map((item, i) => (
                      <li key={i} className="text-sm border-l-2 border-green-500 pl-3">{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-300 dark:border-yellow-700">
                <CardHeader>
                  <Badge className="w-fit mb-2">Intermediate</Badge>
                  <CardTitle>3-4 Hours/Day</CardTitle>
                  <CardDescription>Expanding skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {dailyStudyPlan.intermediate.map((item, i) => (
                      <li key={i} className="text-sm border-l-2 border-yellow-500 pl-3">{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-300 dark:border-purple-700">
                <CardHeader>
                  <Badge className="w-fit mb-2">Advanced</Badge>
                  <CardTitle>4-6 Hours/Day</CardTitle>
                  <CardDescription>Reaching fluency</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {dailyStudyPlan.advanced.map((item, i) => (
                      <li key={i} className="text-sm border-l-2 border-purple-500 pl-3">{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-orange-300 dark:border-orange-700">
              <CardHeader>
                <CardTitle>⚠️ Important Reminders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>✅ <strong>Take breaks</strong> - Rest is when your brain consolidates learning</p>
                <p>✅ <strong>Sleep 7-8 hours</strong> - Sleep is critical for memory formation</p>
                <p>✅ <strong>Stay hydrated</strong> - Dehydration reduces cognitive performance by 30%</p>
                <p>✅ <strong>Exercise regularly</strong> - Physical activity boosts brain function</p>
                <p>✅ <strong>Track progress</strong> - Use a journal or app to monitor your journey</p>
                <p>✅ <strong>Find study partners</strong> - Learning with others keeps you motivated</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
