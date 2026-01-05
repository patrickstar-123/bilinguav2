import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, CheckCircle, AlertCircle, Key, Copy, ExternalLink } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { copyToClipboard } from '../utils/clipboard';

export function AdminQuickSetup({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showManual, setShowManual] = useState(false);

  const ADMIN_EMAIL = 'admin@bilinguav2.com';
  const ADMIN_PASSWORD = 'Admin123!Test';

  const createAdminViaAPI = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-5a91a1cb`;
      
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          name: 'Admin Test Account'
        }),
      });

      const data = await response.json();

      if (response.ok || data.success || data.message?.includes('already') || data.error?.includes('already')) {
        setSuccess(true);
        setTimeout(() => {
          onComplete();
        }, 2000);
      } else {
        throw new Error(data.error || 'Failed to create account');
      }
    } catch (err: any) {
      console.error('❌ Failed to create admin account:', err);
      setError('Automatic creation failed. Please use the Manual Method below (it only takes 2 minutes!)');
      setShowManual(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = async (text: string) => {
    const success = await copyToClipboard(text);
    if (!success) {
      alert('Unable to copy. Please copy manually:\n\n' + text);
    }
  };

  const supabaseUrl = `https://supabase.com/dashboard/project/${projectId}/auth/users`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl">
              <Key className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-center text-3xl">Admin Account Setup</CardTitle>
          <CardDescription className="text-center text-lg">
            Create the admin account manually in Supabase Dashboard (takes 2 minutes)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!success && !loading && (
            <>
              {/* Credentials Display */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700">
                <h3 className="font-bold text-lg mb-4 text-center">Admin Credentials</h3>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Email</p>
                      <p className="font-mono text-sm font-bold">{ADMIN_EMAIL}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyToClipboard(ADMIN_EMAIL)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Password</p>
                      <p className="font-mono text-sm font-bold">{ADMIN_PASSWORD}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyToClipboard(ADMIN_PASSWORD)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Method 1: Automatic */}
              <div className="space-y-3">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  Automatic Creation (Try This First)
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click the button below to automatically create the admin account via API.
                </p>
                
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={createAdminViaAPI}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg"
                  size="lg"
                >
                  🚀 Create Admin Account Now
                </Button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t-2 border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm uppercase">
                  <span className="bg-white dark:bg-gray-900 px-4 text-gray-600 dark:text-gray-400 font-bold">
                    OR
                  </span>
                </div>
              </div>

              {/* Method 2: Manual */}
              <div className="space-y-3">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  Manual Creation (If Automatic Fails)
                </h3>
                <Alert className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-500/50">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-sm">
                    If the automatic method doesn't work, create the account manually in Supabase Dashboard.
                  </AlertDescription>
                </Alert>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                  <p className="font-bold text-sm">Follow these steps:</p>
                  <ol className="text-sm space-y-2 list-decimal list-inside">
                    <li>Click the button below to open Supabase Dashboard</li>
                    <li>Go to <strong>Authentication → Users</strong></li>
                    <li>Click <strong>"Add User"</strong> → <strong>"Create new user"</strong></li>
                    <li>Copy and paste the email and password from above</li>
                    <li><strong>IMPORTANT:</strong> Check ✅ <strong>"Auto Confirm User"</strong></li>
                    <li>Click <strong>"Create User"</strong></li>
                    <li>Come back here and click <strong>"Done - Go to Login"</strong></li>
                  </ol>
                </div>

                <Button
                  variant="outline"
                  className="w-full h-12 text-lg"
                  onClick={() => window.open(supabaseUrl, '_blank')}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Open Supabase Dashboard
                </Button>
              </div>

              {/* Skip/Done Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  onClick={onComplete}
                  variant="outline"
                  className="flex-1 h-11"
                >
                  Skip (Already Created)
                </Button>
                <Button 
                  onClick={onComplete}
                  variant="default"
                  className="flex-1 h-11 bg-green-600 hover:bg-green-700"
                >
                  Done - Go to Login
                </Button>
              </div>

              {/* Help Section */}
              <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-500/50">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-sm">
                  <strong>What this account includes:</strong><br />
                  • All HSK 1-6 and JLPT N5-N1 levels unlocked<br />
                  • 999,999 points<br />
                  • All prerequisites completed<br />
                  • Perfect for testing all features
                </AlertDescription>
              </Alert>
            </>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
              <p className="text-lg font-semibold">Creating admin account...</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">This should only take a moment</p>
            </div>
          )}

          {success && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">Success!</h3>
                <p className="text-lg">Admin account created successfully</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Redirecting to login page...</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}