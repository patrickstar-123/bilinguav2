# Quick Delete Reference Card

## 🚨 DELETE ALL USER DATA - Quick Commands

---

## Method 1: Browser Console (EASIEST)

### Open Console
Press **F12** → Click **Console** tab

### View Statistics
```javascript
await window.getDataStats()
```

### Delete Everything
```javascript
await window.deleteAllData()
```

---

## Method 2: Admin Panel

1. Login to app
2. Go to **Admin Panel**
3. Click **"Load Statistics"**
4. Click **"Clear All User Data"** (red button)
5. Confirm twice
6. Wait for completion

---

## Method 3: Data Deletion Tool

### Access
Add to URL: `?screen=delete-tool`

Or modify App.tsx:
```typescript
useState<Screen>('delete-tool')
```

---

## What Gets Deleted?

✗ **All user accounts**
✗ **All progress data**
✗ **All points**
✗ **All leaderboards**

---

## Verification

```javascript
// Should return all zeros
await window.getDataStats()
```

Expected:
```
Total auth users: 0
Total user data entries: 0
Total leaderboard entries: 0
```

---

## After Deletion

1. ✅ You are logged out automatically
2. ✅ App returns to login screen
3. ✅ All data is gone forever
4. ✅ Ready for fresh start

---

## ⚠️ WARNINGS

- **IRREVERSIBLE** - Cannot undo
- **PERMANENT** - Data is lost forever
- **COMPLETE** - Everything is deleted
- **IMMEDIATE** - Takes effect right away

---

## Quick Checklist

- [ ] Backed up data (if needed)
- [ ] Confirmed with team
- [ ] Read warnings
- [ ] Ready to delete

---

## Files Reference

| File | Purpose |
|------|---------|
| `/utils/deleteAllData.ts` | Delete functions |
| `/components/DataDeletionTool.tsx` | UI for deletion |
| `/components/AdminPanel.tsx` | Admin with delete |
| `/supabase/functions/server/index.tsx` | Server endpoint |
| `/DELETE_ALL_DATA_GUIDE.md` | Full guide |

---

## Server Endpoint

```
POST /make-server-5a91a1cb/admin/clear-all-data
Headers: Authorization: Bearer {token}
```

---

## Emergency Contact

If something goes wrong:
1. Check Supabase dashboard
2. Review server logs
3. Verify authentication
4. Check browser console

---

**Remember: THIS DELETES EVERYTHING PERMANENTLY!**

Use `await window.deleteAllData()` with caution! 🚨
