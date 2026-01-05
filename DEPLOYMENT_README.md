# 🚀 BilinguaV2 - Deployment Guide

## Aplikasi Pembelajaran Bahasa (Chinese HSK 1-6 & Japanese JLPT N5-N1)

---

## 📦 Files Yang Sudah Siap

Semua file sudah ready untuk deployment! Struktur project:

```
bilinguav2/
├── 📄 Configuration Files
│   ├── package.json          ✅ Dependencies
│   ├── vite.config.ts        ✅ Vite config
│   ├── tsconfig.json         ✅ TypeScript config
│   ├── tsconfig.node.json    ✅ TypeScript node config
│   ├── postcss.config.js     ✅ PostCSS config
│   ├── vercel.json           ✅ Vercel config
│   ├── netlify.toml          ✅ Netlify config
│   └── .gitignore            ✅ Git ignore
│
├── 📄 Entry Points
│   ├── index.html            ✅ HTML entry
│   └── main.tsx              ✅ React entry
│
├── 📱 Main App
│   └── App.tsx               ✅ Main component
│
├── 📁 Components (~50 files)
│   ├── components/           ✅ All UI components
│   └── components/ui/        ✅ UI library
│
├── 🔧 Utils
│   ├── utils/                ✅ Helper functions
│   └── utils/supabase/       ✅ Supabase config
│
├── 🎨 Styles
│   └── styles/globals.css    ✅ Tailwind styles
│
├── ⚡ Supabase Backend
│   └── supabase/functions/   ✅ Server code
│
└── 📱 PWA
    └── public/               ✅ PWA assets
        ├── manifest.json
        └── sw.js
```

---

## 🎯 Quick Deploy Steps

### 1️⃣ Upload ke GitHub

**Opsi A: Upload Manual (Recommended)**
1. Buka repository: https://github.com/[username]/bilinguav2
2. Klik "Add file" → "Upload files"
3. Drag & drop SEMUA file dari project ini
4. Commit: "Initial commit - BilinguaV2"

**Opsi B: Git Command Line**
```bash
git clone https://github.com/[username]/bilinguav2.git
cd bilinguav2
# Copy semua file ke folder ini
git add .
git commit -m "Initial commit - BilinguaV2"
git push
```

---

### 2️⃣ Setup Supabase (5 menit)

1. **Buka**: https://supabase.com/dashboard
2. **Create New Project**:
   ```
   Name: BilinguaV2
   Database Password: [create strong password]
   Region: Southeast Asia (Singapore)
   ```
3. **Wait 2 minutes** for project to be created
4. **Copy credentials** dari Settings → API:
   - Project URL
   - anon public key
   - service_role key

---

### 3️⃣ Deploy ke Vercel (5 menit)

1. **Buka**: https://vercel.com/new
2. **Import repository**: bilinguav2
3. **Configure Project**:
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```
4. **Add Environment Variables**:
   ```
   SUPABASE_URL = [your project URL]
   SUPABASE_ANON_KEY = [your anon key]
   SUPABASE_SERVICE_ROLE_KEY = [your service role key]
   ```
5. **Click Deploy!** 🚀

---

## ✅ After Deployment

### Test Your App:

1. **Visit**: https://bilinguav2.vercel.app
2. **Create account** (signup)
3. **Test features**:
   - ✅ Login/Signup
   - ✅ Language selection
   - ✅ Quiz & Exam
   - ✅ Level progression
   - ✅ Leaderboard

### Install as PWA:

**📱 Android:**
- Chrome → Menu → "Install app"

**📱 iPhone:**
- Safari → Share → "Add to Home Screen"

**💻 Desktop:**
- Chrome → Address bar → Install icon

---

## 🔧 Troubleshooting

### Build Failed?
- Check environment variables di Vercel
- Pastikan semua 3 Supabase variables ada

### Blank Screen?
- Open browser console (F12)
- Check for errors
- Verify Supabase credentials

### Can't Login?
- Check Supabase dashboard → Authentication → Settings
- Enable Email provider

---

## 📞 Support

Jika ada error atau pertanyaan:
1. Check browser console
2. Check Vercel build logs
3. Check Supabase logs

---

## 🎉 Features

✅ **Languages**: Chinese (HSK 1-6), Japanese (JLPT N5-N1)
✅ **Learning Path**: Hiragana → Katakana → JLPT
✅ **Exam System**: 30 questions, 80% pass rate
✅ **Progress Tracking**: Achievements, points, leaderboard
✅ **AI Chat Assistant**: Practice conversation
✅ **Character Writing**: Learn to write Chinese/Japanese
✅ **Responsive**: Works on phone, tablet, desktop
✅ **PWA**: Install as native app
✅ **Offline Ready**: Service Worker enabled

---

**Made with ❤️ for language learners**
