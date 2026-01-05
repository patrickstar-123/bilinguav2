/**
 * DELETE ALL USER DATA UTILITY
 * 
 * This utility provides functions to completely wipe all user data from the database.
 * USE WITH EXTREME CAUTION - THIS ACTION IS IRREVERSIBLE!
 */

import { projectId, publicAnonKey } from './supabase/info';

interface DeleteSummary {
  userDataDeleted: number;
  leaderboardDeleted: number;
  authUsersDeleted: number;
  timestamp: string;
  initiatedBy: string;
}

interface DeleteResponse {
  success: boolean;
  message: string;
  summary: DeleteSummary;
}

/**
 * Delete all user data from the database
 * Requires authentication (must be logged in)
 * 
 * This will delete:
 * - All user accounts
 * - All progress data
 * - All points
 * - All leaderboard entries
 * 
 * @returns Promise with delete summary
 */
export async function deleteAllUserData(): Promise<DeleteResponse> {
  try {
    const accessToken = localStorage.getItem('bilingua_access_token');
    
    if (!accessToken) {
      throw new Error('Not authenticated. Please log in first.');
    }

    console.warn('🚨 DELETING ALL USER DATA - THIS CANNOT BE UNDONE!');

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-5a91a1cb/admin/clear-all-data`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete data');
    }

    const data: DeleteResponse = await response.json();
    
    console.log('✅ Delete Summary:', data.summary);
    console.log(`   - Auth users deleted: ${data.summary.authUsersDeleted}`);
    console.log(`   - User data entries deleted: ${data.summary.userDataDeleted}`);
    console.log(`   - Leaderboard entries deleted: ${data.summary.leaderboardDeleted}`);
    console.log(`   - Timestamp: ${data.summary.timestamp}`);
    console.log(`   - Initiated by: ${data.summary.initiatedBy}`);

    return data;

  } catch (error) {
    console.error('❌ Error deleting user data:', error);
    throw error;
  }
}

/**
 * Get database statistics
 * Shows how many records exist before deletion
 * 
 * @returns Promise with statistics
 */
export async function getDataStats() {
  try {
    const accessToken = localStorage.getItem('bilingua_access_token');
    
    if (!accessToken) {
      throw new Error('Not authenticated. Please log in first.');
    }

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-5a91a1cb/admin/stats`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get stats');
    }

    const { stats } = await response.json();
    
    console.log('📊 Current Database Statistics:');
    console.log(`   - Total auth users: ${stats.totalAuthUsers}`);
    console.log(`   - Total user data entries: ${stats.totalUserDataEntries}`);
    console.log(`   - Total leaderboard entries: ${stats.totalLeaderboardEntries}`);
    console.log(`   - Timestamp: ${stats.timestamp}`);

    return stats;

  } catch (error) {
    console.error('❌ Error getting stats:', error);
    throw error;
  }
}

/**
 * DANGER: Interactive delete function
 * Call this from browser console to delete all data
 * 
 * Usage in browser console:
 * > await window.deleteAllData()
 */
export async function confirmAndDelete() {
  console.log('⚠️  WARNING: You are about to delete ALL user data!');
  console.log('');
  
  // First show current stats
  await getDataStats();
  console.log('');
  
  const confirmation = confirm(
    '🚨 DELETE ALL USER DATA?\n\n' +
    'This will permanently delete:\n' +
    '• All user accounts\n' +
    '• All progress data\n' +
    '• All points\n' +
    '• All leaderboard entries\n\n' +
    'THIS CANNOT BE UNDONE!\n\n' +
    'Click OK to confirm deletion.'
  );

  if (!confirmation) {
    console.log('❌ Deletion cancelled by user');
    return;
  }

  const doubleConfirm = confirm(
    '⚠️  FINAL WARNING!\n\n' +
    'Are you ABSOLUTELY SURE you want to delete everything?\n\n' +
    'Click OK to proceed with deletion.'
  );

  if (!doubleConfirm) {
    console.log('❌ Deletion cancelled by user');
    return;
  }

  console.log('🗑️  Proceeding with deletion...');
  
  const result = await deleteAllUserData();
  
  console.log('');
  console.log('✅ ALL DATA HAS BEEN DELETED!');
  console.log('');
  console.log('You will be logged out in 3 seconds...');
  
  setTimeout(() => {
    localStorage.clear();
    window.location.reload();
  }, 3000);

  return result;
}

// Make function available in browser console
if (typeof window !== 'undefined') {
  (window as any).deleteAllData = confirmAndDelete;
  (window as any).getDataStats = getDataStats;
}
