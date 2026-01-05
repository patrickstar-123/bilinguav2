# Test Delete Functions - Complete Testing Guide

## 🧪 How to Test Data Deletion

This guide helps you verify that all deletion methods work correctly.

---

## ✅ Prerequisites

Before testing:
1. ✅ Application is running
2. ✅ You're logged into the application
3. ✅ Browser DevTools are available (F12)
4. ✅ You understand this will delete all data

---

## 🧪 Test 1: Browser Console - View Statistics

### Steps:
1. Open application in browser
2. Log in with any account
3. Press **F12** to open DevTools
4. Click **Console** tab
5. Type: `await window.getDataStats()`
6. Press Enter

### Expected Output:
```
📊 Current Database Statistics:
   - Total auth users: 5
   - Total user data entries: 15
   - Total leaderboard entries: 5
   - Timestamp: 2024-01-15T10:30:00.000Z

{
  totalAuthUsers: 5,
  totalUserDataEntries: 15,
  totalLeaderboardEntries: 5,
  timestamp: "2024-01-15T10:30:00.000Z"
}
```

### ✅ Pass Criteria:
- Command executes without errors
- Statistics are displayed
- Numbers make sense (match your data)

### ❌ Fail Scenarios:
- `window.getDataStats is not a function` → Check App.tsx imports
- `Unauthorized` error → Not logged in
- Network error → Check server is running

---

## 🧪 Test 2: Browser Console - Delete All Data

### Steps:
1. Continue from Test 1 (console still open)
2. Type: `await window.deleteAllData()`
3. Press Enter
4. Browser will show confirmation dialog
5. Click **OK** to confirm
6. Browser will show double confirmation
7. Click **OK** again to proceed
8. Watch console output
9. Wait for auto-logout (3 seconds)

### Expected Output:
```
⚠️  WARNING: You are about to delete ALL user data!

📊 Current Database Statistics:
   - Total auth users: 5
   - Total user data entries: 15
   - Total leaderboard entries: 5
   - Timestamp: 2024-01-15T10:30:00.000Z

[Confirmation dialog appears]

🗑️  Proceeding with deletion...
🚨 DELETING ALL USER DATA - THIS CANNOT BE UNDONE!
✅ Delete Summary: {
  userDataDeleted: 15,
  leaderboardDeleted: 5,
  authUsersDeleted: 5,
  timestamp: "2024-01-15T10:30:15.000Z",
  initiatedBy: "user@example.com"
}
   - Auth users deleted: 5
   - User data entries deleted: 15
   - Leaderboard entries deleted: 5
   - Timestamp: 2024-01-15T10:30:15.000Z
   - Initiated by: user@example.com

✅ ALL DATA HAS BEEN DELETED!

You will be logged out in 3 seconds...
```

### Then:
- Page reloads after 3 seconds
- You're on the login screen
- Local storage is cleared

### ✅ Pass Criteria:
- Statistics shown before deletion
- Two confirmation dialogs appear
- Deletion completes successfully
- Summary shows correct counts
- Auto-logout happens
- Login screen appears

### ❌ Fail Scenarios:
- No confirmation dialogs → Check browser settings
- Error during deletion → Check server logs
- Data not deleted → Verify deletion in Test 3
- No auto-logout → Check timeout code

---

## 🧪 Test 3: Verify Deletion

### Steps:
1. Log in again (create new account)
2. Open DevTools console
3. Type: `await window.getDataStats()`
4. Press Enter

### Expected Output:
```
📊 Current Database Statistics:
   - Total auth users: 1
   - Total user data entries: 2
   - Total leaderboard entries: 0
   - Timestamp: 2024-01-15T10:35:00.000Z
```

### ✅ Pass Criteria:
- Only the new account exists (1 user)
- New user's data exists (2 entries: progress + points)
- No old leaderboard entries (0)

### ❌ Fail Scenarios:
- Old data still exists → Deletion failed
- More than expected users → Check server logs
- Error accessing stats → Authentication issue

---

## 🧪 Test 4: Admin Panel Method

