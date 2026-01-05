# 🧪 Testing Instructions for Fixed BilinguaV2

## ✅ What Was Fixed

### 1. Level-Specific Study Materials
- **Before**: HSK 2-6 showed ALL vocabulary from previous levels (cumulative)
- **After**: Each level shows ONLY its unique vocabulary
- **Files Updated**: 
  - `/components/ImprovedStudyGuideComplete.tsx`
  - `/components/VocabularyLesson.tsx`
  - `/components/ListeningPractice.tsx`

### 2. Dynamic Exam Generation
- **Before**: Exams had hardcoded questions for HSK 1-2 only
- **After**: Exams dynamically generate 30 questions from study material
- **Files Updated**: 
  - `/components/ExamMode.tsx`
  - `/utils/hskData.ts`
  - `/utils/japaneseData.ts`

### 3. Consistency Between Study & Exam
- **Before**: Study materials and exams used different content
- **After**: Both use the same `getVocabularyForLevelOnly()` function

---

## 🔐 Admin Account Testing

### Login Credentials
```
Email: admin@bilinguav2.com
Password: Admin123!Test
```

### Admin Features
- ✅ All levels unlocked immediately
- ✅ 999,999 points
- ✅ Can access any exam without prerequisites
- ✅ Can test all features

---

## 📋 Test Plan

### Test 1: HSK Level Progression (Chinese)

#### HSK 1 - Basic Level
1. Login with admin account
2. Select **Chinese**
3. Select **HSK 1**
4. Click **Study Materials**
5. ✅ **Verify**: Should see words like:
   - 你好 (nǐ hǎo) - Hello
   - 谢谢 (xiè xie) - Thank you
   - 我 (wǒ) - I/Me
   - 是 (shì) - To be
6. Navigate through ~20 cards
7. Go back and click **Exam**
8. ✅ **Verify**: Exam questions use the same HSK 1 vocabulary you just studied

#### HSK 2 - Different Content
1. Go back to main menu
2. Select **HSK 2**
3. Click **Study Materials**
4. ✅ **Verify**: Should see DIFFERENT words from HSK 1, like:
   - 现在 (xiàn zài) - Now
   - 喜欢 (xǐ huan) - To like
   - 朋友 (péng you) - Friend
   - 漂亮 (piào liang) - Beautiful
5. ✅ **Verify**: Should NOT see 你好, 谢谢, etc. (HSK 1 words)
6. Click **Exam**
7. ✅ **Verify**: Exam uses HSK 2 vocabulary only

#### HSK 3 - Advanced Content
1. Go back and select **HSK 3**
2. Click **Study Materials**
3. ✅ **Verify**: Should see even more advanced words
4. ✅ **Verify**: No HSK 1 or HSK 2 words appear

#### HSK 4, 5, 6 - Unique Content
1. Test HSK 4: Should see words like "按照" (àn zhào)
2. Test HSK 5: Should see words like "爱护" (ài hù)
3. Test HSK 6: Should see words like "哀悼" (āi dào)
4. ✅ **Verify**: Each level has different, unique content

---

### Test 2: Exam Question Generation

#### Dynamic Questions Test
1. Select any HSK level
2. Take the **Exam** (30 questions)
3. ✅ **Verify**: Questions include:
   - "What does '你好' (nǐ hǎo) mean?" → [Hello, Goodbye, Thank you, Sorry]
   - "How do you say 'hello' in Chinese?" → [你好, 再见, 谢谢, 是]
   - "What is the pinyin for '好'?" → [hǎo, hào, háo, hāo]
   - "'nǐ hǎo' means:" → [I, You, Hello, Goodbye]

4. ✅ **Verify**: All 4 answer choices are different
5. ✅ **Verify**: Only 1 correct answer per question
6. ✅ **Verify**: 30 questions total

#### Exam-Study Consistency
1. While taking exam, note 5 words that appear in questions
2. Go back to **Study Materials**
3. ✅ **Verify**: All 5 words appear in study materials
4. ✅ **Verify**: The meanings in the exam match the study materials

---

### Test 3: Japanese JLPT Levels

#### JLPT N5
1. Select **Japanese**
2. Complete **Hiragana** and **Katakana** (admin has them unlocked)
3. Select **JLPT N5**
4. Click **Study Materials**
5. ✅ **Verify**: Should see words like:
   - こんにちは (konnichiwa) - Hello
   - ありがとう (arigatou) - Thank you
6. Click **Exam**
7. ✅ **Verify**: Questions use N5 vocabulary

#### JLPT N4-N1
1. Test N4, N3, N2, N1 levels
2. ✅ **Verify**: Each has unique vocabulary
3. ✅ **Verify**: Exams match study materials

---

### Test 4: Regular User Flow (Optional)

