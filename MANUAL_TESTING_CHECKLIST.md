# Manual Testing Checklist - Progress Tracking

## ⚠️ CRITICAL FOR MONETIZATION
This checklist MUST be completed and verified before launching as a paid product.

## Prerequisites
- Application deployed and accessible
- At least 2 different user accounts (different Google/GitHub logins)
- Database accessible for verification

---

## Test 1: Initial Progress State
**User:** User 1 (Fresh account)

- [ ] Login to the application
- [ ] **Expected:** Progress counter shows "0/30"
- [ ] **Expected:** No exercises show completion checkmarks in navigator
- [ ] Open browser DevTools → Network tab
- [ ] Refresh page and observe API call to `/api/progress`
- [ ] **Expected:** Response shows `{"completedExercises": []}`

---

## Test 2: Complete First Exercise
**User:** User 1

- [ ] Navigate to "intro1" exercise
- [ ] Click "Run Code" (should fail with TODO)
- [ ] Fix the code: Replace with `fn main() { println!("Done!"); }`
- [ ] Click "Run Code" again
- [ ] **Expected:** Compilation succeeds with green checkmark
- [ ] **Expected:** Celebration animation appears (confetti/overlay)
- [ ] **Expected:** Progress counter updates to "1/30"
- [ ] **Expected:** intro1 shows completion indicator in navigator
- [ ] Open Network tab
- [ ] **Expected:** See POST request to `/api/progress/intro1` with 200 response
- [ ] **Database Check:** Run SQL:
  ```sql
  SELECT * FROM user_progress WHERE exercise_id = 'intro1';
  ```
- [ ] **Expected:** 1 row with your user_id, exercise_id='intro1', recent completed_at timestamp

---

## Test 3: Complete Second Exercise
**User:** User 1

- [ ] Navigate to "intro2" exercise
- [ ] Fix code: `fn main() { println!("Hello there!"); }`
- [ ] Click "Run Code"
- [ ] **Expected:** Compilation succeeds
- [ ] **Expected:** Celebration animation appears AGAIN
- [ ] **Expected:** Progress counter shows "2/30"
- [ ] **Expected:** Both intro1 and intro2 show as completed
- [ ] **Database Check:** Run SQL:
  ```sql
  SELECT COUNT(*) FROM user_progress WHERE user_id = [your_user_id];
  ```
- [ ] **Expected:** Count = 2

---

## Test 4: Progress Persistence (Page Refresh)
**User:** User 1

- [ ] Note current progress (should be 2/30)
- [ ] Hard refresh page (Cmd+Shift+R or Ctrl+Shift+R)
- [ ] **Expected:** Still logged in (redirects to /ide)
- [ ] **Expected:** Progress counter still shows "2/30"
- [ ] **Expected:** intro1 and intro2 still show as completed
- [ ] Check Network tab for `/api/progress` response
- [ ] **Expected:** `{"completedExercises": ["intro1", "intro2"]}`

---

## Test 5: Re-running Completed Exercise (No Duplicate)
**User:** User 1

- [ ] Navigate to "intro1" (already completed)
- [ ] Click "Run Code"
- [ ] **Expected:** Compilation succeeds
- [ ] **Expected:** NO celebration animation (already completed)
- [ ] **Expected:** Progress counter STILL shows "2/30" (not 3)
- [ ] **Database Check:** Run SQL:
  ```sql
  SELECT COUNT(*) FROM user_progress WHERE user_id = [your_user_id] AND exercise_id = 'intro1';
  ```
- [ ] **Expected:** Count = 1 (no duplicate entry)

---

## Test 6: Logout and Re-login (Session Persistence)
**User:** User 1

- [ ] Click user menu/avatar
- [ ] Click "Logout"
- [ ] **Expected:** Redirects to landing page
- [ ] Click "Get Started" to login again (same account)
- [ ] **Expected:** Redirects to /ide
- [ ] **Expected:** Progress shows "2/30" (persisted across sessions)
- [ ] **Expected:** intro1 and intro2 still marked as complete

---

