# 📚 Panduan Lengkap: Quiz & Exam di BilinguaV2

## ✅ STATUS: SEMUA FITUR SUDAH ADA DAN BERFUNGSI!

### 🎯 Cara Mengakses Quiz & Exam

#### **Step 1: Login ke Aplikasi**
1. Buka aplikasi BilinguaV2
2. Login dengan akun Anda

#### **Step 2: Pilih Level dari Dashboard**
1. Di Dashboard, Anda akan melihat level cards:
   - **Chinese**: HSK 1, HSK 2, HSK 3, HSK 4, HSK 5, HSK 6
   - **Japanese**: Hiragana, Katakana, JLPT N5, N4, N3, N2, N1
2. Klik salah satu level card

#### **Step 3: Di Level Menu - Pilih Aktivitas**
Anda akan melihat **6 activity cards**:

---

### 📖 1. STUDY MATERIALS (Hijau)
**Icon**: 📚 BookOpen  
**Badge**: "Start Here!"  
**Deskripsi**: Complete study guide with all vocabulary and grammar  
**Fitur**:
- Interactive flashcards
- Audio pronunciation
- Examples & explanations

**Cara Akses**: Klik card hijau "Study Materials"

---

### 📝 2. GRAMMAR GUIDE (Biru)
**Icon**: 📄 FileText  
**Badge**: "New!"  
**Deskripsi**: Essential grammar patterns explained simply  
**Fitur**:
- Clear explanations
- Real examples
- Common mistakes

**Cara Akses**: Klik card biru "Grammar Guide"

---

### 🎥 3. VIDEO LESSONS (Merah)
**Icon**: 🎬 Video  
**Badge**: "FREE!"  
**Deskripsi**: Curated video lessons from top teachers  
**Fitur**:
- Watch & learn
- Native pronunciation
- 100% free content

**Cara Akses**: Klik card merah "Video Lessons"

---

### 🧠 4. PRACTICE QUIZ (Ungu-Pink) ⭐ INI QUIZ NYA!
**Icon**: 🧠 Brain  
**Passing Grade**: **70%**  
**Deskripsi**: Test your knowledge after studying  

**Fitur Lengkap**:
- ✅ Multiple choice questions
- ✅ Review jawaban sebelum submit
- ✅ Passing grade 70%
- ✅ Earn points untuk setiap jawaban benar
- ✅ Mode review untuk melihat kesalahan
- ✅ Can retake unlimited times

**Status Indicator**:
- ○ Quiz - Belum selesai
- ✓ Quiz - Sudah lulus

**Cara Akses**: 
1. Dashboard → Pilih Level
2. Klik card **UNGU-PINK** dengan icon 🧠 "Practice Quiz"

**File Location**: `/components/PracticeExercise.tsx`

---

### 🎓 5. OFFICIAL EXAM (Orange-Red) ⭐ INI EXAM NYA!
**Icon**: 🎓 GraduationCap / 🔒 Lock  
**Passing Grade**: **80%**  
**Minimum Soal**: **30 questions**  
**Deskripsi**: Official certification exam  

**Fitur Lengkap**:
- ✅ **30 soal minimum** (exactly 30 questions)
- ✅ **Passing grade 80%** (must score ≥24/30)
- ✅ **Official Certificate** setelah lulus
- ✅ **Level Locking**: Unlock next level after passing
- ✅ **One-time attempt per unlock** (can retake if fail)
- ✅ Exam history tracking
- ✅ Comprehensive review setelah exam

**Prerequisites** (Level Locking System):
- 🔒 **LOCKED**: Belum bisa akses
- 🔓 **UNLOCKED**: Sudah complete Quiz atau Study Materials
- ✅ **PASSED**: Already passed exam

**Status Indicator**:
- 🔒 Lock icon - Exam masih terkunci
- 🎓 GraduationCap - Exam bisa diambil
- ✅ CheckCircle - Sudah lulus exam

