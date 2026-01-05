import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { ArrowLeft, Send, Volume2, Trophy, Sparkles, Lightbulb } from 'lucide-react';
import { addPoints, POINTS_PER_CORRECT } from '../utils/points';
import { updateLevelProgress } from '../utils/progressTypes';
import { api } from '../utils/api';
import { getVoiceSettings, findBestVoice, getCurrentVoiceActor } from '../utils/voiceSettings';

interface AIChatAssistantProps {
  level?: number | string; // Made optional
  language: 'chinese' | 'japanese';
  userProgress: any;
  onBack: () => void;
  onProgressUpdate: () => void;
}

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  translation?: string;
  timestamp: Date;
  hiragana?: string; // Add hiragana reading for Japanese
}

// AI responses for different HSK levels
const hsk1Responses = [
  { chinese: "你好! 你叫什么名字?", english: "Hello! What's your name?" },
  { chinese: "很好! 很高兴认识你。", english: "Very good! Nice to meet you." },
  { chinese: "你好吗?", english: "How are you?" },
  { chinese: "今天天气很好。", english: "The weather is nice today." },
  { chinese: "你喜欢学习中文吗?", english: "Do you like learning Chinese?" },
  { chinese: "太好了! 继续加油!", english: "Great! Keep it up!" },
];

const hsk2Responses = [
  { chinese: "你现在在做什么?", english: "What are you doing now?" },
  { chinese: "我很高兴和你练习中文。", english: "I'm very happy to practice Chinese with you." },
  { chinese: "你有什么爱好?", english: "What hobbies do you have?" },
  { chinese: "这个周末你有什么计划?", english: "What are your plans for this weekend?" },
  { chinese: "你学习中文多长时间了?", english: "How long have you been studying Chinese?" },
];

const hsk1Suggestions = [
  "你好",
  "我很好",
  "谢谢",
  "我喜欢学习中文"
];

const hsk2Suggestions = [
  "我在学习中文",
  "我喜欢看书",
  "我学了三个月",
  "周末我想休息"
];

// Japanese N5 responses with hiragana readings
const japaneseN5Responses = [
  { 
    japanese: "こんにちは! お名前は何ですか?",
    hiragana: "こんにちは! おなまえはなんですか?",
    english: "Hello! What's your name?" 
  },
  { 
    japanese: "いいですね! はじめまして。",
    hiragana: "いいですね! はじめまして。",
    english: "Nice! Nice to meet you." 
  },
  { 
    japanese: "お元気ですか?",
    hiragana: "おげんきですか?",
    english: "How are you?" 
  },
  { 
    japanese: "今日はいい天気ですね。",
    hiragana: "きょはいいてんきですね。",
    english: "The weather is nice today." 
  },
  { 
    japanese: "日本語の勉強は楽しいですか?",
    hiragana: "にほんごのべんきょうはたのしいですか?",
    english: "Is studying Japanese fun?" 
  },
  { 
    japanese: "すごいですね! 頑張ってください!",
    hiragana: "すごいですね! がんばってください!",
    english: "Amazing! Keep it up!" 
  },
];

const japaneseN5Suggestions = [
  "こんにちは",
  "私は元気です",
  "ありがとうございます",
  "日本語が好きです"
];

