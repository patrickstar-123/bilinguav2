# 🚀 Quick Reference - Password & Dark Mode

## 🔐 Change Password

### Access:
```
Dashboard → Settings → Account Tab → Security → Change Password
```

### Requirements:
- Current password (must be correct)
- New password (min 6 characters)
- Confirm password (must match)

### Features:
- 👁 Show/hide password toggles on all fields
- ✅ Real-time validation
- 🎯 Clear error messages
- ✅ Success notification

---

## 🌙 Dark Mode

### Access:
```
Dashboard → Settings → Preferences Tab → Dark Mode Toggle
```

### How to Use:
1. Click toggle switch
2. Theme changes instantly
3. Preference saved automatically

### Features:
- 🌙 Moon icon when dark
- ☀️ Sun icon when light
- 💾 Persists across sessions
- ⚡ Instant switching
- 🎨 All components themed

---

## ⚡ Quick Actions:

### Change Password:
```javascript
// Location in app
Settings > Account > Change Password

// Validation
Current: Required, must match
New: Min 6 characters
Confirm: Must match new

// Result
✅ Success: "Password changed successfully!"
❌ Error: Clear message explaining issue
```

### Toggle Dark Mode:
```javascript
// Location in app
Settings > Preferences > Dark Mode

// Action
Click toggle = Instant change

// Persistence
localStorage.bilingua_dark_mode = 'true'/'false'

// Result
✅ Theme applies immediately
✅ Saved for next session
```

---

## 🔧 Troubleshooting:

### Password Change Issues:

**"Current password is incorrect"**
- Solution: Double-check your current password
- Try: Use eye icon to see what you typed

**"New password must be at least 6 characters"**
- Solution: Make new password longer
- Minimum: 6 characters required

**"New passwords do not match"**
- Solution: Retype passwords carefully
- Try: Use eye icon to verify both match

### Dark Mode Issues:

**Dark mode doesn't persist**
- Check: Browser localStorage enabled
- Try: Toggle off then on again

**Some elements still light**
- Solution: Refresh the page
- Note: All components should be themed

---

## 📋 Cheat Sheet:

### Password Change Flow:
```
1. Settings → Account
2. Click "Change Password"
3. Enter current password
4. Enter new password (6+)
5. Confirm new password
6. Click "Change Password"
7. ✅ Success!
```

### Dark Mode Flow:
```
1. Settings → Preferences
2. Toggle "Dark Mode"
3. ✅ Done! Theme changed
```

---

## 🎯 Best Practices:

### Password:
- ✅ Use strong passwords
- ✅ Change regularly
- ✅ Don't reuse passwords
- ✅ Keep it secure

### Dark Mode:
- ✅ Use for eye comfort
- ✅ Great for night use
- ✅ Battery saving (OLED)
- ✅ Modern look

---

## 📞 Need Help?

**Full Documentation:**
- `PASSWORD_AND_DARKMODE_UPDATE.md`

**Main README:**
- `README.md`

**Quick Start:**
- `QUICK_START.md`

---

**Version:** 2.2  
**Status:** Ready to Use ✅
