import { api } from './api';

export const POINTS_PER_CORRECT = 10;
export const EXAM_BONUS_POINTS = 50;

export interface PointsData {
  totalPoints: number;
  examPoints: number;
  quizPoints: number;
  flashcardPoints: number;
  lastUpdated: string;
}

// Add points using Supabase API
export async function addPoints(
  userIdentifier: string, // Can be userId or email
  type: 'exam' | 'quiz' | 'flashcard',
  points: number
) {
  try {
    // Get userId from localStorage (set during login)
    const userId = localStorage.getItem('bilingua_current_user');
    
    if (!userId) {
      console.error('No user ID found - user not logged in');
      return;
    }

    // Add points via API
    await api.addPoints(userId, type, points);
    
  } catch (error) {
    console.error('Failed to add points:', error);
    // Fail silently - don't break the user experience
  }
}

// Get user points from Supabase
export async function getUserPoints(userIdentifier: string): Promise<PointsData> {
  try {
    const userId = localStorage.getItem('bilingua_current_user');
    
    if (!userId) {
      return {
        totalPoints: 0,
        examPoints: 0,
        quizPoints: 0,
        flashcardPoints: 0,
        lastUpdated: new Date().toISOString(),
      };
    }

    const points = await api.getPoints(userId);
    return points;
    
  } catch (error) {
    console.error('Failed to get points:', error);
    return {
      totalPoints: 0,
      examPoints: 0,
      quizPoints: 0,
      flashcardPoints: 0,
      lastUpdated: new Date().toISOString(),
    };
  }
}

// Get all points (for leaderboard) - now from Supabase
export async function getAllPoints(language: 'all' | 'chinese' | 'japanese' = 'all'): Promise<PointsData[]> {
  try {
    const leaderboard = await api.getLeaderboard(language);
    
    return leaderboard.map((entry: any) => ({
      email: entry.email,
      name: entry.name,
      totalPoints: entry.totalPoints,
      examPoints: entry.examPoints || 0,
      quizPoints: entry.quizPoints || 0,
      flashcardPoints: entry.flashcardPoints || 0,
      lastUpdated: entry.lastUpdated,
    }));
    
  } catch (error) {
    console.error('Failed to get all points:', error);
    return [];
  }
}
