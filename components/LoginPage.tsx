import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle, CheckCircle, Globe2, Sparkles } from 'lucide-react';
import { api } from '../utils/api';
import { isAdminAccount, validateAdminLogin, getAdminUserData } from '../utils/adminAccount';

interface LoginPageProps {
  onLogin: (email: string, name: string, isNewUser?: boolean) => void;
  onSetupAdmin?: () => void;
}

export function LoginPage({ onLogin, onSetupAdmin }: LoginPageProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);
    
    try {
      // Check if admin account
      if (isAdminAccount(loginEmail)) {
        if (validateAdminLogin(loginEmail, loginPassword)) {
          // Admin login - sign in through Supabase to get real token
          try {
            const { session, user } = await api.signin(loginEmail, loginPassword);
            
            if (session && user) {
              // Store session info
              localStorage.setItem('bilingua_current_user', user.id);
              localStorage.setItem('bilingua_user_email', user.email);
              localStorage.setItem('bilingua_access_token', session.access_token);
              localStorage.setItem('bilingua_is_admin', 'true');
              
              // Store admin data for UI
              const adminData = getAdminUserData();
              // Override the ID with the real user ID from Supabase
              adminData.id = user.id;
              localStorage.setItem('bilingua_admin_data', JSON.stringify(adminData));
              
              console.log('🔑 ADMIN LOGIN SUCCESSFUL - All levels unlocked!');
              onLogin(user.email, user.user_metadata?.name || adminData.name, false);
              return;
            }
          } catch (adminSigninError) {
            // If signin fails, admin account might not exist in Supabase yet
            console.error('Admin account needs to be created in Supabase:', adminSigninError);
            setLoginError('Admin account not created yet. Click "Create Admin Account" below.');
            setIsLoading(false);
            return;
          }
        } else {
          setLoginError('Invalid admin password');
          setIsLoading(false);
          return;
        }
      }

      // Normal user login
      const { session, user } = await api.signin(loginEmail, loginPassword);
      
      if (session && user) {
        localStorage.setItem('bilingua_current_user', user.id);
        localStorage.setItem('bilingua_user_email', user.email);
        localStorage.setItem('bilingua_access_token', session.access_token);
        localStorage.setItem('bilingua_is_admin', 'false');
        onLogin(user.email, user.user_metadata?.name || user.email.split('@')[0], false);
      }
    } catch (error: any) {
      setLoginError(error.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    setSignupSuccess('');
    setIsLoading(true);
    
    try {
      const result = await api.signup(signupEmail, signupPassword, signupName);
      
      if (result.success) {
        setSignupSuccess('Account created! Logging you in...');
        
        // Auto-login after signup
        setTimeout(async () => {
          try {
            const { session, user } = await api.signin(signupEmail, signupPassword);
            if (session && user) {
              localStorage.setItem('bilingua_current_user', user.id);
              localStorage.setItem('bilingua_user_email', user.email);
              localStorage.setItem('bilingua_access_token', session.access_token);
              onLogin(user.email, user.user_metadata?.name || signupName, true);
            }
          } catch (error: any) {
            setSignupError('Account created but login failed. Please login manually.');
            setTimeout(() => {
              const loginTab = document.querySelector('[value="login"]') as HTMLElement;
              loginTab?.click();
            }, 2000);
          }
        }, 1000);
      }
    } catch (error: any) {
      setSignupError(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-black dark:via-purple-900 dark:to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-glow"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-scale">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gradient-to-br dark:from-blue-600 dark:to-purple-600 rounded-2xl shadow-2xl mb-4 animate-bounce-in hover-lift">
            <Globe2 className="w-12 h-12 text-purple-600 dark:text-white" />
          </div>
          <h1 className="text-5xl text-white font-bold mb-2 drop-shadow-lg">BilinguaV2</h1>
          <div className="flex items-center justify-center gap-2 text-white animate-slide-in-left">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <p className="text-lg font-medium drop-shadow-md">Master Chinese & Japanese with AI</p>
            <Sparkles className="w-4 h-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Login/Signup Card */}
        <Card className="shadow-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 animate-slide-in-right">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center text-gray-900 dark:text-white font-bold">Get Started</CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-300 font-medium">
              Sign in to continue or create a new account ✨
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="login" className="text-gray-900 dark:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="text-gray-900 dark:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white">Sign Up</TabsTrigger>
              </TabsList>
              
              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4 animate-fade-in">
                {loginError && (
                  <Alert variant="destructive" className="animate-bounce-in">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}

                {loginError.includes('Admin account not created') && onSetupAdmin && (
                  <Button
                    type="button"
                    onClick={onSetupAdmin}
                    variant="outline"
                    className="w-full h-11 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold"
                  >
                    🔧 Create Admin Account
                  </Button>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-gray-900 dark:text-white font-semibold">Email Address</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-11 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gray-900 dark:text-white font-semibold">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-11 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-500 dark:hover:to-purple-500 text-white shadow-lg hover:shadow-xl transition-all hover-lift ripple-effect"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2 text-white">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Signing in...
                      </span>
                    ) : (
                      <span className="text-white">Sign In 🚀</span>
                    )}
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t-2 border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-gray-900 px-3 text-gray-700 dark:text-gray-300 font-bold">
                      Learn Multiple Languages
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-3 text-center border border-red-100 dark:border-red-800/50">
                    <div className="text-2xl mb-1">🇨🇳</div>
                    <p className="text-xs text-gray-900 dark:text-white font-medium">Chinese</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">HSK 1-6</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg p-3 text-center border border-pink-100 dark:border-pink-800/50">
                    <div className="text-2xl mb-1">🇯🇵</div>
                    <p className="text-xs text-gray-900 dark:text-white font-medium">Japanese</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">JLPT N5-N1</p>
                  </div>
                </div>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-4 animate-fade-in">
                {signupError && (
                  <Alert variant="destructive" className="animate-bounce-in">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{signupError}</AlertDescription>
                  </Alert>
                )}
                {signupSuccess && (
                  <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-500/50 animate-bounce-in">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 checkmark-animate" />
                    <AlertDescription className="text-green-800 dark:text-green-300">{signupSuccess}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-gray-900 dark:text-white font-semibold">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-11 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-900 dark:text-white font-semibold">Email Address</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-11 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-900 dark:text-white font-semibold">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="At least 6 characters"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      minLength={6}
                      disabled={isLoading}
                      className="h-11 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    />
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                      Password must be at least 6 characters
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-500 dark:hover:to-purple-500 text-white shadow-lg hover:shadow-xl transition-all hover-lift ripple-effect"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2 text-white">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </span>
                    ) : (
                      <span className="text-white">Create Account ✨</span>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3 border-2 border-white/50">
            <div className="text-2xl mb-1">🤖</div>
            <p className="text-xs text-white font-bold drop-shadow-md">AI-Powered</p>
          </div>
          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3 border-2 border-white/50">
            <div className="text-2xl mb-1">🏆</div>
            <p className="text-xs text-white font-bold drop-shadow-md">Gamified</p>
          </div>
          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3 border-2 border-white/50">
            <div className="text-2xl mb-1">📱</div>
            <p className="text-xs text-white font-bold drop-shadow-md">Progressive</p>
          </div>
        </div>
      </div>
    </div>
  );
}