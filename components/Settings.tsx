import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { 
  ArrowLeft, 
  User, 
  Globe, 
  Bell, 
  Palette, 
  Database, 
  Trash2, 
  RefreshCw, 
  AlertTriangle,
  Settings as SettingsIcon,
  Shield,
  HelpCircle,
  Mail,
  Lock,
  Info,
  Moon,
  Sun,
  Eye,
  EyeOff,
  Mic
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId } from '../utils/supabase/info';
import { 
  VOICE_ACTORS, 
  getSavedVoiceActor, 
  saveVoiceActor, 
  type VoiceActorType 
} from '../utils/voiceSettings';

interface SettingsProps {
  onBack: () => void;
  userEmail: string;
  userName: string;
  selectedLanguage: 'chinese' | 'japanese';
}

interface DataStats {
  totalUserDataEntries: number;
  totalLeaderboardEntries: number;
  totalAuthUsers: number;
  timestamp: string;
}

export function Settings({ onBack, userEmail, userName, selectedLanguage }: SettingsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [stats, setStats] = useState<DataStats | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Password change state
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Settings state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [showPinyin, setShowPinyin] = useState(true);
  const [selectedVoiceActor, setSelectedVoiceActor] = useState<VoiceActorType>(() => getSavedVoiceActor());
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem('bilingua_dark_mode');
    return saved === 'true';
  });

  // Handle voice actor change
  const handleVoiceActorChange = (voiceType: VoiceActorType) => {
    setSelectedVoiceActor(voiceType);
    saveVoiceActor(voiceType);
    const actor = VOICE_ACTORS[voiceType];
    toast.success(`Voice changed to ${actor.name}! ${actor.icon}`);
  };

  // Apply dark mode on mount and when it changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bilingua_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bilingua_dark_mode', 'false');
    }
  }, [darkMode]);

  const loadStats = async () => {
    setIsLoadingStats(true);
    try {
      const accessToken = localStorage.getItem('bilingua_access_token');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5a91a1cb/admin/stats`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load statistics');
      }

      const data = await response.json();
      setStats(data.stats);
      toast.success('Statistics loaded');
    } catch (error) {
      console.error('Error loading stats:', error);
      toast.error('Failed to load statistics');
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleClearAllData = async () => {
    setIsDeleting(true);
    try {
      const accessToken = localStorage.getItem('bilingua_access_token');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5a91a1cb/admin/clear-all-data`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to clear data');
      }

      const data = await response.json();
      toast.success(`All data cleared successfully! Deleted ${data.summary.authUsersDeleted} users`);
      
      await loadStats();
      setDeleteDialogOpen(false);
      
      setTimeout(() => {
        localStorage.clear();
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error clearing data:', error);
      toast.error('Failed to clear data');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleChangePassword = async () => {
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setIsChangingPassword(true);
    try {
      const accessToken = localStorage.getItem('bilingua_access_token');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5a91a1cb/auth/change-password`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change password');
      }

      toast.success('Password changed successfully!');
      setPasswordDialogOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button onClick={onBack} variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl">Settings</h1>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="account">
              <User className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Palette className="w-4 h-4 mr-2" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="data">
              <Database className="w-4 h-4 mr-2" />
              Data
            </TabsTrigger>
            <TabsTrigger value="about">
              <Info className="w-4 h-4 mr-2" />
              About
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Information
                </CardTitle>
                <CardDescription>Your personal account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Name</Label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    {userName}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm">Email</Label>
                  <div className="p-3 bg-gray-50 rounded-md border flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {userEmail}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm">Current Language</Label>
                  <div className="p-3 bg-gray-50 rounded-md border flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    {selectedLanguage === 'chinese' ? '🇨🇳 Chinese (HSK)' : '🇯🇵 Japanese (JLPT)'}
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Security
                  </Label>
                  
                  <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto">
                        <Lock className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                          Enter your current password and choose a new one.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <div className="relative">
                            <Input
                              id="current-password"
                              type={showCurrentPassword ? 'text' : 'password'}
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              placeholder="Enter current password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                              {showCurrentPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <div className="relative">
                            <Input
                              id="new-password"
                              type={showNewPassword ? 'text' : 'password'}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Enter new password (min 6 characters)"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <div className="relative">
                            <Input
                              id="confirm-password"
                              type={showConfirmPassword ? 'text' : 'password'}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Confirm new password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setPasswordDialogOpen(false);
                            setCurrentPassword('');
                            setNewPassword('');
                            setConfirmPassword('');
                          }}
                          disabled={isChangingPassword}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleChangePassword}
                          disabled={isChangingPassword}
                        >
                          {isChangingPassword ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Changing...
                            </>
                          ) : (
                            'Change Password'
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Learning Preferences
                </CardTitle>
                <CardDescription>Customize your learning experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sound Effects</Label>
                    <p className="text-sm text-gray-500">Play sounds for correct/incorrect answers</p>
                  </div>
                  <Switch 
                    checked={soundEnabled} 
                    onCheckedChange={setSoundEnabled}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-play Audio</Label>
                    <p className="text-sm text-gray-500">Automatically play pronunciation audio</p>
                  </div>
                  <Switch 
                    checked={autoPlayAudio} 
                    onCheckedChange={setAutoPlayAudio}
                  />
                </div>

                <Separator />

                {selectedLanguage === 'chinese' && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Pinyin</Label>
                        <p className="text-sm text-gray-500">Display pinyin romanization by default</p>
                      </div>
                      <Switch 
                        checked={showPinyin} 
                        onCheckedChange={setShowPinyin}
                      />
                    </div>
                    <Separator />
                  </>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Notifications
                    </Label>
                    <p className="text-sm text-gray-500">Receive study reminders and updates</p>
                  </div>
                  <Switch 
                    checked={notificationsEnabled} 
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                      Dark Mode
                    </Label>
                    <p className="text-sm text-gray-500">Use dark theme across the app</p>
                  </div>
                  <Switch 
                    checked={darkMode} 
                    onCheckedChange={setDarkMode}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Mic className="w-4 h-4" />
                    Voice Actor
                  </Label>
                  <p className="text-sm text-gray-500 mb-4">
                    Choose a voice style for audio pronunciation
                  </p>
                  <RadioGroup
                    value={selectedVoiceActor}
                    onValueChange={handleVoiceActorChange}
                  >
                    {Object.entries(VOICE_ACTORS).map(([key, actor]) => (
                      <div 
                        key={key} 
                        className="flex items-start space-x-3 p-4 rounded-lg border-2 hover:border-purple-300 transition-all"
                      >
                        <RadioGroupItem value={key} id={`voice-${key}`} className="mt-1" />
                        <Label htmlFor={`voice-${key}`} className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{actor.icon}</span>
                            <span>{actor.name}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {actor.description}
                          </p>
                          <div className="mt-2 flex gap-2 text-xs text-gray-500">
                            <span>Rate: {actor.japanese.rate}x</span>
                            <span>•</span>
                            <span>Pitch: {actor.japanese.pitch}</span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data" className="space-y-6">
            {/* Statistics Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Database Statistics
                </CardTitle>
                <CardDescription>View system-wide data statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    onClick={loadStats} 
                    disabled={isLoadingStats}
                    className="w-full"
                    variant="outline"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingStats ? 'animate-spin' : ''}`} />
                    {isLoadingStats ? 'Loading...' : 'Load Statistics'}
                  </Button>

                  {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                        <div className="text-sm text-gray-600 mb-1">Total Users</div>
                        <div className="text-3xl text-blue-600">{stats.totalAuthUsers}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                        <div className="text-sm text-gray-600 mb-1">Data Entries</div>
                        <div className="text-3xl text-green-600">{stats.totalUserDataEntries}</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                        <div className="text-sm text-gray-600 mb-1">Leaderboard</div>
                        <div className="text-3xl text-purple-600">{stats.totalLeaderboardEntries}</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-red-700">
                  Irreversible actions - proceed with extreme caution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All User Data
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="w-6 h-6" />
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="space-y-2">
                        <p className="text-base">
                          This action <strong>cannot be undone</strong>. This will permanently delete:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>All user accounts and authentication data</li>
                          <li>All user progress and learning data</li>
                          <li>All points and leaderboard entries</li>
                          <li>All stored preferences and settings</li>
                        </ul>
                        <p className="text-base mt-4">
                          You will be logged out after this operation completes.
                        </p>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleClearAllData}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {isDeleting ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          'Yes, delete everything'
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  About BilinguaV2
                </CardTitle>
                <CardDescription>Application information and resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">Version</h3>
                  <p className="text-sm text-gray-600">BilinguaV2 - Version 2.0</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-semibold">Features</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✅ Chinese (HSK 1-6) and Japanese (JLPT N5-N1) learning</li>
                    <li>✅ AI-powered conversation practice</li>
                    <li>✅ Character writing and recognition</li>
                    <li>✅ Vocabulary flashcards with spaced repetition</li>
                    <li>✅ Interactive quizzes and exams</li>
                    <li>✅ Conjunction and grammar practice</li>
                    <li>✅ Global leaderboard and points system</li>
                    <li>✅ Progressive level unlocking</li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    Help & Support
                  </h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" disabled>
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Support (Coming Soon)
                    </Button>
                    <Button variant="outline" className="w-full justify-start" disabled>
                      <HelpCircle className="w-4 h-4 mr-2" />
                      View Documentation (Coming Soon)
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
                  <p className="text-sm text-center">
                    Made with ❤️ for language learners worldwide
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}