# 🚀 BilinguaV2 Deployment Guide

## Cara Deploy Aplikasi Ke Internet

### 📋 Prerequisites
1. Akun GitHub (gratis) - https://github.com
2. Akun Vercel (gratis) - https://vercel.com
3. Supabase Project yang sudah dibuat

---

## 🎯 STEP-BY-STEP DEPLOYMENT

### **STEP 1: Download Semua Kode**

1. Di Figma Make, klik **menu hamburger (☰)** di kiri atas
2. Pilih **"Export Project"** atau **"Download Code"**
3. Simpan file ZIP ke komputer kamu
4. Extract ZIP file tersebut

---

### **STEP 2: Push ke GitHub**

#### **Cara 1: Menggunakan GitHub Desktop (Mudah)**

1. Download & install **GitHub Desktop**: https://desktop.github.com
2. Buka GitHub Desktop
3. Klik **File** → **New Repository**
   - **Name**: `bilinguav2`
   - **Local Path**: Pilih folder hasil extract
   - ✅ Centang "Initialize with README"
4. Klik **Create Repository**
5. Klik **Publish Repository** di kanan atas
   - Pilih **Public** (gratis) atau **Private** (perlu bayar di Vercel)
6. Klik **Publish**

#### **Cara 2: Menggunakan Command Line (Advanced)**

```bash
cd /path/to/bilinguav2
git init
git add .
git commit -m "Initial commit - BilinguaV2"
git branch -M main
git remote add origin https://github.com/USERNAME/bilinguav2.git
git push -u origin main
```

---

### **STEP 3: Deploy ke Vercel**

1. Buka **https://vercel.com**
2. Klik **Sign Up** → pilih **Continue with GitHub**
3. Login dengan akun GitHub kamu
4. Klik **Add New** → **Project**
5. Pilih repository **bilinguav2**
6. Klik **Import**

#### **⚙️ Konfigurasi Build Settings:**

Vercel biasanya auto-detect, tapi pastikan settingnya seperti ini:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### **🔐 Environment Variables:**

Klik **Environment Variables** dan tambahkan:

```
SUPABASE_URL = https://YOUR-PROJECT.supabase.co
SUPABASE_ANON_KEY = eyJhbGc...your-anon-key...
SUPABASE_SERVICE_ROLE_KEY = eyJhbGc...your-service-role-key...
```

**⚠️ PENTING: Ambil dari Supabase Dashboard:**
1. Buka **https://supabase.com**
2. Pilih project BilinguaV2
3. Klik **Settings** → **API**
4. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

7. Klik **Deploy**
8. Tunggu 2-3 menit ⏳
9. ✅ **SELESAI!** Aplikasi online di: `https://bilinguav2.vercel.app`

---

### **STEP 4: Setup Custom Domain (Opsional)**

1. Di Vercel dashboard, klik project **bilinguav2**
2. Klik tab **Settings**
3. Klik **Domains**
4. Tambahkan domain kamu (misal: `belajar-bahasa.com`)
5. Ikuti instruksi DNS setting
6. ✅ Aplikasi bisa diakses di domain sendiri!

---

## 📱 CARA USER INSTALL APLIKASI

### **Android:**

1. Buka **Chrome** di HP
2. Kunjungi `https://bilinguav2.vercel.app`
3. Klik **menu (⋮)** di kanan atas
4. Pilih **"Install app"** atau **"Add to Home Screen"**
5. ✅ Aplikasi muncul di home screen seperti app biasa!

### **iOS (iPhone/iPad):**

1. Buka **Safari** di iPhone
2. Kunjungi `https://bilinguav2.vercel.app`
3. Klik tombol **Share** (kotak dengan panah)
4. Scroll ke bawah, pilih **"Add to Home Screen"**
5. Klik **Add**
6. ✅ Aplikasi muncul di home screen!

### **Desktop (Windows/Mac/Linux):**

1. Buka **Chrome** atau **Edge**
2. Kunjungi `https://bilinguav2.vercel.app`
3. Klik **icon install** (⊕) di address bar
4. Klik **Install**
5. ✅ Aplikasi buka sebagai window tersendiri!

---

## 🔄 CARA UPDATE APLIKASI (DARI FIGMA MAKE)

### **Workflow Update:**

```
Figma Make → Download Code → GitHub → Vercel Auto-Deploy → Live!
```

#### **Langkah Update:**

1. **Edit di Figma Make** (seperti biasa)
2. **Download code baru**
3. **Replace semua file** di folder local
4. **Commit & Push ke GitHub:**

   **Via GitHub Desktop:**
   - Buka GitHub Desktop
   - Tulis commit message: "Update UI dashboard"
   - Klik **Commit to main**
   - Klik **Push origin**

   **Via Command Line:**
   ```bash
   git add .
   git commit -m "Update UI dashboard"
   git push
   ```

5. **Vercel auto-deploy** (30-60 detik)
6. ✅ **Semua user dapat update otomatis!**

**User tidak perlu re-install**, cukup refresh browser atau buka ulang app!

---

## 🔧 TROUBLESHOOTING

### **1. "Build Failed" di Vercel**

**Penyebab**: Missing dependencies atau syntax error

**Solusi**:
- Check **Build Logs** di Vercel
- Pastikan semua import path benar
- Test `npm run build` di local dulu

### **2. "Blank Screen" Setelah Deploy**

**Penyebab**: Environment variables tidak di-set

**Solusi**:
- Check **Environment Variables** di Vercel settings
- Pastikan SUPABASE_URL, SUPABASE_ANON_KEY ada
- Redeploy aplikasi

### **3. "Cannot Install App" di Mobile**

**Penyebab**: Harus pakai HTTPS

**Solusi**:
- ✅ Vercel otomatis pakai HTTPS
- Pastikan buka di Chrome (Android) atau Safari (iOS)
- Coba hard refresh: Ctrl+Shift+R

---

## 🎉 SELESAI!

Sekarang aplikasi BilinguaV2 sudah:
- ✅ **Online** di internet (public URL)
- ✅ **Bisa di-install** seperti app native
- ✅ **Auto-update** saat kamu push ke GitHub
- ✅ **Gratis** (Vercel free tier)
- ✅ **Cepat** (CDN global)

---

## 📊 ALTERNATIF HOSTING

### **Opsi 2: Netlify**
- Similar dengan Vercel
- Gratis, auto-deploy
- Link: https://netlify.com

### **Opsi 3: Firebase Hosting**
- By Google
- Gratis, CDN global
- Link: https://firebase.google.com

### **Opsi 4: Railway**
- Bagus untuk full-stack app
- Free tier tersedia
- Link: https://railway.app

---

## 💡 TIPS PRO

### **1. Setup Continuous Deployment**

Sekali setup, setiap push ke GitHub = auto-deploy!

```
Edit in Figma Make
    ↓
Download code
    ↓
Git push
    ↓
Vercel auto-build & deploy (30s)
    ↓
Live to all users!
```

### **2. Branch Strategy**

```bash
# Development branch
git checkout -b dev
# Test updates here first

# When ready, merge to main
git checkout main
git merge dev
git push
# Auto-deploy to production!
```

### **3. Monitoring**

Vercel provides:
- ✅ Analytics (visitor count)
- ✅ Error logs
- ✅ Performance metrics
- ✅ Real-time deployment status

---

## 📞 NEED HELP?

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- PWA Guide: https://web.dev/progressive-web-apps

---

**Happy Deploying! 🚀**
