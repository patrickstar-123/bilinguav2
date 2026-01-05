# 🔄 Update Workflow - Figma Make to Production

## 📊 Visual Workflow

```
┌─────────────────────────────────────────────────────────┐
│                    FIGMA MAKE (YOU)                      │
│  ✏️ Edit components, fix bugs, add features              │
│  🎨 Design new UI, update content                        │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
              ⬇️ DOWNLOAD CODE
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                  LOCAL COMPUTER                          │
│  📁 Replace all files in project folder                  │
│  💾 Save changes                                          │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
           🔄 GIT COMMIT & PUSH
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                     GITHUB                               │
│  📦 Repository: bilinguav2                               │
│  🌿 Branch: main                                          │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
        ⚡ AUTO-TRIGGER (Webhook)
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                     VERCEL                               │
│  🏗️ Build: npm run build (30-60 seconds)                │
│  ✅ Deploy to CDN (Global)                               │
│  🌐 Update: https://bilinguav2.vercel.app                │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
         🎉 LIVE TO ALL USERS!
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                  END USERS (PUBLIC)                      │
│  📱 Android: Installed as PWA                            │
│  📱 iOS: Installed as PWA                                │
│  💻 Desktop: Installed as App                            │
│  🌐 Browser: Direct web access                           │
│  ♻️ Auto-refresh on next visit (gets latest version)    │
└─────────────────────────────────────────────────────────┘
```

---

## ⏱️ Timeline

| Step | Duration | Who |
|------|----------|-----|
| Edit in Figma Make | Varies | You |
| Download code | 5 seconds | You |
| Replace files locally | 30 seconds | You |
| Git commit & push | 10 seconds | You |
| Vercel auto-build | 30-60 seconds | Automatic |
| CDN propagation | Instant | Automatic |
| **Total** | **~2 minutes** | **From push to live!** |

---

## 🎯 One-Time Setup vs Regular Updates

### ✅ ONE-TIME SETUP (30 minutes)

```
1. Create GitHub account
2. Create Vercel account (link to GitHub)
3. Create repository
4. First deployment
5. Add environment variables
6. Test deployment
```

**You only do this ONCE!**

---

### 🔄 REGULAR UPDATES (2 minutes)

```
1. Edit in Figma Make       [as long as you want]
2. Download code            [5 seconds]
3. Replace files            [30 seconds]
4. Git push                 [10 seconds]
5. Wait for auto-deploy     [60 seconds]
6. ✅ LIVE!
```

**Do this EVERY TIME you update!**

---

## 📝 Step-by-Step Commands

### For GitHub Desktop Users (EASIEST):

1. Open **GitHub Desktop**
2. Click **Fetch origin** (top right)
3. You'll see changed files automatically
4. Type commit message: `"Update UI from Figma Make"`
5. Click **Commit to main**
6. Click **Push origin** (top right)
7. ✅ Done!

---

### For Command Line Users:

```bash
# Navigate to project folder
cd /path/to/bilinguav2

# Check what changed
git status

# Stage all changes
git add .

# Commit with message
git commit -m "Update: Added new level menu design"

# Push to GitHub
git push origin main

# Check deployment status
# Open: https://vercel.com/dashboard
```

---

## 🔍 How Users Get Updates

### 🔄 Automatic Update Flow:

```
User opens app → Browser checks for updates → New version downloads → App reloads → ✅ Updated!
```

**No action required from users!** They just open the app normally.

---

### 📱 Service Worker Update Strategy:

The PWA service worker (`/public/sw.js`) handles:

1. **Cache Strategy**: Network-first for HTML/API
2. **Asset Caching**: CSS, JS, images cached
3. **Update Detection**: Checks on every app open
4. **Background Sync**: Downloads updates in background
5. **Prompt User**: "New version available, refresh?"

Users see: 
```
🔄 New version available!
[Refresh Now] [Later]
```

---

## 🎨 Best Practices for Updates

### ✅ DO:

- **Test in Figma Make first** before deploying
- **Write clear commit messages**: "Fix: Japanese level bug", "Add: New HSK 4 vocabulary"
- **Deploy small updates frequently** (safer than big changes)
- **Check Vercel build logs** if deployment fails
- **Announce major updates** to users (in-app notification)

### ❌ DON'T:

- **Don't push broken code** (test first!)
- **Don't deploy on Friday evening** (if something breaks, you can't fix until Monday)
- **Don't skip commit messages** (you'll forget what you changed)
- **Don't delete environment variables** by accident

---

## 🚨 Emergency Rollback

If you deploy a buggy update:

### Option 1: Quick Fix (RECOMMENDED)
```bash
# Fix the bug in Figma Make
# Download code
# Push fix immediately
git add .
git commit -m "Hotfix: Restore working version"
git push
```

### Option 2: Revert to Previous Version
```bash
# Undo last commit
git revert HEAD
git push

# Or rollback to specific commit
git reset --hard COMMIT_HASH
git push --force
```

### Option 3: Vercel Instant Rollback
1. Go to Vercel dashboard
2. Click **Deployments**
3. Find working version
4. Click **...** → **Promote to Production**
5. ✅ Instant rollback!

---

## 📊 Monitoring Your App

### Vercel Dashboard Shows:

- ✅ **Deployment status** (Building, Success, Failed)
- 📈 **Analytics** (visitors, page views)
- ⚡ **Performance** (load time, Core Web Vitals)
- 🐛 **Errors** (runtime errors from users)
- 🌍 **Geographic data** (where users are from)

### Check After Each Deploy:

1. ✅ Deployment successful?
2. ✅ No build errors?
3. ✅ Test app on phone (install as PWA)
4. ✅ Check console for errors (F12)
5. ✅ Test key features (login, level access, etc)

---

## 💡 Advanced: Multiple Environments

### Production + Staging Setup:

```
main branch        → Production  → https://bilinguav2.vercel.app
dev branch         → Staging     → https://bilinguav2-dev.vercel.app
feature branches   → Previews    → https://bilinguav2-pr-123.vercel.app
```

**Benefits:**
- Test updates on staging before production
- Show clients preview URLs
- Safe experimentation

**How to set up:**
1. Create `dev` branch in GitHub
2. Vercel auto-creates staging deployment
3. Merge to `main` when ready for production

---

## 🎉 Success Checklist

After each update, verify:

- [ ] Code downloaded from Figma Make
- [ ] Files replaced in local folder
- [ ] Git push successful
- [ ] Vercel build completed (green ✓)
- [ ] App loads correctly in browser
- [ ] PWA install works on mobile
- [ ] Login/features working
- [ ] No console errors
- [ ] Users can access without issues

---

## 📞 Common Issues

### Issue: "Build Failed"
**Solution:** Check build logs in Vercel, fix syntax errors, push again

### Issue: "Environment variables not found"
**Solution:** Add in Vercel → Settings → Environment Variables → Redeploy

### Issue: "PWA not updating"
**Solution:** Hard refresh (Ctrl+Shift+R), clear cache, uninstall & reinstall

### Issue: "GitHub Desktop not showing changes"
**Solution:** Click "Fetch origin", make sure you're in correct repository

---

**Ready to deploy? Follow `/QUICK_DEPLOY.md` for setup! 🚀**
