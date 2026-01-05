import { api } from './api';

/**
 * Check if current user is admin
 */
export function isCurrentUserAdmin(): boolean {
  return localStorage.getItem('bilingua_is_admin') === 'true';
}

/**
 * Save progress with admin account handling
 * Admin now uses API since they have a real Supabase account
 */
export async function saveProgressSafe(userId: string, progress: any): Promise<void> {
  const isAdmin = isCurrentUserAdmin();
  
  if (isAdmin) {
    // Admin account - save to database AND update local cache
    try {
      await api.saveProgress(userId, progress);
      localStorage.setItem('bilingua_admin_data', JSON.stringify(progress));
      console.log('✅ Admin progress saved to database and cached locally');
    } catch (error) {
      console.error('Failed to save admin progress:', error);
      // Fallback to local storage only
      localStorage.setItem('bilingua_admin_data', JSON.stringify(progress));
      console.log('⚠️ Admin progress saved locally only (API failed)');
    }
    return;
  }
  
  // Normal user - save to database
  await api.saveProgress(userId, progress);
}

/**
 * Get progress with admin account handling
 */
export async function getProgressSafe(userId: string): Promise<any> {
  const isAdmin = isCurrentUserAdmin();
  
  if (isAdmin) {
    // Admin account - try to fetch from database, fallback to local
    try {
      const progress = await api.getProgress(userId);
      // Cache it locally
      localStorage.setItem('bilingua_admin_data', JSON.stringify(progress));
      return progress;
    } catch (error) {
      console.error('Failed to fetch admin progress from API, using local cache:', error);
      // Fallback to local data
      const adminData = localStorage.getItem('bilingua_admin_data');
      return adminData ? JSON.parse(adminData) : null;
    }
  }
  
  // Normal user - fetch from database
  return await api.getProgress(userId);
}