### Steps:
1. Log in to application
2. Navigate to Admin Panel
3. Click **"Load Statistics"** button
4. Verify statistics are shown
5. Click **"Clear All User Data"** button (red)
6. Read the confirmation dialog
7. Click **"Yes, Delete Everything"**
8. Wait for success message
9. Wait for auto-logout

### Expected Behavior:
- Statistics load correctly
- Delete button is enabled
- Confirmation dialog appears
- Deletion completes
- Success toast notification appears
- Stats refresh to show 0
- Auto-logout after 2-3 seconds

### ✅ Pass Criteria:
- All UI elements work
- Deletion completes
- User is logged out
- Data is deleted (verify with Test 3)

### ❌ Fail Scenarios:
- Statistics don't load → Check API
- Delete button disabled → Check authentication
- Dialog doesn't appear → Check UI components
- Deletion fails → Check server logs

---

## 🧪 Test 5: Data Deletion Tool

### Steps:
1. Modify App.tsx temporarily:
   ```typescript
   const [currentScreen, setCurrentScreen] = useState<Screen>('delete-tool');
   ```
2. Reload application
3. You should see the Data Deletion Tool
4. Click **"Refresh Statistics"**
5. Verify statistics are shown
6. Read all warnings
7. Click **"Delete All User Data"**
8. Confirm in dialog
9. Wait for completion

### Expected Behavior:
- Tool loads with red/orange theme
- Statistics cards show current data
- All warnings are visible
- Delete button works
- Confirmation dialog appears
- Deletion completes with success message
- Auto-logout happens

### ✅ Pass Criteria:
- UI renders correctly
- All components are interactive
- Deletion works
- User is logged out

### To Revert:
```typescript
const [currentScreen, setCurrentScreen] = useState<Screen>('login');
```

---

## 🧪 Test 6: Direct API Method

### Steps:
1. Open DevTools Console
2. Get access token:
   ```javascript
   const token = localStorage.getItem('bilingua_access_token');
   console.log(token);
   ```
3. Get project ID:
   ```javascript
   const projectId = 'YOUR_PROJECT_ID';
   ```
