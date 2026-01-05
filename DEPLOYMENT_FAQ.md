# ❓ Deployment FAQ - Frequently Asked Questions

Common questions about deploying BilinguaV2 to production.

---

## 🎯 General Questions

### Q: Apakah saya perlu bayar untuk hosting?
**A:** TIDAK! Ada banyak opsi gratis:
- ✅ **Vercel** - Gratis untuk personal projects
- ✅ **Netlify** - Gratis untuk personal use
- ✅ **Railway** - Free trial tersedia

**Batasan free tier:**
- Vercel: 100GB bandwidth/bulan (cukup untuk ribuan users)
- Netlify: 100GB bandwidth/bulan
- Railway: 500 jam/bulan

---

### Q: Apakah user perlu login Figma untuk pakai app?
**A:** TIDAK! Setelah deploy:
- ✅ User buka link biasa (misal: `https://bilinguav2.vercel.app`)
- ✅ Tidak perlu akun Figma
- ✅ Tidak perlu akun Vercel
- ✅ Langsung bisa sign up & pakai app

---

### Q: Apakah saya masih bisa edit di Figma Make setelah deploy?
**A:** YA! Workflow-nya:
1. Edit di Figma Make (seperti biasa)
2. Download code (export project)
3. Push ke GitHub
4. Vercel auto-deploy (~60 detik)
5. ✅ Semua user dapat update!

**Tidak perlu re-deploy manual!** Semua otomatis.

---

### Q: Berapa lama proses deployment pertama kali?
**A:** Breakdown waktu:

| Step | Duration |
|------|----------|
| Setup Supabase | 10 menit |
| Create GitHub repo | 5 menit |
| Setup Vercel | 10 menit |
| First deployment | 2 menit |
| Testing | 5 menit |
| **TOTAL** | **~30 menit** |

Update selanjutnya: **hanya 2 menit!**

---

## 📱 PWA & Installation

### Q: Apa itu PWA?
**A:** Progressive Web App - aplikasi web yang bisa di-install seperti app native:
- ✅ Install di home screen (Android/iOS)
- ✅ Buka full screen (tanpa browser UI)
- ✅ Works offline
- ✅ Fast loading
- ✅ Push notifications (optional)

**Bedanya dengan app native:**
- ❌ Tidak perlu publish ke Google Play/App Store
- ❌ Tidak perlu approve dari Google/Apple
- ❌ Tidak perlu coding Swift/Kotlin
- ✅ Satu codebase untuk semua platform
- ✅ Update instant (tidak perlu download ulang dari store)

---

### Q: Apakah PWA sama bagusnya dengan app native?
**A:** Hampir sama! 

**PWA bisa:**
- ✅ Install di home screen
- ✅ Full screen mode
- ✅ Work offline
- ✅ Push notifications
- ✅ Camera/microphone access
- ✅ Geolocation
- ✅ Fast & responsive

**PWA tidak bisa:**
- ❌ Access phone contacts (privacy)
- ❌ Some hardware features (NFC, Bluetooth LE)
- ❌ Background tasks (saat app closed)

**Untuk learning app seperti BilinguaV2, PWA sudah lebih dari cukup!** 🎉

---

### Q: Bagaimana cara user install app di Android?
**A:** Super mudah:
1. Buka Chrome di Android
2. Visit `https://bilinguav2.vercel.app`
3. Banner "Install app" muncul otomatis
4. Tap "Install" atau Menu (⋮) → "Install app"
5. ✅ Icon muncul di home screen!

**Video tutorial:** https://web.dev/install-criteria

---

### Q: Bagaimana cara user install app di iPhone?
**A:** Lewat Safari:
1. Buka Safari di iPhone (HARUS Safari, bukan Chrome!)
2. Visit `https://bilinguav2.vercel.app`
3. Tap tombol Share (kotak dengan panah ke atas)
4. Scroll ke bawah, tap "Add to Home Screen"
5. Tap "Add"
6. ✅ Icon muncul di home screen!

**Note:** iOS tidak support install dari Chrome! Harus Safari.

---

## 🔄 Updates & Maintenance

### Q: Kalau saya update app, apakah user perlu download ulang?
**A:** TIDAK! Update otomatis:
1. Kamu push update ke GitHub
2. Vercel auto-deploy
3. User buka app → auto download update di background
4. App refresh → ✅ versi baru!

**User tidak perlu:**
- ❌ Uninstall & reinstall
- ❌ Download dari store
- ❌ Manual update

Semua otomatis! 🎉

---

### Q: Berapa lama delay dari push ke live?
**A:** Sangat cepat!

```
git push
  ↓
30-60 detik build time
  ↓
Instant CDN update
  ↓
✅ LIVE!
```

Total: **~1 menit** dari push sampai live!

---

### Q: Kalau saya deploy versi buggy, gimana rollback?
**A:** Ada 3 cara:

