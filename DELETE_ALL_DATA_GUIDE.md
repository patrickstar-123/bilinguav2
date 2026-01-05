# DELETE ALL USER DATA - Complete Guide

⚠️ **EXTREME CAUTION REQUIRED** ⚠️

This guide explains how to completely delete all user data from the BilinguaV2 application.

---

## 🚨 WARNING

**THIS ACTION IS IRREVERSIBLE!**

Deleting all user data will permanently remove:
- ✗ All user accounts and authentication data
- ✗ All progress and learning data
- ✗ All points and achievements
- ✗ All leaderboard entries
- ✗ All stored preferences and settings

**THERE IS NO UNDO. THERE IS NO RECOVERY. THE DATA IS GONE FOREVER.**

---

## 📋 What Gets Deleted

### 1. **Auth Users (Supabase Auth)**
- All registered user accounts
- Email addresses
- Passwords (hashed)
- User metadata (names)

### 2. **User Progress Data (KV Store)**
Keys deleted:
- `user:{userId}:progress` - All learning progress
- `user:{userId}:points` - All points data

Data deleted:
- Current level progress
- Vocabulary test completion
- Quiz completion
- Exam completion and scores
- Hiragana/Katakana completion status
- Language selection

### 3. **Leaderboard Data (KV Store)**
Keys deleted:
- `leaderboard:{userId}` - All ranking entries

Data deleted:
- Total points
- Exam points
- Quiz points
- Flashcard points
- Last updated timestamps

---

## 🛠️ Method 1: Admin Panel (Recommended)

### Step 1: Access Admin Panel
1. Log in to BilinguaV2
2. Go to the Admin Panel (if you have access)
3. Find the "Danger Zone" section

### Step 2: View Current Statistics
1. Click "Load Statistics" button
2. Review:
   - Total auth users
   - User data entries
   - Leaderboard entries

### Step 3: Delete Data
1. Click "Clear All User Data" button (red)
2. Read the confirmation dialog carefully
3. Confirm you understand the consequences
4. Click "Yes, Delete Everything"
5. Wait for deletion to complete
6. You will be logged out automatically

---

## 🛠️ Method 2: Data Deletion Tool

### Access the Tool
**Option A: URL Parameter**
```
Add ?screen=delete-tool to your URL
Example: https://yourapp.com?screen=delete-tool
```

**Option B: Modify App.tsx**
```typescript
// In App.tsx, change initial screen to:
const [currentScreen, setCurrentScreen] = useState<Screen>('delete-tool');
```

### Using the Tool
1. The tool will automatically load current statistics
2. Review the numbers carefully
3. Read all warnings
4. Click "Delete All User Data"
5. Confirm in the dialog
6. Wait for completion
7. You will be logged out

---

## 🛠️ Method 3: Browser Console

### Step 1: Open Developer Tools
- **Chrome/Edge:** Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- **Firefox:** Press `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
- **Safari:** Enable Developer Menu, then `Cmd+Option+C`

### Step 2: Navigate to Console Tab
Click on the "Console" tab in the developer tools

### Step 3: Check Current Statistics (Optional)
```javascript
await window.getDataStats()
```

This will show:
```
📊 Current Database Statistics:
   - Total auth users: X
   - Total user data entries: Y
   - Total leaderboard entries: Z
   - Timestamp: 2024-XX-XX...
```

### Step 4: Delete All Data
```javascript
await window.deleteAllData()
```

This will:
1. Show current statistics
2. Ask for confirmation
3. Ask for double confirmation
4. Delete all data
5. Show deletion summary
6. Log you out after 3 seconds

### Example Console Output
```
⚠️  WARNING: You are about to delete ALL user data!

📊 Current Database Statistics:
   - Total auth users: 5
   - Total user data entries: 15
   - Total leaderboard entries: 5
   - Timestamp: 2024-01-15T10:30:00.000Z

[Browser will show confirmation dialog]

🗑️  Proceeding with deletion...
🚨 DELETING ALL USER DATA - THIS CANNOT BE UNDONE!
✅ Delete Summary: {...}
   - Auth users deleted: 5
   - User data entries deleted: 15
   - Leaderboard entries deleted: 5
   - Timestamp: 2024-01-15T10:30:15.000Z
   - Initiated by: admin@example.com

✅ ALL DATA HAS BEEN DELETED!

You will be logged out in 3 seconds...
```

---

## 🛠️ Method 4: Direct API Call

### Using cURL
```bash
curl -X POST \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-5a91a1cb/admin/clear-all-data' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json'
```

### Using Fetch (JavaScript)
```javascript
const accessToken = localStorage.getItem('bilingua_access_token');

const response = await fetch(
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-5a91a1cb/admin/clear-all-data',
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }
);

const result = await response.json();
console.log(result);
```

### Response Format
```json
{
  "success": true,
  "message": "All user data has been cleared",
  "summary": {
    "userDataDeleted": 15,
    "leaderboardDeleted": 5,
    "authUsersDeleted": 5,
    "timestamp": "2024-01-15T10:30:15.000Z",
    "initiatedBy": "admin@example.com"
  }
}
```

---

## 📊 Verification After Deletion

### Method 1: Check Statistics
```javascript
await window.getDataStats()
```

Should return:
```
📊 Current Database Statistics:
   - Total auth users: 0
   - Total user data entries: 0
   - Total leaderboard entries: 0
