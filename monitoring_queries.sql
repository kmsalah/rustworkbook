-- MONITORING QUERIES FOR RUST IDE WORKBOOK
-- Run these in the Database pane to monitor your users and activity

-- 1. Total registered users
SELECT COUNT(*) as total_users FROM users;

-- 2. Users registered today
SELECT COUNT(*) as users_today 
FROM users 
WHERE DATE(created_at) = CURRENT_DATE;

-- 3. Active users (with progress)
SELECT COUNT(DISTINCT user_id) as active_users 
FROM user_progress;

-- 4. Most completed exercises
SELECT 
    exercise_id,
    COUNT(*) as completion_count
FROM user_progress
WHERE completed = true
GROUP BY exercise_id
ORDER BY completion_count DESC
LIMIT 10;

-- 5. User progress overview
SELECT 
    u.email,
    u.first_name,
    u.last_name,
    COUNT(up.exercise_id) as exercises_completed
FROM users u
LEFT JOIN user_progress up ON u.id = up.user_id AND up.completed = true
GROUP BY u.id, u.email, u.first_name, u.last_name
ORDER BY exercises_completed DESC;

-- 6. Exercise completion rate
SELECT 
    exercise_id,
    SUM(CASE WHEN completed THEN 1 ELSE 0 END) as completed,
    COUNT(*) as started,
    ROUND(100.0 * SUM(CASE WHEN completed THEN 1 ELSE 0 END) / COUNT(*), 2) as completion_rate
FROM user_progress
GROUP BY exercise_id
ORDER BY exercise_id;

-- 7. Recent user activity (last 24 hours)
SELECT 
    u.email,
    COUNT(up.exercise_id) as exercises_attempted,
    MAX(up.updated_at) as last_activity
FROM users u
JOIN user_progress up ON u.id = up.user_id
WHERE up.updated_at > NOW() - INTERVAL '24 hours'
GROUP BY u.id, u.email
ORDER BY last_activity DESC;

-- 8. User retention (users who completed more than 3 exercises)
SELECT 
    COUNT(CASE WHEN exercise_count > 3 THEN 1 END) as engaged_users,
    COUNT(*) as total_users,
    ROUND(100.0 * COUNT(CASE WHEN exercise_count > 3 THEN 1 END) / COUNT(*), 2) as engagement_rate
FROM (
    SELECT user_id, COUNT(*) as exercise_count
    FROM user_progress
    WHERE completed = true
    GROUP BY user_id
) as user_stats;