**Cara 1: Quick Fix (Recommended)**
```bash
# Fix bug di Figma Make
# Download & push fix
git push
# Live in 60 seconds!
```

**Cara 2: Git Revert**
```bash
git revert HEAD
git push
```

**Cara 3: Vercel Instant Rollback**
1. Buka Vercel dashboard
2. Tab "Deployments"
3. Cari versi yang working
4. Click "..." → "Promote to Production"
5. ✅ Rollback instant!

---

## 🔐 Security & Privacy

### Q: Apakah data user aman?
**A:** YA! Security features:
- ✅ **HTTPS** - All traffic encrypted (auto by Vercel)
- ✅ **Supabase** - Enterprise-grade database security
- ✅ **Environment variables** - API keys tersembunyi
- ✅ **No hardcoded secrets** - All credentials in Vercel env vars
- ✅ **Password hashing** - User passwords encrypted

**Best practices:**
- Never commit `.env` files to Git
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret
- Use strong admin password
- Enable Supabase RLS (Row Level Security) for extra protection

---

### Q: Bisakah orang lain lihat kode saya?
**A:** Tergantung:
- **Public GitHub repo** → Kode visible (tapi tidak ada API keys!)
- **Private GitHub repo** → Kode hidden (butuh Vercel pro)

**Recommended:** Public repo OK karena:
- API keys di environment variables (tidak di code)
- User data di Supabase (secure)
- Open source = community contributions!

---

## 💰 Cost & Scaling

### Q: Kalau user saya banyak, apakah akan kena charge?
**A:** Vercel free tier sangat generous:
- ✅ **100GB bandwidth/month** (gratis)
- ✅ **Unlimited visitors**
- ✅ **100 deployments/day**

**Contoh perhitungan:**
- Average page size: 2MB
- 100GB / 2MB = 50,000 page loads/month
- ~1,667 page loads/day

**Kalau exceed:**
- Vercel akan email warning
- Bisa upgrade ke Pro ($20/month) untuk 1TB bandwidth

**Supabase free tier:**
- ✅ **500MB database**
- ✅ **50,000 monthly active users**
- ✅ **2GB bandwidth**

**Untuk learning app, free tier cukup sampai ribuan users!** 🎉

---

### Q: Bagaimana cara monitor usage?
**A:** 

**Vercel Dashboard:**
- Buka https://vercel.com/dashboard
- Pilih project "bilinguav2"
- Tab "Analytics" → Lihat:
  - Visitor count
  - Bandwidth usage
  - Geographic distribution
  - Page views

**Supabase Dashboard:**
- Buka https://supabase.com/dashboard
- Pilih project "BilinguaV2"
- Tab "Usage" → Lihat:
  - Database size
  - API requests
  - Bandwidth
  - Active users

---

## 🌐 Domain & Branding

### Q: Bisakah saya pakai domain sendiri (bukan .vercel.app)?
**A:** YA! Sangat mudah:

1. **Beli domain** dari:
   - Namecheap (~$10/year)
   - GoDaddy (~$12/year)
   - Google Domains (~$12/year)

2. **Add di Vercel:**
   - Vercel dashboard → Project → Settings → Domains
   - Tambahkan domain: `belajarbahasa.com`
   - Copy DNS records

3. **Update DNS:**
   - Login ke registrar (Namecheap/GoDaddy)
   - Add CNAME record: `cname.vercel-dns.com`
   - Wait 5-30 minutes

4. ✅ **Done!** App accessible at your domain

**HTTPS otomatis!** Vercel auto-generates SSL certificate.

---

### Q: Apakah saya bisa custom app name & icon?
**A:** YA! Sudah dikonfigurasi di `/public/manifest.json`:

```json
{
  "name": "BilinguaV2 - Language Learning",
  "short_name": "BilinguaV2",
  "icons": [ /* 72x72 to 512x512 */ ]
}
```

**Cara ganti:**
1. Edit `manifest.json`
2. Replace icon files di `/public/`
3. Push ke GitHub
4. ✅ Update otomatis!

**Icon requirements:**
- 192x192px (minimum)
- 512x512px (recommended)
- PNG format
- Transparent background (optional)

**Generate icons:** https://realfavicongenerator.net

---

## 🐛 Troubleshooting

### Q: Deployment failed dengan error "Build Error"
**A:** Common causes:

1. **Missing dependencies**
   ```bash
   # Fix: Check package.json includes all imports
   npm install
   npm run build  # Test locally first
   ```

2. **TypeScript errors**
   - Fix syntax errors
   - Check all imports are correct
   - Test in Figma Make first

3. **Environment variables not set**
   - Vercel → Settings → Environment Variables
   - Add: SUPABASE_URL, SUPABASE_ANON_KEY, etc.