1. Logout from admin
2. Create a new user account with email: `test@test.com`
3. Select Chinese → HSK 1
4. Complete learning path:
   - Study Materials → Learn all vocabulary
   - Quiz → Pass with 80%+
   - Exam → Pass with 80%+
5. ✅ **Verify**: HSK 2 unlocks after passing HSK 1 exam
6. ✅ **Verify**: Cannot skip to HSK 3 without completing HSK 2

---

## 🐛 Known Issues (Fixed)

### ✅ Fixed Issues
- ❌ **OLD**: HSK 4-6 showed all words from HSK 1-3 → ✅ **FIXED**: Shows only level-specific words
- ❌ **OLD**: Exams fell back to HSK 1 questions → ✅ **FIXED**: Dynamic generation from actual vocabulary
- ❌ **OLD**: Study and exam content didn't match → ✅ **FIXED**: Both use same data source
- ❌ **OLD**: Admin couldn't test properly → ✅ **FIXED**: Admin has all access

---

## 📊 Expected Results

### Study Materials
- ✅ Each level shows 50-150 unique words
- ✅ No duplicate words between levels
- ✅ Large character display with pinyin/romaji
- ✅ Show/hide meaning functionality
- ✅ Navigation between cards

### Exams
- ✅ Exactly 30 questions per exam
- ✅ 4 answer choices per question
- ✅ Questions match study vocabulary
- ✅ Pass threshold: 80% (24/30 correct)
- ✅ Certificate generation on pass

### Points System
- ✅ +10 points per correct quiz answer
- ✅ +50 points per correct exam answer
- ✅ +500 bonus points for passing exam
- ✅ Points visible in leaderboard

---

## 🎯 Success Criteria

### Must Pass ✅
1. [ ] HSK 1 and HSK 2 have different vocabulary
2. [ ] Exams use vocabulary from their specific level
3. [ ] Study materials and exams are consistent
4. [ ] Admin can test all levels
5. [ ] Regular users must complete levels in order
6. [ ] All exams have 30 questions
7. [ ] Questions have 4 unique answer choices

### Optional ⭐
1. [ ] All vocabulary counts match HSK/JLPT standards
2. [ ] Example sentences for each word
3. [ ] Audio pronunciation works
4. [ ] Certificate download works

---

## 🚨 If You Find Bugs

### Report Format
```
Bug: [Short description]
Level: [HSK 1, HSK 2, etc.]
Screen: [Study Materials, Exam, Quiz]
Steps to Reproduce:
1. ...
2. ...
Expected: ...
Actual: ...
```

### Example
```
Bug: HSK 3 shows HSK 1 words
Level: HSK 3
Screen: Study Materials
Steps to Reproduce:
1. Login as admin
2. Select Chinese → HSK 3
3. Click Study Materials
4. See "你好" (HSK 1 word)
Expected: Only HSK 3 vocabulary
Actual: Mix of HSK 1 and HSK 3
```

---

## 📝 Additional Notes

### Current Vocabulary Counts
- **HSK 1**: 150 words ✅ Complete
- **HSK 2**: 150 words ✅ Complete
- **HSK 3**: 300 words ✅ Complete
- **HSK 4**: 20 words ⚠️ Limited (expandable)
- **HSK 5**: 15 words ⚠️ Limited (expandable)
- **HSK 6**: 15 words ⚠️ Limited (expandable)

### Expanding Vocabulary
To add more words to any level, edit `/utils/hskData.ts`:
```typescript
export const hsk4Vocabulary: ChineseWord[] = [
  ...hsk3Vocabulary,
  { id: 601, chinese: "新词", pinyin: "xīn cí", english: "New word", hskLevel: 4, category: "noun" },
  // Add more here...
];
```

The exam system will automatically include new words in question generation!

---

## ✅ Testing Checklist

Use this checklist during testing:

### Admin Testing
- [ ] Can login with admin credentials
- [ ] Has 999,999 points
- [ ] All levels unlocked
- [ ] Can access any exam without prerequisites

### Study Materials
- [ ] HSK 1: See basic words (你好, 谢谢)
- [ ] HSK 2: See different words (现在, 喜欢)
- [ ] HSK 3: See advanced words
- [ ] No duplicate words between levels
- [ ] Character display is large and clear
- [ ] Pinyin is visible
- [ ] Can show/hide meaning
- [ ] Navigation works (Next/Previous)

### Exams
- [ ] Exactly 30 questions
- [ ] 4 answer choices per question
- [ ] Questions use level-specific vocabulary
- [ ] Can navigate between questions
- [ ] Submit shows results
- [ ] Pass threshold is 80%
- [ ] Points are awarded correctly
- [ ] Certificate generates on pass

### Japanese Testing
- [ ] Hiragana works
- [ ] Katakana works
- [ ] JLPT N5 has unique vocabulary
- [ ] JLPT N4-N1 work
- [ ] Exams use correct vocabulary

---

Good luck testing! 🎉
