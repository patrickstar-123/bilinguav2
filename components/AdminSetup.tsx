import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, CheckCircle, AlertCircle, Key } from 'lucide-react';
import { api } from '../utils/api';

export function AdminSetup({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const createAdminAccount = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const ADMIN_EMAIL = 'admin@bilinguav2.com';
      const ADMIN_PASSWORD = 'Admin123!Test';

      // Try to sign up the admin account
      await api.signup(ADMIN_EMAIL, ADMIN_PASSWORD, 'Admin Test Account');

      setSuccess(true);
      
      // Wait 2 seconds then redirect to login
      setTimeout(() => {
        onComplete();
      }, 2000);
    } catch (err: any) {
      // If error is "User already exists", that's actually fine
      if (err.message?.includes('already') || err.message?.includes('exists') || err.message?.includes('registered')) {
        setSuccess(true);
        setTimeout(() => {
          onComplete();
        }, 2000);
      } else {
        setError(err.message || 'Failed to create admin account');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-black dark:via-black dark:to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Key className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">Admin Account Setup</CardTitle>
          <CardDescription className="text-center">
            Create the admin test account for BilinguaV2
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!success && !loading && (
            <>
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <p className="text-sm">
                  <strong>Admin Account Details:</strong>
                </p>
                <p className="text-sm font-mono bg-white p-2 rounded">
                  📧 Email: admin@bilinguav2.com
                </p>
                <p className="text-sm font-mono bg-white p-2 rounded">
                  🔒 Password: Admin123!Test
                </p>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This will create an admin account with:
                  <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                    <li>All levels unlocked (HSK 1-6, JLPT N5-N1)</li>
                    <li>999,999 points</li>
                    <li>All prerequisites completed</li>
                    <li>Full access for testing</li>
                  </ul>
                </AlertDescription>
              </Alert>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={createAdminAccount}
                className="w-full"
                size="lg"
              >
                Create Admin Account
              </Button>

              <Button 
                onClick={onComplete}
                variant="outline"
                className="w-full"
              >
                Skip (Account Already Exists)
              </Button>
            </>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
              <p className="text-sm text-gray-600">Creating admin account...</p>
            </div>
          )}

          {success && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg">Admin Account Created!</p>
                <p className="text-sm text-gray-600">Redirecting to login...</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}