**Solution:** Check build logs in Vercel dashboard for exact error.

---

### Q: App deployed tapi blank screen?
**A:** Common fixes:

1. **Check browser console (F12)**
   - Look for error messages
   - Often: "Cannot connect to Supabase"

2. **Verify environment variables**
   - Vercel → Settings → Environment Variables
   - Make sure all 3 Supabase vars are set
   - Click "Redeploy" after adding

3. **Check Supabase connection**
   - Test API URL manually: `https://xxxxx.supabase.co`
   - Should return Supabase landing page

4. **Hard refresh**
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)

---

### Q: PWA not installing on mobile?
**A:** Checklist:

- [ ] Using **HTTPS** (Vercel provides automatically)
- [ ] **manifest.json** exists in /public/
- [ ] **service worker** registered (check /public/sw.js)
- [ ] Using **Chrome** (Android) or **Safari** (iOS)
- [ ] Not in **Incognito mode**
- [ ] Site loaded **at least twice**

**Test install criteria:** https://web.dev/install-criteria

---

### Q: User data tidak persist setelah refresh?
**A:** Causes:

1. **Supabase connection issue**
   - Check SUPABASE_URL & keys correct
   - Test database in Supabase dashboard

2. **localStorage not working**
   - Check browser allows cookies/storage
   - Test in different browser

3. **Session expired**
   - User needs to login again
   - Supabase session timeout = 7 days default

**Debug:** Check browser console for "Failed to save progress" errors.

---

## 🚀 Advanced Topics

### Q: Bisakah saya setup CI/CD pipeline?
**A:** SUDAH AUTO! Vercel = built-in CI/CD:

```
GitHub push → Vercel detects → Auto build → Auto deploy → Live!
```

**Advanced setup:**
- Add automated tests (Jest, Playwright)
- Run tests before deploy
- Deploy to staging first, then production

**Config:** Add `vercel.json`:
```json
{
  "github": {
    "silent": false,
    "autoAlias": true
  }
}
```

---

### Q: Bagaimana cara setup multiple environments (staging vs production)?
**A:** 

**Option 1: Branch-based**
```
main branch   → Production   → bilinguav2.vercel.app
dev branch    → Staging      → bilinguav2-dev.vercel.app
```

**Option 2: Separate projects**
```
bilinguav2       → Production
bilinguav2-dev   → Staging
```

**Vercel auto-creates preview URL untuk setiap branch!**

---

### Q: Bisakah saya add analytics (Google Analytics)?
**A:** YA! Dua cara:

**Option 1: Vercel Analytics (Recommended)**
- Vercel dashboard → Project → Analytics → Enable
- ✅ Privacy-friendly
- ✅ No cookies
- ✅ GDPR compliant

**Option 2: Google Analytics**
```tsx
// Add to App.tsx
import { useEffect } from 'react';

useEffect(() => {
  // Google Analytics code
  window.gtag('config', 'GA-MEASUREMENT-ID');
}, []);
```

---

### Q: Bisakah saya monetize app (iklan, subscription)?
**A:** YA!

**Ads:**
- Google AdSense (display ads)
- No code changes needed
- Just add script tag

**Subscriptions:**
- Stripe integration
- Supabase + Stripe webhooks
- Premium tiers (HSK 4-6 = premium)

**In-app purchases:**
- Not available for PWA (need native app)
- Alternative: Paywall via Stripe

---

## 📞 Getting Help

### Q: Stuck? Dimana saya bisa minta bantuan?
**A:** Resources:

**Documentation:**
- ✅ Read `/DEPLOYMENT_GUIDE.md` (detailed)
- ✅ Check `/TROUBLESHOOTING.md` (common issues)
- ✅ See `/UPDATE_WORKFLOW.md` (update process)

**Community:**
- 💬 Vercel Discord: https://vercel.com/discord
- 💬 Supabase Discord: https://discord.supabase.com
- 💬 GitHub Discussions: Ask in your repo

**Official Docs:**
- 📖 Vercel: https://vercel.com/docs
- 📖 Supabase: https://supabase.com/docs
- 📖 PWA: https://web.dev/progressive-web-apps

**Professional Support:**
- Vercel Pro: Includes support ticket
- Supabase Pro: Priority support

---

## 🎉 Success Stories

### Q: Ada contoh apps yang deploy dengan cara yang sama?
**A:** Banyak!

**Popular PWAs:**
- Twitter (X) Lite - PWA
- Pinterest - PWA
- Starbucks - PWA
- Uber - PWA
- Spotify - PWA

**Built with Vercel:**
- TikTok homepage
- Nike website
- Patreon
- HashiCorp
- McDonald's

**Your BilinguaV2 akan join mereka!** 🚀

---

**Masih ada pertanyaan? Tambahkan ke FAQ ini atau check documentation files!**

Last updated: January 2026