**Cara Akses**: 
1. Dashboard → Pilih Level
2. **Complete Quiz dulu** (minimal 70%)
3. Klik card **ORANGE-RED** dengan icon 🎓 "Official Exam"

**File Location**: `/components/ExamMode.tsx`

**Certificate Features**:
- Official BilinguaV2 Certificate
- Shows level completed (HSK/JLPT)
- Date of completion
- Score achieved
- Downloadable/Printable

---

### 🏆 6. OLD VOCABULARY (Optional)
Legacy feature - masih tersedia tapi tidak recommended

---

## 🎯 LEARNING PATH YANG DISARANKAN

```
┌─────────────────────────────────────────────────────────┐
│  STEP 1: STUDY MATERIALS (Hijau) 📚                    │
│  → Pelajari semua vocabulary & grammar                 │
│  → Interactive flashcards dengan audio                 │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  STEP 2: GRAMMAR GUIDE (Biru) 📝                       │
│  → Pelajari pola grammar secara mendalam               │
│  → Lihat contoh dan kesalahan umum                     │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  STEP 3: VIDEO LESSONS (Merah) 🎥                      │
│  → Tonton video dari native speakers                   │
│  → Dengarkan pronunciation yang benar                  │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  STEP 4: PRACTICE QUIZ (Ungu) 🧠                       │
│  → Test pengetahuan Anda                               │
│  → Passing grade: 70%                                  │
│  → Bisa diulang berkali-kali                           │
│  → UNLOCK: Official Exam                               │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  STEP 5: OFFICIAL EXAM (Orange) 🎓                     │
│  → 30 soal resmi                                       │
│  → Passing grade: 80% (24/30 correct)                 │
│  → Dapatkan Official Certificate                       │
│  → UNLOCK: Next Level!                                 │
└─────────────────────────────────────────────────────────┘
                         ↓
               🎉 NAIK KE LEVEL BERIKUTNYA! 🎉
```

---

## 🔐 SISTEM LEVEL LOCKING

### Untuk Chinese (HSK):
```
HSK 1 (Unlocked) → Quiz 70% → Exam 80% → HSK 2 Unlocked
HSK 2 (Locked)   → Quiz 70% → Exam 80% → HSK 3 Unlocked
HSK 3 (Locked)   → Quiz 70% → Exam 80% → HSK 4 Unlocked
HSK 4 (Locked)   → Quiz 70% → Exam 80% → HSK 5 Unlocked
HSK 5 (Locked)   → Quiz 70% → Exam 80% → HSK 6 Unlocked
HSK 6 (Locked)   → Quiz 70% → Exam 80% → 🎓 MASTER!
```

### Untuk Japanese (JLPT):
```
Hiragana (Unlocked) → Quiz 70% → Exam 80% → ✅ Completed
Katakana (Unlocked) → Quiz 70% → Exam 80% → ✅ Completed
                                              ↓
                     (Hiragana + Katakana Completed)
                                              ↓
JLPT N5 (Unlocked)  → Quiz 70% → Exam 80% → N4 Unlocked
JLPT N4 (Locked)    → Quiz 70% → Exam 80% → N3 Unlocked
JLPT N3 (Locked)    → Quiz 70% → Exam 80% → N2 Unlocked
JLPT N2 (Locked)    → Quiz 70% → Exam 80% → N1 Unlocked
JLPT N1 (Locked)    → Quiz 70% → Exam 80% → 🎓 MASTER!
```

**Special Rule untuk Japanese**:
- ⚠️ **HARUS complete Hiragana + Katakana** sebelum bisa akses JLPT N5
- Tidak bisa skip level!

---

## 📊 PERBEDAAN QUIZ VS EXAM

| Feature | Practice Quiz 🧠 | Official Exam 🎓 |
|---------|-----------------|------------------|
| **Passing Grade** | 70% | 80% |
| **Jumlah Soal** | Varies | Exactly 30 |
| **Can Retake?** | Yes, unlimited | Yes, but must unlock again |
| **Unlock Next Level?** | No | Yes ✅ |
| **Get Certificate?** | No | Yes ✅ |
| **Prerequisite** | None | Complete Quiz first |
| **Points Earned** | 10 per correct | 10 per correct + 500 bonus |
| **Review Mode** | Yes | Yes |
| **Timed?** | No | No |