4. Make API call:
   ```javascript
   const response = await fetch(
     `https://${projectId}.supabase.co/functions/v1/make-server-5a91a1cb/admin/clear-all-data`,
     {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json',
       },
     }
   );
   const result = await response.json();
   console.log(result);
   ```

### Expected Output:
```json
{
  "success": true,
  "message": "All user data has been cleared",
  "summary": {
    "userDataDeleted": 15,
    "leaderboardDeleted": 5,
    "authUsersDeleted": 5,
    "timestamp": "2024-01-15T10:30:15.000Z",
    "initiatedBy": "user@example.com"
  }
}
```

### ✅ Pass Criteria:
- API responds with 200 status
- Success message returned
- Summary contains correct data
- Data is actually deleted

---

## 🧪 Test 7: Error Handling

### Test 7a: Not Logged In
1. Log out completely
2. Open console
3. Try: `await window.deleteAllData()`

**Expected:** Error message about authentication

### Test 7b: Invalid Token
1. Modify token: `localStorage.setItem('bilingua_access_token', 'invalid')`
2. Try: `await window.deleteAllData()`

**Expected:** Unauthorized error

### Test 7c: Network Offline
1. Turn off network (or use DevTools offline mode)
2. Try: `await window.deleteAllData()`

**Expected:** Network error

### ✅ Pass Criteria:
All error scenarios handled gracefully with clear messages

---

## 🧪 Test 8: Multiple Users

### Setup:
1. Create 5 test users
2. Have each user complete some activities
3. Check stats

### Delete:
1. Use any method to delete all data
2. Verify all 5 users are deleted

### Verify:
1. Try logging in with old credentials → Should fail
2. Check stats → Should show 0 users
3. Create new user → Should work normally

### ✅ Pass Criteria:
- All users deleted
- All progress deleted
- App works normally after

---

## 🧪 Test 9: Server Logs

### Steps:
1. Open Supabase Dashboard
2. Go to Edge Functions → Logs
3. Trigger a deletion
4. Watch logs appear

### Expected Logs:
```
🗑️ Starting data deletion process initiated by user: user@example.com
Found 15 user-related entries
Found 5 leaderboard entries
✅ Deleted 15 user data entries
✅ Deleted 5 leaderboard entries
Found 5 auth users to delete
✅ Deleted auth user: user1@example.com
✅ Deleted auth user: user2@example.com
...
🎉 Data deletion complete: {...}
```

### ✅ Pass Criteria:
- Logs appear in real-time
- All steps logged
- No errors
- Summary correct

---

## 🧪 Test 10: Stress Test

### Steps:
1. Create 20+ users
2. Have them complete various activities
3. Check stats (should have 40+ entries)
4. Delete all data
5. Verify deletion complete
6. Check performance

### ✅ Pass Criteria:
- Handles large dataset
- Completes without timeout
- All data deleted
- No memory leaks
- App remains responsive

---

## 📊 Complete Test Checklist

### Browser Console
- [ ] `window.getDataStats()` works
- [ ] Shows correct statistics
- [ ] `window.deleteAllData()` works
- [ ] Confirmation dialogs appear
- [ ] Deletion completes successfully
- [ ] Auto-logout works
- [ ] Stats show 0 after deletion

### Admin Panel
- [ ] Panel accessible
- [ ] Load Statistics button works
- [ ] Statistics display correctly
- [ ] Delete button appears
- [ ] Confirmation dialog works
- [ ] Deletion completes
- [ ] Success message appears
- [ ] Auto-logout works

### Data Deletion Tool
- [ ] Tool renders correctly
- [ ] Statistics auto-load
- [ ] Refresh button works
- [ ] Warnings are visible
- [ ] Delete button works
- [ ] Confirmation dialog appears
- [ ] Deletion completes
- [ ] UI updates correctly

### API Direct
- [ ] Endpoint responds
- [ ] Authentication required
- [ ] Returns correct format
- [ ] Deletion works
- [ ] Error handling works

### Error Handling
- [ ] Not logged in → Error
- [ ] Invalid token → Error
- [ ] Network offline → Error
- [ ] Server error → Handled

### Data Integrity
- [ ] All users deleted
- [ ] All progress deleted
- [ ] All points deleted
- [ ] All leaderboards deleted
- [ ] Fresh start possible

### Performance
- [ ] Completes in reasonable time
- [ ] No memory leaks
- [ ] Handles large datasets
- [ ] Server remains responsive

---

## 🚨 If Tests Fail

### Console Method Not Working
1. Check App.tsx imports
2. Verify useEffect is running
3. Check window object exists

### API Not Responding
1. Check Supabase is running
2. Verify environment variables
3. Check server logs
4. Verify network connection

### Deletion Incomplete
1. Check server logs for errors
2. Verify KV store access
3. Check Supabase Auth permissions
4. Try again (idempotent)

### UI Not Rendering
1. Check component imports
2. Verify routing setup
3. Check for console errors
4. Clear browser cache

---

## ✅ All Tests Pass?

If all tests pass:
- ✅ All 4 deletion methods work
- ✅ Statistics viewer works
- ✅ Error handling is correct
- ✅ Data is completely deleted
- ✅ Auto-logout works
- ✅ App recovers cleanly

**You're ready to use the deletion functionality!**

---

## 📝 Test Report Template

```
# Data Deletion Test Report

Date: [DATE]
Tester: [NAME]
Version: 2.0

## Test Results

| Test | Method | Result | Notes |
|------|--------|--------|-------|
| 1 | Console Stats | ✅/❌ | |
| 2 | Console Delete | ✅/❌ | |
| 3 | Verify Deletion | ✅/❌ | |
| 4 | Admin Panel | ✅/❌ | |
| 5 | Deletion Tool | ✅/❌ | |
| 6 | Direct API | ✅/❌ | |
| 7 | Error Handling | ✅/❌ | |
| 8 | Multiple Users | ✅/❌ | |
| 9 | Server Logs | ✅/❌ | |
| 10 | Stress Test | ✅/❌ | |

## Issues Found
[List any issues]

## Recommendations
[List recommendations]

## Conclusion
[Overall assessment]
```

---

**Good luck with testing!** 🧪✨
