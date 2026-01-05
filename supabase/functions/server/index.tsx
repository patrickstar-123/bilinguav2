import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================
// AUTO-CREATE ADMIN ACCOUNT ON SERVER START
// ============================================
async function ensureAdminAccountExists() {
  const ADMIN_EMAIL = 'admin@bilinguav2.com';
  const ADMIN_PASSWORD = 'Admin123!Test';
  
  try {
    // Check if admin exists
    const { data: users } = await supabase.auth.admin.listUsers();
    const adminExists = users?.users?.some(u => u.email === ADMIN_EMAIL);
    
    if (!adminExists) {
      console.log('🔧 Creating admin account...');
      const { data, error } = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        user_metadata: { name: 'Admin Test Account' },
        email_confirm: true
      });
      
      if (error) {
        console.error('❌ Failed to create admin account:', error);
      } else {
        console.log('✅ Admin account created successfully!');
        console.log('📧 Email:', ADMIN_EMAIL);
        console.log('🔒 Password:', ADMIN_PASSWORD);
        
        // Create admin progress with all levels unlocked
        const adminProgress = {
          email: ADMIN_EMAIL,
          name: 'Admin Test Account',
          selectedLanguage: 'chinese',
          hiraganaCompleted: true,
          katakanaCompleted: true,
          hiraganaScore: 100,
          katakanaScore: 100,
          totalPoints: 999999,
          hsk1: { unlocked: true, vocabularyTestCompleted: true, quizCompleted: true, examPassed: true, examScore: 100 },
          hsk2: { unlocked: true, vocabularyTestCompleted: true, quizCompleted: true, examPassed: true, examScore: 100 },
          hsk3: { unlocked: true, vocabularyTestCompleted: true, quizCompleted: true, examPassed: true, examScore: 100 },
          hsk4: { unlocked: true, vocabularyTestCompleted: true, quizCompleted: true, examPassed: true, examScore: 100 },
          hsk5: { unlocked: true, vocabularyTestCompleted: true, quizCompleted: true, examPassed: true, examScore: 100 },
          hsk6: { unlocked: true, vocabularyTestCompleted: true, quizCompleted: true, examPassed: true, examScore: 100 },
          jlptN5: { unlocked: true, vocabularyTestCompleted: true, quizCompleted: true, examPassed: true, examScore: 100 },
          jlptN4: { unlocked: true, vocabularyTestCompleted: true, quizCompleted: true, examPassed: true, examScore: 100 },
          jlptN3: { unlocked: true, vocabularyTestCompleted: true, quizCompleted: true, examPassed: true, examScore: 100 },
          jlptN2: { unlocked: true, vocabularyTestCompleted: true, quizCompleted: true, examPassed: true, examScore: 100 },
          jlptN1: { unlocked: true, vocabularyTestCompleted: true, quizCompleted: true, examPassed: true, examScore: 100 },
        };
        
        await kv.set(`user:${data.user.id}:progress`, adminProgress);
        await kv.set(`user:${data.user.id}:points`, { totalPoints: 999999, examPoints: 999999, quizPoints: 0, flashcardPoints: 0 });
      }
    } else {
      console.log('✅ Admin account already exists');
    }
  } catch (error) {
    console.error('❌ Error checking/creating admin account:', error);
  }
}

// Run admin account check on startup
ensureAdminAccountExists();

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// Sign up new user
app.post('/make-server-5a91a1cb/auth/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: 'Email and password required' }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || email.split('@')[0] },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Signup error:', error);
      
      // Handle specific error cases with user-friendly messages
      if (error.message?.includes('already been registered') || error.code === 'email_exists') {
        return c.json({ error: 'This email is already registered. Please login instead or use a different email.' }, 409);
      }
      
      if (error.message?.includes('password')) {
        return c.json({ error: 'Password must be at least 6 characters long.' }, 400);
      }
      
      return c.json({ error: error.message || 'Failed to create account. Please try again.' }, 400);
    }

    // Create initial user progress in KV store
    const userId = data.user.id;
    console.log('Creating initial progress for user:', userId);
    
    const initialProgress = {
      email,
      name: name || email.split('@')[0],
      selectedLanguage: null,
      hiraganaCompleted: false,
      katakanaCompleted: false,
      hiraganaScore: 0,
      katakanaScore: 0,
      totalPoints: 0,
      hsk1: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
      hsk2: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
      hsk3: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
      hsk4: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
      hsk5: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
      hsk6: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
      jlptN5: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
      jlptN4: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
      jlptN3: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
      jlptN2: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
      jlptN1: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
    };

    try {
      await kv.set(`user:${userId}:progress`, initialProgress);
      await kv.set(`user:${userId}:points`, { totalPoints: 0, examPoints: 0, quizPoints: 0, flashcardPoints: 0 });
      console.log('Initial progress created successfully for user:', userId);
    } catch (kvError) {
      console.error('Failed to create initial progress:', kvError);
      // Don't fail signup if KV fails - progress will be created on first GET
    }

    return c.json({ 
      success: true, 
      user: {
        id: userId,
        email: data.user.email,
        name: data.user.user_metadata.name
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: 'Signup failed: ' + error.message }, 500);
  }
});

