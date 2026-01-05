# 🔑 Admin Account Setup Instructions

## ✅ Automatic Setup (Recommended)

The BilinguaV2 server automatically creates the admin account when it starts up.

### Admin Credentials
```
Email: admin@bilinguav2.com
Password: Admin123!Test
```

### How It Works

1. **Server Startup**: When the Supabase Edge Function starts, it runs `ensureAdminAccountExists()`
2. **Account Check**: Checks if admin account exists in Supabase Auth
3. **Auto-Create**: If not found, creates the account with full permissions
4. **Progress Setup**: Initializes admin progress with:
   - All HSK 1-6 levels unlocked
   - All JLPT N5-N1 levels unlocked
   - Hiragana & Katakana completed
   - 999,999 points
   - All exams passed (100% scores)

### Testing the Admin Account

1. Open the app
2. Click "Sign In"
3. Enter:
   - Email: `admin@bilinguav2.com`
   - Password: `Admin123!Test`
4. Click "Sign In"
5. ✅ You should see "ADMIN ACCOUNT LOGGED IN - All levels unlocked!" in console

---

## 🛠️ Manual Setup (If Automatic Fails)

If the automatic setup doesn't work, you can manually create the admin account:

### Method 1: Using the Admin Setup Page

1. Try to login with admin credentials
2. If you see "Admin account not set up" error
3. The app will show a button to create the account
4. Click "Create Admin Account"
5. Wait for success message
6. Login with admin credentials

### Method 2: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User** → **Create new user**
4. Fill in:
   - Email: `admin@bilinguav2.com`
   - Password: `Admin123!Test`
   - Auto Confirm User: ✅ **YES** (Important!)
   - User Metadata (JSON):
     ```json
     {
       "name": "Admin Test Account"
     }
     ```
5. Click **Create User**
6. Go to your app and login

### Method 3: Using the Server Endpoint

If you have access to test the server directly:

```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-5a91a1cb/auth/signup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "email": "admin@bilinguav2.com",
    "password": "Admin123!Test",
    "name": "Admin Test Account"
  }'
```

---

## 🔍 Troubleshooting

### Error: "Invalid login credentials"

**Cause**: Admin account doesn't exist in Supabase yet

**Solution**:
1. Check server logs for admin account creation
2. Look for: "✅ Admin account created successfully!" or "✅ Admin account already exists"
3. If not found, use Manual Setup Method 1 or 2

### Error: "Admin account not set up"

**Cause**: Server tried to create account but failed

**Solution**:
1. Check Supabase dashboard → Authentication → Users
2. Manually create the admin user (see Method 2)
3. Make sure "Auto Confirm User" is checked

### Admin Account Exists But Can't Login

**Cause**: Email not confirmed or password mismatch

**Solution**:
1. Go to Supabase Dashboard → Authentication → Users
2. Find `admin@bilinguav2.com`
3. Click on the user
4. Ensure "Email Confirmed" is checked
5. If not, click "Confirm Email"
6. Try logging in again

### Admin Logs In But Progress is Empty

**Cause**: Admin progress not initialized in database

**Solution**:
The app will automatically create admin progress on first login, but if it doesn't:
1. Login as admin
2. Open browser console (F12)
3. Check for any errors
4. The app should auto-populate admin progress

---

## 📊 What the Admin Account Has

After successful setup, the admin account will have:

### Chinese (HSK)
- ✅ HSK 1: Unlocked, all tests completed, exam passed (100%)
- ✅ HSK 2: Unlocked, all tests completed, exam passed (100%)
- ✅ HSK 3: Unlocked, all tests completed, exam passed (100%)
- ✅ HSK 4: Unlocked, all tests completed, exam passed (100%)
- ✅ HSK 5: Unlocked, all tests completed, exam passed (100%)
- ✅ HSK 6: Unlocked, all tests completed, exam passed (100%)

### Japanese (JLPT)
- ✅ Hiragana: Completed (100%)
- ✅ Katakana: Completed (100%)
- ✅ JLPT N5: Unlocked, all tests completed, exam passed (100%)
- ✅ JLPT N4: Unlocked, all tests completed, exam passed (100%)
- ✅ JLPT N3: Unlocked, all tests completed, exam passed (100%)
- ✅ JLPT N2: Unlocked, all tests completed, exam passed (100%)
- ✅ JLPT N1: Unlocked, all tests completed, exam passed (100%)

### Points
- ✅ Total Points: 999,999
- ✅ Exam Points: 999,999
- ✅ Quiz Points: 0
- ✅ Flashcard Points: 0

### Features
- ✅ Access to all study materials
- ✅ Access to all exams (no prerequisites)
- ✅ Access to all practice quizzes
- ✅ Access to all character writing
- ✅ Access to all listening practice
- ✅ Access to all reading practice
- ✅ Access to leaderboard
- ✅ Access to admin panel

---

## 🧪 Verification Steps

To verify the admin account is working correctly:

### Step 1: Login
```
1. Open app
2. Email: admin@bilinguav2.com
3. Password: Admin123!Test
4. Click Sign In
5. ✅ Should login successfully
```

### Step 2: Check Console
```
Look for in browser console (F12):
✅ "🔑 ADMIN LOGIN SUCCESSFUL - All levels unlocked!"
```

### Step 3: Check Dashboard
```
1. Should see Dashboard immediately (no language selection)
2. Should see all level cards (HSK 1-6 or JLPT N5-N1)
3. All cards should be unlocked (not grayed out)
```

### Step 4: Test Level Access
```
1. Click on any level (e.g., HSK 6)
2. Should open without "locked" message
3. Can access Study Materials, Quiz, and Exam
4. No prerequisites required
```

### Step 5: Check Points
```
1. Look at top of dashboard
2. Should see: "999,999 points" or similar large number
```

---

## 🔒 Security Note

**Important**: The admin account is for testing purposes only!

- ❌ Do NOT use in production
- ❌ Do NOT give admin credentials to regular users
- ✅ Change the password if deploying publicly
- ✅ Consider disabling admin account in production

To change admin password:
1. Edit `/supabase/functions/server/index.tsx`
2. Update `ADMIN_PASSWORD` constant
3. Redeploy server
4. Update this documentation

---

## 📝 Server Code Reference

The admin account creation code is in `/supabase/functions/server/index.tsx`:

```typescript
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
        email_confirm: true // Auto-confirm email
      });
      
      if (!error) {
        console.log('✅ Admin account created successfully!');
        // ... create admin progress ...
      }
    } else {
      console.log('✅ Admin account already exists');
    }
  } catch (error) {
    console.error('❌ Error checking/creating admin account:', error);
  }
}

// Run on server startup
ensureAdminAccountExists();
```

---

## ✅ Quick Checklist

Before testing:
- [ ] Server is running (Supabase Edge Function deployed)
- [ ] Admin account creation logged in server (check logs)
- [ ] Can access login page
- [ ] Admin credentials are correct
- [ ] Supabase auth is configured

After successful login:
- [ ] Console shows admin login message
- [ ] Dashboard displays immediately
- [ ] All levels are unlocked
- [ ] 999,999 points visible
- [ ] Can access any level without restrictions
- [ ] Can take exams without prerequisites

---

## 🎉 Success!

If you can login with the admin account and see all levels unlocked with 999,999 points, the setup is complete!

You can now:
- ✅ Test all features
- ✅ Verify content for each level
- ✅ Check exam generation
- ✅ Verify study materials
- ✅ Test the entire learning flow

---

**Last Updated**: November 26, 2024
**Status**: ✅ Automatic admin account creation implemented