---

## 💡 TIPS & TRICKS

### Untuk Sukses di Quiz (70%):
1. ✅ Study Materials dulu sampai familiar
2. ✅ Practice dengan flashcards
3. ✅ Dengarkan audio pronunciation
4. ✅ Bisa diulang berkali-kali tanpa penalty

### Untuk Sukses di Exam (80%):
1. ✅ **Lulus Quiz dulu** - pastikan consistently score >80%
2. ✅ Review semua materi Grammar Guide
3. ✅ Tonton Video Lessons untuk context
4. ✅ **30 soal, minimal 24 benar** (80%)
5. ✅ Exam bisa diulang jika gagal

---

## 🐛 TROUBLESHOOTING

### "Exam card masih terkunci (Lock icon)"
**Solusi**: 
1. Complete Practice Quiz dulu dengan score ≥70%
2. Atau complete Study Materials
3. Refresh halaman jika sudah complete

### "No questions available"
**Solusi**: 
1. Pastikan level sudah memiliki vocabulary data
2. Check `/utils/hskData.ts` atau `/utils/japaneseData.ts`
3. Contact admin jika masalah persist

### "Can't access JLPT N5"
**Solusi**: 
1. ⚠️ **HARUS complete Hiragana + Katakana dulu!**
2. Pass kedua exam (Hiragana 80% + Katakana 80%)
3. Baru JLPT N5 akan unlock

### "Quiz options keep changing"
**Solusi**: 
✅ **SUDAH FIXED!** - Questions now memoized dengan `useMemo`

---

## 📱 VISUAL GUIDE - LOKASI DI UI

```
┌─────────────────────────────────────────────────┐
│           DASHBOARD - Select Level              │
│                                                 │
│  [HSK 1] [HSK 2] [HSK 3] [HSK 4] [HSK 5] [HSK 6]│
│                                                 │
│          👆 KLIK SALAH SATU                     │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│             LEVEL MENU - HSK 1                  │
│ ┌────────┐ ┌────────┐ ┌────────┐               │
│ │ STUDY  │ │GRAMMAR │ │ VIDEO  │               │
│ │   📚   │ │   📝   │ │   🎥   │               │
│ │ (Hijau)│ │ (Biru) │ │(Merah) │               │
│ └────────┘ └────────┘ └────────┘               │
│                                                 │
│ ┌────────┐ ┌────────┐ ┌────────┐               │
│ │ QUIZ   │ │ EXAM   │ │  OLD   │               │
│ │   🧠   │ │   🎓   │ │   📖   │               │
│ │ (Ungu) │ │(Orange)│ │        │               │
│ │ 👆 INI │ │ 👆 INI │ │        │               │
│ └────────┘ └────────┘ └────────┘               │
└─────────────────────────────────────────────────┘
```

---

## 🎉 KESIMPULAN

**SEMUA FITUR QUIZ & EXAM SUDAH LENGKAP!**

✅ Practice Quiz (70% passing) - **READY**  
✅ Official Exam (80% passing, 30 soal) - **READY**  
✅ Level Locking System - **READY**  
✅ Certificate Generation - **READY**  
✅ Progress Tracking - **READY**  
✅ Leaderboard Integration - **READY**  
✅ Points System - **READY**  

**Cara Aksesnya**:
1. Login
2. Dashboard → Pilih Level
3. **Card UNGU** = QUIZ 🧠
4. **Card ORANGE** = EXAM 🎓

**Jangan lupa flow yang benar**:
Study → Grammar → Videos → **Quiz (70%)** → **Exam (80%)** → Next Level!

---

Generated: January 5, 2026  
BilinguaV2 - Your Path to HSK/JLPT Certification 🎓