// Get authenticated user
app.get('/make-server-5a91a1cb/auth/user', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    return c.json({ 
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email?.split('@')[0]
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    return c.json({ error: 'Failed to get user: ' + error.message }, 500);
  }
});

// ============================================
// USER PROGRESS ROUTES
// ============================================

// Get user progress
app.get('/make-server-5a91a1cb/progress/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    // Verify user is authenticated
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user || user.id !== userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    let progress = await kv.get(`user:${userId}:progress`);
    
    // If progress doesn't exist, create initial progress for the user
    if (!progress) {
      console.log('Progress not found, creating initial progress for user:', userId);
      
      const initialProgress = {
        email: user.email,
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
        selectedLanguage: null,
        hiraganaCompleted: false,
        katakanaCompleted: false,
        hiraganaScore: 0,
        katakanaScore: 0,
        totalPoints: 0,
        hsk1: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
        hsk2: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
        hsk3: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
        hsk4: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
        hsk5: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
        hsk6: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
        jlptN5: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
        jlptN4: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
        jlptN3: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
        jlptN2: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
        jlptN1: { unlocked: false, vocabularyTestCompleted: false, quizCompleted: false, examPassed: false, examScore: 0 },
      };
      
      await kv.set(`user:${userId}:progress`, initialProgress);
      progress = initialProgress;
    }

    return c.json({ progress });

  } catch (error) {
    console.error('Get progress error:', error);
    return c.json({ error: 'Failed to get progress: ' + error.message }, 500);
  }
});

// Save user progress
app.post('/make-server-5a91a1cb/progress/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    // Verify user is authenticated
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user || user.id !== userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const progress = await c.req.json();
    await kv.set(`user:${userId}:progress`, progress);

    return c.json({ success: true });

  } catch (error) {
    console.error('Save progress error:', error);
    return c.json({ error: 'Failed to save progress: ' + error.message }, 500);
  }
});

// ============================================
// POINTS & LEADERBOARD ROUTES
// ============================================

// Add points
app.post('/make-server-5a91a1cb/points/:userId/add', async (c) => {
  try {
    const userId = c.req.param('userId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    // Verify user is authenticated
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user || user.id !== userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { type, points } = await c.req.json();
    
    if (!type || points === undefined) {
      return c.json({ error: 'Type and points required' }, 400);
    }

    // Get current points
    let currentPoints = await kv.get(`user:${userId}:points`);
    if (!currentPoints) {
      currentPoints = { totalPoints: 0, examPoints: 0, quizPoints: 0, flashcardPoints: 0 };
    }

    // Update points based on type
    currentPoints.totalPoints += points;
    if (type === 'exam') {
      currentPoints.examPoints = (currentPoints.examPoints || 0) + points;
    } else if (type === 'quiz') {
      currentPoints.quizPoints = (currentPoints.quizPoints || 0) + points;
    } else if (type === 'flashcard') {
      currentPoints.flashcardPoints = (currentPoints.flashcardPoints || 0) + points;
    }

    await kv.set(`user:${userId}:points`, currentPoints);

    // Update leaderboard entry
    const progress = await kv.get(`user:${userId}:progress`);
    const leaderboardEntry = {
      userId,
      email: progress?.email || user.email,
      name: progress?.name || user.user_metadata?.name || user.email?.split('@')[0],
      language: progress?.selectedLanguage || 'chinese',
      totalPoints: currentPoints.totalPoints,
      examPoints: currentPoints.examPoints || 0,
      quizPoints: currentPoints.quizPoints || 0,
      flashcardPoints: currentPoints.flashcardPoints || 0,
      lastUpdated: new Date().toISOString()
    };

    await kv.set(`leaderboard:${userId}`, leaderboardEntry);

    return c.json({ success: true, points: currentPoints });

  } catch (error) {
    console.error('Add points error:', error);
    return c.json({ error: 'Failed to add points: ' + error.message }, 500);
  }
});

// Get user points
app.get('/make-server-5a91a1cb/points/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    
    const points = await kv.get(`user:${userId}:points`);
    
    if (!points) {
      return c.json({ points: { totalPoints: 0, examPoints: 0, quizPoints: 0, flashcardPoints: 0 } });
    }

    return c.json({ points });

  } catch (error) {
    console.error('Get points error:', error);
    return c.json({ error: 'Failed to get points: ' + error.message }, 500);
  }
});

