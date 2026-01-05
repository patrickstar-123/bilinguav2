import { projectId, publicAnonKey } from './supabase/info';
import { createClient } from '@supabase/supabase-js';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-5a91a1cb`;

// Supabase client for auth
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Auth helper to get current session
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Get session error:', error);
    return null;
  }
  return session;
}

// Helper to make authenticated requests
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // Try to get token from localStorage first (for compatibility)
  let token = localStorage.getItem('bilingua_access_token');
  
  // If not in localStorage, try to get from Supabase session
  if (!token) {
    const session = await getSession();
    token = session?.access_token || null;
  }
  
  // Fall back to public anon key if no token found
  if (!token) {
    token = publicAnonKey;
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    try {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.error || 'Request failed');
    } catch (e) {
      // If JSON parsing fails, the body has already been consumed
      // Just throw a generic error
      console.error('API Error: Unable to parse error response');
      throw new Error('Request failed with status ' + response.status);
    }
  }

  return response.json();
}

export const api = {
  // ============================================
  // AUTHENTICATION
  // ============================================
  
  async signup(email: string, password: string, name?: string) {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      // Clone the response so we can try reading it twice if needed
      const clonedResponse = response.clone();
      try {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Signup failed');
      } catch (e) {
        // If JSON parsing fails, try text from the cloned response
        try {
          const errorText = await clonedResponse.text();
          throw new Error(errorText || 'Signup failed');
        } catch {
          throw new Error('Signup failed with status ' + response.status);
        }
      }
    }

    return response.json();
  },

  async signin(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  async signout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  },

  async getCurrentUser() {
    const session = await getSession();
    if (!session) return null;

    try {
      const response = await fetchWithAuth(`${API_BASE}/auth/user`);
      return response.user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  // ============================================
  // USER PROGRESS
  // ============================================

  async getProgress(userId: string) {
    try {
      const response = await fetchWithAuth(`${API_BASE}/progress/${userId}`);
      return response.progress;
    } catch (error: any) {
      console.error('Get progress error:', error);
      console.error('User ID:', userId);
      console.error('Access Token exists:', !!localStorage.getItem('bilingua_access_token'));
      // If it's a 404, the server will auto-create progress on next call
      // Re-throw so the caller can handle it
      throw error;
    }
  },

  async saveProgress(userId: string, progress: any) {
    try {
      console.log('Attempting to save progress for user:', userId);
      console.log('Access Token exists:', !!localStorage.getItem('bilingua_access_token'));
      await fetchWithAuth(`${API_BASE}/progress/${userId}`, {
        method: 'POST',
        body: JSON.stringify(progress),
      });
      console.log('Progress saved successfully');
    } catch (error) {
      console.error('Save progress error:', error);
      console.error('User ID:', userId);
      throw error;
    }
  },

  // ============================================
  // POINTS & LEADERBOARD
  // ============================================

  async addPoints(userId: string, type: 'exam' | 'quiz' | 'flashcard', points: number) {
    try {
      const response = await fetchWithAuth(`${API_BASE}/points/${userId}/add`, {
        method: 'POST',
        body: JSON.stringify({ type, points }),
      });
      return response;
    } catch (error) {
      console.error('Add points error:', error);
      throw error;
    }
  },

  async getPoints(userId: string) {
    try {
      const response = await fetchWithAuth(`${API_BASE}/points/${userId}`);
      return response.points;
    } catch (error) {
      console.error('Get points error:', error);
      return { totalPoints: 0, examPoints: 0, quizPoints: 0, flashcardPoints: 0 };
    }
  },

  async getLeaderboard(language: 'all' | 'chinese' | 'japanese' = 'all') {
    try {
      const response = await fetch(`${API_BASE}/leaderboard?language=${language}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      
      const data = await response.json();
      return data.leaderboard || [];
    } catch (error) {
      console.error('Get leaderboard error:', error);
      return [];
    }
  },

  // ============================================
  // ADMIN
  // ============================================

  async clearAllData() {
    try {
      const response = await fetchWithAuth(`${API_BASE}/admin/clear-all-data`, {
        method: 'POST',
      });
      return response;
    } catch (error) {
      console.error('Clear all data error:', error);
      throw error;
    }
  },

  async getAdminStats() {
    try {
      const response = await fetchWithAuth(`${API_BASE}/admin/stats`);
      return response.stats;
    } catch (error) {
      console.error('Get admin stats error:', error);
      throw error;
    }
  },

  // ============================================
  // HEALTH CHECK
  // ============================================

  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE}/health`);
      return response.json();
    } catch (error) {
      console.error('Health check error:', error);
      return { status: 'error' };
    }
  },

  // Submit exam results (for logging purposes)
  async submitExam(data: { email: string; language: string; level: number | string; score: number; totalQuestions: number; passed: boolean }) {
    try {
      console.log('Exam submitted:', data);
      // This is just for logging - actual progress is saved via saveProgress
      return { success: true };
    } catch (error) {
      console.error('Submit exam error:', error);
      return { success: false };
    }
  },
};

// Export Supabase client for direct auth operations
export { supabase };