## Test 7: Per-User Isolation (Different User)
**User:** User 2 (Different account - use different Google/GitHub login)

- [ ] Login with DIFFERENT account
- [ ] **Expected:** Redirects to /ide
- [ ] **Expected:** Progress counter shows "0/30" (NEW USER, zero progress)
- [ ] **Expected:** NO exercises show as completed
- [ ] Check Network → `/api/progress` response
- [ ] **Expected:** `{"completedExercises": []}`
- [ ] **Database Check:** Run SQL with User 2's ID:
  ```sql
  SELECT COUNT(*) FROM user_progress WHERE user_id = [user2_id];
  ```
- [ ] **Expected:** Count = 0

---

## Test 8: User 2 Completes Different Exercise
**User:** User 2

- [ ] Navigate to "variables1" exercise
- [ ] Fix code to make it compile successfully
- [ ] Click "Run Code"
- [ ] **Expected:** Compilation succeeds
- [ ] **Expected:** Celebration animation appears
- [ ] **Expected:** Progress shows "1/30" for User 2
- [ ] **Database Check:** Run SQL:
  ```sql
  SELECT exercise_id FROM user_progress WHERE user_id = [user2_id];
  ```
- [ ] **Expected:** Returns only "variables1"
- [ ] **Database Check:** Verify isolation - Run SQL:
  ```sql
  SELECT user_id, exercise_id FROM user_progress ORDER BY user_id, exercise_id;
  ```
- [ ] **Expected:** User 1 has intro1 + intro2, User 2 has only variables1

---

## Test 9: Verify User 1 Progress Unchanged
**User:** Switch back to User 1 (logout User 2, login as User 1)

- [ ] Login as User 1 again
- [ ] **Expected:** Progress shows "2/30" (unchanged)
- [ ] **Expected:** intro1 and intro2 completed (NOT variables1)
- [ ] **Expected:** variables1 shows as NOT completed
- [ ] Check `/api/progress` response
- [ ] **Expected:** `{"completedExercises": ["intro1", "intro2"]}` (NO variables1)

---

## Test 10: Complete Multiple Exercises Rapidly
**User:** User 1

- [ ] Navigate to "variables1"
- [ ] Fix and compile successfully
- [ ] Immediately navigate to "variables2"
- [ ] Fix and compile successfully
- [ ] Immediately navigate to "variables3"
- [ ] Fix and compile successfully
- [ ] **Expected:** Progress counter shows "5/30" (2 previous + 3 new)
- [ ] **Expected:** All 5 exercises show as completed
- [ ] **Database Check:** Run SQL:
  ```sql
  SELECT COUNT(*) FROM user_progress WHERE user_id = [user1_id];
  ```
- [ ] **Expected:** Count = 5

---

## Final Database Integrity Check
**Database Verification**

- [ ] Run SQL to check for duplicates:
  ```sql
  SELECT user_id, exercise_id, COUNT(*) as count 
  FROM user_progress 
  GROUP BY user_id, exercise_id 
  HAVING COUNT(*) > 1;
  ```
- [ ] **Expected:** No rows (no duplicates due to unique constraint)

- [ ] Run SQL to verify total records:
  ```sql
  SELECT 
    (SELECT COUNT(*) FROM user_progress WHERE user_id = [user1_id]) as user1_count,
    (SELECT COUNT(*) FROM user_progress WHERE user_id = [user2_id]) as user2_count,
    (SELECT COUNT(*) FROM user_progress) as total_count;
  ```
- [ ] **Expected:** user1_count=5, user2_count=1, total_count=6

---

## Success Criteria
✅ ALL checkboxes above must be checked
✅ NO unexpected database entries
✅ Progress persists across refreshes and logins
✅ Complete user isolation (no cross-contamination)
✅ No duplicate progress entries
✅ Celebration animation works correctly (first time only)

## If ANY test fails:
**DO NOT PROCEED WITH MONETIZATION**

Report the failure and fix the issue before launching as a paid product.

---

## Sign-off
Once all tests pass:

**Tested by:** _______________
**Date:** _______________
**All tests passed:** [ ] YES [ ] NO
**Notes:** _______________