// Get leaderboard
app.get('/make-server-5a91a1cb/leaderboard', async (c) => {
  try {
    const language = c.req.query('language'); // 'all', 'chinese', or 'japanese'
    
    // Get all leaderboard entries
    const allEntries = await kv.getByPrefix('leaderboard:');
    
    // Filter by language if specified
    let filteredEntries = allEntries;
    if (language && language !== 'all') {
      filteredEntries = allEntries.filter((entry: any) => entry.language === language);
    }

    // Sort by total points
    const sorted = filteredEntries.sort((a: any, b: any) => b.totalPoints - a.totalPoints);

    return c.json({ leaderboard: sorted });

  } catch (error) {
    console.error('Get leaderboard error:', error);
    return c.json({ error: 'Failed to get leaderboard: ' + error.message }, 500);
  }
});

// ============================================
// AUTH MANAGEMENT ROUTES
// ============================================

// Change password
app.post('/make-server-5a91a1cb/auth/change-password', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    // Verify user
    const { data: { user }, error: userError } = await supabase.auth.getUser(accessToken);
    if (userError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return c.json({ error: 'Current password and new password are required' }, 400);
    }

    if (newPassword.length < 6) {
      return c.json({ error: 'New password must be at least 6 characters' }, 400);
    }

    // Verify current password by attempting to sign in
    const userSupabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { error: signInError } = await userSupabase.auth.signInWithPassword({
      email: user.email ?? '',
      password: currentPassword,
    });

    if (signInError) {
      return c.json({ error: 'Current password is incorrect' }, 400);
    }

    // Update password using service role
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (updateError) {
      console.error('Error updating password:', updateError);
      return c.json({ error: 'Failed to update password' }, 500);
    }

    return c.json({ 
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Error in change-password route:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============================================
// ADMIN ROUTES
// ============================================

// Clear all user data (DESTRUCTIVE - use with caution)
app.post('/make-server-5a91a1cb/admin/clear-all-data', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    // Verify user is authenticated
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized - authentication required' }, 401);
    }

    console.log('🗑️ Starting data deletion process initiated by user:', user.email);

    // Get all user progress entries
    const progressEntries = await kv.getByPrefix('user:');
    console.log(`Found ${progressEntries.length} user-related entries`);

    // Get all leaderboard entries
    const leaderboardEntries = await kv.getByPrefix('leaderboard:');
    console.log(`Found ${leaderboardEntries.length} leaderboard entries`);

    // Delete all user progress and points entries
    const userKeys: string[] = [];
    for (const entry of progressEntries) {
      const key = entry.key || entry.id;
      if (key) {
        userKeys.push(key);
      }
    }

    // Delete all leaderboard entries
    const leaderboardKeys: string[] = [];
    for (const entry of leaderboardEntries) {
      const key = entry.key || entry.id;
      if (key) {
        leaderboardKeys.push(key);
      }
    }

    // Perform deletions
    if (userKeys.length > 0) {
      await kv.mdel(userKeys);
      console.log(`✅ Deleted ${userKeys.length} user data entries`);
    }

    if (leaderboardKeys.length > 0) {
      await kv.mdel(leaderboardKeys);
      console.log(`✅ Deleted ${leaderboardKeys.length} leaderboard entries`);
    }

    // Get all auth users and delete them
    const { data: authUsers, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('Error listing users:', listError);
    } else {
      console.log(`Found ${authUsers.users.length} auth users to delete`);
      
      for (const authUser of authUsers.users) {
        const { error: deleteError } = await supabase.auth.admin.deleteUser(authUser.id);
        if (deleteError) {
          console.error(`Error deleting user ${authUser.email}:`, deleteError);
        } else {
          console.log(`✅ Deleted auth user: ${authUser.email}`);
        }
      }
    }

    const summary = {
      userDataDeleted: userKeys.length,
      leaderboardDeleted: leaderboardKeys.length,
      authUsersDeleted: authUsers?.users?.length || 0,
      timestamp: new Date().toISOString(),
      initiatedBy: user.email
    };

    console.log('🎉 Data deletion complete:', summary);

    return c.json({ 
      success: true, 
      message: 'All user data has been cleared',
      summary 
    });

  } catch (error) {
    console.error('❌ Clear data error:', error);
    return c.json({ error: 'Failed to clear data: ' + error.message }, 500);
  }
});

// Get data statistics
app.get('/make-server-5a91a1cb/admin/stats', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    // Verify user is authenticated
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized - authentication required' }, 401);
    }

    const progressEntries = await kv.getByPrefix('user:');
    const leaderboardEntries = await kv.getByPrefix('leaderboard:');
    const { data: authUsers } = await supabase.auth.admin.listUsers();

    const stats = {
      totalUserDataEntries: progressEntries.length,
      totalLeaderboardEntries: leaderboardEntries.length,
      totalAuthUsers: authUsers?.users?.length || 0,
      timestamp: new Date().toISOString()
    };

    return c.json({ stats });

  } catch (error) {
    console.error('Get stats error:', error);
    return c.json({ error: 'Failed to get stats: ' + error.message }, 500);
  }
});

// ============================================
// HEALTH CHECK
// ============================================

app.get('/make-server-5a91a1cb/health', (c) => {
  return c.json({ status: 'ok', service: 'bilinguav2', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);