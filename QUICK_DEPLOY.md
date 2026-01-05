# 🚀 Quick Deploy Guide - BilinguaV2

## ⚡ Fastest Way to Deploy (5 Minutes!)

### 1️⃣ **Get Your Supabase Credentials**

Go to your Supabase project: https://supabase.com/dashboard

1. Click your project **BilinguaV2**
2. Go to **Settings** → **API**
3. Copy these 3 values:
   ```
   Project URL:          https://xxxxx.supabase.co
   anon public key:      eyJhbGc...
   service_role key:     eyJhbGc...
   ```

---

### 2️⃣ **Deploy to Vercel** 

Click this button to deploy instantly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

Or manually:

1. Go to **https://vercel.com**
2. Sign up with GitHub
3. Click **Add New** → **Project**
4. Import your GitHub repo
5. Add environment variables:
   - `SUPABASE_URL` = your Project URL
   - `SUPABASE_ANON_KEY` = your anon public key
   - `SUPABASE_SERVICE_ROLE_KEY` = your service_role key
6. Click **Deploy**
7. ✅ Done! Your app is live!

---

### 3️⃣ **Share with Users**

Your app is now live at: `https://your-project.vercel.app`

**How users install:**

📱 **Mobile (Android):**
- Open in Chrome → Menu (⋮) → "Install app"

📱 **Mobile (iOS):**
- Open in Safari → Share → "Add to Home Screen"

💻 **Desktop:**
- Open in Chrome → Click install icon (⊕) in address bar

---

### 4️⃣ **Update Your App Anytime**

When you want to update:

1. Edit in **Figma Make**
2. **Download code** (export project)
3. **Replace files** in your local folder
4. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Update from Figma Make"
   git push
   ```
5. Vercel **auto-deploys** in 30 seconds!
6. ✅ All users get the update automatically!

---

## 🎯 Alternative: Deploy to Netlify

1. Go to **https://netlify.com**
2. Drag & drop your project folder
3. Add environment variables in Site Settings
4. ✅ Done!

---

## 📱 PWA Features Already Built-In

Your app already has:
- ✅ Install as native app
- ✅ Works offline (service worker)
- ✅ Full-screen mode
- ✅ App icon & splash screen
- ✅ Fast loading (PWA optimized)

---

## 🔧 Troubleshooting

**Q: App shows blank screen after deploy?**
- Check if environment variables are set correctly
- Check browser console (F12) for errors

**Q: Can't install on mobile?**
- Must use HTTPS (Vercel/Netlify auto-provides)
- Use Chrome (Android) or Safari (iOS)

**Q: How to use custom domain?**
- Buy domain from Namecheap/GoDaddy
- Add in Vercel → Settings → Domains
- Follow DNS instructions

---

## 💡 Pro Tips

1. **Branch Strategy:**
   - `main` branch → Production (auto-deploy)
   - `dev` branch → Testing (deploy to separate URL)

2. **Preview Deployments:**
   - Every GitHub push gets a preview URL
   - Test before merging to main

3. **Monitoring:**
   - Check Vercel Analytics for visitor stats
   - Monitor errors in real-time

---

## 📞 Support

- Full guide: See `/DEPLOYMENT_GUIDE.md`
- Vercel docs: https://vercel.com/docs
- Supabase docs: https://supabase.com/docs

---

**Your app is ready to go live! 🎉**
