import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Badge } from './ui/badge';
import { Trash2, Database, RefreshCw, AlertTriangle, Users, FileText, TrendingUp, Shield, ArrowLeft, Activity } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AdminPanelProps {
  onBack: () => void;
}

interface DataStats {
  totalUserDataEntries: number;
  totalLeaderboardEntries: number;
  totalAuthUsers: number;
  timestamp: string;
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [stats, setStats] = useState<DataStats | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
      toast.success('Statistics loaded successfully');
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
      
      // Reload stats
      await loadStats();
      
      // Close dialog
      setDeleteDialogOpen(false);
      
      // Log user out after clearing data
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-black dark:via-gray-900 dark:to-black p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            onClick={onBack} 
            variant="outline"
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl">Admin Panel</h1>
                <p className="text-white/90">Manage application data and users</p>
              </div>
            </div>
            <Badge className="bg-white/20 hover:bg-white/30 border-white/40 mt-2">
              <Activity className="w-3 h-3 mr-1" />
              Administrator Access
            </Badge>
          </div>
        </div>

        {/* Statistics Section */}
        <Card className="mb-6 border-2 shadow-lg dark:bg-gray-900 dark:border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Database Statistics</CardTitle>
                  <CardDescription>Real-time application metrics</CardDescription>
                </div>
              </div>
              <Button 
                onClick={loadStats} 
                disabled={isLoadingStats}
                size="sm"
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingStats ? 'animate-spin' : ''}`} />
                {isLoadingStats ? 'Loading...' : 'Refresh'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {!stats && !isLoadingStats && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Click "Refresh" to load statistics</p>
              </div>
            )}

            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                        <p className="text-3xl">{stats.totalAuthUsers}</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-500 opacity-50" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Progress Entries</p>
                        <p className="text-3xl">{stats.totalUserDataEntries}</p>
                      </div>
                      <FileText className="w-8 h-8 text-green-500 opacity-50" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Leaderboard</p>
                        <p className="text-3xl">{stats.totalLeaderboardEntries}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-purple-500 opacity-50" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {stats && (
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Last updated: {new Date(stats.timestamp).toLocaleString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-2 border-red-200 dark:border-red-900 shadow-lg dark:bg-gray-900">
          <CardHeader className="bg-red-50 dark:bg-red-950/30 border-b border-red-200 dark:border-red-900">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-red-700 dark:text-red-400">Danger Zone</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Irreversible actions - proceed with extreme caution
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-4 mb-4">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-800 dark:text-red-300 mb-1">Warning</h4>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    Clearing all data will permanently delete all user accounts, progress, and leaderboard entries. 
                    This action cannot be undone and you will be logged out.
                  </p>
                </div>
              </div>
            </div>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  className="w-full gap-2"
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4" />
                  {isDeleting ? 'Clearing Data...' : 'Clear All User Data'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="dark:bg-gray-900 dark:border-gray-800">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <AlertTriangle className="w-6 h-6" />
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="space-y-3 dark:text-gray-300">
                    <p className="text-base">
                      This action <strong className="text-red-600 dark:text-red-400">CANNOT BE UNDONE</strong>. 
                      This will permanently delete:
                    </p>
                    <ul className="list-disc list-inside space-y-2 bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-900">
                      <li className="text-sm">All user accounts and authentication data</li>
                      <li className="text-sm">All user progress and learning data</li>
                      <li className="text-sm">All points and leaderboard entries</li>
                      <li className="text-sm">All stored preferences and settings</li>
                    </ul>
                    <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 p-3 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-400">
                        ⚠️ You will be automatically logged out after this operation completes.
                      </p>
                    </div>
                    <p className="text-base font-semibold text-red-600 dark:text-red-400">
                      Type confirmation below to proceed.
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="dark:bg-gray-800 dark:hover:bg-gray-700">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearAllData}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                  >
                    {isDeleting ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Clearing...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Yes, Delete Everything
                      </>
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 dark:bg-gray-900 dark:border-gray-800">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm mb-1">Administrator Information</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  This panel is for administrators only. All actions are logged and monitored. 
                  Use the statistics to monitor app usage and the danger zone only when necessary.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