```

### Method 2: Try to Login
1. Try logging in with a previous account
2. Should fail (account doesn't exist)

### Method 3: Admin Panel
1. Log in with a new account
2. Check Admin Panel statistics
3. All counts should be 0 (except the new account)

---

## 🔒 Security & Authorization

### Who Can Delete Data?

**Current Implementation:**
- Any authenticated user can call the delete endpoint
- You must be logged in (have a valid access token)

**Best Practice Recommendation:**
Add admin role check to the server endpoint:

```typescript
// In /supabase/functions/server/index.tsx
const isAdmin = user.user_metadata?.role === 'admin' || 
                user.email === 'admin@yourdomain.com';

if (!isAdmin) {
  return c.json({ error: 'Unauthorized - admin access required' }, 403);
}
```

---

## 🛡️ Backup Before Deletion

### Export User Data (Supabase Dashboard)
1. Go to Supabase Dashboard
2. Navigate to Database → Tables
3. Find `kv_store_51cebaac`
4. Click "Export" to download CSV/JSON

### Export Auth Users (Supabase Dashboard)
1. Go to Authentication → Users
2. Export user list

### Manual Backup Script
```javascript
// Get all user progress
const getAllData = async () => {
  const accessToken = localStorage.getItem('bilingua_access_token');
  
  // This would need a custom endpoint to export all data
  const response = await fetch(
    'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-5a91a1cb/admin/export-all',
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );
  
  const data = await response.json();
  
  // Save to file
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bilingua-backup-${Date.now()}.json`;
  a.click();
};
```

---

## 🔄 What Happens After Deletion

1. **Immediate:**
   - All user accounts deleted from Supabase Auth
   - All KV store entries deleted
   - Leaderboards cleared

2. **Within 3 seconds:**
   - Current user is logged out
   - Local storage is cleared
   - Page reloads to login screen

3. **Application State:**
   - App returns to fresh state
   - Login page shown
   - No users exist
   - No data exists

4. **Fresh Start:**
   - Users can create new accounts
   - App functions normally
   - Starts from scratch

---

## 📝 Logging & Audit Trail

### Server Logs (Deno)
The deletion process logs:
```
🗑️ Starting data deletion process initiated by user: admin@example.com
Found X user-related entries
Found Y leaderboard entries
✅ Deleted X user data entries
✅ Deleted Y leaderboard entries
Found Z auth users to delete
✅ Deleted auth user: user1@example.com
✅ Deleted auth user: user2@example.com
...
🎉 Data deletion complete: {summary}
```

### Client Logs
```javascript
console.warn('🚨 DELETING ALL USER DATA - THIS CANNOT BE UNDONE!');
console.log('✅ Delete Summary:', summary);
```

---

## 🚫 Common Issues

### Issue: "Unauthorized" Error
**Cause:** Not logged in or invalid token
**Solution:** 
1. Make sure you're logged in
2. Check `localStorage.getItem('bilingua_access_token')` exists
3. Try logging in again

### Issue: "Failed to delete data"
**Cause:** Server error or permission issue
**Solution:**
1. Check server logs in Supabase
2. Verify Supabase environment variables are set
3. Check database permissions

### Issue: Some data remains
**Cause:** Partial deletion failure
**Solution:**
1. Check server logs for errors
2. Run deletion again
3. Manually check Supabase dashboard

### Issue: Can't access deletion tool
**Cause:** Not authorized or wrong screen
**Solution:**
1. Use browser console method instead
2. Check you're logged in
3. Verify screen routing in App.tsx

---

## ✅ Checklist Before Deletion

- [ ] You understand this is irreversible
- [ ] You have backed up any important data
- [ ] You have confirmed with your team (if applicable)
- [ ] You have checked current statistics
- [ ] You have read all warnings
- [ ] You are absolutely certain
- [ ] You have alternative accounts for testing (if needed)
- [ ] You know how to re-populate data (if needed)

---

## 🔄 After Deletion: Re-populating Data

### Create Test Users
```javascript
// Sign up new users via UI or API
const testUsers = [
  { email: 'test1@example.com', password: 'Test123!', name: 'Test User 1' },
  { email: 'test2@example.com', password: 'Test123!', name: 'Test User 2' },
  { email: 'test3@example.com', password: 'Test123!', name: 'Test User 3' },
];
```

### Reset to Fresh State
After deletion:
1. All users must sign up again
2. All users must select language again
3. All users start from level 1
4. No progress exists
5. No points exist
6. Leaderboards are empty

---

## 📞 Support

If you encounter issues:
1. Check this guide
2. Review server logs in Supabase dashboard
3. Check browser console for errors
4. Verify authentication is working
5. Test with a simple account first

---

## 🎯 Summary

### Quick Delete (Browser Console)
```javascript
await window.deleteAllData()
```

### What Gets Deleted
- ✗ All user accounts
- ✗ All progress
- ✗ All points
- ✗ All leaderboards

### What Happens Next
- You get logged out
- App resets to login screen
- Fresh start, no data

### Remember
**THIS IS PERMANENT. THERE IS NO UNDO.**

---

**Last Updated:** 2024
**Version:** 2.0
**Status:** Production Ready
