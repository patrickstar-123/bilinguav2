import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Trash2, Database, RefreshCw, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { deleteAllUserData, getDataStats } from '../utils/deleteAllData';

export function DataDeletionTool() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteComplete, setDeleteComplete] = useState(false);
  const [deleteSummary, setDeleteSummary] = useState<any>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoadingStats(true);
    try {
      const data = await getDataStats();
      setStats(data);
      toast.success('Statistics loaded');
    } catch (error) {
      console.error('Error loading stats:', error);
      toast.error('Failed to load statistics. Are you logged in?');
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteAllUserData();
      setDeleteSummary(result.summary);
      setDeleteComplete(true);
      toast.success('All data deleted successfully!');
      
      // Reload stats to show zero
      await loadStats();
      
      // Close dialog
      setDeleteDialogOpen(false);
      
      // Log user out after 3 seconds
      setTimeout(() => {
        localStorage.clear();
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error('Failed to delete data: ' + (error as Error).message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-8 border-red-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600 text-2xl">
              <AlertTriangle className="w-8 h-8" />
              Data Deletion Tool
            </CardTitle>
            <CardDescription>
              Permanently delete all user data from BilinguaV2 database
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Delete Complete Message */}
        {deleteComplete && deleteSummary && (
          <Card className="mb-8 border-green-300 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                Deletion Complete!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-green-900">All user data has been successfully deleted:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Auth users deleted: <strong>{deleteSummary.authUsersDeleted}</strong></li>
                  <li>User data entries deleted: <strong>{deleteSummary.userDataDeleted}</strong></li>
                  <li>Leaderboard entries deleted: <strong>{deleteSummary.leaderboardDeleted}</strong></li>
                  <li>Initiated by: <strong>{deleteSummary.initiatedBy}</strong></li>
                  <li>Timestamp: <strong>{new Date(deleteSummary.timestamp).toLocaleString()}</strong></li>
                </ul>
                <p className="text-green-900 mt-4">
                  ✅ You will be logged out shortly...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Statistics Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Current Database Statistics
            </CardTitle>
            <CardDescription>
              View how many records are currently stored
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button 
                onClick={loadStats} 
                disabled={isLoadingStats || isDeleting}
                className="w-full"
                variant="outline"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingStats ? 'animate-spin' : ''}`} />
                {isLoadingStats ? 'Loading...' : 'Refresh Statistics'}
              </Button>

              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                    <div className="text-sm text-gray-600 mb-1">Auth Users</div>
                    <div className="text-3xl text-blue-600">{stats.totalAuthUsers}</div>
                    <div className="text-xs text-gray-500 mt-1">User accounts</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <div className="text-sm text-gray-600 mb-1">User Data</div>
                    <div className="text-3xl text-green-600">{stats.totalUserDataEntries}</div>
                    <div className="text-xs text-gray-500 mt-1">Progress & points entries</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                    <div className="text-sm text-gray-600 mb-1">Leaderboard</div>
                    <div className="text-3xl text-purple-600">{stats.totalLeaderboardEntries}</div>
                    <div className="text-xs text-gray-500 mt-1">Ranking entries</div>
                  </div>
                </div>
              )}

              {!stats && !isLoadingStats && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                  <p className="text-orange-900">
                    ⚠️ Please load statistics first to see current data
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Warning Card */}
        <Card className="mb-6 border-orange-300 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="w-5 h-5" />
              Warning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p className="text-orange-900">
                <strong>This action is IRREVERSIBLE!</strong> Once deleted, the data cannot be recovered.
              </p>
              <p className="text-orange-900">
                Before deleting, make sure:
              </p>
              <ul className="list-disc list-inside space-y-1 text-orange-900 ml-4">
                <li>You have backed up any important data</li>
                <li>You understand this will delete ALL users and their progress</li>
                <li>You are authorized to perform this action</li>
                <li>You have confirmed with your team (if applicable)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone - Delete Button */}
        <Card className="border-red-300 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="w-5 h-5" />
              Danger Zone
            </CardTitle>
            <CardDescription className="text-red-700">
              Irreversible action - proceed with extreme caution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  size="lg"
                  disabled={isDeleting || deleteComplete}
                >
                  {isDeleting ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : deleteComplete ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Deletion Complete
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete All User Data
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="w-6 h-6" />
                    Are You Absolutely Sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="space-y-4">
                    <p className="text-base text-gray-900">
                      This action <strong className="text-red-600">CANNOT BE UNDONE</strong>!
                    </p>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-red-900 mb-2">
                        <strong>This will permanently delete:</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-red-900">
                        <li>All user accounts ({stats?.totalAuthUsers || 0} users)</li>
                        <li>All progress and learning data</li>
                        <li>All points and achievements</li>
                        <li>All leaderboard entries ({stats?.totalLeaderboardEntries || 0} entries)</li>
                        <li>All stored preferences and settings</li>
                      </ul>
                    </div>

                    <p className="text-base text-gray-900">
                      Total records to be deleted: <strong className="text-red-600">
                        {(stats?.totalAuthUsers || 0) + (stats?.totalUserDataEntries || 0) + (stats?.totalLeaderboardEntries || 0)}
                      </strong>
                    </p>

                    <p className="text-base text-gray-900">
                      You will be logged out after this operation completes.
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isDeleting ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Deleting...
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

            <p className="text-xs text-gray-600 text-center mt-4">
              Note: You must be logged in as an authenticated user to perform this action
            </p>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-6 border-blue-300 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-600 text-lg">Alternative: Browser Console Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p className="text-blue-900">
                You can also delete data using the browser console:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-blue-900 ml-4">
                <li>Open browser developer tools (F12)</li>
                <li>Go to the Console tab</li>
                <li>Type: <code className="bg-white px-2 py-1 rounded">await window.deleteAllData()</code></li>
                <li>Follow the confirmation prompts</li>
              </ol>
              <p className="text-blue-900 mt-4">
                To view stats only: <code className="bg-white px-2 py-1 rounded">await window.getDataStats()</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