export function AIChatAssistant({ level, language, userProgress, onBack, onProgressUpdate }: AIChatAssistantProps) {
  const getInitialMessage = () => {
    if (language === 'chinese') {
      return '你好! 我是你的中文AI老师。Let\'s practice Chinese together! You can ask me anything or practice conversations. 我可以帮助你学习中文!';
    } else {
      return 'こんにちは! I\'m your Japanese AI tutor. Let\'s practice Japanese together! You can ask me anything or practice conversations. 日本語の勉強を手伝います!';
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: getInitialMessage(),
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [showTranslations, setShowTranslations] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [responseIndex, setResponseIndex] = useState(0);
  const [sessionMessages, setSessionMessages] = useState(0);

  const aiResponses = language === 'chinese' 
    ? ((level as number) === 1 ? hsk1Responses : hsk2Responses)
    : japaneseN5Responses; // Use Japanese responses
  const suggestions = language === 'chinese'
    ? ((level as number) === 1 ? hsk1Suggestions : hsk2Suggestions)
    : japaneseN5Suggestions; // Use Japanese suggestions

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Cleanup: Cancel speech when component unmounts
    return () => {
      window.speechSynthesis.cancel();
      console.log('🔇 Chatbot unmounted - stopping all speech');
    };
  }, []);

  useEffect(() => {
    // Track chat session when component unmounts or user sends enough messages
    return () => {
      if (sessionMessages >= 5) {
        const updatedProgress = { ...userProgress };
        if (!updatedProgress.levelProgress) updatedProgress.levelProgress = {};
        if (!updatedProgress.levelProgress[level]) {
          updatedProgress.levelProgress[level] = {
            vocabularyLearned: 0,
            vocabularyTotal: 150,
            exercisesCompleted: 0,
            exercisesTotal: 10,
            chatSessions: 0
          };
        }
        updatedProgress.levelProgress[level].chatSessions = (updatedProgress.levelProgress[level].chatSessions || 0) + 1;
        const userId = localStorage.getItem('bilingua_current_user');
        if (userId) {
          api.saveProgress(userId, updatedProgress).catch(err => console.error('Failed to save progress:', err));
        }
        onProgressUpdate();
      }
    };
  }, [sessionMessages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setSessionMessages(prev => prev + 1);

    // Simulate AI response
    setTimeout(() => {
      const response = aiResponses[responseIndex % aiResponses.length];
      
      if (language === 'chinese') {
        const aiMessage: Message = {
          id: messages.length + 2,
          sender: 'ai',
          text: response.chinese,
          translation: response.english,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Japanese
        const aiMessage: Message = {
          id: messages.length + 2,
          sender: 'ai',
          text: (response as any).japanese,
          hiragana: (response as any).hiragana,
          translation: response.english,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      }
      
      setResponseIndex(prev => prev + 1);
    }, 1000);
  };

  const useSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  const playAudio = (text: string) => {
    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Small delay to ensure cancellation completes
      setTimeout(() => {
        const speak = () => {
          try {
            // Validate text
            if (!text || text.trim() === '' || text === 'undefined') {
              console.error('Invalid text to speak:', text);
              return;
            }
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language === 'chinese' ? 'zh-CN' : 'ja-JP';
            
            // Get available voices
            const voices = window.speechSynthesis.getVoices();
            
            if (voices.length > 0) {
              // Use voice settings from user preferences
              const targetVoice = findBestVoice(voices, language);
              
              if (targetVoice) {
                utterance.voice = targetVoice;
                const actorProfile = getCurrentVoiceActor();
                console.log(`🎤 Using ${actorProfile.name}: ${targetVoice.name} (${targetVoice.lang})`);
              }
            }
            
            // Get voice settings (rate, pitch) from user preferences
            const voiceSettings = getVoiceSettings(language);
            utterance.rate = voiceSettings.rate;
            utterance.pitch = voiceSettings.pitch;
            utterance.volume = 1.0;
            
            utterance.onerror = (event) => {
              // Ignore "interrupted" errors - they're expected when cancelling speech
              if (event.error === 'interrupted' || event.error === 'cancelled') {
                console.log('🔇 Speech interrupted (normal behavior)');
                return;
              }
              console.error('Speech error:', event.error);
              if (event.error === 'not-allowed' || event.error === 'audio-busy') {
                console.warn('⚠️ Audio playback issue, please try again');
              }
            };
            
            utterance.onstart = () => {
              const actor = getCurrentVoiceActor();
              console.log(`🔊 ${actor.icon} ${actor.name}: "${utterance.text}" (${utterance.lang}) - Rate: ${utterance.rate}, Pitch: ${utterance.pitch}`);
            };
            
            // Additional safety check
            if (!utterance.text || utterance.text.trim() === '') {
              console.error('Cannot speak empty text');
              return;
            }
            
            window.speechSynthesis.speak(utterance);
          } catch (error) {
            console.error('Error in speak function:', error);
          }
        };
        
        // Load voices and speak
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          speak();
        } else {
          let voicesLoaded = false;
          
          const voicesChangedHandler = () => {
            if (!voicesLoaded) {
              voicesLoaded = true;
              speak();
            }
          };
          
          window.speechSynthesis.addEventListener('voiceschanged', voicesChangedHandler, { once: true });
          
          setTimeout(() => {
            if (!voicesLoaded) {
              voicesLoaded = true;
              window.speechSynthesis.removeEventListener('voiceschanged', voicesChangedHandler);
              speak();
            }
          }, 500);
        }
      }, 150);
    } catch (error) {
      console.error('Failed to play audio:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950 p-4">
      <div className="max-w-4xl mx-auto pt-8 h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => {
            window.speechSynthesis.cancel();
            onBack();
          }}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            <Badge>{language === 'chinese' ? `HSK ${level}` : level}</Badge>
            <Badge variant="secondary">AI Tutor</Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowTranslations(!showTranslations)}
            >
              {showTranslations ? 'Hide' : 'Show'} Translations
            </Button>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-purple-100 text-purple-600">AI</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>
                  {language === 'chinese' ? 'Chinese' : 'Japanese'} Conversation Partner ({language === 'chinese' ? `HSK ${level}` : level})
                </CardTitle>
                <p className="text-sm text-gray-500">Practice real conversations at your level</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className="flex items-start gap-2">
                        {message.sender === 'ai' && (
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex-1">
                          <div 
                            className={`rounded-lg p-3 ${
                              message.sender === 'user' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                            }`}
                          >
                            <p className="text-lg" style={{ fontFamily: language === 'japanese' ? 'Noto Sans JP, sans-serif' : 'inherit' }}>{message.text}</p>
                            {/* Show hiragana reading for Japanese (like furigana) */}
                            {message.sender === 'ai' && language === 'japanese' && message.hiragana && showTranslations && (
                              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                                📖 Reading: {message.hiragana}
                              </p>
                            )}
                          </div>
                          {message.sender === 'ai' && showTranslations && message.translation && (
                            <p className="text-xs text-gray-500 mt-1 ml-1">
                              💬 Translation: {message.translation}
                            </p>
                          )}
                          {message.sender === 'ai' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="mt-1 h-6 px-2"
                              onClick={() => playAudio(message.text)}
                            >
                              <Volume2 className="w-3 h-3 mr-1" />
                              Listen
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Suggestions */}
            <div className="border-t p-4 bg-blue-50 dark:bg-blue-950">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-gray-900 dark:text-gray-100">Quick suggestions ({language === 'chinese' ? `HSK ${level}` : level}):</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => useSuggestion(suggestion)}
                    className="text-sm"
                    style={{ fontFamily: language === 'japanese' ? 'Noto Sans JP' : 'inherit' }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Type your message in ${language === 'chinese' ? 'Chinese' : 'Japanese'}...`}
                  className="flex-1"
                />
                <Button type="submit" disabled={!input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                💡 AI Tip: Don't worry about mistakes! I'm here to help you practice {language === 'chinese' ? `HSK ${level} Chinese` : `${level} Japanese`}.
                {sessionMessages >= 5 && " Great job! This session will count towards your progress."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}